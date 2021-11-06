<template>
  <div class="login">
    <form @submit.prevent="onSubmit()">
      <label for="username">Username</label>
      <input id="username" v-model="username" type="text">

      <label for="room">Room</label>
      <select id="room" v-model="room">
        <option value="dreams" selected>Dreams</option>
        <option value="nightmares">Nightmares</option>
      </select>
      
      <button type="submit">Enter Room</button>
    </form>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      room: 'dreams',
    }
  },
  methods: {
    onSubmit() {
      router.push({ name: 'Room' });
    },
  },
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

form {
  width: 300px;
  display: flex;
  flex-direction: column;
}

form > label {
  margin-bottom: 2px;
}

form > input, select {
  margin-bottom: 8px;
}
</style>