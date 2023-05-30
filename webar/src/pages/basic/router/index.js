import {createRouter/*, createWebHistory*/, createWebHashHistory} from "vue-router";

import Home from "@/pages/basic/views/Home";
import Basic from "@/pages/basic/views/Basic";
import Frame from "@/pages/basic/views/FrameBasic"
import DragNDrop from "@/pages/basic/views/DragNDrop";
import Face from "@/pages/basic/views/FaceBasic";

export const routes = [
    {path: "/", component: Home, name: "Home"},
    {path: "/basic", component: Basic, name: "Basic"},
    {path: "/frame", component: Frame, name: "Frame"},
    {path: "/drag-n-drop", component: DragNDrop, name: "DragNDrop"},
    {path: "/Face", component: Face, name: "Face"},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;