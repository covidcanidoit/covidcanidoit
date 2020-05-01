<template>
  <div style="border: 1px solid black">
    <canvas id="myChart"></canvas>
  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>

<script>
import Chart from "chart.js";
export default {
  name: "Popular Timea",
  props: {
    crowdingData: {
      type: Object,
      default: {
        address: "2123 14th St NW, Washington, DC 20009, USA",
        coordinates: {
          lat: 38.9185198,
          lng: -77.031746
        },
        id: "ChIJJX1IC-e3t4kRcEtgkyeBQmE",
        international_phone_number: "+1 202-232-6603",
        name: "Yes! Organic Market 14th St.",
        populartimes: [
          {
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              75,
              93,
              69,
              56,
              63,
              66,
              61,
              52,
              47,
              55,
              70,
              78,
              70,
              47,
              24,
              0,
              0
            ],
            name: "Monday"
          },
          {
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              16,
              27,
              38,
              49,
              55,
              55,
              49,
              41,
              35,
              40,
              55,
              67,
              64,
              46,
              23,
              0,
              0
            ],
            name: "Tuesday"
          },
          {
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              23,
              35,
              47,
              55,
              60,
              56,
              50,
              44,
              43,
              47,
              55,
              56,
              49,
              35,
              20,
              0,
              0
            ],
            name: "Wednesday"
          },
          {
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              33,
              49,
              60,
              64,
              60,
              49,
              36,
              30,
              35,
              47,
              61,
              67,
              58,
              40,
              21,
              0,
              0
            ],
            name: "Thursday"
          },
          {
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              46,
              44,
              43,
              55,
              64,
              61,
              50,
              43,
              50,
              72,
              89,
              87,
              64,
              35,
              13,
              0,
              0
            ],
            name: "Friday"
          },
          {
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              60,
              60,
              56,
              90,
              96,
              49,
              33,
              56,
              87,
              100,
              84,
              52,
              23,
              6,
              0,
              0
            ],
            name: "Saturday"
          },
          {
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              32,
              40,
              72,
              86,
              72,
              52,
              52,
              67,
              84,
              92,
              86,
              67,
              44,
              24,
              0,
              0
            ],
            name: "Sunday"
          }
        ],
        rating: 4.5,
        rating_n: 133,
        time_spent: [15, 15],
        types: [
          "grocery_or_supermarket",
          "food",
          "point_of_interest",
          "store",
          "establishment"
        ]
      }
    }
  },
  data: function() {
    return {
      gradient: null,
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
    this.createPlot({
      labels: this.days,
      datasets: [
        {
          label: this.crowdingData.name,
          backgroundColor: this.gradient,
          borderColor: this.gradient,
          data: this.weeklyData
        }
      ]
    });
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
          scales: {
            yAxes: [
              {
                ticks: {
                  display: false
                }
              }
            ]
          },
          onClick: (evt, item) => {
            console.log(evt, item);
            if (!this.daily) {
              this.drillDown(item[0]["_index"]);
            } else {
              this.createPlot({
                labels: this.days,
                datasets: [
                  {
                    label: this.crowdingData.name,
                    backgroundColor: this.gradient,
                    borderColor: this.gradient,
                    data: this.weeklyData
                  }
                ]
              });
              this.daily = false;
            }
          },
          // This chart will not respond to mousemove, etc
          events: ["click"]
        }
      });
    },
    drillDown(index) {
      let day = this.days[index];

      this.daily = true;
      console.log("day: ", day);
      console.log(this.crowdingData.populartimes[index].data);
      //replot with daily data
      this.createPlot({
        labels: this.hours,
        datasets: [
          {
            label: this.crowdingData.name,
            backgroundColor: this.gradient,
            borderColor: this.gradient,
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
      this.crowdingData.populartimes.forEach(day => {
        console.log(day.data);
        var total = 0;
        for (var i = 0; i < day.data.length; i++) {
          total += day.data[i];
        }
        var avg = total / day.data.length;
        console.log(avg);
        weekAvg.push(avg);
      });
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
</style>
