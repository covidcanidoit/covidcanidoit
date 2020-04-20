<template>
  <div class="search-bar">
    <p class="header">I wonder if it's safe to...</p>
    <div class="dropdown search-fields">
      <div class="searchbar-container">
        <VueSelect 
          label="activityName" 
          :options="this.activityList"
          class="v-select"
          v-model="searchTerm"
          v-on:input="onSearch"
        />
        <button class="run-search" @click="onSearch">Assess my risk!</button>
      </div>
      <!--<input
        type="text"
        class="dropbtn"
        v-model="searchTerm"
        v-on:keyup.enter="onSearch"
        placeholder=""
      />
      <div class="dropdown-content">
        <a
          href="#"
          v-for="(activity, index) in activityListDynamic"
          @click="dropdownClick(activity)"
          :key="activity"
          :v-if="index < 5"
          >{{ activity }}</a
        >
      </div>
      <button class="run-search" @click="onSearch">Assess my risk!</button>-->
      <p class="subheader">...during the COVID-19 outbreak.</p>
    </div>
    <div class="or-others">
      <button @click="goToProfile">Fill in Profile</button>
      <button @click="goToBrowse">Browse Activities</button>
    </div>
  </div>
</template>

<script>
import Fuse from "fuse.js";
import VueSelect from "vue-select";

export default {
  components: {
    VueSelect
  },
  props: {
    msg: String,
    activityList: Array,
    perPage: { type: Number, default: 5 },
    initialSearchTerm: String,
    fullActivityList: Array
  },
  data: function() {
    return {
      searchTerm: "",
      dropdownIndex: 0
    };
  },
  methods: {
    onVueSelect(whatisthis) {
      console.log("--------");
      console.log(whatisthis);
      console.log("--------");
    },
    onSearch() {
      this.$emit("searched", this.searchTerm);
      this.searchTerm = "";
    },
    dropdownClick(value) {
      this.searchTerm = value;
      this.onSearch();
    },
    goToBrowse() {
      this.$router.push({ name: "Browse" });
    },
    goToProfile() {
      this.$router.push({ name: "CreateUserProfile" });
    }
  },
  computed: {
    activityListComplete() {
      const options = {
        minMatchCharLength: 2,
        includeScore: true,
        includeMatches: true,
        threshold: 0.3,
        keys: ["activityName"] // include synonyms in the future
      };

      const fuse = new Fuse(this.fullActivityList, options);
      const result = fuse.search(this.searchTerm);

      return result.map(result => result.item.activityName);
    },
    maxIndex() {
      return Math.ceil(this.activityListComplete.length / this.perPage);
    },
    activityListDynamic() {
      return this.activityListComplete;
    }
  },
  watch: {
    activityListComplete: function() {
      this.dropdownIndex = 0;
    }
  },
  mounted() {
    if (this.initialSearchTerm) {
      this.searchTerm = this.initialSearchTerm;
      this.onSearch();
    }
  }
};
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
@media only screen and (max-width: 1022px) {
  body{ 
    background-color: black;
  }
  .v-select {
    width: 50vw;
    background-color: black;
  }
  .v-select .vs__dropdown-menu{
    width: 90vw;
  }
  .header {
    font-size: 32px;
  }
}
@media (min-width: 1023px) {
  .v-select {
    width: 20vw;
    background-color: black;
  }
  .v-select .vs__dropdown-menu{
    width: 25vw;
  }
  .header {
    font-size: 64px;
  }
}
.search-bar {
  background-color: $color-teal;
  text-align: center;
  padding-top: 2em;

  h2 {
    margin-bottom: 1em;
  }

  .search-fields {
    white-space: nowrap;

    input {
      border-radius: 30px 0 0 30px;
      padding: 10px;
      /*border-top: 1px solid $color-darkgrey;
      border-right: none;
      border-bottom: 1px solid $color-darkgrey;
      border-left: 1px solid $color-darkgrey; */
    }

    button.run-search {
      border-radius: 0 30px 30px 0;
      border: 1px solid #fd6167;
      padding: 9px;
      background-color: #fd6167;
      color: black;
      font-size: 1.37em;
      float:right;
    }
  }

  button.create-profile {
    border-radius: 30px;
    border: 1px solid #ccc;
    padding: 10px;
    background-color: $color-salmon;
    color: $color-darkgrey;
  }
}

/* Dropdown Button */
.dropbtn {
  background-color: white;
  color: black;
  padding: 16px;
  font-size: 16px;
  border: none;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: fixed;
  background-color: #f1f1f1;
  width: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  max-height: 50%;
  overflow-y: scroll;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  overflow-wrap: break-word; //not sure why this isnt working to wrap text
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: white;
}

.dropdownNav {
  white-space: nowrap;
}

.dropdownNavControl {
  display: inline-block;
}

.or-others {
  button {
    border-radius: 30px;
    border: 1px solid $color-navy;
    padding: 10px;
    background-color: $color-navy;
    color: $color-teal;
    margin: 1em;
  }
}

.header {
  
  margin-bottom: 0;
  margin-top: 0;
}
.subheader {
  font-size: 24px;
  margin-top: 1px;
  clear:both;
}

.v-select {
  background-color: white;
  border-radius: 30px 0 0 30px;
  display: inline-block;
}
.v-select .vs__dropdown-toggle {
  border:none;  
}

.v-select .vs__dropdown-toggle .vs__actions{
  display: none;
}

.searchbar-container {
  width: fit-content;
}
</style>
