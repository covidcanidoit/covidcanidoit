<template>
  <v-expansion-panel class="riskComponentDropdown">
    <v-expansion-panel-header class="d-flex flex-row">
      <div
        :class="riskClass"
        class="componentIconContainer flex-shrink-1 flex-grow-0"
      >
        <CrowdingIcon v-if="isCrowding" class="componentIcon" />
        <DropletsIcon v-if="isDroplets" class="componentIcon" />
        <TimeIcon v-if="isTime" class="componentIcon" />
        <VentIcon v-if="isVent" class="componentIcon" />
      </div>
      <div class="componentHeaderText" flex-grow-1>
        <div class="componentTitle">{{ title }}</div>
        <div class="componentRiskLabel">{{ risk }}</div>
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <Markdown :source="notes" class="component-notes" />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapGetters } from "vuex";
import CrowdingIcon from "@/assets/Risk_Crowding-filled.svg";
import DropletsIcon from "@/assets/Risk_Droplets-filled.svg";
import TimeIcon from "@/assets/Risk_Time-filled.svg";
import VentIcon from "@/assets/Risk_Ventilation-filled.svg";
import Markdown from "vue-markdown";

export default {
  components: {
    CrowdingIcon,
    DropletsIcon,
    TimeIcon,
    VentIcon,
    Markdown
  },
  props: {
    activity: Object,
    type: String
  },
  computed: {
    ...mapGetters(["components"]),
    isCrowding() {
      return this.type === "crowding";
    },
    isDroplets() {
      return this.type === "droplets";
    },
    isTime() {
      return this.type === "exposureTime";
    },
    isVent() {
      return this.type === "ventilation";
    },
    title() {
      return this.components[this.type].title;
    },
    risk() {
      return this.activity.characteristics[this.type].score;
    },
    notes() {
      return this.type !== ""
        ? this.activity.characteristics[this.type].notes
        : "";
    },
    riskClass() {
      return `risk${this.risk}`;
    }
  },
  data: () => ({ riskLabels: { "1": "Low", "2": "Medium", default: "High" } })
};
</script>

<style lang="scss">
.componentIcon {
  width: 75px;
  height: 75px;
}
div .cls-2 {
  fill: white;
}
.riskLow * {
  fill: $gogreen;
}
.riskMedium * {
  fill: $cautionyellow;
}
.riskHigh * {
  fill: $stopred;
}
.componentHeaderText {
  font-size: 2em;
  text-align: left;
}
.componentTitle {
  font-weight: 900;
  margin-bottom: 0.25em;
}
.componentRiskLabel {
  font-weight: 100;
  color: $color-medgrey;
}
.notes {
  margin: 1em;
  text-align: left;
  font-size: 0.75em;
}
.component-notes {
  margin: 1em;
  text-align: left;
}
.riskComponentDropdown:nth-child(n + 2) {
  border-top: 1px solid $color-lightgrey;
}
.componentIconContainer {
  padding-right: 2em;
}
</style>
