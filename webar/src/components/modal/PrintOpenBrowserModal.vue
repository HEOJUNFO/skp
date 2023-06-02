<template>
    <vue-final-modal v-model="showVModal"   >
    <div class="main-content">
      <img :src="imageurl" class="image" alt="Image from URL" />
      <button class="box-button"  @click="print">사진 출력하기</button>
      <div class="buttons">
        <button @click="back">뒤로</button>
        <button @click="share">공유</button>
        <button @click="saveImage(), showSaveModal =true">저장</button>
      </div>
      <div class="box">
        <h2>필수해시태그</h2>
        <p v-html="formattedBoxContent"></p>
       
        <button class="copy-button" @click="copyToClipboard" >해시태그 복사하기</button>
        <transition name="fade">
          <div v-show="isCopyCilp" class="copy-alert" >해시태그가 클립보드에 복사되었습니다.</div>
        </transition>      
      </div> 
      <button class="box-button" @click="showModal = true">경품 추첨하기</button>
      <img :src="bannerImageUrl" alt="Banner Image" />
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <button class="close-button" @click="showModal = false">X</button>
        <img :src="modalImageUrl" alt="Image for Modal" />
        <p>{{ modalText }}</p>
        <div><button class="round-button">배송정보입력(당첨정보입력)</button></div>
        <div><button class="round-button" @click="openReCaptureModal">다시촬영</button></div>
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
          <button class="round-button" @click="print">출력하기</button>
        </div>     
      </div>
    </div>
  </div>
    </vue-final-modal>
  </template>
  
  <script>
  import {  ref } from "vue";
    import { useRouter } from "vue-router";

  
  export default {
    name: "EventCompleteModal",
  data() {
      return {
        title: 'Page Title',
        content: 'Page content...',
        hashtagContent: '#양양서프비치 #AR포토',
        isCopyCilp: false,
        showModal: false,
        modalImageUrl: 'path/to/image.jpg',
        modalText: '배송(당첨)정보 입력 후 경품이 지급됩니다. SNS 공유완료시에 추첨을 통해 더 많은 혜택을 드려요.',
        showReCaptureModal: false,
        showSaveModal: false,
      }
    },
    methods: {
        exit(){
            this.$router.go(-1)
        },
        copyToClipboard() {
         navigator.clipboard.writeText(this.hashtagContent).then(() => {
           this.isCopyCilp = true;
          
           setTimeout(() => this.isCopyCilp = false, 2000);
         }).catch(err => {
              console.error('Could not copy text: ', err);
              alert('해시태그 복사에 실패했습니다. 잠시후 다시 시도해주세요.')
          });
        },
        openReCaptureModal() {
          this.showModal = false;
          this.showReCaptureModal = true;
       },

    },
    computed: {
    formattedBoxContent() {
      const hashtags = this.hashtagContent.split(' ');
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
    },
  },
    setup() {
      const showVModal = ref(false);
      const imageurl = ref('');

      const router = useRouter()
      const printImageUrl = router.currentRoute.value.params.data
      const print = () => {
        router.push({ name: 'Photo Store Open Browser', params: { data:printImageUrl } });
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
            console.log('Share not supported on this browser');
        }
    }

      return {
        print,
        openModal,
        showVModal,
        imageurl,
        saveImage,
        back,
        share,
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
}

.image {
  max-width: 50%;
  height: auto;
}

.buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.box-button {
  display: block;
  margin: 10px auto;
  
  width: 80%;
  height: 40px;
  border: 1px solid #000; 
  border-radius: 10px;
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
  color : #fff;
}
.modal-content2 {
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  text-align: center;
  background-color: #fff;
  color : #000;
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
  border-radius: 10px;
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
    border: 2px solid #000;  
  }
  
.box {
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  align-items: center;
  border: 1px solid #000; 
}
  

.hashtag {
  display: inline-block; 
}
.box p {
  word-wrap: break-word; 
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.copy-alert {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #000;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  z-index: 100;
}

</style>