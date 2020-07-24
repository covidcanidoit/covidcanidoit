<template>
  <v-select
    outlined
    return-object
    item-text="longName"
    :items="regionsList"
    @change="setCurrentRegion($event)"
    :class="regionSelectClass"
    v-model="selectedRegion"
    v-if="regionsList.length > 1"
  ></v-select>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    parent: String
  },
  data() {
    return {
      selectedRegion: Object
    };
  },
  mounted() {
    this.getCurrentRegionFromList();
  },
  computed: {
    ...mapGetters(["currentRegion", "regions"]),
    regionsList: function() {
      return Object.values(this.regions);
    },
    regionSelectClass: function() {
      if (this.$vuetify.breakpoint.mdAndUp && this.parent === "SearchResults") {
        return "selectRegion regionSelectOnMediumAndUp";
      } else {
        return "selectRegion regionSelectOnSmaller";
      }
    }
  },
  methods: {
    setCurrentRegion() {
      console.log("new region slug", this.selectedRegion.slug);
      this.$emit("regionSelected");
      this.$store.dispatch("changeRegion", this.selectedRegion.slug);
    },
    getCurrentRegionFromList() {
      this.selectedRegion = this.regions[this.currentRegion];
    } //,
    // watch: {
    //   currentRegion() {
    //     console.log("watching currentRegion", this.currentRegion);
    //     this.getCurrentRegionFromList();
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
.selectRegion {
  width: 30%;
  min-width: 10%;
  margin: 0 auto;
  margin-top: 2em;
}
.regionSelectOnSmaller {
  width: 100%;
}
.regionSelectOnMediumAndUp {
  width: 30%;
}
</style>
