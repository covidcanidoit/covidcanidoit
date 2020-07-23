<template>
  <div class="introduction" id="search-results">
    <div v-show="activity.activityName">
      <RiskDescription
        :score="activity.generalRiskScore"
        :activity="activity"
      />

      <v-container class="more-info">
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
                  <i
                    class="icon flex-grow-0 risk-factor-icon"
                    :class="riskFactor.icon"
                  />
                  <div class="risk-factor-description">
                    {{ riskFactor.description }}
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <Markdown :source="riskFactor.shortDescription" />
                  <Markdown :source="riskFactor.longDescription" />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
          <v-col cols="12" md="6" order="first" order-md="last">
            <div class="things-to-consider">
              <h5>Things to consider</h5>
              <Markdown class="risk-details" :source="risk.longDescription" />
            </div>
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

<style lang="scss">
.warning {
  color: red;
  font-size: 24px;
}
.icon {
  width: 40px;
}

@media #{map-get($display-breakpoints, 'md-and-up')} {
  .otherRisksSeparator {
    border-right: 1px solid $secondary;
  }
}

.riskFactorDropdown:nth-child(n + 2) {
  border-top: 1px solid $color-lightgrey;
}
.risk-factor-description {
  text-align: left;
}

i.risk-factor-icon {
  width: 2em;
  display: block;
}

@media #{map-get($display-breakpoints, 'md-and-up')} {
  .things-to-consider {
    margin-left: 3em;
  }
}

.risk-details li {
  margin: 1em 0em;
  padding-left: 1em;
}

.more-info {
  margin-top: 2em;
  margin-bottom: 2em;
}

.introduction h5 {
  margin-bottom: 1.5em;
}
</style>
