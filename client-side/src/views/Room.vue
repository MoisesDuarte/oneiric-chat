<template>
  <div class="room">
    <nav class="room-title">
      <span>{{ roomName }}</span>
      <button @click="onLeaveRoom()">
        Leave Room
      </button>
    </nav>

    <section class="room-users">
      <p>Users</p>
      <ul>
        <li v-for="({ username }, index) in users" :key="index">
          {{ username }}
        </li>
      </ul>
    </section>

    <section class="room-messages" ref="roomMessages">
      <ul>
        <li v-for="({ username, text, time }, index) in messages" :key="index">
          <span><b>{{ username }} - {{ time }}</b></span><br>
          <span>{{ text }}</span>
        </li>
      </ul>
    </section>

    <section class="message-input">
      <input 
        v-model="sentMsg" 
        ref="sentMsg" 
        type="text"
        @keydown.enter="onSendMessage()"
      />
      <button @click="onSendMessage()">Send</button>
    </section>
  </div>
</template>

<script>
import router from "@/router"

export default {
  name: 'Chat',
  data() {
    return {
      roomName: '',
      users: [],
      messages: [],
      sentMsg: '',
    }
  },
  methods: {
    onLeaveRoom() {
      this.$socket.emit('leaveRoom');
      this.$cookies.set('USER', {});
      router.push({ name: 'Login' });
    },
    onSendMessage() {
      this.$socket.emit('chatMessage', this.sentMsg);
      this.sentMsg = '';
      this.$refs.sentMsg.focus();
    },
  },
  created() {
    const session = this.$cookies.get('USER');
    
    this.$socket.emit('joinRoom', session);

    this.$socket.on('roomUsers', ({ room, users }) => {
      this.roomName = room;
      this.users = users;
    });

    this.$socket.on('message', msg => {
      this.messages.push(msg);
    });
  },
}
</script>

<style lang="less">
.room {
  border: 1px solid black;
  width: 60%;
  margin: auto;
  margin-top: 1em;
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
    overflow-y: scroll;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        margin-bottom: 16px;
      }
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
