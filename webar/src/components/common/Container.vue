<template>
  <div class="event-wrapper" :class="{'disable-click' : disableClick }" >
    <slot></slot>
    <div class="frame-top" :style="{'backgroundImage': `url(${url})`}"></div>
    <div class="frame-bottom" :style="{'backgroundImage': `url(${url})`}"></div>
  </div>
  <!-- 로딩 카운터 -->
  <template v-if="loadingState !== 'COMPLETE'">
    <!-- counter -->
    <div class="loading loading2" v-if="loadingState === 'COUNTING'">
      <img src="../../assets/img/AR_countdown.gif" alt="로딩 이미지">
    </div>
    <!-- // counter -->
    <!-- loading -->
    <div class="loading loading2" v-if="loadingState === 'LOADING'">
      <img src="../../assets/img/loading01_114x120.gif" alt="로딩 이미지">
    </div>
    <!-- // loading -->
  </template>
  <!-- 가로모드 -->
  <div class="landscape_wrap" v-if="orientation !== 'portrait'">
    <p>가로모드 지원안함</p>
  </div>
  <!-- // 가로모드 -->
</template>

<script>

import {computed, ref, watch} from "vue";
import {useStore} from "vuex";

import useLoading from "@/composables/useLoading";
import uesOrientation from "@/composables/uesOrientation";

export default {
  name: "Container",
  setup() {
    const store = useStore();
    const {getters} = store;
    const url = computed(()=>getters['eventData/backgroundUri']);
    const orientation = ref('landscape')
    const disableClick = ref(false);

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
      if(str === 'portrait') {
        document.body.classList.remove('landscape');
      } else {
        document.body.classList.add('landscape');
      }
    }
    checkOrientation(setOrientation);

    watch(loadingState, () => {
      if(loadingState.value === 'COUNTING') {
        setTimeout(() => {
          completeLoading()
        }, 5000)
      }
    })

    return {
      url,
      disableClick,
      orientation,
      loadingState,
      setClick,
    }
  }
}
</script>

<style scoped>
</style>