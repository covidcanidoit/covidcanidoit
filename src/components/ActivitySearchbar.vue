<template>
  <VueSelect
    label="activityName"
    :options="filteredActivities"
    :getOptionKey="option => option.slug"
    class="searchbar"
    v-model="activity"
    v-on:input="onSearch"
    placeholder="Type your activity here"
  >
    <template #search="{ attributes, events }">
      <v-icon v-if="inHome">mdi-magnify</v-icon>
      <input class="vs__search" v-bind="attributes" v-on="events" />
    </template>
    <template #no-options="{ search, searching}">
      <template v-if="searching">
        We don't have information on {{ computedSearch(search) }}. Click "Assess
        my risk!" to suggest it.
      </template>
    </template>
  </VueSelect>
</template>

<script>
import Fuse from "fuse.js";
import VueSelect from "vue-select";
import { mapGetters } from "vuex";

export default {
  components: {
    VueSelect
  },
  props: {
    initialSearch: Object,
    inHome: Boolean
  },
  data: function() {
    return {
      searchTerm: "",
      dropdownIndex: 0,
      suggested: "",
      activity: Object
    };
  },
  methods: {
    onSearch() {
      console.log("onSearch", this.activity);
      if (this.activity === "") {
        this.$emit("suggested", this.suggested);
        this.suggested = "";
      }
      this.$emit("searched", this.searchTerm);
      if (this.activity && this.$route.params.slug != this.activity.slug) {
        this.$router.replace({
          name: "ActivitySearch",
          params: { slug: this.activity.slug }
        });
        //this.$router.go();
      }
    },
    computedSearch(search) {
      this.suggested = search;
      return search;
    }
  },
  computed: {
    ...mapGetters(["activities"]),
    filteredActivities() {
      return Object.values(this.activities).filter(
        value => value.disabled !== true
      );
    },
    activityListComplete() {
      const options = {
        minMatchCharLength: 2,
        includeScore: true,
        includeMatches: true,
        threshold: 0.3
        //keys: ["activityName"] // include synonyms in the future
      };

      //const fuse = new Fuse(this.fullActivityList, options); // uncomment when ready to search both activityName and synonyms
      const fuse = new Fuse(this.activityList, options);
      const result = fuse.search(this.searchTerm);

      return result.map(result => result.item.activityName);
    },
    maxIndex() {
      return Math.ceil(this.activityListComplete.length / this.perPage);
    },
    activityListDynamic() {
      return this.activityListComplete;
    },
    searchbarClass() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return "v-select mediumAndUp";
      } else {
        return "v-select lowerThanMedium";
      }
    }
  },
  mounted() {
    console.log("initialSearch", this.initialSearch);
    if (this.initialSearch) {
      this.activity = this.initialSearch;
      this.onSearch();
    }
    if (!this.activity.slug) {
      console.log("clearing out activity name")
      this.activity = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.searchbar {
  padding: 10px;
  border: 1px solid $color-medgrey;
  border-radius: 4px;
  min-width: 15%;
  display: inline-block;
  width: 100%;
  background-color: white;
}
.lowerThanMedium {
  width: 100%;
}
.mediumAndUp {
  width: 20%;
}
</style>
