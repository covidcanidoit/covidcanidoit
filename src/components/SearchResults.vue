<template>
  <div class="introduction" id="search-results">
    <div v-show="activity.activityName">
      <div v-show="profile.COVIDpositive == 'yes'">
        <!-- if someone tested positive for coronavirus -->
        <b class="warning">
          Do not leave home except for essential medical visits. Even if you
          have not tested positive and do not feel ill, you can spread COVID-19.
        </b>
      </div>

      <RiskDescription
        :score="maybeAgeScore"
        :activity="activity"
        :isAgeScore="isAgeSet"
        v-show="profile.COVIDpositive !== 'yes'"
      />

      <div v-show="additionalRiskFactors.length > 0" class="additional-factors">
        <!-- need to add condition to v-show where if there is a location needed for the activity OR if (additionalRiskFactors.length > 0) -->
        <h2>Additional Risk Factors</h2>
        <div class="accordion" id="accordionExample">
          <!-- crowding accordian -->
          <div class="card">
            <div class="card-header" id="heading-crowding">
              <h2 class="mb-0 flex-row">
                <!-- insert corwding icon here -->
                <!-- <i class="icon" :class="riskFactor.icon"></i> -->
                <button
                  class="btn btn-link collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapse-crowding"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Check to see if it's going to be crowded when and where you
                  are
                </button>
              </h2>
            </div>
            <div
              id="collapse-crowding"
              class="collapse"
              aria-labelledby="heading-crowding"
              data-parent="#accordionExample"
            >
              <div class="card-body">
                <VueGoogleAutocomplete
                  classname="form-control"
                  id="map"
                  placeholder="Please type your address"
                  @placechanged="getAddressData"
                  :enableGeolocation="true"
                  types="establishment"
                />
                <button class="form-control btn-primary" @click="getBusyInfo">How Busy Will It Be?</button>
                <!-- <div>{{ busyResults }}</div> -->
                <div v-if="loadingBusyResults">Loading...</div>
                <div v-else>
                  <Chart v-if="busyResults" :crowdingData="busyResults" />
                </div>
              </div>
            </div>
          </div>

          <!-- risk factor accordians -->
          <div
            class="card"
            v-for="riskFactor in additionalRiskFactors"
            :key="riskFactor.name"
          >
            <div class="card-header" :id="'heading-' + riskFactor.name">
              <h2 class="mb-0 flex-row">
                <i class="icon" :class="riskFactor.icon"></i>
                <button
                  class="btn btn-link collapsed"
                  type="button"
                  data-toggle="collapse"
                  :data-target="'#collapse-' + riskFactor.name"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  {{ riskFactor.shortDescription }}
                </button>
              </h2>
            </div>
            <div
              :id="'collapse-' + riskFactor.name"
              class="collapse"
              :aria-labelledby="'heading-' + riskFactor.name"
              data-parent="#accordionExample"
            >
              <div class="card-body">
                <Markdown :source="riskFactor.longDescription" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Markdown from "vue-markdown";
import { mapGetters } from "vuex";
import RiskDescription from "@/components/RiskDescription.vue";
import Chart from "@/components/PopularTimesChart";
import VueGoogleAutocomplete from "vue-google-autocomplete";

import axios from "axios";

export default {
  components: { RiskDescription, Markdown, Chart, VueGoogleAutocomplete },
  props: {
    searchedTerm: String,
    activity: Object,
    profile: {
      type: Object
    }
  },
  data() {
    return {
      location: "",
      business: "",
      placeId: undefined,
      busyResults: undefined,
      loadingBusyResults: false,
      hasSearched: false
    };
  },
  computed: {
    ...mapGetters(["riskFactors"]),
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
    additionalRiskFactors() {
      return Object.values(this.riskFactors).filter(riskFactor => {
        console.log("Checking to see if we have", { riskFactor });
        const lookFor = riskFactor.showWhen.split(",");
        return lookFor.includes(this.profile[riskFactor.name]);
      });
    }
  },
  methods: {
    async getBusyInfo() {
      this.busyResults = undefined;
      this.loadingBusyResults = true;
      const locationResults = await axios.get(
        "https://thelackthereof.org/api",
        { params: { location: this.location, name: this.business, placeId: this.placeId } }
      );
      this.loadingBusyResults = false;
      this.busyResults = locationResults.data;
      this.hasSearched = true;
    },
    getAddressData(something, rawSomething) {
      console.log("Got some address data", something, rawSomething);
      this.placeId = rawSomething.reference;
      this.getBusyInfo();
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
  font-size: 24px;
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
.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.icon {
  width: 40px;
}
</style>
