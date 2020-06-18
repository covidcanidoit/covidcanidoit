<template>
  <div class="introduction" id="search-results">
    <div v-show="activity.activityName">
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

      <div
        v-show="
          additionalRiskFactors.length > 0 || activity.showLocation == 'TRUE'
        "
        class="additional-factors"
      >
        <h2>Additional Risk Factors</h2>
        <div class="accordion" id="accordionExample">
          <!-- risk factor accordians -->
          <div
            class="card"
            v-for="riskFactor in additionalRiskFactors"
            :key="riskFactor.name"
          >
            <div class="card-header" :id="'heading-' + riskFactor.name">
              <h2 class="mb-0 flex-row">
                <i class="icon" :class="riskFactor.icon"></i>
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
import { mapGetters } from "vuex";
import RiskDescription from "@/components/RiskDescription.vue";
//import RiskComponentBar from "@/components/RiskComponentBar.vue";

export default {
  components: { RiskDescription, Markdown},//, RiskComponentBar },
  props: {
    searchedTerm: String,
    activity: Object,
    profile: {
      type: Object
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["riskFactors"]),
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
    additionalRiskFactors() {
      return Object.values(this.riskFactors).filter(riskFactor => {
        console.log("Checking to see if we have", { riskFactor });
        const lookFor = riskFactor.showWhen.split(",");
        return lookFor.includes(this.profile[riskFactor.name]);
      });
    }
  },
  methods: {}
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
.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.icon {
  width: 40px;
}
</style>
