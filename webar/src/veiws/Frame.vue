<template>
  <div class="frame" :style="frameStyle">
    <div v-if="isCapturing" class="countdown">{{ countdown }}
    </div>
      <div class="top-bar" :style="barStyle" v-show="isBarVisible" >
        <button v-if="!isCapturing" @click="toggleAspectRatio">
          <span v-if="aspectRatio ===0" style="font-size: 30px; font-weight: bold;" >3:4</span>
          <span v-else-if="aspectRatio ===1" style="font-size: 30px; font-weight: bold;">1:1</span>
          <span v-else-if="aspectRatio ===2" style="font-size: 30px; font-weight: bold;">9:16</span>
          <span v-else-if="aspectRatio ===3" style="font-size: 30px; font-weight: bold;">FUll</span>
          <span v-else-if="aspectRatio ===4" >
            <img src="../assets/icon/print-button.png" alt="전환" style="width: 30px; height: 30px;"   />
          </span>
        </button>
        <button v-if="timerButtonVisible && !isCapturing " @click="toggleTimer">
          <span v-if="timerButtonVisible === 2">타이머3</span>
          <span v-else-if="timerButtonVisible === 3">타이머5</span>
          <span v-else-if="timerButtonVisible === 4">타이머7</span>
          <span v-else-if="timerButtonVisible=== 1">타이머X</span>
        </button>       
        <button v-if="!isCapturing" @click="flipCamera" style="margin-left: 100px; margin-right: 100px;">
          <img src="../assets/icon/right-left-button.png" alt="전환" style="width: 30px; height: 30px;"   />
        </button>
        <button v-if="!isCapturing" @click="openExitModal" >
          <img src="../assets/icon/close-button.png" alt="X" style="width: 30px; height: 40px;"   />
        </button>
      </div>
    <iframe ref="iframeRef" :src="`${baseUrl}/ar.html#/frame`" frameborder="0"></iframe>
    <div v-if="!isSecondFrameBarVisible && isBarVisible" class="bottom-bar-1" :style="barStyle">
      <button v-if="!isCapturing" @click="frameToggleBar">
        <img src="../assets/icon/frame-button.png" alt="프레임" style="width: 40px; height: 40px;" />
        <p style="font-size: 17.5px; font-weight: bold;">프레임</p>
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
    <div v-if="isSecondFrameBarVisible && isBarVisible " class="bottom-bar-2" :style="barStyle">
      <div class="tab-container">
        <button class="tab" 
                v-for="tab in frameTabs" 
                :key="tab.id"
                :class="{ selected: selectedTab === tab.id }"
                @click="selectTab(tab.id)">{{ tab.name }}</button>
      </div>
      <div class="image-container">
        <div class="image-view" 
        v-for="image in getImagesForSelectedTab(frameImages)" 
        :key="image.id"
        :class="{ selected: image.select }">  <!-- 선택된 이미지에 클래스를 적용 -->
        <img :src="image.src" @click="selectImage(frameImages,image.id)" class="frame-image"/>
        <span>{{ image.name }}</span>
        </div>
      </div>
      <div class="button-container">
        <button @click="frameToggleBar">나가기</button>
        <button v-if="!isCapturing" @touchstart="startLongPress" @touchend="cancelLongPress" @click="capture">촬영</button>
        <button v-if="isCapturing" @click="stopCapture" class="capture-button">타이머 촬영 종료</button>
      </div>
    </div>
    <div v-if="isSecondEffectBarVisible && isBarVisible " class="bottom-bar-2" :style="barStyle">
      <div class="tab-container">
        <button class="tab" 
                v-for="tab in effectTabs" 
                :key="tab.id"
                :class="{ selected: selectedTab === tab.id }"
                @click="selectTab(tab.id)">{{ tab.name }}</button>
      </div>
      <div class="image-container">
        <div class="image-view" 
        v-for="image in getImagesForSelectedTab(effectImages)" 
        :key="image.id"
        :class="{ selected: image.select }">  <!-- 선택된 이미지에 클래스를 적용 -->
        <img :src="image.src" @click="selectImage(effectImages,image.id)"/>
        <span>{{ image.name }}</span>
        </div>
      </div>
      <div class="button-container">
        <button @click="effectToggleBar">나가기</button>
        <button v-if="!isCapturing" @touchstart="startLongPress" @touchend="cancelLongPress" @click="capture">촬영</button>
        <button v-if="isCapturing" @click="stopCapture" class="capture-button">타이머 촬영 종료</button>
      </div>
    </div>
  </div>
 </template>

