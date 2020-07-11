<template>
  <div class="browse">
    <h1>Browse activities by category</h1>
    <div class="categories">
      <div
        class="category"
        v-for="category in categories"
        :key="category.name"
        @click="viewActivity(category.name)"
      >
        <i :class="category.icon"></i>
        <div class="category-name">{{ category.name }}</div>
        <div class="category-description">{{ category.shortDescription }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["categories"])
  },
  methods: {
    viewActivity(name) {
      this.$router.push({
        name: "BrowseCategory",
        params: { name: name }
      });
    }
  }
};
</script>

<style lang="scss">
.categories {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .category {
    flex: 40%;
    border: 1px solid black;
    padding: 1em;
    margin: 1em;
    cursor: pointer;
    background-color: $primary;
  }
}
</style>
