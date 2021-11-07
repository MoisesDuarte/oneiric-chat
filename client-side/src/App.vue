<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
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
