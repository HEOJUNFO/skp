<template>
  <vue-final-modal v-model="showVModal">
    <div class="main-content" :style="{ backgroundImage: `url(${filmResultImgUrl})` }">
      <img :src="imageurl" class="image" alt="Image from URL" />
      <button v-if="photoPrintYn" class="box-button" @click="print">{{ photoPrintButtonText + "&nbsp;&nbsp;➔" }}</button>
      <div class="buttons">
        <button @click="back">
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
            <path
              d="M5.25 15.75H28.875C33.2242 15.75 36.75 19.2758 36.75 23.625C36.75 27.9742 33.2242 31.5 28.875 31.5H21M5.25 15.75L12.25 8.75M5.25 15.75L12.25 22.75"
              stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <p
            style="color: #000; font-family: Inter; font-size: 16px; font-style: normal; font-weight: 500; line-height: 140%">
            뒤로</p>
        </button>
        <button @click="saveImage()">
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
            <path d="M36.75 36.75H5.25M31.5 19.25L21 29.75M21 29.75L10.5 19.25M21 29.75V5.25" stroke="black"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <p
            style="color: #000; font-family: Inter; font-size: 16px; font-style: normal; font-weight: 500; line-height: 140%">
            저장</p>
        </button>
        <button @click="shareAgreePopupYn ? agreeShare() : share()">
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
            <path
              d="M36.75 15.75L36.75 5.25002M36.75 5.25002H26.25M36.75 5.25002L21 21M17.5 5.25H13.65C10.7097 5.25 9.23959 5.25 8.11655 5.82222C7.1287 6.32555 6.32555 7.1287 5.82222 8.11655C5.25 9.23959 5.25 10.7097 5.25 13.65V28.35C5.25 31.2903 5.25 32.7604 5.82222 33.8834C6.32555 34.8713 7.1287 35.6744 8.11655 36.1778C9.23959 36.75 10.7097 36.75 13.65 36.75H28.35C31.2903 36.75 32.7604 36.75 33.8834 36.1778C34.8713 35.6744 35.6744 34.8713 36.1778 33.8834C36.75 32.7604 36.75 31.2903 36.75 28.35V24.5"
              stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <p
            style="color: #000; font-family: Inter; font-size: 16px; font-style: normal; font-weight: 500; line-height: 140%">
            공유</p>
        </button>
      </div>
      <div class="box-container">
        <div v-if="hashTagYn" class="box">
          <h1
            style="color: #000; text-align: center; font-family: Pretendard; font-size: 16px; font-style: normal; font-weight: 800; line-height: 140%">
            필수 해시태그
          </h1>
          <p v-html="generateHashTagString(hashTagValue)"></p>
          <button class="copy-button" @click="copyToClipboard(hashTagValue)">해시태그 복사하기</button>
          <transition name="fade">
            <div v-show="isCopyCilp" class="copy-alert">해시태그가 클립보드에 복사되었습니다.</div>
          </transition>
        </div>
      </div>
      <button v-if="photoGiveAwayYn && !isDecorate" class="box-button2"
        @click="openCompletePopup(''), photoGiveAwayButtonOff()" style="margin-bottom: 2vh">
        {{ photoGiveAwayButtonText + "&nbsp;&nbsp;➔" }}
      </button>
      <div v-if="isDecorate" style="margin: 2vh"></div>
      <img v-if="filmResultFooterImgYn" :src="filmResultFooterImgUrl" alt="Banner Image" />
      <div v-if="showAgreeModal" class="modal">
        <div class="modal-content2">
          <button class="close-button2" @click="showAgreeModal = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 42 42" fill="none">
              <path d="M31.5 10.5L10.5 31.5M10.5 10.5L31.5 31.5" stroke="black" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
          <h1
            style="color: #000; text-align: center; font-family: Inter; font-size: 18px; font-style: normal; font-weight: 400; line-height: 140%">
            사진 활용 동의 안내
          </h1>
          <div class="text">
            <pre>{{ agreePopupText }}</pre>
          </div>
          <a :href="agreePopupDetailLinkUrl" target="_blank" class="link">자세히보기</a>
          <input type="text" :placeholder="agreePopupInputText" class="input-text" v-model="inputText" />
          <div class="button-container">
            <button class="round-button-white" @click="share">확인</button>
          </div>
        </div>
      </div>
    </div>
    <print-open-browser-modal ref="printModal" />
    <photo-store-modal ref="photoStoreModal" @reCapture="back()" />
    <event-complete-modal ref="completeModalEl" :result-info="eventResult" />
  </vue-final-modal>
</template>

<script>
import { ref, computed, inject, toRefs } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import usePvLog from "@/composables/usePvLog";

import PrintOpenBrowserModal from "./PrintOpenBrowserModal.vue";
import PhotoStoreModal from "./PhotoStoreModal.vue";
import EventCompleteModal from "./EventCompleteModal.vue";

