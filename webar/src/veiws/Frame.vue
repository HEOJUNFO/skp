<template>
    <div class="top-bar">
        <button @click="toggleAspectRatio">비율 전환</button>
        <button @click="flipCamera">좌우반전</button>
        <button @click="openExitModal">나가기</button>
      </div>
    <iframe ref="iframeRef" :src="`${baseUrl}/basic.html#/frame`" frameborder="0"></iframe>
    <div v-if="!isSecondBarVisible" class="bottom-bar-1">
      <button @click="toggleBar">왼쪽 버튼</button>
      <button @click="capture">촬영</button>
  </div>
  
  <div v-else class="bottom-bar-2">
    <button @click="toggleBar">새 왼쪽 버튼</button>
      <button >새 오른쪽 버튼</button>
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

 
  </style>