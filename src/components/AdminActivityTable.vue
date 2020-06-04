<template>
  <div>
    <v-card>
      <v-card-title>
        Activities<v-icon>mdi-run</v-icon>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="activitySearch"
          append-icon="mdi-magnify"
          label="Search"
          single-line=""
          hide-details=""
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="showNewActivityPrompt" max-width="500">
        <template v-slot:activator="{ on }">
          <v-btn class="buttonNew" color="dark" dark v-on="on">&#x2b; New</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">Enter new activity name</v-card-title>
          <v-text-field
            class="promptInput"
            v-model="newActivityName"
            :counter="50"
            label="Enter activity name"
            clearable
            @keydown="activityAlreadyExistsError = false"
            @keydown.enter="newActivityOk"
          ></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary darken-1" text @click="showNewActivityPrompt = false">Cancel</v-btn>
            <v-btn color="primary darken-1" text @click="newActivityOk">Ok</v-btn>
          </v-card-actions>
        </v-card>
        <v-alert v-model="activityAlreadyExistsError" type="error">Activity already exists!</v-alert>
    </v-dialog>
      </v-card-title>
    <v-data-table :headers="headers" :items="activityList" :search="activitySearch">
      <template v-slot:item.actions="{ item }">
        <router-link
                  :to="{
                    name: 'AdminActivityEdit',
                    params: {
                      activityName: item.activityName,
                      slug: item.slug
                    }
                  }"
                ><v-icon>mdi-lead-pencil</v-icon></router-link>
        <v-icon @click="toggleActivityIsDisabled(item.slug,item.disabled)">{{ activityIsActive(item.disabled) }}</v-icon>
        <v-icon @click="showConfirmActivityDelete(item.slug)">mdi-trash-can</v-icon>
        
      </template>
    </v-data-table>
    </v-card>
    <v-dialog v-model="confirmActivityDelete" max-width="500">
          <v-card>
            <v-card-title>Are you sure you want to delete this activity?</v-card-title>
            <v-card-text>{{activitySlugToDelete}}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="secondary darken-1" text @click="deleteActivity">Yes</v-btn>
              <v-btn color="primary darken-1" text @click="hideActivityDelete">No</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
  </div>
  
</template>

<script>
import { db } from "@/db.js";
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      headers: [
        {
          text: "Slug",
          value: "slug",
          align: "left",
          sortable: "true"
          /*class: string[] | string,
          width: string*/
        },
        {
          text: "Name",
          value: "activityName",
          align: "left",
          sortable: "true"
          /*class: string[] | string,
          width: string*/
        },
        {
          text: "Category",
          value: "category",
          align: "left",
          sortable: "true"
          /*class: string[] | string,
          width: string*/
        },
        {
          text: "General",
          value: "generalRiskScore",
          align: "left",
          sortable: "true"
          /*class: string[] | string,
          width: string*/
        },
        {
          text: "Location?",
          value: "showLocation",
          align: "left",
          sortable: "true"
          /*class: string[] | string,
          width: string*/
        },
        {
          text: "Actions",
          value: "actions",
          align: "left",
          sortable: "false"
          /*class: string[] | string,
          width: string*/
        }
      ],
      showNewActivityPrompt: false,
      newActivityName: "",
      activityAlreadyExistsError: false,
      activitySlugToDelete: "",
      confirmActivityDelete: false,
      activitySearch: ""
    };
  },
  created() {},
  computed: {
    ...mapState(["content"]),
    ...mapGetters(["activities", "currentCountry"]),
    activityList() {
      return Object.values(this.activities);
    }
  },
  methods: {
    newActivity(activityName) {
      this.showNewActivityPrompt = true;
      if (activityName) this.newActivityName = activityName;
    },
    newActivityOk() {
      let currentKey = Object.keys(this.activities).find(
        key =>
          this.activities[key].activityName.toLowerCase() ===
          this.newActivityName.toLowerCase()
      );
      console.log("New Activity?", currentKey);
      if (currentKey) {
        this.activityAlreadyExistsError = true;
      } else {
        let activityName = this.newActivityName;
        let activitySlug = this.slugify(activityName);
        this.showNewActivityPrompt = false;
        db.ref("content")
          .child(this.currentCountry)
          .child("activities")
          .child(activitySlug)
          .child("slug")
          .set(activitySlug);
        db.ref("content")
          .child(this.currentCountry)
          .child("activities")
          .child(activitySlug)
          .child("activityName")
          .set(activityName);
        this.$router.push({
          name: "AdminActivityEdit",
          params: { activityName: activityName, slug: activitySlug }
        });
      }
    },
    activityAlreadyExistsErrorOk() {
      this.newActivityName = "";
    },
    activityIsActive(disabled) {
      if (disabled) return "mdi-eye-off";
      else return "mdi-eye";
    },
    toggleActivityIsDisabled(activitySlug,state) {
      state = !state;
      db.ref("content")
          .child(this.currentCountry)
          .child("activities")
          .child(activitySlug)
          .child("disabled")
          .set(state);
    },
    deleteActivity() {
      db.ref("content")
        .child(this.currentCountry)
        .child("activities")
        .child(this.activitySlugToDelete)
        .remove();
        this.confirmActivityDelete = false;
    },
    showConfirmActivityDelete(activitySlug) {
      this.activitySlugToDelete = activitySlug;
      this.confirmActivityDelete = true;
    },
    hideActivityDelete(event) {
      console.log("hide activity delete: ", event);

      this.confirmActivityDelete = false;
    },
    slugify(nodeName) {
      return nodeName.split(" ").join("-").toLowerCase();
    }
  }
};
</script>

<style scoped lang="scss">

.buttonNew {
  float: right;
  margin-top: 0.1em;
}

.promptInput {
  margin-left: 1em;
  margin-right: 1em;
}

</style>