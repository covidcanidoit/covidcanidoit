<template>
  <div class="search-bar">
    <p class="header">I wonder if it's safe to...</p>
    <div class="dropdown search-fields">
      <input
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
          <div class="dropdownNav">
            <button class="dropdownNavControl" @click="dropdownIndex--" v-show="dropdownIndex > 0">
              Previous
            </button>
            <p class="dropdownNavControl" v-show="dropdownIndex < maxIndex" >({{dropdownIndex}} of {{maxIndex}} )</p>
            <button class="dropdownNavControl" @click="dropdownIndex++" v-show="(dropdownIndex < maxIndex) && (maxIndex > 1)">
              Next
            </button>
           </div> 
      </div>
      <button class="run-search" @click="onSearch">Assess my risk!</button>
      <p class="subheader">...during the COVID-19 outbreak.</p>
    </div>
    <div class="or-others">
      <button @click="goToProfile">Fill in Profile</button>
      <button @click="goToBrowse">Browse Activities</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
    activityList: Array,
    perPage: { type: Number, default: 5 },
    initialSearchTerm: String
  },
  data: function() {
    return {
      searchTerm: "",
      dropdownIndex: 0
    };
  },
  methods: {
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
      return this.activityList.filter(string =>
        string.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    maxIndex() {
      return Math.ceil(this.activityListComplete.length / this.perPage);
    },
    activityListDynamic() {
      return this.activityListComplete.slice(
        this.dropdownIndex * this.perPage,
        (this.dropdownIndex + 1) * this.perPage
      );
    }
  },
  watch: {
    activityListComplete: function() {
      this.dropdownIndex = 0;
    }
  },
  mounted() {
    console.log(this.activityList);
    if (this.initialSearchTerm) {
      this.searchTerm = this.initialSearchTerm;
      // I think we shouldn't have to delay this... but it works better if we d
      setTimeout(() => this.onSearch(), 1000);
    }
  }
};
</script>

<style lang="scss">
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
      border-top: 1px solid $color-darkgrey;
      border-right: none;
      border-bottom: 1px solid $color-darkgrey;
      border-left: 1px solid $color-darkgrey;
    }

    button.run-search {
      border-radius: 0 30px 30px 0;
      border: 1px solid #fd6167;
      padding: 10px;
      background-color: #fd6167;
      color: black;
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
  position: absolute;
  background-color: #f1f1f1;
  width: 300px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
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
    border: 1px solid #ccc;
    padding: 10px;
    background-color: $color-navy;
    color: $color-teal;
    margin: 1em;
  }
}

.header {
  font-size: 64px;
  margin-bottom: 0;
}
.subheader {
  font-size: 24px;
}
</style>
