<template>
  <vue-final-modal v-model="showModal" content-class="win_popup" overlay-class="dimmed_bg_lightdark" :click-to-close="false" @opened="opened">
    <div class="popup_contents"><img :src="resultInfo?.winningInfo?.winningImageUrl" alt="" /><!-- 예시  이미지 --></div>
    <a href="#" class="close" @click.prevent="closeModal">닫기</a>
    <div class="btn" v-if="resultInfo?.winningButtonInfo && resultInfo?.winningInfo?.autoWinningYn === 'N'">
      <template v-for="(item, index) in resultInfo.winningButtonInfo" :key="`result_button${index}`">
        <a href="#" v-if="item.buttonActionType === 'DELIVERY'" @click.prevent="buttonAction(item)" :class="clickedClass(item)">{{ item.buttonText }}</a>
        <a href="#" v-if="item.buttonActionType === 'SUBSCRIPTION'" @click.prevent="buttonAction(item)" :class="clickedClass(item)">{{ item.buttonText }}</a>
        <a href="#" v-if="item.buttonActionType === 'URL'" @click.prevent="buttonAction(item)" :class="clickedClass(item)">{{ item.buttonText }}</a>
        <a href="#" v-if="item.buttonActionType === 'CLOSE'" @click.prevent="buttonAction(item)" class="continue">{{ closeText }}</a>
        <!--        TODO 오브젝트가 있을 시 AR계속 잡기 / 없을 시 AR닫기-->
      </template>
    </div>
    <div class="btn" v-if="resultInfo?.winningInfo?.autoWinningYn === 'Y'">
      <a href="#" @click.prevent="closeModal" class="continue">확인</a>
    </div>
  </vue-final-modal>
</template>

<script>
import { computed, ref, toRefs } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import usePvLog from "@/composables/usePvLog";

export default {
  name: "EventCompleteModal",
  props: {
    resultInfo: {
      type: Object,
      default() {
        return {
          winningInfo: {
            winningType: "NFT", // 당첨 타입 - 기타(배송) : ETC, 기프티콘 : GIFTICON, 꽝 : FAIL, NFT:NFT
            winningImageUrl: "/images/event_result.jpeg",
          },
          winningButtonInfo: [
            {
              buttonActionType: "", // 경품배송입력 : DELIVERY, 계속하기(닫기) : CLOSE, URL접속 : URL, 응모정보입력:SUBSCRIPTION
              buttonText: "당첨버튼1",
              linkUrl: "",
              isClicked: false,
            },
          ],
        };
      },
    },
  },
  setup(props, { emit }) {
    const { resultInfo } = toRefs(props);
    // 모달 flag
    const showModal = ref(false);

    const route = useRoute();
    const { eventId } = toRefs(route.query);
    const arEventWinningId = computed(() => resultInfo.value.winningInfo.arEventWinningId);
    const eventLogWinningId = computed(() => resultInfo.value.eventLogWinningId);
    const winningInfo = computed(() => resultInfo.value.winningInfo);

    const { dispatch, getters } = useStore();

    const closeText = computed(() => (getters["eventData/isEventFinish"] ? "AR닫기" : "AR계속잡기"));

    const isFormOpened = ref(false);

    const { getPvLogParams, putPvLog } = usePvLog();

    // 팝업 오픈
    const openModal = () => {
      // const {benefitResultType} = resultInfo.value;
      showModal.value = true;
      isFormOpened.value = false;
    };

    const opened = () => {
      const subscription = winningInfo.value.subscriptionYn === "Y" ? 1 : 0;
      putPvLog(getPvLogParams(0, "/main/event/benefit", arEventWinningId.value, undefined, subscription));
    };

    const buttonAction = (item) => {
      switch (item.buttonActionType) {
        case "DELIVERY":
          putPvLog(getPvLogParams(3, "/main/event/benefit", item.buttonSort));
          openForm(item);
          break;
        case "SUBSCRIPTION":
          putPvLog(getPvLogParams(1, "/main/event/benefit", item.buttonSort));
          openForm(item);
          break;
        case "URL":
          putPvLog(getPvLogParams(2, "/main/event/benefit", item.buttonSort));
          redirect(item);
          break;
        case "CLOSE":
          putPvLog(getPvLogParams(3, "/main/event/benefit", item.buttonSort));
          closeModal();
          break;
      }
    };

    const closeModal = () => {
      showModal.value = false;
      emit("close:modal");
    };

    const redirect = (item) => {
      // closeModal()
      parent.open(item.linkUrl, "_blank");
      item.isClicked = true;
    };

    const openForm = (item) => {
      let arEventWinningButtonId = item.arEventWinningButtonId;
      // closeModal()
      if (isFormOpened.value) {
        return;
      }

      //test
      if (eventId) {
        dispatch("url/openWinningFormPopup", {
          eventId: eventId.value,
          arEventWinningId: arEventWinningId.value,
          eventLogWinningId: eventLogWinningId.value,
          arEventWinningButtonId,
        });
      } else {
        dispatch("url/openWinningFormPopup", {
          eventId: "0",
          arEventWinningId: "0",
          eventLogWinningId: "0",
          arEventWinningButtonId: "0",
        });
      }
      isFormOpened.value = true;
      item.isClicked = true;
    };

    //버튼 클릭 전 'continue' class style 적용하고 버튼 클릭하면 기존 기본 style을 적용함
    const clickedClass = ({ isClicked }) => {
      return {
        continue: !isClicked,
      };
    };

    // i-frame message수신 (현재는 사용되지 않음)
    window.addEventListener(
      "message",
      (e) => {
        if (e.data === "close") {
          closeModal();
        }
      },
      false
    );

    return {
      showModal,
      closeText,
      isFormOpened,
      testImagePath: process.env.VUE_APP_PUBLIC_PATH,

      openModal,
      opened,
      buttonAction,
      closeModal,
      redirect,
      openForm,
      clickedClass,
    };
  },
};
</script>

<style></style>
