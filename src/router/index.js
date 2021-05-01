import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import AppBody from "@/components/AppBody.vue";
import Home from "@/views/Home.vue";
import Browse from "@/views/Browse.vue";
import About from "@/views/About.vue";
import Admin from "@/views/Admin.vue";
import AdminRegionEdit from "@/views/AdminRegionEdit.vue";
import AdminActivityEdit from "@/views/AdminActivityEdit.vue";
import AdminRiskLevelEdit from "@/views/AdminRiskLevelEdit.vue";
import AdminRiskFactorEdit from "@/views/AdminRiskFactorEdit.vue";
import AdminCategoryEdit from "@/views/AdminCategoryEdit.vue";
import AdminUserEdit from "@/views/AdminUserEdit.vue";
import AdminBannerEdit from "@/views/AdminBannerEdit.vue";
import SearchResults from "@/views/SearchResults.vue";
import Infographic from "@/views/Infographic.vue";
import AdminMisc from "@/views/AdminMisc.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "root",

    beforeEnter(to, from, next) {
      return next(
        store.getters.currentDataset + "/" + store.getters.currentRegion
      );
    }
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    props: true
  },
  {
    path: "/admin/misc",
    name: "AdminMisc",
    component: AdminMisc,
    props: true
  },
  {
    path: "/admin/region/:slug",
    name: "AdminRegionEdit",
    component: AdminRegionEdit,
    props: true
  },
  {
    path: "/admin/activity/:slug",
    name: "AdminActivityEdit",
    component: AdminActivityEdit,
    props: true
  },
  {
    path: "/admin/risk-level/:riskScore",
    name: "AdminRiskLevelEdit",
    component: AdminRiskLevelEdit,
    props: true
  },
  {
    path: "/admin/risk-factor/:name",
    name: "AdminRiskFactorEdit",
    component: AdminRiskFactorEdit,
    props: true
  },
  {
    path: "/admin/category/:categoryName",
    name: "AdminCategoryEdit",
    component: AdminCategoryEdit,
    props: true
  },
  {
    path: "/admin/user/:userId",
    name: "AdminUserEdit",
    component: AdminUserEdit,
    props: true
  },
  {
    path: "/admin/banner",
    name: "AdminBannerEdit",
    component: AdminBannerEdit,
    props: true
  },
  {
    path: "/infographic",
    name: "Infographic",
    component: Infographic
  },
  {
    path: "/:dataset",
    async beforeEnter(to, from, next) {
      const dataset = to.params.dataset;
      await store.dispatch("setDataset", dataset);
      return next(
        store.getters.currentDataset + "/" + store.getters.currentRegion
      );
    }
  },
  {
    path: "/:dataset/:region",
    component: AppBody,
    async beforeEnter(to, from, next) {
      const dataset = to.params.dataset;
      const region = to.params.region;
      await store.dispatch("setDataset", dataset);
      await store.dispatch("setRegion", region);
      if (
        dataset !== store.getters.currentDataset ||
        region !== store.getters.currentRegion
      ) {
        return next(
          store.getters.currentDataset + "/" + store.getters.currentRegion
        );
      } else {
        return next();
      }
    },
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
        props: true
      },
      {
        path: "activity/:slug",
        name: "ActivitySearch",
        component: SearchResults,
        props: true
      },
      {
        path: "browse",
        name: "Browse",
        component: Browse
      },
      {
        path: "about",
        name: "About",
        component: About
      }
    ]
  },
  {
    path: "*",
    beforeEnter(to, from, next) {
      return next("/");
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

export default router;
