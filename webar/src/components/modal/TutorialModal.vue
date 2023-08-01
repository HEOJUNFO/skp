<template>
  <div class="tutorial-popup" :style="{ backgroundColor: bgColor }">
    <div class="tutorial-inner">
      <div v-for="(tutorial, index) in tutorials" :key="index" v-show="currentIndex === index"
        @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
        <img :src="tutorial.image" alt="튜토리얼가이드 이미지 필요!!" />
      </div>

      <div class="navigation">
        <button @click="skip">
          <p
            style="color: #000; text-align: center; font-family: NanumSquare Neo OTF; font-size: 14px; font-style: normal; font-weight: 400; line-height: 140%; opacity: 0.6;">
            건너뛰기</p>
        </button>

        <div class="dots">
          <span v-for="(tutorial, index) in tutorials" :key="index" :class="{ 'active': currentIndex === index }"></span>
        </div>

        <button @click="next">
          <p
            style="color: #000; text-align: center; font-family: NanumSquare Neo OTF; font-size: 18px; font-style: normal; font-weight: 400; line-height: 140%; ">
            다음</p>
        </button>
      </div>
    </div>
    <svg class="circle" xmlns="http://www.w3.org/2000/svg" width="87" height="87" viewBox="0 0 87 87" fill="none">
      <g style="mix-blend-mode:color-dodge">
        <circle cx="43.5" cy="43.5" r="43.5" fill="white" />
      </g>
    </svg>
    <svg class="frameImage" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path
        d="M5 13C5 10.1997 5 8.79961 5.54497 7.73005C6.02433 6.78924 6.78924 6.02433 7.73005 5.54497C8.79961 5 10.1997 5 13 5H27C29.8003 5 31.2004 5 32.27 5.54497C33.2108 6.02433 33.9757 6.78924 34.455 7.73005C35 8.79961 35 10.1997 35 13V27C35 29.8003 35 31.2004 34.455 32.27C33.9757 33.2108 33.2108 33.9757 32.27 34.455C31.2004 35 29.8003 35 27 35H13C10.1997 35 8.79961 35 7.73005 34.455C6.78924 33.9757 6.02433 33.2108 5.54497 32.27C5 31.2004 5 29.8003 5 27V13Z"
        stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M15 15.8333L10 25H30L22.5 12.5L18.3333 18.3333L15 15.8333Z" stroke="black" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <p class="frameText"
      style="color: #000; text-align: center; font-family: Inter; font-size: 12px; font-style: normal; font-weight: 400; line-height: normal;"
      :style="frameButtonStyle">배경</p>
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
      xDown: null,
      yDown: null,
      swipeDirection: null,
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
    handleTouchStart(evt) {
      const firstTouch = evt.touches[0];
      this.xDown = firstTouch.clientX;
      this.yDown = firstTouch.clientY;
    },
    handleTouchMove(evt) {
      if (!this.xDown || !this.yDown) {
        return;
      }

      const xUp = evt.touches[0].clientX;
      const yUp = evt.touches[0].clientY;

      const xDiff = this.xDown - xUp;
      const yDiff = this.yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          this.swipeDirection = 'left';
        }
      }

      this.xDown = null;
      this.yDown = null;
    },
    handleTouchEnd() {
      if (this.swipeDirection === 'left') {
        this.next()
      }
      this.swipeDirection = null;
    }
  }

}
</script>
  
<style scoped>
.tutorial-popup {
  z-index: 4;
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  color: #fff;
  top: -0.1%;
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

.frameText {
  position: absolute;
  bottom: 9%;
  left: 15.5%;
}

.frameImage {
  position: absolute;
  bottom: 11%;
  left: 13%;
}

.circle {
  position: absolute;
  bottom: 7%;
  left: 7%;
}
</style>
