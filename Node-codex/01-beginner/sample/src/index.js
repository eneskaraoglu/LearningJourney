"use strict";

const express = require("express");
const { readStore, writeStore } = require("./store");

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json());

app.use((req, res, next) => {
  const started = Date.now();
  res.on("finish", () => {
    console.log(`${req.method} ${req.path} ${res.statusCode} ${Date.now() - started}ms`);
  });
  next();
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/tasks", async (req, res, next) => {
  try {
    const store = await readStore();
    res.json(store.tasks);
  } catch (error) {
    next(error);
  }
});

app.post("/tasks", async (req, res, next) => {
  try {
    const title = String(req.body.title || "").trim();
    if (title.length < 3) {
      return res.status(400).json({ message: "title must be at least 3 characters", code: "INVALID_TITLE" });
    }

    const store = await readStore();
    const task = {
      id: store.nextId,
      title,
      done: false,
      createdAt: new Date().toISOString()
    };
    store.nextId += 1;
    store.tasks.push(task);
    await writeStore(store);

    return res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

app.patch("/tasks/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "id must be an integer", code: "INVALID_ID" });
    }

    if (typeof req.body.done !== "boolean") {
      return res.status(400).json({ message: "done must be boolean", code: "INVALID_DONE" });
    }

    const store = await readStore();
    const task = store.tasks.find((t) => t.id === id);
    if (!task) {
      return res.status(404).json({ message: "task not found", code: "TASK_NOT_FOUND" });
    }

    task.done = req.body.done;
    task.updatedAt = new Date().toISOString();
    await writeStore(store);
    return res.json(task);
  } catch (error) {
    next(error);
  }
});

app.delete("/tasks/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const store = await readStore();
    const before = store.tasks.length;
    store.tasks = store.tasks.filter((t) => t.id !== id);
    if (store.tasks.length === before) {
      return res.status(404).json({ message: "task not found", code: "TASK_NOT_FOUND" });
    }

    await writeStore(store);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "internal server error", code: "INTERNAL" });
});

app.listen(PORT, () => {
  console.log(`Beginner sample listening on http://localhost:${PORT}`);
});
