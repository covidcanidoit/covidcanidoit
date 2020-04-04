<template>
  <div class="home">
    <div class="banner">
      <h5 class="bannerText">
        Tell us what you <b>want to do</b>, and this tool will tell you if you
        <b>should</b> do it during the COVID-19 outbreak.
      </h5>
    </div>
    <SearchBar @searched="onSearch" />
    <SearchResults
      :searchedTerm="searchTerm"
      :searchResult="result"
      :searched="searched"
      :profile="userProfile"
    />
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import SearchResults from "@/components/SearchResults.vue";
import axios from "axios";
import parseCSV from "csv-parse/lib/sync";

export default {
  name: "Home",
  components: {
    SearchBar,
    SearchResults
  },
  data: function() {
    return {
      searchTerm: "",
      searched: false,
      result: {},
      riskData: [],
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
  async mounted() {
    const dataSheetUrl =
      "https://docs.google.com/spreadsheets/d/11jG7_PkjIq3kPmhSwl9W2GpGoNe57WoBSoTo_0MS5J8/export?format=csv";
    const activities_result = await axios.get(`${dataSheetUrl}&gid=219638739`);
    const activities = activities_result.data;

    const records = parseCSV(activities, {
      columns: true,
      skip_empty_lines: true
    });

    // console.log({ records });
    this.riskData = records;
    this.userProfile = this.$store.getters.submitProfile;
  },
  methods: {
    onSearch(searchValue) {
      this.searchTerm = searchValue;
      this.searched = true;
      this.riskData.map(activity => {
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

<style lang="scss">
.banner {
  /* background-color: steelblue; */
}
.bannerText {
  text-align: center;
  margin-left: 20%;
  margin-right: 20%;
}
</style>
