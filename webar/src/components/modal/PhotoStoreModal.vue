<template>
    <vue-final-modal v-model="showVModal">
        <div class="main-content">
            <button class="exit-button" @click="exit(), stopInterval()">
                <img src="../../assets/icon/close-button.png" alt="X" style="width: 35px; height: 45px; " />
            </button>
            <input type="file" ref="fileInput" @change="uploadImage" accept="image/*" style="display: none">
            <button class="box-button" @click="triggerFileInput">사진 업로드</button>
            <div v-if="imagesData.length === 0" class="empty-message" style="margin-top: 1vh;">
                <p>저장되거나 공유된 사진이 없습니다.</p>
                <p>AR포토 촬영하고 다양한 혜택을 받으세요.</p>
            </div>
            <div class="image-group">
                <div v-for="i in visibleImages" :key="i.id" class="image-container">
                    <img :src="i.url" alt="Uploaded image" @click="imgClick(i.url)">
                </div>
            </div>
            <button class="more-button" v-if="imagesData.length > visibleImages.length" @click="showMoreImages">
                <img src="../../assets/icon/more-button.png" alt="더보기" style="width: 30px; height: 40px;" />
            </button>
            <button class="round-button" @click="reCapture(), stopInterval()">AR포토 더 촬영하기</button>
            <div v-if="bannerON" class="banner-group">
                <div class="banner-container">
                    <a :href="currentBanner.bannerTargetUrl" target="_blank">
                        <img :src="currentBanner.bannerImgUrl" :alt="currentBanner.bannerSort">
                    </a>
                </div>
            </div>
        </div>
        <print-open-browser-modal ref="printModal" />
    </vue-final-modal>
</template>
    
<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

import ImageStorage from '../../js/ImageStorage.js';
import PrintOpenBrowserModal from "@/components/modal/PrintOpenBrowserModal";
import usePvLog from "@/composables/usePvLog";

export default {
    components: {
        PrintOpenBrowserModal,
    },
    setup(props, { emit }) {
        const imagesData = ref([]);
        const visibleImages = ref([]);
        const data = new ImageStorage('TempDB', 'TempImg');

        const { getters } = useStore();
        const showVModal = ref(false);
        const bannerList = ref([]);
        const currentBanner = ref([]);
        const bannerON = ref(false);
        const printModal = ref(null);
        const fileInput = ref(null);
        let intervalId = null;

        const { getPvLogParams, putPvLog } = usePvLog();

        onMounted(async () => {
            await data.openDatabase();

            imagesData.value = await data.getAll();
            visibleImages.value = imagesData.value.slice(0, 6);
        });

        const uploadImage = async (event) => {
            let file = event.target.files[0];
            if (!file) return;

            let id = await data.saveImage(file);
            let newImage = { id: id, url: URL.createObjectURL(file) };

            imagesData.value.unshift(newImage);

            if (imagesData.value.length > 30) {
                imagesData.value.pop();
            }
            if (imagesData.value.length <= 6) {
                visibleImages.value.unshift(newImage);
            } else {
                visibleImages.value = imagesData.value.slice(0, 6);
            }
        };

        const showMoreImages = () => {
            visibleImages.value = imagesData.value;
        };

        const triggerFileInput = () => {
            fileInput.value.click();
        };

        const reCapture = () => {
            showVModal.value = false;
            emit('reCapture')
        };

        const changeBanner = () => {
            const nextIndex = (bannerList.value.indexOf(currentBanner.value) + 1) % bannerList.value.length;
            currentBanner.value = bannerList.value[nextIndex];
        }

        const saveImage = async (url) => {
            const blob = await fetch(url).then(r => r.blob());

            let id = await data.saveImage(blob);
            let newImage = { id: id, url: URL.createObjectURL(blob) };

            imagesData.value.unshift(newImage);
            if (imagesData.value.length > 30) {
                imagesData.value.pop();
            }
            if (imagesData.value.length <= 6) {
                visibleImages.value.unshift(newImage);
            } else {
                visibleImages.value = imagesData.value.slice(0, 6);
            }
        }

        const openModal = async (url) => {
            putPvLog(getPvLogParams(0, "/main/photobox"));
            showVModal.value = true;
            bannerList.value = getters['eventData/bannerList'];
            currentBanner.value = bannerList.value[0];
            if (bannerList.value.length > 0) {
                bannerON.value = true;
            }

            const blob = await fetch(url).then(r => r.blob());

            let id = await data.saveImage(blob);
            let newImage = { id: id, url: URL.createObjectURL(blob) };

            imagesData.value.unshift(newImage); // Use imagesData.value instead of this.imagesData
            if (imagesData.value.length > 30) {
                imagesData.value.pop();
            }
            if (imagesData.value.length <= 6) {
                visibleImages.value.unshift(newImage); // Use visibleImages.value instead of this.visibleImages
            } else {
                visibleImages.value = imagesData.value.slice(0, 6); // Use visibleImages.value instead of this.visibleImages
            }
            intervalId = setInterval(changeBanner, 2000);
        };

        const stopInterval = () => {
            if (intervalId) clearInterval(intervalId);
        }

        const imgClick = (imgUrl) => {
            printModal.value.openModal(imgUrl);
        }

        const exit = () => {
            showVModal.value = false;
        }

        const webBack = () => {
            if (printModal.value.showVModal) {
                printModal.value.webBack();
            } else {
                window.onpopstate = null;
                exit();
                stopInterval();
            }
        }

        return {
            imagesData,
            visibleImages,
            uploadImage,
            showMoreImages,
            triggerFileInput,
            reCapture,
            exit,
            showVModal,
            openModal,
            bannerList,
            currentBanner,
            bannerON,
            stopInterval,
            imgClick,
            printModal,
            webBack,
            fileInput,
            saveImage,
        };
    },
}
</script>
  
<style scoped>
.main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    z-index: 2;
    width: 100%;
    height: 100vh;
    position: absolute;
    background-color: #fff;
}

.image-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;
    margin-top: 1vh;
    margin-right: 1%;
    align-items: stretch;
    max-height: 60vh;
    overflow-y: auto;
}

.image-container {
    width: 32%;
    height: auto;
    margin-left: 1%;
    margin-bottom: 1vh;
}

.image-container img {
    width: 100%;
    height: 100%;
}

.exit-button {
    position: absolute;
    top: 5px;
    right: 20px;
    font-size: 2rem;
}

.round-button {
    display: inline-block;
    border-radius: 30px;
    width: 80%;
    height: 10vh;
    position: absolute;
    bottom: 22vh;
    border: 1px solid #000;
    background-color: #fff;
    color: #000;
}

.box-button {
    display: inline-block;
    width: 40%;
    height: 5vh;
    margin-top: 1vh;
    margin-bottom: 1vh;
    border: 1px solid #000;
    background-color: #fff;
    color: #000;
}

.banner-group {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    height: 10vh;
    position: absolute;
    bottom: 8.5vh;
}

.banner-container {
    width: 100%;
    height: 100%;
}

.banner-container img {
    width: 100%;
    height: auto;
}
</style>