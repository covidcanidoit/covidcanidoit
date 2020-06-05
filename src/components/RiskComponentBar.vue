<template>
  <div id="barContainer" class="barContainer">
    <div class="tagContainer">
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
}

.bar {
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: black;
  left: 0;
}

.tag {
  position: absolute;
  bottom: 0;  
  text-align: center;
  z-index: 1;
}

.tagContainer {
  height: auto;
}
</style>