import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/help",
    name: "Help",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function() {
      return import(/* webpackChunkName: "Help" */ "../views/Help.vue");
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: function() {
      return import(/* webpackChunkName: "Profile" */ "../views/Profile.vue");
    },
  },
  {
    path: "/404",
    name: "NotFound",
    component: function() {
      return import(/* webpackChunkName: "NotFound" */ "../views/NotFound.vue");
    },
  },
  {
    //path: "*"
    path: "/:catchAll(.*)",
    redirect: "404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
