<template>
  <div class="search-bar">
    <h1>Continue to live your life safely</h1>
    <h2>Assess the risk of your actions during the COVID-19 pandemic.</h2>
    <div class="dropdown">
      <!-- <button class="dropbtn">Dropdown</button> -->
      <input
        type="text"
        class="dropbtn"
        v-model="searchTerm"
        v-on:keyup.enter="onSearch"
        placeholder="I want to go..."
      />
      <div class="dropdown-content">
        <a
          href="#"
          v-for="activity in activityListDynamic"
          @click="dropdownClick(activity)"
          :key="activity"
        >{{activity}}</a>
      </div>
      <button @click="onSearch">Assess my risk!</button>
    </div>
    <h2>Help us give you a more accurate risk appraisal</h2>
    <button class="create-profile">Create a profile in 2 minutes</button>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
    activityList: Array
  },
  data: function() {
    return {
      searchTerm: ""
    };
  },
  methods: {
    onSearch() {
      this.$emit("searched", this.searchTerm);
    },
    dropdownClick(value) {
      this.searchTerm = value;
      this.onSearch();
    }
  },
  computed: {
    activityListDynamic() {
      return this.activityList.filter(string =>
        string.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  },
  mounted() {
    console.log(this.activityList);
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

/* Dropdown Button */
.dropbtn {
  background-color: white;
  color: white;
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
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
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
  background-color: steelblue;
}
</style>
