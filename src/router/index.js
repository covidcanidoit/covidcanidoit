import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import UserProfile from "../views/userProfile.vue";
import CreateUserProfile from "../views/createUserProfile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/userProfile",
    name: "userProfile",
    component: UserProfile
  },
  {
    path: "/createUserProfile",
    name: "createUserProfile",
    component: CreateUserProfile
  }
];

const router = new VueRouter({
  //comment out for single file HTML build
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
});

export default router;
