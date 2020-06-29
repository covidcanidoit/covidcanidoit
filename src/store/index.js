import Vue from "vue";

import Vuex from "vuex";
Vue.use(Vuex);

import { vuexfireMutations, firebaseAction } from "vuexfire";
import { db } from "@/db.js";

// Persist vuex into localStorage between page loads
import VuexPersistence from "vuex-persist";

// This helper makes for much shorter action-bindings
function bindFirebase(key) {
  return firebaseAction(({ bindFirebaseRef }) => {
    console.log("Binding:", key);
    return bindFirebaseRef(key, db.ref(key));
  });
}

export default new Vuex.Store({
  plugins: [new VuexPersistence().plugin],
  state: {
    submitted: false,
    content: {},
    users: {},
    userSettings: {},
    currentCountry: "US",
    currentUserUid: undefined,

    // Phase2
    currentRegion: undefined,
    regions: {},

    // Deprecated for phase2
    userProfile: {
      age: undefined,
      gender: undefined,
      smoking: undefined,
      comorbidity: undefined,
      pregnant: undefined,
      feelSick: undefined,
      familySick: undefined,
      COVIDpositive: undefined,
      promptedForProfile: false
    },
    suggestions: {}
  },
  mutations: {
    ...vuexfireMutations,
    // Deprecated for phase2
    setProfile(state, profile) {
      state.userProfile = profile;
    },
    setCurrentUserUid(state, currentUserUid) {
      state.currentUserUid = currentUserUid;
    },
    setCurrentCountry(state, currentCountry) {
      state.currentCountry = currentCountry;
    },
    setCurrentRegion(state, currentRegion) {
      state.currentRegion = currentRegion;
    }
  },
  getters: {
    // Deprecated for phase2
    getProfile(state) {
      return state.userProfile;
    },
    // Deprecated for phase2
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
    // Deprecated for phase2
    havePromptedForProfile(state) {
      return state.userProfile.promptedForProfile;
    },
    activities(state, getters) {
      if (!getters.currentCountry) {
        return [];
      }
      if (!state.content || !state.content[getters.currentCountry]) {
        return [];
      }
      return state.content[getters.currentCountry].activities;
    },
    categories(state, getters) {
      if (!getters.currentCountry) {
        return [];
      }
      if (!state.content || !state.content[getters.currentCountry]) {
        return [];
      }
      return state.content[getters.currentCountry].categories;
    },
    riskLevels(state, getters) {
      if (!getters.currentCountry) {
        return [];
      }
      if (!state.content || !state.content[getters.currentCountry]) {
        return [];
      }
      return state.content[getters.currentCountry].riskLevels;
    },
    riskFactors(state, getters) {
      if (!getters.currentCountry) {
        return [];
      }
      if (!state.content || !state.content[getters.currentCountry]) {
        return [];
      }
      return state.content[getters.currentCountry].riskFactors;
    },
    countries(state) {
      return Object.keys(state.content || {});
    },
    regions(state) {
      return state.regions;
    },
    currentUserUid(state) {
      return state.currentUserUid;
    },
    users(state) {
      return state.users;
    },
    currentUserSettings(state) {
      if (
        state.currentUserUid &&
        state.userSettings &&
        state.userSettings[state.currentUserUid]
      ) {
        return state.userSettings[state.currentUserUid];
      } else {
        return {};
      }
    },
    activitySuggestions(state, getters) {
      if (!getters.currentCountry) {
        return {};
      }
      if (state.suggestions && state.suggestions[getters.currentCountry]) {
        return state.suggestions[getters.currentCountry].activitySuggestions;
      } else {
        return {};
      }
    },
    currentCountry(state) {
      if (state.currentRegion) {
        return state.regions[state.currentRegion].country;
      } else {
        return state.currentCountry;
      }
    }
  },
  actions: {
    bindRegions: bindFirebase("regions"),
    bindContent: bindFirebase("content"),
    bindUsers: bindFirebase("users"),
    bindUserSettings: bindFirebase("userSettings"),
    bindSuggestions: bindFirebase("suggestions"),
    changeCountry({ commit }, newCountry) {
      commit("setCurrentCountry", newCountry);
    }
  },
  modules: {}
});
