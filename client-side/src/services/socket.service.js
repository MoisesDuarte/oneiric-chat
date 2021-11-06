import { io } from 'socket.io-client';

class SocketService {
  socket;
  constructor() {}

  connect() {
    this.socket = io('http://localhost:3000');

    this.socket.on('message', (message) => {
      console.info(message);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  emitMessage(msg) {
    this.socket.emit('chatMessage', msg);
  }
}

export default new SocketService();