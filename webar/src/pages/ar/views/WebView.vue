<template>
  <nav-bar ref="navbarRef" :frame-list="frameList" :character-list="characterList" :filter-list="filterList"
    :sticker-list="stickerList" :tab-list="tabList">
    <ar-photo-container ref="containerRef">
      <tutorial-modal v-show="tutorialPopup" @close="tutorialPopup = false, toggleBarVisibility()"></tutorial-modal>
      <browser-check-modal v-if="isNaverBrowser" @close="isNaverBrowser = false"></browser-check-modal>
      <camera ref="cameraRef" @loadeddata="loadVideo" @reject:video="rejectVideo" />
      <template v-if="loadedVideo">
        <event-ar-photo-object ref="eventArPhotoObjectRef" :character-list="characterList" :filter-list="filterList"
          :sticker-list="stickerList" :tab-list="tabList" @load:scene="loadScene"
          @allow:orientationpermission="allowOrientationPermission"
          @reject:orientationpermission="rejectOrientationPermission"
          @request:orientationpermission="rquestOrientationPermission" />
        <capture-web-view-modal ref="captureModal" :image-url="imageUrl" />
      </template>
    </ar-photo-container>
  </nav-bar>
</template>
  
<script>
import { onMounted, ref, computed, provide } from "vue";
import { useStore } from "vuex";

import ArPhotoContainer from "../../../components/common/ArPhotoContainer";
import NavBar from "../../../components/common/NavBar.vue";
import EventArPhotoObject from "../../../components/common/EventArPhotoObject";
import Camera from "@/components/common/Camera";
import TutorialModal from "@/components/modal/TutorialModal";
import CaptureWebViewModal from "../../../components/modal/CaptureWebViewModal.vue";
import BrowserCheckModal from "../../../components/modal/BrowserCheckModal.vue";

import useEventData from "@/composables/useEventData";
import useLoading from "@/composables/useLoading";
import useEventHandlers from "@/composables/useEventHandlers";
import useWindowEvent from "@/composables/useWindowEvent";
import loadImage from "../../../js/loadImage";

