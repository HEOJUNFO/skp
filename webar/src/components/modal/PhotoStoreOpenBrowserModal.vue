<template>
    <vue-final-modal v-model="showVModal">
        <div class="main-content">


        </div>
    </vue-final-modal>
</template>
    
<script>
import { ref } from 'vue';

export default {
    methods: {
        exit() {
            this.showVModal = false;
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