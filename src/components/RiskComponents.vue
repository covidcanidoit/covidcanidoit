<template>
  <v-container v-if="hasRiskData">
    <!-- displays on medium and up breakpoints -->
    <v-row class="hidden-sm-and-down">
      <v-col
        v-for="(risk, index) in riskData"
        :key="risk.type"
        cols="3"
        :class="index && 'left-border'"
      >
        <RiskComponent v-bind="risk" :class="risk.type">
          <template #icon>
            <component
              :is="icons[risk.type]"
              class="component-icon"
              :class="`${risk.riskClass}`"
            />
          </template>
          <template #notes>
            <Markdown :source="risk.notes" class="notes desktop-notes" />
          </template>
        </RiskComponent>
      </v-col>
    </v-row>
    <!-- displays on small and down breakpoints -->
    <v-row no-gutters class="hidden-md-and-up">
      <v-col cols="12">
        <v-expansion-panels flat>
          <RiskComponentDropdown
            v-for="(risk, index) in riskData"
            :key="risk.type"
            :class="index && 'top-border'"
            v-bind="risk"
          >
            <template #icon>
              <component
                :is="icons[risk.type]"
                class="component-icon dropdown-icon"
                :class="`${risk.riskClass}`"
              />
            </template>
            <template #notes>
              <Markdown :source="risk.notes" class="notes dropdown-notes" />
            </template>
          </RiskComponentDropdown>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// getters
import { mapGetters } from "vuex";
// components
import RiskComponent from "@/components/RiskComponent.vue";
import RiskComponentDropdown from "@/components/RiskComponentDropdown.vue";
// icons
import CrowdingIcon from "@/assets/Risk_Crowding-filled.svg";
import DropletsIcon from "@/assets/Risk_Droplets-filled.svg";
import TimeIcon from "@/assets/Risk_Time-filled.svg";
import VentIcon from "@/assets/Risk_Ventilation-filled.svg";
// markdown
import Markdown from "vue-markdown";

export default {
  components: {
    RiskComponent,
    RiskComponentDropdown,
    Markdown
  },
  props: {
    activity: Object
  },
  data: () => ({
    riskTypes: ["crowding", "droplets", "exposureTime", "ventilation"],
    riskLabels: {
      "1": "Low",
      "2": "Medium",
      "3": "High"
    },
    icons: {
      crowding: CrowdingIcon,
      droplets: DropletsIcon,
      exposureTime: TimeIcon,
      ventilation: VentIcon
    }
  }),
  computed: {
    ...mapGetters(["components"]),
    hasRiskData() {
      for (const risk of this.riskTypes) {
        if (!this.activity.characteristics?.[risk]?.notes) return false;
      }
      return true;
    },
    riskData() {
      return this.riskTypes.map(risk => {
        const riskText = this.activity.characteristics[risk].score;
        return {
          type: risk,
          riskClass: `risk${riskText}`,
          riskLabel: `${riskText} Risk`,
          notes: this.activity.characteristics[risk].notes,
          title: this.components[risk].title
        };
      });
    }
  }
};
</script>

<style scoped lang="scss">
.component-icon {
  width: 75px;
  &.riskLow > path {
    fill: $gogreen;
  }
  &.riskMedium > path {
    fill: $cautionyellow;
  }
  &.riskHigh > path {
    fill: $stopred;
  }

  &.dropdown-icon {
    width: 48px;
  }

  > path.cls-2 {
    fill: white;
  }
}

.left-border {
  border-left: 1px solid $color-lightgrey;
}
.top-border {
  border-top: 1px solid $color-lightgrey;
}

.componentTitle {
  font-weight: bold;
}

.componentRiskLabel {
  font-weight: 100;
  color: $color-medgrey;
}

.container {
  .notes {
    text-align: left;
    margin: 0 1em;
  }
  .desktop-notes {
    font-size: 0.75em;
    margin: 1em;
  }
}
</style>
