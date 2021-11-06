import { io } from 'socket.io-client';

class SocketService {
    socket;
    constructor() {}

    connect() {
        this.socket = io('http://localhost:3000');
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}

export default new SocketService();