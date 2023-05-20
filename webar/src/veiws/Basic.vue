<template>
  <iframe :src="`${baseUrl}/basic.html#/basic`" frameborder="0"></iframe>
</template>

<script>
export default {
  name: "Basic",
  setup() {
    return {
      baseUrl: process.env.VUE_APP_PAGE_PATH
    }
  }
}
</script>

<style scoped>

</style>