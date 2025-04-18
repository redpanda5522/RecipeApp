import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "@auth0/auth0-vue";

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
    beforeEnter: authGuard,
  },
  {
    name: "user-feed",
    path: "/user-feed",
    component: UserPage,
    beforeEnter: authGuard,
  },
  {
    name: "callback",
    path: "/callback",
    component: CallbackPage,
    beforeEnter: authGuard,
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
