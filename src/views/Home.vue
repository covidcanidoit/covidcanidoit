<template>
  <div class="home">
    <SearchBar
      :initialSearchTerm="search"
      @searched="onSearch"
      @suggested="onSuggest"
      :activityList="activityList"
      :perPage="5"
    />
    <ThanksForSuggesting
      :NoResultsToShow="noResults"
      :suggested="suggested"
    />
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
import HowItWorks from "@/components/HowItWorks.vue";
import ThanksForSuggesting from "@/components/ThanksForSuggesting.vue";
import { mapState, mapGetters } from "vuex";
import VueScrollTo from "vue-scrollto";
import { db } from "@/db.js";
// import Chart from "@/components/PopularTimesChart.vue"

export default {
  props: ["search", "skipProfile", "slug"],
  components: {
    SearchBar,
    SearchResults,
    HowItWorks,
    ThanksForSuggesting
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
    ...mapState(["userProfile"]),
    ...mapGetters(["hasEnteredProfileData", "activities","currentCountry","suggestions"]),
    activityList() {
      return Object.values(this.activities || {}).map(
        activity => activity.activityName
      );
    }
  },
  created() {
    if (this.slug) {
      this.onSearch(
        this.activities.filter(activity => activity.slug == this.slug)[0]
          .activityName
      );
    }
  },
  methods: {
    onSearch(searchValue) {
      if (searchValue === "") {
        this.noResults = true;
      }
      else {
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
          if (!this.hasEnteredProfileData && !this.skipProfile) {
            this.$router.push({
              name: "CreateUserProfile",
              params: { search: searchValue }
            });
          } else {
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
        //event_label: "suggestion|" + suggestValue
      });
      //this.$store.commit("addSuggestion",suggestValue);
      if (!this.suggestions) {
        db.ref("suggestions");
      }
      if (!this.suggestions[this.currentCountry]) {
        db.ref("suggestions").child(this.currentCountry);
        this.suggestions[this.currentCountry] = {};
      }
      if (!this.suggestions[this.currentCountry]["activitySuggestions"]) {
        db.ref("suggestions").child(this.currentCountry).child("activitySuggestions");
        this.suggestions[this.currentCountry]["activitySuggestions"] = {};
      }
      if (this.suggestions[this.currentCountry]["activitySuggestions"][suggestValue] === null) {
        db.ref("suggestions").child(this.currentCountry).child("activitySuggestions").child(suggestValue).child("count").set(1);
      }
      else {
        let count;
        if (!this.suggestions[this.currentCountry]["activitySuggestions"][suggestValue]) count = 0;
        else count = this.suggestions[this.currentCountry]["activitySuggestions"][suggestValue].count;
        db.ref("suggestions").child(this.currentCountry).child("activitySuggestions").child(suggestValue).child("count").set(count+1);
      }
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
