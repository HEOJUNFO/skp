<template>
  <div class="event-wrapper" :class="{ 'disable-click': disableClick }">
    <slot></slot>
    <div v-if="arFrameSettingYn" class="frame-top" :style="{ 'backgroundImage': `url(${frameUrl})`, 'top': `${0}px` }">
    </div>
    <div v-if="arFrameSettingYn" class="frame-bottom" :style="{ 'backgroundImage': `url(${frameUrl})` }"></div>
  </div>
  <template v-if="loadingState !== 'COMPLETE'">
    <!-- loading -->
    <div v-if="loadingYn" class="loading loading2">
      <img :src="loadingUrl" alt="로딩 이미지">
    </div>
  </template>
  <!-- 가로모드 -->
  <div class="landscape_wrap" v-if="orientation !== 'portrait'">
    <p>가로모드 지원안함</p>
  </div>
</template>
  
<script>
import { computed, ref, watch } from "vue";
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

    const topValue = ref(0);

    const {
      loadingState,
      completeLoading
    } = useLoading()

    const {
      checkOrientation
    } = uesOrientation()

    const setClick = (isClick) => {
      disableClick.value = !isClick;
    }

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

    watch(loadingState, () => {

      if (loadingState.value === 'COUNTING') {
        setTimeout(() => {
          completeLoading()

        }, loadingYn.value ? 2000 : 0)
      }
    })

    return {
      frameUrl,
      loadingYn,
      loadingUrl,
      disableClick,
      orientation,
      loadingState,
      setClick,
      topValue,
      arFrameSettingYn,
      selectFrame
    }
  }
}
</script>
  
<style scoped>
.event-wrapper {
  width: 100%;
  height: 93%;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  top: 10%;
}
</style>