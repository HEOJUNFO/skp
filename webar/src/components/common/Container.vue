<template>
  <div class="event-wrapper" :class="{'disable-click' : disableClick }" >
    <slot></slot>
    <div class="frame-top" :style="{'backgroundImage': `url(${frameUrl})`, 'top': `${topValue}px`}"></div>
    <div class="frame-bottom" :style="{'backgroundImage': `url(${frameUrl})`}"></div>
  </div>
  <template v-if="loadingState !== 'COMPLETE'">
    <!-- loading -->
    <div v-if="isLoadingImg" class="loading loading2" >
      <img :src="loadingUrl" alt="로딩 이미지">
    </div>
  </template>
  <!-- 가로모드 -->
  <div class="landscape_wrap" v-if="orientation !== 'portrait'">
    <p>가로모드 지원안함</p>
  </div>
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
    const frameUrl = computed(() => {
    const frameInfo = getters['eventData/frameContentsInfoList'][selectFrame.value-1];
    return frameInfo ? frameInfo.sourceUri : '';
    });

    const isLoadingImg = computed(() => {
      const isLoading = store.getters['eventData/loadingImgYn'];
      return isLoading === 'Y';
    });

    const loadingUrl = computed(() => {
    const url = store.getters['eventData/loadingImgUrl'];
     return String(url);  
    });
    

    const topValue = ref(0);

    window.selectFrame = function(props) {
      changeSelectFrame(props);
    }

    const changeSelectFrame = (value) => {
      console.log(orientation.value)
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
    let tabId = Math.floor(index / 4) + 1; 
    let select = (tabId === 1 && index % 4 === 0);

    return {
      id: index + 1,
      tabId: tabId,
      src: item.thumbnailUri, 
      name: item.fileName, 
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
      console.log(isLoadingImg.value)
      if(loadingState.value === 'COUNTING') {
        setTimeout(() => {
          completeLoading()
      
        }, isLoadingImg.value? 5000:0)
      }
    })

    return {
      frameUrl,
      isLoadingImg,
      loadingUrl,
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