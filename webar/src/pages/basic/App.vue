<template>
  <router-view/>
</template>

<script>

import {setAframe} from "@/js/SetAFrame";

import '@/assets/css/common.css';
import '@/assets/css/event.css';
import '@/assets/css/video.css';
import '@/assets/css/ar.css';

export default {
  name: 'App',
  setup() {
    setAframe();
 
  }
}
</script>