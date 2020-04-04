<template>
  <div class="search-bar">
    <h1>Continue to live your life safely</h1>
    <h2>
      Assess the risk of your actions during the COVID-19 pandemic.
    </h2>
    <input type="text" v-model="searchTerm" placeholder="I want to go..." />
    <button @click="onSearch">Search</button>
    <h2>
      Help us give you a more accurate risk appraisal
    </h2>
    <div>Create a profile in 2 minutes</div>
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  },
  data: function() {
    return {
      searchTerm: ""
    };
  },
  methods: {
    onSearch() {
      this.$emit("searched", this.searchTerm);
    }
  }
};
</script>

<style lang="scss">
.search-bar {
  background-color: $color-teal;
  text-align: center;
}
</style>
