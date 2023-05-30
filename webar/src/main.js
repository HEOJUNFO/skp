import { createApp } from 'vue'

import router from './router'
import store from './store'

import AFRAME from 'aframe'
import 'aframe-extras'
// import 'aframe-gif-shader'
import 'aframe-orbit-controls'
import DKToast from 'vue-dk-toast';
import axios from "@/plugins/axios";
import VueFinalModal from "vue-final-modal"
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)

const app = createApp(App)

app.use(router)
  .use(store)
  .use(axios)
  .use(AFRAME)
  .use(VueLoading)
  .use(VueFinalModal())
  .use(DKToast, {
    max:5, duration: 2000
  })
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');

