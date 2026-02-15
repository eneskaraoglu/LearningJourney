"use strict";

// Real-time Communication with WebSockets - Reference Solution

const http = require("http");
const { Server } = require("socket.io");

function createSocketServer(port = 4001) {
  const server = http.createServer();
  const io = new Server(server, { cors: { origin: "*" } });

  const eventHistory = new Map();

  function pushEvent(room, event) {
    const arr = eventHistory.get(room) || [];
    arr.push(event);
    if (arr.length > 20) arr.shift();
    eventHistory.set(room, arr);
  }

  io.on("connection", (socket) => {
    console.log("connected", socket.id);

    socket.emit("welcome", { socketId: socket.id, timestamp: new Date().toISOString() });

    socket.on("heartbeat", (_, ack) => {
      if (ack) ack({ ok: true, ts: Date.now() });
    });

    socket.on("join-project", (payload, ack) => {
      const projectId = payload && payload.projectId;
      if (!projectId) {
        if (ack) ack({ ok: false, message: "projectId required" });
        return;
      }

      const room = `project:${projectId}`;
      socket.join(room);
      const lastEvents = eventHistory.get(room) || [];
      if (ack) ack({ ok: true, room, lastEvents });
    });

    socket.on("task-updated", (payload, ack) => {
      if (!payload || !payload.projectId || !payload.taskId) {
        if (ack) ack({ ok: false, message: "invalid payload" });
        return;
      }

      const room = `project:${payload.projectId}`;
      const event = { ...payload, serverTime: new Date().toISOString() };
      pushEvent(room, event);
      io.to(room).emit("task-updated", event);
      if (ack) ack({ ok: true });
    });

    socket.on("disconnect", (reason) => {
      console.log("disconnected", socket.id, reason);
    });
  });

  server.listen(port, () => console.log(`socket server on ${port}`));
  return { server, io };
}

if (require.main === module) {
  createSocketServer();
}

module.exports = { createSocketServer };
