<template>
  <router-view/>
</template>

<script>import router from "./router";

export default {
  name: 'App',
  created() {
    // ? Listen for any connection errors on socket
    this.$socket.on('connect_error', () => {
      router.push({ name: '503' });
    });
  },
}
</script>

<style lang="less">
* {
  box-sizing: border-box;
}

body {
  background: @color-base-1;
  color: @color-base-3;
  margin: 0;
  padding: 0;
}
</style>
