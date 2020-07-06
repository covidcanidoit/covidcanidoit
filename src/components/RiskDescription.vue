<template>
  <div>
    <div class="risk-description d-flex flex-column">
      <div class="score-panel">
        <div v-if="isAgeScore">
          <b>{{ activity.activityName }}</b>
          has an Age-Specific risk level of
        </div>
        <div v-else>
          <b>{{ activity.activityName }}</b>
          <div style="white-space: nowrap">has a risk level of</div>
        </div>
        <div class="score">{{ risk && risk.riskScore }}</div>
        <div class="score-title">{{ risk && risk.riskName }}</div>
        <ScoreScale :score="score" />
        <v-select
          outlined
          return-object
          item-text="longName"
          :items="regionsList"
          @change="setCurrentRegion($event)"
          class="selectRegion"
          v-model="selectedRegion"
        >
          <template v-slot:prepend>in&nbsp;</template>
        </v-select>
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

export default {
  components: {
    ScoreScale,
    RiskComponents,
    LocationComponent
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
      "regions"
    ]),
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
    },
    regionsList: function() {
      return Object.values(this.regions);
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

  .selectRegion {
    width: 25%;
    min-width: 25%;
    margin: 0 auto;
    margin-top: 2em;
  }
}
</style>
