import {ref} from "vue";
import {useStore} from "vuex";
import useLoading from "@/composables/useLoading";

export default function useEventHandlers() {
  const {dispatch} = useStore();
  const isRequestOrientationPermission = ref(false);

  const {
    startCounting
  } = useLoading()

  // drag start event handler
  const dragStart = (data) => {
    console.log("nft dragStart : ", data)
  }
  
  // drag end event handler
  const dragEnd = ({type, itemID, position}) => {
    console.log("nft dragEnd : type=%s,itemId=%s,pos=%s", type, itemID, position)
  }
  
  // video access rejection
  const rejectVideo = () => {
    alert('카메라 사용을 허용하지 않으셨습니다. \r이벤트 페이지로 돌아갑니다.')
    dispatch('url/redirectToMain')
  }
  
  // AR load complete
  const loadScene = () => {
    if (typeof DeviceOrientationEvent === 'undefined' || !DeviceOrientationEvent.requestPermission) {
      startCounting();
      return;
    }
  
    DeviceOrientationEvent.requestPermission()
        .then((result) => {
          if (result === 'granted') {
            startCounting();
          }
        })
  }
  
  // requesting orientation permission
  const rquestOrientationPermission = () => {
    isRequestOrientationPermission.value = true;
  }
  
  // allow orientation
  const allowOrientationPermission = () => {
  
    if (!isRequestOrientationPermission.value) {
      document.querySelector('.a-dialog-deny-button').addEventListener('click', rejectOrientationPermission)
    }
  
    if (isRequestOrientationPermission.value) {
      startCounting();
    }
  }
  
  // reject orientation
  const rejectOrientationPermission = () => {
    alert('동작 및 방향 접근을 허용하지 않으셨습니다. \r이벤트 페이지로 돌아갑니다.')
    dispatch('url/redirectToMain')
  }
  
  return {
    dragStart,
    dragEnd,
    rejectVideo,
    loadScene,
    rquestOrientationPermission,
    allowOrientationPermission,
    rejectOrientationPermission,
  }
}