<template>
  <vue-final-modal v-model="showVModal">
    <div class="main-content">
      <button
        v-if="!showDeviceModal && !showLocationMap && !showLocationPopup && !showPrintWaitModal && !showPrintSuccessModal && !showPrintFailureModal"
        class="exit-button" @click="exit()">
        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
          <path d="M31.5 10.5L10.5 31.5M10.5 10.5L31.5 31.5" stroke="black" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>
      <img :src="imageUrl" class="image" alt="Image from URL" />
      <div class="button-container2">
        <div class="prints-count">
          <span
            style="color: #000; text-align: center; font-family: Inter; font-size: 18px; font-style: normal; font-weight: 500; line-height: 140%">출력
            장 수</span>
          <!-- <button v-if="printNumber > 1" @click="decreasePrints" style="margin-left: 15%">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 42 42" fill="none">
              <path
                d="M14 21H28M38.5 21C38.5 30.665 30.665 38.5 21 38.5C11.335 38.5 3.5 30.665 3.5 21C3.5 11.335 11.335 3.5 21 3.5C30.665 3.5 38.5 11.335 38.5 21Z"
                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button> -->
          <span class="prints-number" style="margin-left: 9%; margin-right: 9%">{{ printNumber }}</span>
          <!-- <button v-if="printNumber < freePrintCustomerCount" @click="increasePrints">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 42 42" fill="none">
              <path
                d="M21 14V28M14 21H28M38.5 21C38.5 30.665 30.665 38.5 21 38.5C11.335 38.5 3.5 30.665 3.5 21C3.5 11.335 11.335 3.5 21 3.5C30.665 3.5 38.5 11.335 38.5 21Z"
                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button> -->
        </div>
      </div>
      <div class="button-container2">
        <button class="round-button-red" @click="showDeviceModal = true">위 사진 출력하기&nbsp;&nbsp;➔</button>
      </div>
      <div v-if="showErrorModal" class="modal">
        <button class="close-button2" @click="showErrorModal = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 42 42" fill="none">
            <path d="M31.5 10.5L10.5 31.5M10.5 10.5L31.5 31.5" stroke="black" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
        <div class="modal-content4">
          <h2>디바이스번호 불일치</h2>
          <br />
          <p>디바이스 번호를 확인후 다시 입력해주세요.</p>
          <input class="device-number-input2" type="text" v-model="deviceNumber" placeholder="출력프린터 기기번호 입력" />
          <button class="round-button-red" @click="print()">확인</button>
        </div>
      </div>
      <div v-if="showFiveModal" class="modal3">
        <div class="modal-content4">
          <h2>디바이스번호 5회 불일치</h2>
          <br />
          <p>기기번호를 다시 확인하세요.</p>
          <p>출력페이지를 종료합니다.</p>
          <button class="round-button-red" @click="(showFiveModal = false), (showDeviceModal = false)">확인</button>
        </div>
      </div>
      <div class="button-container2">
        <button v-if="deviceLocationFindYn" class="round-button" @click="locationFind()">사진출력기기 위치
          보기&nbsp;&nbsp;➔</button>
      </div>
      <div v-if="showDeviceModal" class="modal2">
        <button class="exit-button" @click="(showDeviceModal = false), (showErrorModal = false), (showFiveModal = false)">
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
            <path d="M31.5 10.5L10.5 31.5M10.5 10.5L31.5 31.5" stroke="black" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
        <div class="modal-content">
          <p
            style="color: #000; text-align: center; font-family: Corinthia; font-size: 18px; font-style: normal; font-weight: 400; line-height: 140%">
            키오스크 화면에 보이는
          </p>
          <p
            style="color: #000; text-align: center; font-family: Corinthia; font-size: 18px; font-style: normal; font-weight: 400; line-height: 140%">
            기기번호를 입력해 주세요.
          </p>
          <input class="device-number-input" type="text" v-model="deviceNumber" placeholder="기기번호 입력" />
          <button class="round-button-red2"
            @click="showErrorModal === false && showFiveModal === false ? print() : null">확인</button>
        </div>
      </div>
      <div v-if="showPrintWaitModal" class="modal4">
        <div class="modal-content3">
          <h1 v-if="printStatus === 'printing' || printStatus === 'waiting'" class="highlight-text">사진 출력이 요청되었습니다</h1>
          <div v-if="printStatus === 'printing' || printStatus === 'waiting'" class="spinner-container">
            <img id="spinner" src="../../assets/icon/spinning3.png" />
            <span v-if="printStatus === 'printing'" class="spinner-text">출력중</span>
            <span v-if="printStatus === 'waiting'" class="spinner-text">전송중</span>
          </div>
        </div>
      </div>
      <div v-if="showPrintFailureModal" class="modal2">
        <div class="modal-content">
          <div v-if="printStatus === 'failure'" class="error">
            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
              <path
                d="M21 18.375V12.25M21 24.5H21.0175M17.325 33.6L19.88 37.0067C20.26 37.5133 20.4499 37.7666 20.6828 37.8572C20.8868 37.9365 21.1132 37.9365 21.3172 37.8572C21.5501 37.7666 21.74 37.5133 22.12 37.0067L24.675 33.6C25.188 32.916 25.4445 32.574 25.7574 32.3129C26.1745 31.9647 26.667 31.7185 27.1959 31.5936C27.5925 31.5 28.02 31.5 28.875 31.5C31.3212 31.5 32.5443 31.5 33.5091 31.1004C34.7955 30.5675 35.8175 29.5455 36.3504 28.2591C36.75 27.2943 36.75 26.0712 36.75 23.625V13.65C36.75 10.7097 36.75 9.23959 36.1778 8.11655C35.6744 7.1287 34.8713 6.32555 33.8834 5.82222C32.7604 5.25 31.2903 5.25 28.35 5.25H13.65C10.7097 5.25 9.23959 5.25 8.11655 5.82222C7.1287 6.32555 6.32555 7.1287 5.82222 8.11655C5.25 9.23959 5.25 10.7097 5.25 13.65V23.625C5.25 26.0712 5.25 27.2943 5.64963 28.2591C6.18248 29.5455 7.20451 30.5675 8.49091 31.1004C9.45571 31.5 10.6788 31.5 13.125 31.5C13.98 31.5 14.4075 31.5 14.8041 31.5936C15.333 31.7185 15.8255 31.9647 16.2426 32.3129C16.5555 32.574 16.812 32.916 17.325 33.6Z"
                stroke="#EE4848" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p class="error-text">디바이스(통신) 오류로</p>
            <p class="error-text">출력이 불가능 합니다.</p>
          </div>

          <button class="round-button-red2"
            @click="(showPrintFailureModal = false), (showDeviceModal = false), close(), (deviceNumber = null)">닫기</button>
        </div>
      </div>
      <!-- <div class="button-container2"
        v-if="isPhotoBox && !showDeviceModal && !showFailureModal && !showPrintFailureModal && !showPrintSuccessModal && !showPrintWaitModal">
        <button class="round-button-blue" @click="decoratePhoto">사진 꾸미기&nbsp;&nbsp;➔</button>
      </div> -->

      <div v-if="showPrintSuccessModal" class="modal2">
        <div class="modal-content">
          <div class="circle-message">
            <p>출력완료</p>
          </div>
          <p class="bottom-text">출력 디바이스에서</p>
          <p class="bottom-text">반드시 사진을 수령하세요</p>
          <button class="round-button-red2"
            @click="(showPrintSuccessModal = false), (showDeviceModal = false), close(), (deviceNumber = null)">닫기</button>
        </div>
      </div>

      <div v-if="showFailureModal" class="modal2">
        <div class="modal-content">
          <h1 class="highlight-text">무료출력 가능 횟수가</h1>
          <h1 class="highlight-text">초과되었습니다.</h1>
          <br />
          <br />
          <div class="circle-message">
            <p>죄송합니다</p>
          </div>
          <button class="round-button-red2"
            @click="(showFailureModal = false), (showDeviceModal = false), close(), (deviceNumber = null)">닫기</button>
        </div>
      </div>

      <div v-if="showLocationPopup" class="modal2">
        <button class="exit-button" @click="showLocationPopup = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
            <path d="M31.5 10.5L10.5 31.5M10.5 10.5L31.5 31.5" stroke="black" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
        <div class="modal-content2">
          <img :src="locationFindPopupImgUrl" class="image" alt="Image from URL" />
        </div>
      </div>

      <div v-show="showLocationMap" class="modal2">
        <button class="exit-button2" @click="showLocationMap = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
            <path d="M31.5 10.5L10.5 31.5M10.5 10.5L31.5 31.5" stroke="black" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
        <div class="button-container">
          <button v-if="deviceOn" @click="prevLocation()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 6L9 12L15 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <span @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd"> {{
            currentDevice.deviceName }}</span>
          <button v-if="deviceOn" @click="nextLocation()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
        <div class="modal-content2">
          <div id="map"></div>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import { ref, toRefs, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

import usePvLog from "@/composables/usePvLog";

import useSavePrintStatus from "../../composables/useSavePrintStatus";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { eventId } = toRefs(route.query);
    console.log(eventId);
    const { getters, dispatch } = useStore();
    const showVModal = ref(false);
    const imageUrl = ref("");
    const deviceLocationFindYn = ref(false);
    const deviceLocationFindButtonText = ref("");
    const locationFindExposureType = ref("MAP");
    const locationFindPopupImgUrl = ref("");
    const freePrintControlYn = ref(false);
    const freePrintCustomerCount = ref(10);
    const deviceGpsList = ref([]);
    const deviceNumber = ref("");
    const printNumber = ref(1);
    const printStatus = ref("waiting");
    const showDeviceModal = ref(false);
    const showPrintWaitModal = ref(false);
    const showPrintFailureModal = ref(false);
    const showPrintSuccessModal = ref(false);
    const showFailureModal = ref(false);
    const showErrorModal = ref(false);
    const showFiveModal = ref(false);
    const showLocationPopup = ref(false);
    const showLocationMap = ref(false);
    const map = ref(null);
    const marker = ref(null);
    const currentDevice = ref({
      deviceName: "디바이스 없음",
    });
    const deviceOn = ref(false);
    const tempUserKey = ref(null);
    const info = ref(null);

    const randomNumberEight = () => {
      return Math.floor(Math.random() * 100000000);
    };

    const { putSavePrintStatus } = useSavePrintStatus();
    console.log("putSavePrintStatus", putSavePrintStatus);

    const { getPvLogParams, putPvLog } = usePvLog();

    const initMap = () => {
      if (typeof window.naver === "undefined") {
        return;
      }

      if (deviceGpsList.value.length === 0) {
        return;
      }

      const firstDeviceGps = deviceGpsList.value[0];

      const mapOptions = {
        center: new window.naver.maps.LatLng(firstDeviceGps.deviceGpsLatitude, firstDeviceGps.deviceGpsLongitude),
        zoom: 18,
      };

      map.value = new window.naver.maps.Map("map", mapOptions);
      marker.value = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(firstDeviceGps.deviceGpsLatitude, firstDeviceGps.deviceGpsLongitude),
        map: map.value,
        icon: {
          url: require("../../assets/icon/marker.png"),
          size: new window.naver.maps.Size(52, 52),
          origin: new window.naver.maps.Point(0, 0),
          anchor: new window.naver.maps.Point(26, 26),
        },
      });
    };

    const openModal = (url) => {
      imageUrl.value = url;
      showVModal.value = true;
      deviceLocationFindYn.value = getters["eventData/deviceLocationFindSettingYn"] === "Y";
      deviceLocationFindButtonText.value = getters["eventData/deviceLocationFindButtonText"];
      locationFindExposureType.value = getters["eventData/locationFindExposureType"];
      locationFindPopupImgUrl.value = getters["eventData/locationFindPopupImgUrl"];
      freePrintControlYn.value = getters["eventData/freePrintControlYn"] === "Y";
      deviceGpsList.value = getters["eventData/deviceGpsList"];

      const storedValue = localStorage.getItem('freePrintCustomerCount');
      if (storedValue) {
        freePrintCustomerCount.value = parseInt(storedValue, 10);
      } else {
        freePrintCustomerCount.value = getters["eventData/freePrintCustomerCount"];
      }

      if (deviceGpsList.value.length > 0) {
        currentDevice.value = deviceGpsList.value[0];
        if (deviceGpsList.value.length > 1) {
          deviceOn.value = true;
        }
      } else {
        deviceLocationFindYn.value = false;
      }

      // setTimeout(() => {
      //   putPvLog(getPvLogParams(0, "/main/photobox/detail"));
      // }, 100);
    };

    const increasePrints = () => {
      if (printNumber.value < freePrintCustomerCount.value) printNumber.value++;
    };

    const decreasePrints = () => {
      if (printNumber.value > 1) {
        printNumber.value--;
      }
    };

    const isPhotoBox = computed(() => {
      return parent.location.href.indexOf("photo-box") > -1;
    });

    let incorrectDeviceNumberCount = 0;

    const print = async () => {
      info.value = null;
      putPvLog(getPvLogParams(1, "/main/photobox/detail"));

      tempUserKey.value = randomNumberEight();

      if (deviceNumber.value === "" || deviceNumber.value.length == 0) {
        showErrorModal.value = true;
        return;
      }
      getUserHistory(checkHistory);
    };

    const imgUpload = async () => {
      let blob;
      if (!isPhotoBox.value) {
        let byteString = atob(imageUrl.value.split(",")[1]);
        let arrayBuffer = new ArrayBuffer(byteString.length);
        let intArray = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
          intArray[i] = byteString.charCodeAt(i);
        }
        blob = new Blob([arrayBuffer], { type: "image/jpeg" });
      } else {
        blob = await fetch(imageUrl.value).then((r) => r.blob());
      }

      var url = "https://go.selpic.co.kr/skapi/upload";
      // 인화 업로드
      var formData = new FormData();

      formData.append("robot_id", deviceNumber.value); //키오스크 아이디
      formData.append("user_id", tempUserKey.value); //회원 키
      formData.append("file", blob, "img.jpeg");

      try {
        const response = await axios({
          url: url,
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.upload != true) {
          console.log("upload error.");
          printStatus.value = "failure";
          showPrintWaitModal.value = false;
          showPrintFailureModal.value = true;
        } else {
          getUserHistory(uploadLoading);
        }
      } catch (error) {
        console.log("network error.", error);
        printStatus.value = "failure";
        showPrintWaitModal.value = false;
        showPrintFailureModal.value = true;
        return;
      }
    };

    const checkKiosk = async () => {
      if (deviceNumber.value === "0000") {
        printStatus.value = "success";
        showErrorModal.value = false;
        showPrintWaitModal.value = false;
        showPrintSuccessModal.value = true;
        return;
      } else if (deviceNumber.value === "0001") {
        printStatus.value = "failure";
        showErrorModal.value = false;
        showPrintWaitModal.value = false;
        showPrintFailureModal.value = true;
        return;
      } else if (deviceNumber.value === "0002") {
        printStatus.value = "waiting";
        showErrorModal.value = false;
        showPrintWaitModal.value = true;
        setTimeout(() => {
          printStatus.value = "printing";
        }, 2000);
        setTimeout(() => {
          printStatus.value = "success";
          showPrintWaitModal.value = false;
          showPrintSuccessModal.value = true;
        }, 4000);
        return;
      } else if (deviceNumber.value === "0132") {
        deviceNumber.value = "A190" + deviceNumber.value;
      } else if (deviceNumber.value === "0395" || deviceNumber.value === "0396") {
        deviceNumber.value = "A230" + deviceNumber.value;
      }

      var url = "https://go.selpic.co.kr/skapi/kiosk/" + deviceNumber.value;

      try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.status !== "normal") {
          showPrintWaitModal.value = false;
          showErrorModal.value = true;
          incorrectDeviceNumberCount++;
          if (incorrectDeviceNumberCount >= 5) {
            showErrorModal.value = false;
            showFiveModal.value = true;
            showErrorModal.value = false;
            incorrectDeviceNumberCount = 0;
          }
        } else {
          showErrorModal.value = false;
          incorrectDeviceNumberCount = 0;
          if (freePrintControlYn.value && freePrintCustomerCount.value < printNumber.value) {
            showPrintWaitModal.value = false;
            showFailureModal.value = true;
            return;
          } else if (freePrintCustomerCount.value >= printNumber.value) {
            freePrintCustomerCount.value -= printNumber.value;
            localStorage.setItem('freePrintCustomerCount', freePrintCustomerCount.value);
          }
          console.log("print start");
          imgUpload();
        }
      } catch (error) {
        console.log("network error.", error);
        showFailureModal.value = true;
        return;
      }
    };

    const checkUploadStatus = (data) => {
      if (info.value === "X") {
        return;
      }

      info.value = data[0];

      switch (info.value.status) {
        case "S": //
          printStatus.value = "success";
          showPrintWaitModal.value = false;
          showPrintSuccessModal.value = true;
          break;
        case "F": // 실패
          printStatus.value = "failure";
          showPrintWaitModal.value = false;
          showPrintFailureModal.value = true;
          break;
        case "W": // 전송중
          printStatus.value = "waiting";
          showPrintWaitModal.value = true;
          break;
        case "P": // 인쇄중
          printStatus.value = "printing";
          showPrintWaitModal.value = true;
          break;
      }

      if (info.value.status == "W" || info.value.status == "P") {
        setTimeout(() => {
          getUserHistory(uploadLoading);
        }, 2000);
      }
    };

    const uploadLoading = (data) => {
      if (data.length <= 0) {
        console.log(data);
        printStatus.value = "failure";
        showPrintWaitModal.value = false;
        showPrintFailureModal.value = true;
        return;
      }

      checkUploadStatus(data);
    };

    const checkHistory = (data) => {
      if (data.length <= 0) {
        console.log(data);
        printStatus.value = "waiting";
        showPrintWaitModal.value = true;
        checkKiosk();
        return;
      } else {
        checkUploadStatus(data);
      }
    };

    const getUserHistory = async (callbackFunc) => {
      var url = "https://go.selpic.co.kr/skapi/order/" + tempUserKey.value;
      try {
        const response = await axios.get(url);
        console.log(response.data);
        callbackFunc(response.data);
      } catch (error) {
        console.log(error);
        return;
      }
    };

    const exit = () => {
      showVModal.value = false;
    };

    const close = () => {
      if (isPhotoBox.value) {
        showVModal.value = false;
      }
    };

    const locationFind = () => {
      if (locationFindExposureType.value === "MAP") {
        showLocationMap.value = true;
        initMap();
        if (deviceGpsList.value.length > 0) {
          map.value.setSize(new window.naver.maps.Size(window.innerWidth * 1, window.innerHeight * 1));
        }
      } else {
        showLocationPopup.value = true;
      }
    };

    const prevLocation = () => {
      let prevIndex = deviceGpsList.value.indexOf(currentDevice.value) - 1;
      if (prevIndex < 0) {
        prevIndex = deviceGpsList.value.length - 1;
      }
      currentDevice.value = deviceGpsList.value[prevIndex];
      marker.value.setPosition(new window.naver.maps.LatLng(currentDevice.value.deviceGpsLatitude, currentDevice.value.deviceGpsLongitude));
      map.value.setCenter(new window.naver.maps.LatLng(currentDevice.value.deviceGpsLatitude, currentDevice.value.deviceGpsLongitude));
    };

    const nextLocation = () => {
      let nextIndex = deviceGpsList.value.indexOf(currentDevice.value) + 1;
      if (nextIndex >= deviceGpsList.value.length) {
        nextIndex = 0;
      }
      currentDevice.value = deviceGpsList.value[nextIndex];
      marker.value.setPosition(new window.naver.maps.LatLng(currentDevice.value.deviceGpsLatitude, currentDevice.value.deviceGpsLongitude));
      map.value.setCenter(new window.naver.maps.LatLng(currentDevice.value.deviceGpsLatitude, currentDevice.value.deviceGpsLongitude));
    };

    const xDown = ref(null);
    const yDown = ref(null);
    const swipeDirection = ref(null);

    const handleTouchStart = (e) => {
      const firstTouch = e.touches[0];
      xDown.value = firstTouch.clientX;
      yDown.value = firstTouch.clientY;
    };

    const handleTouchMove = (e) => {
      if (!xDown.value || !yDown.value) {
        return;
      }

      let xUp = e.touches[0].clientX;
      let yUp = e.touches[0].clientY;

      let xDiff = xDown.value - xUp;
      let yDiff = yDown.value - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          swipeDirection.value = "left";
        } else {
          swipeDirection.value = "right";
        }
      }

      xDown.value = null;
      yDown.value = null;
    };

    const handleTouchEnd = () => {
      if (swipeDirection.value === "left") {
        nextLocation();
      } else if (swipeDirection.value === "right") {
        prevLocation();
      }
      swipeDirection.value = null;
    };

    const webBack = () => {
      if (showDeviceModal.value || showLocationMap.value || showLocationPopup.value) {
        showDeviceModal.value = false;
        showFailureModal.value = false;
        showPrintWaitModal.value = false;
        showPrintSuccessModal.value = false;
        showPrintFailureModal.value = false;
        showErrorModal.value = false;
        showLocationMap.value = false;
        showLocationPopup.value = false;
        showFiveModal.value = false;
        info.value = "X";
        window.onpopstate = null;
      } else {
        window.onpopstate = null;
        exit();
      }
    };

    const decoratePhoto = async () => {
      if (imageUrl.value.startsWith("data:image")) {
        await dispatch("eventData/setSeletedPhoto", imageUrl.value);
      } else {
        const image = await window.Jimp.read(imageUrl.value);

        const imageSrc = await image.getBase64Async("image/png");
        await dispatch("eventData/setSeletedPhoto", imageSrc);
      }

      if (isPhotoBox.value) {
        // router.push({ name: "WebView", query: { eventId: eventId.value } });
        window.parent.location.href = window.parent.location.href.replace(/\/photo-box/gi, "");
      } else {
        router.go(0);
      }
    };

    return {
      locationFind,
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
      showPrintWaitModal,
      showPrintSuccessModal,
      showPrintFailureModal,
      printNumber,
      deviceNumber,
      printStatus,
      showErrorModal,
      webBack,
      decoratePhoto,
      isPhotoBox,
      showLocationPopup,
      showLocationMap,
      locationFindPopupImgUrl,
      freePrintCustomerCount,
      showFiveModal,
      prevLocation,
      nextLocation,
      currentDevice,
      deviceOn,
      handleTouchMove,
      handleTouchStart,
      handleTouchEnd,
      close,
    };
  },
};
</script>

