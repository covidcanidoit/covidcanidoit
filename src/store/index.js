import Vue from "vue";

import Vuex from "vuex";
Vue.use(Vuex);

import { vuexfireMutations, firebaseAction } from "vuexfire";
import { db } from "@/db.js";

// Persist vuex into localStorage between page loads
import VuexPersistence from "vuex-persist";

import router from "@/router";

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
    currentRegion: "all",

    suggestions: {}
  },
  mutations: {
    ...vuexfireMutations,

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
    currentCountry(state) {
      return state.currentCountry;
    },
    currentContent(state, getters) {
      return state.content[getters.currentCountry] || {};
    },
    currentRegion(state) {
      return state.currentRegion;
    },

    activities(_state, getters) {
      return getters.currentContent.activities || {};
    },
    categories(_state, getters) {
      return getters.currentContent.categories || {};
    },
    components(_state, getters) {
      return getters.currentContent.components || {};
    },
    riskLevels(_state, getters) {
      return getters.currentContent.riskLevels || {};
    },
    riskFactors(_state, getters) {
      return getters.currentContent.riskFactors || {};
    },
    regions(_state, getters) {
      return (
        getters.currentContent.regions || {
          all: {
            slug: "all",
            shortName: "all",
            longName: "all",
            trending: "bad"
          }
        }
      );
    },

    countrySlugs(state) {
      return Object.keys(state.content || {});
    },
    regionSlugs(_state, getters) {
      return Object.keys(getters.regions) || [];
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
    }
  },
  actions: {
    // Bind via websocket for firebase content & updates
    bindContent: bindFirebase("content"),
    bindUsers: bindFirebase("users"),
    bindUserSettings: bindFirebase("userSettings"),
    bindSuggestions: bindFirebase("suggestions"),

    // Firebase modifications
    // ----------------------
    setRegion: firebaseAction(({ state }, region) => {
      console.log("Setting region", { region });
      console.log(`At: content/${state.currentCountry}/${region.slug}`);
      return db
        .ref("content")
        .child(state.currentCountry)
        .child("regions")
        .child(region.slug)
        .set(region);
    }),
    deleteRegion: firebaseAction(({ state }, region) => {
      return db
        .ref("content")
        .child(state.currentCountry)
        .child("regions")
        .child(region.slug)
        .remove();
    }),

    // Other app actions
    // -----------------
    changeCountry({ commit, getters }, newCountry) {
      let oldCountry = getters.currentCountry;
      if (getters.countrySlugs.includes(newCountry)) {
        commit("setCurrentCountry", newCountry);
      } else {
        commit("setCurrentCountry", "US");
      }

      // When the country changes, force the change into the URL
      if (oldCountry != newCountry) {
        let newRoute = Object.assign({}, router.currentRoute);
        newRoute.params.country = getters.currentCountry;
        newRoute.params.region = "all"; // back to default
        router.push(newRoute);
      }
    },
    async changeRegion({ commit, getters }, newRegion) {
      let oldRegion = getters.currentRegion;
      commit("setCurrentRegion", newRegion);
      if (getters.regionSlugs.includes(newRegion)) {
        commit("setCurrentRegion", newRegion);
      } else {
        commit("setCurrentRegion", "all");
      }

      // When the region changes, force the change into the URL
      if (oldRegion != newRegion) {
        console.log("Updating navigatin from", oldRegion, newRegion);
        let newRoute = Object.assign({}, router.currentRoute);
        newRoute.params.region = getters.currentRegion;
        await router.push(newRoute);
      }
    }
  }
});
