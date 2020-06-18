<template>
  <div class="home">
    <SearchBar
      :initialSearchTerm="search"
      @searched="onSearch"
      @suggested="onSuggest"
      :activityList="activityList"
      :perPage="5"
    />
    <HomeBanner v-if="currentCountry === 'US'" />
    <ThanksForSuggesting v-if="noResults" :suggested="suggested" />
    <SearchResults
      :activity="result"
      :searched="searched"
      :profile="userProfile"
    />
    <!-- will pass in data as crowdingData based on the example data Brock sent me -->
    <!-- <Chart crowdingData= /> -->
    <HowItWorks />
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import SearchResults from "@/components/SearchResults.vue";
import HomeBanner from "@/components/HomeBanner.vue";
import HowItWorks from "@/components/HowItWorks.vue";
import ThanksForSuggesting from "@/components/ThanksForSuggesting.vue";
import { mapState, mapGetters } from "vuex";
import VueScrollTo from "vue-scrollto";
// import Chart from "@/components/PopularTimesChart.vue"

export default {
  props: ["search", "skipProfile", "slug"],
  components: {
    SearchBar,
    SearchResults,
    HowItWorks,
    ThanksForSuggesting,
    HomeBanner
    // Chart
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
    ...mapState(["userProfile", "currentCountry"]),
    ...mapGetters(["hasEnteredProfileData", "activities"]),
    activityList() {
      return Object.values(this.activities || {})
        .filter(activity => !activity.disabled)
        .map(activity => activity.activityName);
    }
  },
  created() {
    if (this.slug) {
      console.log("Using slug", this.slug);
      this.onSearch(this.activities[this.slug].activityName);
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
        if (
          activity["activityName"].toLowerCase() == searchValue.toLowerCase()
        ) {
          this.result = activity;
          // Update URL
          if (!this.hasEnteredProfileData && !this.skipProfile) {
            this.$router.push({
              name: "CreateUserProfile",
              params: { search: searchValue }
            });
          } else {
            if (this.$route.params.slug != activity.slug) {
              this.$router.replace({
                name: "ActivitySearch",
                params: { slug: activity.slug }
              });
            }
            VueScrollTo.scrollTo("#search-results");
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
