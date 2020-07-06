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
      />

      <v-container>
        <v-row>
          <v-col cols="12" md="6" class="otherRisksSeparator">
            <h5>You are at more risk than others if</h5>
            <v-expansion-panels focusable flat popout>
              <v-expansion-panel
                v-for="riskFactor in riskFactors"
                :key="riskFactor.name"
                class="riskFactorDropdown"
              >
                <v-expansion-panel-header>
                  <span>
                    <i class="icon" :class="riskFactor.icon" />
                    {{ riskFactor.description }}
                  </span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <Markdown :source="riskFactor.shortDescription" />
                  <Markdown :source="riskFactor.longDescription" />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
          <v-col cols="12" md="6">
            <h5>Things to consider</h5>
            <Markdown
              class="risk-details"
              :source="risk && risk.longDescription"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import Markdown from "vue-markdown";
import { mapGetters } from "vuex";
import RiskDescription from "@/components/RiskDescription.vue";

export default {
  components: { RiskDescription, Markdown },
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
    ...mapGetters(["riskFactors", "riskLevels"]),
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
    },
    risk() {
      return this.riskLevels["riskLevel" + this.maybeAgeScore];
    }
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.warning {
  color: red;
  font-size: 24px;
}
.icon {
  width: 40px;
}
.otherRisksSeparator {
  border-right: 1px solid $secondary;
}

.riskFactorDropdown:nth-child(n + 2) {
  border-top: 1px solid $color-lightgrey;
}
</style>
