<template>
  <iframe :src="url" v-show="url" @load="loadComplete"></iframe>
</template>

<script>
import { computed, onMounted, ref, toRefs } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import querystring from "querystring";
import cryptoUtil from "@/js/cryptoUtil";

export default {
  name: "Landing",
  setup() {
    const store = useStore();
    const { getters, dispatch } = store;
    const route = useRoute();
    const { eventId, attendCode, arData } = toRefs(route.query);
    const { aes256Decode } = cryptoUtil();
    // const router = useRouter();

    const baseUrl = process.env.VUE_APP_PAGE_PATH;
    const urls = ref([
      `${baseUrl}/basic.html#/basic`,
      `${baseUrl}/basic.html#/basic`,
      `${baseUrl}/basic.html#/basic`,
      `${baseUrl}/ar.html#/mission`,
      `${baseUrl}/basic.html#/drag-n-drop`,
      `${baseUrl}/ar.html#/open-browser`,
    ]);

    const eventData = ref(null);

    const templateType = computed(() => eventData?.value?.eventLogicalType);

    const url = computed(() => {
      if (templateType.value) {
        const type = ["BASIC", "MISSION", "BRIDGE", "SCANNING", "DRAG_DROP", "PHOTO_BASIC"];
        let query =
          `?` +
          querystring.stringify({
            ...(eventId?.value && { eventId: eventId?.value }),
            ...(attendCode?.value && { attendCode: attendCode?.value }),
            type: "landing",
          });
        return urls.value[type.findIndex((item) => item === templateType.value)] + query;
      }
      return null;
    });

    // 페이지를 벗어나기 전에 localstorage제거
    window.addEventListener("unload", () => {
      window.localStorage.removeItem("event_validation");
    });

    const loadComplete = () => {
      if (url.value !== null) {
        // iframe loading complete
        // TODO ifame이 로딩되기 전에 화면 가림 처리?
      }
    };

    const webEventGetTraceNo = function () {
      const timezoneOffset = new Date().getTimezoneOffset() * 60000;
      const timezoneDate = new Date(Date.now() - timezoneOffset);
      return timezoneDate.toISOString().slice(0, 19).replace(/[-T:]/g, "") + (Math.random() + "").slice(2, 5);
    };

    onMounted(async () => {
      const eventValidation = arData?.value;
      // const eventValidation = window.localStorage.getItem('event_validation')
      const isLocal = window.location.port !== "";

      if (!isLocal && !eventId?.value) {
        // TODO query 없음! 리턴 처리 or 창닫기 로직 백엔드와 개발해서 추가
        // console.log('파라미터 없음! 리턴 처리 or 창닫기')
        await dispatch("url/closeWindow");
        // return
      }

      if (!isLocal && !eventValidation) {
        // console.log('정상적인 접근이 아님! 리턴 처리 or 창닫기')
        await dispatch("url/redirectToMain");
      }
      if (isLocal && !eventId?.value) {
        alert("[LOCAL]: eventId가 없습니다!");
        const router = useRouter();
        await router.push({ name: "Landing", query: { eventId: "" } });
        return
      }

      try {
        const latitude = localStorage.getItem("latitude");
        const longitude = localStorage.getItem("longitude");

        let params = {
          eventId: eventId.value,
          traceNo: webEventGetTraceNo(),
          ...(latitude && { latitude }),
          ...(longitude && { longitude }),
          ...(attendCode?.value && { attendCode: attendCode?.value }),
        };
        await dispatch("jsonData/setActionObjectFrame");

        // store에서 데이터 파싱
        eventData.value = getters["eventData/eventData"];
        // 세션스토리지에 json데이터 저장
        console.log("eventData.value", eventData.value);
        sessionStorage.setItem("skWebArJson", JSON.stringify(eventData.value));
        console.log("sessionStorage.setItem");
        const eventValidationData = JSON.parse(aes256Decode(eventValidation));
        console.log("eventValidationData", eventValidationData);
        await dispatch("url/setActionType", eventValidationData.activeType);
      } catch (err) {
        console.log("err", err);
        //await dispatch("url/redirectToMain");
        // return
      }
    });

    return {
      url,
      loadComplete,
    };
  },
};
</script>

<style scoped></style>