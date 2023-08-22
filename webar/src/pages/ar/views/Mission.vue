<template>
  <container ref="containerEl">
    <event-scan-object
      v-if="imageScanningInfoList"
      ref="eventIsScanEl"
      :scanning-list="imageScanningInfoList"
      @load:nft="startCounting"
      @makerfound="makerFound"
    />
    <event-stamp v-if="stampInfoList" ref="stampEl" :stamp-info="stampInfoList" :template-type="templateType" />
    <event-mission-modal v-if="stampInfoList" ref="missionModalEl" :mission-list="stampInfoList" @close:modal="startProcess" />
    <event-bridge v-if="bridgeInfoList" ref="bridgeEl" :bridge-list="bridgeInfoList" @close:modal="eventComplete" />
    <event-complete-modal ref="completeModalEl" :result-info="eventResult" @close:modal="closeEvent" />
  </container>
</template>

<script>
import { useStore } from "vuex";
import { onMounted, ref } from "vue";

import Container from "@/components/common/Container";
import EventScanObject from "@/components/common/EventScanObject";
import EventStamp from "@/components/common/EventStamp";
import EventBridge from "@/components/modal/EventBridge";
import EventMissionModal from "@/components/modal/EventMissionModal";
import EventCompleteModal from "@/components/modal/EventCompleteModal";

import useEventData from "@/composables/useEventData";
import useResultData from "@/composables/useResultData";
import uesStampInfo from "@/composables/uesStampInfo";
import useBridgeInfo from "@/composables/useBridgeInfo";
import useImageScanningInfo from "@/composables/useImageScanningInfo";
import useLoading from "@/composables/useLoading";

export default {
  name: "Mission",
  components: {
    EventCompleteModal,
    EventMissionModal,
    EventStamp,
    EventScanObject,
    EventBridge,
    Container,
  },
  setup() {
    const store = useStore();
    const { getters, dispatch } = store;

    const templateType = ref(null);

    const eventIsScanEl = ref(null);
    const stampEl = ref(null);
    const missionModalEl = ref(null);
    const bridgeEl = ref(null);
    const completeModalEl = ref(null);
    const containerEl = ref(null);

    const { getEventData } = useEventData();

    const { imageScanningInfoList, removeItem, addScanEvent, setImageScanningInfoFromStore, isEventFinish } = useImageScanningInfo({ eventIsScanEl });

    const { stampInfoList, setStampInfoListFromStore, updateStamp, openMissionModal } = uesStampInfo({ stampEl, missionModalEl });

    const { bridgeInfoList, setBridgeInfoListFromStore, openBridgePopup } = useBridgeInfo({ bridgeEl });

    const { eventResult, getEventResultData, setEventResult } = useResultData();

    const { startLoading, startCounting } = useLoading();

    // 마커찾음
    const makerFound = (itemID) => {
      // vue
      removeItem(itemID);
      updateStamp(itemID);
      if (!isEventFinish.value) {
        openMissionModal(itemID);
      } else {
        // 브릿지 데이터는 하나 밖에 없으므로..
        openBridgePopup(bridgeInfoList?.value[0]?.itemID);
      }
    };

    // 마커 확인 이벤트 재시작
    const startProcess = () => {
      // vue
      addScanEvent();
    };

    // 이벤트 완료 팝업
    const eventComplete = async ({ itemID }) => {
      // vue
      // 완료 API호출
      await getEventResultData({ itemID });
      // store에서 데이터 추출
      setEventResult();
      // 이벤트 완료 팝업
      completeModalEl.value.openModal();
    };

    const closeEvent = async () => {
      //vue
      // 이벤트 완료!
      alert("이벤트 완료!");
      dispatch("url/redirectToMain", true);
    };

    onMounted(async () => {
      await getEventData();
      templateType.value = getters["eventData/templateType"];

      startLoading();

      setTimeout(() => {
        // image scanning 정보
        setImageScanningInfoFromStore();
        // stamp 정보
        setStampInfoListFromStore();
        // bridge 정보
        setBridgeInfoListFromStore();
      }, 2000);
    });

    return {
      imageScanningInfoList,
      stampInfoList,
      bridgeInfoList,
      templateType,
      eventResult,

      eventIsScanEl,
      stampEl,
      missionModalEl,
      bridgeEl,
      completeModalEl,
      containerEl,

      makerFound,
      startProcess,
      eventComplete,
      closeEvent,
      startLoading,
      startCounting,
    };
  },
};
</script>

<style scoped></style>
