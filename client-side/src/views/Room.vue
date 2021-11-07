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

    <section class="room-messages">
      <ul ref="messagesContainer">
        <li v-for="({ username, text, time }, index) in messages" :key="index">
          <div class="user"><b>{{ username }}</b> - {{ time }}</div>
          <div class="message">{{ text }}</div>
        </li>
      </ul>
    </section>

    <section class="message-input">
      <AppInput
        id="message-input"
        v-model="sentMsg"
        placeholder="Write message and press enter to send"
        @keydown.enter="onSendMessage()"
      />
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
      messagesCounter: 0,
      sentMsg: '',
    }
  },
  watch: {
    messagesCounter: function() {
      this.$nextTick(function() {
        const messageContainer = this.$refs.messagesContainer;
        messageContainer.scrollTop = messageContainer.scrollHeight;
      });
    }
  },
  methods: {
    onLeaveRoom() {
      this.$socket.emit('leaveRoom');
      this.$cookies.remove('USER');
      router.push({ name: 'Login' });
    },
    onSendMessage() {
      if (this.sentMsg === '') {
        return;
      }

      this.$socket.emit('chatMessage', this.sentMsg);
      this.sentMsg = '';
    },
  },
  mounted() {
    const session = this.$cookies.get('USER');

    if (session) {
      this.$socket.emit('joinRoom', session);

      this.$socket.on('roomUsers', ({ room, users }) => {
        this.roomName = room;
        this.users = users;
      });

      this.$socket.on('message', msg => {
        this.messages.push(msg);       
        this.messagesCounter = this.messages.length;
      });
    } else {
      router.push({ name: 'Login' });
    }    
  },
  beforeUnmount() {
    this.$cookies.remove('USER');
  }
}
</script>

<style lang="less">
.room {
  width: 100%;
  height: 100vh;
  margin: auto;
  display: grid;
  grid-template-areas: 
    'title title title'
    'users messages messages'
    'input input input';
  grid-template-columns: 20% 40% 40%;
  grid-template-rows: 48px 600px 48px;

  .room-title { 
    grid-area: title;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: @color-base-1-accent;
    color: @color-base-3;
    font-size: 1.25rem;
    padding: 8px;
  }

  .room-users {
    background-color: @color-base-2-accent;
    color: @color-base-3;
    grid-area: users; 
    padding: 8px;
    overflow: hidden;
    overflow-y: auto;

    p {
      margin: 0;
      padding: 0;
      font-weight: 600;
      font-size: 1.25rem;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }

  .room-messages { 
    grid-area: messages; 
    height: 100%;

    ul {
      height: 100%;
      list-style: none;
      margin: 0;
      padding: 0;
      padding: 8px;
      overflow: hidden;
      overflow-y: auto;

      li {
        margin-bottom: 16px;

        .user {
          font-size: 0.875rem;
          margin-bottom: 6px;
        }

        .message {
          border-radius: 4px;
          padding: 8px;
          background-color: @color-base-2;
        }
      }
    }
  }

  .message-input { 
    grid-area: input;
    display: flex;
    gap: 6px;
    border-top: 6px solid @color-base-2-accent;
    padding: 6px;
    align-items: center;

    input {
      flex-grow: 1;
      margin-right: 6px;
    }
  }
}
</style>
