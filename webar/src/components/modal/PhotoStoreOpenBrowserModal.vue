<template>
    <vue-final-modal v-model="showVModal">
        <div class="main-content">
            <input type="file" ref="fileInput" @change="onFileChange" style="display: none">
            <button @click="triggerFileInput">Upload</button>
        </div>
    </vue-final-modal>
</template>
    
<script>
import { ref } from 'vue';

export default {
    data() {
        return {
            selectedFile: null
        };
    },
    methods: {
        onFileChange(e) {
            this.selectedFile = e.target.files[0];
        },
        exit() {
            this.showVModal = false;
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        upload() {
            console.log(this.selectedFile)
            const fd = new FormData();
            fd.append('image', this.selectedFile, this.selectedFile.name);

        }
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
    text-align: center;
    z-index: 2;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #fff;
}

.image {
    width: 100%;
    height: auto;
}
</style>