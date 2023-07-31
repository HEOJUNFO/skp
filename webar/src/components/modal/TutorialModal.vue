<template>
  <div class="tutorial-popup" :style="{ backgroundColor: bgColor }">
    <div class="tutorial-inner">
      <div v-for="(tutorial, index) in tutorials" :key="index" v-show="currentIndex === index">
        <img :src="tutorial.image" alt="튜토리얼가이드 이미지 필요!!" />
      </div>

      <div class="navigation">
        <button @click="skip">
          <img :src="skipIcon" alt="스킵" />
        </button>

        <div class="dots">
          <span v-for="(tutorial, index) in tutorials" :key="index" :class="{ 'active': currentIndex === index }"></span>
        </div>

        <button @click="next">
          <img :src="nextIcon" alt="다음" />
        </button>
      </div>
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
      bgColor: '#222222',
      nextIcon: require('../../assets/icon/next.png'),
      skipIcon: require('../../assets/icon/skip.png'),
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
  color: #fff;
  top: -0.1%
}

.tutorial-inner {
  text-align: center;
  background-color: #fff;
  width: 40.5vh;
  height: 49vh;
  border-radius: 20px;
  top: 20vh;
  position: relative;
}

.tutorial-inner img {
  width: 75%;
}

.navigation {
  display: flex;
  justify-content: space-around;
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
  background-color: #d9d9d9;
  margin: 0 4px;
}

.dots span.active {
  background-color: #000;
}
</style>