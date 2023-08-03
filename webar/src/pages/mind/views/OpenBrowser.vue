<template>
  <tutorial-modal ref="tutorialRef" v-show="tutorialPopup" @close="tutorialPopup = false"></tutorial-modal>
  <nav-bar ref="navbarRef" :frame-list="frameList" :character-list="characterList" :filter-list="filterList"
    :sticker-list="stickerList" :tab-list="tabList">
    <ar-photo-container ref="containerRef">
      <browser-check-modal v-if="isNaverBrowser" @close="isNaverBrowser = false"></browser-check-modal>
      <ar-photo-camera ref="cameraRef" @loadeddata="loadVideo" @reject:video="rejectVideo" />
      <template v-if="loadedVideo">
        <event-ar-photo-object ref="eventArPhotoObjectRef" :character-list="characterList" :filter-list="filterList"
          :sticker-asset="stickerList" :tab-list="tabList" @load:scene="loadScene"
          @allow:orientationpermission="allowOrientationPermission"
          @reject:orientationpermission="rejectOrientationPermission"
          @request:orientationpermission="rquestOrientationPermission" />
        <capture-open-browser-modal ref="captureModal" :image-url="imageUrl" />
      </template>
    </ar-photo-container>
  </nav-bar>
</template>
  
<script>
import { onMounted, ref, computed, provide, watch } from "vue";
import { useStore } from "vuex";

import ArPhotoContainer from "../../../components/common/ArPhotoContainer";
import NavBar from "../../../components/common/NavBar.vue";
import EventArPhotoObject from "../../../components/common/EventArPhotoObject";
import ArPhotoCamera from "@/components/common/ArPhotoCamera";
import TutorialModal from "@/components/modal/TutorialModal";
import CaptureOpenBrowserModal from "../../../components/modal/CaptureOpenBrowserModal.vue";
import BrowserCheckModal from "../../../components/modal/BrowserCheckModal.vue";

import useEventData from "@/composables/useEventData";
import useLoading from "@/composables/useLoading";
import useEventHandlers from "@/composables/useEventHandlers";
import useWindowEvent from "@/composables/useWindowEvent";
import loadImage from "../../../js/loadImage";

export default {
  name: "OpenBrowser",
  components: {
    ArPhotoCamera,
    EventArPhotoObject,
    ArPhotoContainer,
    TutorialModal,
    CaptureOpenBrowserModal,
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
    const tutorialRef = ref(null);
    const navbarRef = ref(null);
    const captureModal = ref(null);
    const imageUrl = ref(null);
    const beautyOn = ref(false);
    const eventArPhotoObjectRef = ref(null);
    const faceMode = ref('user');

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

      ctx.save();
      if (faceMode.value === 'user') {
        ctx.scale(-1, 1);
        ctx.translate(-v_width, 0);
      }
      ctx.drawImage(video, sx, sy, sw, sh, 0, 0, v_width, v_height);
      ctx.restore();

      let scComp = document.querySelector('a-scene').components.screenshot;
      var isVREnabled = scComp.el.renderer.xr.enabled;
      var renderer = scComp.el.renderer;

      var params = scComp.setCapture('perspective');
      params.size.width = parseInt(v_width * 1.35);
      params.size.height = parseInt(v_height * 1.35);

      renderer.xr.enabled = false;
      scComp.renderCapture(params.camera, params.size, params.projection);

      renderer.xr.enabled = isVREnabled;
      let imgData = scComp.canvas;

      ctx.drawImage(imgData, 0, 0, v_width, v_height);

      if (document.querySelector('.frame-top') && document.querySelector('.frame-bottom')) {
        const topSrc = document.querySelector('.frame-top').style.backgroundImage.slice(5, -2);
        const bottomSrc = document.querySelector('.frame-bottom').style.backgroundImage.slice(5, -2);

        const frameTop = await loadImage(topSrc);
        const frameBottom = await loadImage(bottomSrc);

        ctx.drawImage(frameTop, 0, 0, frameTop.width, frameTop.height / 2, 0, 0, v_width, v_height / 2);
        ctx.drawImage(frameBottom, 0, frameBottom.height / 2, frameBottom.width, frameBottom.height / 2, 0, v_height / 2, v_width, v_height / 2);
      }
      imageUrl.value = canvas.toDataURL("image/png");

      async function processImage() {
        try {
          const image = await window.Jimp.read(imageUrl.value);
          let processedImage = image.brightness(0.2);
          processedImage = processedImage.contrast(0.2);
          processedImage = processedImage.blur(2);


          const src = await processedImage.getBase64Async('image/png');
          imageUrl.value = src;
        } catch (err) {
          console.error(err);
        }
      }

      if (beautyOn.value) {
        await processImage();
      }

      return imageUrl.value;
    }

    const toggleBarVisibility = () => {
      navbarRef.value.toggleBarVisibility();
    };

    const secondToggleBarVisibility = () => {
      navbarRef.value.secondToggleBarVisibility();
    };

    const captureing = async () => {
      const data = await capture();
      captureModal.value.openModal(data);
      navbarRef.value.secondToggleBarVisibility();
    }

    const flipCamera = () => {
      let mode = cameraRef.value.flipCamera();
      mode.then((res) => {
        faceMode.value = res;
      })
    }

    const setEventWrapperStyles = (x, y) => {
      var aspectRatio = y / x;
      const newTop = -18 * aspectRatio + 41;
      const newHeight = 46 * aspectRatio;

      containerRef.value.setEventWrapperStyles(`${newTop}vh`, `${newHeight}vh`);
    }

    provide('setEventWrapperStyles', setEventWrapperStyles);

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
    provide('secondToggleBarVisibility', secondToggleBarVisibility);
    provide('captureing', captureing);
    provide('flipCamera', flipCamera);
    provide('toggleBeautyFilter', toggleBeautyFilter);
    provide('selectFrameChange', selectFrameChange)
    provide('selectTabChange', selectTabChange)
    provide('selectCharacterChange', selectCharacterChange)
    provide('selectFilterChange', selectFilterChange)
    provide('selectStickerChange', selectStickerChange)

    function handlePopState() {
      if (captureModal.value.showVModal) {
        history.go(1);
        captureModal.value.webBack();
      } else {
        navbarRef.value.exitModalVisible = true;
      }

      window.onpopstate = null;
      setTimeout(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = originalOnPopState;
      }, 10);
    }

    const originalOnPopState = function () {
      handlePopState();
    };

    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      handlePopState();
    };

    onMounted(async () => {
      await getEventData();

      setList();

      startLoading();
    });

    watch(loadingState, async (newVal) => {

      if (newVal === 'COUNTING') {
        setTimeout(() => {
          completeLoading()
          if (tutorialYn.value) {
            tutorialPopup.value = true;
          }
          toggleBarVisibility();
          tutorialRef.value.changeBgColor('rgba(1, 1, 1, 0.7)')

        }, loadingYn.value ? 2000 : 0)
      }
    })

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
      tutorialRef
    }
  }
}
</script>
  
<style scoped></style>