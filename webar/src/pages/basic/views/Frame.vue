<template>
    <container ref="containerEl" >
      <div v-if="isNaverBrowser" class="browser-change-modal">
        <p>네이버 브라우저에서는 일부 기능이 작동하지 않을 수 있습니다.</p>
        <p>다른 브라우저를 사용해주세요.</p>
        <button @click="closeBrowserChangeModal">브라우저 변경하기</button>
    </div>
      <div v-if="exitModalVisible" class="exit-modal">
        <p>정말로 나가시겠습니까?</p>
        <button @click="exit">나가기</button>
        <button @click="closeExitModal">취소</button>
    </div>
      <camera ref="cameraRef" @loadeddata="loadVideo" @reject:video="rejectVideo"/>
      <tutorial-popup v-if="tutorialPopup" @close="tutorialPopup = false"></tutorial-popup>
      <template v-if="loadedVideo">
        <event-drag-n-drop-object
            v-if="arObjectInfoList"
            :object-list="arObjectInfoList"
            :asset-list="arAssetInfoList"
            :target-info="arDropTargetInfo"
            @load:scene="loadScene"
            @dragstart:object="dragStart"
            @dragend:object="dragEnd"
            @allow:orientationpermission="allowOrientationPermission"
            @reject:orientationpermission="rejectOrientationPermission"
            @request:orientationpermission="rquestOrientationPermission"
            @animationcomplete="animationComplete"
        />
      </template>
    </container>
  </template>
  
  <script>
  import {onMounted, ref, watch, computed} from "vue";
  import {useStore} from "vuex";
  import { useRouter } from 'vue-router'
  
  import Container from "@/components/common/Container";
  import EventDragNDropObject from "@/components/common/EventDragNDropObject";
  import Camera from "@/components/common/Camera";
  import TutorialPopup from "@/components/common/TutorialPopup";
  
  import useArObjectInfo from "@/composables/useArObjectInfo";
  import useEventData from "@/composables/useEventData";
  import useResultData from "@/composables/useResultData";
  import useLoading from "@/composables/useLoading";
  import useEventHandlers from "@/composables/useEventHandlers";
  
  export default {
    name: "Frame",
    components: {
      Camera,
      EventDragNDropObject,
      Container,
      TutorialPopup,
    },
    setup() {
      const router = useRouter();
      const store = useStore();
      const {dispatch, getters} = store;
      const templateType = ref(null);
      const loadedVideo = ref(false);
      const tutorialPopup = ref(false);
      const completeModalEl = ref(null);
      const containerEl = ref(null);
      const cameraRef = ref(null);
      const exitModalVisible = ref(false);

    
      const isNaverBrowser = computed(() => {
      return /NAVER/.test(navigator.userAgent);
    });

    const browserChangeModalVisible = ref(isNaverBrowser.value);

    const closeBrowserChangeModal = () => {
      BrowserChange();
      browserChangeModalVisible.value = false;
    };

    const BrowserChange = () => {
      window.open('https://www.google.com/chrome/');
    }
  
      const {
        getEventData
      } = useEventData({dispatch});
    
      const {
        arObjectInfoList,
        arAssetInfoList,
        arDropTargetInfo,
        setArObjectInfoListFromStore,
      } = useArObjectInfo();

      const {
        eventResult,
      } = useResultData({getters, dispatch});
    
      const {
        loadingState,
        startLoading,
        completeLoading
      } = useLoading()

      const {
        dragStart,
        dragEnd,
        rejectVideo,
        loadScene,
        rquestOrientationPermission,
        allowOrientationPermission,
        rejectOrientationPermission,
      } = useEventHandlers();

       // video load complete
      const loadVideo = () => {
        loadedVideo.value = true;
      }

      window.flipCamera = function() {
        cameraRef.value.flipCamera();
      }

      window.openExitModal = function() {
        exitModalVisible.value = true;
      }

      window.capture = function() {
        return capture();
      }

      const capture = () => {
      // video canvas create
      const video = document.querySelector('.event-wrapper video');
      const canvas = document.createElement("canvas");
      video.pause();
      let v_width = video.clientWidth*2;
      let v_height = video.clientHeight*2;
      
      canvas.width = v_width;
      canvas.height = v_height;
      let element = video,
          style = window.getComputedStyle(element),
          top = style.getPropertyValue('top');
      canvas.getContext('2d').drawImage(video, 0, parseFloat(top), v_width, v_height);
      let imgData = document.querySelector('a-scene').components.screenshot.getCanvas('perspective');
      canvas.getContext('2d').drawImage(imgData, 0, 0, v_width, v_height);

      const imageUrl = canvas.toDataURL("image/png");
 
   

      return imageUrl;

    };

    const closeExitModal = () => {
      exitModalVisible.value = false;
    };

    const exit = () => {
      router.back();
    };

    const toggleBarVisibility = () => {
  window.parent.toggleBarVisibility();
};

      watch(loadingState, () => {
      if(loadingState.value === 'COUNTING') {
        setTimeout(() => {
          completeLoading()
          tutorialPopup.value = true;
          toggleBarVisibility();
        }, 5000)
      }
    })

      onMounted(async () => {
        await getEventData();
        templateType.value = getters['eventData/templateType'];
        setArObjectInfoListFromStore();
    
        startLoading();
       
      });
    
      return {
        arObjectInfoList,
        arAssetInfoList,
        arDropTargetInfo,
        eventResult,
        templateType,
        loadedVideo,
        loadingState,
        completeModalEl,
        containerEl,
        dragStart,
        dragEnd,
        startLoading,
        loadVideo,
        rejectVideo,
        loadScene,
        rquestOrientationPermission,
        allowOrientationPermission,
        rejectOrientationPermission,
        tutorialPopup,
        cameraRef,
        exitModalVisible,
        closeExitModal,
        exit,
        isNaverBrowser,
        browserChangeModalVisible,
        closeBrowserChangeModal,
        capture
      }
    }
  }
  </script>
  
  <style scoped>

  .exit-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.exit-modal p {
  font-size: 1.5em;
  color: white;
  margin-bottom: 1em;
}

.exit-modal button {
  display: block;
  margin: 1em auto;
  padding: 1em 2em;
  font-size: 1em;
  color: white;
  background-color: #007BFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.exit-modal button:hover {
  background-color: #0056b3;
}

.exit-modal button:active {
  background-color: #004085;
}
  </style>