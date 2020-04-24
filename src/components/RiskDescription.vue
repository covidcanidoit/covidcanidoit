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
      <div class="score">{{ risk.riskScore }}</div>
      <div class="score-title">{{ risk.riskName }}</div>
      <ScoreScale :score="score" />
    </div>
    <div class="risk-information">
      <Markdown class="risk-details" :source="risk?.longDescription" />
      <a
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Markdown from "vue-markdown";
import ScoreScale from "@/components/ScoreScale.vue";

export default {
  components: { ScoreScale, Markdown },
  props: {
    score: String,
    activity: Object,
    isAgeScore: {
      default: false
    }
  },
  data() {
    return {
      hideMoreInfo: true
    };
  },
  computed: {
    ...mapGetters(["riskLevels"]),
    risk() {
      return this.riskLevels[this.score - 1];
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
}
</style>
