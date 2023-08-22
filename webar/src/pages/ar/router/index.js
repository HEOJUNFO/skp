import { createRouter /*, createWebHistory*/, createWebHashHistory } from "vue-router";

import Home from "@/pages/ar/views/Home";
import Mission from "@/pages/ar/views/Mission";

export const routes = [
  { path: "/", component: Home, name: "Home" },
  { path: "/mission", component: Mission, name: "Mission" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
