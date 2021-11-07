<template>
  <div class="error-message">
    <h1>503 Service Unavailable.</h1>
    <p>The server is currently unable to handle the request due to a temporary overloading or maintenance of the server.</p>  

    <AppButton color="warning" @click='onRetryConnection'>
      Retry connection
    </AppButton>
  </div>
</template>

<script>
import AppButton from "../components/AppButton.vue"
import router from "../router"

export default {
  name: '503',
  components: {
    AppButton,
  },
  methods: {
    onRetryConnection() {
      router.push({ name: 'Login' });
    },
  },
}
</script>

<style lang="less" scoped>
.error-message {
  text-align: center;

  p {
    font-size: 1.125rem;
  }
}
</style>