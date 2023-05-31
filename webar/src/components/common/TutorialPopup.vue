<template>
    <div class="tutorial-popup"  @click="$emit('close')" >
      <div class="tutorial-inner">
      <p>반가워요!</p>
      <p>마음에 드는 <span class="highlight">사진프레임</span>과</p>
      <p><span class="highlight">캐릭터</span>를 선택해서</p>
      <p>지금부터 사진 촬영을 시작해볼까요?</p>
    </div>
    </div>
</template>
  
  <script>


  export default {
    name: "TutorialPopup",
    methods: {
      close() {
        this.$emit('close');
      }
    },
    
    
    }


  </script>
  
  <style scoped>
  .tutorial-popup {
    z-index: 10000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(1, 1, 1, 0.8);
    color: #fff;
  }

  .tutorial-inner{
    text-align: center;
  margin-bottom: 1em;
}
  
  .tutorial-popup p {
    color: #fff;
    margin-bottom: 1em;
  }
  
  .highlight {
  color: #FFC040;
}
  </style>