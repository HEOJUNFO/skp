<template>
  <video ref="video" @loadedmetadata="loadedmetadata" @loadeddata="loadeddata"
    :class="{ flipped: cameraSettings.isFlipped }" playsinline />
</template>

<script>
import { onMounted, ref, reactive } from "vue";
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

    const cameraSettings = reactive({
      facingMode: props.facingMode,
      isFlipped: props.facingMode === 'user',
    })

    // meta data load
    const loadedmetadata = () => {
      emit('loadedmetadata');
    }
    // first frame loaded
    const loadeddata = () => {
      emit('loadeddata');
    }
    const flipCamera = async () => {
      cameraSettings.facingMode = cameraSettings.facingMode === 'user' ? 'environment' : 'user';
      cameraSettings.isFlipped = !cameraSettings.isFlipped;

      try {
        await getUserMedia({ videoEl: video.value, facingMode: cameraSettings.facingMode });
      } catch (err) {
        emit('reject:video')
      }
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
        await getUserMedia({ videoEl: video.value, facingMode: cameraSettings.facingMode });
      } catch (err) {
        emit('reject:video')
      }
    }


    onMounted(async () => {
      try {
        await getUserMedia({ videoEl: video.value, facingMode: cameraSettings.facingMode });
      } catch (err) {
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
      cameraSettings,
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

.flipped {
  transform: scaleX(-1);
}
</style>