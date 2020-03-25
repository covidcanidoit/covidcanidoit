<template>
  <div class="home">
    <Introduction />
    <search-bar @searched="onSearch" />
    <search-results />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Introduction from '@/components/Introduction.vue'
import searchBar from '@/components/searchBar.vue'
import searchResults from '@/components/searchResults.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Introduction,
    searchBar,
    searchResults
  },
  data: function() {
    return {
      searchTerm: ''
    }
  },
  methods: {
    onSearch(searchValue) {
      this.searchTerm = searchValue
      console.log(searchValue)
    }
  }
}
</script>
