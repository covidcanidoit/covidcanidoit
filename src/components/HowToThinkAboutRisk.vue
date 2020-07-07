<template>
  <div class="howToThinkAboutRisk">
    <h1>How to think about risk</h1>
    <h5>Click to learn more</h5>
    <v-container>
      <v-row>
        <v-col cols="6" md="3">
          <CrowdingIcon class="componentIcon"></CrowdingIcon>
          <div class="componentLabel">Crowding</div>
        </v-col>
        <v-col cols="6" md="3">
          <DropletsIcon class="componentIcon"></DropletsIcon>
          <div class="componentLabel">Droplets</div>
        </v-col>
        <v-col cols="6" md="3">
          <TimeIcon class="componentIcon"></TimeIcon>
          <div class="componentLabel">Time</div>
        </v-col>
        <v-col cols="6" md="3">
          <VentIcon class="componentIcon"></VentIcon>
          <div class="componentLabel">Ventilation</div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CrowdingIcon from "@/assets/Risk_Crowding-filled.svg";
import DropletsIcon from "@/assets/Risk_Droplets-filled.svg";
import TimeIcon from "@/assets/Risk_Time-filled.svg";
import VentIcon from "@/assets/Risk_Ventilation-filled.svg";
export default {
  components: {
    CrowdingIcon,
    DropletsIcon,
    TimeIcon,
    VentIcon
  }
}
</script>

<style lang="scss" scoped>
.componentIcon {
  width: 75px;
  height: 75px;
  fill: rgba(0,0,0,0);
  border: 2px solid black;
  border-radius: 50%;
}
.componentIcon:hover {
  cursor: pointer;
  border: none;
  path {
    fill: white;
  }
  .cls-2 {
    fill: black;
  }
}
.componentLabel {
  margin-top: 1em;
}
div .cls-2 {
  fill: black;
}
.howToThinkAboutRisk {
  background-color: $primary;
  text-align: center;
  padding: 5em;
}
path {
  fill: rgba(0,0,0,0);
}
</style>