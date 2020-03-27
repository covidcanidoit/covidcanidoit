<template>
  <div class="introduction">
    <div v-show="searched" >
      <!-- only show if they are not covid positive -->
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
    <div v-if="!checkSubmitted">
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
                <div align="center">
                  <div v-if="profile.COVIDpositive == 'no'">
                      <p align="center">Please fill in the information below specific to {{searchResult["Activity"]}}:</p>
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
                  <div v-if="createProfile==false">
                    <profile-create :searched="searched" />
                  </div>
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
          <!-- only display this message if the user doesnt have covid19 -->
          <h5>I am {{profile.age}} years old, and I go {{searchedTerm.toLowerCase()}} at {{userLocation}} at {{userTime}} on {{userDay}}. </h5>
        
        <!-- {{profile}} -->
        <!-- only show the personal recommendation if they have not tested positive for coronavirus, otherwise only show the warning to quarantine -->
        <div v-if="profile.COVIDpositive=='no'" id="personalRecommendation">
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
            <!-- only show this for 50+ -->
            <div class="card" v-if="userAge=='50 to 69' || userAge=='70+'">
              <div class="card-header" id="headingTwo">
                <h2 class="mb-0">
                  <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Your age puts you at a higher risk for COVID-19
                  </button>
                </h2>
              </div>
              <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                <div class="card-body">
                  <p align="left">
                    Older adults may be at higher risk for more serious complications from COVID-19.
                    <br>
                    The CDC recommends taking the following precautions:
                    <ul>
                      <li>•	Stay home if possible.</li><br>
                      <li>•	Wash your hands often.</li><br>
                      <li>•	Avoid close contact (6 feet, which is about two arm lengths) with people who are sick.</li><br>
                      <li>•	Clean and disinfect frequently touched surfaces.</li><br>
                      <li>•	Avoid all cruise travel and non-essential air travel.</li><br>
                      <li>•	Call your healthcare professional if you have concerns about COVID-19 and your underlying condition or if you are sick.</li><br>
                      <li>•	For more information on steps you can take to protect yourself, see CDC’s How to Protect Yourself</li>                   
                    </ul>
                    Learn more: <a href="https://www.cdc.gov/coronavirus/2019-ncov/specific-groups/high-risk-complications/older-adults.html" target="_blank">https://www.cdc.gov/coronavirus/2019-ncov/specific-groups/high-risk-complications/older-adults.html</a>
                    </p>
                </div>
              </div>
            </div>
            <!-- only show for smokers -->
            <div v-if="profile.smoking=='yes' || profile.smoking=='used'"> <!--could be yes or used to-->
              <div class="card">
                <div class="card-header" id="headingThree">
                  <h2 class="mb-0">
                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      Your smoking or history of smoking/vaping puts you at higher risk for COVID-19
                    </button>
                  </h2>
                </div>
                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                  <div class="card-body">
                    <p align="left">
                      Smokers or individuals with a history of smoking/vaping may be at higher risk for more serious complications from COVID-19.
                      <br>
                        If you are able to avoid smoking for the time being, you may want to consider smoking/vaping alternatives.
                        <br>
                        If you are unable to avoid smoking/vaping for the time being, you may want to:
                        <ul>
                          <li>•	Avoid sharing smoking/vaping products such as water pipes or cigarettes.</li>
                          <li>•	Wash your hands thoroughly before smoking/vaping</li>
                        </ul>
                        Learn more: <a href="https://www.who.int/news-room/q-a-detail/q-a-on-smoking-and-covid-19" target="_blank">https://www.who.int/news-room/q-a-detail/q-a-on-smoking-and-covid-19</a> <br>
                        Learn more: <a  href="https://www.drugabuse.gov/about-nida/noras-blog/2020/03/covid-19-potential-implications-individuals-substance-use-disorders" target="_blank">https://www.drugabuse.gov/about-nida/noras-blog/2020/03/covid-19-potential-implications-individuals-substance-use-disorders</a> <br>
                        Learn more: <a  href="https://tobacco.ucsf.edu/reduce-your-risk-serious-lung-disease-caused-corona-virus-quitting-smoking-and-vaping l" target="_blank">https://tobacco.ucsf.edu/reduce-your-risk-serious-lung-disease-caused-corona-virus-quitting-smoking-and-vaping l</a> <br>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- if patient has additional comorbidity -->
              <div v-if="profile.comorbidity=='yes'">
                <div class="card">
                  <div class="card-header" id="headingFour">
                    <h2 class="mb-0">
                      <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                        You have underlying medical conditions which may increase your risk for serious illness.
                      </button>
                    </h2>
                  </div>
                  <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                    <div class="card-body">
                      <p align="left">
                        People of any age who have serious underlying medical conditions may be at higher risk for more serious complications from COVID-19.
                        <br>
                        The CDC recommends taking the following precautions:<br>
                        <ul>
                          <li>•	Stay home if possible.</li><br>
                          <li>•	Wash your hands often.</li><br>
                          <li>•	Avoid close contact (6 feet, which is about two arm lengths) with people who are sick.</li><br>
                          <li>•	Clean and disinfect frequently touched surfaces.</li><br>
                          <li>•	Avoid all cruise travel and non-essential air travel.</li><br>
                          <li>•	Call your healthcare professional if you have concerns about COVID-19 and your underlying condition or if you are sick.</li><br>
                          <li>•	For more information on steps you can take to protect yourself, see CDC’s How to Protect Yourself</li>
                        </ul>
                        Learn more: <a href="https://www.cdc.gov/coronavirus/2019-ncov/hcp/underlying-conditions.html" target="_blank">https://www.cdc.gov/coronavirus/2019-ncov/hcp/underlying-conditions.html</a><br>
                        Learn more: <a href="https://www.cdc.gov/coronavirus/2019-ncov/specific-groups/hiv.html" target="_blank">https://www.cdc.gov/coronavirus/2019-ncov/specific-groups/hiv.html</a><br>
                        Learn more: <a href="https://www.cdc.gov/coronavirus/2019-ncov/specific-groups/asthma.html" target="_blank">https://www.cdc.gov/coronavirus/2019-ncov/specific-groups/asthma.html</a><br>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- if patient is pregnant -->
              <div v-if="profile.pregnant=='yes'">
                <div class="card">
                  <div class="card-header" id="headingFive">
                    <h2 class="mb-0">
                      <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                        Pregnant women experience changes in their bodies that may increase their risk of some infections. 
                      </button>
                    </h2>
                  </div>
                  <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
                    <div class="card-body">
                      <p align="left">
                        The CDC recommends that pregnant women should do the same things as the general public to avoid infection. You can help stop the spread of COVID-19 by taking these actions:
                        <ul>
                          <li>•	Cover your cough (using your elbow is a good technique)</li><br>
                          <li>•	Avoid people who are sick</li><br>
                          <li>•	Clean your hands often using soap and water or alcohol-based hand sanitizer</li>
                        </ul>
                        Learn more: <a href="https://www.who.int/news-room/q-a-detail/q-a-on-covid-19-pregnancy-childbirth-and-breastfeeding" target="_blank">https://www.who.int/news-room/q-a-detail/q-a-on-covid-19-pregnancy-childbirth-and-breastfeeding</a><br>
                        Learn more: <a href=" https://www.cdc.gov/coronavirus/2019-ncov/prepare/pregnancy-breastfeeding.html" target="_blank"> https://www.cdc.gov/coronavirus/2019-ncov/prepare/pregnancy-breastfeeding.html</a><br>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- if patient is feeling sick -->
              <div v-if="profile.feelSick=='yes'">
                <div class="card">
                  <div class="card-header" id="headingSix">
                    <h2 class="mb-0">
                      <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                        You are currently feeling sick.
                      </button>
                    </h2>
                  </div>
                  <div id="collapseSix" class="collapse" aria-labelledby="headingSix" data-parent="#accordionExample">
                    <div class="card-body">
                      <p align="left">
                        Going out when you’re ill can expose others to what you have! 
                        <br>
                        The CDC recommends taking the following precautions:
                        <ul>
                          <li>•	Stay home if possible.</li><br>
                          <li>•	Wash your hands often.</li><br>
                          <li>•	Avoid close contact (6 feet, which is about two arm lengths)</li><br>
                          <li>•	Clean and disinfect frequently touched surfaces.</li><br>
                          <li>•	Avoid all cruise travel and non-essential air travel.</li><br>
                          <li>•	Call your healthcare professional if you have concerns about COVID-19 and your underlying condition or if you are sick.</li><br>
                          <li>•	For more information on steps you can take to protect yourself, see CDC’s <a href="https://www.cdc.gov/coronavirus/2019-ncov/prepare/prevention.html" target="_blank">How to Protect Yourself</a></li>
                        </ul>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- if patient has sick family -->
              <div v-if="profile.familySick=='yes'">
                <div class="card">
                  <div class="card-header" id="headingSeven">
                    <h2 class="mb-0">
                      <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                        You have family members who feel sick.
                      </button>
                    </h2>
                  </div>
                  <div id="collapseSeven" class="collapse" aria-labelledby="headingSeven" data-parent="#accordionExample">
                    <div class="card-body">
                      <p align="left">
                        You can spread an illness even when you’re not feeling ill. If you have family members who feel sick, stay home if possible and following the CDCs recommendations on <a href="https://www.cdc.gov/coronavirus/2019-ncov/prepare/prevention.html" target="_blank">How to Protect Yourself</a>.
                        <br>
                        Learn more: <a href="https://www.lvhn.org/testing-services/coronavirus-covid-19-care/faqs-you-or-family-member-has-covid-19" target="_blank">https://www.lvhn.org/testing-services/coronavirus-covid-19-care/faqs-you-or-family-member-has-covid-19</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import profileCreate from "@/components/profileCreate.vue"

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
      userAge: 0,
      submitted: false
    };
  },
  computed: {
    riskScore() {
      return this.searchResult["Overall Risk Scoring"];
    },
    riskDescription() {
      return this.scores.riskDescription[this.riskScore-1];
    },
    getAge() {
      return this.$store.getters.createAge
    },
    comorbidity() {
      let profile = this.$store.getters.submitProfile
      return profile.comorbidity
    },
    createProfile() {
      return this.$store.getters.createProfile
    },
    checkSubmitted() {
      this.submitted = this.$store.getters.setSubmitted
      if(this.$store.getters.submitProfile.COVIDpositive == "yes"){this.submitted = true} //if the patient tests positive for COVID19, we dont bother asking about location, time of activity
      return this.submitted
    }
  },
  methods: {
    submit() {
      this.submitted = true;
      console.log("submitted")
      // sends value to store letting user know they have created a profile
      // this.$store.commit("createProfile", this.submitted);
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
.warning {
  color: red
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
