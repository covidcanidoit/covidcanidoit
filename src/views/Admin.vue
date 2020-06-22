<template>
  <div class="admin-view">
    <h1>Admin!</h1>

    <button class="btn btn-primary" v-if="!currentUser" @click="login">
      Sign in with Google
    </button>
    <button class="btn btn-secondary" v-if="currentUser" @click="logout">
      Sign out
    </button>
    Current User: {{ currentUser && currentUser.email }} isAdmin: {{ isAdmin }}
    <br />

    <div v-if="isAdmin && users && userSettings">
      <v-tabs v-model="tab">

        <v-tab>Regions</v-tab>
        <v-tab-item>
          <table
            class="table table-striped"
            cellspacing="0"
            cellpadding="2px"
            border="1"
          >
            <thead class="thead-dark">
              <tr>
                <th>Action</th>
                <th>slug</th>
                <th>Short Name</th>
                <th>Long Name</th>
                <th>Country</th>
                <th>Trending</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="region in regions" :key="region.slug">
                <td>
                  <router-link
                    :to="{
                      name: 'AdminRegionEdit',
                      params: { slug: region.slug }
                    }"
                    >Edit</router-link
                  >
                </td>
                <td>{{ region.slug }}</td>
                <td>{{ region.shortName }}</td>
                <td>{{ region.longName }}</td>
                <td>{{ region.country }}</td>
                <td>{{ region.trending }}</td>
              </tr>
            </tbody>
          </table>
        </v-tab-item>

        <v-tab>Activities</v-tab>
        <v-tab-item>
          <AdminActivityTable
            :incomingNewActivityName="newActivityName"
            :currentUserSettings="currentUserSettings"
          />
        </v-tab-item>

        <v-tab>Risk Scores</v-tab>
        <v-tab-item>
          <table
            class="table table-striped"
            cellspacing="0"
            cellpadding="2px"
            border="1"
          >
            <thead class="thead-dark">
              <tr>
                <th>Action</th>
                <th>Level</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="riskLevel in riskLevels" :key="riskLevel.riskScore">
                <td>
                  <router-link
                    :to="{
                      name: 'AdminRiskLevelEdit',
                      params: { riskScore: riskLevel.riskScore }
                    }"
                    >Edit</router-link
                  >
                </td>
                <td>{{ riskLevel.riskScore }}</td>
                <td>{{ riskLevel.riskName }}</td>
              </tr>
            </tbody>
          </table>
        </v-tab-item>

        <v-tab>Other Factors</v-tab>
        <v-tab-item>
          <table
            class="table table-striped"
            cellspacing="0"
            cellpadding="2px"
            border="1"
          >
            <thead class="thead-dark">
              <tr>
                <th>Action</th>
                <th>description</th>
                <th>icon</th>
                <th>longDescription</th>
                <th>name</th>
                <th>shortDescription</th>
                <th>showWhen</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="riskFactor in riskFactors" :key="riskFactor.name">
                <td>
                  <router-link
                    :to="{
                      name: 'AdminRiskFactorEdit',
                      params: { name: riskFactor.name }
                    }"
                    >Edit</router-link
                  >
                </td>
                <td>{{ riskFactor.description }}</td>
                <td>
                  <i class="icon" :class="riskFactor.icon"></i>
                </td>
                <td><Markdown :source="riskFactor.longDescription" /></td>
                <td>{{ riskFactor.name }}</td>
                <td>{{ riskFactor.shortDescription }}</td>
                <td>{{ riskFactor.showWhen }}</td>
              </tr>
            </tbody>
          </table>
        </v-tab-item>

        <v-tab>Categories</v-tab>
        <v-tab-item>
          <table
            class="table table-striped"
            cellspacing="0"
            cellpadding="2px"
            border="1"
          >
            <thead class="thead-dark">
              <tr>
                <th>Action</th>
                <th>name</th>
                <th>icon</th>
                <th>shortDescription</th>
                <th>longDescription</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="category in categories" :key="category.name">
                <td>
                  <router-link
                    :to="{
                      name: 'AdminCategoryEdit',
                      params: { categoryName: category.name }
                    }"
                    >Edit</router-link
                  >
                </td>
                <td>{{ category.name }}</td>
                <td>
                  <i class="icon" :class="category.icon"></i>
                </td>
                <td>{{ category.shortDescription }}</td>
                <td>{{ category.longDescription }}</td>
              </tr>
            </tbody>
          </table>
        </v-tab-item>

        <v-tab>Users</v-tab>
        <v-tab-item>
          <table
            class="table table-striped"
            cellspacing="0"
            cellpadding="2px"
            border="1"
          >
            <thead class="thead-dark">
              <tr>
                <th>Action</th>
                <th>email</th>
                <th>isAdmin?</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="userId in userIds" :key="userId">
                <td>
                  <router-link
                    :to="{
                      name: 'AdminUserEdit',
                      params: { userId: userId }
                    }"
                    >Edit</router-link
                  >
                  <button @click="deleteUser(userId)">Delete</button>
                </td>
                <td>{{ users[userId].email }}</td>
                <td>
                  {{ userSettings[userId] && userSettings[userId].isAdmin }}
                </td>
              </tr>
            </tbody>
          </table>
        </v-tab-item>

        <v-tab>Suggestions</v-tab>
        <v-tab-item>
          <table
            class="table table-striped"
            cellspacing="0"
            cellpadding="2px"
            border="1"
          >
            <thead class="thead-dark">
              <tr>
                <th>Area</th>
                <th>Count</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(topic, topicName) in activitySuggestions"
                :key="topic.key"
              >
                <td>
                  {{ topicName }}
                </td>
                <td>
                  {{ topic.count }}
                </td>
                <td>
                  <v-btn text icon @click="newActivity(topicName)"
                    ><v-icon>mdi-arrow-up-bold-box</v-icon></v-btn
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </v-tab-item>
      </v-tabs>
    </div>
  </div>
