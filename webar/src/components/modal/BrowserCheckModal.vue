<template>
  <div class="modal" @click.stop="">
    <div class="modal-content2">
      <p>네이버 브라우저에서는</p>
      <p>AR포토가 정상적으로 동작하지 않아요.</p>
      <p>기본 브라우저를 변경해주세요.</p>
      <div class="button-container">
        <button class="round-button" @click="close(), changeBrowser()">변경하기</button>
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
      window.location.href = "https://www.google.com/chrome/";
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
  color: #000;
}


.round-button {
  display: inline-block;
  border-radius: 10px;
  width: 40%;
  height: 30px;

  border: 2px solid #000;
  background-color: #fff;
  color: #000;
  margin-top: 5%;
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