<template>
  <div class="room">
    <nav class="room-title">
      <span>Room Name</span>
      <button @click="onLeaveRoom()">
        Leave Room
      </button>
    </nav>

    <section class="room-users">
      <p>Users</p>
      <ul>
        <li>User A</li>
        <li>User B</li>
        <li>User C</li>
      </ul>
    </section>

    <section class="room-messages">
      <ul>
        <li>
          <span>User A - 2:00pm</span><br>
          <span>Hello, welcome to the room!</span>
        </li>
      </ul>
    </section>

    <section class="message-input">
      <input v-model="message" type="text">
      <button @click="onSendMessage()">Send</button>
    </section>
  </div>
</template>

<script>
import router from "@/router"
import SocketService from '@/services/socket.service';

export default {
  name: 'Chat',
  data() {
    return {
      message: '',
    }
  },
  methods: {
    onLeaveRoom() {
      router.push({ name: 'Login' });
    },
    onSendMessage() {
      SocketService.emitMessage(this.message);
      this.message = '';
    },
  },
}
</script>

<style lang="less">
.room {
  width: 60%;
  margin: auto;
  display: grid;
  grid-template-areas: 
    'title title title'
    'users messages messages'
    'input input input';

  .room-title { 
    grid-area: title;
    border-bottom: 1px solid black; 
    display: flex;
    justify-content: space-between;
    padding: 8px;
  }

  .room-users {
    grid-area: users; 
    border-right: 1px solid black;
    padding: 8px;

    p {
      margin: 0;
      padding: 0;
      font-weight: 600;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }

  .room-messages { 
    grid-area: messages; 
    height: 300px;
    padding: 8px;
    overflow-y: hidden;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }

  .message-input { 
    grid-area: input;
    border-top: 1px solid black;
    display: flex;
    padding: 8px;

    input {
      flex-grow: 1;
      margin-right: 6px;
    }
  }
}
</style>
