<template>
  <div class="login">
    <form @submit.prevent="onSubmit()">
      <div v-if="alertMsg" class="alert-box">
        {{ alertMsg }}
      </div>

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

      <AppButton type="submit" color="success" class="full-width">
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
      rooms: ['Dreams', 'Nightmares'],
      alertMsg: null,
    };
  },
  methods: {
    onSubmit() {
      const form = { username: this.username, room: this.selectedRoom };
      const isFormValid = Object.values(form).every((item) => item !== null && item.length > 0);

      if (!isFormValid) {
        this.alertMsg = 'Please insert a valid username and room';
        return;
      }

      this.$cookies.set('USER', JSON.stringify({ username: this.username, room: this.selectedRoom }));
      router.push({ name: 'Room' });
    },
  },
  created() {
    const session = this.$cookies.get('USER');

    if (session) {
      router.push({ name: 'Room' });
    }
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

  .alert-box {
    border-radius: 6px;
    background: @color-error;
    padding: 8px;
    margin-bottom: 16px;
  }

  form {
    width: 400px;
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
}
</style>