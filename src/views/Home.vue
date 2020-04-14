<template>
  <div class="home">
    <SearchBar
      :initialSearchTerm="search"
      @searched="onSearch"
      :activityList="activityList"
      :perPage="5"
    />
    <SearchResults
      :activity="result"
      :searched="searched"
      :profile="userProfile"
    />
    <HowItWorks />
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import SearchResults from "@/components/SearchResults.vue";
import HowItWorks from "@/components/HowItWorks.vue";
import { mapState, mapGetters } from "vuex";
import VueScrollTo from "vue-scrollto";

export default {
  props: ["search", "skipProfile", "slug"],
  components: {
    SearchBar,
    SearchResults,
    HowItWorks
  },
  data: function() {
    return {
      searched: false,
      result: {}
    };
  },
  computed: {
    ...mapState(["userProfile", "activities"]),
    ...mapGetters(["hasEnteredProfileData"]),
    activityList() {
      return this.activities.map(activity => activity.activityName);
    }
  },
  created() {
    if (this.slug) {
      this.onSearch( this.activities.filter(activity => activity.slug == this.slug)[0].activityName );
    }
  },
  methods: {
    onSearch(searchValue) {
      this.searched = true;
      this.$gtag.event("search", {
        event_category: "user-action",
        event_label: searchValue
      });

      this.activities.map(activity => {
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
