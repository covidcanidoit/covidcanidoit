<template>
  <div class="browse-activities">
    <h1>Category: {{ category }}</h1>
    <div class="activities">
      <div
        class="activity"
        v-for="activity in categoryActivities"
        :key="activity.activityName"
      >
        <router-link
          :to="{ name: 'Home', params: { search: activity.activityName } }"
        >
          <div class="activity-name">
            {{ activity.activityName }}
            &nbsp;&nbsp;
            <i class="fas fa-angle-double-right"></i>
          </div>
        </router-link>
      </div>
    </div>

    <!-- <HowItWorks /> -->
  </div>
</template>

<script>
// import HowItWorks from "@/components/HowItWorks.vue";
import axios from "axios";
import parseCSV from "csv-parse/lib/sync";
// import { mapState } from "vuex";

export default {
  props: ["category"],
  components: {
    // HowItWorks
  },
  data: function() {
    return {
      activities: []
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

    console.log({ records });
    this.activities = records;
  },
  computed: {
    categoryActivities() {
      return this.activities.filter(
        activity => activity.category === this.category
      );
    }
  },
  methods: {
    onSelect(categoryName) {
      console.log({ categoryName });
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
.activities {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom: 1px solid black;

  .activity {
    width: 100px;
    padding: 10px white;
    /* border: 1px solid black; */
    /*border-top: 1px solid black;*/
    padding: 1em;
    background-color: #8ad4b4;
    flex: 40%;
    padding: 1em;
    margin: 1em;
  }

  .activity:nth-child(odd) {
    background-color: #21acb0;
    flex: 40%
  }
}
</style>
