<template>
  <vue-final-modal v-model="showVModal">
    <div class="main-content">
      <button class="exit-button" @click="exit">X</button>
      <img :src="imageUrl" class="image" alt="Image from URL" />
      <div class="prints-count">
        <span style="margin-right: 2em;">출력 장수</span>
        <button v-if="printNumber > 1" class="button-print1" @click="decreasePrints">-</button>
        <span class="prints-number">{{ printNumber }}</span>
        <button v-if="printNumber < 5" class="button-print2" @click="increasePrints">+</button>
      </div>

      <button class="round-button" @click="print">출력하기</button>
      <button class="round-button">셀픽 디바이스 위치 찾기</button>
      <div v-if="showDeviceModal" class="modal2">
        <div class="modal-content">
          <p>키오스크 화면에 보이는</p>
          <p>기기번호를 입력해 주세요.</p>
          <input class="device-number-input" type="text" v-model="deviceNumber" placeholder="기기번호 입력">
          <button class="round-button" @click="print">확인</button>
        </div>
      </div>
      <div v-if="showSuccessModal" class="modal2">
        <div class="modal-content">
          <h1 class="highlight-text"><span>{{ "디바이스 번호" }}</span>{{ deviceNumber }}<span>{{ "에" }}</span></h1>
          <h1 class="highlight-text">사진출력이</h1>
          <h1 class="highlight-text">요청되었습니다.</h1>
          <div v-if="printStatus !== 'fail'" class="circle-message">
            <p v-if="printStatus === 'printing'">출력중</p>
            <p v-else-if="printStatus === 'success'">출력완료</p>
          </div>
          <div v-if="printStatus === 'fail'" class="error">
            <p>!</p>
            <p class="error-text">디바이스(통신) 오류로</p>
            <p class="error-text">출력이 불가능 합니다.</p>
          </div>

          <p v-if="printStatus === 'success'" class="bottom-text">출력 디바이스에서 반드시 사진을 수령하세요</p>
          <button v-if="printStatus === 'success'" class="round-button2"
            @click="showSuccessModal = false, printStatus = 'printing'">닫기</button>
          <p v-if="printStatus === 'fail'" class="bottom-text">주변의 현장안내 직원에게 문의 해주세요.</p>
          <button v-if="printStatus === 'fail'" class="round-button2"
            @click="showSuccessModal = false, printStatus = 'printing'">닫기</button>
        </div>
      </div>

      <div v-if="showFailureModal" class="modal2">
        <div class="modal-content">
          <h1 class="highlight-text">무료출력 가능 횟수가</h1>
          <h1 class="highlight-text">초과되었습니다.</h1>
          <div class="circle-message">
            <p>죄송합니다.</p>
          </div>
          <button class="round-button2" @click="showFailureModal = false">닫기</button>
        </div>
      </div>

    </div>
  </vue-final-modal>
</template>
  
<script>
import { ref } from 'vue';

export default {
  data() {
    return {
      deviceNumber: '',
      showDeviceModal: false,
      showSuccessModal: false,
      showFailureModal: false,
      freePrints: 10,
      printStatus: 'printing',
      printNumber: 1,
    }
  },
  methods: {
    exit() {
      this.showVModal = false;
    },
    print() {
      if (!this.checkDeviceNumber(this.deviceNumber)) {
        this.showDeviceModal = false;
        setTimeout(() => {
          this.showDeviceModal = true;
        }, 100);
        return;
      }
      if (this.freePrints > this.printNumber) {
        this.freePrints -= this.printNumber;
        this.showSuccessModal = true;
        setTimeout(() => {
          this.printStatus = 'success';
        }, 1000);
      } else {
        this.showFailureModal = true;
      }
    },
    checkDeviceNumber(deviceNumber) {
      return deviceNumber === '12345';
    },
    increasePrints() {
      if (this.printNumber < 5)
        this.printNumber++;
    },
    decreasePrints() {
      if (this.printNumber > 1) {
        this.printNumber--;
      }
    },
  },
  created() {
    this.localImageUrl = this.$route.params.data
  },
  setup() {
    const showVModal = ref(false);
    const imageUrl = ref('');

    const openModal = (url) => {
      imageUrl.value = url
      showVModal.value = true;
    };
    return {
      showVModal,
      imageUrl,
      openModal,
    }
  },
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
  width: 100%;
  height: auto;
}

.exit-button {
  position: absolute;
  top: 5px;
  right: 20px;
  font-size: 2rem;
}

.round-button {
  display: inline-block;
  border-radius: 30px;
  width: 80%;
  height: 60px;
  margin-top: 10px;
  border: 2px solid #000;
  background-color: #fff;
  color: #000;
}

.round-button2 {
  display: inline-block;
  border-radius: 30px;
  width: 100%;
  height: 30px;
  margin: 10px;
  border: 2px solid #000;
  background-color: #000;
  color: #fff;
}

.device-number-input {
  width: 80%;
  padding: 10px;
  margin: 10px auto;
  display: block;
  border: 1px solid #000;
}

.modal2 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.highlight-text {
  font-size: 1.7em;
  font-weight: bold;
  margin: 20px 0;
  text-align: left;
}


.circle-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 300px;
  border-radius: 50%;
  background-color: gray;
  color: #fff;
  text-align: center;
  margin: 100px auto;
}

.circle-message p {
  font-size: 3.5em;
}

.bottom-text {
  margin: 20px auto;
}

.error {
  color: red;
  font-size: 5em;
  margin: 100px auto;
}

.error-text {
  font-size: 0.3em;
  margin: 20px 0;
  text-align: center;
  color: #000
}

.prints-count {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
  margin-left: 10%;
  width: 80%;
  height: 30px;
}

.prints-number {
  border: 1px solid black;
  padding: 2px 70px;

}

.button-print1 {
  background-color: gray;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  color: white;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
  cursor: pointer;
  padding: 2px 4px;
}

.button-print2 {
  background-color: gray;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  color: white;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.4s;
  cursor: pointer;
  padding: 2px 4px;
}
</style>