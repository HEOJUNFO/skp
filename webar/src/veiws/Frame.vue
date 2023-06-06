<template>
  <div class="frame" :style="frameStyle">
    <div v-if="isCapturing" class="countdown">{{ countdown }}
    </div>
    <div v-if="exitModalVisible" class="modal">
      <div class="modal-content2">
        <p>AR포토를 종료하고 메인페이지로</p>
        <p>이동합니다.</p>
        <div class="button-container">
          <button class="round-button" @click="exit">나가기</button>
          <button class="round-button" @click="closeExitModal">취소</button>
        </div>
      </div>
    </div>
    <div class="top-bar" :style="barStyle" v-show="isBarVisible">
      <button v-if="!isCapturing && arFrameSettingYn === 'Y'">
        <span style="color: rgba(0, 0, 0, 0)">4:6</span>
      </button>
      <button v-if="!isCapturing && arFrameSettingYn === 'N'" @click="toggleAspectRatio">
        <span v-if="aspectRatio === 0" style="font-size: 30px; font-weight: bold;">4:6</span>
        <span v-else-if="aspectRatio === 1" style="font-size: 30px; font-weight: bold;">1:1</span>
        <span v-else-if="aspectRatio === 2" style="font-size: 30px; font-weight: bold;">9:16</span>
        <span v-else-if="aspectRatio === 3" style="font-size: 30px; font-weight: bold;">FUll</span>
        <span v-show="aspectRatio === 4">
          <img src="../assets/icon/print-button.png" alt="전환" style="width: 30px; height: 30px;" />
        </span>
      </button>
      <button v-if="timerButtonVisible && !isCapturing" @click="toggleTimer">
        <span v-if="timerButtonVisible === 2">타이머3</span>
        <span v-else-if="timerButtonVisible === 3">타이머5</span>
        <span v-else-if="timerButtonVisible === 4">타이머7</span>
        <span v-else-if="timerButtonVisible === 1">타이머X</span>
      </button>
      <button v-if="!isCapturing" @click="flipCamera" style="margin-left: 100px; margin-right: 100px;">
        <img src="../assets/icon/right-left-button.png" alt="전환" style="width: 30px; height: 30px;" />
      </button>
      <button v-if="!isCapturing" @click="openExitModal">
        <img src="../assets/icon/close-button.png" alt="X" style="width: 30px; height: 40px;" />
      </button>
    </div>
    <iframe ref="iframeRef" :src="`${baseUrl}/ar.html#/frame`" frameborder="0"></iframe>
    <div v-show="!isSecondFrameBarVisible && !isSecondEffectBarVisible && isBarVisible" class="bottom-bar-1"
      :style="barStyle">
      <button v-if="!isCapturing" @click="frameToggleBar">
        <img v-if="arFrameSettingYn === 'Y'" src="../assets/icon/frame-button.png" alt="프레임"
          style="width: 40px; height: 40px;" />
        <p style="font-size: 17.5px; font-weight: bold;" :style="frameButtonStyle">프레임</p>
      </button>
      <button v-if="!isCapturing" @touchstart="startLongPress" @touchend="cancelLongPress" @click="capture">
        <img src="../assets/icon/circle-button.png" alt="촬영" style="width: 55px; height: 60px;" />
      </button>
      <button v-if="isCapturing" @click="stopCapture" class="capture-button">타이머 촬영 종료</button>
      <button v-if="!isCapturing" @click="effectToggleBar">
        <img src="../assets/icon/star-button.png" alt="이펙트" style="width: 45px; height: 40px;" />
        <p style="font-size: 17.5px; font-weight: bold;">이펙트</p>
      </button>
    </div>
    <div v-if="isSecondFrameBarVisible && isBarVisible" class="bottom-bar-2" :style="barStyle">
      <div class="tab-container">
        <button class="tab" v-for="tab in frameTabs" :key="tab.id" :class="{ selected: selectedTab === tab.id }"
          @click="selectTab(tab.id)">{{ tab.name }}</button>
      </div>
      <div class="image-container">
        <div class="image-view" v-for="image in getImagesForSelectedTab(frameList)" :key="image.id">
          <img :src="image.src" @click="selectImage(frameList, image.id)" class="frame-image" />
          <img v-show="image.select" src="../assets/icon/check-icon.png" alt="선택"
            style="width: 40px; height: 40px; position: absolute; top: 25%" />
          <span>{{ image.name }}</span>
        </div>
      </div>
      <div class="button-container">
        <button @click="frameToggleBar">
          <img src="../assets/icon/bar-down-button.png" alt="내리기" style="width: 40px; height: 40px;" />
        </button>
        <button v-if="!isCapturing" @touchstart="startLongPress" @touchend="cancelLongPress" @click="capture">
          <img src="../assets/icon/circle-button.png" alt="촬영" style="width: 35px; height: 40px;" />
        </button>
        <button style="color: rgba(0, 0, 0, 0)"> 더미</button>
        <button v-if="isCapturing" @click="stopCapture" class="capture-button">타이머 촬영 종료</button>
      </div>
    </div>
    <div v-if="isSecondEffectBarVisible && isBarVisible" class="bottom-bar-2" :style="barStyle">
      <div class="tab-container">
        <button class="tab" v-for="tab in effectTabs" :key="tab.id" :class="{ selected: selectedTab === tab.id }"
          @click="selectTab(tab.id)">{{ tab.name }}</button>
      </div>
      <div class="image-container">
        <div class="image-view"
          v-for="image in getImagesForSelectedTab(selectedTab === 1 ? characterList : selectedTab === 2 ? filterList : stickerList)"
          :key="image.id">
          <img :src="image.src"
            @click="selectImage(selectedTab === 1 ? characterList : selectedTab === 2 ? filterList : stickerList, image.id)"
            class="frame-image" />
          <img v-show="image.select" src="../assets/icon/check-icon.png" alt="선택"
            style="width: 40px; height: 40px; position: absolute; top: 25%" />
          <span>{{ image.name }}</span>
        </div>
      </div>
      <div class="button-container">
        <button @click="effectToggleBar">
          <img src="../assets/icon/bar-down-button.png" alt="내리기" style="width: 40px; height: 40px;" />
        </button>
        <button v-if="!isCapturing" @touchstart="startLongPress" @touchend="cancelLongPress" @click="capture">
          <img src="../assets/icon/circle-button.png" alt="촬영" style="width: 35px; height: 40px;" />
        </button>
        <button style="color: rgba(0, 0, 0, 0)"> 더미</button>
        <button v-if="isCapturing" @click="stopCapture" class="capture-button">타이머 촬영 종료</button>
      </div>
    </div>
  </div>
