<template>
  <div id="app">
    <router-link class="router" to="/">
      <img src="@/assets/logo.png" class="logo" align="left" />
    </router-link>
    <div id="nav" class="navigation">
      <router-link class="router" to="/">Home</router-link> |
      <router-link class="router" to="/browse">Find An Activity</router-link> |
      <router-link to="/createUserProfile">Profile</router-link> |
      <router-link to="/about">Learn More</router-link>
    </div>
    <div><router-view /></div>
  </div>
</template>

<script>
import axios from "axios";
import parseCSV from "csv-parse/lib/sync";
import { mapMutations } from "vuex";

export default {
  async created() {
    let loadGoogleData = async (id, gid) => {
      const dataSheetUrl = `https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${gid}`;
      const googleDataResult = await axios.get(dataSheetUrl);
      const googleDataCSV = googleDataResult.data;

      const googleData = parseCSV(googleDataCSV, {
        columns: true,
        skip_empty_lines: true
      });
      return googleData;
    };

    console.log("Downloading activities");
    const activities = await loadGoogleData(
      "11jG7_PkjIq3kPmhSwl9W2GpGoNe57WoBSoTo_0MS5J8",
      "219638739"
    );
    this.setActivities(activities);

    console.log("Downloading categories");
    const categories = await loadGoogleData(
      "11jG7_PkjIq3kPmhSwl9W2GpGoNe57WoBSoTo_0MS5J8",
      "1087436199"
    );
    this.setCategories(categories);

    console.log("Downloading risk level descriptions");
    const riskLevels = await loadGoogleData(
      "11jG7_PkjIq3kPmhSwl9W2GpGoNe57WoBSoTo_0MS5J8",
      "1690487024"
    );
    this.setRiskLevels(riskLevels);


  },
  methods: {
    ...mapMutations(["setActivities", "setCategories", "setRiskLevels"])
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

body {
  background-color: #ccc;
}

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: white;

  max-width: 1024px;
  margin: 0 auto;
  border: 1px solid $color-lightgrey;
}

.logo {
  width: 200px;
  height: 100px;
}

.navigation {
  height: 100px;
  text-align: right;
  padding: 1em;

  a {
    font-weight: bold;
    color: #0f4a5c;

    &.router-link-exact-active {
      color: #8ad4b4;
    }
  }
}

.form-select {
  /* display: inline-block;
  max-width: 100%;
  height: 34px;
  padding-right: 24px; */
  /* background-color: rgb(186, 214, 26); */
  /* background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 8px 10px; */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png)
    no-repeat right 16px center #ddd;

  min-height: 34px;
  min-width: 120px;
  padding: 6px 8px;
  font-size: 16px;
  line-height: 20px;
  /* color: #24292e; */
  vertical-align: middle;
  /* background-color: rgb(247, 12, 12); */
  /* background-repeat: no-repeat;
  background-position: right 8px center; */
  /* border: 1px solid #d1d5da; */
  border-radius: 30px;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
}
</style>
