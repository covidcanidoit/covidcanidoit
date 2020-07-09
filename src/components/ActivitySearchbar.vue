<template>
  <VueSelect
    label="activityName"
    :options="Object.values(this.activities)"
    class="v-select"
    v-model="activity"
    v-on:input="onSearch"
    placeholder="Type your activity here"
  >
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
    initialSearch: Object
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
      if (this.$route.params.slug != this.activity.slug) {
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
  mounted() {
    console.log("initialSearch", this.initialSearch);
    if (this.initialSearch) {
      console.log("initialSearch", this.initialSearch);
      this.activity = this.initialSearch;
      this.onSearch();
    }
  }
};
</script>

<style lang="scss" scoped>
.v-select {
  padding: 10px;
  border: 1px solid $color-medgrey;
  border-radius: 4px;
  min-width: 15%;
  display: inline-block;
}
</style>