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
      <div class="score">{{ score }}</div>
      <div class="score-title">{{ risk && risk.riskName }}</div>
      <ScoreScale :score="score" />
    </div>
    <Markdown class="risk-details" :source="risk && risk.longDescription" />
  </div>
</template>

<script>
import { mapState } from "vuex";
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
  computed: {
    ...mapState(["riskLevels"]),
    risk() {
      return this.riskLevels[this.score - 1];
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

  .risk-details {
    flex: 70%;
    margin: auto;
    padding: 1em;
  }
}
</style>
