import { createRouter, createWebHistory } from "vue-router";
import UserList from "../views/UserList.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: UserList,
    },
    {
      path: "/details",
      name: "details",
      component: () => import("../views/UserDetails.vue"),
    },
  ],
});

export default router;
