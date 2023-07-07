<template>
  <vue-final-modal v-model="showVModal">
    <div class="main-content">
      <button v-if="!showDeviceModal && !showLocationMap && !showLocationPopup" class="exit-button" @click="exit()">
        <img src="../../assets/icon/close-button.png" alt="X" style="width: 35px; height: 45px; " />
      </button>
      <img :src="imageUrl" class="image" alt="Image from URL" />
      <div class="prints-count">
        <span style="margin-right: 2em;">출력 장수</span>
        <button v-if="printNumber > 1" class="button-print1" @click="decreasePrints">-</button>
        <span class="prints-number">{{ printNumber }}</span>
        <button v-if="printNumber < 5" class="button-print2" @click="increasePrints">+</button>
      </div>

      <button class="round-button" @click="showDeviceModal = true">출력하기</button>
      <div v-if="showErrorModal" class="modal">
        <div class="modal-content">
          <h2>디바이스번호 불일치</h2>
          <br />
          <p>디바이스 번호를 확인후 다시 입력해주세요.</p>
          <input class="device-number-input" type="text" v-model="deviceNumber" placeholder="출력프린터 기기번호 입력">
          <button class="round-button" @click="print()">다시 출력요청</button>
        </div>
      </div>
      <button v-if="deviceLocationFindYn" class="round-button" @click="locationFind()">{{ deviceLocationFindButtonText
      }}</button>
      <div v-if="showDeviceModal" class="modal2">
        <button class="exit-button" @click="showDeviceModal = false, showErrorModal = false">
          <img src="../../assets/icon/close-button.png" alt="X" style="width: 35px; height: 45px; " />
        </button>
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

      <div v-if="showLocationPopup" class="modal2">
        <button class="exit-button" @click="showLocationPopup = false">
          <img src="../../assets/icon/close-button.png" alt="X" style="width: 35px; height: 45px; " />
        </button>
        <div class="modal-content2">
          <img :src="locationFindPopupImgUrl" class="image" alt="Image from URL" />
        </div>
      </div>

      <div v-show="showLocationMap" class="modal2">
        <button class="exit-button" @click="showLocationMap = false">
          <img src="../../assets/icon/close-button.png" alt="X" style="width: 35px; height: 45px; " />
        </button>
        <div class="modal-content2">
          <div id="map"></div>
        </div>
      </div>

    </div>
  </vue-final-modal>
</template>
  
<script>

