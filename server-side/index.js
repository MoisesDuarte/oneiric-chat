const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
      origins: ['localhost:3000']
  }
});

// ? Socket
io.on('connection', (socket) => {
  console.log('New WS Connection...');
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});