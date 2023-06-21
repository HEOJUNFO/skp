<template>
  <a-scene embedded stats :mindar-face="isMindARImage == false ? '' : null"
    :mindar-image="isMindARImage ? 'imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.2/examples/image-tracking/assets/card-example/card.mind; uiError:no; uiLoading:no; uiScanning:no' : null"
    gesture-detector renderer="gammaInput: true; gammaOutput: false; physicallyCorrectLights: false;" color-space="sRGB"
    vr-mode-ui="enabled: false"
    device-orientation-permission-ui="enabled: true;deviceMotionMessage: 브라우저가 동작 및 방향에 접근하는 것을 허용 하시겠습니까?;allowButtonText: 허용; allowButtonText: 허용; denyButtonText: 거절;"
    debug="false" cursor="rayOrigin: mouse" raycaster="objects: .clickable"
    @deviceorientationpermissiongranted="permissionGranted" @deviceorientationpermissionrejected="permissionRejected"
    @deviceorientationpermissionrequested="permissionRequested" @loaded="loaded">
    <a-assets>

      <img id="wallet-image" v-if="targetInfo" v-bind:src="targetInfo.nftWalletImgUrl" />
      <img id="button-texture" src="../../assets/icon/trash-button.png">

      <a-asset-item id="glassesModel"
        src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.1/examples/face-tracking/assets/glasses/scene.gltf"></a-asset-item>
      <a-asset-item id="earringModel"
        src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.1/examples/face-tracking/assets/earring/scene.gltf"></a-asset-item>

      <img id="card"
        src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.2/examples/image-tracking/assets/card-example/card.png" />
      <a-asset-item id="avatarModel"
        src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.2/examples/image-tracking/assets/card-example/softmind/scene.gltf"></a-asset-item>


    </a-assets>

    <a-entity v-if="selectCharacter" position="0 1 0">
      <ar-photo-object v-for="item in characterList" :key="`arphotoobject_${item.id}`" :ar-data="item"
        :visible="selectCharacter.includes(item.id)" @animationcomplete:object="animationcomplete"
        @timeout:object="timeout" />
    </a-entity>
    <a-entity position="0 1 0">
      <ar-photo-object v-for="item in stickerList" :key="`arphotoobject_${item.id}`" :ar-data="item" :visible=true
        @animationcomplete:object="animationcomplete" @timeout:object="timeout" />
    </a-entity>
    <!-- <a-entity v-if="selectFilter" position="0 -1 0">
      <ar-photo-object v-for="item in filterList" :key="`arphotoobject_${item.id}`" :ar-data="item"
        :visible="selectFilter.includes(item.id)" @animationcomplete:object="animationcomplete"
        @timeout:object="timeout" />
    </a-entity> -->
    <a-entity v-if="selectTab" position="0 1 0">
      <ar-photo-object v-for="item in tabList" :key="`arphotoobject_${item.id}`" :ar-data="item"
        :visible="selectTab.includes(item.id)" @animationcomplete:object="animationcomplete" @timeout:object="timeout" />
    </a-entity>

    <a-entity v-if="selectFilter.includes('star')" position="0 -15 -40"
      particle-system="color: #FF0,#FF0; size:2;"></a-entity>
    <a-entity v-if="selectFilter.includes('snow')" position="0 -15 -40"
      particle-system="preset: snow; size:10; particleCount: 1000;"></a-entity>
    <a-entity v-if="selectFilter.includes('rain')" position="0 -15 -40"
      particle-system="preset: rain; size:3; particleCount: 500; color: #60C1FF; "></a-entity>


    <a-entity v-if="isMindARFace" mindar-face-target="anchorIndex: 168">
      <a-gltf-model rotation="0 -0 0" position="0 0.2 0" scale="0.012 0.012 0.012" src="#glassesModel"
        class="glasses1-entity" visible="true"></a-gltf-model>
    </a-entity>

    <a-entity v-if="isMindARFace" mindar-face-target="anchorIndex: 127">
      <a-gltf-model rotation="-0.1 -0 0" position="-0.4 0 -0.3" scale="0.05 0.05 0.05" src="#earringModel"
        class="earring-entity" visible="true"></a-gltf-model>
    </a-entity>

    <a-entity v-if="isMindARFace" mindar-face-target="anchorIndex: 356">
      <a-gltf-model rotation="0.1 -0 0" position="0.4 0 -0.3" scale="0.05 0.05 0.05" src="#earringModel"
        class="earring-entity" visible="true"></a-gltf-model>
    </a-entity>

    <a-entity v-if="isMindARFace" mindar-face-target="anchorIndex: 1">
      <a-sphere color="red" position="0 0.2 0" radius="0.1"></a-sphere>
    </a-entity>

    <a-entity v-if="isMindARFace" mindar-image-target="targetIndex: 0">
      <a-plane src="#card" position="0 0 0" height="0.552" width="1" rotation="0 0 0"></a-plane>
      <a-gltf-model rotation="0 0 0 " position="0 0 0.1" scale="0.005 0.005 0.005" src="#avatarModel"
        animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"></a-gltf-model>
    </a-entity>

    <a-camera active="false"></a-camera>
    <a-entity camera position="0 1.6 0" rotation="0 0 0" rotation-reader zoom="1.5"
      look-controls="enabled:false;"></a-entity>

  </a-scene>
</template>
  
<script>
import { ref } from "vue";
import ArPhotoObject from "@/components/common/ArPhotoObject";

export default {
  name: "EventArPhotoObject",
  props: ['characterList', 'filterList', "tabList"],
  emits: [
    'load:scene',
    'request:orientationpermission',
    'allow:orientationpermission',
    'reject:orientationpermission',
    'animationcomplete'
  ],
  components: { ArPhotoObject },

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