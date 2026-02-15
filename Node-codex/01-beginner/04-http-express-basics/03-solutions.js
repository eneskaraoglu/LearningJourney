"use strict";

// HTTP Fundamentals and Express Basics - Reference Solution

const express = require("express");

const app = express();
app.use(express.json());

const tasks = [];
let nextId = 1;

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

app.get("/tasks", (req, res) => {
  const doneFilter = req.query.done;
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));

  let filtered = tasks;
  if (doneFilter === "true" || doneFilter === "false") {
    filtered = tasks.filter((t) => String(t.done) === doneFilter);
  }

  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);
  return res.json({
    data,
    meta: { page, limit, total: filtered.length, pages: Math.ceil(filtered.length / limit) }
  });
});

app.post("/tasks", (req, res, next) => {
  try {
    const title = (req.body.title || "").trim();
    if (title.length < 3) {
      return res.status(400).json({ message: "title must be at least 3 chars", code: "INVALID_TITLE" });
    }

    const task = { id: nextId, title, done: false };
    nextId += 1;
    tasks.push(task);
    return res.status(201).json(task);
  } catch (error) {
    return next(error);
  }
});

app.patch("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ message: "task not found", code: "TASK_NOT_FOUND" });

  if (typeof req.body.done !== "boolean") {
    return res.status(400).json({ message: "done must be boolean", code: "INVALID_DONE" });
  }

  task.done = req.body.done;
  return res.json(task);
});

app.use((error, req, res, next) => {
  console.error("server-error", error.message);
  res.status(500).json({ message: "internal server error", code: "INTERNAL" });
});

if (require.main === module) {
  app.listen(3000, () => console.log("Server on http://localhost:3000"));
}

module.exports = app;
