<template>
  <div class="introduction">
    <input type="text" v-model="searchTerm" placeholder="I want to go..." />
    <button @click="onSearch">Search</button>
    <br />
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>