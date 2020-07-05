import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import AppBody from "@/components/AppBody.vue";
import Home from "@/views/Home.vue";
import Browse from "@/views/Browse.vue";
import BrowseCategory from "@/views/BrowseCategory.vue";
import About from "@/views/About.vue";
import CreateUserProfile from "@/views/CreateUserProfile.vue";
import Admin from "@/views/Admin.vue";
import AdminRegionEdit from "@/views/AdminRegionEdit.vue";
import AdminActivityEdit from "@/views/AdminActivityEdit.vue";
import AdminRiskLevelEdit from "@/views/AdminRiskLevelEdit.vue";
import AdminRiskFactorEdit from "@/views/AdminRiskFactorEdit.vue";
import AdminCategoryEdit from "@/views/AdminCategoryEdit.vue";
import AdminUserEdit from "@/views/AdminUserEdit.vue";
import SearchResults from "@/views/SearchResults.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "root",

    beforeEnter(to, from, next) {
      console.log(`Router / -> next(${store.getters.currentCountry})`);
      return next(
        store.getters.currentCountry + "/" + store.getters.currentRegion
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
    path: "/:country",
    async beforeEnter(to, from, next) {
      const country = to.params.country;
      console.log("Router /:country", { country });
      await store.dispatch("changeCountry", country);
      if (country !== store.getters.currentCountry) {
        return next(
          store.getters.currentCountry + "/" + store.getters.currentRegion
        );
      } else {
        return next();
      }
    }
  },
  {
    path: "/:country/:region",
    component: AppBody,
    async beforeEnter(to, from, next) {
      const country = to.params.country;
      const region = to.params.region;
      console.log("Router /:country/:region", { country, region });
      await store.dispatch("changeCountry", country);
      await store.dispatch("changeRegion", region);
      if (
        country !== store.getters.currentCountry ||
        region !== store.getters.currentRegion
      ) {
        return next(
          store.getters.currentCountry + "/" + store.getters.currentRegion
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
        path: "browse/category/:name",
        name: "BrowseCategory",
        component: BrowseCategory,
        props: true
      },
      {
        path: "about",
        name: "About",
        component: About
      },
      {
        path: "profile",
        name: "CreateUserProfile",
        component: CreateUserProfile,
        props: true
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
