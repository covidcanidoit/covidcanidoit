<template>
  <div class="risk-description">
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
      <div v-show="showRiskComponents" mt-1>
        <v-spacer></v-spacer>
          <v-container class="riskComponentsContainer">
            <v-row>
              <v-col>
                <RiskComponentBar :value=activity.crowding ></RiskComponentBar>
              </v-col>
              <v-col>
                <RiskComponentBar :value=activity.droplets ></RiskComponentBar>
              </v-col>
              <v-col>
                <RiskComponentBar :value=activity.exposureTime ></RiskComponentBar>
              </v-col>
              <v-col>
                <RiskComponentBar :value=activity.ventilation ></RiskComponentBar>
              </v-col>
            </v-row>
          </v-container>
          <v-tabs
            fixed-tabs
            icons-and-text
          >
            <v-tab>Crowding   <v-icon>mdi-account-switch</v-icon></v-tab>
            <v-tab>Droplets <v-icon>mdi-water</v-icon></v-tab>
            <v-tab>Time <v-icon>mdi-timer-sand-full</v-icon></v-tab>
            <v-tab>Ventilation <v-icon>mdi-fan</v-icon></v-tab>

            <v-tab-item>
              <v-card flat tile class="tabCard">
                <v-card-text>
                  <Markdown :source="activity.crowdingNotes" />
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat tile class="tabCard">
                <v-card-text>
                  <Markdown :source="activity.dropletsNotes" />
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat tile class="tabCard">
                <v-card-text>
                  <Markdown :source="activity.exposureTimeNotes" />
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat tile class="tabCard">
                <v-card-text>
                  <Markdown :source="activity.ventilationNotes" />
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
          <v-spacer></v-spacer>
          </div>
        </div>
    <div class="risk-information">
      <!--<Markdown class="risk-details" :source="risk && risk.longDescription" />-->
      <br />
      <v-container fluid="true">
        <v-row>
            <v-col cols="12">
            <div v-show="activity.showLocation == 'TRUE'">
              <p>Check to see if it's going to be crowded when and where you are</p>
              <VueGoogleAutocomplete
                classname="form-control"
                id="map"
                placeholder="Please enter the activity location"
                @placechanged="getAddressData"
                :enableGeolocation="true"
                :geolocationOptions="{ enableHighAccuracy: false }"
                types="establishment"
              />
              <button class="form-control btn-primary" @click="getBusyInfo">
                How Busy Will It Be?
              </button>
              <!-- <div>{{ busyResults }}</div> -->
              <div v-if="loadingBusyResults">Loading...</div>
              <div v-else>
                <div v-if="busyResults">
                  <div v-if="busyResults == 'error'">Data not available</div>
                  <Chart v-else :crowdingData="busyResults" />
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <br />
      <!--<a
        v-show="hideMoreInfo"
        href="#divMoreInfo"
        data-toggle="collapse"
        class="moreLessInfoLink"
        @click="toggleMoreInfo"
        >More info</a
      >
      <a
        v-show="!hideMoreInfo"
        href="#divMoreInfo"
        data-toggle="collapse"
        class="moreLessInfoLink"
        @click="toggleMoreInfo"
        >Less info</a
      >
      <div
        v-show="!hideMoreInfo"
        id="divMoreInfo"
        class="risk-references-container collapse"
      >
        <h5>Learn more:</h5>
        <ol>
          <li
            v-for="(reference, index) in references"
            :key="index"
            class="risk-reference"
          >
            <a :href="reference">{{ reference }}</a>
          </li>
        </ol>
      </div>-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Markdown from "vue-markdown";
import ScoreScale from "@/components/ScoreScale.vue";
import Chart from "@/components/PopularTimesChart";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import RiskComponentBar from "@/components/RiskComponentBar.vue";

import axios from "axios";

export default {
  components: { ScoreScale, Markdown, Chart, VueGoogleAutocomplete, RiskComponentBar },
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
    ...mapGetters(["riskLevels","currentUserSettings"]),
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
      return this.activity.activityName && this.currentUserSettings.hasBetaAccess;
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: black;
  background-color: #e8ebf5;

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

  .risk-information {
    flex: 70%;
    margin: auto;
    padding: 1em;
  }

  .riskComponentsContainer {
    background-color: white;
  }

  .v-tab--active {
    background-color: #F1F8E9;
  }

  .tabCard {
    text-align: left;
    background-color:#F1F8E9;
  }  
}
</style>
