<template>
  <v-row class="browse ma-0">
    <v-col cols="12" md="8" offset-md="2">
      <h1 class="browse-header">Browse activities by category</h1>
    </v-col>
    <v-col cols="12" md="6" offset-md="3">
      <v-expansion-panels flat class="categories">
        <v-expansion-panel
          v-for="category in categories"
          :key="category.name"
          class="category"
        >
          <v-expansion-panel-header class="browse-panel-header">
            <div class="icon-wrapper flex-grow-0">
              <i :class="category.icon" class="browse-icon" />
            </div>
            <div class="category-name">
              {{ category.name }}
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="browse-panel-content">
            <div class="activity-list">
              <router-link
                v-for="activity in categoryActivities[category.name]"
                class="activity"
                :key="activity.activityName"
                :to="{
                  name: 'ActivitySearch',
                  params: { slug: activity.slug }
                }"
              >
                <div class="activity-name">
                  {{ activity.activityName }}
                </div>
              </router-link>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["categories", "activities"]),
    categoryActivities() {
      let activitiesList = {};
      for (const category in this.categories) {
        const activities = Object.values(this.activities)
          .filter(activity => activity.category === category)
          .filter(activity => !activity.disabled);
        activitiesList[category] = activities;
      }
      return activitiesList;
    }
  }
};
</script>

<style lang="scss">
.browse-header {
  padding: 48px 0 0;
  text-align: center;
}

.icon-wrapper {
  padding: 0.5em;
  border-radius: 100%;
  border: 2px solid $selectorgray;
  width: 50px;
  height: 50px;
  font-size: 1.5em;
  margin-right: 1em;
  color: $selectorgray;
  display: flex;
  align-items: center;
  justify-content: center;
}

.categories {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .browse-panel-header {
    border-bottom: 1px solid #a3bfbc;
    padding: 8px 0 8px 8px;
  }

  .category-name {
    font-size: 1.5em;
  }

  .browse-panel-content,
  .activity-name {
    padding: 6px 0;
  }
  .activity .activity-name {
    color: #2c3e50;
    text-decoration: none;
  }
}
</style>
