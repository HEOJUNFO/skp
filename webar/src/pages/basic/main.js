import { createApp } from 'vue';

import router from './router';
import store from '@/store';

import aframe from 'aframe';
import 'aframe-extras';
import 'aframe-gif-shader';
import registerClickDrag from 'aframe-click-drag-component';

registerClickDrag(aframe);

import DKToast from 'vue-dk-toast';
import axios from "@/plugins/axios";
import VueFinalModal from "vue-final-modal";
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import App from './App.vue';

const app = createApp(App);

app.use(router)
  .use(store)
  .use(axios)
  .use(VueLoading, {
    opacity: 0.5
  })
  .use(VueFinalModal())
  .use(DKToast, {
    max:5, duration: 2000
  })
  .mount('#app');