</template>

<script>

import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Frame",
  setup() {
    const router = useRouter();
    const iframeRef = ref(null);
    const isSecondFrameBarVisible = ref(false);
    const isSecondEffectBarVisible = ref(false);
    const isBarVisible = ref(false);
    const exitModalVisible = ref(false);
    const aspectRatio = ref(0);
    const selectedTab = ref(1);
    const longPressTimer = ref(null);
    const timerButtonVisible = ref(0);
    const isCapturing = ref(false);
    const countdown = ref(null);
    const countdownInterval = ref(null);
    const isPhotoRatioSettingType = ref(null);
    const aspectRatioValue = ref('4 / 6');
    const arFrameSettingYn = ref('Y');
    const arFilterSettingYn = ref('Y');
    const arCharacterSettingYn = ref('Y');
    const arStickerSettingYn = ref('Y');

    const frameTabs = ref([
      { id: 1, name: '배경' },
    ]);

    const frameList = ref([]);

    const effectTabs = ref([]);

    const characterList = ref([]);
    const filterList = ref([]);
    const stickerList = ref([]);

    const getEffectTabs = () => {
      const tabs = [];
      if (arCharacterSettingYn.value === 'Y') {
        tabs.push({ id: 1, name: '캐릭터' });
      }
      if (arFilterSettingYn.value === 'Y') {
        tabs.push({ id: 2, name: '필터' });
      }
      if (arStickerSettingYn.value === 'Y') {
        tabs.push({ id: 3, name: '스티커' });
      }
      return tabs;
    }

    window.toggleBarVisibility = function () {
      if (iframeRef.value) {
        isPhotoRatioSettingType.value = iframeRef.value.contentWindow.photoRatioSettingType()
        arFrameSettingYn.value = iframeRef.value.contentWindow.arFrameSettingYn()
        arFilterSettingYn.value = iframeRef.value.contentWindow.arFilterSettingYn()
        arCharacterSettingYn.value = iframeRef.value.contentWindow.arCharacterSettingYn()
        arStickerSettingYn.value = iframeRef.value.contentWindow.arStickerSettingYn()
        frameList.value = iframeRef.value.contentWindow.createFrameList();
        characterList.value = iframeRef.value.contentWindow.createEffectList().characterList;
        filterList.value = iframeRef.value.contentWindow.createEffectList().filterList;
        stickerList.value = iframeRef.value.contentWindow.createEffectList().stickerList;
      }
      aspectRatioValue.value = isPhotoRatioSettingType.value === 'BASIC' ? '4 / 6' : '1 / 2';
      isBarVisible.value = !isBarVisible.value;
    };

    window.reCapture = function () {
      aspectRatioValue.value = isPhotoRatioSettingType.value === 'BASIC' ? '4 / 6' : '1 / 2';
    };

    const toggleAspectRatio = () => {
      aspectRatio.value = (aspectRatio.value + 1) % 5
      if (aspectRatio.value === 0) {
        aspectRatioValue.value = isPhotoRatioSettingType.value === 'BASIC' ? '4 / 6' : '1 / 2';
      } else if (aspectRatio.value === 1) {
        aspectRatioValue.value = '1 / 1'
      } else if (aspectRatio.value === 2) {
        aspectRatioValue.value = '9 / 16'
      } else if (aspectRatio.value === 3) {
        aspectRatioValue.value = '1 / 2'
        if (iframeRef.value) {
          iframeRef.value.contentWindow.containTopValueToggle();
        }
      } else if (aspectRatio.value === 4) {
        aspectRatioValue.value = '814 / 1218'
      }
    };

    const flipCamera = () => {
      if (iframeRef.value) {
        iframeRef.value.contentWindow.flipCamera();
      }
    };

    const openExitModal = () => {
      exitModalVisible.value = true;
    };

    const closeExitModal = () => {
      exitModalVisible.value = false;
    };

    const exit = () => {

      router.back();
    };


    const startLongPress = () => {
      longPressTimer.value = setTimeout(() => {
        timerButtonVisible.value = 1;
      }, 1000);
    }

    const cancelLongPress = () => {
      clearTimeout(longPressTimer.value);
    }

    const toggleTimer = () => {
      timerButtonVisible.value = (timerButtonVisible.value + 1) % 5;
      if (timerButtonVisible.value === 0) {
        timerButtonVisible.value = 1;
      }
    }

    const capture = () => {
      if (timerButtonVisible.value === 0) {
        // No timer, just capture immediately
        captureImage();
      } else {
        isCapturing.value = true;
        countdown.value = [0, 0, 3, 5, 7][timerButtonVisible.value];
        if (iframeRef.value) {
          iframeRef.value.contentWindow.containTopValueToggle();
        }
        countdownInterval.value = setInterval(() => {
          countdown.value -= 1;
          if (countdown.value <= 0) {
            captureImage();
            stopCapture();
          }
        }, 1000);
      }
    };

    const stopCapture = () => {
      clearInterval(countdownInterval.value);
      isCapturing.value = false;
      if (iframeRef.value) {
        iframeRef.value.contentWindow.containTopValueToggle();
      }
    };

    const captureImage = () => {
      if (isCapturing.value || timerButtonVisible.value === 0) {
        if (iframeRef.value) {
          iframeRef.value.contentWindow.capture();
        }
        aspectRatioValue.value = '1 / 2.2'
      }
    };

    const frameToggleBar = () => {
      isSecondFrameBarVisible.value = !isSecondFrameBarVisible.value;
    }
    const effectToggleBar = () => {
      isSecondEffectBarVisible.value = !isSecondEffectBarVisible.value;
      effectTabs.value = getEffectTabs();

    }

    const selectTab = (tabId) => {
      selectedTab.value = tabId;
    }

    const getImagesForSelectedTab = (images) => {
      return images
    }

    const selectImage = (images, imageId) => {
      images.forEach(image => {
        image.select = false;
      });

      const selectedImage = images.find(image => image.id === imageId);
      if (selectedImage) selectedImage.select = true;
    }

    const frameStyle = computed(() => ({
      aspectRatio: aspectRatioValue.value,
    }));

    const barStyle = computed(() => ({
      backgroundColor: aspectRatio.value === 3 ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)',
    }));

    const frameButtonStyle = computed(() => ({
      color: arFrameSettingYn.value === 'Y' ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0)',
    }));

    function watchAndSelect(list, selectFuncName) {
      watch(list, () => {
        let selectedItem = list.value.find(item => item.select === true);
        iframeRef.value.contentWindow[selectFuncName](selectedItem.id);
      }, { deep: true });
    }

    watchAndSelect(frameList, 'selectFrame');
    watchAndSelect(characterList, 'selectCharacter');
    watchAndSelect(filterList, 'selectFilter');
    watchAndSelect(stickerList, 'selectSticker');

    return {
      baseUrl: process.env.VUE_APP_PAGE_PATH
      , iframeRef
      , toggleAspectRatio
      , flipCamera
      , openExitModal
      , isSecondFrameBarVisible
      , isSecondEffectBarVisible
      , frameToggleBar
      , effectToggleBar
      , capture
      , isBarVisible
      , frameStyle
      , barStyle
      , frameButtonStyle
      , frameTabs
      , frameList
      , effectTabs
      , characterList
      , stickerList
      , filterList
      , selectTab
      , getImagesForSelectedTab
      , selectImage
      , selectedTab
      , stopCapture
      , captureImage
      , isCapturing
      , startLongPress
      , cancelLongPress
      , toggleTimer
      , timerButtonVisible
      , countdown
      , aspectRatio
      , exitModalVisible
      , closeExitModal
      , exit
      , arFrameSettingYn
      , arFilterSettingYn
      , arCharacterSettingYn
      , arStickerSettingYn
    }
  }
}
</script>
  
