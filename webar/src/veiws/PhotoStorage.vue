<template>
    <iframe :src="`${baseUrl}/ar.html#/photo-storage`" frameBorder="0"></iframe>
</template>
  
<script>

export default {
    name: "PhotoStorage",
    setup() {
        return {
            baseUrl: process.env.VUE_APP_PAGE_PATH
        }
    }
}
</script>
  
<style scoped></style>