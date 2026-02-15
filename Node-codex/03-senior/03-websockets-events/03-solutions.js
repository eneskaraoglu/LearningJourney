const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer();
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  socket.on('join-project', (projectId) => {
    socket.join(`project:${projectId}`);
  });

  socket.on('task-updated', (payload) => {
    if (!payload || !payload.projectId || !payload.taskId) {
      return socket.emit('error-message', { message: 'invalid payload' });
    }
    io.to(`project:${payload.projectId}`).emit('task-updated', payload);
  });
});

server.listen(4001, () => console.log('socket server on 4001'));
