<template>
    <div class="main-content">
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
        <input type="file" ref="fileInput" @change="uploadImage" accept="image/*" style="display: none">
        <button class="box-button" @click="triggerFileInput">사진 업로드&nbsp;&nbsp;➔</button>
        <button class="box-button" @click="exit()">나가기&nbsp;&nbsp;➔</button>
        <div v-if="bannerON" class="banner-group">
            <div class="banner-container">
                <button v-if="bannerState === 2 || bannerState === 3" class="button1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 6L9 12L15 18" stroke="black" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg></button>
                <a :href="currentBanner.bannerTargetUrl" target="_blank">
                    <img :src="currentBanner.bannerImgUrl" :alt="currentBanner.bannerSort" @touchstart="handleTouchStart"
                        @touchmove="handleTouchMove" @touchend="handleTouchEnd">
                </a>
                <button v-if="bannerState === 1 || bannerState === 3" class="button2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="black" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg></button>
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
import useEventData from "@/composables/useEventData";
import usePvLog from "@/composables/usePvLog";

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
        this.visibleImages = this.imagesData.slice(0, 9);
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
            if (this.imagesData.length <= 9) {
                this.visibleImages.unshift(newImage);
            } else {
                this.visibleImages = this.imagesData.slice(0, 9);
            }
        },
        showMoreImages() {
            this.visibleImages = this.imagesData;
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
    },
    setup() {
        const { dispatch, getters } = useStore();
        const bannerList = ref([]);
        const currentBanner = ref([])
        const bannerON = ref(false);
        const printModal = ref(null);
        const bannerState = ref(0);

        const {
            getEventData
        } = useEventData({ dispatch });

        const { getPvLogParams, putPvLog } = usePvLog();


        const exit = () => {
            dispatch("url/redirectToMain");
            return
        };

        const prevBanner = () => {
            let prevIndex = bannerList.value.indexOf(currentBanner.value) - 1;
            if (prevIndex < 0) {
                return;
            }
            currentBanner.value = bannerList.value[prevIndex];
            if (prevIndex === 0) {
                bannerState.value = 1;
            } else {
                bannerState.value = 3;
            }
        }

        const nextBanner = () => {
            let nextIndex = bannerList.value.indexOf(currentBanner.value) + 1;
            if (nextIndex >= bannerList.value.length) {
                return;
            }
            currentBanner.value = bannerList.value[nextIndex];
            if (nextIndex === bannerList.value.length - 1) {
                bannerState.value = 2;
            }
            else {
                bannerState.value = 3;
            }
        }


        const imgClick = (imgUrl) => {
            printModal.value.openModal(imgUrl);
        }

        const xDown = ref(null);
        const yDown = ref(null);
        const swipeDirection = ref(null);

        const handleTouchStart = (e) => {
            const firstTouch = e.touches[0];
            xDown.value = firstTouch.clientX;
            yDown.value = firstTouch.clientY;
        }

        const handleTouchMove = (e) => {
            if (!xDown.value || !yDown.value) {
                return;
            }

            let xUp = e.touches[0].clientX;
            let yUp = e.touches[0].clientY;

            let xDiff = xDown.value - xUp;
            let yDiff = yDown.value - yUp;

            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                if (xDiff > 0) {
                    swipeDirection.value = 'left';
                } else {
                    swipeDirection.value = 'right';
                }
            }

            xDown.value = null;
            yDown.value = null;
        }

        const handleTouchEnd = () => {
            if (swipeDirection.value === 'left') {
                nextBanner();
            } else if (swipeDirection.value === 'right') {
                prevBanner();
            }
            swipeDirection.value = null;
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
            putPvLog(getPvLogParams(0, "/main/photobox"));
            await getEventData();
            bannerList.value = getters['eventData/bannerList'];
            currentBanner.value = bannerList.value[0];
            if (bannerList.value.length > 0) {
                bannerON.value = true;
            }
            if (bannerList.value.length > 1) {
                bannerState.value = 1;
            }

        });

        return {
            bannerList,
            nextBanner,
            bannerON,
            imgClick,
            printModal,
            prevBanner,
            currentBanner,
            exit,
            handleTouchEnd,
            handleTouchMove,
            handleTouchStart,
            bannerState
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
    justify-content: center;
    width: 100%;
    margin-top: 5vh;
    max-height: 55vh;
    overflow-y: auto;
    gap: 2%
}

.image-container {
    width: 13vh;
    height: 13vh;
    margin-bottom: 1vh;
    position: relative;
    overflow: hidden;
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.banner-group {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    height: 18vh;
    position: absolute;
    bottom: 0vh;
}

.banner-container {
    width: 100%;
    height: 18vh;
    position: absolute;
}

.banner-container img {
    width: 100%;
    height: 100%;
    z-index: 1;
    position: relative;
}

.banner-container button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
}

.box-button {
    display: inline-block;
    margin-top: 3.5vh;
    border-radius: 24px;
    background-color: #000;
    white-space: nowrap;
    padding: 13px 20px 13px 24px;
    color: var(--white, #FFF);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
}

.button1 {
    position: absolute;
    left: 3%;
}

.button2 {
    position: absolute;
    right: 3%;
}
</style>