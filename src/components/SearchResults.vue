<template>
  <div class="introduction" id="search-results">
    <div v-show="searched">
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

      <div v-show="hasAdditionalFactors" class="additional-factors">
        <h2>Additional Risk Factors</h2>
        <div class="accordion" id="accordionExample">
          <div
            class="card"
            v-for="riskFactor in additionalRiskFactors"
            :key="riskFactor.name"
          >
            <div class="card-header" :id="'heading-' + riskFactor.name">
              <h2 class="mb-0">
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
import { mapState } from "vuex";
import RiskDescription from "@/components/RiskDescription.vue";

export default {
  components: { RiskDescription, Markdown },
  props: {
    searchedTerm: String,
    activity: Object,
    searched: {
      type: Boolean,
      default: false
    },
    profile: {
      type: Object
    }
  },
  computed: {
    ...mapState(["riskFactors"]),
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
    hasAdditionalFactors() {
      return (
        this.profile.age == "risk50To69" ||
        this.profile.age == "riskOver70" ||
        this.profile.smoking == "yes" ||
        this.profile.smoking == "used" ||
        this.profile.comorbidity == "yes" ||
        this.profile.pregnant == "yes" ||
        this.profile.feelSick == "yes" ||
        this.profile.familySick == "yes"
      );
    },
    additionalRiskFactors() {
      return this.riskFactors.filter(riskFactor => {
        console.log("Checking to see if we have", { riskFactor });
        const lookFor = riskFactor.showWhen.split(",");
        return lookFor.includes(this.profile[riskFactor.name]);
      });
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
</style>
