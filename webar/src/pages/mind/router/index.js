import { createRouter /*, createWebHistory*/, createWebHashHistory } from "vue-router";

import Home from "@/pages/mind/views/Home";
import OpenBrowser from "@/pages/mind/views/OpenBrowser";
import ImgTracking from "@/pages/mind/views/ImgTracking";
import WebView from "@/pages/mind/views/WebView";
import PhotoBox from "@/pages/mind/views/PhotoBox";

export const routes = [
  { path: "/", component: Home, name: "Home" },
  { path: "/open-browser", component: OpenBrowser, name: "OpenBrowser" },
  { path: "/img-tracking", component: ImgTracking, name: "ImgTracking" },
  { path: "/webview", component: WebView, name: "WebView" },
  { path: "/photo-box", component: PhotoBox, name: "PhotoBox" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