import { ref, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from "vue-router";

import useSavePrintStatus from '../../composables/useSavePrintStatus';

export default {
  setup() {
    const route = useRoute();
    const { eventId } = toRefs(route.query);
    const { getters } = useStore();
    const showVModal = ref(false);
    const imageUrl = ref('');
    const deviceLocationFindYn = ref(false);
    const deviceLocationFindButtonText = ref('');
    const freePrintControlYn = ref(false);
    const freePrintCustomerCount = ref(10);
    const deviceGpsList = ref([]);
    const deviceNumber = ref('');
    const printNumber = ref(1);
    const printStatus = ref('printing');
    const showDeviceModal = ref(false);
    const showSuccessModal = ref(false);
    const showFailureModal = ref(false);
    const showErrorModal = ref(false);
    const locationFindExposureType = ref('MAP');
    const locationFindPopupImgUrl = ref('');
    const showLocationPopup = ref(false);
    const showLocationMap = ref(false);

    const map = ref(null);
    const markerLatLng = ref(null);
    const maker = ref(null);

    const {
      putSavePrintStatus
    } = useSavePrintStatus();

    const initMap = () => {
      if (typeof window.naver === "undefined") {
        return;
      }

      const mapOptions = {
        center: new window.naver.maps.LatLng(37.402736699419854, 127.10324709161416),
        zoom: 18,
      };

      map.value = new window.naver.maps.Map("map", mapOptions);
      markerLatLng.value = deviceGpsList.value.map((gps) => {
        return {
          lat: gps.deviceGpsLatitude,
          lng: gps.deviceGpsLongitude,
        };
      });
      maker.value = markerLatLng.value.map((latLng) => {
        return new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(latLng.lat, latLng.lng),
          map: map.value,
        });
      });

    };

    const openModal = (url) => {
      imageUrl.value = url
      showVModal.value = true;
      deviceLocationFindYn.value = getters['eventData/deviceLocationFindSettingYn'] === 'Y';
      deviceLocationFindButtonText.value = getters['eventData/deviceLocationFindButtonText'];
      locationFindExposureType.value = getters['eventData/locationFindExposureType'];
      locationFindPopupImgUrl.value = getters['eventData/locationFindPopupImgUrl'];
      freePrintControlYn.value = getters['eventData/freePrintControlYn'] === 'Y';
      freePrintCustomerCount.value = getters['eventData/freePrintCustomerCount'];
      deviceGpsList.value = getters['eventData/deviceGpsList'];

    };

    const checkDeviceNumber = (deviceNumber) => {
      return deviceNumber.value === '0000' || deviceNumber.value === '0001';
    }

    const increasePrints = () => {
      if (printNumber.value < 5)
        printNumber.value++;
    }

    const decreasePrints = () => {
      if (printNumber.value > 1) {
        printNumber.value--;
      }
    }

    const print = () => {
      putSavePrintStatus({
        eventId: eventId.value,
        ocbMbrId: 'test',
        clintUniqueKey: 'test',
        printResultStatus: 'TRY',
      })
      if (!checkDeviceNumber(deviceNumber)) {
        showErrorModal.value = true;
        console.log('error')
        return;
      } else {
        showErrorModal.value = false;
      }
      if (freePrintControlYn.value && freePrintCustomerCount.value < printNumber.value) {
        showFailureModal.value = true;
        return;
      } else if (freePrintCustomerCount.value >= printNumber.value) {
        freePrintCustomerCount.value -= printNumber.value;
        showSuccessModal.value = true;
      }
      showSuccessModal.value = true;
      setTimeout(() => {
        printStatus.value = 'success';
        putSavePrintStatus({
          eventId: eventId.value,
          ocbMbrId: 'test',
          clintUniqueKey: 'test',
          printResultStatus: 'SUCCESS',
        })
      }, 2000);
    }

    const exit = () => {
      showVModal.value = false;
    }

    const locationFind = () => {
      if (locationFindExposureType.value === 'MAP') {
        showLocationMap.value = true;
        initMap();
        map.value.setSize(new window.naver.maps.Size(window.innerWidth * 1, window.innerHeight * 1));

      } else {
        showLocationPopup.value = true;
      }
    }

    const webBack = () => {
      if (showDeviceModal.value || showLocationMap.value || showLocationPopup.value) {
        showDeviceModal.value = false;
        showFailureModal.value = false;
        showSuccessModal.value = false;
        showErrorModal.value = false;
        showLocationMap.value = false;
        showLocationPopup.value = false;
        window.onpopstate = null;
      } else {
        window.onpopstate = null;
        exit();
      }
    }

    return {
      webBack,
      showVModal,
      imageUrl,
      openModal,
      deviceLocationFindYn,
      deviceLocationFindButtonText,
      print,
      increasePrints,
      decreasePrints,
      exit,
      showDeviceModal,
      showFailureModal,
      showSuccessModal,
      printNumber,
      deviceNumber,
      printStatus,
      showErrorModal,
      locationFind,
      showLocationPopup,
      showLocationMap,
      locationFindPopupImgUrl
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
  overflow-y: scroll;
}

.image {
  width: 100%;
  height: auto;
  position: relative;
  top: -3%
}

.exit-button {
  z-index: 3;
  position: absolute;
  top: 0px;
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
  top: 40%;
  left: 10%;
  width: 80%;
  height: auto;
  border: 1px solid #000;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
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

.modal-content2 {
  background-color: #fff;
  width: 100%;
  height: 100%;
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
  margin-bottom: 5%;
  margin-left: 10%;
  width: 80%;
  height: 30px;
}

.prints-number {
  border: 1px solid black;
  padding: 2px 70px;
  height: 60%;

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
  height: 80%;
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
  height: 80%;
}
</style>