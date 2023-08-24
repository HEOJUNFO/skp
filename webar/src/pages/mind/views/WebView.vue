<template>
  <tutorial-modal ref="tutorialRef" v-show="tutorialPopup" @close="tutorialPopup = false"></tutorial-modal>
  <nav-bar ref="navbarRef" :frame-list="frameList" :character-list="characterList" :filter-list="filterList"
    :sticker-list="stickerList" :tab-list="tabList" :is-decorate="isDecorate">
    <ar-photo-container ref="containerRef">
      <browser-check-modal v-if="isNaverBrowser" @close="isNaverBrowser = false"></browser-check-modal>
      <ar-photo-camera ref="cameraRef" @loadeddata="loadVideo" @reject:video="rejectVideo" />
      <template v-if="loadedVideo">
        <img id="deco-photo" v-if="selectedPhoto" :src="selectedPhoto"
          style="position: absolute; width: 100%; height: 100%" />
        <event-ar-photo-object ref="eventArPhotoObjectRef" :character-list="characterList" :filter-list="filterList"
          :sticker-asset="stickerList" :tab-list="tabList" @load:scene="loadScene"
          @allow:orientationpermission="allowOrientationPermission"
          @reject:orientationpermission="rejectOrientationPermission"
          @request:orientationpermission="rquestOrientationPermission" />
        <capture-web-view-modal ref="captureModal" :image-url="imageUrl" />
      </template>
    </ar-photo-container>
  </nav-bar>
</template>

<script>
import { onMounted, ref, computed, provide, watch } from "vue";
import { useStore } from "vuex";
import { EventBus } from "@/js/EventBus.js";

