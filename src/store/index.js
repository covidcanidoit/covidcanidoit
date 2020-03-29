import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profileCreated: false,
    submitted: false,
    userProfile: {
      age: 0,
      gender: "male",
      smoking: "no",
      comorbidity: "no",
      pregnant: "no",
      feelSick: "no",
      familySick: "no",
      COVIDpositive: "no"
    }
  },
  mutations: {
    createProfile: (state, boolean) => {
      state.profileCreated = boolean;
    },
    submitProfile: (state, profile) => {
      console.log("success");
      console.log(profile);
      state.userProfile = profile;
    },
    createAge: (state, age) => {
      state.userProfile.age = age;
    },
    setSubmitted: (state, boolean) => {
      console.log("submitted to store:", boolean);
      state.submitted = boolean;
    }
  },
  getters: {
    createProfile: state => {
      return state.profileCreated;
    },
    submitProfile: state => {
      return state.userProfile;
    },
    createAge: state => {
      return state.userProfile.age;
    },
    setSubmitted: state => {
      return state.submitted;
    }
  },
  actions: {},
  modules: {}
});