<style scoped>
.main-content {
  text-align: center;
  z-index: 2;
  width: 100%;
  height: 100vh;
  position: absolute;
  background-color: #fff;
  overflow-y: scroll;
}

.image {
  width: auto;
  height: 49vh;
  position: relative;
  margin-top: 10vh;
}

.exit-button {
  z-index: 3;
  position: absolute;
  top: 1.5vh;
  right: 4%;
}

.exit-button2 {
  z-index: 3;
  position: absolute;
  top: 0vh;
  right: 0%;
}

.round-button {
  display: inline-block;
  margin-top: 3.5vh;
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

.round-button-red {
  display: inline-block;
  margin-top: 2vh;
  border-radius: 24px;
  background-color: #ee4848;
  white-space: nowrap;
  padding: 13px 20px 13px 24px;
  color: var(--white, #fff);
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
}

.round-button-blue {
  display: inline-block;
  margin-top: 3.5vh;
  border-radius: 24px;
  background-color: #5948ee;
  white-space: nowrap;
  padding: 13px 20px 13px 24px;
  color: var(--white, #fff);
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
}

.round-button-red2 {
  display: inline-block;
  width: 61%;
  height: 6vh;
  margin-top: 9vh;
  border-radius: 24px;
  background-color: #ee4848;
  white-space: nowrap;
  color: var(--white, #fff);
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  text-align: center;
}

.round-button-red3 {
  display: inline-block;
  width: 61%;
  height: 6vh;
  margin-top: 3.5vh;
  border-radius: 24px;
  background-color: #ee4848;
  white-space: nowrap;
  color: var(--white, #fff);
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  text-align: center;
}

.device-number-input {
  width: 58%;
  padding: 14px 15px 16px 15px;
  margin-top: 2.5vh;
  border: 1px solid #000;
}

.device-number-input2 {
  width: 88%;
  padding: 14px 15px 16px 15px;
  margin-top: 2.5vh;
  border: 1px solid #000;
}

.modal {
  position: fixed;
  top: 25vh;
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
  height: 100vh;
  background-color: #fff;
  display: grid;
  justify-content: center;
  align-items: center;
}

.modal4 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  justify-content: center;
  align-items: center;
}

.modal3 {
  position: fixed;
  top: 40%;
  left: 10%;
  width: 80%;
  height: auto;
  border: 1px solid #000;
  background-color: #fff;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
}

.modal-content {
  background-color: #fff;
  text-align: center;
  margin-top: 5vh;
}

.modal-content3 {
  background-color: #fff;
  text-align: center;
  margin-top: 23vh;
}

.modal-content2 {
  background-color: #fff;
  width: 100%;
  height: 80vh;
}

.modal-content4 {
  background-color: #fff;
  text-align: center;
  padding: 5%;
  display: grid;
}

.highlight-text {
  color: #000;
  text-align: center;
  font-family: NanumSquare Neo OTF;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}

.circle-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 242px;
  width: 242px;
  border-radius: 50%;
  background-color: #ee4848;
  color: #fff;
  text-align: center;
  margin-bottom: 10vh;
}

.circle-message p {
  text-align: center;
  font-family: NanumSquare Neo OTF;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  font-size: 2.5em;
  color: #fff;
  white-space: nowrap;
}

.error-text {
  color: #000;
  text-align: center;
  font-family: NanumSquare Neo OTF;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}

.prints-count {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3.5vh;
  width: 80%;
  height: 4vh;
}

.close-button2 {
  position: absolute;
  top: 2px;
  right: 5px;
  border: none;
  background-color: transparent;
  font-size: 1em;
}

.button-container {
  width: 100%;
  height: 88vh;
  position: absolute;
  top: 7vh;
}

.button-container span {
  width: 100%;
  height: 100%;
  z-index: 1;
  position: relative;
}

.button-container button {
  position: absolute;
  z-index: 2;
}

.button-container button:first-of-type {
  left: 2%;
}

.button-container button:last-of-type {
  right: 2%;
}

.button-container2 {
  display: flex;
  justify-content: center;
}

@keyframes spin {
  0% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

#spinner {
  width: 62%;
  animation: spin 2s linear infinite;
}

.spinner-container {
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
}

.spinner-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ee4848;
  text-align: center;
  font-family: NanumSquare Neo OTF;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}

.bottom-text {
  color: #000;
  text-align: center;
  font-family: NanumSquare Neo OTF;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
}

.prints-number {
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
}
</style>