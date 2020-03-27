<template>
  <div class="introduction">
    <div v-show="searched">
      <h1>{{searchResult["Activity"]}}</h1>
      <table class="results" width="100%">
        <tr>
          <td width="25%">
            Risk Score:
            <br />
            <br />
            <h1>{{searchResult["Overall Risk Scoring"]}}</h1>
          </td>
          <td width="75%">
            <ul v-for="desc in riskDescription" align="left" >
              <li>{{desc}}</li>
            </ul>
          </td>
        </tr>
      </table>
    </div>
<!-- if the user has not yet created a profile, give them the option to after searching -->
    <div v-if="!profileCreated">
      <div v-show="searched">
        <div class="accordion" id="personalizedReport">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h2 class="mb-0">
                <button
                  class="btn btn-link"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >Share more info with us to get a personalized result.</button>
              </h2>
            </div>
            <div
              id="collapseOne"
              class="collapse"
              aria-labelledby="headingOne"
              data-parent="#personalizedReport"
            >
              <!-- <profile-create :searched="searched" /> -->
              <div style="margin-left:30%; margin-right:30%" >
                <p align="center">Fill in the blanks:</p>
                <div align="center">
                    How old are you? 
                  <select id="age" v-model="userAge">
                    <option v-for="age in ageGroups.groups">{{age}}</option>
                  </select>
                  <br />
                  Location:
                  <input type="text" v-model="userLocation" />
                  <br />
                  
                  Day:
                  <select id="day" v-model="userDay">
                    <option v-for="day in days">{{day}}</option>
                  </select>
                  <br />
                  
                  Time:
                  <select id="time" v-model="userTime">
                    <option v-for="time in times">{{time}}</option>
                  </select>
                  <br>

                  <button @click="submit">Submit</button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- once a user profile has been created -->
    <div v-else >
      <div v-if="searched">
        <h5>I am {{profile.age}} years old, and I go {{searchedTerm.toLowerCase()}} at {{userLocation}} at {{userTime}} on {{userDay}}. </h5>
        <div id="personalRecommendation">
          <div class="accordion" id="accordionExample">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h2 class="mb-0">
                  <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    You are going to {{searchedTerm}} at a <b>crowded</b> and <b>busy</b> time. (not interactive yet, need to figure out google crowding first)
                  </button>
                </h2>
              </div>
              <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body">
                  Learn More. Bar Graph of popular times to go here.
                </div>
              </div>
            </div>

            <div class="card" v-if="userAge=='50 to 69' || userAge=='70+'">
              <div class="card-header" id="headingTwo">
                <h2 class="mb-0">
                  <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    <!-- only show this for 50+ -->
                    Your age puts you at a higher risk for COVID-19
                  </button>
                </h2>
              </div>
              <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                <div class="card-body">
                  Learn More
                </div>
              </div>
            </div>
            <div v-if="comorbidity=='yes'">
              <div class="card">
                <div class="card-header" id="headingThree">
                  <h2 class="mb-0">
                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      Comorbididies will go here (static)
                    </button>
                  </h2>
                </div>
                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                  <div class="card-body">
                    More info
                  </div>
                </div>
              </div>
              <!-- set up additional accordians here for smoking, pregnancy, etc -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import profileCreate from "./profileCreate.vue"

export default {
  name: "searchResults",
  props: {
    searchedTerm: String,
    searchResult: Object,
    searched: {
      type: Boolean,
      default: false
    },
    profile: {
      type: Object,
    },
  },
  components: {
    profileCreate
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
      ]
      },
      times: [
        "Right now",
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
    },
    comorbidity() {
      let profile = this.$store.getters.submitProfile
      return profile.comorbidity
    }
  },
  methods: {
    submit() {
      this.submitted = true;
      console.log("submitted")
      // sends value to store letting user know they have created a profile
      this.$store.commit("createProfile", this.submitted);
      this.$store.commit("createAge", this.userAge);
    }
  },
  mounted() {
    this.userAge = this.$store.getters.createAge
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
