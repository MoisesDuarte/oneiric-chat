<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<script>
import SocketService from '@/services/socket.service';

export default {
  name: 'App',
  created() {
    SocketService.setupSocketConnection();
  },
}
</script>

<style>

</style>
