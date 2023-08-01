<template>
    <video ref="video" @loadedmetadata="loadedmetadata" @loadeddata="loadeddata" playsinline />
</template>
  
<script>

import { onMounted, ref } from "vue";
import { getUserMedia } from "@/js/getUserMedia";

export default {
    name: "Camera",
    emits: ['loadeddata', 'loadedmetadata', 'reject:video'],
    setup(props, { emit }) {
        const video = ref(null);
        // meta data load
        const loadedmetadata = () => {
            emit('loadedmetadata');
        }
        // 미디어의 첫번째 프레임이 로딩 완료된 시점
        const loadeddata = () => {
            emit('loadeddata');
        }

        onMounted(async () => {
            try {
                await getUserMedia({ videoEl: video.value });
            } catch (err) {
                // alert('카메라 사용을 허용하지 않으셨습니다. 이벤트 페이지로 돌아갑니다.')
                emit('reject:video')
            }
        })

        return {
            video,
            loadedmetadata,
            loadeddata,
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