<template>
  <div>
    <v-dialog persistent fullscreen v-model="showWhen">
      <v-card class="modalRegionSelector">
        <v-card-title class="headline">Select a region/state</v-card-title>
        <v-card-text>
          Different regions and states have different levels of disease control.
          This impacts your risk.
        </v-card-text>
        <v-card-text>
          <v-col>
            <v-row justify="center">
              <VueSelect
                :options="regionsListState"
                :getOptionLabel="itemTextState"
                class="selectRegion"
                :value="selectedState"
                @input="setCurrentState"
                placeholder="Select a state"
              />
              <VueSelect
                v-if="selectedState"
                :options="regionsListCounty"
                :getOptionLabel="itemTextCounty"
                class="selectRegion"
                :value="selectedRegion"
                @input="setCurrentRegion"
                placeholder="Select a county"
              />
            </v-row>
            <v-row>
              <v-btn v-if="selectedRegion">View Activity</v-btn>
            </v-row>
          </v-col>
        </v-card-text>
      </v-card>
    </v-dialog>
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
    showWhen: undefined
  },
  data() {
    return {
      selectedState: undefined
    };
  },
  computed: {
    ...mapGetters(["currentRegion", "regions"]),
    regionsList() {
      return Object.values(this.regions)
        .filter(region => region.slug != "all")
        .filter(region => region.population_2019)
        .sort((a, b) => (a.slug > b.slug ? 1 : -1));
    },
    regionsListState() {
      return this.regionsList.filter(region => region.county == "ALL");
      // .filter(
      //   (region, i, a) =>
      //     a.findIndex(r => r.state == region.state) == i
      // );
    },
    regionsListCounty() {
      return this.regionsList.filter(
        region => region.state == this.selectedState.state
      );
    },
    selectedRegion() {
      return this.regions[this.currentRegion];
    }
  },
  methods: {
    async setCurrentRegion(newRegion) {
      await this.$store.dispatch("changeRegion", newRegion.slug);
    },
    setCurrentState(newState) {
      this.selectedState = newState;
    },
    itemText(item) {
      return `${item.state} - ${item.county}`;
    },
    itemTextCounty(item) {
      return `${item.county}`;
    },
    itemTextState(item) {
      return `${item.state}`;
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
  /* width: 100%; */
  min-width: 10%;
  display: inline-block;
  background-color: white;

  &.vs--open {
    border-radius: 30px 30px 0px 0px !important;
  }
}
</style>
