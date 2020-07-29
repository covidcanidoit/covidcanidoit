<template>
  <div>
    <v-card>
      <v-card-title>
        Activities
        <v-icon>mdi-run</v-icon>
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
            <v-btn class="buttonNew" color="dark" dark v-on="on">
              &#x2b; New
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">
              Enter new activity name
            </v-card-title>
            <v-text-field
              class="promptInput"
              v-model="newName"
              :counter="50"
              label="Enter activity name"
              clearable
              @keydown="activityAlreadyExistsError = false"
              @keydown.enter="newActivityOk"
            ></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="secondary darken-1"
                text
                @click="showNewActivityPrompt = false"
              >
                Cancel
              </v-btn>
              <v-btn color="primary darken-1" text @click="newActivityOk">
                Ok
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-alert v-model="activityAlreadyExistsError" type="error">
            Activity already exists!
          </v-alert>
        </v-dialog>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="activityList"
        :search="activitySearch"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            :title="timestampTooltip(item.lastVerifiedOn, item.lastVerifiedBy)"
            @click="VerifyWithTimestamp(item.slug)"
          >
            mdi-stamper
          </v-icon>
          <router-link
            :to="{
              name: 'AdminActivityEdit',
              params: {
                name: item.name,
                slug: item.slug,
                currentUserSettings: currentUserSettings
              }
            }"
          >
            <v-icon title="Edit this activity">mdi-lead-pencil</v-icon>
          </router-link>
          <v-icon
            :title="EnableDisableActivityTooltip(item.disabled)"
            @click="toggleActivityIsDisabled(item.slug, item.disabled)"
          >
            {{ activityIsActive(item.disabled) }}
          </v-icon>
          <!--<v-icon
            title="Delete this activity"
            @click="showConfirmActivityDelete(item.slug)"
          >
            mdi-trash-can
          </v-icon>-->
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="confirmActivityDelete" max-width="500">
      <v-card>
        <v-card-title>
          Are you sure you want to delete this activity?
        </v-card-title>
        <v-card-text>{{ activitySlugToDelete }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary darken-1" text @click="deleteActivity">
            Yes
          </v-btn>
          <v-btn
            color="primary darken-1"
            text
            @click="confirmActivityDelete = false"
          >
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { db } from "@/db.js";
import { mapState, mapGetters } from "vuex";

export default {
  props: ["incomingNewName", "currentUserSettings"],
  watch: {
    incomingNewName: "newActivity"
  },
  data() {
    return {
      headers: [
        {
          text: "Slug",
          value: "slug",
          align: "left",
          sortable: "true",
          class: ["tableHeader"]
        },
        {
          text: "Name",
          value: "name",
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
          text: "riskScore Poor",
          value: "riskScore.poor",
          align: "left",
          sortable: "true"
        },
        {
          text: "riskScore Caution",
          value: "riskScore.caution",
          align: "left",
          sortable: "true"
        },
        {
          text: "riskScore Better",
          value: "riskScore.better",
          align: "left",
          sortable: "true"
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
      newName: "",
      activityAlreadyExistsError: false,
      activitySlugToDelete: "",
      confirmActivityDelete: false,
      activitySearch: ""
    };
  },
  created() {},
  mounted() {
    if (this.incomingNewName) {
      this.newActivity(this.incomingNewName);
    }
  },
  computed: {
    ...mapState(["content"]),
    ...mapGetters(["activities", "currentCountry", "currentUserUid", "users"]),
    activityList() {
      return Object.values(this.activities);
    }
  },
  methods: {
    newActivity(newVal) {
      if (newVal !== "") {
        this.newName = newVal;
        this.showNewActivityPrompt = true;
        this.$emit("newActivityPopupShown");
      }
    },
    newActivityOk() {
      let currentKey = Object.keys(this.activities).find(
        key =>
          this.activities[key].name.toLowerCase() === this.newName.toLowerCase()
      );
      console.log("New Activity?", currentKey);
      if (currentKey) {
        this.activityAlreadyExistsError = true;
      } else {
        let name = this.newName;
        let activitySlug = this.slugify(name);
        this.populateNewActivity(name, activitySlug);
        this.$router.push({
          name: "AdminActivityEdit",
          params: { name: name, slug: activitySlug }
        });
      }
    },
    setActivityNode(activitySlug, nodeName, nodeValue) {
      db.ref("content")
        .child(this.currentCountry)
        .child("activities")
        .child(activitySlug)
        .child(nodeName)
        .set(nodeValue);
    },
    populateNewActivity(activityName, activitySlug) {
      this.showNewActivityPrompt = false;
      this.setActivityNode(activitySlug, "slug", activitySlug);
      this.setActivityNode(activitySlug, "name", activityName);
      this.setActivityNode(activitySlug, "disabled", true);

      // set initial values to allow activity to show up in admin edit
      const initialData = [
        "characteristics/crowding/score",
        "characteristics/crowding/notes",
        "characteristics/droplets/score",
        "characteristics/droplets/notes",
        "characteristics/exposureTime/score",
        "characteristics/exposureTime/notes",
        "characteristics/ventilation/score",
        "characteristics/ventilation/notes",
        "riskScore/poor",
        "riskScore/caution",
        "riskScore/better"
      ];
      initialData.forEach(property => {
        this.setActivityNode(activitySlug, property, "");
      });
    },
    activityAlreadyExistsErrorOk() {
      this.newName = "";
    },
    activityIsActive(disabled) {
      if (disabled) return "mdi-eye-off";
      else return "mdi-eye";
    },
    toggleActivityIsDisabled(activitySlug, state) {
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
      return nodeName
        .split(" ")
        .join("-")
        .toLowerCase();
    },
    EnableDisableActivityTooltip(disabled) {
      return disabled === true
        ? "Enable this activity"
        : "Disable this activity";
    },
    VerifyWithTimestamp(activitySlug) {
      // Dates
      var now = new Date(); // only important line

      // ### How to use Dates ###
      //
      // console.log(activitySlug,"verified on ",now.toUTCString()); // to access UTC date string
      // console.log(activitySlug,"verified on ",now.toLocaleString()); // to access local date string
      //
      // var nowMillis = Date.parse(now.toUTCString()); // to compress Date to milliseconds since 1 Jan 1970 UTC
      // console.log("now in UTC milliseconds",nowMillis,typeof nowMillis);
      //
      // var fromMillis = new Date(nowMillis); // to expand a date from milliseconds representation
      // console.log("new date from millis",fromMillis.toUTCString());
      // console.log("new date from millis",fromMillis.toLocaleString());

      // set verifiedOn
      console.log("verified by ", this.currentUserUid);
      db.ref("content")
        .child(this.currentCountry)
        .child("activities")
        .child(activitySlug)
        .child("lastVerifiedOn")
        .set(Date.parse(now.toUTCString()));
      // set verifiedBy
      db.ref("content")
        .child(this.currentCountry)
        .child("activities")
        .child(activitySlug)
        .child("lastVerifiedBy")
        .set(this.currentUserUid);
    },
    timestampTooltip(milliseconds, uid) {
      if (!(milliseconds && uid)) return "Verify with timestamp";
      const date = this.readableTimestamp(milliseconds);
      const email = this.readableUser(uid);
      return `Last verified by ${email} on ${date}`;
    },
    readableTimestamp(milliseconds) {
      return new Date(milliseconds).toLocaleString();
    },
    readableUser(uid) {
      const email = this.users[uid].email;
      return email;
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

.tableHeader {
  color: #fafafa;
  background-color: #212121;
}
</style>
