<template>
    <container ref="containerEl">
      <!-- video -->
      <camera @loadeddata="loadVideo" @reject:video="rejectVideo"/>
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
  
        <event-complete-modal
            ref="completeModalEl"
            :result-info="eventResult"
            @close:modal="closeComplete"
        />
      </template>
    </container>
  </template>
  
  <script>
  import {nextTick, onMounted, ref} from "vue";
  import {useStore} from "vuex";
  
  import Container from "@/components/common/Container";
  import EventDragNDropObject from "@/components/common/FaceTracking";
  import Camera from "@/components/common/Camera";
  import EventCompleteModal from "@/components/modal/EventCompleteModal";
  
  import useArObjectInfo from "@/composables/useArObjectInfo";
  import useEventData from "@/composables/useEventData";
  import useResultData from "@/composables/useResultData";
  import useLoading from "@/composables/useLoading";
  
  export default {
    name: "DragNDrop",
    components: {
      EventCompleteModal,
      Camera,
      EventDragNDropObject,
      Container
    },
    setup() {
      const store = useStore();
      const {dispatch, getters} = store;
      const templateType = ref(null);
      const loadedVideo = ref(false);
      const isRequestOrientationPermission = ref(false);
  
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
        isEventFinish,
        setArObjectInfoListFromStore,
        removeItem,
      } = useArObjectInfo();
  
      const {
        eventResult,
        getEventResultData,
        setEventResult
      } = useResultData({getters, dispatch});
  
      const {
        loadingState,
        startLoading,
        startCounting,
      } = useLoading()
  
  
      // drag start event handler
      const dragStart = (data) => { // vue-event
        console.log("nft dragStart : ", data)
        // 오브젝트 클릭 중지
        // containerEl.value.setClick(false);
      }
  
      // drag start event handler
      const dragEnd = ({type, itemID, position}) => { // vue-event
        console.log("nft dragEnd : type=%s,itemId=%s,pos=%s", type, itemID, position)
        // 오브젝트 클릭 중지
      }
  
      // ar object 애니메이션 완료
      const animationComplete = async ({itemID/*, effectType*/}) => { // vue-event
        // 목록에서 itemID에 해당하는 오브젝트 제거
        removeItem(itemID)
  
        if (templateType.value === "DRAG_DROP") {
          await openCompletePopup({itemID});
        }
        // 오브젝트 클릭 허용
        await nextTick(() => {
          containerEl.value.setClick(true);
        })
      }
  
      // 브릿지 닫기 팝업
      const closeBridge = async ({itemID}) => { // vue-event
        /*if(isEventFinish.value)*/
        await openCompletePopup({itemID});
      }
  
      // 이벤트 완료 팝업 닫기
      const closeComplete = () => { // vue-event
        if (templateType.value === 'MISSION') {
          finishEvent();
          return;
        }
  
        if (isEventFinish.value) finishEvent();
      }
  
      // 완료 팝업 열기
      const openCompletePopup = async ({itemID}) => {
        await getEventResultData({itemID});
        // store에서 데이터 추출
        setEventResult()
        // 이벤트 완료 팝업
        completeModalEl.value.openModal();
      }
  
      // 모튼 이벤트 완료
      const finishEvent = () => {
        alert('모든 이벤트를 완료 하셨습니다.')
        dispatch('url/redirectToMain', true)
      }
  
      /*
      * loading
      *
      * video / a-frame 로드의 프로세스를 관리
      * video 허용 > 기기 움직임 허용 > count > 시작 순으로 진행
      *
      * */
      // 비디오(카메라) 로드 완료
      const loadVideo = () => {
        loadedVideo.value = true;
      }
  
      // 비디오(카메라) 허용 거부
      const rejectVideo = () => {
        alert('카메라 사용을 허용하지 않으셨습니다. \r이벤트 페이지로 돌아갑니다.')
        dispatch('url/redirectToMain')
      }
  
      // Ar로드 완료
      const loadScene = () => {
        // iOS 13부터는 사용자의 움직임에 대한 허용을 해주어야 한다.
        // not iOS
        // Browser doesn't support or doesn't require permission to DeviceOrientationEvent API.
        if (typeof DeviceOrientationEvent === 'undefined' || !DeviceOrientationEvent.requestPermission) {
          startCounting();
          return;
        }
  
        // iOS 13이상 - requestPermission를 통해서 허용 여부 확인
        // 허용하지 않은 상태이면 promise가 reject된다.
        DeviceOrientationEvent.requestPermission()
            .then((result) => {
              // 이미 허용
              if (result === 'granted') {
                startCounting();
              }
            })
      }
  
      // iOS 13이상
      // a-scene에서 움직임 허용 확인 함수 호출
      const rquestOrientationPermission = () => {
        // a-dialog-deny-button
        isRequestOrientationPermission.value = true;
      }
  
      // a-scene에서 움직임 사용
      const allowOrientationPermission = () => {
  
        if (!isRequestOrientationPermission.value) {
          // a-frame에서 제공하는 팝업 레이아웃 거절 버튼 이벤트
          document.querySelector('.a-dialog-deny-button').addEventListener('click', rejectOrientationPermission)
        }
  
        if (isRequestOrientationPermission.value) {
          startCounting();
        }
      }
  
      // a-scene에서 움직임 사용 거부
      const rejectOrientationPermission = () => {
        alert('동작 및 방향 접근을 허용하지 않으셨습니다. \r이벤트 페이지로 돌아갑니다.')
        dispatch('url/redirectToMain')
      }
  
      onMounted(async () => {
        await getEventData();
        // 템플릿 타입
        templateType.value = getters['eventData/templateType'];
        // 3d 객체 정보목록
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
        animationComplete,
        closeBridge,
        closeComplete,
        startLoading,
        loadVideo,
        rejectVideo,
        loadScene,
        rquestOrientationPermission,
        allowOrientationPermission,
        rejectOrientationPermission,
      }
    }
  }
  </script>
  
  <style scoped>
  
  </style>