<template>
  <div id="canvasContainer" style="border: 1px solid black">
    <canvas id="myChart"></canvas>
    <caption id="captionChart" class="chartCaption">
      Click on a bar to see hourly busy times for the day.
    </caption>
  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>

<script>
import Chart from "chart.js";
export default {
  watch: {
    crowdingData(oldVal, newVal) {
      this.updatePlot();
    }
  },
  props: {
    crowdingData: {
      type: Object,
      default: null
    }
  },
  data: function() {
    return {
      chart: null,
      displayChart: false,
      gradient: null,
      hoverGradient: null,
      riskLabels: [
        "1 - Low Risk",
        "2 - Moderate Risk",
        "3 - Elevated Risk",
        "4 - High Risk",
        "5 - Critical Risk"
      ],
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      hours: [
        "1:00 AM",
        "2:00 AM",
        "3:00 AM",
        "4:00 AM",
        "5:00 AM",
        "6:00 AM",
        "7:00 AM",
        "8:00 AM",
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "1:00 PM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
        "5:00 PM",
        "6:00 PM",
        "7:00 PM",
        "8:00 PM",
        "9:00 PM",
        "10:00 PM",
        "11:00 PM",
        "12:00 AM"
      ],
      //this is to track if we are on daily or weekly view
      daily: false
    };
  },
  mounted() {
    var ctx = document.getElementById("myChart").getContext("2d");
    //this will be where we set up color gradient
    this.gradient = ctx.createLinearGradient(0, 0, 0, 400);
    this.gradient.addColorStop(0, "rgb(253,97,103)");
    this.gradient.addColorStop(1, "rgb(253,97,103)");
    this.hoverGradient = ctx.createLinearGradient(0, 0, 0, 400);
    this.hoverGradient.addColorStop(0, "rgb(163,7,13)");
    this.hoverGradient.addColorStop(1, "rgb(163,7,13)");
    /*this.hoverGradient.addColorStop(0, "rgb(33,172,176)");
    this.hoverGradient.addColorStop(1, "rgb(33,172,176)");*/
    this.updatePlot();
  },
  methods: {
    clearPlot() {
      var canvas = document.getElementById("myChart");
      var canvasContainer = document.getElementById("canvasContainer");
      canvasContainer.removeChild(canvas);
      var canvas = document.createElement("canvas");
      canvas.setAttribute("id", "myChart");
      var caption = document.getElementById("captionChart");
      canvasContainer.insertBefore(canvas, caption);
    },
    updatePlot() {
      this.createPlot({
        labels: this.days,
        datasets: [
          {
            label: this.riskLabels[0],
            backgroundColor: this.gradient,
            hoverBackgroundColor: this.hoverGradient,
            borderColor: this.gradient,
            data: this.weeklyData
          }
        ]
      });
    },
    createPlot(plotData) {
      this.clearPlot();
      if (this.crowdingData == "error") {
        //if no crowding data, display "No data available"
        this.displayChart = false;
      } else {
        this.displayChart = true;
        var ctx = document.getElementById("myChart").getContext("2d");

        this.chart = new Chart(ctx, {
          // The type of chart we want to create
          type: "bar",

          // The data for our dataset
          data: plotData,

          // Configuration options go here
          options: {
            legend: {
              display: false
            },
            title: {
              text: this.crowdingData.name,
              display: true
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    display: false
                  }
                }
              ]
            },
            tooltips: {
              mode: "point",
              callbacks: {
                label: function(tooltipItem, data) {
                  var label =
                    data.datasets[tooltipItem.datasetIndex].label || "";
                  var riskLabels = [
                    "1 - Low Risk",
                    "2 - Moderate Risk",
                    "3 - Elevated Risk",
                    "4 - High Risk",
                    "5 - Critical Risk"
                  ];
                  if (label) {
                    switch (true) {
                      case tooltipItem.yLabel <= 20:
                        label = riskLabels[0];
                        break;
                      case tooltipItem.yLabel <= 40:
                        label = riskLabels[1];
                        break;
                      case tooltipItem.yLabel <= 60:
                        label = riskLabels[2];
                        break;
                      case tooltipItem.yLabel <= 80:
                        label = riskLabels[3];
                        break;
                      default:
                        label = riskLabels[4];
                    }
                    label += ": ";
                  }
                  label += Math.round(tooltipItem.yLabel * 100) / 100;
                  return label;
                }
              }
            },
            onClick: (evt, item) => {
              if (!this.daily && item[0]) {
                this.drillDown(item[0]["_index"]);
              } else {
                this.createPlot({
                  labels: this.days,
                  datasets: [
                    {
                      label: "busy hours",
                      backgroundColor: this.gradient,
                      hoverBackgroundColor: this.hoverGradient,
                      borderColor: this.gradient,
                      data: this.weeklyData
                    }
                  ]
                });
                this.daily = false;
              }
            },
            onHover: (evt, items) => {
              if (items.length === 0) {
                document.getElementById("myChart").style.cursor = "default";
              } else {
                document.getElementById("myChart").style.cursor = "pointer";
              }
              //console.log("hovering",evt,item);
            },
            // This chart will not respond to mousemove, etc
            events: ["click", "mousemove", "mouseout"]
          }
        });
        var bars = this.chart.config.data.datasets[0];
        bars.backgroundColor = [];
        bars.borderColor = [];
        bars.hoverBackgroundColor = [];
        // console.log("bars");
        // console.log(bars);
        for (var i = 0; i < bars.data.length; i++) {
          const x = bars.data[i];
          //there's probably a better way to get our colors for risk 1-5 here but I'm no sure where they're saved
          switch (true) {
            case x <= 20:
              var color = "#339900";
              break;
            case x <= 40:
              var color = "#99cc33";
              break;
            case x <= 60:
              var color = "#ffcc00";
              break;
            case x <= 80:
              var color = "#ff9966";
              break;
            default:
              var color = "#cc3300";
          }

          //You can check for bars[i].value and put your conditions here
          bars.backgroundColor.push(color);
          bars.hoverBackgroundColor.push(color);
          bars.borderColor.push(color);
        }
        this.chart.update();
      }
    },
    drillDown(index) {
      let day = this.days[index];

      this.daily = true;
      //console.log("day: ", day);
      //console.log(this.crowdingData.populartimes[index].data);
      //replot with daily data
      this.createPlot({
        labels: this.hours,
        datasets: [
          {
            label: this.crowdingData.name,
            backgroundColor: "grey",
            borderColor: "grey",
            data: this.crowdingData.populartimes[index].data
          }
        ]
      });
    }
  },
  computed: {
    weeklyData() {
      //will compute the weekly trend here
      let weekAvg = [];
      if (this.crowdingData.populartimes) {
        this.crowdingData.populartimes.forEach(day => {
          //console.log(day.data);
          var total = 0;
          for (var i = 0; i < day.data.length; i++) {
            total += day.data[i];
          }
          var avg = total / day.data.length;
          //console.log(avg);
          weekAvg.push(avg);
        });
      }
      return weekAvg;
    }
  }
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

.chartCaption {
  float: left;
  font-weight: italic;
  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    font-size: 0.6em;
  }
}

#canvasContainer {
  width: 35vw;
  height: 20vw;
  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    width: 100%;
    height: 100%;
  }
}
</style>
