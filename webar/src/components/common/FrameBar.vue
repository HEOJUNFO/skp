<template>
    <div class="frame-bar" v-if="isVisible" >
      <div class="tab-container">
        <button class="tab" 
                v-for="tab in tabs" 
                :key="tab.id"
                :class="{ selected: selectedTab === tab.id }"
                @click="selectTab(tab.id)">{{ tab.name }}</button>
      </div>
      <div class="image-container">
        <div class="image-view" v-for="image in getImagesForSelectedTab()" :key="image.id">
          <img :src="image.src" />
            <span>{{ image.name }}</span>
        </div>
      </div>
      <div class="button-container">
        <button class="down-button" @click="hide">내리기</button>
        <button class="capture-button">촬영</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FrameBar',
    props: {
      isVisible: Boolean,
      tabs: Array,
      images: Array,
    },
    data() {
    return {
      selectedTab: this.tabs.length > 0 ? this.tabs[0].id : null
    }
  },
    methods: {
    hide() {
      this.$emit('hide');
    },
    selectTab(tabId) {
      this.selectedTab = tabId;
    },
    getImagesForSelectedTab() {
      return this.images.filter(image => image.tabId === this.selectedTab);
    }
  }
  };
  </script>
  
  <style scoped>

.frame-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tab-container {
  display: flex;
  justify-content: center; /* Change this from 'space-between' */
  width: 100%;
  margin-bottom: 20px;
}
.tab {
    margin: 0 35px;
}
  
  .image-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    width: 100%;
  }
  
  .image-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    color : #000;
  }

  .button-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.down-button, .capture-button {
  margin-top: 20px;
}

.tab.selected {
  background-color: #ccc;
}

  </style>