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
@media only screen and (max-width: 1022px) {
  .category {
    flex: 100%;
  }
}
@media (min-width: 1023px) {
  .category {
    flex: 40%;
  }
}
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
    border: 1px solid black;
    padding: 1em;
    margin: 1em;
    cursor: pointer;
    background-color: #8ad4b4;
  }
}
</style>
