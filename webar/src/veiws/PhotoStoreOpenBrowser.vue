<template>
  <div class="main-content">
    <button class="exit-button" @click="exit">X</button>
      <img :src="localImageUrl" class="image" alt="Image from URL" />
      <h2>출력 디바이스번호</h2> 
      <input class="device-number-input" type="text" v-model="deviceNumber" placeholder="출력프린터 기기번호 입력">
      <button class="round-button" >셀픽 디바이스 위치 찾기</button>
      <button class="round-button" @click="print">출력하기</button>
      <div v-if="showErrorModal" class="modal">
            <div class="modal-content">
                <h2>디바이스번호 불일치</h2>
                <p>디바이스 번호를 확인후 다시 입력해주세요.</p>
                <input class="device-number-input" type="text" v-model="deviceNumber" placeholder="출력프린터 기기번호 입력">
                <button class="round-button" @click= "print">다시 출력요청</button>
            </div>
      </div>
      <div v-if="showSuccessModal" class="modal">
        <div class="modal-content">
          <h2 ><span >{{"디바이스 번호"}}</span>{{ deviceNumber }}<span >{{"사진출력이 요청되었습니다"}}</span></h2> 
          <p>출력 디바이스에서 반드시 사진을 수령하세요</p> 
          <button class="round-button" @click= "showFailureModal = false">닫기</button>
        </div>
    </div>

    <div v-if="showFailureModal" class="modal">
        <div class="modal-content">
            <h2>무료출력 가능 횟수가 초과되었습니다.</h2>
            <button class="round-button" @click= "showFailureModal = false">닫기</button>
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
      }
    },
    props: {
    imageUrl: {
      type: String,
      required: true,
    },
  },
    methods: {
        exit(){
            this.$router.go(-1)
        },
        print(){
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
  width: 100%;
  height: 50px;
  margin: 10px;
  border: 2px solid #000; 
  background-color: #fff;
  color: #000;
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

    .modal-content {
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        text-align: center;
    }
</style>