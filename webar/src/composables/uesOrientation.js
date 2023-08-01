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
    let orientation = getOrientation();
    callback(orientation);

    // resize 이벤트 리스너를 추가하여 화면 크기가 변경될 때마다 방향을 확인
    window.addEventListener('resize', () => {
      orientation = getOrientation();
      callback(orientation);
    });
  }

  function getOrientation() {
   
      if (typeof window.orientation === 'undefined') {
     return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
      }else{
      return window.orientation === 0 ? 'portrait' : 'landscape';
      }
  }
  

  return {
    checkOrientation
  }
}