import useResultData from "@/composables/useResultData";
// import useLogPersonAgree from "@/composables/useLogPersonAgree";

export default {
  name: "CaptureOpenBrowserModal",
  components: {
    PrintOpenBrowserModal,
    PhotoStoreModal,
    EventCompleteModal,
  },
  data() {
    return {
      modalImageUrl: "path/to/image.jpg",
      modalText: "배송(당첨)정보 입력 후 경품이 지급됩니다. SNS 공유완료시에 추첨을 통해 더 많은 혜택을 드려요.",
    };
  },
  setup() {
    const route = useRoute();
    const { eventId } = toRefs(route.query);
    const inputText = ref("");
    const store = useStore();
    const { getters, dispatch } = store;
    const showVModal = ref(false);
    const imageurl = ref("");
    const isDecorate = ref(false);
    const isCopyCilp = ref(false);
    const printModal = ref(null);
    const photoStoreModal = ref(null);
    const completeModalEl = ref(null);
    const showAgreeModal = ref(false);

    const { eventResult, getEventResultData, setEventResult } = useResultData({ getters, dispatch });

    // const {
    //   putLogPersonAgree
    // } = useLogPersonAgree();

    const { getPvLogParams, putPvLog } = usePvLog();

    const computedPropertyGenerator = (getterKey, shouldCheckEquality, equalityValue = "Y") => {
      return computed(() => {
        const value = getters[`eventData/${getterKey}`];
        return shouldCheckEquality ? value === equalityValue : value;
      });
    };

    const hashTagYn = computedPropertyGenerator("hashTagSettingYn", true);
    const hashTagValue = computedPropertyGenerator("hashTagValue", false);
    const shareAgreePopupYn = computedPropertyGenerator("shareAgreePopupSettingYn", true);
    const agreePopupText = computedPropertyGenerator("agreePopupText", false);
    const agreePopupDetailLinkUrl = computedPropertyGenerator("agreePopupDetailLinkUrl", false);
    const agreePopupInputText = computedPropertyGenerator("agreePopupInputText", false);
    const photoPrintYn = computedPropertyGenerator("photoPrintSettingYn", true);
    const photoPrintButtonText = computedPropertyGenerator("photoPrintButtonText", false);
    const photoGiveAwayYn = computedPropertyGenerator("photoGiveAwaySettingYn", true);
    const photoGiveAwayButtonText = computedPropertyGenerator("photoGiveAwayButtonText", false);
    const filmResultFooterImgYn = computedPropertyGenerator("filmResultFooterImgSettingYn", true);
    const filmResultFooterImgUrl = computedPropertyGenerator("filmResultFooterImgUrl", false);
    const filmResultImgUrl = computedPropertyGenerator("filmResultImgUrl", false);

    function generateHashTagString(hashTags) {
      var hashTagString = hashTags.map(function (tag) {
        return "#" + tag;
      });

      return hashTagString.join(" ");
    }

    const copyToClipboard = (hashTags) => {
      putPvLog(getPvLogParams(3, "/main/photo"));
      var hashTag = generateHashTagString(hashTags);

      navigator.clipboard
        .writeText(hashTag)
        .then(() => {
          isCopyCilp.value = true;

          setTimeout(() => (isCopyCilp.value = false), 2000);
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
          alert("해시태그 복사에 실패했습니다. 잠시후 다시 시도해주세요.");
        });
    };
    const print = () => {
      putPvLog(getPvLogParams(5, "/main/photo"));
      printModal.value.openModal(imageurl.value);
    };
    const photoStore = () => {
      photoStoreModal.value.openModal(imageurl.value);
    };

    const openModal = (imageUrl) => {
      putPvLog(getPvLogParams(0, "/main/photo"));
      imageurl.value = imageUrl;
      showVModal.value = true;
      setTimeout(() => {
        const video = document.querySelector(".event-wrapper video");
        video.play();
      }, 1000);
    };

    const decorateCapture = (has) => {
      isDecorate.value = has;
    };

    const saveImage = async () => {
      //putPvLog(getPvLogParams(1, "/main/photo"));

      const imageUrl = imageurl.value;
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "download.jpg";
      a.style.display = "none"; // Ensure the link is hidden
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url); // Clean up URL object after use
      document.body.removeChild(a);

      photoStoreModal.value.saveImage(imageurl.value);
    };

    const toggleBarVisibility = inject("secondToggleBarVisibility");
    const setEventWrapperStyles = inject("setEventWrapperStyles");

    const back = () => {
      toggleBarVisibility();
      setEventWrapperStyles();
      showVModal.value = false;
      document.querySelector(".main-content").scrollTop = 0;
    };

    const share = async () => {
      if (shareAgreePopupYn) {
        putPvLog(getPvLogParams(1, "/main/photo/popup", undefined, undefined, undefined, new Date().toISOString()));
        console.log(eventId.value);
        // setTimeout(() => {
        //   putLogPersonAgree({
        //     eventId: eventId.value,
        //     agreeId: inputText.value,
        //   });
        // }, 1000);
      } else {
        putPvLog(getPvLogParams(2, "/main/photo"));
      }

      const blob = await (await fetch(imageurl.value)).blob();

      const filesArray = [
        new File([blob], "image.png", {
          type: blob.type,
        }),
      ];

      const shareData = {
        files: filesArray,
      };
      if (!navigator.share) {
        alert("공유하기 기능을 지원하지 않는 브라우저입니다.");
        return;
      }
      navigator
        .share(shareData)
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    };

    const agreeShare = () => {
      showAgreeModal.value = true;
      putPvLog(getPvLogParams(2, "/main/photo"));
      // setTimeout(() => {
      //   putPvLog(getPvLogParams(0, "/main/photo/popup"));
      // }, 100);
    };

    const webBack = () => {
      if (printModal.value.showVModal) {
        printModal.value.webBack();
      } else if (photoStoreModal.value.showVModal) {
        photoStoreModal.value.webBack();
      } else if (completeModalEl.value.showModal) {
        completeModalEl.value.closeModal();
      } else if (showAgreeModal.value) {
        showAgreeModal.value = false;
      } else {
        back();
      }
    };

    const openCompletePopup = async (itemID) => {
      // putPvLog(getPvLogParams(4, "/main/photo"));
      await getEventResultData({ itemID });
      setEventResult();
      completeModalEl.value.openModal();
    };

    const photoGiveAwayButtonOff = () => {
      var bar = document.querySelector(".box-button2");
      bar.style.backgroundColor = "gray";
      bar.style.pointerEvents = "none";
      bar.style.opacity = "0.8";
    };

    return {
      print,
      photoStore,
      openModal,
      decorateCapture,
      showVModal,
      imageurl,
      isDecorate,
      saveImage,
      back,
      share,
      agreeShare,
      hashTagYn,
      hashTagValue,
      shareAgreePopupYn,
      agreePopupText,
      agreePopupDetailLinkUrl,
      agreePopupInputText,
      copyToClipboard,
      isCopyCilp,
      printModal,
      photoStoreModal,
      photoPrintYn,
      photoPrintButtonText,
      photoGiveAwayYn,
      photoGiveAwayButtonText,
      filmResultFooterImgYn,
      filmResultFooterImgUrl,
      filmResultImgUrl,
      webBack,
      showAgreeModal,
      completeModalEl,
      openCompletePopup,
      eventResult,
      inputText,
      generateHashTagString,
      photoGiveAwayButtonOff,
    };
  },
};
</script>

