<template>
  <v-container>
    <v-row no-gutters>
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
              <Markdown
                :source="risk.description"
                class="notes dropdown-notes"
              />
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
import MaskIcon from "@/assets/Risk_Mask-filled.svg";
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
    riskTypes: [
      "crowding",
      "droplets",
      "exposureTime",
      "ventilation",
      "masking"
    ],
    riskTitles: {
      crowding: "Crowding",
      droplets: "Droplets",
      exposureTime: "Exposure Time",
      ventilation: "Ventilation",
      masking: "Masking"
    },
    riskLabels: {
      "1": "Low",
      "2": "Medium",
      "3": "High"
    },
    icons: {
      crowding: CrowdingIcon,
      droplets: DropletsIcon,
      exposureTime: TimeIcon,
      ventilation: VentIcon,
      masking: MaskIcon
    }
  }),
  computed: {
    ...mapGetters(["components"]),
    riskProfile() {
      return this.activity.riskProfiles.v1;
    },
    activityRiskTypes() {
      // Only characteristics that this activity has
      return this.riskTypes.filter(
        risk => !!this.riskProfile.characteristics?.[risk]?.description
      );
    },
    riskData() {
      return this.activityRiskTypes.map(risk => {
        const riskScore = this.riskLabels[
          this.riskProfile.characteristics[risk].riskScore
        ];
        return {
          type: risk,
          riskClass: `risk${riskScore}`,
          riskLabel: `${this.riskTitles[risk]} - ${riskScore} Risk`,
          riskScore: this.riskProfile.characteristics[risk].riskScore,
          description:
            this.riskProfile.characteristics[risk].description[
              this.$i18n.locale
            ] || this.riskProfile.characteristics[risk].description["en"]
        };
      });
    }
  }
};
</script>

<style scoped lang="scss">
.component-icon {
  width: 75px;
  $colors: (Low $gogreen, Medium $cautionyellow, High $stopred);
  @each $risk, $color in $colors {
    &.risk#{$risk} > path {
      fill: $color;
    }
  }
  &.dropdown-icon {
    width: 48px;
  }

  path.cls-2 {
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
    font-size: 0.85em;
    margin: 1em;
  }
}
</style>
