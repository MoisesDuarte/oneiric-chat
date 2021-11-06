<template>
  <router-view/>
</template>

<script>
import SocketService from '@/services/socket.service';

export default {
  name: 'App',
  created() {
    SocketService.connect();
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}
</style>
