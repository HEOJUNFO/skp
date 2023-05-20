/*
*
* 가로 / 세로 모드에 관한 처리
*
* */

export default function uesOrientation() {
  function checkOrientation(callback) {
    if(typeof callback !== 'function') {
      throw new Error(`callback must be function!`)
    }
    // 가로 세로 모드 체크 - 미디어 쿼리 확인
    const mql = window.matchMedia("(orientation: portrait)");

    // If there are matches, we're in portrait
    if(mql.matches) {
      // Portrait orientation
      callback('portrait')
    } else {
      // Landscape orientation
      callback('landscape')
    }

    // Add a media query change listener
    mql.addEventListener('change',(m) => {
      if(m.matches) {
        // Changed to portrait
        callback('portrait');
      }
      else {
        // Changed to landscape
        callback('landscape');
      }
    });
  }

  return {
    checkOrientation
  }
}