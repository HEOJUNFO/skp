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
const IOS_CHROME_MARKET_URL = "https://apps.apple.com/kr/app/google-chrome/id535886823";

export default {
  name: "BrowserCheckModal",

  methods: {
    close() {
      this.$emit('close');
    },
    changeBrowser() {
      var eventId = extractEventId(window.location.href);
      if (!eventId) {
        console.error("Event ID not found in the URL");
        return;
      }
      var targetUrl = window.location.host + '/#/?eventId=' + eventId;

      if (navigator.userAgent.match(/iPhone|iPad/i)) {
        //ios
        var visitedAt = (new Date()).getTime();
        setTimeout(
          function () {
            if ((new Date()).getTime() - visitedAt < 2000) {
              location.href = IOS_CHROME_MARKET_URL;
            }
          }, 500);

        setTimeout(function () {
          location.href = "googlechromes://" + targetUrl;
        }, 0);
      } else {
        //android
        location.href = "intent://" + targetUrl + "#Intent;scheme=https;package=com.android.chrome;end";
      }
      function extractEventId(url) {
        const match = url.match(/eventId=([^&]*)/);
        return match ? match[1] : null;
      }
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