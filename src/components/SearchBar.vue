<template>
  <div class="search-bar d-flex flex-column align-stretch">
    <div class="header">What's the risk?</div>
    <div class="search-fields">
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="8">
            <VueSelect
              label="activityName"
              :options="this.activityList"
              class="v-select"
              v-model="searchTerm"
              v-on:input="onSearch"
              placeholder="Type your activity here"
            >
              <template #search="{ attributes, events }">
                <v-icon>mdi-magnify</v-icon>
                <input class="vs__search" v-bind="attributes" v-on="events" />
              </template>
              <template #no-options="{ search, searching}">
                <template v-if="searching">
                  We don't have information on {{ computedSearch(search) }}.
                  Click "Assess my risk!" to suggest it.
                </template>
              </template>
            </VueSelect>
          </v-col>
          <v-col cols="8" md="2">
            <button class="run-search" @click="onSearch">
              Search activities
            </button>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="or-others d-flex flex-wrap justify-center">
      <button @click="quickSearch('Biking alone')">Biking alone</button>
      <button @click="quickSearch('Shopping (Grocery store)')">
        Grocery shopping
      </button>
      <button @click="quickSearch('Walking with a friend')">
        Walk with a friend
      </button>
      <button @click="quickSearch('Food, Takeout')">Food, takeout</button>
      <button @click="quickSearch('Going to barbershop/hair salon')">
        Going to barbershop/hair salon
      </button>
      <button @click="quickSearch('Protesting')">Protesting</button>
      <button @click="quickSearch('Pumping/Filling gas')">
        Pumping/Filling gas
      </button>
    </div>
  </div>
</template>

<script>
import Fuse from "fuse.js";
import VueSelect from "vue-select";

export default {
  components: {
    VueSelect
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
      if (this.searchTerm === "") {
        this.$emit("suggested", this.suggested);
        this.suggested = "";
      }
      this.$emit("searched", this.searchTerm);
      this.searchTerm = "";
    },
    dropdownClick(value) {
      this.searchTerm = value;
      this.onSearch();
    },
    goToBrowse() {
      this.$router.push({ name: "Browse" });
    },
    goToProfile() {
      this.$router.push({ name: "CreateUserProfile" });
    },
    computedSearch(search) {
      this.suggested = search;
      return search;
    },
    quickSearch(slug) {
      // this.$router.push({ name: "activity", slug });
      this.$emit("searched", slug);
    }
  },
  computed: {
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
    }
  },
  watch: {
    activityListComplete: function() {
      this.dropdownIndex = 0;
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
  padding-bottom: 2em;
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
}

.or-others {
  button {
    border-radius: 30px;
    border: 1px solid $primary;
    padding: 10px;
    background-color: $primary;
    color: black;
    margin: 0.2em 1em;
  }
}

.header {
  margin-bottom: 0;
  margin-top: 0;
  font-size: 32px;
}

.v-select {
  background-color: white;
  border-radius: 30px 0 0 30px;
  padding: 10px;
}
.v-select .vs__dropdown-toggle {
  border: none;
}

/* .v-select .vs__dropdown-toggle .vs__actions { */
/*   display: none; */
/* } */
</style>
