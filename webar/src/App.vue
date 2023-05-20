<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
<!--  <button @click="test">test4</button>-->
  <router-view v-if="!isError"/>
</template>

<script>

import { isMobile, isSafari, deviceType } from 'mobile-device-detect';
import '@/assets/css/common.css';
import {useStore} from "vuex";
import {ref} from "vue";

export default {
  name: 'App',
  setup() {
    const store = useStore();
    const {dispatch} = store;
    const isError = ref(false);

    // ios safari에서 데스크탑 웹사이트 (pc버전 화면) 허용시 에러 처리
    if(isMobile && isSafari && deviceType !== 'mobile') {
      // alert('현재 브라우저는  \r설정 > safari > 데스크탑 웹 사이트 요청 > 모든 웹 사이트를 비활성화 해주세요')
      dispatch('url/redirectToMain');
      alert('현재 브라우저에서는 동작 및 방향이 허용되지 않습니다. 이벤트 페이지로 돌아 갑니다. \r\r ios14 이상인 경우 \r 설정 > safari > 데스크탑 웹 사이트 요청 > 모든 웹 사이트를 비활성화 해주세요')
      // throw new Error();
      isError.value = true;
    }

    // ios 뒤로가기로 화면 진입시 reload코드
    window.addEventListener('pageshow', function(event) {
      //back 이벤트 일 경우
      if (event.persisted) {
        window.location.reload();
      }
    })

    // 페이지를 벗어 날 시 pemission
    // const isOnIOS = navigator.userAgent.match(/iPad/i)|| navigator.userAgent.match(/iPhone/i);
    // const eventName = isOnIOS ? 'pagehide' : 'beforeunload';
    // console.log(`eventName`, eventName)
    // window.addEventListener(eventName, (event) => {
    //   event.cancelBubble = true;
    //   event.preventDefault();
    //   event.returnValue = ''
    //
    //   if (event.persisted) {
    //     /* the page isn't being discarded, so it can be reused later */
    //   }
    // })

    const test = () => {
      window.addEventListener('beforeunload', (event) => {
        event.preventDefault();
        event.returnValue = ''
        return "string";
      })
    }

    return {
      isError,
      test
    }
  }
}
</script>

<style>
@import "assets/css/common.css";
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
</style>
