<template>
  <video ref="video" @loadedmetadata="loadedmetadata" @loadeddata="loadeddata" playsinline />
</template>

<script>
import { onMounted, ref, toRefs } from "vue";
import { getUserMedia } from "@/js/getUserMedia";

export default {
  name: "Camera",
  props: {
    facingMode: {
      type: String,
      default: 'user',
    },
  },
  emits: ['loadeddata', 'loadedmetadata', 'reject:video'],
  setup(props, { emit }) {
    const video = ref(null);
    const { facingMode } = toRefs(props)

    let myFacingMode = facingMode.value;

    // meta data load
    const loadedmetadata = () => {
      emit('loadedmetadata');
    }
    // 미디어의 첫번째 프레임이 로딩 완료된 시점
    const loadeddata = () => {
      emit('loadeddata');
    }
    const flipCamera = async () => {
      let mode = 'user'
      myFacingMode = myFacingMode === 'user' ? 'environment' : 'user'; // switch between front ("user") and rear ("environment") cameras

      try {
        await getUserMedia({ videoEl: video.value, facingMode: myFacingMode });
      } catch (err) {
        emit('reject:video')
      }

      if (myFacingMode === 'user') {
        mode = 'user'
      } else {
        mode = 'environment'
      }

      return mode;
    };

    const beautyFilter = (isBeauty) => {
      if (isBeauty) {
        video.value.style.filter = 'brightness(135%) contrast(70%) blur(0.5px)';

      } else {
        video.value.style.filter = "none";
      }
    }

    const resetCamera = async () => {
      try {
        await getUserMedia({ videoEl: video.value, facingMode: myFacingMode });
      } catch (err) {
        emit('reject:video')
      }
    }


    onMounted(async () => {
      try {
        await getUserMedia({ videoEl: video.value, facingMode: myFacingMode });
      } catch (err) {
        // alert('카메라 사용을 허용하지 않으셨습니다. 이벤트 페이지로 돌아갑니다.')
        emit('reject:video')
      }
    })

    return {
      video,
      loadedmetadata,
      loadeddata,
      flipCamera,
      resetCamera,
      beautyFilter,
    }
  }
}
</script>

<style scoped>
video {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  position: absolute;

}
</style>