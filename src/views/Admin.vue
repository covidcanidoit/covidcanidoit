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
      <div>
        <h2 class="btn" @click="toggleActivities">
          {{ showActivities ? "&#x25bc;" : "&#x25b6;" }} Activities
        </h2>
        <table
          class="table table-striped"
          v-show="showActivities"
          cellspacing="0"
          cellpadding="2px"
          border="1"
        >
          <thead class="thead-dark">
            <tr>
              <th>Action</th>
              <th>slug</th>
              <th>Name</th>
              <th>category</th>
              <th>general</th>
              <th>50-69</th>
              <th>70+</th>
              <th>location?</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="activity in activities" :key="activity.activityName">
              <td>
                <router-link
                  :to="{
                    name: 'AdminActivityEdit',
                    params: {
                      activityName: activity.activityName,
                      slug: activity.slug
                    }
                  }"
                >
                  Edit
                </router-link>
              </td>
              <td>{{ activity.slug }}</td>
              <td>
                <router-link
                  :to="{
                    name: 'Home',
                    params: { search: activity.activityName }
                  }"
                >
                  {{ activity.activityName }}
                </router-link>
              </td>
              <td>{{ activity.category }}</td>
              <td>{{ activity.generalRiskScore }}</td>
              <td>{{ activity.risk50To69 }}</td>
              <td>{{ activity.riskOver70 }}</td>
              <td>{{ activity.showLocation }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h2 class="btn" @click="toggleRiskLevels">
          {{ showRiskLevels ? "&#x25bc;" : "&#x25b6;" }} Risk Levels
        </h2>
        <table
          class="table table-striped"
          v-show="showRiskLevels"
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
                >
                  Edit
                </router-link>
              </td>
              <td>{{ riskLevel.riskScore }}</td>
              <td>{{ riskLevel.riskName }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h2 class="btn" @click="toggleRiskFactors">
          {{ showRiskFactors ? "&#x25bc;" : "&#x25b6;" }} Risk Factors
        </h2>
        <table
          class="table table-striped"
          v-show="showRiskFactors"
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
                >
                  Edit
                </router-link>
              </td>
              <td>{{ riskFactor.description }}</td>
              <td><i class="icon" :class="riskFactor.icon"></i></td>
              <td>{{ riskFactor.longDescription }}</td>
              <td>{{ riskFactor.name }}</td>
              <td>{{ riskFactor.shortDescription }}</td>
              <td>{{ riskFactor.showWhen }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h2 class="btn" @click="toggleCategories">
          {{ showCategories ? "&#x25bc;" : "&#x25b6;" }} Categories
        </h2>
        <table
          class="table table-striped"
          v-show="showCategories"
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
                >
                  Edit
                </router-link>
              </td>
              <td>{{ category.name }}</td>
              <td><i class="icon" :class="category.icon"></i></td>
              <td>{{ category.shortDescription }}</td>
              <td>{{ category.longDescription }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h2 class="btn" @click="toggleUsers">
          {{ showUsers ? "&#x25bc;" : "&#x25b6;" }} Users
        </h2>
        <table
          class="table table-striped"
          v-show="showUsers"
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
                >
                  Edit
                </router-link>
                <button @click="deleteUser(userId)">Delete</button>
              </td>
              <td>{{ users[userId].email }}</td>
              <td>
                {{ userSettings[userId] && userSettings[userId].isAdmin }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h2 class="btn" @click="toggleSuggestions">
          {{ showSuggestions ? "&#x25bc;" : "&#x25b6;" }} Suggestions
        </h2>
        <table
          class="table table-striped"
          v-show="showSuggestions"
          cellspacing="0"
          cellpadding="2px"
          border="1"
        >
          <thead class="thead-dark">
            <tr>
              <th>Area</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(topic,topicName) in activitySuggestions" :key="topic.key">
              <td>
                {{ topicName }}
              </td>
              <td>
                {{ topic.count }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { db, firebase } from "@/db.js";
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      showActivities: false,
      showCategories: false,
      showRiskFactors: false,
      showRiskLevels: false,
      showUsers: false,
      showSuggestions: false,
      currentUser: undefined,
      currentUserSettings: undefined
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
            }
          });
      }
    });
  },
  computed: {
    ...mapState(["content", "users", "userSettings", "currentUserUid"]),
    ...mapGetters(["activities", "riskLevels", "riskFactors", "categories","activitySuggestions"]),
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
    deleteUser(userId) {
      db.ref("userSettings")
        .child(userId)
        .remove();
      db.ref("users")
        .child(userId)
        .remove();
    }
  }
};
</script>

<style scoped lang="scss">
table {
  margin: 0 1em;
}
</style>
