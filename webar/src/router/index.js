import {createRouter/*, createWebHistory*/, createWebHashHistory} from "vue-router";

import Home from "@/veiws/Home";
import Basic from "@/veiws/Basic";
import Mission from "@/veiws/Mission";
import Bridge from "@/veiws/Bridge";
import IsMission from "@/veiws/IsMission";
import DragNDrop from "@/veiws/DragNDrop";
import JsonEditor from "@/veiws/JsonEditor";
import Landing from "@/veiws/Landing";
import SampleLanding from "../veiws/SampleLanding";
import Frame from "@/veiws/Frame"
import Face from "@/veiws/Face"
import Storage from "@/veiws/Storage"

export const routes = [
    {path: '/', component: Landing, name: 'Landing'},
    {path: '/home', component: Home, name: 'Home'},
    {path: '/basic', component: Basic, name: 'Object Basic'},
    {path: '/mission', component: Mission, name: 'Mission'},
    {path: '/bridge', component: Bridge, name: 'Bridge'},
    {path: '/is-mission', component: IsMission, name: 'Scanning Mission'},
    {path: '/drag-n-drop', component: DragNDrop, name: 'Drag And Drop'},
    {path: '/json-editor/', component: JsonEditor, name: 'Json Editor'},
    {path: '/frame', component: Frame, name: 'Frame'},
    {path: '/Face', component: Face, name: 'Face'},
    {path: '/storage', component: Storage, name: 'Storage'},
    {path: '/sample-landing', component: SampleLanding, name: 'SampleLanding'},
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;