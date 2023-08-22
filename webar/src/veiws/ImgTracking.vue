<template>
  <iframe :src="`${baseUrl}/mind.html#/img-tracking`" frameborder="0"></iframe>
</template>

<script>
export default {
  name: "ImgTracking",
  setup() {
    return {
      baseUrl: process.env.VUE_APP_PAGE_PATH,
    };
  },
};
</script>

<style scoped></style>
