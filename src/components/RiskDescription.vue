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
      <a href="#divMoreInfo" data-toggle="collapse" class="moreLessInfoLink" @click="hideMoreInfo=!hideMoreInfo">{{moreOrLessInfo}}</a>
      <div id="divMoreInfo" class="risk-references-container collapse">
        <!-- uncomment this line for inline referenes -->
        <!--<span>References: </span><span class="risk-reference">{{concatReferences}}</span>-->
        <!-- uncomment this line for numbered list references -->
        <h5>Learn more: </h5>
        <ol>
          <!--<li v-show="activity[reference] !== ''" v-for="(reference,index) in Object.keys(activity).filter((prop) => prop.indexOf('reference') > -1)" :key="index" class="risk-reference"> {{activity[reference]}}</li>-->
          <li v-for="(reference,index) in references" :key="index" class="risk-reference"> {{reference}}</li>
        </ol>
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
    },
    hideMoreInfo: Boolean
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

      for (i = 0; i < references.length; i++) {
        reference = references[i];
        if (this.activity[reference] === "") continue;
        referencesString += this.activity[reference] + ", ";
      }
      referencesString = referencesString.substring(0,referencesString.length-2) + ".";
      return referencesString;
    },
    references: function() {
      var referencePropertyNames = Object.keys(this.activity).filter((prop) => prop.indexOf("reference")>-1);

      var referencesArray = [];
      var referencesIndex = 0;
      for (var i = 0; i < referencePropertyNames.length; i++) {
        var referencePropertyName = referencePropertyNames[i];
        if (this.activity[referencePropertyName] !== "") referencesArray[referencesIndex++] = this.activity[referencePropertyName];
      }
      return referencesArray;
    },
    moreOrLessInfo: function() {
      if (this.hideMoreInfo===true) {
        return "Less info";
      }
      else {
        return "More info";
      }
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
