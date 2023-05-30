/*
*
* 가로 / 세로 모드에 관한 처리
*
* */

export default function useOrientation() {
  function checkOrientation(callback) {
    if(typeof callback !== 'function') {
      throw new Error(`callback must be a function!`)
    }
    
    // 현재 기기의 방향을 확인
    let orientation = window.screen.orientation.type.includes('portrait') ? 'portrait' : 'landscape';
    callback(orientation);

    // resize 이벤트 리스너를 추가하여 화면 크기가 변경될 때마다 방향을 확인
    window.addEventListener('resize', () => {
      orientation = window.screen.orientation.type.includes('portrait') ? 'portrait' : 'landscape';
      callback(orientation);
    });
  }

  return {
    checkOrientation
  }
}