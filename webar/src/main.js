import { createApp } from 'vue'

import router from './router'
import store from './store'

import AFRAME from 'aframe'
import { THREE } from 'aframe'

import 'aframe-extras'
// import 'aframe-gif-shader'
import 'aframe-orbit-controls'
import axios from "@/plugins/axios";
import VueFinalModal from "vue-final-modal"
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import App from './App.vue'

const app = createApp(App)

app.use(router)
  .use(store)
  .use(axios)
  .use(AFRAME)
  .use(THREE)
  .use(VueLoading)
  .use(VueFinalModal())
  .mount('#app');