export default {
  name: "WebView",
  components: {
    Camera,
    EventArPhotoObject,
    ArPhotoContainer,
    TutorialModal,
    CaptureWebViewModal,
    BrowserCheckModal,
    NavBar
  },
  setup() {
    const store = useStore();
    const { dispatch, getters } = store;
    const loadedVideo = ref(false);
    const tutorialPopup = ref(false);
    const cameraRef = ref(null);
    const containerRef = ref(null);
    const navbarRef = ref(null);
    const captureModal = ref(null);
    const imageUrl = ref(null);
    const beautyOn = ref(false);
    const eventArPhotoObjectRef = ref(null);

    const isNaverBrowser = computed(() => /NAVER/.test(navigator.userAgent));

    const tutorialYn = computed(() => {
      const istutorial = getters['eventData/tutorialYn'];
      return istutorial === 'Y';
    });

    const loadingYn = computed(() => {
      const isLoading = store.getters['eventData/loadingImgYn'];
      return isLoading === 'Y';
    });

    const {
      getEventData
    } = useEventData({ dispatch });

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
      frameList,
      setList
    } = useWindowEvent();

    // video load complete
    const loadVideo = () => {
      loadedVideo.value = true;
    }

    async function capture() {
      const video = document.querySelector('.event-wrapper video');
      const canvas = document.createElement("canvas");
      video.pause();
      let v_width = video.clientWidth * 2;
      let v_height = video.clientHeight * 2;

      canvas.width = v_width;
      canvas.height = v_height;

      const ctx = canvas.getContext('2d');

      let videoRatio = video.videoWidth / video.videoHeight;
      let canvasRatio = v_width / v_height;

      let sx, sy, sw, sh;
      if (videoRatio > canvasRatio) {
        sh = video.videoHeight;
        sw = sh * canvasRatio;
        sy = 0;
        sx = (video.videoWidth - sw) / 2;
      } else {
        sw = video.videoWidth;
        sh = sw / canvasRatio;
        sx = 0;
        sy = (video.videoHeight - sh) / 2;
      }

      ctx.drawImage(video, sx, sy, sw, sh, 0, 0, v_width, v_height);

      let imgData = document.querySelector('a-scene').components.screenshot.getCanvas('perspective');
      ctx.drawImage(imgData, 0, 0, v_width, v_height);

      const topSrc = document.querySelector('.frame-top').style.backgroundImage.slice(5, -2);
      const bottomSrc = document.querySelector('.frame-bottom').style.backgroundImage.slice(5, -2);

      const frameTop = await loadImage(topSrc);
      const frameBottom = await loadImage(bottomSrc);

      ctx.drawImage(frameTop, 0, 0, frameTop.width, frameTop.height / 2, 0, 0, v_width, v_height / 2);
      ctx.drawImage(frameBottom, 0, frameBottom.height / 2, frameBottom.width, frameBottom.height / 2, 0, v_height / 2, v_width, v_height / 2);

      imageUrl.value = canvas.toDataURL("image/png");

      //gray scale 비동기
      async function processImage(type) {
        try {
          const image = await window.Jimp.read(imageUrl.value);

          if (typeof image[type] === "function") {
            const src = await image[type]().getBase64Async('image/png');
            imageUrl.value = src;
          } else {
            console.error(`Invalid image type: ${type}`);
          }
        } catch (err) {
          console.error(err);
        }
      }

      if (beautyOn.value) {
        await processImage('greyscale');
      }

      return imageUrl.value;
    }

    const toggleBarVisibility = () => {
      containerRef.value.topValue = 40;
      navbarRef.value.toggleBarVisibility();
    };

    const captureing = async () => {
      const data = await capture();
      captureModal.value.openModal(data);
      navbarRef.value.toggleBarVisibility();
      cameraRef.value.resetCamera();
    }

    const flipCamera = () => {
      cameraRef.value.flipCamera();
    }

    const toggleBeautyFilter = () => {
      beautyOn.value = !beautyOn.value;
      cameraRef.value.beautyFilter(beautyOn.value);
    }

    const selectFrameChange = (props) => {
      containerRef.value.selectFrame = props;
    }

    const updateObjectValue = (property, props) => {
      if (eventArPhotoObjectRef.value) {
        if (typeof eventArPhotoObjectRef.value[property] === 'function') {
          eventArPhotoObjectRef.value[property](props);
        } else {
          eventArPhotoObjectRef.value[property] = props;
        }
      }
    }

    const selectCharacterChange = props => updateObjectValue('selectCharacter', props);
    const selectTabChange = props => updateObjectValue('selectTab', props);
    const selectFilterChange = props => updateObjectValue('selectFilter', props);
    const selectStickerChange = props => updateObjectValue('selectSticker', props);
    provide('toggleBarVisibility', toggleBarVisibility);
    provide('captureing', captureing);
    provide('flipCamera', flipCamera);
    provide('toggleBeautyFilter', toggleBeautyFilter);
    provide('selectFrameChange', selectFrameChange)
    provide('selectTabChange', selectTabChange)
    provide('selectCharacterChange', selectCharacterChange)
    provide('selectFilterChange', selectFilterChange)
    provide('selectStickerChange', selectStickerChange)

    const originalOnPopState = function () {
      if (captureModal.value.showVModal) {
        history.go(1);
        captureModal.value.webBack();
        window.onpopstate = null;
        setTimeout(() => {
          window.onpopstate = originalOnPopState;
        }, 10);
      } else {
        history.go(-1);
      }
    };

    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {

      if (captureModal.value.showVModal) {
        history.go(1);
        captureModal.value.webBack();
        window.onpopstate = null;
        setTimeout(() => {
          window.onpopstate = originalOnPopState;
        }, 10);
      } else {
        history.go(-1);
      }
    };

    onMounted(async () => {
      await getEventData();
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
      }, loadingYn.value ? 5000 : 0)

    });

    return {
      characterList,
      stickerList,
      filterList,
      tabList,
      frameList,
      loadedVideo,
      loadingState,
      loadVideo,
      rejectVideo,
      loadScene,
      tutorialPopup,
      cameraRef,
      containerRef,
      navbarRef,
      isNaverBrowser,
      capture,
      toggleBarVisibility,
      rquestOrientationPermission,
      allowOrientationPermission,
      rejectOrientationPermission,
      captureModal,
      imageUrl,
      eventArPhotoObjectRef,
    }
  }
}
</script>
  
<style scoped></style>