<template>
  <v-row class="risk-component" justify="center" :class="riskClass">
    <v-col cols="2" md="12">
      <CrowdingIcon v-if="isCrowding" class="componentIcon" />
      <DropletsIcon v-if="isDroplets" class="componentIcon" />
      <TimeIcon v-if="isTime" class="componentIcon" />
      <VentIcon v-if="isVent" class="componentIcon" />
    </v-col>
    <v-col cols="6" md="12">
      <div class="componentTitle">{{ title }}</div>
      <div class="componentRiskLabel">{{ risk }}</div>
      <div class="notes">
        <Markdown :source="notes" />
        <!-- <v-btn>Learn more about {{ type }}</v-btn> -->
      </div>
    </v-col>
  </v-row>
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
.componentTitle {
  font-weight: bold;
}
.notes {
  margin: 1em;
  text-align: left;
  font-size: 0.75em;
}
</style>
