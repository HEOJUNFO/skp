<template>
    <a-scene mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/skh6257/arconv@main/targets.mind;" color-space="sRGB" renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false">
      <a-assets>
        <img id="card" src="https://cdn.jsdelivr.net/gh/skh6257/arconv@main/img.jpg" />
        <a-asset-item id="avatarModel" src="https://dt-static.syrup.co.kr/danjong//models/King_V4.gltf"></a-asset-item>
        </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

      <a-entity mindar-image-target="targetIndex: 0">
      <a-plane src="#card" position="0 0 0" height="1" width="1" rotation="0 0 0"></a-plane>
      <a-gltf-model rotation="0 0 0 " position="0 0 0.1" scale="0.13 0.13 0.13" src="#avatarModel"
      animation="property: position; to: 0 0.5 0; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
      ></a-gltf-model>
      </a-entity>
    </a-scene>
  </template>
    
  <script>
  import { ref } from "vue";
  
  export default {
    name: "ImgTracking",
    props: ['characterList', 'filterList', "tabList"],
    emits: [
      'load:scene',
      'request:orientationpermission',
      'allow:orientationpermission',
      'reject:orientationpermission',
      'animationcomplete'
    ],
    components: {  },
  
    setup(props, { emit }) {
      const isMindARFace = ref(false);
      const isMindARImage = ref(true);
      const stickerList = ref([]);
  
      const selectCharacter = ref([1]);
      const selectFilter = ref([]);
      const selectTab = ref([]);
  
      const selectSticker = (props) => {
        const propIds = new Set(props.map(prop => prop.id));
        props.forEach(prop => {
          if (!stickerList.value.some(sticker => sticker.id === prop.id)) {
            stickerList.value.push(prop);
          }
        });
        stickerList.value = stickerList.value.filter(sticker => propIds.has(sticker.id));
      }
  
  
      // 애니메이션 재생 완료
      const animationcomplete = (data) => {
        emit('animationcomplete', data);
        // emit('remove', itemID);
      }
      // 설정된 시간 초과
      const timeout = (data) => {
        emit('animationcomplete', data);
      }
      // 비디오 재생 완료
      const videocomplete = (itemID) => {
        removeItem(itemID);
      }
      // 아이템 제거
      const removeItem = (itemID) => {
        emit('remove', itemID);
      }
  
      const loaded = () => {
        //부모가 설정한 load:scene 이벤트에 맵핑된 부모 함수를 실행
        emit('load:scene');
      }
  
      const permissionGranted = () => {
        emit('allow:orientationpermission');
      }
  
      const permissionRejected = () => {
        emit('reject:orientationpermission');
      }
  
      const permissionRequested = () => {
        emit('request:orientationpermission');
      }
  
      return {
        animationcomplete,
        videocomplete,
        timeout,
        loaded,
        permissionGranted,
        permissionRejected,
        permissionRequested,
        selectCharacter,
        selectFilter,
        stickerList,
        selectTab,
        isMindARFace,
        isMindARImage,
        selectSticker
      }
    }
  }
  </script>
    
  <style scoped></style>