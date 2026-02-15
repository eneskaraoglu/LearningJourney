"use strict";

const express = require("express");
const repo = require("./repository");
const { createService, AppError } = require("./service");

const app = express();
const PORT = Number(process.env.PORT || 3001);
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const service = createService(repo, JWT_SECRET);

app.use(express.json());

app.use((req, res, next) => {
  const started = Date.now();
  res.on("finish", () => {
    console.log(`${req.method} ${req.path} ${res.statusCode} ${Date.now() - started}ms`);
  });
  next();
});

function auth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) throw new AppError(401, "AUTH_REQUIRED", "missing token");

    const payload = service.verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
}

app.post("/auth/register", async (req, res, next) => {
  try {
    const user = await service.register(req.body.email, req.body.password);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

app.post("/auth/login", async (req, res, next) => {
  try {
    const accessToken = await service.login(req.body.email, req.body.password);
    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
});

app.get("/me", auth, (req, res, next) => {
  try {
    res.json(service.me(req.user.sub));
  } catch (error) {
    next(error);
  }
});

app.get("/tasks", auth, (req, res, next) => {
  try {
    res.json(service.listTasks(req.user.sub));
  } catch (error) {
    next(error);
  }
});

app.post("/tasks", auth, (req, res, next) => {
  try {
    const task = service.createTask(req.user.sub, req.body.title);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.status).json({ code: error.code, message: error.message });
  }

  console.error(error);
  return res.status(500).json({ code: "INTERNAL", message: "internal server error" });
});

app.listen(PORT, () => {
  console.log(`Mid sample listening on http://localhost:${PORT}`);
});
