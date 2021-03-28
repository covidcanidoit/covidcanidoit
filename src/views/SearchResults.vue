<template>
  <div class="home">
    <RegionSelector :showWhen="shouldForceRegionSelect" />

    <div v-if="!shouldForceRegionSelect">
      <SearchResults
        v-if="activityHasBeenSet"
        :activity="result"
        :searched="searched"
      />
      <SuggestedSearches @searched="onSearch" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import SearchResults from "@/components/SearchResults.vue";
import SuggestedSearches from "@/components/SuggestedSearches.vue";
import RegionSelector from "@/components/RegionSelector.vue";

export default {
  props: ["search", "slug"],
  components: {
    SearchResults,
    SuggestedSearches,
    RegionSelector
  },
  data: function() {
    return {
      searched: false,
      result: {},
      noResults: false,
      suggested: "",
      activityHasBeenSet: false
    };
  },
  computed: {
    ...mapGetters(["activities", "currentDataset", "currentRegion", "regions"]),
    activityList() {
      return Object.values(this.activities || {}).filter(
        activity => !activity.disabled
      );
    },
    activityNamesList() {
      return this.activityList.map(activity => activity.name);
    },
    shouldForceRegionSelect() {
      if (this.$store.state.regionlock.lock === true) {
        return false;
      } else {
        return (
          Object.keys(this.regions).length > 1 && this.currentRegion === "all"
        );
      }
    }
  },
  created() {
    if (this.slug) {
      this.onSearch(this.activities[this.slug].name[this.$i18n.locale]);
    }
  },
  mounted() {
    this.result = this.activities[this.slug];
    this.activityHasBeenSet = true;
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
      for (let i = 0; i < this.activityList.length; i++) {
        const activity = this.activityList[i];
        if (!activity["name"]) continue;
        if (
          activity["name"][this.$i18n.locale].toLowerCase() ==
          searchValue.toLowerCase()
        ) {
          this.result = activity;
          if (this.$route.params.slug != activity.slug) {
            this.$router.push({
              name: "ActivitySearch",
              params: { slug: activity.slug }
            });
          }
        }
      }
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
