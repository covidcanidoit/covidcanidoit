<template>
  <div class="introduction">
    <div v-show="searched">
      <div v-if="profile.COVIDpositive == 'yes'">
        <!-- if someone tested positive for coronavirus -->
        <b class="warning">
          Do not leave home except for essential medical visits. Even if you
          have not tested positive and do not feel ill, you can spread COVID-19.
        </b>

        <div class="accordion" id="accordionExample">
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
                >
                  You or someone in your household has tested positive for
                  COVID-19 (coronavirus).
                </button>
              </h2>
            </div>
            <div
              id="collapseOne"
              class="collapse show"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <div class="card-body">
                <p align="left">
                  The CDC recommends the following:
                </p>
                <ul>
                  <li>
                    When you need medical care, call ahead to the doctor or
                    medical facility to alert them that you have COVID-19 so
                    they can prepare to care for you and protect others at the
                    facility.
                  </li>
                  <br />
                  <li>
                    Outside of getting medical care, you should isolate yourself
                    to your home. Do not go to work, school, place of worship or
                    other public areas. Avoid using public transportation,
                    ride-sharing or taxis.
                  </li>
                </ul>
                <p>
                  Learn more:
                  <a
                    href="https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html"
                    target="_blank"
                    >https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html</a
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="profile.COVIDpositive !== 'yes'">
        <RiskDescription
          :score="maybeAgeScore"
          :activity="activity"
          :isAgeScore="isAgeSet"
        />

        <!-- <h5>
          I am {{ ageDescription }} years old, and I go
          {{ searchedTerm.toLowerCase() }} at {{ userLocation }} at
          {{ userTime }} on {{ userDay }}.
        </h5> -->

        <div v-show="hasAdditionalFactors" class="additional-factors">
          <h2>Additional Risk Factors</h2>
          <div class="accordion" id="accordionExample">
            <!-- Disabled location-specific since that's not hooked up yet -->
            <!--
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
                  >
                    You are going to {{ searchedTerm }} at a <b>crowded</b> and
                    <b>busy</b> time. (not interactive yet, need to figure out
                    google crowding first)
                  </button>
                </h2>
              </div>
              <div
                id="collapseOne"
                class="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div class="card-body">
                  Learn More. Bar Graph of popular times to go here.
                </div>
              </div>
            </div>
            -->

            <!-- only show this for 50+ -->
            <div
              class="card"
              v-if="profile.age == 'risk50To69' || profile.age == 'riskOver70'"
            >
              <div class="card-header" id="headingTwo">
                <h2 class="mb-0">
                  <button
                    class="btn btn-link collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Your age puts you at a higher risk for COVID-19
                  </button>
                </h2>
              </div>
              <div
                id="collapseTwo"
                class="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionExample"
              >
                <div class="card-body">
                  <p align="left">
                    Older adults may be at higher risk for more serious
                    complications from COVID-19.
                  </p>
                  <br />
                  The CDC recommends taking the following precautions:
                  <ul>
                    <li>• Stay home if possible.</li>
                    <br />
                    <li>• Wash your hands often.</li>
                    <br />
                    <li>
                      • Avoid close contact (6 feet, which is about two arm
                      lengths) with people who are sick.
                    </li>
                    <br />
                    <li>• Clean and disinfect frequently touched surfaces.</li>
                    <br />
                    <li>
                      • Avoid all cruise travel and non-essential air travel.
                    </li>
                    <br />
                    <li>
                      • Call your healthcare professional if you have concerns
                      about COVID-19 and your underlying condition or if you are
                      sick.
                    </li>
                    <br />
                    <li>
                      • For more information on steps you can take to protect
                      yourself, see CDC’s How to Protect Yourself
                    </li>
                  </ul>
                  <p>
                    Learn more:
                    <a
                      href="https://www.cdc.gov/coronavirus/2019-ncov/specific-groups/high-risk-complications/older-adults.html"
                      target="_blank"
                      >https://www.cdc.gov/coronavirus/2019-ncov/specific-groups/high-risk-complications/older-adults.html</a
                    >
                  </p>
                </div>
              </div>
            </div>
            <!-- only show for smokers -->
            <div v-if="profile.smoking == 'yes' || profile.smoking == 'used'">
              <!--could be yes or used to-->
              <div class="card">
                <div class="card-header" id="headingThree">
                  <h2 class="mb-0">
                    <button
                      class="btn btn-link collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Your smoking or history of smoking/vaping puts you at
                      higher risk for COVID-19
                    </button>
                  </h2>
                </div>
                <div
                  id="collapseThree"
                  class="collapse"
                  aria-labelledby="headingThree"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    <p align="left">
                      Smokers or individuals with a history of smoking/vaping
                      may be at higher risk for more serious complications from
                      COVID-19.
                      <br />
                      If you are able to avoid smoking for the time being, you
                      may want to consider smoking/vaping alternatives.
                      <br />
                      If you are unable to avoid smoking/vaping for the time
                      being, you may want to:
                    </p>
                    <ul>
                      <li>
                        • Avoid sharing smoking/vaping products such as water
                        pipes or cigarettes.
                      </li>
                      <li>
                        • Wash your hands thoroughly before smoking/vaping
                      </li>
                    </ul>
                    <p>
                      Learn more:
                      <a
                        href="https://www.who.int/news-room/q-a-detail/q-a-on-smoking-and-covid-19"
                        target="_blank"
                        >https://www.who.int/news-room/q-a-detail/q-a-on-smoking-and-covid-19</a
                      >
                      <br />
                      Learn more:
                      <a
                        href="https://www.drugabuse.gov/about-nida/noras-blog/2020/03/covid-19-potential-implications-individuals-substance-use-disorders"
                        target="_blank"
                        >https://www.drugabuse.gov/about-nida/noras-blog/2020/03/covid-19-potential-implications-individuals-substance-use-disorders</a
                      >
                      <br />
                      Learn more:
                      <a
                        href="https://tobacco.ucsf.edu/reduce-your-risk-serious-lung-disease-caused-corona-virus-quitting-smoking-and-vaping l"
                        target="_blank"
                        >https://tobacco.ucsf.edu/reduce-your-risk-serious-lung-disease-caused-corona-virus-quitting-smoking-and-vaping
                      </a>
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- if patient has additional comorbidity -->
            <div v-if="profile.comorbidity == 'yes'">
              <div class="card">
                <div class="card-header" id="headingFour">
                  <h2 class="mb-0">
                    <button
                      class="btn btn-link collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      You have underlying medical conditions which may increase
                      your risk for serious illness.
                    </button>
                  </h2>
                </div>
                <div
                  id="collapseFour"
                  class="collapse"
                  aria-labelledby="headingFour"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    <p align="left">
                      People of any age who have serious underlying medical
                      conditions may be at higher risk for more serious
                      complications from COVID-19.
                      <br />
                      The CDC recommends taking the following precautions:
                    </p>
                    <ul>
                      <li>• Stay home if possible.</li>
                      <br />
                      <li>• Wash your hands often.</li>
                      <br />
                      <li>
                        • Avoid close contact (6 feet, which is about two arm
                        lengths) with people who are sick.
                      </li>
                      <br />
                      <li>
                        • Clean and disinfect frequently touched surfaces.
                      </li>
                      <br />
                      <li>
                        • Avoid all cruise travel and non-essential air travel.
                      </li>
                      <br />
                      <li>
                        • Call your healthcare professional if you have concerns
                        about COVID-19 and your underlying condition or if you
                        are sick.
                      </li>
                      <br />
                      <li>
                        • For more information on steps you can take to protect
                        yourself, see CDC’s How to Protect Yourself
                      </li>
                    </ul>
                    <p>
                      Learn more:
                      <a
                        href="https://www.cdc.gov/coronavirus/2019-ncov/hcp/underlying-conditions.html"
                        target="_blank"
                        >https://www.cdc.gov/coronavirus/2019-ncov/hcp/underlying-conditions.html</a
                      ><br />
                      Learn more:
                      <a
                        href="https://www.cdc.gov/coronavirus/2019-ncov/specific-groups/hiv.html"
                        target="_blank"
                        >https://www.cdc.gov/coronavirus/2019-ncov/specific-groups/hiv.html</a
                      ><br />
                      Learn more:
                      <a
                        href="https://www.cdc.gov/coronavirus/2019-ncov/specific-groups/asthma.html"
                        target="_blank"
                        >https://www.cdc.gov/coronavirus/2019-ncov/specific-groups/asthma.html</a
                      ><br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- if patient is pregnant -->
            <div v-if="profile.pregnant == 'yes'">
              <div class="card">
                <div class="card-header" id="headingFive">
                  <h2 class="mb-0">
                    <button
                      class="btn btn-link collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      Pregnant women experience changes in their bodies that may
                      increase their risk of some infections.
                    </button>
                  </h2>
                </div>
                <div
                  id="collapseFive"
                  class="collapse"
                  aria-labelledby="headingFive"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    <p align="left">
                      The CDC recommends that pregnant women should do the same
                      things as the general public to avoid infection. You can
                      help stop the spread of COVID-19 by taking these actions:
                    </p>
                    <ul>
                      <li>
                        • Cover your cough (using your elbow is a good
                        technique)
                      </li>
                      <br />
                      <li>• Avoid people who are sick</li>
                      <br />
                      <li>
                        • Clean your hands often using soap and water or
                        alcohol-based hand sanitizer
                      </li>
                    </ul>
                    <p>
                      Learn more:
                      <a
                        href="https://www.who.int/news-room/q-a-detail/q-a-on-covid-19-pregnancy-childbirth-and-breastfeeding"
                        target="_blank"
                        >https://www.who.int/news-room/q-a-detail/q-a-on-covid-19-pregnancy-childbirth-and-breastfeeding</a
                      ><br />
                      Learn more:
                      <a
                        href=" https://www.cdc.gov/coronavirus/2019-ncov/prepare/pregnancy-breastfeeding.html"
                        target="_blank"
                      >
                        https://www.cdc.gov/coronavirus/2019-ncov/prepare/pregnancy-breastfeeding.html</a
                      ><br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- if patient is feeling sick -->
            <div v-if="profile.feelSick == 'yes'">
              <div class="card">
                <div class="card-header" id="headingSix">
                  <h2 class="mb-0">
                    <button
                      class="btn btn-link collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseSix"
                      aria-expanded="false"
                      aria-controls="collapseSix"
                    >
                      You are currently feeling sick.
                    </button>
                  </h2>
                </div>
                <div
                  id="collapseSix"
                  class="collapse"
                  aria-labelledby="headingSix"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    <p align="left">
                      Going out when you’re ill can expose others to what you
                      have!
                      <br />
                      The CDC recommends taking the following precautions:
                    </p>
                    <ul>
                      <li>• Stay home if possible.</li>
                      <br />
                      <li>• Wash your hands often.</li>
                      <br />
                      <li>
                        • Avoid close contact (6 feet, which is about two arm
                        lengths)
                      </li>
                      <br />
                      <li>
                        • Clean and disinfect frequently touched surfaces.
                      </li>
                      <br />
                      <li>
                        • Avoid all cruise travel and non-essential air travel.
                      </li>
                      <br />
                      <li>
                        • Call your healthcare professional if you have concerns
                        about COVID-19 and your underlying condition or if you
                        are sick.
                      </li>
                      <br />
                      <li>
                        • For more information on steps you can take to protect
                        yourself, see CDC’s
                        <a
                          href="https://www.cdc.gov/coronavirus/2019-ncov/prepare/prevention.html"
                          target="_blank"
                          >How to Protect Yourself</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!-- if patient has sick family -->
            <div v-if="profile.familySick == 'yes'">
              <div class="card">
                <div class="card-header" id="headingSeven">
                  <h2 class="mb-0">
                    <button
                      class="btn btn-link collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseSeven"
                      aria-expanded="false"
                      aria-controls="collapseSeven"
                    >
                      You have family members who feel sick.
                    </button>
                  </h2>
                </div>
                <div
                  id="collapseSeven"
                  class="collapse"
                  aria-labelledby="headingSeven"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    <p align="left">
                      You can spread an illness even when you’re not feeling
                      ill. If you have family members who feel sick, stay home
                      if possible and following the CDCs recommendations on
                      <a
                        href="https://www.cdc.gov/coronavirus/2019-ncov/prepare/prevention.html"
                        target="_blank"
                        >How to Protect Yourself</a
                      >.
                      <br />
                      Learn more:
                      <a
                        href="https://www.lvhn.org/testing-services/coronavirus-covid-19-care/faqs-you-or-family-member-has-covid-19"
                        target="_blank"
                        >https://www.lvhn.org/testing-services/coronavirus-covid-19-care/faqs-you-or-family-member-has-covid-19</a
                      >
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
import RiskDescription from "@/components/RiskDescription.vue";

export default {
  props: {
    searchedTerm: String,
    activity: Object,
    searched: {
      type: Boolean,
      default: false
    },
    profile: {
      type: Object
    }
  },
  components: {
    RiskDescription
  },
  data: function() {
    return {
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
      userTime: 0
    };
  },
  computed: {
    isAgeSet() {
      return this.profile.age && this.activity[this.profile.age];
    },
    maybeAgeScore() {
      if (this.profile.age && this.activity[this.profile.age]) {
        return this.activity[this.profile.age];
      } else {
        return this.activity.generalRiskScore;
      }
    },
    ageDescription() {
      return this.$store.getters.ageDescription;
    },
    hasAdditionalFactors() {
      return (
        this.profile.COVIDpositive !== "yes" &&
        (this.profile.age == "risk50To69" ||
          this.profile.age == "riskOver70" ||
          this.profile.smoking == "yes" ||
          this.profile.smoking == "used" ||
          this.profile.comorbidity == "yes" ||
          this.profile.pregnant == "yes" ||
          this.profile.feelSick == "yes" ||
          this.profile.familySick == "yes")
      );
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
.warning {
  color: red;
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
.additional-factors {
  background-color: $color-salmon;
  padding: 2em;
}
</style>
