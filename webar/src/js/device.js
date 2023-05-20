import {ref} from "vue";

export const getDeviceList = () => {
  // https://webrtc.org/getting-started/media-devices#using-promises
  const list = ref([]);

  list.value.push(navigator.userAgent)

  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    // console.log("enumerateDevices()를 지원하지 않습니다.");
    return ["enumerateDevices()를 지원하지 않습니다."];
  }

  const supports = navigator.mediaDevices.getSupportedConstraints();
  list.value.push(`facingMode : ${supports['facingMode']}`);

  if (!supports['facingMode']) {
    alert('This browser does not support facingMode!');
  }

  // 카메라와 마이크 리스트
  navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      const deviceList = Array.from(devices)
      // .filter(device => device.kind === 'videoinput');

      list.value.push(deviceList);
    })
    .catch((err) => {
      list.value.push('enumerateDevices err : ' + err.name + ": " + err.message)
    })

  return list
}