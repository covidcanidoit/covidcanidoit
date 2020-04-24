<template>
  <div class="admin-view">
    <h1>Admin!</h1>
    <h2>Activities</h2>
    <table cellspacing="0" cellpadding="2px" border="1">
      <thead>
        <tr>
          <th>Action</th>
          <th>slug</th>
          <th>Name</th>
          <th>category</th>
          <th>general</th>
          <th>50-69</th>
          <th>70+</th>
          <th>showLocation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="activity in activities" :key="activity.activityName">
          <td>
            <router-link
              :to="{ name: 'AdminActivityEdit', params: { activityName: activity.activityName, slug: activity.slug } }"
            >
              Edit
            </router-link>
          </td>
          <td>{{ activity.slug }}</td>
          <td>
            <router-link
              :to="{ name: 'Home', params: { search: activity.activityName } }"
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

    <hr/>

    <h2>Risk Levels</h2>
    <table cellspacing="0" cellpadding="2px" border="1">
      <thead>
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
              :to="{ name: 'AdminRiskLevelEdit', params: { riskScore: riskLevel.riskScore } }"
            >
              Edit
            </router-link>
          </td>
          <td>{{ riskLevel.riskScore }}</td>
          <td>{{ riskLevel.riskName }}</td>
        </tr>
      </tbody>
    </table>

    <pre>
    Firebase content: {{ Object.keys(content) }}
    </pre>
    <br />
    <button v-if="!user" @click="login">Sign in with Google</button>
    <button v-if="user" @click="logout">Sign out</button>
    <br />
    User: {{ user?.email }} isAdmin: {{ isAdmin }}
    <br />
  </div>
</template>

<script>
import { db, firebase } from "@/db.js";
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      // content: {},
      userSettings: {},
      user: undefined
    };
  },
  created() {
    // this.$store.dispatch("bindContent");
    firebase.auth().onAuthStateChanged(user => {
      this.user = user;
      if (user) {
        db.ref().update({
          [`users/${user.uid}/lastLogin`]: Date.now(),
          [`users/${user.uid}/email`]: user.email
        });
      }
    });
  },
  computed: {
    ...mapState(["content"]),
    ...mapGetters(["activities", "riskLevels"]),
    isAdmin() {
      if (this.user && this.userSettings) {
        console.log({ userSettings: this.userSettings[this.user.uid], uid: this.user.uid});
      }
      return !!(
        this.user &&
        this.userSettings[this.user.uid] &&
        this.userSettings[this.user.uid].isAdmin
      );
    }
  },
  methods: {
    // uploadContent() {
    //   db.ref("content")
    //     .set(this.storeContent)
    //     .then(() => {
    //       console.log("content updated!");
    //     });
    // },
    // bindContent() {
    //   this.$store.dispatch("bindContent");
    // },
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          console.log("Signed out!");
        })
        .catch(function(error) {
          console.log("Error signing out!", { error });
        });
    }
  },
  firebase: {
    // content: db.ref("content"),
    userSettings: db.ref("userSettings")
  }
};
</script>
