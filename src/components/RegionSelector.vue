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
      console.log(Object.values(this.regions));
      return Object.values(this.regions).filter(region => region.slug != "all");
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
      this.$emit("regionSelected");
      this.$store.dispatch("changeRegion", this.selectedRegion.slug);
    },
    getCurrentRegionFromList() {
      this.selectedRegion = this.regions[this.currentRegion];
    },
    watch: {
      currentRegion: function() {
        this.getCurrentRegionFromList();
      },
      deep: true
    }
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