import ArPhotoContainer from "../../../components/common/ArPhotoContainer";
import NavBar from "../../../components/common/NavBar";
import EventArPhotoObject from "../../../components/common/EventArPhotoObject";
import ArPhotoCamera from "@/components/common/ArPhotoCamera";
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
    ArPhotoCamera,
    EventArPhotoObject,
    ArPhotoContainer,
    TutorialModal,
    CaptureWebViewModal,
    BrowserCheckModal,
    NavBar,
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
    const faceMode = ref("user");
    const selectedPhoto = ref("");

    const isNaverBrowser = computed(() => /NAVER/.test(navigator.userAgent));

    const tutorialYn = computed(() => {
      const istutorial = getters["eventData/tutorialYn"];
      return istutorial === "Y";
    });

    const loadingYn = computed(() => {
      const isLoading = store.getters["eventData/loadingImgYn"];
      return isLoading === "Y";
    });

    const arFrameSettingYn = computed(() => {
      const isArFrameSetting = store.getters["eventData/arFrameSettingYn"];
      return isArFrameSetting === "Y";
    });

    const isDecorate = computed(() => (selectedPhoto.value ? true : false));

    const { getEventData } = useEventData({ dispatch });

    const { loadingState, startLoading, completeLoading } = useLoading();

    const { rejectVideo, loadScene, rquestOrientationPermission, allowOrientationPermission, rejectOrientationPermission } = useEventHandlers();

    const { characterList, filterList, stickerList, tabList, frameList, setList } = useWindowEvent();


    const setCharacter = ref(null);

    EventBus.on("setCharacter", (id) => {
      setCharacter.value = id;
    });

    EventBus.on("deleteCharacterItem", () => {
      const index = characterList.value.findIndex((character) => character.id === setCharacter.value);
      characterList.value[index].select = false;

    });

    // video load complete
    const loadVideo = () => {
      loadedVideo.value = true;
    };

    async function capture() {
      const canvas = document.createElement("canvas");
      const videocanvas = beautyOn.value ? document.querySelector(".event-wrapper canvas") : document.querySelector(".event-wrapper video");

      if (beautyOn.value === false) {
        videocanvas.pause();
      }

      let v_width = videocanvas.clientWidth * 3.5;
      let v_height = videocanvas.clientHeight * 3.5;

      canvas.width = v_width;
      canvas.height = v_height;

      const ctx = canvas.getContext("2d");

      let videoRatio = videocanvas.width / videocanvas.height;
      let canvasRatio = v_width / v_height;

      let sx, sy, sw, sh;
      if (videoRatio > canvasRatio) {
        sh = videocanvas.height;
        sw = sh * canvasRatio;
        sy = 0;
        sx = (videocanvas.width - sw) / 2;
      } else {
        sw = videocanvas.width;
        sh = sw / canvasRatio;
        sx = 0;
        sy = (videocanvas.height - sh) / 2;
      }

      ctx.save();
      if (faceMode.value === "user") {
        ctx.scale(-1, 1);
        ctx.translate(-v_width, 0);
      }
      ctx.drawImage(videocanvas, sx, sy, sw, sh, 0, 0, v_width, v_height);
      ctx.restore();

      if (isDecorate.value) {
        const decoPhotoSrc = document.querySelector("#deco-photo").src;
        const decoPhoto = await loadImage(decoPhotoSrc);
        ctx.drawImage(decoPhoto, 0, 0, v_width, v_height);
      }

      let sceneEl = document.querySelector('a-scene');
      let cameraEl = sceneEl.querySelector('[camera]');

      traverseSceneAndDisableMipmaps(sceneEl.object3D);

      let tempCanvas = document.createElement('canvas');
      tempCanvas.width = v_width;
      tempCanvas.height = v_height;
      let context = tempCanvas.getContext('webgl', { preserveDrawingBuffer: true });
      let tempRenderer = new window.THREE.WebGLRenderer({ canvas: tempCanvas, context: context });
      tempRenderer.outputEncoding = window.THREE.sRGBEncoding
      tempRenderer.setSize(v_width, v_height);
      tempRenderer.render(sceneEl.object3D, cameraEl.getObject3D('camera'));

      ctx.drawImage(tempCanvas, 0, 0, v_width, v_height);

      if (document.querySelector(".frame-top") && document.querySelector(".frame-bottom") && !isDecorate.value) {
        const topSrc = document.querySelector(".frame-top").style.backgroundImage.slice(5, -2);
        const bottomSrc = document.querySelector(".frame-bottom").style.backgroundImage.slice(5, -2);
        let frameTop = null;
        let frameBottom = null;

        if (topSrc !== '' && bottomSrc !== '') {
          frameTop = await loadImage(topSrc);
          frameBottom = await loadImage(bottomSrc);

          ctx.drawImage(frameTop, 0, 0, frameTop.width, frameTop.height / 2, 0, 0, v_width, v_height / 2);
          ctx.drawImage(frameBottom, 0, frameBottom.height / 2, frameBottom.width, frameBottom.height / 2, 0, v_height / 2, v_width, v_height / 2);
        }

      }
      imageUrl.value = canvas.toDataURL("image/png");

      return imageUrl.value;
    }

    function disableMipmapsForMaterials(material) {
      if (material instanceof window.THREE.MeshStandardMaterial ||
        material instanceof window.THREE.MeshBasicMaterial ||
        material instanceof window.THREE.MeshLambertMaterial ||
        material instanceof window.THREE.MeshPhongMaterial ||
        material instanceof window.THREE.ShaderMaterial || material instanceof window.THREE.RawShaderMaterial) {
        if (material.map) {
          material.map.minFilter = window.THREE.LinearFilter; material.map.wrapS = window.THREE.ClampToEdgeWrapping;
          material.map.wrapT = window.THREE.ClampToEdgeWrapping;
        }
      }
    }

    function traverseSceneAndDisableMipmaps(object) {
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(disableMipmapsForMaterials);
        } else {
          disableMipmapsForMaterials(object.material);
        }
      }

      if (object.children) {
        object.children.forEach(traverseSceneAndDisableMipmaps);
      }
    }

    const toggleBarVisibility = () => {
      navbarRef.value.toggleBarVisibility();
    };

    const secondToggleBarVisibility = () => {
      if (arFrameSettingYn.value) {
        setEventWrapperStyles(4, 6);
      } else { setEventWrapperStyles(1, 1); }
      navbarRef.value.secondToggleBarVisibility();
    };

    const captureing = async () => {
      const data = await capture();
      captureModal.value.openModal(data);
      // captureModal.value.decorateCapture(isDecorate.value);
      navbarRef.value.secondToggleBarVisibility();
    };

    const flipCamera = () => {
      let mode = cameraRef.value.flipCamera();
      mode.then((res) => {
        faceMode.value = res;
      });
    };

    const setEventWrapperStyles = (x, y) => {
      var aspectRatio = y / x;
      let newWidth = null;
      let newHeight = null;

      let newTop = -18 * aspectRatio + 35;
      if (aspectRatio == 1) {
        newWidth = window.innerWidth;
        newHeight = window.innerWidth;

      }
      else {
        newWidth = window.innerHeight * 0.77 / aspectRatio;
        newHeight = window.innerHeight * 0.77;
      }

      if (window.innerHeight > window.innerWidth * 2) {
        newWidth = newWidth * 0.85;
        newTop = newTop + 6;
        newHeight = newWidth * aspectRatio;
      }

      containerRef.value.setEventWrapperStyles(`${newTop}vh`, `${newWidth}px`, `${newHeight}px`);
      if (eventArPhotoObjectRef.value) {
        eventArPhotoObjectRef.value.arSceneResize();
      }
    };

    const toggleBeautyFilter = () => {
      beautyOn.value = !beautyOn.value;
      cameraRef.value.beautyFilter(beautyOn.value);
    };

    const selectFrameChange = (props) => {
      containerRef.value.selectFrame = props;
    };

    const updateObjectValue = (property, props) => {
      if (eventArPhotoObjectRef.value) {
        if (typeof eventArPhotoObjectRef.value[property] === "function") {
          eventArPhotoObjectRef.value[property](props);
        } else {
          eventArPhotoObjectRef.value[property] = props;
        }
      }
    };

    const selectCharacterChange = (props) => updateObjectValue("selectCharacter", props);
    const selectTabChange = (props) => updateObjectValue("selectTab", props);
    const selectFilterChange = (props) => updateObjectValue("selectFilter", props);
    const selectStickerChange = (props) => updateObjectValue("selectSticker", props);

    provide("toggleBarVisibility", toggleBarVisibility);
    provide("secondToggleBarVisibility", secondToggleBarVisibility);
    provide("captureing", captureing);
    provide("flipCamera", flipCamera);
    provide("toggleBeautyFilter", toggleBeautyFilter);
    provide("selectFrameChange", selectFrameChange);
    provide("selectTabChange", selectTabChange);
    provide("selectCharacterChange", selectCharacterChange);
    provide("selectFilterChange", selectFilterChange);
    provide("selectStickerChange", selectStickerChange);
    provide("setEventWrapperStyles", setEventWrapperStyles);

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

    const initDecorate = () => {
      const decorateImage = getters["eventData/selectedPhoto"];
      if (decorateImage) {
        selectedPhoto.value = decorateImage;
        dispatch("eventData/setSeletedPhoto", "");
      }
    };

    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      handlePopState();
    };

    onMounted(async () => {
      await getEventData();

      setList();

      startLoading();

      initDecorate();

      if (arFrameSettingYn.value) {
        setEventWrapperStyles(4, 6)
      }
      else {
        setEventWrapperStyles(1, 1)
      }
    });

    watch(loadingState, async (newVal) => {
      if (newVal === "COUNTING") {
        setTimeout(
          () => {
            completeLoading();
            if (tutorialYn.value && !isDecorate.value) {
              tutorialPopup.value = true;
            }
            toggleBarVisibility();
            tutorialRef.value.changeBgColor("rgba(1, 1, 1, 0.7)");
          },
          loadingYn.value ? 2000 : 0
        );
      }
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
      selectedPhoto,
      isDecorate,
      initDecorate,
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
      tutorialRef,
    };
  },
};
</script>

<style scoped></style>