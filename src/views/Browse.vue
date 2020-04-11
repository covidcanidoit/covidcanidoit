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

    <!-- <HowItWorks /> -->
  </div>
</template>

<script>
// import HowItWorks from "@/components/HowItWorks.vue";
import axios from "axios";
import parseCSV from "csv-parse/lib/sync";
// import { mapState } from "vuex";

export default {
  components: {
    // HowItWorks
  },
  data: function() {
    return {
      categories: []
    };
  },
  async mounted() {
    const dataSheetUrl =
      "https://docs.google.com/spreadsheets/d/11jG7_PkjIq3kPmhSwl9W2GpGoNe57WoBSoTo_0MS5J8/export?format=csv";
    const categories_result = await axios.get(`${dataSheetUrl}&gid=1087436199`);
    const categories = categories_result.data;

    const records = parseCSV(categories, {
      columns: true,
      skip_empty_lines: true
    });

    console.log({ records });
    this.categories = records;
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
