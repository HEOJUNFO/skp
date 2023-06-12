<template>
  <vue-final-modal v-model="showVModal">
    <div class="main-content" :style="{ backgroundImage: `url(${filmResultImgUrl})` }">
      <img :src="imageurl" class="image" alt="Image from URL" />
      <button v-if="photoPrintYn" class="box-button" @click="print">{{ photoPrintButtonText }}</button>
      <div class="buttons">
        <button @click="back">
          <img src="../../assets/icon/back-button.png" alt="뒤로" style="width: 30px; height: 30px;" />
        </button>
        <button @click="saveImage(), showSaveModal = true">
          <img src="../../assets/icon/save-button.png" alt="저장" style="width: 30px; height: 30px;" />
        </button>
        <button @click="shareAgreePopupYn ? showAgreeModal = true : share()">
          <img src="../../assets/icon/share-button.png" alt="공유" style="width: 30px; height: 30px;" />
        </button>
      </div>
      <div v-if="hashTagYn" class="box">
        <h1 style="font-weight: bold">필수해시태그</h1>
        <p v-html="formattedBoxContent(hashTagValue)"></p>
        <button class="copy-button" @click="copyToClipboard(hashTagValue)">해시태그 복사하기</button>
        <transition name="fade">
          <div v-show="isCopyCilp" class="copy-alert">해시태그가 클립보드에 복사되었습니다.</div>
        </transition>
      </div>
      <button v-if="photoGiveAwayYn" class="box-button" @click="showModal = true">{{ photoGiveAwayButtonText }}</button>
      <img v-if="filmResultFooterImgYn" :src="filmResultFooterImgUrl" alt="Banner Image" />
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <button class="close-button" @click="showModal = false">X</button>
          <img :src="modalImageUrl" alt="Image for Modal" />
          <p>{{ modalText }}</p>
          <div><button class="round-button">당첨정보입력</button></div>
          <div><button class="round-button" @click="openReCaptureModal">다시촬영</button></div>
          <div><button class="round-button" @click="exit">AR닫기</button></div>
        </div>
      </div>
      <div v-if="showReCaptureModal" class="modal">
        <div class="modal-content2">
          <button class="close-button2" @click="showReCaptureModal = false">X</button>
          <p>정말 당첨을 포기하시겠습니까?</p>
          <div class="button-container">
            <button class="round-button" @click="back">포기</button>
            <button class="round-button" @click="showReCaptureModal = false">취소</button>
          </div>
        </div>
      </div>
      <div v-if="showSaveModal" class="modal">
        <div class="modal-content2">
          <button class="close-button2" @click="showSaveModal = false">X</button>
          <p>휴대폰 갤러리에 저장되었습니다</p>
          <p>지금 출력을 원하시면 출력 하기를</p>
          <p>눌러주세요</p>
          <div class="button-container">
            <button class="round-button" @click="photoStore(), showSaveModal = false">포토함 이동</button>
            <button class="round-button" @click="print(), showSaveModal = false">지금 출력</button>
          </div>
        </div>
      </div>
      <div v-if="showAgreeModal" class="modal">
        <div class="modal-content2">
          <button class="close-button2" @click="showAgreeModal = false">X</button>
          <h1 style="font-weight: bold;">사진 활용 동의 안내</h1>
          <br>
          <p class="text">{{ agreePopupText }}</p>
          <a :href="agreePopupDetailLinkUrl" target="_blank" class="link">자세히보기</a>
          <br>
          <input type="text" :placeholder="agreePopupInputText" class="input-text" />
          <br>
          <div class="button-container">
            <button class="round-button" @click="share">동의하기</button>
          </div>
        </div>
      </div>
    </div>
    <print-web-view-modal ref="printModal" />
    <photo-store-modal ref="photoStoreModal" @reCapture="back()" />
  </vue-final-modal>
</template>
  
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

