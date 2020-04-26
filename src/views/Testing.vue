<template>
  <div style="border: 1px solid black">
    <p>Testing the drilldown bar chart for busy times here...</p>
    <canvas id="myChart"></canvas>
  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>

<script>
import Chart from "chart.js";
export default {
  name: "Test",
  props: {
    crowdingData: {
      type: Object,
      default: {
        weekly: [0, 10, 5, 2, 20, 30, 45],
        populartimes: [
          {
            name: "Monday",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 12, 29, 45, 54, 48, 32, 16, 22, 45, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "Tuesday",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 9, 25, 41, 45, 32, 19, 22, 35, 22, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "Wednesday",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 12, 22, 29, 29, 22, 22, 35, 51, 38, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "Thursday",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 3, 16, 45, 64, 54, 38, 45, 41, 22, 0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "Friday",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 12, 19, 29, 51, 61, 48, 45, 48, 38, 22, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "Saturday",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 9, 25, 51, 83, 100, 93, 77, 90, 45, 6, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "Sunday",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 16, 32, 58, 83, 100, 96, 74, 48, 25, 0, 0, 0, 0, 0, 0, 0]
          }
        ]
      }
    }
  },
  data: function() {
    return {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      hours: ["1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
              "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM", "12:00 AM"],
      //this is to track if we are on daily or weekly view
      daily: false
    };
  },
  mounted() {
    this.weeklyPlot();
  },
  methods: {
    createPlot(plotData) {
      var ctx = document.getElementById("myChart").getContext("2d");
      var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: "bar",

        // The data for our dataset
        data: plotData,

        // Configuration options go here
        options: {
          onClick: (evt, item) => {
            // console.log(evt, item);
            if (this.daily){
              this.weeklyPlot();
              this.daily = false
            }else{
              this.drillDown(item[0]["_index"]);
              this.daily = true
            }
          },
          // This chart will not respond to mousemove, etc
          events: ['click']
        }
      });
    },
    weeklyPlot(){
      this.createPlot({
      labels: this.days,
      datasets: [
        {
          label: "Popular Times (weekly)",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: this.crowdingData.weekly
        }
      ]
    });
    },
    drillDown(index) {
          let day = this.days[index]
          //replot with daily data
          this.createPlot({
          labels: this.hours,
          datasets: [
            {
              label: "Popular Times ("+day+")",
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: this.crowdingData.populartimes[index].data
            }
          ]
        });      
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
</style>
