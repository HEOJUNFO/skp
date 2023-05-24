<template>
    <div class="main-content">
      <h1>{{ title }}</h1>
      <p>{{ content }}</p>
      <img :src="localImageUrl" class="image" alt="Image from URL" />
      <div class="buttons">
        <button @click="back">뒤로</button>
        <button @click="saveImage">저장</button>
        <button>공유</button>
      </div>
      <div class="box">
        <h2>{{ boxTitle }}</h2>
        <p>{{ boxContent }}</p>
        <button class="copy-button" >{{ boxButton }}</button>
      </div>
      <button class="box-button">경품 추첨하기</button>
      <button class="box-button">사진 출력하기</button>
      <img :src="bannerImageUrl" alt="Banner Image" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: 'Page Title',
        content: 'Page content...',
        boxTitle: 'Box Title',
        boxContent: '필수해시태그',
        boxButton: '해시태그복사하기',
        localImageUrl: '',
      }
    },
    props: ['imageUrl', 'bannerImageUrl'],
    methods: {
        saveImage() {
            const link = document.createElement("a");
            link.href = this.localImageUrl;
            link.download = 'capture.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        back(){
            this.$router.go(-1)
        },
        },

    created() {
      
    this.localImageUrl = this.$route.params.data
   
    },
  }
  </script>
  
  <style scoped>
.main-content {
  text-align: center;
}

.main-content .image {
  max-width: 100%;  /* 이미지의 최대 너비를 부모 요소의 너비로 설정 */
  height: auto;    /* 이미지의 높이를 자동으로 설정하여 비율을 유지 */
  object-fit: cover; /* 이미지가 너무 클 경우, 이미지를 잘라내어 요소에 맞춤 */
}
.buttons {
  display: flex;
  margin-top: 10px;
  justify-content: space-around;
  border: 1px solid #000; /* 테두리 추가 */
}

.copy-button {
    border: 2px solid #000;  /* 테두리를 2px 실선, 검은색으로 설정 */
  }
  
.box {
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  align-items: center;
  border: 1px solid #000; /* 테두리 추가 */
}
  
.box-button {
  display: block;
  margin-top: 10px;
  width: 100%;
  border: 1px solid #000; /* 테두리 추가 */
}
</style>