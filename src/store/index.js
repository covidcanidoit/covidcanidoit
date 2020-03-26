import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    profileCreated: false
  },
  mutations: {
    createProfile: (state, boolean) => {
      state.profileCreated = boolean;
    }
  },
  getters: {
    createProfile: (state) => {
      return state.profileCreated;
    }
  },
  actions: {
  },
  modules: {
  }
})
