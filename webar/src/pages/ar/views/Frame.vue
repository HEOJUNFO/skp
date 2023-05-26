<template>
    <container ref="containerRef" >
    <div v-if="isNaverBrowser" class="modal">
      <div class="modal-content2">
        <p>네이버 브라우저에서는 일부 기능이 작동하지 않을 수 있습니다.</p>
        <p>다른 브라우저를 사용해주세요.</p>
        <div class="button-container">
          <button class="round-button" @click="closeBrowserChangeModal">브라우저 변경하기</button>
        </div>     
      </div>
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
      <camera ref="cameraRef" @loadeddata="loadVideo" @reject:video="rejectVideo"/>
      <tutorial-popup v-if="tutorialPopup" @click="toggleBarVisibility" @close="tutorialPopup = false"></tutorial-popup>
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
  import {onMounted, ref,computed} from "vue";
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
      const cameraRef = ref(null);
      const containerRef = ref(null);
      const exitModalVisible = ref(false);

      const isNaverBrowser = computed(() => /NAVER/.test(navigator.userAgent));
      const browserChangeModalVisible = ref(isNaverBrowser);

      const changeBrowser = () => {
        window.open('https://www.google.com/chrome/');
        browserChangeModalVisible.value = false;
  };

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

      window.capture = async function() {
        return await capture();
      }

      window.containTopValueToggle = function() {
        if(containerRef.value.topValue === 40) {
          containerRef.value.topValue = 0;
        } else {
          containerRef.value.topValue = 40;
        }}

      const capture = async () => {
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
       containerRef.value.topValue = 40;
    };

    

      onMounted(async () => {
        await getEventData();
        templateType.value = getters['eventData/templateType'];
        setArObjectInfoListFromStore();

        startLoading();
      
        setTimeout(() => {
          completeLoading()
          tutorialPopup.value = true;
        }, 5000)
     
      });
    
      return {
        arObjectInfoList,
        arAssetInfoList,
        arDropTargetInfo,
        eventResult,
        templateType,
        loadedVideo,
        loadingState,
        dragStart,
        dragEnd,
        loadVideo,
        rejectVideo,
        loadScene,
        tutorialPopup,
        cameraRef,
        containerRef,
        exitModalVisible,
        closeExitModal,
        exit,
        isNaverBrowser,
        browserChangeModalVisible,
        changeBrowser,
        capture,
        toggleBarVisibility,
        rquestOrientationPermission,
        allowOrientationPermission,
        rejectOrientationPermission,
      }
    }
  }
  </script>
  
  <style scoped>

.modal {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
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
  color : #000;
}


.round-button {
  display: inline-block;
  border-radius: 10px;
  width: 30%;
  height: 25px;
  
  border: 2px solid #000; 
  background-color: #fff;
  color: #000;
  margin-top:  10px;
  margin-left: 10px;
  margin-right: 10px;
}

.button-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  justify-content: center;
}
  </style>