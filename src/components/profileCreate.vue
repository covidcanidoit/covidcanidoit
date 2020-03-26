<template>
  <div>
    <div v-show="searched">
      <div>
        <div class="card-body">
          Fill in the blanks:
          <br />Age:
          <select id="age" v-model="userAge">
            <option v-for="age in ageGroups.groups">{{age}}</option>
          </select>
          <br />Location:
          <input type="text" v-model="userLocation" />
          <br />Day:
          <select id="day" v-model="userDay">
            <option v-for="day in days">{{day}}</option>
          </select>
          <br />Time:
          <select id="time" v-model="userTime">
            <option v-for="time in times">{{time}}</option>
          </select>
          <br>
          <button @click="submit">Create Profile</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "profileCreate",
  props: {
    searched: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      scores: {
        score: [1, 2, 3, 4, 5],
        riskCategory: ["Low", "Moderate", "Elevated", "High", "Critical"],
        riskDescription: [
          [
            "•You can continue to do this activity.",
            "•The frequency and nature of the activity puts you at low risk for contracting or transmitting COVID-19.",
            "•You may still want to take extra precautions for prevent infection."
          ],
          [
            "•You can continue to do this activity but you should consider ways to do this activity less or during less risky times.",
            "•The frequency and nature of the activity puts you at some risk for contracting or transmitting COVID-19.",
            "•Make sure to take extra precautions for prevent infection, like frequently washing your hands (with soap) for at least 20 seconds and remaining 6 feet from another person."
          ],
          [
            "•You should consider stopping this activity.",
            "•If you are unable to stop, you should consider ways to do this activity less or during less risky times.",
            "•The frequency and nature of the activity puts you at more risk for contracting or transmitting COVID-19.",
            "•Extra precautions to preventing infection are not enough, like frequently washing your hands (with soap) for at least 20 seconds and remaining 6 feet from another person. "
          ],
          [
            "•You should stop this activity.",
            "•The frequency and nature of the activity puts you at high risk for contracting or transmitting COVID-19.",
            "•You may be endangering others and efforts to control the outbreak.",
            "•Extra precautions to preventing infection are not enough, like frequently washing your hands (with soap) for at least 20 seconds and remaining 6 feet from another person. "
          ],
          [
            "•Stop this activity immediately.",
            "•The frequency and nature of the activity is endangering yourself and efforts to control the COVID-19 outbreak, regardless of extra precautions to preventing infection, like frequently washing your hands (with soap) for at least 20 seconds and remaining 6 feet from another person. "
          ]
        ]
      },
      ageGroups: {
        groups: [
        "Under 10",
        "10 to 18",
        "18 to 19",
        "20 to 29",
        "30 to 49",
        "50 to 69",
        "70+"
      ],
      message: [
        "at higher risk",
        "at lower risk",
        "at low risk",
        "at lower risk",
        "at slightly higher risk",
        "at higher risk",
        "at significantly higher risk",
      ]
      },
      times: [
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
        "12:00 AM",
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
        "12:00 PM"
      ],
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      userAge: 0,
      userLocation: "",
      userDay: "",
      userTime: 0,
      submitted: false
    };
  },
  computed: {
    riskScore() {
      return this.searchResult["Overall Risk Scoring"];
    },
    riskDescription() {
      return this.scores.riskDescription[this.riskScore];
    },
    profileCreated() {
      //track if the user has created a profile yet
      return this.$store.getters.createProfile;
    },
    ageIndex() {
      let index = null
      this.ageGroups.groups.map((group, id) => {
        console.log(group, this.userAge, id)
        if(group == this.userAge){index= id}
      })
      return index
    }
  },
  methods: {
    submit() {
      this.submitted = true;
      console.log("submitted")
      // sends value to store letting user know they have created a profile
      this.$store.commit("createProfile", this.submitted);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.results {
  color: black;
  background-color: #e8ebf5;
}
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
