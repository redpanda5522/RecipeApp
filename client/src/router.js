import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import UserPage from "./pages/UserPage.vue";
import LoginPage from "./pages/LoginPage.vue";

const routes = [
  {
    name: "home",
    path: "/home",
    component: HomePage,
  },
  {
    name: "login",
    path: "/login",
    component: LoginPage,
  },
  {
    name: "user-feed",
    path: "/user-feed",
    component: UserPage,
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
