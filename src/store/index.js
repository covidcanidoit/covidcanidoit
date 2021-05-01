import Vue from "vue";

import Vuex from "vuex";
Vue.use(Vuex);

import { vuexfireMutations, firebaseAction } from "vuexfire";
import { db } from "@/db.js";

import router from "@/router";

// This helper makes for much shorter action-bindings
function bindFirebase(key) {
  return firebaseAction(({ bindFirebaseRef }) => {
    // console.log("Binding:", key);
    return bindFirebaseRef(key, db.ref(key));
  });
}

export default new Vuex.Store({
  state: {
    submitted: false,
    datasets: {},
    users: {},
    userSettings: {},
    currentDataset: "us",
    currentUserUid: undefined,

    // Phase2
    currentRegion: "all",

    suggestions: {},
    navigation: {
      show: true
    },
    regionlock: {
      lock: false
    }
  },
  mutations: {
    ...vuexfireMutations,

    setCurrentUserUid(state, currentUserUid) {
      state.currentUserUid = currentUserUid;
    },
    setCurrentDataset(state, currentDataset) {
      state.currentDataset = currentDataset;
    },
    setCurrentRegion(state, currentRegion) {
      state.currentRegion = currentRegion;
    },
    setNav(state, value) {
      state.navigation.show = value;
    },
    setRegionSelectLock(state, value) {
      state.regionlock.lock = value;
    }
  },
  getters: {
    currentDataset(state) {
      return state.currentDataset;
    },
    currentDatasets(state, getters) {
      return state.datasets[getters.currentDataset] || {};
    },
    currentRegion(state) {
      return state.currentRegion;
    },

    activities(_state, getters) {
      return getters.currentDatasets.activities || {};
    },
    categories(_state, getters) {
      return getters.currentDatasets.categories || {};
    },
    components(_state, getters) {
      return getters.currentDatasets.components || {};
    },
    riskLevels(_state, getters) {
      return getters.currentDatasets.riskLevels || {};
    },
    riskFactors(_state, getters) {
      return getters.currentDatasets.riskFactors || {};
    },
    regions(_state, getters) {
      return (
        getters.currentDatasets.regions || {
          all: {
            slug: "all",
            shortName: "all",
            longName: "all",
            trending: "bad"
          }
        }
      );
    },

    datasetSlugs(state) {
      return Object.keys(state.datasets || {});
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
      if (!getters.currentDataset) {
        return {};
      }
      if (state.suggestions && state.suggestions[getters.currentDataset]) {
        return state.suggestions[getters.currentDataset].activitySuggestions;
      } else {
        return {};
      }
    },
    banner(_state, getters) {
      return getters.currentDatasets.banner || {};
    },
    navigation(state) {
      return state.navigation;
    },
    regionlock(state) {
      return state.regionlock;
    }
  },
  actions: {
    // Bind via websocket for firebase content & updates
    bindDatasets: bindFirebase("datasets"),
    bindUsers: bindFirebase("users"),
    bindUserSettings: bindFirebase("userSettings"),
    bindSuggestions: bindFirebase("suggestions"),

    // Firebase modifications
    // ----------------------
    updateRegion: firebaseAction(({ state }, region) => {
      return db
        .ref("datasets")
        .child(state.currentDataset)
        .child("regions")
        .child(region.slug)
        .set(region);
    }),
    updateAllRegions: firebaseAction(({ state }, regions) => {
      return db
        .ref("datasets")
        .child(state.currentDataset)
        .child("regions")
        .set(regions);
    }),
    deleteRegion: firebaseAction(({ state }, region) => {
      return db
        .ref("datasets")
        .child(state.currentDataset)
        .child("regions")
        .child(region.slug)
        .remove();
    }),

    // Other app actions
    // -----------------
    async setDataset({ commit, getters }, newDataset) {
      if (getters.datasetSlugs.includes(newDataset)) {
        commit("setCurrentDataset", newDataset);
      } else {
        commit("setCurrentDataset", "us");
      }
    },
    async changeDataset({ commit, getters }, newDataset) {
      let oldDataset = getters.currentDataset;
      if (getters.datasetSlugs.includes(newDataset)) {
        commit("setCurrentDataset", newDataset);
      } else {
        commit("setCurrentDataset", "us");
      }

      // When the dataset changes, force the change into the URL
      if (oldDataset != newDataset) {
        let newRoute = Object.assign({}, router.currentRoute);
        newRoute.params.dataset = getters.currentDataset;
        newRoute.params.region = "all"; // back to default
        commit("setCurrentRegion", "all");
        await router.push(newRoute);
      }
    },
    async setRegion({ commit, getters }, newRegion) {
      commit("setCurrentRegion", newRegion);
      if (getters.regionSlugs.includes(newRegion)) {
        commit("setCurrentRegion", newRegion);
      } else {
        commit("setCurrentRegion", "all");
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
        let newRoute = Object.assign({}, router.currentRoute);
        newRoute.params.region = getters.currentRegion;
        await router.push(newRoute);
      }
    }
  }
});
