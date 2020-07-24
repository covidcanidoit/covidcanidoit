<template>
  <div class="home d-flex flex-column">
    <HomeBanner v-if="currentCountry === 'US'" />
    <div class="hero">
      <router-link class="router" :to="{ name: 'Home' }">
        <Logo class="logo" />
      </router-link>
    </div>
    <SearchBar
      :initialSearchTerm="search"
      @searched="onSearch"
      :activityList="activityList"
      :perPage="5"
    />
    <SuggestedSearches @searched="onSearch" />
    <HowToThinkAboutRisk></HowToThinkAboutRisk>
    <HowItWorks />
    <v-dialog v-model="activitySelected" max-width="400">
      <v-card class="modalRegionSelector">
        <v-card-title class="headline">Risks Are Region-Specific</v-card-title>
        <v-card-text>Select a region first</v-card-text>
        <v-card-text>
          <RegionSelector @regionSelected="goToResults" parent="modal" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="goToResults">
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Logo from "@/assets/ccidi-logo-full.svg";
import SearchBar from "@/components/SearchBar.vue";
import SuggestedSearches from "@/components/SuggestedSearches.vue";
import HomeBanner from "@/components/HomeBanner.vue";
import HowItWorks from "@/components/HowItWorks.vue";
import HowToThinkAboutRisk from "@/components/HowToThinkAboutRisk.vue";
import RegionSelector from "@/components/RegionSelector.vue";
import { mapGetters } from "vuex";
import VueScrollTo from "vue-scrollto";

export default {
  props: ["search", "slug"],
  components: {
    Logo,
    SearchBar,
    SuggestedSearches,
    HowItWorks,
    HomeBanner,
    HowToThinkAboutRisk,
    RegionSelector
  },
  data: function() {
    return {
      searched: false,
      result: {},
      selectedActivitySlug: "",
      activitySelected: false
    };
  },
  computed: {
    ...mapGetters(["activities", "regions", "currentRegion", "currentCountry"]),
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
      if (searchValue !== "") {
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
          if (this.$route.params.slug != activity.slug) {
            this.selectedActivitySlug = activity.slug;
            this.activitySelected = true;
            // this.$router.push({
            //   name: "ActivitySearch",
            //   params: { slug: activity.slug }
            // });
          }
          VueScrollTo.scrollTo("#search-results");
        }
      });
    },
    goToResults() {
      this.$router.push({
        name: "ActivitySearch",
        params: { slug: this.selectedActivitySlug }
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
.hero {
  margin: 4em auto;

  svg {
    height: auto;
    width: 35vw;
  }
  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    svg {
      height: auto;
      width: 90vw;
    }
  }
}
</style>
