<template>
    <container ref="containerEl">
      <!-- video -->
      <camera @loadeddata="loadVideo" @reject:video="rejectVideo"/>
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
  import {onMounted, ref} from "vue";
  import {useStore} from "vuex";
  
  import Container from "@/components/common/Container";
  import EventDragNDropObject from "@/components/common/EventDragNDropObject";
  import Camera from "@/components/common/Camera";
  import TutorialPopup from "@/components/common/TutorialPopup";
  
  import useArObjectInfo from "@/composables/useArObjectInfo";
  import useEventData from "@/composables/useEventData";
  import useResultData from "@/composables/useResultData";
  import useLoading from "@/composables/useLoading";
  
  export default {
    name: "DragNDrop",
    components: {
      Camera,
      EventDragNDropObject,
      Container,
      TutorialPopup
    },
    setup() {
      const store = useStore();
      const {dispatch, getters} = store;
      const templateType = ref(null);
      const loadedVideo = ref(false);
      const isRequestOrientationPermission = ref(false);
      const tutorialPopup = ref(false);
    
      // ref
      const completeModalEl = ref(null);
      const containerEl = ref(null);
    
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
        startCounting,
      } = useLoading()
  
      // drag start event handler
      const dragStart = (data) => {
        console.log("nft dragStart : ", data)
      }
    
      // drag start event handler
      const dragEnd = ({type, itemID, position}) => {
        console.log("nft dragEnd : type=%s,itemId=%s,pos=%s", type, itemID, position)
      }
    
      // video load complete
      const loadVideo = () => {
        loadedVideo.value = true;
      }
    
      // video access rejection
      const rejectVideo = () => {
        alert('카메라 사용을 허용하지 않으셨습니다. \r이벤트 페이지로 돌아갑니다.')
        dispatch('url/redirectToMain')
      }
    
      // AR load complete
      const loadScene = () => {
        if (typeof DeviceOrientationEvent === 'undefined' || !DeviceOrientationEvent.requestPermission) {
          startCounting();
          return;
        }
    
        DeviceOrientationEvent.requestPermission()
            .then((result) => {
              if (result === 'granted') {
                startCounting();
              }
            })
      }
    
      // requesting orientation permission
      const rquestOrientationPermission = () => {
        isRequestOrientationPermission.value = true;
      }
    
      // allow orientation
      const allowOrientationPermission = () => {
    
        if (!isRequestOrientationPermission.value) {
          document.querySelector('.a-dialog-deny-button').addEventListener('click', rejectOrientationPermission)
        }
    
        if (isRequestOrientationPermission.value) {
          startCounting();
        }
      }
    
      // reject orientation
      const rejectOrientationPermission = () => {
        alert('동작 및 방향 접근을 허용하지 않으셨습니다. \r이벤트 페이지로 돌아갑니다.')
        dispatch('url/redirectToMain')
      }
    
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
        tutorialPopup
      }
    }
  }
  </script>
  
  <style scoped>
  </style>