<script>
import {ref, computed, watch} from "vue";

  export default {
    name: "Frame",
    setup() {
      const iframeRef = ref(null);
      const isSecondFrameBarVisible = ref(false);
      const isSecondEffectBarVisible = ref(false);
      const isBarVisible = ref(false);
      const aspectRatio = ref(0);
      const aspectRatioValue = ref('3 / 4');
      const selectedTab = ref(1);

      const longPressTimer = ref(null);
      const timerButtonVisible = ref(0);
      const isCapturing = ref(false);
      const countdown = ref(null);
      const countdownInterval = ref(null);

      const frameTabs = ref([
      { id: 1, name: '축제1' },
      { id: 2, name: '축제2' },
      { id: 3, name: '축제3' },
    ]);
    
    const frameImages = ref([
      { id: 1, tabId:1, src: '', name: '',select: true },
      { id: 2, tabId:1, src: '', name: '' ,select: false},
      { id: 3, tabId:1, src: '', name: '',select: false },
      { id: 4, tabId:1, src: '', name: '', select:false },
    ]);

    const effectTabs = ref([
      { id: 1, name: '모델' },
      { id: 2, name: '이펙트' },
      { id: 3, name: '필터' },
    ]);
    
    const effectImages = ref([
      { id: 1, tabId:1, src: '/path/to/image1', name: 'model 1',select: true },
      { id: 2, tabId:1, src: '/path/to/image2', name: 'model 2' ,select: false},
      { id: 3, tabId:1, src: '/path/to/image3', name: 'model 3',select: false },
      { id: 4, tabId:1, src: '/path/to/image4', name: 'model 4', select:false },
      { id: 5, tabId:2, src: '/path/to/model1', name: 'effect 1',select: true },
      { id: 6, tabId:2, src: '/path/to/model2', name: 'effect 2' ,select: false},
      { id: 7, tabId:2, src: '/path/to/model3', name: 'effect 3',select: false },
      { id: 8, tabId:2, src: '/path/to/model4', name: 'effect 4', select:false },
    ]);

      const toggleAspectRatio = () => {
        aspectRatio.value = (aspectRatio.value + 1) % 5
        if(aspectRatio.value === 0){
          aspectRatioValue.value = '3 / 4'
        } else if(aspectRatio.value === 1){
          aspectRatioValue.value = '1 / 1'
        } else if(aspectRatio.value === 2){
          aspectRatioValue.value = '9 / 16'
        } else if(aspectRatio.value === 3){
          aspectRatioValue.value = '1 / 2'
          if (iframeRef.value) {
            iframeRef.value.contentWindow.containTopValueToggle();
        }
        } else if(aspectRatio.value === 4){
          aspectRatioValue.value = '814 / 1218'
          if (iframeRef.value) {
            iframeRef.value.contentWindow.containTopValueToggle();
        }
        }
        };

      const frameStyle = computed(() => ({
      aspectRatio: aspectRatioValue.value,
      }));

      const barStyle = computed(() => ({
        backgroundColor: aspectRatio.value ===3 ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)',
        }));

       window.toggleBarVisibility = function() {
      isBarVisible.value = !isBarVisible.value;
      };


      const flipCamera = () => {
        if (iframeRef.value) {
            iframeRef.value.contentWindow.flipCamera();
        }
      };

      const openExitModal = () => {
        if (iframeRef.value) {
            iframeRef.value.contentWindow.openExitModal();
        }
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
        if(timerButtonVisible.value === 0) {
          timerButtonVisible.value = 1;
        }
      }

      const capture = async () => {
        if (timerButtonVisible.value === 0) {
        // No timer, just capture immediately
        await captureImage();
      } else {
        isCapturing.value = true;
        countdown.value = [ 0, 0,3, 5, 7][timerButtonVisible.value];
        if (iframeRef.value) {
            iframeRef.value.contentWindow.containTopValueToggle();
        }
        countdownInterval.value = setInterval(async() => {
            countdown.value -= 1;
            if (countdown.value <= 0) {
              await captureImage();
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

      const captureImage = async () => {
        if(isCapturing.value || timerButtonVisible.value === 0){
                if (iframeRef.value) {
                   await iframeRef.value.contentWindow.capture();
                }
            aspectRatioValue.value = '1 / 2.2'
            }
      };

    const frameToggleBar = () => {
      isSecondFrameBarVisible.value = !isSecondFrameBarVisible.value;
      if (iframeRef.value) {
          frameImages.value = iframeRef.value.contentWindow.createFrameImages();
          console.log(frameImages.value)
        }
       
    }
    const effectToggleBar = () => {
      isSecondEffectBarVisible.value = !isSecondEffectBarVisible.value;
    }

    const selectTab = (tabId) => {
      selectedTab.value = tabId;
    
    }

    const getImagesForSelectedTab = (images) => {

  return images.filter(image => image.tabId === selectedTab.value);
}

const selectImage = (images, imageId) => {
 images.forEach(image => {
    image.select = false;
  });

  const selectedImage = images.find(image => image.id === imageId);
  if (selectedImage) selectedImage.select = true;
}
const frameTabIds = frameTabs.value.map(tab => tab.id);

for (let tabId of frameTabIds) {
    const selectedFrameImage = computed(() => 
        frameImages.value.find(image => tabId && image.select === true)
    );
    watch(selectedFrameImage, (newImage, oldImage) => {
        if (newImage !== oldImage && newImage !== null) {
           newImage.id = (newImage.tabId - 1) * 4 + (newImage.id % 4 === 0 ? 4 : newImage.id % 4);
            iframeRef.value.contentWindow.selectFrame(newImage.id);
        }
    });
}

const effectTabIds = effectTabs.value.map(tab => tab.id);

for (let tabId of effectTabIds) {
    const selectedEffectImage = computed(() => 
        effectImages.value.find(image => image.tabId === tabId && image.select === true)
    );

    watch(selectedEffectImage, (newImage, oldImage) => {
        if (newImage !== oldImage && newImage !== null) {
          newImage.id = newImage.id % 4 === 0 ? 4 : newImage.id % 4
            iframeRef.value.contentWindow.selectModel(newImage.id);
        }
    });
}

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
        , frameTabs
        , frameImages
        , effectTabs
        , effectImages
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
     
      }
    }
  }
  </script>
  
  <style scoped>
.frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  background: #f9f9f9;
}

.frame-image {
  width: 100%;
  height: 100%;
  
}
  
.top-bar, .bottom-bar-1, .bottom-bar-2 {
  z-index: 1;
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
}
.top-bar {
  padding: 0px;
}
.bottom-bar-1, .bottom-bar-2 {
  bottom: -70px;
  padding-top: 10px;
  padding-bottom: 10px;
  
}

.bottom-bar-2{
  flex-direction: column;
  
}

.tab-container {
  display: flex;
  justify-content: center; 
  width: 100%;
  margin-bottom: 20px;
}
  
.image-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;
  margin-bottom: 20px;
}

.image-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  color : #000;
}

.image-view > span {
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 긴 텍스트가 상자를 넘어가지 않도록 함 */
  max-width: 100%; /* 상자의 최대 너비에 맞춤 */
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
    margin: 0 35px;
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
  </style>