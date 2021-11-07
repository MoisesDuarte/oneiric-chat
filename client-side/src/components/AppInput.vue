<template>
  <div class="input-group">
    <label v-if="label" :for="id">
      Username
    </label>
    <input 
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'AppInput',
  props: {
    id: {
      type: String,
      required:  true,
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [Number, String],
    },
  },
  emits: ['update:modelValue'],
}
</script>

<style lang="less" scoped>
.input-group {
  width: 100%;

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