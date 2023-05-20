import { createApp } from 'vue'

import router from './router'
import store from '@/store'

// html에서 import
// import 'aframe'
import 'aframe-extras'
// import 'aframe-gif-shader'

import axios from "@/plugins/axios";
import VueFinalModal from "vue-final-modal"
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import App from './App.vue'

const app = createApp(App);

app.use(router)
  .use(store)
  .use(axios)
  .use(VueLoading, {
    opacity: 0.5
  })
  .use(VueFinalModal())
  .mount('#app');

