const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userEnter, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

// ? Dotenv configuration
require('dotenv').config()

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
      origins: ['localhost:3000']
  }
});

app.get('/', (req, res) =>  {
  res.send('Server is up');
});

// * Socket
const botName = 'OneiricRoom Bot';

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userEnter(socket.id, username, room);

    socket.join(user.room);

    // ? Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to Oneiric Chat'));

    // ? Broadcast when an user connects to the room
    socket.broadcast
      .to(user.room)
      .emit('message', formatMessage(botName, `${user.username} has joined the chat!`));

    // ? Send room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // ? Listen for when user leaves room manually
  socket.on('leaveRoom', () => {
    const user = userLeave(socket.id);

    if (user) {
      io
        .to(user.room)
        .emit('message', formatMessage(botName,`${user.username} left the chat!`));

      socket.leave(user.room);

      // ? Send room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });

  // ? Listen for chat messages
  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id);

    io
      .to(user.room)
      .emit('message', formatMessage(user.username, msg));
  });

  // ? Runs when client disconnects (emit to all)
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io
        .to(user.room)
        .emit('message', formatMessage(botName,`${user.username} left the chat!`));

      // ? Send room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }    
  });
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});