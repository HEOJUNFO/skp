<template>
  <div class="frame">
    <div class="top-bar" v-show="isBarVisible">
        <button @click="toggleAspectRatio">비율 전환</button>
        <button @click="flipCamera">좌우반전</button>
        <button @click="openExitModal">나가기</button>
      </div>
    <iframe ref="iframeRef" :src="`${baseUrl}/basic.html#/frame`" frameborder="0"></iframe>
    <div v-if="!isSecondBarVisible && isBarVisible" class="bottom-bar-1">
      <button @click="toggleBar">프레임</button>
      <button @click="capture">촬영</button>
  </div>
  
  <div v-if="isSecondBarVisible && isBarVisible" class="bottom-bar-2">
    <button @click="toggleBar">나가기</button>
      <button >모델</button>
  </div>
  </div>
 </template>

  <script>
import {ref} from "vue";


  export default {
    name: "Frame",
    components: {
   
    },
    setup() {
      const iframeRef = ref(null);
      const isSecondBarVisible = ref(false);

      const isBarVisible = ref(false);

    window.toggleBarVisibility = function() {
      isBarVisible.value = !isBarVisible.value;
    };

 
      const toggleAspectRatio = () => {
            if (iframeRef.value) {
                iframeRef.value.contentWindow.toggleAspectRatio();
            }
        };
      
      const flipCamera = () => {
        if (iframeRef.value) {
            iframeRef.value.contentWindow.flipCamera();
        }
      };

      const openExitModal = () => {
        if (iframeRef.value) {
            iframeRef.value.contentWindow.openExitModal();
        }
      };

      const capture = () => {
        if (iframeRef.value) {
            iframeRef.value.contentWindow.capture();
        }
      };

      const toggleBar = () => {
      isSecondBarVisible.value = !isSecondBarVisible.value;
    }

      return {
        baseUrl: process.env.VUE_APP_PAGE_PATH
        , iframeRef
        , toggleAspectRatio
        , flipCamera
        , openExitModal
        , isSecondBarVisible
        , toggleBar
        , capture
        , isBarVisible
      }
    }
  }
  </script>
  
  <style scoped>
    .top-bar {
      z-index: 1;
    position: absolute;
    top: 10;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    background-color: #fff;
    color: #fff;
  }

  .bottom-bar-1 {
    z-index: 1;
    position: absolute;
    top: -1;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    background-color: #fff;
    color: #fff;
  }

  .bottom-bar-2 {
    z-index: 1;
    position: absolute;
    top: -1;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    background-color: #fff;
    color: #fff;
  }

  </style>