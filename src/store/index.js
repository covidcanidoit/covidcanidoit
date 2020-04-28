import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import { vuexfireMutations, firebaseAction } from "vuexfire";
import { db } from "@/db.js";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [new VuexPersistence().plugin],
  state: {
    submitted: false,
    content: {},
    users: {},
    userSettings: {},
    userProfile: {
      age: undefined,
      gender: undefined,
      smoking: undefined,
      comorbidity: undefined,
      pregnant: undefined,
      feelSick: undefined,
      familySick: undefined,
      COVIDpositive: undefined
    }
  },
  mutations: {
    ...vuexfireMutations,
    setProfile(state, profile) {
      state.userProfile = profile;
    }
  },
  getters: {
    getProfile(state) {
      return state.userProfile;
    },
    ageDescription(state) {
      if (state.userProfile.age == "riskUnder10") {
        return "Under 10";
      }
      if (state.userProfile.age == "risk10To18") {
        return "10 to 18";
      }
      if (state.userProfile.age == "risk18To19") {
        return "18 to 19";
      }
      if (state.userProfile.age == "risk20To29") {
        return "20 to 29";
      }
      if (state.userProfile.age == "risk30To49") {
        return "30 to 49";
      }
      if (state.userProfile.age == "risk50To69") {
        return "50 to 69";
      }
      if (state.userProfile.age == "riskOver70") {
        return "70+";
      }
      return "unknown";
    },
    hasEnteredProfileData(state) {
      const profile = state.userProfile;
      return (
        profile.age ||
        profile.gender ||
        profile.smoking ||
        profile.comorbidity ||
        profile.pregnant ||
        profile.feelSick ||
        profile.familySick ||
        profile.COVIDpositive
      );
    },
    activities(state) {
      return state.content.activities;
    },
    categories(state) {
      return state.content.categories;
    },
    riskLevels(state) {
      return state.content.riskLevels;
    },
    riskFactors(state) {
      return state.content.riskFactors;
    }
  },
  actions: {
    bindContent: firebaseAction(({ bindFirebaseRef }) => {
      console.log("Binding content");
      return bindFirebaseRef("content", db.ref("content"));
    }),
    bindUsers: firebaseAction(({ bindFirebaseRef }) => {
      console.log("Binding users");
      return bindFirebaseRef("users", db.ref("users"));
    }),
    bindUserSettings: firebaseAction(({ bindFirebaseRef }) => {
      console.log("Binding userSettings");
      return bindFirebaseRef("userSettings", db.ref("userSettings"));
    })
  },
  modules: {}
});
