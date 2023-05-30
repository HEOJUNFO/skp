<template>
    <iframe :src="`${baseUrl}/ar.html#/Face`" frameborder="0"></iframe>
<!--  <iframe :src="`${baseUrl}/nft.html`" frameborder="0"></iframe>-->
</template>

<script>
export default {
  name: "Face",
  setup() {
    return {
      baseUrl: process.env.VUE_APP_PAGE_PATH
    }
  }
}
</script>

<style scoped>

</style>