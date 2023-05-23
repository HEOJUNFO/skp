<template>
  <div class="event-wrapper" :class="{'disable-click' : disableClick }" :style="getAspectRatioStyle">
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
import html2canvas from "html2canvas";

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
    const aspectRatio = ref({width: 3, height: 4});

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

    const toggleAspectRatio = () => {
      if (aspectRatio.value.width === 3) {
        aspectRatio.value.width = 1 // HTODO admin에서 설정한 가로세로 비율로 변경해야함;
        aspectRatio.value.height = 2;
      } else {
        aspectRatio.value.width = 3;
        aspectRatio.value.height = 4;
      }
    }

    const getAspectRatioStyle = computed(() => {
      const heightRatio = 100/aspectRatio.value.height * aspectRatio.value.width

      return {
        height: `${heightRatio}%`,
        width: `100%`
      };
    });

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

    const capture = async () => {
      const element = document.querySelector('.event-wrapper');
      const canvas = await html2canvas(element);
    const imageUrl = canvas.toDataURL("image/png");

    // 캡처한 이미지를 다운로드하려면 아래 코드를 사용하세요:
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = 'capture.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  
  }

    return {
      url,
      disableClick,
      orientation,
      loadingState,
      setClick,
      aspectRatio,
      toggleAspectRatio,
      getAspectRatioStyle,
      capture
    }
  }
}
</script>

<style scoped>
.event-wrapper {
  position: relative; /* 상대적 위치 설정 */
  top: 4vh;
  /* 추가로 margin, padding 등을 설정하여 레이아웃을 조정할 수 있습니다 */
}
</style>