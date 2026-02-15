"use strict";

const crypto = require("crypto");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const { metrics, track } = require("./metrics");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const PORT = Number(process.env.PORT || 3002);

app.use(express.json());

app.use((req, res, next) => {
  const started = Date.now();
  const requestId = req.headers["x-request-id"] || crypto.randomUUID();
  req.requestId = requestId;
  res.setHeader("x-request-id", requestId);

  res.on("finish", () => {
    const durationMs = Date.now() - started;
    track(res.statusCode, durationMs);
    console.log(
      JSON.stringify({
        level: res.statusCode >= 500 ? "error" : "info",
        requestId,
        method: req.method,
        path: req.path,
        status: res.statusCode,
        durationMs,
        ts: new Date().toISOString()
      })
    );
  });

  next();
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/events/task-updated", (req, res) => {
  const projectId = String(req.body.projectId || "").trim();
  const taskId = Number(req.body.taskId);
  if (!projectId || !Number.isInteger(taskId)) {
    return res.status(400).json({ code: "INVALID_PAYLOAD", message: "projectId and integer taskId are required" });
  }

  const event = {
    projectId,
    taskId,
    title: String(req.body.title || ""),
    updatedAt: new Date().toISOString()
  };

  io.to(`project:${projectId}`).emit("task-updated", event);
  return res.status(202).json({ deliveredToRoom: `project:${projectId}` });
});

app.get("/metrics", (req, res) => {
  res.json({
    total: metrics.success + metrics.error,
    success: metrics.success,
    error: metrics.error,
    latency: metrics.latency
  });
});

io.on("connection", (socket) => {
  socket.emit("welcome", { socketId: socket.id, connectedAt: new Date().toISOString() });

  socket.on("join-project", (payload, ack) => {
    const projectId = payload && payload.projectId;
    if (!projectId) {
      if (ack) ack({ ok: false, message: "projectId required" });
      return;
    }

    const room = `project:${projectId}`;
    socket.join(room);
    if (ack) ack({ ok: true, room });
  });
});

server.listen(PORT, () => {
  console.log(`Senior sample listening on http://localhost:${PORT}`);
});