</template>

<script>
import { db, firebase } from "@/db.js";
import { mapState, mapGetters } from "vuex";
import AdminActivityTable from "@/components/AdminActivityTable.vue";
import Markdown from "vue-markdown";

export default {
  components: {
    AdminActivityTable,
    Markdown
  },
  data() {
    return {
      newActivityName: "",
      currentUser: undefined,
      currentUserSettings: undefined,
      tab: undefined
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      console.log("Firebase auth callback!");
      this.$store.commit("setCurrentUserUid", user?.uid);
      if (user) {
        console.log("Got user, now writing directly into users/", {
          [`users/${user.uid}/lastLogin`]: Date.now(),
          [`users/${user.uid}/email`]: user.email
        });
        db.ref(`users/${user.uid}`).update({
          ["lastLogin"]: Date.now(),
          ["email"]: user.email
        });

        // Look up current user settings, and if they are an admin load other stuff
        // retrieve a document
        console.log("Going to look up user");
        db.ref(`users/${user.uid}`)
          .once("value")
          .then(snapshot => {
            console.log("Looked up current user", snapshot.val());
            this.currentUser = snapshot.val();
          });

        // Look up current user settings, and if they are an admin load other stuff
        // retrieve a document
        console.log("Going to look up userSettings");
        db.ref(`userSettings/${user.uid}`)
          .once("value")
          .then(snapshot => {
            console.log("Looked up current user settings", snapshot.val());
            this.currentUserSettings = snapshot.val() || {};
            if (this.currentUserSettings.isAdmin) {
              console.log("User is an admin!");
              this.$store.dispatch("bindUsers");
              this.$store.dispatch("bindUserSettings");
              this.$store.dispatch("bindRegions");
            }
          });
      }
    });
  },
  computed: {
    ...mapState(["content", "users", "userSettings", "currentUserUid"]),
    ...mapGetters([
      "activities",
      "riskLevels",
      "riskFactors",
      "categories",
      "currentCountry",
      "activitySuggestions",
      "regions"
    ]),
    isAdmin() {
      return !!this.currentUserSettings?.isAdmin;
    },
    userIds() {
      return Object.keys(this.users);
    }
  },
  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("Signed out!");
          this.currentUser = undefined;
          this.currentUserSettings = undefined;
        })
        .catch(function(error) {
          console.log("Error signing out!", { error });
        });
    },
    toggleActivities() {
      this.showActivities = !this.showActivities;
    },
    toggleRiskLevels() {
      this.showRiskLevels = !this.showRiskLevels;
    },
    toggleRiskFactors() {
      this.showRiskFactors = !this.showRiskFactors;
    },
    toggleCategories() {
      this.showCategories = !this.showCategories;
    },
    toggleUsers() {
      this.showUsers = !this.showUsers;
    },
    toggleSuggestions() {
      this.showSuggestions = !this.showSuggestions;
    },
    newActivity(activityName) {
      this.newActivityName = activityName;
    },
    deleteUser(userId) {
      db.ref("userSettings")
        .child(userId)
        .remove();
      db.ref("users")
        .child(userId)
        .remove();
    },
    slugify(nodeName) {
      return nodeName
        .split(" ")
        .join("-")
        .toLowerCase();
    }
  }
};
</script>

<style scoped lang="scss">
table {
  margin: 0;
}

.buttonNew {
  float: right;
  margin-top: 0.1em;
}

.utilityShelf {
  width: 100%;
  content: "";
  clear: both;
  display: table;
}

.promptInput {
  margin-left: 1em;
  margin-right: 1em;
}
</style>
