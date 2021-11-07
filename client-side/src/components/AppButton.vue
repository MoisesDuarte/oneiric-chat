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
  &.full-width {
    button {
      width: 100%;
    }
  }
  
  button {
    background: @color-base-3;
    border: 1px solid @color-base-3;
    border-radius: 2px;
    padding: 6px 12px;
    cursor: pointer;
    -webkit-appearance: none;

    &.primary {
      background: @color-primary;
      border: 1px solid @color-primary;
      color: @color-base-3;  
    }

    &.success {
      background: @color-success;
      border: 1px solid @color-success;
      color: @color-base-3;
    }

    &.warning {
      background: @color-warning;
      border: 1px solid @color-warning;
      color: @color-base-3;
    }
  }
}
</style>