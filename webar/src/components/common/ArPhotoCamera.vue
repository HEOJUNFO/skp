<template>
  <video ref="video" @loadedmetadata="loadedmetadata" @loadeddata="loadeddata"
    :class="{ flipped: cameraSettings.isFlipped }" playsinline />
</template>

<script>
import { onMounted, ref, reactive } from "vue";
import { getArPhotoUserMedia, applyFilter, removeFilter } from "@/js/getArPhotoUserMedia";

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
      const stream = video.value.srcObject;
      stream.getTracks()
        .forEach(track => track.stop());
      video.value.srcObject = null;
      let mode = 'user'
      cameraSettings.facingMode = cameraSettings.facingMode === 'user' ? 'environment' : 'user';
      cameraSettings.isFlipped = !cameraSettings.isFlipped;

      if (window.AFRAME.scenes.length > 0) {
        window.AFRAME.scenes[0].sceneEl.systems['mindar-face-system'].changeCamera(cameraSettings.facingMode);
      }

      try {
        await getArPhotoUserMedia({ videoEl: video.value, facingMode: cameraSettings.facingMode });
      } catch (err) {
        emit('reject:video')
      }

      if (cameraSettings.facingMode === 'user') {
        mode = 'user'
      } else {
        mode = 'environment'
      }
      return mode;
    };

    const beautyFilter = async (isBeauty) => {
      if (isBeauty) {

        applyFilter(video.value, cameraSettings.facingMode);
      } else {
        removeFilter(video.value);
      }
    }

    onMounted(async () => {
      try {
        await getArPhotoUserMedia({ videoEl: video.value, facingMode: cameraSettings.facingMode });
      } catch (err) {
        emit('reject:video')
      }
    })

    return {
      video,
      loadedmetadata,
      loadeddata,
      flipCamera,
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