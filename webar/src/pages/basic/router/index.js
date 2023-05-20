import {createRouter/*, createWebHistory*/, createWebHashHistory} from "vue-router";

import Home from "@/pages/basic/views/Home";
import Basic from "@/pages/basic/views/Basic";
import DragNDrop from "@/pages/basic/views/DragNDrop";

export const routes = [
    {path: "/", component: Home, name: "Home"},
    {path: "/basic", component: Basic, name: "Basic"},
    {path: "/drag-n-drop", component: DragNDrop, name: "DragNDrop"},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;