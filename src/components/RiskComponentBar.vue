<template>
  <div id="barContainer" class="barContainer">
    <div class="barWhitespace">
      <div class="tagWhitespace"></div>
      <div class="tag">{{ level }}</div>
    </div>
    <div id="bar" class="bar" :style="barStyle"></div>
  </div>
</template>

<script>
export default {
  props: ["value"],
  computed: {
    barStyle() {
      return `height: ${this.value * 33}px; background-color: ${
        this.value === 1 ? "green" : this.value === 2 ? "gold" : "red"
      };`;
    },
    level() {
      return this.value === 1 ? "Low" : this.value === 2 ? "Medium" : "High";
    }
  },
  methods: {},
  watch: {},
  mounted() {
    //document.querySelector("#bar").style.height = this.value + "px";
  }
};
</script>

<style scoped>
.barContainer {
  max-width: 300px;
  height: 100px;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.bar {
  width: 40%;
  background-color: black;
  left: 0;
  flex-grow: 0;
  margin: 0 auto;
}

.tag {
  text-align: center;
  z-index: 1;
  position: relative;
  bottom: 0;
}

.tagWhitespace {
  flex-grow: 10;
}
.barWhitespace {
  flex-grow: 10;
  display: flex;
  flex-direction: column;
}
</style>
