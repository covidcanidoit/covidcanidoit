<template>
  <div class="home">
    <v-dialog persistent v-model="shouldForceRegionSelect" max-width="400">
      <v-card class="modalRegionSelector">
        <v-card-title class="headline">Select a region/state</v-card-title>
        <v-card-text>
          Different regions and states have different levels of disease control.
          This impacts your risk.
        </v-card-text>
        <v-card-text>
          <RegionSelector parent="modal" />
        </v-card-text>
      </v-card>
    </v-dialog>

    <div v-if="!shouldForceRegionSelect">
      <ThanksForSuggesting v-if="noResults" :suggested="suggested" />
      <SearchResults :activity="result" :searched="searched" />
      <SuggestedSearches @searched="onSearch" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import SearchResults from "@/components/SearchResults.vue";
import ThanksForSuggesting from "@/components/ThanksForSuggesting.vue";
import SuggestedSearches from "@/components/SuggestedSearches.vue";
import RegionSelector from "@/components/RegionSelector.vue";

export default {
  props: ["search", "slug"],
  components: {
    SearchResults,
    ThanksForSuggesting,
    SuggestedSearches,
    RegionSelector
  },
  data: function() {
    return {
      searched: false,
      result: {},
      noResults: false,
      suggested: ""
    };
  },
  computed: {
    ...mapGetters(["activities", "currentCountry", "currentRegion", "regions"]),
    activityList() {
      return Object.values(this.activities || {})
        .filter(activity => !activity.disabled)
        .map(activity => activity.name);
    },
    shouldForceRegionSelect() {
      return (
        Object.keys(this.regions).length > 1 && this.currentRegion === "all"
      );
    }
  },
  created() {
    if (this.slug) {
      console.log("Using slug", this.slug);
      this.onSearch(this.activities[this.slug].name);
    }
  },
  methods: {
    onSearch(searchValue) {
      if (searchValue === "") {
        this.noResults = true;
      } else {
        this.noResults = false;
        this.$gtag.event("search", {
          event_category: "user-action",
          event_label: searchValue
        });
      }

      this.searched = true;
      Object.values(this.activities).map(activity => {
        if (activity["name"].toLowerCase() == searchValue.toLowerCase()) {
          this.result = activity;
          if (this.$route.params.slug != activity.slug) {
            this.$router.push({
              name: "ActivitySearch",
              params: { slug: activity.slug }
            });
          }
        }
      });
    },

    onSuggest(suggestValue) {
      this.suggested = suggestValue;
      this.$gtag.event("search", {
        event_category: "user-action",
        event_label: suggestValue
      });
    }
  }
};
</script>

<style lang="scss">
.bannerText {
  text-align: center;
  margin-left: 20%;
  margin-right: 20%;
}
</style>
