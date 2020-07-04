<template>
  <div class="risk-description d-flex flex-column">

    <div class="score-panel">
      <div v-if="isAgeScore">
        <b>{{ activity.activityName }}</b> has an Age-Specific risk level of
      </div>
      <div v-else>
        <b>{{ activity.activityName }}</b>
        <div style="white-space: nowrap">has a risk level of</div>
      </div>
      <div class="score">{{ risk && risk.riskScore }}</div>
      <div class="score-title">{{ risk && risk.riskName }}</div>
      <ScoreScale :score="score" />
      <v-spacer></v-spacer>

      <RiskComponents :activity="activity"></RiskComponents>
    </div>


    <div class="risk-information">
      <v-container fluid class="crowdingBar">
        <div v-show="activity.showLocation == 'TRUE'">
          <div class="d-flex justify-center align-center">
            <span>
              How busy will it be?
            </span>
            <VueGoogleAutocomplete
              classname="busyLocation"
              id="map"
              placeholder="Please enter the activity location"
              @placechanged="getAddressData"
              :enableGeolocation="true"
              :geolocationOptions="{ enableHighAccuracy: false }"
              types="establishment"
            />
            <button class="busyCheckButton btn-primary" @click="getBusyInfo">
              Check your location
            </button>
          </div>
          <div v-if="loadingBusyResults">Loading...</div>
          <div v-else>
            <div v-if="busyResults" class="d-flex justify-center">
              <div v-if="busyResults == 'error'">Data not available</div>
              <Chart v-else :crowdingData="busyResults" class="busyChart" />
            </div>
          </div>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ScoreScale from "@/components/ScoreScale.vue";
import Chart from "@/components/PopularTimesChart";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import RiskComponents from "@/components/RiskComponents.vue";

import axios from "axios";

export default {
  components: {
    ScoreScale,
    Chart,
    VueGoogleAutocomplete,
    RiskComponents
  },
  props: {
    score: {
      type: String,
      default: "5"
    },
    activity: Object,
    isAgeScore: {
      default: false
    }
  },
  data() {
    return {
      hideMoreInfo: true,
      location: "",
      business: "",
      placeId: undefined,
      busyResults: undefined,
      loadingBusyResults: false,
      hasSearched: false
    };
  },
  computed: {
    ...mapGetters(["riskLevels", "currentUserSettings"]),
    risk() {
      return this.riskLevels["riskLevel" + this.score];
    },
    references: function() {
      var referencePropertyNames = Object.keys(this.activity).filter(
        prop => prop.indexOf("reference") > -1
      );

      var referencesArray = [];
      var referencesIndex = 0;
      for (var i = 0; i < referencePropertyNames.length; i++) {
        var referencePropertyName = referencePropertyNames[i];
        if (this.activity[referencePropertyName] !== "")
          referencesArray[referencesIndex++] = this.activity[
            referencePropertyName
          ];
      }
      return referencesArray;
    },
    showRiskComponents: function() {
      return (
        this.activity.activityName && this.currentUserSettings.hasBetaAccess
      );
    }
  },
  methods: {
    toggleMoreInfo() {
      this.hideMoreInfo = !this.hideMoreInfo;
    },
    async getBusyInfo() {
      this.busyResults = undefined;
      this.loadingBusyResults = true;
      try {
        const locationResults = await axios.get(
          "https://thelackthereof.org/api",
          {
            params: {
              location: this.location,
              name: this.business,
              placeId: this.placeId
            }
          }
        );
        this.busyResults = locationResults.data;
      } catch (e) {
        console.log("error fetching location data");
        console.error(e);
        this.busyResults = "error";
      } finally {
        this.loadingBusyResults = false;
        this.hasSearched = true;
      }
    },
    getAddressData(something, rawSomething) {
      console.log("Got some address data", something, rawSomething);
      this.placeId = rawSomething.reference;
      this.getBusyInfo();
    }
  }
};
</script>

<style scoped lang="scss">
.risk-description {

  .score-panel {
    padding: 1em;
    margin: auto;
    flex: 30%;
    text-align: center;

    .score {
      font-size: 5em;
      margin-bottom: -0.3em;
    }
  }

  .moreLessInfoLink {
    float: right;
  }

  .risk-details {
    flex: 70%;
    margin: auto;
    padding: 1em;
  }

  .risk-references-container h5 {
    font-weight: bold;
    font-size: 1em;
  }

  .risk-references-container {
    font-size: 0.8em;
  }


  .riskComponentsContainer {
    background-color: white;
  }

  .v-tab--active {
    background-color: #f1f8e9;
  }

  .tabCard {
    text-align: left;
    background-color: #f1f8e9;
  }

  .crowdingBar {
    background-color: $selectorgray;
    color: white;
  }

  .busyChart {
    background-color: white;
  }

  .busyLocation {
    background-color: white;
    color: black;
    border-radius: 2em;
    width: 30vw;
    padding-left: 1em;
    margin: 1em 1em;
  }

  .busyCheckButton {
    background-color: $primary;
    color: $selectorgray;
    padding: 0.5em;
    padding-left: 1em;
    padding-right: 1em;
    border-radius: 2em;
  }
}
</style>
