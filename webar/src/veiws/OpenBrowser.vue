<template>
  <iframe :src="`${baseUrl}/ar.html#/open-browser`" frameborder="0"></iframe>
</template>

<script>

export default {
  name: "OpenBrowser",
  setup() {

    return {
      baseUrl: process.env.VUE_APP_PAGE_PATH

    }
  }
}
</script>
  
<style scoped></style>