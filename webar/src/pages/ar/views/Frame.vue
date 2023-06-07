<template>
  <frame-container ref="containerRef">
    <tutorial-modal v-show="tutorialPopup" @close="tutorialPopup = false, toggleBarVisibility()"></tutorial-modal>
    <browser-check-modal v-if="isNaverBrowser && isWebView" @close="isNaverBrowser = false"></browser-check-modal>
    <camera ref="cameraRef" @loadeddata="loadVideo" @reject:video="rejectVideo" />
    <template v-if="loadedVideo">
      <event-frame-object :character-list="characterList" :filter-list="filterList" :sticker-list="stickerList"
        @load:scene="loadScene" @allow:orientationpermission="allowOrientationPermission"
        @reject:orientationpermission="rejectOrientationPermission"
        @request:orientationpermission="rquestOrientationPermission" />
      <capture-open-browser-modal ref="captureModal" :image-url="imageUrl" />
    </template>
  </frame-container>
</template>
  
<script>
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";

import FrameContainer from "../../../components/common/FrameContainer";
import EventFrameObject from "../../../components/common/EventFrameObject";
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
    EventFrameObject,
    FrameContainer,
    TutorialModal,
    CaptureOpenBrowserModal,
    BrowserCheckModal
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
      isWebView
    }
  }
}
</script>
  
<style scoped></style>