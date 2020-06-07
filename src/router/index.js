import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import AppBody from "@/components/AppBody.vue";
import Home from "@/views/Home.vue";
import Browse from "@/views/Browse.vue";
import BrowseCategory from "@/views/BrowseCategory.vue";
import About from "@/views/About.vue";
import Blog from "@/views/Blog.vue";
import CreateUserProfile from "@/views/CreateUserProfile.vue";
import Admin from "@/views/Admin.vue";
import AdminActivityEdit from "@/views/AdminActivityEdit.vue";
import AdminRiskLevelEdit from "@/views/AdminRiskLevelEdit.vue";
import AdminRiskFactorEdit from "@/views/AdminRiskFactorEdit.vue";
import AdminCategoryEdit from "@/views/AdminCategoryEdit.vue";
import AdminUserEdit from "@/views/AdminUserEdit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "root",
    beforeEnter(to, from, next) {
      console.log(`Router / -> next(${store.state.currentCountry})`);
      next(store.state.currentCountry);
    }
  },
  {
    path: "/:country",
    component: AppBody,
    beforeEnter(to, from, next) {
      const country = to.params.country;
      console.log("Router /:country", { country });
      if (store.getters.countries.includes(country) || country == "US") {
        console.log("We do have that country");
        if (store.state.currentCountry !== country) {
          console.log(
            "We are not already on that as the currentCountry, dispatching"
          );
          store.dispatch("changeCountry", country);
        }
        return next();
      } else {
        console.log("Not a real country, going with currentCountry instead");
        return next({ path: store.state.currentCountry });
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
        component: Home,
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
        path: "blog",
        name: "Blog",
        component: Blog
      },
      {
        path: "profile",
        name: "CreateUserProfile",
        component: CreateUserProfile,
        props: true
      },
      {
        path: "admin",
        name: "Admin",
        component: Admin,
        props: true
      },
      {
        path: "admin/activity/:slug",
        name: "AdminActivityEdit",
        component: AdminActivityEdit,
        props: true
      },
      {
        path: "admin/risk-level/:riskScore",
        name: "AdminRiskLevelEdit",
        component: AdminRiskLevelEdit,
        props: true
      },
      {
        path: "admin/risk-factor/:name",
        name: "AdminRiskFactorEdit",
        component: AdminRiskFactorEdit,
        props: true
      },
      {
        path: "admin/category/:categoryName",
        name: "AdminCategoryEdit",
        component: AdminCategoryEdit,
        props: true
      },
      {
        path: "admin/user/:userId",
        name: "AdminUserEdit",
        component: AdminUserEdit,
        props: true
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
