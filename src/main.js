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

import { rtdbPlugin } from "vuefire";
Vue.use(rtdbPlugin);

import Bugsnag from '@bugsnag/js';
import BugsnagPluginVue from '@bugsnag/plugin-vue';

Bugsnag.start({
  apiKey: '229b7b7efcfa23d9e579dc97606658d8',
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

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
