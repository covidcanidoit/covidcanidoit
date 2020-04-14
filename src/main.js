import Vue from "vue";
import VueGtag from "vue-gtag";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
  render: h => h(App)
}).$mount("#app");
