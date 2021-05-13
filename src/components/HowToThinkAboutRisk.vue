<template>
  <div class="howToThinkAboutRisk">
    <h1>How to think about risk</h1>
    <h5>Click to learn more</h5>
    <v-container>
      <v-layout wrap>
        <v-flex
          cols="6"
          md="3"
          class="howToThinkAboutRisk__icon-container"
          @click="onComponentIconClick('crowding')"
        >
          <CrowdingIcon class="componentIcon"></CrowdingIcon>
          <div class="componentLabel">Crowding</div>
        </v-flex>
        <v-flex
          cols="6"
          md="3"
          class="howToThinkAboutRisk__icon-container"
          @click="onComponentIconClick('droplets')"
        >
          <DropletsIcon class="componentIcon"></DropletsIcon>
          <div class="componentLabel">Droplets</div>
        </v-flex>
        <v-flex
          cols="6"
          md="3"
          class="howToThinkAboutRisk__icon-container"
          @click="onComponentIconClick('exposureTime')"
        >
          <TimeIcon class="componentIcon"></TimeIcon>
          <div class="componentLabel">Time</div>
        </v-flex>
        <v-flex
          cols="6"
          md="3"
          class="howToThinkAboutRisk__icon-container"
          @click="onComponentIconClick('ventilation')"
        >
          <VentIcon class="componentIcon"></VentIcon>
          <div class="componentLabel">Ventilation</div>
        </v-flex>
        <v-flex
          cols="6"
          md="3"
          class="howToThinkAboutRisk__icon-container"
          @click="onComponentIconClick('masking')"
        >
          <MaskIcon class="componentIcon"></MaskIcon>
          <div class="componentLabel">Masking</div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="showPopup" width="500">
      <v-card>
        <v-card-title>{{ popupTitle }}</v-card-title>
        <v-card-text>
          <Markdown :source="popupMarkdown" />
          <div class="learnMoreContainer">
            <router-link
              class="router learnMore"
              :to="{
                name: 'Infographic',
                params: { country: currentCountry, region: currentRegion }
              }"
            >
              Learn More
            </router-link>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CrowdingIcon from "@/assets/Risk_Crowding-filled.svg";
import DropletsIcon from "@/assets/Risk_Droplets-filled.svg";
import TimeIcon from "@/assets/Risk_Time-filled.svg";
import VentIcon from "@/assets/Risk_Ventilation-filled.svg";
import MaskIcon from "@/assets/Risk_Mask-filled.svg";
import Markdown from "vue-markdown";
import { mapGetters } from "vuex";

export default {
  components: {
    CrowdingIcon,
    DropletsIcon,
    TimeIcon,
    VentIcon,
    MaskIcon,
    Markdown
  },
  data: function() {
    return {
      showPopup: false,
      component: ""
    };
  },
  computed: {
    ...mapGetters(["components", "currentCountry", "currentRegion"]),
    popupTitle() {
      if (this.component) {
        return this.components[this.component].title;
      } else {
        return "";
      }
    },
    popupMarkdown() {
      if (this.component) {
        return this.components[this.component].description;
      } else {
        return "";
      }
    }
  },
  methods: {
    onComponentIconClick(component) {
      this.component = component;
      this.showPopup = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.learnMoreContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.router.learnMore {
  background-color: $selectorgray !important;
  color: white !important;
  border: 1px solid $selectorgray;
  border-radius: 30px;
  padding: 9px;
  padding-left: 30px;
  padding-right: 30px;
  margin: 0 auto;
}
.router.learnMore:hover {
  background-color: white !important;
  color: black !important;
  border: 1px solid black;
}
.componentIcon {
  width: 75px;
  height: 75px;
  fill: rgba(0, 0, 0, 0);
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
.howToThinkAboutRisk__icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  margin: 0 0.25rem 1rem 0.25rem;
  flex: 1;
}
.componentLabel {
  margin-top: 1em;
  display: inline;
  padding: 10px;
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
  fill: rgba(0, 0, 0, 0);
}
</style>
