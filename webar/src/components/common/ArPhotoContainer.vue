<template>
  <div class="event-wrapper" @mousedown="disableClick ? toggleBottomBar() : null">
    <slot></slot>
    <div v-if="arFrameSettingYn" @mousedown="disableClick ? toggleBottomBar() : null" class="frame-top"
      :style="{ 'backgroundImage': `url(${frameUrl})`, 'top': `${0}px` }">
    </div>
    <div v-if="arFrameSettingYn" class="frame-bottom" :style="{ 'backgroundImage': `url(${frameUrl})` }"></div>
  </div>
  <template v-if="loadingState !== 'COMPLETE'">
    <!-- loading -->
    <div v-if="loadingYn" class="loading">
      <img :src="loadingUrl" alt="로딩 이미지" style="width: 100%; height: 100vh;">
    </div>
  </template>
  <!-- 가로모드 -->
  <div class="landscape_wrap" v-if="orientation !== 'portrait'">
    <p>가로모드 지원안함</p>
  </div>
</template>
  
<script>
import { computed, ref, inject, onMounted } from "vue";
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

    onMounted(() => {
      setTimeout(() => {
        disableClick.value = true;
      }, 3000)
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
    }
  }
}
</script>
  
<style scoped>
.event-wrapper {
  z-index: 1;
  width: 100%;
  height: 80%;
  margin: 0 auto;
  position: relative;
  top: 7.5vh;
}
</style>