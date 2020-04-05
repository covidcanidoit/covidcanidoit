<template>
  <div class="multi-question">
    <div class="content">
      <div class="question">{{ questionPrompt }}</div>
      <div><slot></slot></div>
      <select
        class="form-select"
        @input="$emit('input', $event.target.value)"
        v-bind:value="value"
      >
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option[1]"
        >
          {{ option[0] }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    questionPrompt: undefined,
    options: undefined,
    value: undefined
  }
};
</script>

<style scoped lang="scss">
.multi-question {
  display: flex;

  .content {
    align-self: flex-end;
  }

  .question {
    font-weight: bold;
  }
}
</style>
