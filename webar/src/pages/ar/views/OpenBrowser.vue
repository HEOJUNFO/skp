<template>
  <ar-photo-container ref="containerRef">
    <tutorial-modal v-show="tutorialPopup" @close="tutorialPopup = false, toggleBarVisibility()"></tutorial-modal>
    <browser-check-modal v-if="isNaverBrowser && isWebView" @close="isNaverBrowser = false"></browser-check-modal>
    <camera ref="cameraRef" @loadeddata="loadVideo" @reject:video="rejectVideo" />
    <template v-if="loadedVideo">
      <event-ar-photo-object :character-list="characterList" :filter-list="filterList" :sticker-list="stickerList"
        :tab-list="tabList" @load:scene="loadScene" @allow:orientationpermission="allowOrientationPermission"
        @reject:orientationpermission="rejectOrientationPermission"
        @request:orientationpermission="rquestOrientationPermission" />
      <capture-open-browser-modal ref="captureModal" :image-url="imageUrl" />
    </template>
  </ar-photo-container>
</template>
  
<script>
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";

import ArPhotoContainer from "../../../components/common/ArPhotoContainer";
import EventArPhotoObject from "../../../components/common/EventArPhotoObject";
import Camera from "@/components/common/Camera";
import TutorialModal from "@/components/modal/TutorialModal";
import CaptureOpenBrowserModal from "../../../components/modal/CaptureOpenBrowserModal.vue";
import BrowserCheckModal from "../../../components/modal/BrowserCheckModal.vue";

import useEventData from "@/composables/useEventData";
import useResultData from "@/composables/useResultData";
import useLoading from "@/composables/useLoading";
import useEventHandlers from "@/composables/useEventHandlers";
import useWindowEvent from "@/composables/useWindowEvent";

export default {
  name: "Frame",
  components: {
    Camera,
    EventArPhotoObject,
    ArPhotoContainer,
    TutorialModal,
    CaptureOpenBrowserModal,
    BrowserCheckModal,
  },
  setup() {
    const store = useStore();
    const { dispatch, getters } = store;
    const templateType = ref(null);
    const loadedVideo = ref(false);
    const tutorialPopup = ref(false);
    const cameraRef = ref(null);
    const containerRef = ref(null);
    const captureModal = ref(null);
    const imageUrl = ref(null);
    const beautyOn = ref(false);

    const isNaverBrowser = computed(() => /NAVER/.test(navigator.userAgent));
    const isWebView = computed(() => navigator.userAgent.includes('WebView'));

    const tutorialYn = computed(() => {
      const istutorial = getters['eventData/tutorialYn'];
      return istutorial === 'Y';
    });

    const {
      getEventData
    } = useEventData({ dispatch });

    const {
      eventResult,
    } = useResultData({ getters, dispatch });

    const {
      loadingState,
      startLoading,
      completeLoading
    } = useLoading()

    const {
      rejectVideo,
      loadScene,
      rquestOrientationPermission,
      allowOrientationPermission,
      rejectOrientationPermission,
    } = useEventHandlers();

    const {
      characterList,
      filterList,
      stickerList,
      tabList,
      setList
    } = useWindowEvent();

    // video load complete
    const loadVideo = () => {
      loadedVideo.value = true;
    }

    const capture = () => {
      // video canvas create
      const video = document.querySelector('.event-wrapper video');

      const canvas = document.createElement("canvas");
      video.pause();
      let v_width = video.clientWidth * 2;
      let v_height = video.clientHeight * 2;

      canvas.width = v_width;
      canvas.height = v_height;

      let element = video,
        style = window.getComputedStyle(element),
        top = style.getPropertyValue('top');

      canvas.getContext('2d').drawImage(video, 0, parseFloat(top), v_width, v_height);

      if (beautyOn.value) {
        gaussianBlur(canvas.getContext('2d'), v_width, v_height, 10);
      }

      let imgData = document.querySelector('a-scene').components.screenshot.getCanvas('perspective');
      canvas.getContext('2d').drawImage(imgData, 0, 0, v_width, v_height);

      imageUrl.value = canvas.toDataURL("image/png");

      return imageUrl.value;
    };

    const toggleBarVisibility = () => {
      window.parent.toggleBarVisibility();
      containerRef.value.topValue = 40;
    };

    window.flipCamera = function () {
      cameraRef.value.flipCamera();
    }

    window.beautyFilter = function (isBeauty) {
      cameraRef.value.beautyFilter(isBeauty);
      beautyOn.value = isBeauty
    }

    window.capture = function () {
      captureModal.value.openModal(capture());
      window.parent.toggleBarVisibility();
      cameraRef.value.resetCamera();
    }

    window.containTopValueToggle = function () {
      if (containerRef.value.topValue === 40) {
        containerRef.value.topValue = 0;
      } else {
        containerRef.value.topValue = 40;
      }
    }

    function gaussianBlur(context, width, height, radius) {
      const imageData = context.getImageData(0, 0, width, height);
      const data = imageData.data;
      const pixels = new Uint8Array(data.length);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let sumRed = 0, sumGreen = 0, sumBlue = 0, sumAlpha = 0, weightSum = 0;
          for (let ky = -radius; ky <= radius; ky++) {
            for (let kx = -radius; kx <= radius; kx++) {
              const posX = Math.min(width - 1, Math.max(0, x + kx));
              const posY = Math.min(height - 1, Math.max(0, y + ky));
              const index = (posY * width + posX) * 4;
              const weight = Math.exp(-(kx * kx + ky * ky) / (2 * radius * radius)) / (2 * Math.PI * radius * radius);
              sumRed += data[index] * weight;
              sumGreen += data[index + 1] * weight;
              sumBlue += data[index + 2] * weight;
              sumAlpha += data[index + 3] * weight;
              weightSum += weight;
            }
          }
          const outputIndex = (y * width + x) * 4;
          pixels[outputIndex] = sumRed / weightSum;
          pixels[outputIndex + 1] = sumGreen / weightSum;
          pixels[outputIndex + 2] = sumBlue / weightSum;
          pixels[outputIndex + 3] = sumAlpha / weightSum;
        }
      }

      imageData.data.set(pixels);
      context.putImageData(imageData, 0, 0);
    }

    onMounted(async () => {
      await getEventData();
      templateType.value = getters['eventData/templateType'];
      setList();
      startLoading();

      setTimeout(() => {
        completeLoading()

        if (tutorialYn.value) {
          tutorialPopup.value = true;
        }
        else {
          toggleBarVisibility();
        }
      }, 5000)

    });

    return {
      characterList,
      stickerList,
      filterList,
      tabList,
      eventResult,
      templateType,
      loadedVideo,
      loadingState,
      loadVideo,
      rejectVideo,
      loadScene,
      tutorialPopup,
      cameraRef,
      containerRef,
      isNaverBrowser,
      capture,
      toggleBarVisibility,
      rquestOrientationPermission,
      allowOrientationPermission,
      rejectOrientationPermission,
      captureModal,
      imageUrl,
      isWebView,
    }

  }


}
</script>
  
<style scoped></style>

