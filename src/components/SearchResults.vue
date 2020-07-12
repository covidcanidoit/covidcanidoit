<template>
  <div class="introduction" id="search-results">
    <div v-show="activity.activityName">
      <RiskDescription
        :score="activity.generalRiskScore"
        :activity="activity"
      />

      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="6"
            order="last"
            order-md="first"
            class="otherRisksSeparator"
          >
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
          <v-col cols="12" md="6" order="first" order-md="last">
            <h5>Things to consider</h5>
            <Markdown class="risk-details" :source="risk.longDescription" />
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
    activity: Object
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["riskFactors", "riskLevels"]),
    risk() {
      return this.riskLevels["riskLevel" + this.activity.generalRiskScore];
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
