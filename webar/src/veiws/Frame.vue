<template>
    <iframe :src="`${baseUrl}/basic.html#/frame`" frameborder="0"></iframe>
  </template>
  
  <script>
  export default {
    name: "Basic",
    setup() {
        console.log('sfsdfsdffsdfsfs')
      return {
        baseUrl: process.env.VUE_APP_PAGE_PATH
      }
    }
  }
  </script>
  
  <style scoped>
  
  </style>