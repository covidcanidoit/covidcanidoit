<template>
  <div class="browse">
    <h1>Browse activities by category</h1>
    <div class="categories">
      <div
        class="category"
        v-for="category in categories"
        :key="category.category"
        @click="viewActivity(category.category)"
      >
        <i :class="category.icon"></i>
        <div class="category-name">{{ category.category }}</div>
        <div class="category-description">{{ category.shortDescription }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["categories"])
  },
  methods: {
    onSelect(categoryName) {
      console.log({ categoryName });
    },
    viewActivity(category) {
      this.$router.push({
        name: "BrowseCategory",
        params: { category: category }
      });
    }
  }
};
</script>

<style lang="scss">
.banner {
  /* background-color: steelblue; */
}
.bannerText {
  text-align: center;
  margin-left: 20%;
  margin-right: 20%;
}
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
    background-color: #8ad4b4;
  }
}
</style>
