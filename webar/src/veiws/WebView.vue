<template>
  <iframe id="iframe" :src="`${baseUrl}/ar.html#/webview`" frameborder="0"></iframe>
</template>

<script>



export default {
  name: "WebView",
  setup() {

    return {
      baseUrl: process.env.VUE_APP_PAGE_PATH

    }
  }
}
</script>
  
<style scoped></style>