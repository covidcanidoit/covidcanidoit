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
        <div class="score-title">{{ riskLevel.riskName }}</div>
        <ScoreScale :score="riskScore" />
        <v-select
          outlined
          return-object
          item-text="longName"
          :items="regionsList"
          @change="setCurrentRegion($event)"
          :class="regionSelectClass"
          v-model="selectedRegion"
          v-if="regionsList.length > 1"
        ></v-select>
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

export default {
  components: {
    ScoreScale,
    RiskComponents,
    LocationComponent,
    ActivitySearchbar
  },
  props: {
    riskScore: {
      type: String,
      default: "5"
    },
    activity: Object
  },
  mounted() {
    this.getCurrentRegionFromList();
  },
  data() {
    return {
      hideMoreInfo: true,
      hasSearched: false,
      selectedRegion: Object
    };
  },
  computed: {
    ...mapGetters([
      "riskLevels",
      "currentUserSettings",
      "currentRegion",
      "regions",
      "activities"
    ]),
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
    regionsList: function() {
      return Object.values(this.regions);
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
      return `risk${this.riskScore}`;
    },
    regionSelectClass: function() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return "selectRegion regionSelectOnMediumAndUp";
      } else {
        return "selectRegion regionSelectOnSmaller";
      }
    },
    searchbarContainerClass: function() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return "searchbarContainerOnMediumAndUp";
      } else {
        return "searchbarContainerOnSmaller";
      }
    }
  },
  methods: {
    toggleMoreInfo() {
      this.hideMoreInfo = !this.hideMoreInfo;
    },
    setCurrentRegion() {
      this.$store.dispatch("changeRegion", this.selectedRegion.slug);
    },
    getCurrentRegionFromList() {
      this.selectedRegion = this.regions[this.currentRegion];
    }
  },
  watch: {
    currentRegion() {
      this.getCurrentRegionFromList();
    }
  }
};
</script>

<style scoped lang="scss">
.risk-description {
  margin-top: 2em;

  .score-panel {
    width: 100%;
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

  .searchbarContainerOnSmaller {
    width: 100%;
  }

  .searchbarContainerOnMediumAndUp {
    width: 30%;
    margin: 0 auto;
  }

  .selectRegion {
    width: 30%;
    min-width: 10%;
    margin: 0 auto;
    margin-top: 2em;
  }
  .regionSelectOnSmaller {
    width: 100%;
  }
  .regionSelectOnMediumAndUp {
    width: 30%;
  }
  .riskDeclare {
    font-size: 2em;
  }
  .risk1 {
    color: $gogreen;
  }
  .risk2 {
    color: $pausegreen;
  }
  .risk3 {
    color: $cautionyellow;
  }
  .risk4 {
    color: $warningorange;
  }
  .risk5 {
    color: $stopred;
  }
}
</style>
