const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
      origins: ['localhost:3000']
  }
});

// * Socket
const botName = 'OneiricRoom Bot';

io.on('connection', (socket) => {
  // ? Welcome current user
  socket.emit('message', formatMessage(botName, 'Welcome to Oneiric Chat'));

  // ? Broadcast when an user connects
  socket.broadcast.emit('message', formatMessage(botName, 'A user joined the chat!'));

  // ? Runs when client disconnects (emit to all)
  socket.on('disconnect', () => {
    io.emit('message', formatMessage(botName, 'A user left the chat!'));
  });

  // ? Listen for chat messages
  socket.on('chatMessage', (msg) => {
    io.emit('message', formatMessage('USER', msg));
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});