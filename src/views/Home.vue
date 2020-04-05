<template>
  <div class="home">
    <SearchBar @searched="onSearch" :activityList="activityList" :perPage="5" />
    <SearchResults
      :searchedTerm="searchTerm"
      :activity="result"
      :searched="searched"
      :profile="userProfile"
    />
    <ProfileCreate />
    <HowItWorks />
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import SearchResults from "@/components/SearchResults.vue";
import ProfileCreate from "@/components/ProfileCreate.vue";
import HowItWorks from "@/components/HowItWorks.vue";
import axios from "axios";
import parseCSV from "csv-parse/lib/sync";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    SearchBar,
    SearchResults,
    ProfileCreate,
    HowItWorks
  },
  data: function() {
    return {
      searchTerm: "",
      searched: false,
      result: {},
      riskData: [],
      activityList: []
    };
  },
  computed: {
    ...mapState(["userProfile"])
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

    console.log({ records });
    this.riskData = records;

    //add the list of activities to an array to pass into searchbar (for dropdown suggestions)
    // this.activityList = []
    records.map(record => {
      this.activityList.push(record.activityName);
    });
  },
  methods: {
    onSearch(searchValue) {
      this.searchTerm = searchValue;
      this.searched = true;
      this.riskData.map(activity => {
        if (activity["activityName"].toLowerCase() == searchValue.toLowerCase()) {
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
