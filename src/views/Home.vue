<template>
  <div class="home">
    <!-- <Introduction /> -->
    <div class="banner">
      <h5 class="bannerText">
        Tell us what you <b>want to do</b>, and this tool will tell you if you
        <b>should</b> do it during the COVID-19 outbreak.
      </h5>
    </div>
    <search-bar @searched="onSearch" />
    <search-results
      :searchedTerm="searchTerm"
      :searchResult="result"
      :searched="searched"
      :profile="userProfile"
    />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import searchBar from "@/components/searchBar.vue";
import searchResults from "@/components/searchResults.vue";
import riskData from "@/assets/riskData.json";

export default {
  name: "Home",
  components: {
    searchBar,
    searchResults
  },
  data: function() {
    return {
      searchTerm: "",
      searched: false,
      result: {},
      scores: {
        score: [1, 2, 3, 4, 5],
        riskCategory: ["Low", "Moderate", "Elevated", "High", "Critical"],
        riskDescription: [
          [
            "You can continue to do this activity.",
            "The frequency and nature of the activity puts you at low risk for contracting or transmitting COVID-19.",
            "You may still want to take extra precautions for prevent infection."
          ],
          [
            "You can continue to do this activity but you should consider ways to do this activity less or during less risky times.",
            "The frequency and nature of the activity puts you at some risk for contracting or transmitting COVID-19.",
            "Make sure to take extra precautions for prevent infection, like frequently washing your hands (with soap) for at least 20 seconds and remaining 6 feet from another person."
          ],
          [
            "You should consider stopping this activity.",
            "If you are unable to stop, you should consider ways to do this activity less or during less risky times.",
            "The frequency and nature of the activity puts you at more risk for contracting or transmitting COVID-19.",
            "Extra precautions to preventing infection are not enough, like frequently washing your hands (with soap) for at least 20 seconds and remaining 6 feet from another person. "
          ],
          [
            "You should stop this activity.",
            "The frequency and nature of the activity puts you at high risk for contracting or transmitting COVID-19.",
            "You may be endangering others and efforts to control the outbreak.",
            "Extra precautions to preventing infection are not enough, like frequently washing your hands (with soap) for at least 20 seconds and remaining 6 feet from another person. "
          ],
          [
            "Stop this activity immediately.",
            "The frequency and nature of the activity is endangering yourself and efforts to control the COVID-19 outbreak, regardless of extra precautions to preventing infection, like frequently washing your hands (with soap) for at least 20 seconds and remaining 6 feet from another person. "
          ]
        ]
      },
      userProfile: {}
    };
  },
  mounted() {
    console.log("riskData");
    console.log(riskData);
    this.userProfile = this.$store.getters.submitProfile;
  },
  methods: {
    onSearch(searchValue) {
      this.searchTerm = searchValue;
      this.searched = true;
      riskData.map(activity => {
        if (activity["Activity"].toLowerCase() == searchValue.toLowerCase()) {
          console.log(activity);
          this.result = activity;
        }
      });
      console.log(searchValue);
    }
  }
};
</script>

<style>
.banner {
  /* background-color: steelblue; */
}
.bannerText {
  text-align: center;
  margin-left: 20%;
  margin-right: 20%;
}
</style>
