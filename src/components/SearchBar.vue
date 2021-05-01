<template>
  <div class="search-bar d-flex flex-column align-stretch">
    <div class="header">What's the risk?</div>
    <div class="search-fields">
      <v-container :class="containerRowClass">
        <v-row :class="containerRowClass" justify="center" align="center">
          <v-col cols="12" md="8" :class="searchbarClass">
            <ActivitySearchbar
              :inHome="true"
              @search:focus="showMostlySearch"
            />
          </v-col>
          <v-col cols="12" md="2" :class="searchbarClass">
            <button class="run-search" @click="onSearch">
              Search activities
            </button>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import ActivitySearchbar from "@/components/ActivitySearchbar.vue";
import VueScrollTo from "vue-scrollto";

export default {
  components: {
    ActivitySearchbar
  },
  props: {
    msg: String,
    activityList: Array,
    perPage: { type: Number, default: 5 },
    initialSearchTerm: String
  },
  data: function() {
    return {
      searchTerm: "",
      dropdownIndex: 0,
      suggested: ""
    };
  },
  methods: {
    onSearch() {
      this.$emit("searched", this.searchTerm);
      this.searchTerm = "";
    },
    dropdownClick(value) {
      this.searchTerm = value;
      this.onSearch();
    },
    showMostlySearch() {
      if (this.$vuetify.breakpoint.smAndDown) {
        // The search bar is now focused, let's scroll it to the top
        VueScrollTo.scrollTo(".search-bar", { offset: -56, cancelable: false });
      }
    }
  },
  computed: {
    containerRowClass() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return "";
      } else {
        return "containerRowColumnsOnSmaller";
      }
    },
    searchbarClass() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return ".searchbarMediumAndUp";
      } else {
        return "containerRowColumnsOnSmaller searchbarOnSmaller";
      }
    }
  },
  mounted() {
    if (this.initialSearchTerm) {
      this.searchTerm = this.initialSearchTerm;
      this.onSearch();
    }
  }
};
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
.search-bar {
  background-color: $secondary;
  text-align: center;
  padding-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;

  .search-fields {
    .v-select {
      border-radius: 30px;
    }
  }
}

button.run-search {
  white-space: nowrap;
  border-radius: 30px;
  border: 1px solid $selectorgray;
  padding: 9px;
  background-color: $selectorgray;
  color: white;
  font-size: 1.25em;
  min-width: 10em;
}

.header {
  margin-bottom: 0;
  margin-top: 0;
  font-size: 32px;
}

.suggestions-title {
  margin-top: 1em;
  margin-bottom: 0.5em;
  font-size: 24px;
}

.col .v-select {
  background-color: white;
  border-radius: 30px 0 0 30px;
  padding: 10px;
}
.v-select .vs__dropdown-toggle {
  border: none;
}

.container.containerRowColumnsOnSmaller {
  width: 100%;
  max-width: 100%;
  margin: 0;
}

.row.containerRowColumnsOnSmaller {
  width: 100%;
  max-width: 100%;
  margin: 0;
}

.col-12.searchbarOnSmaller {
  flex: 1 1 100%;
  font-size: 0.9rem;
}
.searchbarOnSmaller button {
  width: 100%;
}
.searchbarMediumAndUp .v-select {
  width: 100%;
}
</style>
