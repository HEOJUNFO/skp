<template>
    <frame-container ref="containerRef" >
      <tutorial-modal v-show="tutorialPopup"  @close="tutorialPopup = false ,toggleBarVisibility()"></tutorial-modal>
      <browser-check-modal v-if="isNaverBrowser && isWebView" @close="isNaverBrowser = false"></browser-check-modal>
      <camera ref="cameraRef" @loadeddata="loadVideo" @reject:video="rejectVideo"/>
        <template v-if="loadedVideo">
        <event-frame-object
            v-if="characterList"
            :object-list="characterList"
            :asset-list="arAssetInfoList"
            :target-info="arDropTargetInfo"
            @load:scene="loadScene"
            @dragstart:object="dragStart"
            @dragend:object="dragEnd"
            @allow:orientationpermission="allowOrientationPermission"
            @reject:orientationpermission="rejectOrientationPermission"
            @request:orientationpermission="rquestOrientationPermission"
        />
      </template>
    </frame-container>
    <print-open-browser-modal ref="printModal" :image-url="imageUrl" />
  </template>
  
  <script>
  import {onMounted, ref,computed} from "vue";
  import {useStore} from "vuex";

  import FrameContainer from "../../../components/common/FrameContainer";
  import EventFrameObject from "../../../components/common/EventFrameObject";
  import Camera from "@/components/common/Camera";
  import TutorialModal from "@/components/modal/TutorialModal";
  import PrintOpenBrowserModal from "../../../components/modal/PrintOpenBrowserModal.vue";
  import BrowserCheckModal from "../../../components/modal/BrowserCheckModal.vue";
  
  import useArObjectInfo from "@/composables/useArObjectInfo";
  import useEventData from "@/composables/useEventData";
  import useResultData from "@/composables/useResultData";
  import useLoading from "@/composables/useLoading";
  import useEventHandlers from "@/composables/useEventHandlers";

  export default {
    name: "Frame",
    components: {
    Camera,
    EventFrameObject,
    FrameContainer,
    TutorialModal,
    PrintOpenBrowserModal,
    BrowserCheckModal
},
    setup() {
      const store = useStore();
      const {dispatch, getters} = store;
      const templateType = ref(null);
      const loadedVideo = ref(false);
      const tutorialPopup = ref(false);
      const cameraRef = ref(null);
      const containerRef = ref(null);
      const printModal = ref(null);
      const imageUrl = ref(null);
      const characterList = ref(null);

      const isNaverBrowser = computed(() => /NAVER/.test(navigator.userAgent));
      const isWebView = computed(() => navigator.userAgent.includes('WebView'));
     
      
      const tutorialYn = computed(() => {
      const istutorial = getters['eventData/tutorialYn'];
      return istutorial === 'Y';
      });

      const {
        getEventData
      } = useEventData({dispatch});
    
      const {
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
 
      const capture =  () => {
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

      imageUrl.value = canvas.toDataURL("image/png");
      
      return imageUrl.value;
      
    };

    const toggleBarVisibility = () => {
      window.parent.toggleBarVisibility();
       containerRef.value.topValue = 40;
    };

    const createGetterFunction = (getterPath) => {
      return function() {
        const computedValue = computed(() => {
        const isValue = getters[getterPath];
          return isValue;
        });
        return computedValue.value;
      }
    }

    window.photoRatioSettingType = createGetterFunction('eventData/photoRatioSettingType');
    window.arFrameSettingYn = createGetterFunction('eventData/arFrameSettingYn');
    window.arFilterSettingYn = createGetterFunction('eventData/arFilterSettingYn');
    window.arCharacterSettingYn = createGetterFunction('eventData/arCharacterSettingYn');
    window.arStickerSettingYn = createGetterFunction('eventData/arStickerSettingYn');

    window.flipCamera = function() {
        cameraRef.value.flipCamera();
      }

    window.capture =  function() {
      printModal.value.openModal( capture());
       window.parent.toggleBarVisibility();
      }

    window.containTopValueToggle = function() {
      if(containerRef.value.topValue === 40) {
        containerRef.value.topValue = 0;
      } else {
        containerRef.value.topValue = 40;
    }}

    window.createCharacterList = function()
    {
      const characterList = createCharacterList();
      return characterList
    }

  function createCharacterList() {
  const url = computed(() => store.getters['eventData/characterContentsInfoList']);

   const  characterList = url.value.slice(0,9).map((item, index) => {
    let tabId = 1; 
    let select = index === 0;

    return {
      id: index + 1,
      tabId: tabId,
      src: item.thumbnailUri, 
      file: item.sourceUri,
      name: item.fileName, 
      select: select,
      type: item.tabMenuType,
    };
    });
      return characterList;
  } 

      onMounted(async () => {
        await getEventData();
        templateType.value = getters['eventData/templateType'];
        characterList.value = createCharacterList();

        setArObjectInfoListFromStore();
       
        startLoading();
      
        setTimeout(() => {
          completeLoading()
          
          if(tutorialYn.value){
          tutorialPopup.value = true;
          }
          else {
            toggleBarVisibility();
          }
        }, 5000)
     
      });
    
      return {
        characterList,
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
        isNaverBrowser,
        capture,
        toggleBarVisibility,
        rquestOrientationPermission,
        allowOrientationPermission,
        rejectOrientationPermission,
        printModal,
        imageUrl,
        isWebView
      }
    }
  }
  </script>
  
  <style scoped>
  </style>