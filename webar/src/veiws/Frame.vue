<template>
  <div class="frame" :style="frameStyle">
    <div class="top-bar" v-show="isBarVisible">
        <button @click="toggleAspectRatio">비율 전환</button>
        <button @click="flipCamera">좌우반전</button>
        <button @click="openExitModal">나가기</button>
      </div>
    <iframe ref="iframeRef" :src="`${baseUrl}/basic.html#/frame`" frameborder="0"></iframe>
    <div v-if="!isSecondBarVisible && isBarVisible" class="bottom-bar-1">
      <button @click="toggleBar">프레임</button>
      <button @click="capture">촬영</button>
  </div>
  
  <div v-if="isSecondBarVisible && isBarVisible" class="bottom-bar-2">
    <div class="tab-container">
        <button class="tab" 
                v-for="tab in tabs" 
                :key="tab.id"
                :class="{ selected: selectedTab === tab.id }"
                @click="selectTab(tab.id)">{{ tab.name }}</button>
      </div>
      <div class="image-container">
        <div class="image-view" v-for="image in getImagesForSelectedTab()" :key="image.id">
          <img :src="image.src" @click="selectImage(image.id)"/>
            <span>{{ image.name }}</span>
        </div>
      </div>
      <div class="button-container">
        <button @click="toggleBar">나가기</button>
        <button class="capture-button">촬영</button>
      </div>
    </div>
    
  
  </div>
  
 </template>

  <script>
import {ref, computed, watch} from "vue";


  export default {
    name: "Frame",
    components: {
   
    },
    setup() {
      const iframeRef = ref(null);
      const isSecondBarVisible = ref(false);
      const isBarVisible = ref(false);
      const aspectRatio = ref('3 / 4');
      const selectedTab = ref(1);

      const tabs = ref([
      { id: 1, name: '프레임' },
      { id: 2, name: '모델' },
      { id: 3, name: 'AR 필터' },
    ]);
    
    const images = ref([
      { id: 1, tabId:1, src: '/path/to/image1', name: 'Image 1',select: true },
      { id: 2, tabId:1,src: '/path/to/image2', name: 'Image 2' ,select: false},
      { id: 3, tabId:1, src: '/path/to/image3', name: 'Image 3',select: false },
      { id: 4, tabId:1, src: '/path/to/image4', name: 'Image 4', select:false },
      { id: 5, tabId:2, src: '/path/to/image1', name: 'Model 1',select: true },
      { id: 6, tabId:2,src: '/path/to/image2', name: 'Model 2' ,select: false},
      { id: 7, tabId:2, src: '/path/to/image3', name: 'Model 3',select: false },
      { id: 8, tabId:2, src: '/path/to/image4', name: 'Model 4', select:false },
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

      const capture = () => {
        if (iframeRef.value) {
            iframeRef.value.contentWindow.capture();
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
        }
      });
    }

    watch(images, (newImages) => {
  const selectedImage = newImages.find(image => image.select === true);
  if(selectedImage) {
    console.log(selectedImage.src);
  }
}, { deep: true })

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
  
    .top-bar {
    z-index: 1;
    position: absolute;
    top: 10;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    background-color: #fff;
    color: #fff;
  }

  .bottom-bar-1 {
    z-index: 1;
    position: absolute;
    bottom: -40px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    background-color: #fff;
    color: #fff;
  }

  .bottom-bar-2 {
    z-index: 1;
    position: absolute;
    bottom: -40px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    background-color: #fff;
    color: #fff;
  }

  .tab-container {
  display: flex;
  justify-content: center; /* Change this from 'space-between' */
  width: 100%;
  margin-bottom: 20px;
}
  
  .image-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    width: 100%;
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

.down-button, .capture-button {
  margin-top: 20px;
}

.tab.selected {
  background-color: #ccc;
}

  </style>