<template>
  <div style="border: 1px solid black">
    <p>Testing the drilldown bar chart for busy times here...</p>
    <div id="vue-container">
      <div id="chartContainer" style="height: 360px; width: 100%;"></div>
    </div>
  </div>
</template>
<script>
var CanvasJS = require('canvasjs');
export default {
  name: "Test",
  props: {},
  data: function() {
    return {
      chartOptions: {
        title: {
          text: "CanvasJS Chart in Vue.js"
        },
        data: [
          {
            type: "column",
            dataPoints: [
              { x: 10, y: 71 },
              { x: 20, y: 55 },
              { x: 30, y: 50 },
              { x: 40, y: 65 },
              { x: 50, y: 95 },
              { x: 60, y: 68 },
              { x: 70, y: 28 },
              { x: 80, y: 34 },
              { x: 90, y: 14 }
            ]
          }
        ]
      },
      chart: null
    };
  },
  mounted() {
    this.chart = new CanvasJS.Chart("chartContainer", this.chartOptions);
    this.chart.render();
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
