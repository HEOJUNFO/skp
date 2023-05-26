<template>
    <button v-on:click="Clear">Clear</button>
    <input type="file" @change="uploadImage" accept="image/*">
    <div v-for="i in imagesData"  :key="i.id">
      <img :src="i.url" @click="deleteImg(i.id)" style="width:50%" alt="Uploaded image">
    </div>
</template>
  
  <script>
    import ImageStorage from '../js/ImageStorage.js';

  export default {
    name: "Storage",
    data() {
        return {
            imagesData: [],
        }
    },
    async created() {
        this.data = new ImageStorage('TempDB', 'TempImg');
        await this.data.openDatabase();

        this.imagesData  = await this.data.getAll();
        console.log(this.imagesData);
      },

    methods: {

        async uploadImage(event) {
          let file = event.target.files[0];
          if (!file) return;

          // Save the image to IndexedDB
          let id = await this.data.saveImage(file);
          this.imagesData.push({id: id, url: URL.createObjectURL(file)});
        },
        async deleteImg(id){
            this.data.deleteImage(id);
            this.imagesData = await this.data.getAll();
        },

        Clear() {
            this.data.clear();
        }

    },
    setup() {
      return {
      }
    }
  }
  </script>
  
  <style scoped>
  </style>