<template>
    <div  class="modal">
      <div class="modal-content2">
        <p>네이버 브라우저에서는 일부 기능이 작동하지 않을 수 있습니다.</p>
        <p>다른 브라우저를 사용해주세요.</p>
        <div class="button-container">
          <button class="round-button" @click="close(),changeBrowser()">브라우저 변경하기</button>
        </div>     
      </div>
    </div>
</template>

<script>
  export default {
    name: "BrowserCheckModal",
 
    methods: {
      close() {
        this.$emit('close');
      },
      changeBrowser() {
        window.open('https://www.google.com/chrome/');
      }

    }
  }
  </script>
  
  <style scoped>

.modal {
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content2 {
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  text-align: center;
  background-color: #fff;
  color : #000;
}


.round-button {
  display: inline-block;
  border-radius: 10px;
  width: 40%;
  height: 30px;
  
  border: 2px solid #000; 
  background-color: #fff;
  color: #000;
  margin-top:  5%;
  margin-left: 5%;
  margin-right: 5%;
}

.button-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  justify-content: center;
}
  </style>