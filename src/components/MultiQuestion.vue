<template>
  <div>
    <div class="question">{{ questionPrompt }}</div>
    <div><slot></slot></div>
    <div v-for="option in options" :key="option.id">
      <input
        type="radio"
        :value="option[1]"
        v-model="answer"
        @input="$emit('input', $event.target.value)"
      />
      <label :for="option[1]">{{ option[0] }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    questionPrompt: undefined,
    options: undefined
  },
  data() {
    return {
      answer: ""
    };
  }
};
</script>

<style scoped>
.question {
  font-weight: bold;
}
</style>
