<template>
    <vue-final-modal v-model="showVModal">
        <div class="main-content">
            <button class="exit-button" @click="exit(), stopInterval()">X</button>
            <input type="file" ref="fileInput" @change="uploadImage" accept="image/*" style="display: none">
            <button class="box-button" @click="triggerFileInput">사진 업로드</button>
            <div class="image-group">
                <div v-for="i in imagesData" :key="i.id" class="image-container">
                    <img :src="i.url" alt="Uploaded image">
                </div>
            </div>
            <button class="round-button" @click="reCapture(), stopInterval()">AR포토 더 촬영하기</button>
            <div v-if="bannerON" class="banner-group">
                <div class="banner-container">
                    <a :href="currentBanner.bannerTargetUrl" target="_blank">
                        <img :src="currentBanner.bannerImgUrl" :alt="currentBanner.bannerSort">
                    </a>
                </div>
            </div>
        </div>
    </vue-final-modal>
</template>
    
<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

import ImageStorage from '../../js/ImageStorage.js';


export default {
    data() {
        return {
            imagesData: [],
        }
    },
    async created() {
        this.data = new ImageStorage('TempDB', 'TempImg');
        await this.data.openDatabase();
        this.imagesData = await this.data.getAll();
    },
    methods: {
        async uploadImage(event) {
            let file = event.target.files[0];
            console.log(file)
            if (!file) return;

            // Save the image to IndexedDB
            let id = await this.data.saveImage(file);
            this.imagesData.push({ id: id, url: URL.createObjectURL(file) });
        },
        exit() {
            this.showVModal = false;
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        reCapture() {
            this.showVModal = false;
            this.$emit('reCapture');
        },
    },
    setup() {
        const { getters } = useStore();
        const showVModal = ref(false);
        const imageUrl = ref('');
        const bannerList = ref([]);
        const currentBanner = ref([])
        const bannerON = ref(false);
        let intervalId = null;

        const changeBanner = () => {
            const nextIndex = (bannerList.value.indexOf(currentBanner.value) + 1) % bannerList.value.length;
            currentBanner.value = bannerList.value[nextIndex];
        }

        const openModal = (url) => {
            imageUrl.value = url
            showVModal.value = true;
            bannerList.value = getters['eventData/bannerList'];
            currentBanner.value = bannerList.value[0];
            bannerON.value = true;
            intervalId = setInterval(changeBanner, 2000);

        };

        const stopInterval = () => {
            if (intervalId) clearInterval(intervalId);
        }

        return {
            showVModal,
            imageUrl,
            openModal,
            bannerList,
            currentBanner,
            bannerON,
            stopInterval,
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
    height: 100%;
    position: absolute;
    background-color: #fff;
}

.image-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    margin-top: 5%;
    margin-right: 1%;
}

.image-container {
    width: 32%;
    height: auto;
    margin-left: 1%;
    margin-bottom: 1%;
}

.image-container img {
    width: 100%;
    height: auto;
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
    height: 60px;
    margin-top: 10px;
    border: 1px solid #000;
    background-color: #fff;
    color: #000;
}

.box-button {
    display: inline-block;
    width: 40%;
    height: 30px;
    margin-top: 10px;
    border: 1px solid #000;
    background-color: #fff;
    color: #000;
}

.banner-group {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    margin-top: 1%;
}

.banner-container {
    width: 45%;
    height: auto;
    margin: 1%;
}

.banner-container img {
    width: 100%;
    height: auto;
}
</style>