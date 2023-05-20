<template>
    <iframe :src="`${baseUrl}/basic.html#/drag-n-drop`" frameborder="0"></iframe>
<!--  <iframe :src="`${baseUrl}/nft.html`" frameborder="0"></iframe>-->
</template>

<script>
export default {
  name: "DragNDrop",
  setup() {
    return {
      baseUrl: process.env.VUE_APP_PAGE_PATH
    }
  }
}
</script>

<style scoped>

</style>