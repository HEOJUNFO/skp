<template>
  <vue-final-modal v-model="showVModal">
    <div class="main-content" :style="{ backgroundImage: `url(${filmResultImgUrl})` }">
      <img :src="imageurl" class="image" alt="Image from URL" />
      <button v-if="photoPrintYn" class="box-button" @click="print">{{ photoPrintButtonText }}</button>
      <div class="buttons">
        <button @click="back">
          <img src="../../assets/icon/back-button.png" alt="뒤로" style="width: 60px; height: 60px;" />
        </button>
        <button @click="saveImage(), showSaveModal = true">
          <img src="../../assets/icon/save-button.png" alt="저장" style="width: 60px; height: 60px;" />
        </button>
        <button @click="shareAgreePopupYn ? agreeShare() : share()">
          <i class="fa-solid fa-share-nodes fa-5x" style="color:black ;"></i>
        </button>
      </div>
      <div v-if="hashTagYn" class="box">
        <h1 style="font-weight: bold">필수해시태그</h1>
        <p v-html="generateHashTagString(hashTagValue)"></p>
        <button class="copy-button" @click="copyToClipboard(hashTagValue)">해시태그 복사하기</button>
        <transition name="fade">
          <div v-show="isCopyCilp" class="copy-alert">해시태그가 클립보드에 복사되었습니다.</div>
        </transition>
      </div>
      <button v-if="photoGiveAwayYn" class="box-button" @click="openCompletePopup('')">{{ photoGiveAwayButtonText
      }}</button>
      <img v-if="filmResultFooterImgYn" :src="filmResultFooterImgUrl" alt="Banner Image" style="margin-top: 3.5vh;" />
      <div v-if="showSaveModal" class="modal">
        <div class="modal-content2">
          <button class="close-button2" @click="showSaveModal = false">
            <img src="../../assets/icon/close-button.png" alt="X" style="width: 20px; height: 30px; " />
          </button>
          <p>휴대폰 갤러리에 저장되었습니다</p>
          <p>지금 출력을 원하시면</p>
          <p>출력 하기를 눌러주세요</p>
          <div class="button-container">
            <button class="round-button" @click="photoStore(), showSaveModal = false">포토함 이동</button>
            <button class="round-button" @click="print(), showSaveModal = false">지금 출력</button>
          </div>
        </div>
      </div>
      <div v-if="showAgreeModal" class="modal">
        <div class="modal-content2">
          <button class="close-button2" @click="showAgreeModal = false">
            <img src="../../assets/icon/close-button.png" alt="X" style="width: 20px; height: 30px; " />
          </button>
          <h1 style="font-weight: bold;">사진 활용 동의 안내</h1>
          <br>
          <div class="text">
            <pre>{{ agreePopupText }}</pre>
          </div>
          <a :href="agreePopupDetailLinkUrl" target="_blank" class="link">자세히보기</a>
          <br>
          <br>
          <input type="text" :placeholder="agreePopupInputText" class="input-text" v-model="inputText" />
          <br>
          <div class="button-container">
            <button class="round-button" @click="share">동의하기</button>
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
import useLogPersonAgree from "@/composables/useLogPersonAgree";

