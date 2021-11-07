<template>
  <div class="select-container" tabindex="0" @blur="isOpen = false">
    <label v-if="label" @click="focusOnSelect">
      {{ label }}
    </label>
    <div 
      class="selected" 
      :class="{ 'open': isOpen }" 
      @click="isOpen = !isOpen">
      {{ selected && selected.length > 0 ? selected : 'Select a option' }}
    </div>
    <div 
      class="options" 
      :class="{ 'hide': !isOpen }">
      <div 
        v-for="(option, index) of options" 
        :key="index"
        @click="onSelectOption(option)">
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppSelect',
  props: {
    label: {
      type: String,
      required: false,
    },
    options: {
      type: Array,
    },
    modelValue: {
      type: String,
    },
  },
  data() {
    return {
      isOpen: false,
      selected: this.modelValue,
    };
  },
  methods: {
    focusOnSelect() {
      this.isOpen = true;
    },
    onSelectOption(option) {
      this.selected = option;
      this.$emit('update:modelValue', option);
      this.isOpen = false;
    },
  },
  emits: ['update:modelValue'],
}
</script>

<style lang="less" scoped>
.select-container {
  position: relative;
  width: 100%;
  margin-bottom: 1em;
  text-align: left;

  label {
    user-select: none;
  }

  .selected {
    background: @color-base-2;
    border: none;
    border-bottom: 2px solid @color-base-3;
    padding-left: 0.75em;
    margin-top: 0.5em;
    cursor: pointer;
    user-select: none;
    height: 32px;
    line-height: 32px;

    &.open {
      border-radius: 2px 2px 0 0;
    }
  }

  .options {
    position: absolute;
    left: 0;
    right: 0;
    background: @color-base-3;
    color: @color-base-1;
    border-radius: 0 0 4px 4px;
    z-index: 1;
    overflow: hidden;

    & div {
      height: 27px;
      line-height: 27px;
      padding-left: 0.75em;
      cursor: pointer;
      user-select: none;

      &:hover {
        background: @color-base-2;
        color: @color-base-3;
      }
    }

    &.hide {
      display: none;
    }
  }
}
</style>
