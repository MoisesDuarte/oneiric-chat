<template>
  <div class="button-container">
    <button
      :class="color"
      :type="type"
      @click="$emit('click')">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    color: {
      type: String,
      default: 'red',
    }
  }
}
</script>

<style lang="less" scoped>
.button-container {
  button {
    width: 100%;
    background: @color-base-3;
    border: 1px solid @color-base-3;
    border-radius: 2px;
    padding: 6px 12px;
    margin-bottom: 1em;
    cursor: pointer;
     -webkit-appearance: none;

    &.success {
      background: @color-success;
      border: 1px solid @color-success;
      color: @color-base-3;
    }
  }
}
</style>