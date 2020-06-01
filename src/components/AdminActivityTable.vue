<template>
  <div>
    <v-data-table :headers="headers" :items="activityList">
      <template v-slot:items="props">
        <tr>
          <td>{{props.item.slug}}</td>
          <td>{{props.item.activityName}}</td>
          <td>{{props.item.category}}</td>
          <td>{{props.item.generalRiskScore}}</td>
          <td>{{props.item.risk50To69}}</td>
          <td>{{props.item.riskOver70}}</td>
          <td>{{props.item.showLocation}}</td>
          <td>
            <v-icon @click="toggleActivityIsDisabled(props.item.slug,props.item.disabled)">{{ activityIsActive(props.item.disabled) }}</v-icon>
            <v-icon @click="showConfirmActivityDelete(props.item.slug)">mdi-trash-can</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
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
          text: "50-69",
          value: "risk50To69",
          align: "left",
          sortable: "true"
          /*class: string[] | string,
          width: string*/
        },
        {
          text: "70+",
          value: "riskOver70",
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
          align: "left",
          sortable: "true"
          /*class: string[] | string,
          width: string*/
        }
      ],
      showNewActivityPrompt: false,
      newActivityName: "",
      activityAlreadyExistsError: false,
      activitySlugToDelete: "",
      confirmActivityDelete: false
    };
  },
  created() {},
  computed: {
    ...mapState(["content"]),
    ...mapGetters(["activities"]),
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