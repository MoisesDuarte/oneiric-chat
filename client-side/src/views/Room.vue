<template>
  <div class="room">
    <nav class="room-title">
      <span>{{ roomName }}</span>
      <AppButton color="success" @click="onLeaveRoom()">
        Leave Room
      </AppButton>
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
      <AppInput
        v-model="sentMsg"
        @keydown.enter="onSendMessage()"
      />
      <AppButton 
        color="primary"
        @click="onSendMessage()">
        Send
      </AppButton>
    </section>
  </div>
</template>

<script>
import router from "@/router";

import AppInput from "../components/AppInput.vue";
import AppButton from "../components/AppButton.vue";

export default {
  name: 'Chat',
  components: {
    AppInput,
    AppButton,
  },
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
  width: 800px;
  margin: auto;
  margin-top: 1em;
  display: grid;
  grid-template-areas: 
    'title title title'
    'users messages messages'
    'input input input';
  grid-template-columns: 200px 300px 300px;

  .room-title { 
    grid-area: title;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: @color-base-3;
    color: @color-base-1;
    font-size: 1.25rem;
    padding: 8px;
  }

  .room-users {
    border-left: 2px solid @color-base-2;
    border-right: 2px solid @color-base-2;
    grid-area: users; 
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
    display: flex;
    gap: 6px;
    align-items: center;
    padding-top: 8px;

    input {
      flex-grow: 1;
      margin-right: 6px;
    }
  }
}
</style>
