import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import UserPage from "./pages/UserPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import CallbackPage from "./pages/CallbackPage.vue";

const routes = [
  {
    name: "login",
    path: "/login",
    component: LoginPage,
  },
  {
    name: "home",
    path: "/home",
    component: HomePage,
  },
  {
    name: "user-feed",
    path: "/user-feed",
    component: UserPage,
  },
  {
    name: "callback",
    path: "/callback",
    component: CallbackPage,
  },
  {
    path: "/:catchAll(.*)",
    name: "default",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
