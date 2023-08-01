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
    <!-- <div v-if="currentIndex == 0">
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
    <div v-if="currentIndex == 1">
      <svg class="circle2" xmlns="http://www.w3.org/2000/svg" width="87" height="87" viewBox="0 0 87 87" fill="none">
        <g style="mix-blend-mode:color-dodge">
          <circle cx="43.5" cy="43.5" r="43.5" fill="white" />
        </g>
      </svg>
      <svg class="effectImage" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path
          d="M15 25.5903C16.3269 26.7779 18.0791 27.5 20 27.5C24.1421 27.5 27.5 24.1422 27.5 20C27.5 16.5413 25.1588 13.6295 21.9748 12.7627M8.02522 12.7627C4.84117 13.6295 2.5 16.5413 2.5 20C2.5 24.1421 5.85786 27.5 10 27.5C14.1421 27.5 17.5 24.1421 17.5 20C17.5 19.0244 17.3137 18.0923 16.9748 17.2373M22.5 10C22.5 14.1421 19.1421 17.5 15 17.5C10.8579 17.5 7.5 14.1421 7.5 10C7.5 5.85786 10.8579 2.5 15 2.5C19.1421 2.5 22.5 5.85786 22.5 10Z"
          stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <p class="effectText"
        style="color: #000; text-align: center; font-family: Inter; font-size: 12px; font-style: normal; font-weight: 400; line-height: normal;"
        :style="frameButtonStyle">효과</p>
    </div> -->
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
  bottom: 8vh;
  left: 13.8%;
}

.frameImage {
  position: absolute;
  bottom: 10.5vh;
  left: 11%;
}

.circle {
  position: absolute;
  bottom: 6.5vh;
  left: 5%;
}

.circle2 {
  position: absolute;
  bottom: 6.5vh;
  right: 5%;
}

.effectText {
  position: absolute;
  bottom: 8.7vh;
  right: 13.8%;
}

.effectImage {
  position: absolute;
  bottom: 11.1vh;
  right: 12.5%;
}
</style>
