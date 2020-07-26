<template>
  <v-select
    outlined
    return-object
    item-text="longName"
    :items="regionsList"
    @change="setCurrentRegion"
    :class="regionSelectClass"
    :value="selectedRegion"
    v-if="regionsList.length > 1"
    placeholder="Select a region/state"
  ></v-select>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    parent: String
  },
  computed: {
    ...mapGetters(["currentRegion", "regions"]),
    regionsList() {
      return Object.values(this.regions)
        .filter(region => region.slug != "all")
        .sort((a, b) => (a.longName > b.longName ? 1 : -1));
    },
    regionSelectClass() {
      if (this.$vuetify.breakpoint.mdAndUp && this.parent === "SearchResults") {
        return "selectRegion regionSelectOnMediumAndUp";
      } else {
        return "selectRegion regionSelectOnSmaller";
      }
    },
    selectedRegion() {
      return this.regions[this.currentRegion];
    }
  },
  methods: {
    async setCurrentRegion(newRegion) {
      await this.$store.dispatch("changeRegion", newRegion.slug);
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
