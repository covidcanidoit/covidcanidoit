<template>
  <div>
    <div v-show="searched">
      <div>
        <div class="card-body">
          <p align="center">
            Please enter the following information about yourself:
          </p>
          <div align="left">
            <!-- age input -->
            <b>How old are you?</b> <br />
            <select id="age" v-model="userProfile.age">
              <option v-for="age in ageGroups.groups" :key="age.id">{{
                age
              }}</option>
            </select>
            <br />
            <!-- gender input -->
            <!-- do we actually need this? -->
            <!-- What is your gender?
            <br />
            <input type="radio" id="male" value="male" v-model="userProfile.gender">
            <label for="male">Male</label>
            <br>
            <input type="radio" id="female" value="female" v-model="userProfile.gender">
            <label for="female">Female</label>
            <br /> -->
            <!-- smoking input -->
            <b>Do you smoke/vape?</b>
            <br />
            <input
              type="radio"
              id="yes"
              value="yes"
              v-model="userProfile.smoking"
            />
            <label for="yes">Yes, I smoke/vape</label>
            <br />
            <input
              type="radio"
              id="no"
              value="no"
              v-model="userProfile.smoking"
            />
            <label for="no">No, I do not smoke/vape</label>
            <br />
            <input
              type="radio"
              id="used"
              value="used"
              v-model="userProfile.smoking"
            />
            <label for="used">I used to smoke/vape</label>
            <br />
            <!-- chronic medical condition input -->
            <b>Do you have any of the following chronic medical conditions?</b>
            <br />
            <input
              type="radio"
              id="yes"
              value="yes"
              v-model="userProfile.comorbidity"
            />
            <label for="yes">Yes</label>
            <br />
            <input
              type="radio"
              id="no"
              value="no"
              v-model="userProfile.comorbidity"
            />
            <label for="no">No</label>
            <br />
            List of Medical conditions
            <ol>
              <li>• Chronic kidney disease</li>
              <br />
              <li>• Organ or bone marrow transplant</li>
              <br />
              <li>• Active hepatitis B infection or Chronic liver disease</li>
              <br />
              <li>
                • Any cardiovascular/heart disease, including high blood
                pressure
              </li>
              <br />
              <li>• Diabetes</li>
              <br />
              <li>
                • Any chronic lung disease or condition, including asthma,
                COPD/chronic emphysema, or interstitial lung disease (such as
                pneumonitis or pulmonary fibrosis)
              </li>
              <br />
              <li>• Blood disorders such as sickle cell anemia</li>
              <br />
              <li>• Metabolic/mitochondrial disorders</li>
              <br />
              <li>
                • Neurologic/neurodevelopmental conditions including stroke,
                intellectual disability, moderate to severe neurodevelopmental
                delay, and neuromuscular diseases
              </li>
              <br />
              <li>
                • Any immunocompromising diseases or medications (diseases or
                medications that weaken your immune system)
              </li>
            </ol>
            <!-- pregnancy -->
            <b>Are you pregnant?</b>
            <br />
            <input
              type="radio"
              id="yes"
              value="yes"
              v-model="userProfile.pregnant"
            />
            <label for="yes">Yes</label>
            <br />
            <input
              type="radio"
              id="no"
              value="no"
              v-model="userProfile.pregnant"
            />
            <label for="no">No</label>
            <br />
            <!-- feel sick -->
            <b>Do you feel sick?</b>
            <br />
            <input
              type="radio"
              id="yes"
              value="yes"
              v-model="userProfile.feelSick"
            />
            <label for="yes">Yes</label>
            <br />
            <input
              type="radio"
              id="no"
              value="no"
              v-model="userProfile.feelSick"
            />
            <label for="no">No</label>
            <br />
            <!-- family sick -->
            <b>Do you have family members who are sick?</b>
            <br />
            <input
              type="radio"
              id="yes"
              value="yes"
              v-model="userProfile.familySick"
            />
            <label for="yes">Yes</label>
            <br />
            <input
              type="radio"
              id="no"
              value="no"
              v-model="userProfile.familySick"
            />
            <label for="no">No</label>
            <br />
            <!-- test postive for COVID-19? -->
            <b
              >Has anyone in your household or apartment tested positive for
              COVID-19 (coronavirus)?</b
            >
            <br />
            <input
              type="radio"
              id="yes"
              value="yes"
              v-model="userProfile.COVIDpositive"
            />
            <label for="yes">Yes</label>
            <br />
            <input
              type="radio"
              id="no"
              value="no"
              v-model="userProfile.COVIDpositive"
            />
            <label for="no">No</label>
            <br />
            <button @click="submit" to="/userProfile">Create Profile</button>
          </div>
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
        ]
      },
      submitted: false,
      userProfile: {
        age: 0,
        gender: "male",
        smoking: "no",
        comorbidity: "no",
        pregnant: "no",
        feelSick: "no",
        familySick: "no",
        COVIDpositive: "no"
      }
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
      let index = null;
      this.ageGroups.groups.map((group, id) => {
        console.log(group, this.userAge, id);
        if (group == this.userAge) {
          index = id;
        }
      });
      return index;
    }
  },
  mounted() {
    this.userProfile = this.$store.getters.submitProfile;
  },
  methods: {
    submit() {
      this.submitted = true;
      console.log("submitted");
      // sends value to store letting user know they have created a profile
      this.$store.commit("createProfile", this.submitted);
      //send user profile values
      this.$store.commit("submitProfile", this.userProfile);
      // if we are on the create profile page, move to the current profile page, otherwise stay where you are
      if (this.$router.currentRoute.name == "createUserProfile") {
        this.$router.push("userProfile");
      }
      //if we are on the home page, trigger the submit function in the results view
      // console.log("rotername:", this.$router.currentRoute.name)
      if (this.$router.currentRoute.name == "Home") {
        this.$store.commit("setSubmitted", this.submitted);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
