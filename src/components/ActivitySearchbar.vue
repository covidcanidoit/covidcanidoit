<template>
  <div>
    <VueSelect
      label="name"
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
          <v-btn @click="onSearch">
            Request a risk score
            <br />
            for {{ computedSearch(search) }}
          </v-btn>
        </template>
      </template>
    </VueSelect>
    <v-dialog v-model="suggestionTriggered" max-width="290">
      <v-card class="modalCard">
        <v-card-title class="headline">Activity Suggestion</v-card-title>
        <v-card-text>Thanks for suggesting an activity</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="suggestionTriggered = false"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { db } from "@/db.js";
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
      activity: Object,
      suggestionTriggered: false
    };
  },
  methods: {
    onSearch() {
      console.log("onSearch", this.activity);
      if (this.activity === null && this.suggested) {
        console.log("suggestion triggered:", this.suggested);
        this.suggestionTriggered = true;
        this.saveSuggestion();
      }
      this.$emit("searched", this.searchTerm);
      if (this.activity && this.$route.params.slug != this.activity.slug) {
        this.$router.replace({
          name: "ActivitySearch",
          params: { slug: this.activity.slug }
        });
      }
    },
    computedSearch(search) {
      this.activity = null;
      this.suggested = search;
      return search;
    },
    saveSuggestion() {
      console.log(
        "this.currentCountry",
        this.currentCountry,
        "this.suggested",
        this.suggested
      );
      //let count = 0;
      db.ref("suggestions")
        .child(this.currentCountry)
        .child("activitySuggestions")
        .child(this.suggested)
        .child("count")
        .once("value")
        .then(this.saveInner);
    },
    saveInner(snapshot) {
      if (!snapshot) return;
      let count = snapshot.val();
      console.log(this.suggested, " : ", count);

      db.ref("suggestions")
        .child(this.currentCountry)
        .child("activitySuggestions")
        .child(this.suggested)
        .child("count")
        .set(count + 1);
      this.suggested = "";
    }
  },
  computed: {
    ...mapGetters(["currentCountry", "activities"]),
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
        //keys: ["name"] // include synonyms in the future
      };

      //const fuse = new Fuse(this.fullActivityList, options); // uncomment when ready to search both name and synonyms
      const fuse = new Fuse(this.activityList, options);
      const result = fuse.search(this.searchTerm);

      return result.map(result => result.item.name);
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
      console.log("clearing out activity name");
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

  &.vs--open {
    border-radius: 30px 30px 0px 0px !important;
  }
}
.lowerThanMedium {
  width: 100%;
}
.mediumAndUp {
  width: 20%;
}

.modalCard {
  z-index: 1;
}
</style>
