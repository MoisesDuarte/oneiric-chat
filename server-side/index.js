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

// * Socket
io.on('connection', (socket) => {
  // ? Welcome current user
  socket.emit('message', 'Welcome to Oneiric Chat');

  // ? Broadcast when an user connects
  socket.broadcast.emit('message', 'A user has joined the chat!');

  // ? Runs when client disconnects (emit to all)
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat!');
  });

  // ? Listen for chat messages
  socket.on('chatMessage', (msg) => {
    io.emit('message', msg);
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});