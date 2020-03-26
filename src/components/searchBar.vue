<template>
  <div class="introduction" style="border: 1px solid black">
    <input type="text" v-model="searchTerm" placeholder="I want to go...">
    <button @click="onSearch" >Search</button>
  </div>
</template>

<script>
export default {
  name: 'searchBar',
  props: {
    msg: String
  },
  data: function() {
    return{
      searchTerm: ""
    }
  },
  methods: {
    onSearch() {
      this.$emit('searched', this.searchTerm)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
