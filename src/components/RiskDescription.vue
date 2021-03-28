<template>
  <div>
    <div class="risk-description d-flex flex-column">
      <div class="score-panel">
        <div>
          <div :class="searchbarContainerClass">
            <ActivitySearchbar
              :activityList="Object.values(activities)"
              :initialSearch="activity"
            ></ActivitySearchbar>
          </div>
          <span class="riskDeclare" style="white-space: nowrap">
            is&nbsp;
            <span :class="riskTokenClass">
              <span>{{ activityRiskToken }}</span>
              &nbsp;Risk
            </span>
          </span>
        </div>

        <div class="score">{{ riskLevel.riskScore }}</div>
        <div class="score-title">
          {{ riskLevel.riskName }}
          <v-dialog>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon x-small color="#cccccc">
                <v-icon>mdi-information</v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2">
                Calculation Breakdown
              </v-card-title>

              <v-card-text>
                <span>
                  <pre>{{ riskScoreDetail }}</pre>
                </span>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>

        <div class="d-flex flex-row justify-center">
          <SeasonalImage
            index="1"
            class="flex-grow-1 align-center seasonalEventImage1"
          />
          <ScoreScale :score="riskScore" class="flex-grow-1" />
          <SeasonalImage
            index="2"
            class="flex-grow-1 align-center seasonalEventImage2"
          />
        </div>
        <div v-if="regionlock.lock">
          {{ selectedRegion.longName }}
        </div>
        <div v-else>
          <RegionSelector parent="SearchResults" />
        </div>
        <v-spacer></v-spacer>

        <RiskComponents :activity="activity"></RiskComponents>
      </div>
    </div>
    <LocationComponent :activity="activity"></LocationComponent>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ScoreScale from "@/components/ScoreScale.vue";
import RiskComponents from "@/components/RiskComponents.vue";
import LocationComponent from "@/components/LocationComponent.vue";
import ActivitySearchbar from "@/components/ActivitySearchbar.vue";
import RegionSelector from "@/components/RegionSelector.vue";
import SeasonalImage from "@/components/SeasonalImage.vue";

export default {
  components: {
    ScoreScale,
    RiskComponents,
    LocationComponent,
    ActivitySearchbar,
    RegionSelector,
    SeasonalImage
  },
  props: {
    activity: Object
  },
  data() {
    return {
      hideMoreInfo: true,
      hasSearched: false,
      scoreDetail: {}
    };
  },
  computed: {
    ...mapGetters([
      "riskLevels",
      "currentUserSettings",
      "currentRegion",
      "regions",
      "activities",
      "regionlock"
    ]),
    riskScoreDetail() {
      // Here is where we calculate the risk
      const baseline = 0.06;
      const characteristicWeights = {
        crowding: [2, 1, 0.5],
        droplets: [5, 1, 0.2],
        masking: [4, 4, 1.0],
        exposureTime: [2, 1, 0.5],
        ventilation: [20, 4, 1.0]
      };
      const characteristics = this.activity.riskProfiles.v1.characteristics;
      const activityRisk =
        baseline *
        (1 /
          characteristicWeights.crowding[
            characteristics.crowding.riskScore - 1
          ] /
          characteristicWeights.droplets[
            characteristics.droplets.riskScore - 1
          ] /
          characteristicWeights.masking[characteristics.masking.riskScore - 1] /
          characteristicWeights.exposureTime[
            characteristics.exposureTime.riskScore - 1
          ] /
          characteristicWeights.ventilation[
            characteristics.ventilation.riskScore - 1
          ]);
      const newCasesToday =
        this.selectedRegion.confirmed -
        this.selectedRegion.confirmedPreviousDay;
      // const daysSinceBeginning = 372;
      const startDate = new Date("2020-02-12");
      const endDate = new Date();
      const daysSinceBeginning = (endDate - startDate) / (1000 * 60 * 60 * 24);
      const positivityRate = 0.067; // From Jay
      //const prevalenceRatio = (1500 / (daysSinceBeginning + 50)) * ( positivityRate ** 0.5) + 2;
      const prevalenceRatio =
        (1500 / daysSinceBeginning) * positivityRate ** 0.5 + 2;
      // =(1500/(D26))*((0.067)^0.5)+2
      const trueActiveInfections = newCasesToday * prevalenceRatio;
      const encounterRisk =
        trueActiveInfections / this.selectedRegion.population_2019;
      const activityRiskScore = activityRisk * encounterRisk;
      let score = 0;
      if (activityRiskScore < 0.0000001) {
        score = 1;
      } else if (activityRiskScore < 0.00001) {
        score = 2;
      } else if (activityRiskScore < 0.0001) {
        score = 3;
      } else if (activityRiskScore < 0.0009) {
        score = 4;
      } else {
        score = 5;
      }
      const riskScoreDetail = {
        baseline,
        characteristicWeights,
        characteristics,
        activityRisk,
        newCasesToday,
        daysSinceBeginning,
        positivityRate,
        prevalenceRatio,
        trueActiveInfections,
        encounterRisk,
        activityRiskScore,
        score,
        region: this.selectedRegion,
        modFactorCrowding:
          characteristicWeights.crowding[
            characteristics.crowding.riskScore - 1
          ],
        modFactorDroplets:
          characteristicWeights.droplets[
            characteristics.droplets.riskScore - 1
          ],
        modFactorMasking:
          characteristicWeights.masking[characteristics.masking.riskScore - 1],
        modFactorExposureTime:
          characteristicWeights.exposureTime[
            characteristics.exposureTime.riskScore - 1
          ],
        modFactorVentilation:
          characteristicWeights.ventilation[
            characteristics.ventilation.riskScore - 1
          ]
      };
      console.log(riskScoreDetail);
      return riskScoreDetail;
    },
    riskScore() {
      return this.riskScoreDetail.score;
    },
    riskLevel() {
      return this.riskLevels[`riskLevel${this.riskScore}`];
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
    activityRiskToken: function() {
      const riskTokenMap = {
        "1": "Low",
        "2": "Moderate",
        "3": "Elevated",
        "4": "High",
        "5": "Critical"
      };
      return riskTokenMap?.[this.riskScore] || "Uncertain";
    },
    riskTokenClass: function() {
      return `risk-${this.riskScore}`;
    },
    searchbarContainerClass: function() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return "searchbarContainerOnMediumAndUp";
      } else {
        return "searchbarContainerOnSmaller";
      }
    },
    selectedRegion() {
      return this.regions[this.currentRegion];
    }
  },
  methods: {
    toggleMoreInfo() {
      this.hideMoreInfo = !this.hideMoreInfo;
    }
  }
};
</script>

<style scoped lang="scss">
.risk-description {
  margin-top: 2em;

  .score-panel {
    width: 100%;
    padding: 5em;
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

  .searchbarContainerOnSmaller {
    width: 100%;
    margin-bottom: 1em;
  }

  .searchbarContainerOnMediumAndUp {
    width: 30%;
    margin: 0 auto;
    margin-bottom: 1em;
  }
  .riskDeclare {
    font-size: 2em;
  }
  .seasonalEventImage1 {
    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      display: none;
    }
  }
  .seasonalEventImage2 {
    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      opacity: 0.25;
      position: absolute;
      right: 0;
    }
  }
  @include risk-colors(".risk-", "color", $risk-colors);
}
</style>
