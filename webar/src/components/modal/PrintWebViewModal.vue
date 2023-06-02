<template>
    <div class="main-content">
      <h1>{{ title }}</h1>
      <p>{{ content }}</p>
      <img :src="localImageUrl" class="image" alt="Image from URL" />
      <div class="buttons">
        <button @click="back">뒤로</button>
        <button @click="saveImage">저장</button>
        <button @click="share">공유</button>
      </div>
      <div class="box">
        <h2>{{ boxTitle }}</h2>
        <p v-html="formattedBoxContent"></p>
        <button class="copy-button" @click="copyToClipboard" >{{ boxButton }}</button>
        <div class="toast" v-show="showToast">해시태그가 클립보드에 복사되었습니다.</div>      
      </div>
      <button class="box-button" @click="showModal = true">경품 추첨하기</button>
      <button class="box-button">사진 출력하기</button>
      <img :src="bannerImageUrl" alt="Banner Image" />
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <button class="close-button" @click="showModal = false">X</button>
        <img :src="modalImageUrl" alt="Image for Modal" />
        <p>{{ modalText }}</p>
        <div><button class="round-button">배송정보입력(당첨정보입력)</button></div>
        <div><button class="round-button">URL이동</button></div>
        <div><button class="round-button">AR닫기</button></div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        title: 'Page Title',
        content: 'Page content...',
        boxTitle: '필수해시태그',
        boxContent: '#AR포토개발 #모두화이팅 #마자마자할수있다 #중요한건꺽이지않는마음',
      
        boxButton: '해시태그복사하기',
        localImageUrl: '',
        showToast: false,
        showModal: false,
        modalImageUrl: 'path/to/image.jpg',
        modalText: '배송(당첨)정보 입력 후 경품이 지급됩니다. SNS 공유완료시에 추첨을 통해 더 많은 혜택을 드려요.',
      }
    },
    props: {
    imageUrl: {
      type: String,
      required: true,
    },
    bannerImageUrl: {
      type: String,
    },
  },
    methods: {
        saveImage() {
            const link = document.createElement("a");
            link.href = this.localImageUrl;
            link.download = 'capture.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        back(){
            this.$router.go(-1)
        },
        copyToClipboard() {
         navigator.clipboard.writeText(this.boxContent).then(() => {
           this.showToast = true;
           setTimeout(() => this.showToast = false, 2000);
         }).catch(err => {
              console.error('Could not copy text: ', err);
              alert('해시태그 복사에 실패했습니다. 잠시후 다시 시도해주세요.')
          });
        },
        share() {
        if (navigator.share) {
            navigator.share({
                url: this.$route.params.data,
            })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error),
            alert('공유기능을 지원하지 않는 브라우저입니다.'));
        } else {
            console.log('Share not supported on this browser');
        }
    },
    },
    computed: {
    formattedBoxContent() {
      const hashtags = this.boxContent.split(' ');
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
    created() {
    this.localImageUrl = this.$route.params.data
    },
  }
  </script>
  
  <style scoped>
.main-content {
  text-align: center;
}

.main-content .image {
  max-width: 100%;  
  height: auto;   
  object-fit: cover;
}
.buttons {
  display: flex;
  margin-top: 10px;
  justify-content: space-around;
  border: 1px solid #000;
}
.box-button {
  display: block;
  margin-top: 10px;
  width: 100%;
  border: 1px solid #000; 
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

.toast {
  position: fixed;
  left: 50%;
  bottom: 50px;
  transform: translate(-50%, 0);
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border-radius: 20px;
  opacity: 0.9;
  animation: fadeOut 3s forwards;
}

@keyframes fadeOut {
  from {opacity: 0.9;}
  to {opacity: 0;}
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
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  text-align: center;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  font-size: 1.5em;
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
</style>