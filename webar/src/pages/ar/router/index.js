import {createRouter/*, createWebHistory*/, createWebHashHistory} from "vue-router";

import Home from "@/pages/ar/views/Home";
import Mission from "@/pages/ar/views/Mission";
import Frame from "@/pages/ar/views/Frame";
import Face from "@/pages/ar/views/Face";

export const routes = [
    {path: '/', component: Home, name: 'Home'},
    {path: '/mission', component: Mission, name: 'Mission'},
    {path: "/frame", component: Frame, name: "Frame"},
    {path: "/Face", component: Face, name: "Face"},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;