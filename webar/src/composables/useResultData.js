/*
 * 이벤트 완료 관련 composable
 *
 * */

import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default function useResultData() {
  const { dispatch, getters } = useStore();
  const { query } = useRoute();
  const eventResult = ref(null);

  const getEventResultData = async ({ itemID }) => {
    const isLocal = window.location.port !== "";

    // 샘플페이지 & 개별 페이지
    const { type } = query;
    if (type === "sample-landing" || type !== "landing" || isLocal) {
      // session storage에서 결과 팝업 데이터 가져옴 ( 없으면 store에 저장된 페이지 로딩 )
      // await dispatch("jsonData/setImageResultData");
      // return;
    }

    try {
      const { eventId, attendCode } = query;
      // query string없을 시 예외 처리
      if (!(eventId || attendCode) && !isLocal) {
        alert("파라미터 없음!");
        return;
      }

      // store에서 templateType파싱
      const templateType = getters["eventData/templateType"];
      const userMdn = sessionStorage.getItem("userMdn");

      let params = {
        eventId,
        ...(attendCode && { attendCode }),
        ...((templateType === "BASIC" || templateType === "BRIDGE" || templateType === "DRAG_DROP") && { arEventObjectId: itemID }),
        ...(userMdn && { phoneNumber: userMdn }),
      };

      // 완료 API호출
      await dispatch("eventData/getEventResult", params);
    } catch (err) {
      alert(err);
    }
  };

  const setEventResult = () => {
    eventResult.value = getters["eventData/eventResult"];
    console.log("eventResult", eventResult.value);
  };

  return {
    eventResult,

    getEventResultData,
    setEventResult,
  };
}
