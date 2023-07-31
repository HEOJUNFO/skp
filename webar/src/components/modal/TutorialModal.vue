<template>
  <div class="tutorial-popup" :style="{ backgroundColor: bgColor }">
    <div class="tutorial-inner">
      <div v-for="(tutorial, index) in tutorials" :key="index" v-show="currentIndex === index">
        <img :src="tutorial.image" alt="튜토리얼가이드 이미지 필요!!" />
      </div>

      <div class="navigation">
        <button @click="skip">건너뛰기</button>

        <div class="dots">
          <span v-for="(tutorial, index) in tutorials" :key="index" :class="{ 'active': currentIndex === index }"></span>
        </div>

        <button @click="next">다음</button>
      </div>
      <button class="close-button" @click="close">
        <img src="../../assets/icon/round-close-button.png" alt="내리기" style="width: 40px; height: 40px;" />
      </button>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "TutorialModal",
  data() {
    return {
      tutorials: [
        // 여기에 튜토리얼 이미지와 설명을 추가하십시오
        { image: require('../../assets/img/test1.png'), description: 'tutorial 1' },
        { image: require('../../assets/img/test_2.png'), description: 'tutorial 2' },
        { image: require('../../assets/img/test_3.png'), description: 'tutorial 3' },
        { image: require('../../assets/img/test_4.png'), description: 'tutorial 4' },
      ],
      currentIndex: 0,
      bgColor: 'rgba(1, 1, 1, 1)',
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    next() {
      if (this.currentIndex < this.tutorials.length - 1) {
        this.currentIndex++;
      } else {
        this.close();
      }
    },
    skip() {
      this.close();
    },
    changeBgColor(color) {
      this.bgColor = color;
    },
  }
}
</script>
  
<style scoped>
.tutorial-popup {
  z-index: 3;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  top: -0.1%
}

.tutorial-inner {
  text-align: center;
  margin-bottom: 1em;
  background-color: #fff;
  width: 50%;
}

.navigation {
  display: flex;
  justify-content: space-between;
}

.dots {
  display: flex;
  justify-content: center;
}

.dots span {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: gray;
  margin: 0 4px;
}

.dots span.active {
  background-color: #000;
}

.close-button {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  color: white;
  border-radius: 50%;
  border: none;
  font-size: 30px;
  text-align: center;
  cursor: pointer;
}
</style>