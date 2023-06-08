<template>
    <vue-final-modal v-model="showVModal">
        <div class="main-content">
            <button class="exit-button" @click="exit">X</button>
            <input type="file" ref="fileInput" @change="uploadImage" accept="image/*" style="display: none">
            <button class="box-button" @click="triggerFileInput">사진 업로드</button>
            <div class="image-group">
                <div v-for="i in imagesData" :key="i.id" class="image-container">
                    <img :src="i.url" alt="Uploaded image">
                </div>
            </div>
            <button class="round-button" @click="exit">AR포토 촬영하기</button>
        </div>
    </vue-final-modal>
</template>
    
<script>
import { ref } from 'vue';
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
            console.log(this.imagesData)
        },
    },
    setup() {
        const showVModal = ref(false);
        const imageUrl = ref('');

        const openModal = (url) => {
            imageUrl.value = url
            showVModal.value = true;
        };
        return {
            showVModal,
            imageUrl,
            openModal,
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
}

.image-container {
    width: 32%;
    height: auto;
    margin-left: 1%;
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
</style>