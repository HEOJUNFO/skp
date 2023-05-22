<template>
    <div class="tutorial-popup"  @click="$emit('close')">
      <h2>튜토리얼</h2>
      <p>여기에는 튜토리얼에 관한 설명이 표시됩니다.</p>
      <button @click="close">닫기</button>
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
  
  .tutorial-popup h2 {
    font-size: 2em;
  }
  
  .tutorial-popup p {
    margin-bottom: 1em;
  }
  
  .tutorial-popup button {
    padding: 1em 2em;
    font-size: 1em;
    color: #fff;
    background-color: #ff7f00;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>