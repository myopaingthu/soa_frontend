import { createRouter, createWebHistory } from "vue-router";
import Master from "@/components/layouts/Master.vue";
import appRoutes from "./app/app.routes";

const baseRoutes = [
  {
    path: "/",
    component: Master,
    children: appRoutes,
  }
];

const routes = [...baseRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
