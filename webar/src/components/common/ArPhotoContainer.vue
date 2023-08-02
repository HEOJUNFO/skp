<template>
  <div class="event-wrapper" @mousedown="disableClick ? toggleBottomBar() : null">
    <slot></slot>
    <div v-if="arFrameSettingYn" @mousedown="disableClick ? toggleBottomBar() : null" class="frame-top"
      :style="{ 'backgroundImage': `url(${frameUrl})`, 'top': `${0}px` }">
    </div>
    <div v-if="arFrameSettingYn" class="frame-bottom" :style="{ 'backgroundImage': `url(${frameUrl})` }"></div>
    <div v-if="loadingYn && loadingState !== 'COMPLETE'" class="ArPhotoloading">
      <img :src="loadingUrl" alt="로딩 이미지">
      <div class="progress-bar">
        <div class="progress-bar-fill" :style="{ width: `${progressValue}%` }"></div>
      </div>
      <p class="text">AR 준비중</p>
    </div>
  </div>
  <!-- 가로모드 -->
  <div class="landscape_wrap" v-if="orientation !== 'portrait'">
    <p>가로모드 지원안함</p>
  </div>
</template>
  
<script>
import { computed, ref, inject, onMounted, watchEffect } from "vue";
import { useStore } from "vuex";

import useLoading from "@/composables/useLoading";
import uesOrientation from "@/composables/uesOrientation";

export default {
  name: "Container",
  setup() {
    const store = useStore();
    const { getters } = store;
    const orientation = ref('landscape')
    const disableClick = ref(false);
    const progressValue = ref(0);

    const selectFrame = ref(1);
    const frameUrl = computed(() => {
      const frameInfo = getters['eventData/frameContentsInfoList'][selectFrame.value - 1];
      return frameInfo ? frameInfo.sourceUri : '';
    });

    const loadingYn = computed(() => {
      const isLoading = store.getters['eventData/loadingImgYn'];
      return isLoading === 'Y';
    });

    const loadingUrl = computed(() => {
      const url = store.getters['eventData/loadingImgUrl'];
      return String(url);
    });

    const arFrameSettingYn = computed(() => {
      const isArFrameSetting = store.getters['eventData/arFrameSettingYn'];
      return isArFrameSetting === 'Y';
    });

    const {
      loadingState,
    } = useLoading()

    const {
      checkOrientation
    } = uesOrientation()

    // 가로 세로 체크
    const setOrientation = (str) => {
      orientation.value = str;
      if (str === 'portrait') {
        document.body.classList.remove('landscape');
      } else {
        document.body.classList.add('landscape');
      }
    }
    checkOrientation(setOrientation);


    const toggleBottomBar = inject('toggleBottomBar');

    let intervalId;

    watchEffect(() => {
      if (loadingState.value === 'COUNTING') {
        intervalId = setInterval(() => {
          if (progressValue.value < 100) {
            progressValue.value++;
          } else {
            clearInterval(intervalId);
          }
        }, 10);
      } else if (loadingState.value === 'COMPLETE') {
        clearInterval(intervalId);
        progressValue.value = 100;
      } else {
        clearInterval(intervalId);
        progressValue.value = 0;
      }
    });

    onMounted(() => {
      setTimeout(() => {
        disableClick.value = true;
      }, 2000)
    })

    return {
      frameUrl,
      loadingYn,
      loadingUrl,
      disableClick,
      orientation,
      loadingState,
      arFrameSettingYn,
      selectFrame,
      toggleBottomBar,
      progressValue
    }
  }
}
</script>
  
<style scoped>
.event-wrapper {
  z-index: 1;
  width: 100%;
  height: 62vh;
  position: relative;
  top: 14vh;
  background-color: #fff;
}

.text {
  position: absolute;
  top: 75vh;
  left: 50%;
  transform: translateX(-50%);
  color: #000;
  text-align: center;
  font-family: NanumSquare Neo OTF;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}

.ArPhotoloading .progress-bar {
  position: absolute;
  top: 72vh;
  left: 50%;
  transform: translateX(-50%);
  width: 72%;
  height: 1.5vh;
  background-color: #d9d9d9;
  border-radius: 50px;
}

.ArPhotoloading .progress-bar .progress-bar-fill {
  height: 100%;
  background-color: #eb4747;
  transition: width 0.2s;
  border-radius: 50px;
}

.ArPhotoloading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /*background:#000;opacity:0.6;*/
  background: #fff;
  z-index: 6;
}

.ArPhotoloading img {
  position: absolute;
  top: 25vh;
  left: 50%;
  width: 61.5%;
  height: 39vh;
  -webkit-transform: translate(-50%, 0%);
  z-index: 8;
}
</style>