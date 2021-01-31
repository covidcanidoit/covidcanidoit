import Vue from "vue";
import VueGtag from "vue-gtag";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

import VueI18n from "vue-i18n";
Vue.use(VueI18n);
import en from "./locales/en.json";
import es from "./locales/es.json";
const i18n = new VueI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: { en, es }
});

import { rtdbPlugin } from "vuefire";
Vue.use(rtdbPlugin);

import Bugsnag from "@bugsnag/js";
import BugsnagPluginVue from "@bugsnag/plugin-vue";

Bugsnag.start({
  apiKey: "229b7b7efcfa23d9e579dc97606658d8",
  plugins: [new BugsnagPluginVue()]
});

Vue.config.productionTip = false;

Vue.use(
  VueGtag,
  {
    config: { id: "G-PLBYCR11KF" }
  },
  router
);

function loadFirebaseContent() {
  return Promise.all([
    store.dispatch("bindSuggestions"),
    store.dispatch("bindContent")
  ]);
}

loadFirebaseContent().then(() => {
  new Vue({
    router,
    store,
    vuetify,
    i18n,
    created() {
      console.log("VUE APP CREATED");
    },
    render: h => h(App)
  }).$mount("#app");
});
