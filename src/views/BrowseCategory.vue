<template>
  <div class="browse-activities">
    <h1>Category: {{ name }}</h1>
    <div class="activities">
      <div
        class="activity"
        v-for="activity in categoryActivities"
        :key="activity.activityName"
      >
        <router-link
          :to="{ name: 'Home', params: { search: activity.activityName } }"
        >
          <div class="activity-name stretched-link">
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
import { mapGetters } from "vuex";

export default {
  props: ["name"],
  computed: {
    ...mapGetters(["activities"]),
    categoryActivities() {
      return Object.values(this.activities).filter(activity => activity.category === this.name);
    }
  }
};
</script>

<style lang="scss">
@media only screen and (max-width: 1022px) {
  .activity {
    flex: 100%;
  }
}
@media (min-width: 1023px) {
  .activity {
    flex: 40%;
  }
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
    padding: 1em;
    margin: 1em;
    position: relative;

    .activity-name {
      color: #2c3e50;
    }
  }

  .activity:nth-child(odd) {
    background-color: #21acb0;
    
  }
}
</style>
