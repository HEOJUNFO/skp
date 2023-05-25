<template>
  <div class="frame" :style="frameStyle">
    <div v-if="isCapturing" class="countdown">{{ countdown }}</div>
    <div class="top-bar" v-show="isBarVisible">
        <button v-if="!isCapturing" @click="toggleAspectRatio">비율 전환</button>
        <button v-if="timerButtonVisible && !isCapturing " @click="toggleTimer">
          <span v-if="timerButtonVisible === 2">타이머3</span>
          <span v-else-if="timerButtonVisible === 3">타이머5</span>
          <span v-else-if="timerButtonVisible === 4">타이머7</span>
          <span v-else-if="timerButtonVisible=== 1">타이머X</span>
        </button>       
        <button v-if="!isCapturing" @click="flipCamera">좌우반전</button>
        <button v-if="!isCapturing" @click="openExitModal">나가기</button>
      </div>
    <iframe ref="iframeRef" :src="`${baseUrl}/basic.html#/frame`" frameborder="0"></iframe>
    <div v-if="!isSecondBarVisible && isBarVisible" class="bottom-bar-1">
      <button v-if="!isCapturing" @click="toggleBar">아이템</button>
      <button v-if="!isCapturing" @touchstart="startLongPress" @touchend="cancelLongPress" @click="capture">촬영</button>
      <button v-if="isCapturing" @click="stopCapture" class="capture-button">타이머 촬영 종료</button>
  </div>
  <div v-if="isSecondBarVisible && isBarVisible " class="bottom-bar-2">
    <div class="tab-container">
        <button class="tab" 
                v-for="tab in tabs" 
                :key="tab.id"
                :class="{ selected: selectedTab === tab.id }"
                @click="selectTab(tab.id)">{{ tab.name }}</button>
      </div>
      <div class="image-container">
        <div class="image-view" 
        v-for="image in getImagesForSelectedTab()" 
        :key="image.id"
        :class="{ selected: image.select }">  <!-- 선택된 이미지에 클래스를 적용 -->
     <img :src="image.src" @click="selectImage(image.id)"/>
     <span>{{ image.name }}</span>
  </div>
  </div>
      <div class="button-container">
        <button @click="toggleBar">나가기</button>
        <button v-if="!isCapturing" @touchstart="startLongPress" @touchend="cancelLongPress" @click="capture">촬영</button>
        <button v-if="isCapturing" @click="stopCapture" class="capture-button">타이머 촬영 종료</button>
      </div>
    </div>
  </div>
 </template>

<script>
import {ref, computed, watch} from "vue";
import { useRouter } from 'vue-router'

  export default {
    name: "Frame",
    setup() {
      const router = useRouter();
      const iframeRef = ref(null);
      const isSecondBarVisible = ref(false);
      const isBarVisible = ref(false);
      const aspectRatio = ref('3 / 4');
      const selectedTab = ref(1);

      const longPressTimer = ref(null);
      const timerButtonVisible = ref(0);
      const isCapturing = ref(false);
      const countdown = ref(null);
      const countdownInterval = ref(null);

      const tabs = ref([
      { id: 1, name: '프레임' },
      { id: 2, name: '모델' },
      { id: 3, name: 'AR 필터' },
    ]);
    
    const images = ref([
      { id: 1, tabId:1, frameId: 1,src: '/path/to/image1', name: 'Image 1',select: true },
      { id: 2, tabId:1, frameId: 2,src: '/path/to/image2', name: 'Image 2' ,select: false},
      { id: 3, tabId:1, frameId: 3,src: '/path/to/image3', name: 'Image 3',select: false },
      { id: 4, tabId:1, frameId: 4,src: '/path/to/image4', name: 'Image 4', select:false },
      { id: 5, tabId:2, modelId: 1, src: '/path/to/model1', name: 'Model 1',select: true },
      { id: 6, tabId:2, modelId: 2,src: '/path/to/model2', name: 'Model 2' ,select: false},
      { id: 7, tabId:2, modelId: 3,src: '/path/to/model3', name: 'Model 3',select: false },
      { id: 8, tabId:2, modelId: 4,src: '/path/to/model4', name: 'Model 4', select:false },
    ]);


      const frameStyle = computed(() => ({
      aspectRatio: aspectRatio.value
   
      }));

       window.toggleBarVisibility = function() {
      isBarVisible.value = !isBarVisible.value;
      };

      const toggleAspectRatio = () => {
        aspectRatio.value = aspectRatio.value === '3 / 4' ? '1 / 2' : '3 / 4';
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

      const capture = () => {
        if (timerButtonVisible.value === 0) {
        // No timer, just capture immediately
        captureImage();
      } else {
        isCapturing.value = true;
        countdown.value = [ 0, 0,3, 5, 7][timerButtonVisible.value];

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
      };

      const captureImage = () => {
        if(isCapturing.value || timerButtonVisible.value === 0){
                let captureurl = '';
                if (iframeRef.value) {
                    captureurl = iframeRef.value.contentWindow.capture();
                }
                router.push({ name: 'Print', params: { data: captureurl } });
            }
      
      };

      const toggleBar = () => {
      isSecondBarVisible.value = !isSecondBarVisible.value;
    }

    const selectTab = (tabId) => {
      selectedTab.value = tabId;
    
    }

    const getImagesForSelectedTab = () => {
      return images.value.filter(image => image.tabId === selectedTab.value);
    }

    const selectImage = (imageId) => {
      images.value.forEach(image => {  // Use .value with ref
        if (image.tabId === selectedTab.value) {  // Use .value with ref
          image.select = (image.id === imageId);
          console.log(images.value[0].select, images.value[1].select, images.value[2].select, images.value[3].select
            , images.value[4].select, images.value[5].select, images.value[6].select, images.value[7].select)
        }
      });
    }

    const selectedModelImage = computed(() => images.value.find(image => image.tabId === 2 && image.select === true));

    watch(selectedModelImage, (newImage, oldImage) => {
      if (newImage !== oldImage && newImage !== null) {
        iframeRef.value.contentWindow.selectModel(newImage.modelId);
      }
    });

    const selectedFrameImage = computed(() => images.value.find(image => image.tabId === 1 && image.select === true));

    watch(selectedFrameImage, (newImage, oldImage) => {
      if (newImage !== oldImage && newImage !== null) {
        iframeRef.value.contentWindow.selectFrame(newImage.frameId);
      }
    });

      return {
        baseUrl: process.env.VUE_APP_PAGE_PATH
        , iframeRef
        , toggleAspectRatio
        , flipCamera
        , openExitModal
        , isSecondBarVisible
        , toggleBar
        , capture
        , isBarVisible
        , frameStyle
        , tabs
        , images
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
  
.top-bar, .bottom-bar-1, .bottom-bar-2 {
  z-index: 1;
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  color: #fff;
}

.bottom-bar-1, .bottom-bar-2 {
  bottom: -40px;
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