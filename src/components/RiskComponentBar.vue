<template>
  <div id="barContainer" class="barContainer">
    <div class="barWhitespace">
      <div class="tagWhitespace"></div>
      <div class="tag">{{level}}</div>
    </div>
    <div id="bar" class="bar" :style="barStyle">
    </div>
  </div>
</template>

<script>

export default {
  props: ["value"],
  computed: {
    barHeight() {
      return `height: ${this.value}px`;
    },
    barStyle() {
      return `height: ${this.value}px; background-color: ${this.value < 33 ? "green" : (this.value < 66 ? "yellow": "red")};`;
    },
    level() {
      return this.value < 33 ? "Low" : (this.value < 66 ? "Medium" : "High");
    }
  },
  methods: {

  },
  watch: {

  },
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
}

.bar {
  width: 100%;
  background-color: black;
  left: 0;
  flex-grow: 0;
}

.tag {
  text-align: center;
  z-index: 1;
  position: relative;
  bottom:0;
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