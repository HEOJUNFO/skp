import {createRouter/*, createWebHistory*/, createWebHashHistory} from "vue-router";

import Home from "@/pages/ar/views/Home";
import Mission from "@/pages/ar/views/Mission";
import OpenBrowser from "@/pages/ar/views/OpenBrowser";
import WebView from "@/pages/ar/views/WebView";
import PhotoStorage from "@/pages/ar/views/PhotoStorage";

export const routes = [
    {path: '/', component: Home, name: 'Home'},
    {path: '/mission', component: Mission, name: 'Mission'},
    {path: "/open-browser", component: OpenBrowser, name: "OpenBrowser"},
    {path: "/webview", component: WebView, name: "WebView"},
    {path: "/photo-storage", component: PhotoStorage, name: "PhotoStorage"},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;