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
    <div class="risk-information">
      <Markdown class="risk-details" :source="risk && risk.longDescription" />
      <div class="risk-references-container">
        <!-- uncomment this line for inline referenes -->
        <span>References: </span><span class="risk-reference">{{concatReferences}}</span>
        <!-- uncomment this line for numbered list references -->
        <!--<h5>References: </h5>
        <ol>
          <li v-show="activity[reference] !== ''" v-for="(reference,index) in Object.keys(activity).filter((prop) => prop.indexOf('reference') > -1)" :key="index" class="risk-reference"> {{activity[reference]}}</li>
        </ol>-->
      </div>
    </div>
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
    },
    concatReferences: function() {
      var referencesString = "";
      var references = Object.keys(this.activity).filter((prop) => prop.indexOf("reference")>-1);
      var reference;
      var i;
      console.log(references);
      for (i = 0; i < references.length; i++) {
        reference = references[i];
        if (this.activity[reference] === "") continue;
        referencesString += this.activity[reference] + ", ";
      }
      referencesString = referencesString.substring(0,referencesString.length-2) + ".";
      return referencesString;
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

  .risk-references-container h5 {
    font-weight: bold;
    font-size: 1em;
  }

  .risk-references-container{
    font-size:0.8em;
  }

  .risk-information {
    flex: 70%;
    margin:auto;
    padding: 1em;
  }
}
</style>
