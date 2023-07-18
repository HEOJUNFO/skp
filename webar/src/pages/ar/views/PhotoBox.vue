<template>
    <div class="main-content">
        <button class="exit-button" @click="exit(), stopInterval()">
            <img src="../../../assets/icon/close-button.png" alt="X" style="width: 35px; height: 45px; " />
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
            <img src="../../../assets/icon/more-button.png" alt="더보기" style="width: 30px; height: 40px;" />
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
</template>
    
<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

import ImageStorage from '../../../js/ImageStorage.js';
import PrintOpenBrowserModal from "@/components/modal/PrintOpenBrowserModal";
import router from '../router/index.js';
import useEventData from "@/composables/useEventData";

export default {
    data() {
        return {
            imagesData: [],
            visibleImages: [],
        }
    },
    components: {
        PrintOpenBrowserModal,
    },
    async created() {
        this.data = new ImageStorage('TempDB', 'TempImg');
        await this.data.openDatabase();
        this.imagesData = await this.data.getAll();
        this.visibleImages = this.imagesData.slice(0, 6);
    },
    methods: {
        async uploadImage(event) {
            let file = event.target.files[0];
            if (!file) return;
            // Save the image to IndexedDB
            let id = await this.data.saveImage(file);
            let newImage = { id: id, url: URL.createObjectURL(file) };

            this.imagesData.unshift(newImage);

            if (this.imagesData.length > 30) {
                this.imagesData.pop();
            }
            if (this.imagesData.length <= 6) {
                this.visibleImages.unshift(newImage);
            } else {
                this.visibleImages = this.imagesData.slice(0, 6);
            }
        },
        showMoreImages() {
            this.visibleImages = this.imagesData;
        },
        exit() {
            router.go(-1);
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        reCapture() {
            window.parent.goArPhoto();
        },
    },
    setup() {
        const { dispatch, getters } = useStore();
        const showVModal = ref(false);
        const bannerList = ref([]);
        const currentBanner = ref([])
        const bannerON = ref(false);
        const printModal = ref(null);
        let intervalId = null;

        const {
            getEventData
        } = useEventData({ dispatch });

        const changeBanner = () => {
            const nextIndex = (bannerList.value.indexOf(currentBanner.value) + 1) % bannerList.value.length;
            currentBanner.value = bannerList.value[nextIndex];
        }

        const stopInterval = () => {
            if (intervalId) clearInterval(intervalId);
        }

        const imgClick = (imgUrl) => {
            printModal.value.openModal(imgUrl);
        }

        const originalOnPopState = function () {
            if (printModal.value.showVModal) {
                history.go(1);
                printModal.value.webBack();
                window.onpopstate = null;
                setTimeout(() => {
                    window.onpopstate = originalOnPopState;
                }, 10);
            } else {
                history.go(-1);
            }
        };

        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {

            if (printModal.value.showVModal) {
                history.go(1);
                printModal.value.webBack();
                window.onpopstate = null;
                setTimeout(() => {
                    window.onpopstate = originalOnPopState;
                }, 10);
            } else {
                history.go(-1);
            }
        };

        onMounted(async () => {
            await getEventData();
            showVModal.value = true;
            bannerList.value = getters['eventData/bannerList'];
            currentBanner.value = bannerList.value[0];
            if (bannerList.value.length > 0) {
                bannerON.value = true;
            }
            intervalId = setInterval(changeBanner, 2000);
        });

        return {
            bannerList,
            currentBanner,
            bannerON,
            stopInterval,
            imgClick,
            printModal,
        }
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
    position: absolute;
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
    height: 10vh;
    position: absolute;
}

.banner-container img {
    width: 100%;
    height: 100%;
}
</style>