import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Browse from "@/views/Browse.vue";
import BrowseCategory from "@/views/BrowseCategory.vue";
import About from "@/views/About.vue";
import contactUs from "@/views/contactUs.vue";
import CreateUserProfile from "@/views/CreateUserProfile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: true
  },
  {
    path: "/browse",
    name: "Browse",
    component: Browse
  },
  {
    path: "/browse/category/:category",
    name: "BrowseCategory",
    component: BrowseCategory,
    props: true
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/contactUs",
    name: "Contact Us",
    component: contactUs
  },
  {
    path: "/createUserProfile",
    name: "CreateUserProfile",
    component: CreateUserProfile,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