export default {
  name: "CaptureOpenBrowserModal",
  components: {
    PrintOpenBrowserModal,
    PhotoStoreModal,
    EventCompleteModal,
  },
  data() {
    return {
      modalImageUrl: 'path/to/image.jpg',
      modalText: '배송(당첨)정보 입력 후 경품이 지급됩니다. SNS 공유완료시에 추첨을 통해 더 많은 혜택을 드려요.',
    }
  },
  setup() {
    const route = useRoute();
    const { eventId } = toRefs(route.query);
    const inputText = ref('');
    const store = useStore();
    const { getters, dispatch } = store;
    const showVModal = ref(false);
    const imageurl = ref('');
    const isCopyCilp = ref(false);
    const printModal = ref(null);
    const photoStoreModal = ref(null);
    const completeModalEl = ref(null);
    const showSaveModal = ref(false);
    const showAgreeModal = ref(false);

    const {
      eventResult,
      getEventResultData,
      setEventResult
    } = useResultData({ getters, dispatch });

    const {
      putLogPersonAgree
    } = useLogPersonAgree();

    const { getPvLogParams, putPvLog } = usePvLog();

    const computedPropertyGenerator = (getterKey, shouldCheckEquality, equalityValue = 'Y') => {
      return computed(() => {
        const value = getters[`eventData/${getterKey}`];
        return shouldCheckEquality ? value === equalityValue : value;
      });
    };

    const hashTagYn = computedPropertyGenerator('hashTagSettingYn', true);
    const hashTagValue = computedPropertyGenerator('hashTagValue', false);
    const shareAgreePopupYn = computedPropertyGenerator('shareAgreePopupSettingYn', true);
    const agreePopupText = computedPropertyGenerator('agreePopupText', false);
    const agreePopupDetailLinkUrl = computedPropertyGenerator('agreePopupDetailLinkUrl', false);
    const agreePopupInputText = computedPropertyGenerator('agreePopupInputText', false);
    const photoPrintYn = computedPropertyGenerator('photoPrintSettingYn', true);
    const photoPrintButtonText = computedPropertyGenerator('photoPrintButtonText', false);
    const photoGiveAwayYn = computedPropertyGenerator('photoGiveAwaySettingYn', true);
    const photoGiveAwayButtonText = computedPropertyGenerator('photoGiveAwayButtonText', false);
    const filmResultFooterImgYn = computedPropertyGenerator('filmResultFooterImgSettingYn', true);
    const filmResultFooterImgUrl = computedPropertyGenerator('filmResultFooterImgUrl', false);
    const filmResultImgUrl = computedPropertyGenerator('filmResultImgUrl', false);

    function generateHashTagString(hashTags) {

      var hashTagString = hashTags.map(function (tag) {
        return "#" + tag;
      });


      return hashTagString.join(" ");
    }

    const copyToClipboard = (hashTags) => {
      putPvLog(getPvLogParams(3, "/main/photo"));
      var hashTag = generateHashTagString(hashTags);

      navigator.clipboard.writeText(hashTag).then(() => {
        isCopyCilp.value = true;

        setTimeout(() => isCopyCilp.value = false, 2000);
      }).catch(err => {
        console.error('Could not copy text: ', err);
        alert('해시태그 복사에 실패했습니다. 잠시후 다시 시도해주세요.')
      });
    }
    const print = () => {
      putPvLog(getPvLogParams(5, "/main/photo"));
      printModal.value.openModal(imageurl.value);
    }
    const photoStore = () => {
      photoStoreModal.value.openModal(imageurl.value);
    }

    const openModal = (imageUrl) => {
      putPvLog(getPvLogParams(0, "/main/photo"));
      imageurl.value = imageUrl;
      showVModal.value = true;
      setTimeout(() => {
        const video = document.querySelector('.event-wrapper video');
        video.play();
      }, 1000);

    };

    const saveImage = () => {
      putPvLog(getPvLogParams(1, "/main/photo"));

      const a = document.createElement("a");
      a.href = imageurl.value;
      a.download = "download.jpg";
      a.click();
    };

    const toggleBarVisibility = inject('secondToggleBarVisibility');
    const back = () => {
      toggleBarVisibility();
      showVModal.value = false;
      document.querySelector('.main-content').scrollTop = 0;
    }

    const share = async () => {
      putPvLog(getPvLogParams(2, "/main/photo"));
      if (shareAgreePopupYn) {
        putPvLog(getPvLogParams(1, "/main/photo/popup", undefined, undefined, undefined, new Date().toISOString()));
        putLogPersonAgree({
          eventId: eventId.value,
          agreeId: inputText.value,
        });
      }

      const blob = await (await fetch(imageurl.value)).blob();

      const filesArray = [
        new File(
          [blob],
          'image.png',
          {
            type: blob.type
          }
        )
      ];

      const shareData = {
        files: filesArray
      };
      if (!navigator.share) {
        alert('공유하기 기능을 지원하지 않는 브라우저입니다.');
        return;
      }
      navigator.share(shareData)
        .then(() => {
          console.log('Thanks for sharing!');
        })
        .catch(console.error);
    }

    const agreeShare = () => {
      showAgreeModal.value = true;
      putPvLog(getPvLogParams(0, "/main/photo/popup"));
    }

    const webBack = () => {
      if (printModal.value.showVModal) {
        printModal.value.webBack();
      }
      else if (photoStoreModal.value.showVModal) {
        photoStoreModal.value.webBack();
      }
      else if (completeModalEl.value.showModal) {
        completeModalEl.value.closeModal();
      }
      else if (showAgreeModal.value || showSaveModal.value) {
        showAgreeModal.value = false;
        showSaveModal.value = false;
      }
      else {
        back();
      }
    }

    const openCompletePopup = async (itemID) => {
      putPvLog(getPvLogParams(4, "/main/photo"));
      await getEventResultData({ itemID });
      setEventResult()
      completeModalEl.value.openModal();
    }

    return {
      print,
      photoStore,
      openModal,
      showVModal,
      imageurl,
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
      showSaveModal,
      showAgreeModal,
      completeModalEl,
      openCompletePopup,
      eventResult,
      inputText,
      generateHashTagString
    }
  }
}
</script>
  
<style scoped>
.main-content {
  text-align: center;
  z-index: 2;
  width: 100%;
  height: 100vh;
  position: absolute;
  background-color: #fff;
  background-blend-mode: multiply;
  padding-top: 2vh;
  overflow-y: scroll;
}

.image {
  width: 90%;
  height: auto;
}

.buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 10vh;
  margin-top: 3.5vh;
}

.box-button {
  display: block;
  margin-left: 5%;
  margin-top: 3.5vh;
  width: 90%;
  height: 7vh;
  border: 1px solid #000;
  border-radius: 25px;
  background-color: #fff;
  font-size: 20px;
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

.modal-content {
  background-color: rgba(0, 0, 0, 0);
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  text-align: center;
  color: #fff;
}

.modal-content2 {
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  padding: 5%;
  border-radius: 10px;
  width: 60%;
  text-align: center;
  background-color: #fff;
  color: #000;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  font-size: 2.5em;
}

.close-button2 {
  position: absolute;
  top: 2px;
  right: 5px;
  border: none;
  background-color: transparent;
  font-size: 1em;
}

.round-button {
  display: inline-block;
  border-radius: 25px;
  width: 100%;
  height: 50px;
  margin-left: 5%;
  margin-top: 3.5vh;
  border: 2px solid #000;
  background-color: #fff;
  color: #000;
}

.button-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.copy-button {
  border: 1px solid #000;
  border-radius: 20px;
  width: 40%;
  height: 30%;
  background-color: lightgray;
  padding-bottom: 6%;
  padding-top: 2%;
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #000;
  border-radius: 15px;
  width: 80%;
  height: 12vh;
  margin-left: 10%;
  margin-top: 3.5vh;
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
}

.link {
  text-decoration: underline;
}

.input-text {
  width: 100%;
  height: 30px;
  border: none;
  background-color: grey;
  color: white;
  border-radius: 5px;
}
</style>