import PrintWebViewModal from "./PrintWebViewModal.vue";
import PhotoStoreModal from "./PhotoStoreModal.vue";

export default {
  name: "EventCompleteModal",
  components: {
    printWebViewModal: PrintWebViewModal,
    PhotoStoreModal,
  },
  data() {
    return {
      showModal: false,
      modalImageUrl: 'path/to/image.jpg',
      modalText: '배송(당첨)정보 입력 후 경품이 지급됩니다. SNS 공유완료시에 추첨을 통해 더 많은 혜택을 드려요.',
      showReCaptureModal: false,
      showSaveModal: false,
      showAgreeModal: false,
    }
  },
  methods: {
    exit() {
      this.$router.go(-1)
    },

    openReCaptureModal() {
      this.showModal = false;
      this.showReCaptureModal = true;
    },

  },
  setup() {
    const store = useStore();
    const { getters } = store;
    const showVModal = ref(false);
    const imageurl = ref('');
    const isCopyCilp = ref(false);
    const printModal = ref(null);
    const photoStoreModal = ref(null);

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

    const formattedBoxContent = (hashTag) => {
      const hashtags = hashTag.split(' ');
      let lineLength = 0;
      return hashtags.map((hashtag, index) => {
        lineLength += hashtag.length;
        if (lineLength > 25 && index !== 0) {
          lineLength = hashtag.length;
          return `<br/><span class="hashtag">${hashtag}</span>`;
        } else {
          return `<span class="hashtag">${hashtag}</span>`;
        }
      }).join(' ');
    }

    const copyToClipboard = (hashTag) => {
      navigator.clipboard.writeText(hashTag).then(() => {
        isCopyCilp.value = true;

        setTimeout(() => isCopyCilp.value = false, 2000);
      }).catch(err => {
        console.error('Could not copy text: ', err);
        alert('해시태그 복사에 실패했습니다. 잠시후 다시 시도해주세요.')
      });
    }
    const print = () => {
      printModal.value.openModal(imageurl.value);
    }
    const photoStore = () => {
      photoStoreModal.value.openModal(imageurl.value);
    }

    const openModal = (imageUrl) => {
      imageurl.value = imageUrl;
      showVModal.value = true;
    };

    const saveImage = () => {
      const a = document.createElement("a");
      a.href = imageurl.value;
      a.download = "download.jpg";
      a.click();
    };

    const back = () => {
      window.parent.toggleBarVisibility()
      window.parent.reCapture()
      showVModal.value = false;
    }

    const share = () => {
      if (navigator.share) {
        navigator.share({
          url: imageurl.value
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error),
            alert('공유기능을 지원하지 않는 브라우저입니다.'));
      } else {
        alert('공유기능을 지원하지 않는 브라우저입니다.');
      }
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
      hashTagYn,
      hashTagValue,
      formattedBoxContent,
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
      filmResultImgUrl
    }
  }
}
</script>
  
<style scoped>
.main-content {
  text-align: center;
  z-index: 2;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #fff;
  background-blend-mode: multiply;
  padding-top: 10%;
}

.image {
  width: auto;
  height: 33%;
}

.buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 2.5%;
  margin-bottom: 2.5%;
}

.box-button {
  display: block;
  margin-left: 10%;
  margin-top: 2.5%;
  margin-bottom: 2.5%;
  width: 80%;
  height: 5%;
  border: 1px solid #000;
  border-radius: 15px;
  background-color: #fff;
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
  padding: 20px;
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
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  font-size: 1em;
}

.round-button {
  display: inline-block;
  border-radius: 25px;
  width: 100%;
  height: 50px;
  margin: 10px;
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
}

.box {
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  align-items: center;
  border: 1px solid #000;
  border-radius: 15px;
  width: 80%;
  height: 10%;
  margin-left: 10%;
  padding-top: 2.5%;
  padding-bottom: 2.5%;
  gap: 10%;
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

.text {
  word-wrap: break-word;
  max-width: 23ch;
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