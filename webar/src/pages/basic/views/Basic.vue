<template>
  <container ref="containerEl">
    <camera @loadeddata="loadVideo" @reject:video="rejectVideo"/>
    <template v-if="loadedVideo">
      <event-ar-object
        v-if="arObjectInfoList"
        :object-list="arObjectInfoList"
        :asset-list="arAssetInfoList"
        @load:scene="loadScene"
        @click:object="clickObject"
        @allow:orientationpermission="allowOrientationPermission"
        @reject:orientationpermission="rejectOrientationPermission"
        @request:orientationpermission="rquestOrientationPermission"
        @animationcomplete="animationComplete"
      />
      <event-stamp
        v-if="stampInfoList"
        ref="stampEl"
        :stamp-info="stampInfoList"
        :template-type="templateType"
      />
      <event-bridge
        v-if="bridgeInfoList"
        ref="bridgeEl"
        :bridge-list="bridgeInfoList"
        @close:modal="closeBridge"
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
import EventArObject from "@/components/common/EventArObject";
import EventStamp from "@/components/common/EventStamp";
import Camera from "@/components/common/Camera";
import EventBridge from "@/components/modal/EventBridge";
import EventCompleteModal from "@/components/modal/EventCompleteModal";

import useArObjectInfo from "@/composables/useArObjectInfo";
import uesStampInfo from "@/composables/uesStampInfo";
import useBridgeInfo from "@/composables/useBridgeInfo";
import useEventData from "@/composables/useEventData";
import useResultData from "@/composables/useResultData";
import useLoading from "@/composables/useLoading";

// import {/*deviceDetect, */isIOS, osVersion} from "mobile-device-detect";

export default {
  name: "Basic",
  components: {
    EventCompleteModal,
    Camera,
    EventBridge,
    EventStamp,
    EventArObject,
    Container
  },
  setup() {
    const store = useStore();
    const {dispatch, getters} = store;
    const templateType = ref(null);
    const loadedVideo = ref(false);
    const isRequestOrientationPermission = ref(false);

    // ref
    const stampEl = ref(null);
    const bridgeEl = ref(null);
    const completeModalEl = ref(null);
    const containerEl = ref(null);

    const {
      getEventData
    } = useEventData({dispatch});

    const {
      arObjectInfoList,
      arAssetInfoList,
      isEventFinish,
      setArObjectInfoListFromStore,
      removeItem,
    } = useArObjectInfo();

    const {
      stampInfoList,
      setStampInfoListFromStore,
      updateStamp
    } = uesStampInfo({stampEl});

    const {
      bridgeInfoList,
      setBridgeInfoListFromStore,
      openBridgePopup
    } = useBridgeInfo({bridgeEl});

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

    // ar object click
    const clickObject = (/*{itemID}*/) => { // vue-event
      // 오브젝트 클릭 중지
      containerEl.value.setClick(false);
    }

    // ar object 애니메이션 완료
    const animationComplete = async ({itemID/*, effectType*/}) => { // vue-event
      // 목록에서 itemID에 해당하는 오브젝트 제거
      removeItem(itemID)
      
      if(templateType.value === 'BASIC') {
        openCompletePopup({itemID});
      }

      if(templateType.value === 'MISSION') {
        updateStamp(itemID)
        if(isEventFinish.value) openCompletePopup({itemID});
      }

      if(templateType.value === 'BRIDGE') {
        openBridgePopup(itemID);
      }
      // 오브젝트 클릭 허용
      nextTick(() => {
        containerEl.value.setClick(true);
      })
    }

    // 브릿지 닫기 팝업
    const closeBridge = async ({itemID}) => { // vue-event
      /*if(isEventFinish.value)*/ openCompletePopup({itemID});
    }

    // 이벤트 완료 팝업 닫기
    const closeComplete = () => { // vue-event
      if(templateType.value === 'MISSION') {
        finishEvent();
        return;
      }

      if(isEventFinish.value) finishEvent();
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
          if(result==='granted') {
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

      if(!isRequestOrientationPermission.value) {
        // a-frame에서 제공하는 팝업 레이아웃 거절 버튼 이벤트
        document.querySelector('.a-dialog-deny-button').addEventListener('click', rejectOrientationPermission)
      }

      if(isRequestOrientationPermission.value) {
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
      // stamp 정보
      setStampInfoListFromStore();
      // bridge 정보
      setBridgeInfoListFromStore();

      startLoading();
    });

    return {
      arObjectInfoList,
      arAssetInfoList,
      stampInfoList,
      bridgeInfoList,
      eventResult,
      templateType,
      loadedVideo,
      loadingState,

      stampEl,
      bridgeEl,
      completeModalEl,
      containerEl,

      clickObject,
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