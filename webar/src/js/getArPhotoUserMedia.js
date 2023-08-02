/**
 * 재생중인 모든 스트림 정지
 * @param videoEl
 * @param stream
 */
function stopAllStream(videoEl, stream) {
  if (stream) {
    stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  if (videoEl) {
    videoEl.srcObject = null;
  }
}

/**
 * 비디오 태그 카메라 재생
 * @param videoEl
 * @param constraints
 * @returns {Promise<MediaStream>}
 */
async function playVideo(videoEl, constraints) {
  const stream = await navigator.mediaDevices.getUserMedia(constraints);

  videoEl.srcObject = stream;
  videoEl.onloadedmetadata = function() {
    videoEl.play();
  };
  return stream;
}

/**
 * 카메라 지원 여부 체크
 * @returns {boolean}
 */
function isSupportUserMedia() {
  // Get access to the camera!
  if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
    alert('This browser does not support getUserMedia!');
    return false;
  }
  // enumerateDevices : 미디어 입력 장치나 출력장치의 리스트를
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    alert('This browser does not support enumerateDevices!');
    return false;
  }
  // facingMode : 카메라의 방향 속성
  // user - 전면 카메라(사용자)
  // environment - 후면 카메라
  const supports = navigator.mediaDevices.getSupportedConstraints();
  if (!supports['facingMode']) {
    alert('This browser does not support facingMode!');
    return false;
  }

  return true;
}

/**
 * 사용자 후방 카메라 재생
 * @param videoEl
 * @returns {Promise<void>}
 */
export async function getArPhotoUserMedia({videoEl, facingMode}) {
  
  // 비디오 엘리먼트 여부
  if(!videoEl || !(videoEl instanceof HTMLVideoElement)) {
    throw new Error('videoEl must be required');
  }

  // 카메라 지원여부
  if (!isSupportUserMedia()) {
    return;
  }

  // Get access to the camera!
  // Not adding `{ audio: true }` since we only want video now
  let stream;

  try {
    // 카메라 기본 설정
    const constraints = {
      audio: false,
      video: {
        facingMode: facingMode
      }
    }
    // 재생
    stream = await playVideo(videoEl, constraints);
  } catch (err) {
    alert(err.name + ": " + err.message);
    try {
      // NotReadableError 에러가 아닐경우 에러발생 후 종료
      if (err.name !== 'NotReadableError') {
        throw err;
      }

      // NotReadableError(재생에러)인 경우에는 후방카메라 목록을 받은 후 한 번씩 재생하며 deviceId로 카메라 체크
      // 실행 중이던 stream중지
     
        stopAllStream(videoEl, stream);

    

      // 카메라 마이크 리스트
      const devices = await navigator.mediaDevices.enumerateDevices();

      // 카메라 목록 중 후면 카메라 filter(samsung android)
      let videoList = Array.from(devices)
        .filter(device => device.kind === 'videoinput')
        .filter(device => device.label.indexOf('back') > -1);


      // 카메라 목록이 없는경우(label이 없는 경우) error 처리 후 종료
      if (videoList.length === 0) {
        throw err;
      }

      // 그렇지 않는 경우 후방카메라(label에 back이 들어가있는 카메라)를 한 번씩 돌면서 체크
      while (videoList.length > 0) {
        try {
          // 목록에서 마지막 카메라 정보에서 deviceId추출
          const deviceId = videoList.pop()['deviceId'];
          // 재생 옵션
          const constraints = {
            audio: false,
            video: {deviceId: {exact: deviceId}}
          };
          // deviceId로 재생
          stream = await playVideo(videoEl, constraints);
          break;
        } catch (err) {
          // alert(err.name + ": " + err.message);
          continue;
        }
      }
    } catch (err) {
      // 사용자가 카메라 사용 거부
      if(err.name === 'NotAllowedError') {
        throw err;
      }
      // 카메라 오류
      alert(err.name + ": " + err.message);
    }
  }
}