<style scoped>
.main-content {
  text-align: center;
  z-index: 2;
  width: 100%;
  height: -webkit-fill-available;
  position: absolute;
  background-color: #fff;
  background-blend-mode: multiply;
  padding-top: 8vh;
  overflow-y: scroll;
}

.image {
  width: auto;
  height: 49vh;
}

.buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 10vh;
  margin-top: 2vh;
}

.box-button {
  display: block;
  margin-top: 2vh;
  border-radius: 24px;
  background-color: #000;
  white-space: nowrap;
  padding: 13px 20px 13px 24px;
  color: var(--white, #fff);
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  left: 50%;
  transform: translateX(-50%);
}

.box-button2 {
  display: inline-block;
  margin-top: 2vh;
  border-radius: 24px;
  background-color: #000;
  white-space: nowrap;
  padding: 13px 20px 13px 24px;
  color: var(--white, #fff);
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
}

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  background: #fff;
  border-radius: 20px;
  width: 88%;
  height: 37vh;
  background-color: #fff;
  color: #000;
  text-align: center;
}

.close-button2 {
  position: absolute;
  top: 2.5vh;
  right: 5.5%;
}

.button-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 2vh;
}

.copy-button {
  display: inline-flex;
  padding: 13px 24px;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  border: 1px solid var(--black-50, #757575);
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #000;
  border-radius: 20px;
  width: 86%;
  height: 20vh;
  margin-top: 2vh;
  padding-top: 2vh;
  padding-bottom: 1vh;
  gap: 1vh;
  background-color: #fff;
}

.hashtag {
  display: inline-block;
}

.box p {
  word-wrap: break-word;
  max-width: 170px;
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 140%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.copy-alert {
  position: fixed;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #000;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  z-index: 100;
}

.text pre {
  text-align: center;
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  margin-top: 2vh;
}

.link {
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  text-decoration-line: underline;
  margin-top: 0.5vh;
}

.input-text {
  width: 75%;
  height: 6vh;
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
  margin-top: 1.5vh;
  margin-left: 5vh;
  padding-left: 2.5%;
}

.box-container {
  display: flex;
  justify-content: center;
}

.round-button-white {
  display: inline-block;
  border-radius: 24px;
  width: 49%;
  height: 6vh;
  background-color: #000;
  color: #fff;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 0%;
  padding: 13px 24px;
}
</style>