<style scoped>
.frame {
  position: absolute;
  width: 100%;
  height: auto;
  background: #f9f9f9;
}

.frame-image {
  width: 100%;
  height: 100%;

}

.top-bar,
.bottom-bar-1,
.bottom-bar-2 {
  z-index: 1;
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
}

.bottom-bar-1 {
  top: 100%;
  padding-top: 1%;
  padding-bottom: 1%;

}

.bottom-bar-2 {
  top: 73%;
  padding-top: 1%;
  padding-bottom: 1%;
}

.bottom-bar-2 {
  flex-direction: column;

}

.tab-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 2%;
}

.image-container {
  display: flex;
  overflow-x: auto;
  width: 100%;
  gap: 1%;
  margin-bottom: 4%;
}

.image-container::-webkit-scrollbar {
  height: 1%;
}

.image-view {
  position: relative;
  flex: 0 0 auto;
  width: 24%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000;
}

.image-view>span {
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  font-size: 0.9.5rem;
}

.button-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.tab.selected {
  background-color: #ccc;
}

.tab {
  margin: 0 10%;
}

.image-view.selected {
  border: 2px solid blue;
}

.countdown {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3em;
  color: #fff;
  z-index: 2;
}

.modal {
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content2 {
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  text-align: center;
  background-color: #fff;
  color: #000;
}


.round-button {
  display: inline-block;
  border-radius: 10px;
  width: 30%;
  height: 30px;

  border: 2px solid #000;
  background-color: #fff;
  color: #000;
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%;
}

.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>