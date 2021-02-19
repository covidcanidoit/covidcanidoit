<template>
  <div>
    <VueSelect
      :options="regionsList"
      :getOptionLabel="itemText"
      class="selectRegion"
      :value="selectedRegion"
      @input="setCurrentRegion"
      placeholder="Select a region/state"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VueSelect from "vue-select";
import Fuse from "fuse.js";

export default {
  components: {
    VueSelect
  },
  props: {
    parent: String
  },
  computed: {
    ...mapGetters(["currentRegion", "regions"]),
    regionsList() {
      return Object.values(this.regions)
        .filter(region => region.slug != "all")
        .filter(region => region.population_2019)
        .sort((a, b) => (a.state > b.state ? 1 : -1));
    },
    selectedRegion() {
      return this.regions[this.currentRegion];
    }
  },
  methods: {
    async setCurrentRegion(newRegion) {
      await this.$store.dispatch("changeRegion", newRegion.slug);
    },
    itemText(item) {
      return `${item.state} - ${item.county}`;
    },
    fuseSearch(options, search) {
      const fuse = new Fuse(options, {
        keys: ["state", "county"],
        ignoreLocation: true
      });
      return search.length
        ? fuse.search(search).map(({ item }) => item)
        : fuse.list;
    }
  }
};
</script>

<style lang="scss" scoped>
.selectRegion {
  padding: 10px;
  margin: 5px;
  border: 1px solid $color-medgrey;
  border-radius: 4px;
  width: 100%;
  min-width: 10%;
  display: inline-block;
  background-color: white;

  &.vs--open {
    border-radius: 30px 30px 0px 0px !important;
  }
}
</style>
