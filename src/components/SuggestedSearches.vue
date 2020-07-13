<template>
  <div class="suggested-searches">
    <div class="suggestions-title">
      Example Activities
    </div>
    <div class="or-others d-flex flex-wrap justify-center">
      <button
        v-for="search in searches"
        :key="search"
        @click="quickSearch(search)"
      >
        {{ search }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { sampleSize } from "lodash";

export default {
  data() {
    return {
      searches: []
    };
  },
  created() {
    this.searches = sampleSize(this.activities, 6).map(
      activity => activity.activityName
    );
  },
  computed: {
    ...mapGetters(["activities"])
  },
  methods: {
    quickSearch(search) {
      this.$emit("searched", search);
    }
  }
};
</script>

<style scoped lang="scss">
.suggested-searches {
  background-color: $secondary;
  text-align: center;
  padding-top: 0.25em;
  padding-bottom: 2em;
}

.or-others {
  button {
    border-radius: 30px;
    border: 1px solid $primary;
    padding: 1em 1.5em;
    background-color: $primary;
    color: black;
    margin: 0.5em 1em;
  }
}

@media #{map-get($display-breakpoints, 'md-and-down')} {
  .or-others button {
    font-size: 0.75em;
  }
}
</style>
