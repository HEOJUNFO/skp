<template>
  <div class="main-content">
    <button class="exit-button" @click="exit">X</button>
    <img :src="localImageUrl" class="image" alt="Image from URL" />
    <h2 class="highlight-text2">출력 디바이스번호</h2>
    <input class="device-number-input" type="text" v-model="deviceNumber" placeholder="출력프린터 기기번호 입력">
    <button class="round-button">셀픽 디바이스 위치 찾기</button>
    <button class="round-button" @click="print">출력하기</button>
    <div v-if="showErrorModal" class="modal">
      <div class="modal-content">
        <h2>디바이스번호 불일치</h2>
        <p>디바이스 번호를 확인후 다시 입력해주세요.</p>
        <input class="device-number-input" type="text" v-model="deviceNumber" placeholder="출력프린터 기기번호 입력">
        <button class="round-button" @click="print">다시 출력요청</button>
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
</template>
  
<script>
export default {
  data() {
    return {
      deviceNumber: '',
      showErrorModal: false,
      showSuccessModal: false,
      showFailureModal: false,
      freePrints: 5,
      printStatus: 'printing'
    }
  },
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
  },
  methods: {
    exit() {
      this.$router.go(-1)
    },
    print() {
      if (!this.checkDeviceNumber(this.deviceNumber)) {
        this.showErrorModal = false;
        setTimeout(() => {
          this.showErrorModal = true;
        }, 100);
        return;
      }
      if (this.freePrints > 0) {
        this.freePrints--;
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
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

.highlight-text2 {
  font-weight: bold;
  text-align: left;
  margin-left: 30px;
  margin-top: 5px;

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
}</style>