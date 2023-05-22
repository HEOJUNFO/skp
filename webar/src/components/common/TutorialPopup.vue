<template>
    <div class="tutorial-popup"  @click="$emit('close')">
      <div class="tutorial-inner">
        <p>반가워요!</p>
        <p>마음에 드는 <span style="color:#FFC040">사진프레임</span>과</p>
        <p><span style="color:#FFC040">캐릭터</span>를 선택해서</p>
        <p>지금부터 사진 촬영을 시작해볼까요?</p>
      </div>
    </div>
</template>
  
  <script>
  export default {
    name: "TutorialPopup",
    methods: {
      close() {
        console.log('sfsd')
        this.$emit('close');
      }
    }
  }
  </script>
  
  <style scoped>
  .tutorial-popup {
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
  }

  .tutorial-inner{
    position: absolute;
    width: 100%;
    height: 70%;
    text-align: center;
    margin-bottom: 1;
    top: 60vh;
}
  
  .tutorial-popup p {
    color: #fff;
    margin-bottom: 1em;
  }
  
  </style>