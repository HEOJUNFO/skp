<template>
  <iframe :src="`${baseUrl}/ar.html#/mission`" frameborder="0"></iframe>
</template>

<script>

export default {
  name: "IsMission",
  setup() {
    return {
      baseUrl: process.env.VUE_APP_PAGE_PATH
    }
  }
}
</script>

<style scoped>

</style>