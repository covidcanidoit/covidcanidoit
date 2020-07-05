<template>
  <div :class="riskClass">
    <CrowdingIcon v-if="isCrowding" class="componentIcon" />
    <DropletsIcon v-if="isDroplets" class="componentIcon" />
    <TimeIcon v-if="isTime" class="componentIcon" />
    <VentIcon v-if="isVent" class="componentIcon" />
    <div class="componentTitle">{{ title }}</div>
    <div class="componentRiskLabel">{{ risk }}</div>
    <Markdown :source="notes" />
    <!-- <v-btn>Learn more about {{ type }}</v-btn> -->
  </div>
</template>

<script>
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
      return (
        this.type[0].toUpperCase() + this.type.substring(1, this.type.length)
      );
    },
    score() {
      return parseInt(this.activity[this.type]);
    },
    risk() {
      return this.score === 1 ? "Low" : this.score === 2 ? "Medium" : "High";
    },
    notes() {
      return this.type !== "" ? this.activity[this.type + "Notes"] : "";
    },
    riskClass() {
      return "risk" + this.risk;
    }
  }
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
</style>
