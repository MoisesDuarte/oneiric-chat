<template>
  <div class="login">
    <form @submit.prevent="onSubmit()">
      <AppInput
        id="username-input"
        label="Username"
        v-model="username"
      />

      <AppSelect
        label="Room"
        :options="rooms"
        v-model="selectedRoom"
      />

      <AppButton type="submit" color="success">
        Enter Room
      </AppButton>
    </form>
  </div>
</template>

<script>
import router from "@/router";

import AppInput from "../components/AppInput.vue";
import AppSelect from "../components/AppSelect.vue";
import AppButton from "../components/AppButton.vue";

export default {
  name: 'Login',
  components: {
    AppInput,
    AppSelect,
    AppButton
  },
  data() {
    return {
      username: '',
      selectedRoom: 'Dreams',
      rooms: ['Dreams', 'Nightmares']
    };
  },
  methods: {
    onSubmit() {
      this.$cookies.set('USER', JSON.stringify({ username: this.username, room: this.selectedRoom }));
      router.push({ name: 'Room' });
    },
  },
}
</script>

<style lang="less" scoped>
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

.input-group {
  margin-bottom: 18px;

  label, input, select {
    display: block;
  }

  label {
    margin-bottom: 6px;
  }

  input, select {
    width: 100%;
    background: @color-base-2;
    color: @color-base-3;
    border: none;
    border-bottom: 2px solid @color-base-3;
    padding: 6px;
    font-size: 1rem;
    -webkit-appearance: none;

    &:focus {
      outline: none;
    }
  }
}
</style>