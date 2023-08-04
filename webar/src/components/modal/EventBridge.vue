<template>
  <vue-final-modal v-if="showModal && modalType !== '3D'" v-model="showModal" content-class="bridge_popup" overlay-class="dimmed_bg_lightdark" @opened="opened">
    <div class="popup_contents">
      <!-- 이미지 / gif vertical 세로형-->
      <div v-if="modalType === 'IMAGE' || modalType === 'GIF'" class="img" :class="{ vertical: modalDirection === 'HEIGHT' }">
        <!--  <img src="https://dummyimage.com/504x884/cdce82/ffffff" alt="">-->
        <img :src="modalData.sourceUri" alt="" />
      </div>

      <!-- 비디오 vertical 세로형-->
      <div v-show="modalType === 'VIDEO' && modalData.sourceUri && playing" class="video" :class="{ vertical: modalDirection === 'HEIGHT' }">
        <div class="video-container" id="video-container">
          <!--          <div class="playback-animation" id="playback-animation">
            <div class="playback-icons">
              <a class="hidden" href="#play-icon"></a>
              <a href="#pause" class=""></a>
            </div>
          </div>-->
          <div class="video_wrap">
            <video ref="vidoeEl" class="video" id="video" preload="metadata" playsinline="" :muted="isMuted" @timeupdate="timeUpdate" @ended="endedVideo">
              <source :src="modalData.sourceUri" type="video/mp4" />
            </video>
          </div>
          <div class="video-controls" id="video-controls">
            <div class="bottom-controls">
              <div class="left-controls">
                <div class="time">
                  <time id="time-elapsed" datetime="00m 00s">{{ displayTime }}</time>
                </div>
              </div>

              <div class="right-controls">
                <div class="volume-controls">
                  <button data-title="Mute (m)" class="volume-button" id="volume-button" @click="toggleMute">
                    <div class="volumn-btn">
                      <use class="mute" :class="{ hidden: !isMuted }" href="#volume-mute"></use>
                      <use class="high" :class="{ hidden: isMuted }" href="#volume-high"></use>
                    </div>
                  </button>
                  <!--                  <input class="volume" id="volume" value="1" data-mute="0.5" type="range" max="1" min="0" step="0.01">-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn" v-show="!forcePlayFlag && modalButtonShow">
      <a href="#" @click.prevent="closeModal">확인</a>
    </div>
    <div class="btn" v-show="forcePlayFlag && modalButtonShow">
      <p>{{ forcePlayTimeLeft }}초 후 SKIP</p>
    </div>
  </vue-final-modal>
  <a-scene
    v-else-if="showModal && modalType === '3D'"
    embedded
    renderer="gammaInput: true; gammaOutput: false; physicallyCorrectLights: false;"
    color-space="sRGB"
    vr-mode-ui="enabled: false"
    device-orientation-permission-ui="enabled: false"
    debug="false"
    :class="templateTypeClass"
    class="bridge_3d"
    @click="clickObject"
  >
    <a-assets>
      <a-asset-item id="bridge3D" :src="src" />
    </a-assets>

    <a-entity position="0 0 -2">
      <a-gltf-model v-bind="attrs" animation-mixer />
    </a-entity>

    <a-entity camera="zoom: 2.5; " position="0 0 -1" cursor="rayOrigin: mouse; fuse: false"> </a-entity>
    <div class="dimmed_bg_lightdark"></div>
  </a-scene>
</template>

<script>
import { computed, ref, toRefs } from "vue";
import { useStore } from "vuex";
import { getBridgeObjectAttrs } from "@/js/arObject";

export default {
  name: "EventBridge",
  emits: ["close:modal"],
  props: {
    bridgeList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props, { emit }) {
    // 브릿지 데이터
    const { getters } = useStore();
    const { bridgeList } = toRefs(props);
    const modalData = ref(null);
    const modalType = ref(null);
    const modalDirection = ref(null);
    const attrs = ref(null);
    const src = ref(null);
    const templateTypeClass = computed(() => (getters["eventData/templateType"] === "SCANNING" ? "scanning" : ""));

    // vidoe element
    const vidoeEl = ref(null);
    // 모달 flag
    const showModal = ref(false);
    // video 음소거 flag
    const isMuted = ref(true);
    // 재생시간
    const displayTime = ref("00:00");
    // 팝업 삭제시간
    const playTime = ref(0);

    const forcePlayFlag = ref(true);

    const forcePlayTimeLeft = ref(0);

    const playing = ref(false);

    const modalButtonShow = computed(() => {
      return modalType.value === "VIDEO" ? playing.value : true;
    });

    let timeout;

    let interval;

    // 팝업 오픈
    const openModal = (itemID) => {
      modalData.value = bridgeList.value.find((item) => item.itemID === itemID);
      modalType.value = modalData.value.bridgeType;

      if (modalData.value.forcePlay === "Y") {
        forcePlayFlag.value = true;
        forcePlayTimeLeft.value = modalData.value.forcePlayTime;
      } else {
        forcePlayFlag.value = false;
      }

      if (modalType.value === "NONE") {
        showModal.value = false;
      } else {
        showModal.value = true;
      }

      playTime.value = !isNaN(parseFloat(modalData.value.playTime)) && parseFloat(modalData.value.playTime) !== 0 ? parseFloat(modalData.value.playTime) : 3;

      if (!showModal.value) {
        closeModal();
      }

      if (modalType.value !== "3D") {
        modalDirection.value = modalData.value.bridgeDirection;
      }

      if (modalType.value === "3D") {
        src.value = modalData.value.sourceUri;
        attrs.value = getBridgeObjectAttrs(modalData.value);
        autoClose();
      }
    };

    const opened = () => {
      if (modalType.value === "VIDEO") {
        vidoeEl.value.play();

        if (modalData.value.forcePlay === "Y") {
          forcePlayVideo();
        }
      }

      if (modalType.value !== "VIDEO") {
        autoClose();
      }
    };

    const autoClose = () => {
      timeout = setTimeout(() => {
        closeModal();
      }, playTime.value * 1000);
    };

    const closeModal = () => {
      if (modalType.value === "VIDEO") {
        vidoeEl.value.pause();
      }

      if (modalType.value !== "VIDEO") {
        clearTimeout(timeout);
      }
      showModal.value = false;
      emit("close:modal", { itemID: modalData.value.itemID });
    };

    const timeUpdate = (e) => {
      const { target } = e;
      if (target.currentTime < 1) {
        playing.value = true;
      }
      const time = Math.round(target.duration - target.currentTime);
      const min = parseInt(time / 60) || 0;
      const sec = parseInt(time % 60) || 0;
      displayTime.value = `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
    };

    const toggleMute = () => {
      isMuted.value = !isMuted.value;
    };

    const endedVideo = () => {
      closeModal();
    };

    const clickObject = () => {
      closeModal();
    };

    const forcePlayVideo = () => {
      interval = setInterval(() => {
        forcePlayTimeLeft.value -= 1;
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
        forcePlayFlag.value = false;
      }, modalData.value.forcePlayTime * 1000);
    };

    return {
      forcePlayFlag,
      forcePlayTimeLeft,
      modalData,
      modalType,
      showModal,
      isMuted,
      displayTime,
      modalDirection,
      attrs,
      src,
      templateTypeClass,

      vidoeEl,
      playing,
      modalButtonShow,
      openModal,
      opened,
      closeModal,
      timeUpdate,
      toggleMute,
      endedVideo,
      clickObject,
      forcePlayVideo,
    };
  },
};
</script>

<style scoped>
.dimmed_bg_lightdark {
  z-index: -1;
}
</style>
