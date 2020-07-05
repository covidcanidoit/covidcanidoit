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
    font-size: 1em;
  }
}

.form-select {
  /* display: inline-block;
  max-width: 100%;
  height: 34px;
  padding-right: 24px; */
  /* background-color: rgb(186, 214, 26); */
  /* background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 8px 10px; */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png)
    no-repeat right 16px center #ddd;

  min-height: 34px;
  min-width: 120px;
  padding: 6px 8px;
  font-size: 16px;
  line-height: 20px;
  /* color: #24292e; */
  vertical-align: middle;
  /* background-color: rgb(247, 12, 12); */
  /* background-repeat: no-repeat;
  background-position: right 8px center; */
  /* border: 1px solid #d1d5da; */
  border-radius: 30px;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
}


</style>
