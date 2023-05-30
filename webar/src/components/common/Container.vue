<template>
  <div class="event-wrapper" :class="{'disable-click' : disableClick }" >
    <slot></slot>
    <div class="frame-top" :style="{'backgroundImage': `url(${url})`, 'top': `${topValue}px`}"></div>
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
    const orientation = ref('landscape')
    const disableClick = ref(false);

    const selectFrame = ref(1);
    const url = computed(() => {
    const frameInfo = getters['eventData/frameContentsInfoList'][selectFrame.value-1];
    return frameInfo ? frameInfo.sourceUri : '';
    });

    // const getUrl = computed(()=>getters['eventData/frameContentsInfoList'][selectFrame.value-1]);

   
    const topValue = ref(0);

    window.selectFrame = function(props) {
      changeSelectFrame(props);
    }

    const changeSelectFrame = (value) => {
      console.log(value)
      selectFrame.value = value;
    }

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

    window.createFrameImages = function()
    {
      const frameImages = createFrameImages();
      return frameImages
    }

  function createFrameImages() {
  const url = computed(() => store.getters['eventData/frameContentsInfoList']);

   const frameImages = url.value.map((item, index) => {
    let tabId = Math.floor(index / 4) + 1; // 4개의 item이 같은 tabId를 가집니다.
    let select = (tabId === 1 && index % 4 === 0);

    return {
      id: index + 1,
      tabId: tabId,
      src: item.thumbnailUri, // item의 구조를 가정하였습니다.
      name: item.fileName, // item의 구조를 가정하였습니다.
      select: select,
    };
    });
      return frameImages;
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
      topValue,
    }
  }
}
</script>

<style scoped>

</style>