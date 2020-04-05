<template>
  <div class="search-bar">
    <h1>Continue to live your life safely</h1>
    <h2>
      Assess the risk of your actions during the COVID-19 pandemic.
    </h2>
    <div class="search-fields">
      <input
        type="text"
        v-model="searchTerm"
        v-on:keyup.enter="onSearch"
        placeholder="I want to go..."
      />
      <button @click="onSearch">Assess my risk!</button>
    </div>
    <h2>
      Help us give you a more accurate risk appraisal
    </h2>
    <button class="create-profile">Create a profile in 2 minutes</button>
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
  padding: 1em;

  .search-fields {
    white-space: nowrap;

    input {
      border-radius: 30px 0 0 30px;
      padding: 10px;
      border: 1px solid #ccc;
    }

    button {
      border-radius: 0 30px 30px 0;
      border: 1px solid #ccc;
      padding: 10px;
      background-color: $color-peach;
      color: #666;
    }
  }

  button.create-profile {
    border-radius: 30px;
    border: 1px solid #ccc;
    padding: 10px;
    background-color: $color-salmon;
    color: #666;
  }
}
</style>
