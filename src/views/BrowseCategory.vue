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
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["category"],
  computed: {
    ...mapState(["activities"]),
    categoryActivities() {
      return this.activities.filter(
        activity => activity.category === this.category
      );
    }
  }
};
</script>

<style lang="scss">
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
    flex: 40%;
  }
}
</style>
