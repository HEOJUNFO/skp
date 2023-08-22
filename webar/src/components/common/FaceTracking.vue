<template>
    <a-scene
        mindar-face
        embedded
        renderer="gammaInput: true; gammaOutput: false; physicallyCorrectLights: false;"
        color-space="sRGB"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="
          enabled: true;
          deviceMotionMessage: 브라우저가 동작 및 방향에 접근하는 것을 허용 하시겠습니까?;
          allowButtonText: 허용; allowButtonText: 허용; denyButtonText: 거절;"
        debug="false"
        @deviceorientationpermissiongranted="permissionGranted"
        @deviceorientationpermissionrejected="permissionRejected"
        @deviceorientationpermissionrequested="permissionRequested"
        @loaded="loaded"
    >
      <!-- device-orientation-permission-ui enbled를 false로 하면 ios 12이상에서 motion seneor를 사용 할 수 없다. -->
        <a-assets>
            <a-asset-item id="headModel" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.1/examples/face-tracking/assets/sparkar/headOccluder.glb"></a-asset-item>
            <a-asset-item id="glassesModel" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.1/examples/face-tracking/assets/glasses/scene.gltf"></a-asset-item>
            <a-asset-item id="glassesModel2" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.1/examples/face-tracking/assets/glasses2/scene.gltf"></a-asset-item>
            <a-asset-item id="hatModel" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.1/examples/face-tracking/assets/hat/scene.gltf"></a-asset-item>
            <a-asset-item id="hatModel2" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.1/examples/face-tracking/assets/hat2/scene.gltf"></a-asset-item>
            <a-asset-item id="earringModel" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.1/examples/face-tracking/assets/earring/scene.gltf"></a-asset-item>
        </a-assets>   

        <a-entity mindar-face-target="anchorIndex: 168">
            <a-gltf-model mindar-face-occluder position="0 -0.3 0.15" rotation="0 0 0" scale="0.065 0.065 0.065" src="#headModel" visible="false"></a-gltf-model>
        </a-entity>

        <a-entity mindar-face-target="anchorIndex: 10">
            <a-gltf-model rotation="0 -0 0" position="0 1.0 -0.5" scale="0.35 0.35 0.35" src="#hatModel" class="hat1-entity" visible="false"></a-gltf-model>
        </a-entity>

        <a-entity mindar-face-target="anchorIndex: 10">
            <a-gltf-model rotation="0 -0 0" position="0 -0.2 -0.5" scale="0.008 0.008 0.008" src="#hatModel2" class="hat2-entity" visible="false"></a-gltf-model>
        </a-entity>

        <a-entity mindar-face-target="anchorIndex: 168">
            <a-gltf-model rotation="0 -0 0" position="0 0 0" scale="0.01 0.01 0.01" src="#glassesModel" class="glasses1-entity" visible="true"></a-gltf-model>
        </a-entity>

        <a-entity mindar-face-target="anchorIndex: 168">
            <a-gltf-model rotation="0 -90 0" position="0 -0.3 0" scale="0.6 0.6 0.6" src="#glassesModel2" class="glasses2-entity" visible="false"></a-gltf-model>
        </a-entity>

        <a-entity mindar-face-target="anchorIndex: 127">
            <a-gltf-model rotation="-0.1 -0 0" position="0 -0.3 -0.3" scale="0.05 0.05 0.05" src="#earringModel" class="earring-entity" visible="true"></a-gltf-model>
        </a-entity>

        <a-entity mindar-face-target="anchorIndex: 356">
            <a-gltf-model rotation="0.1 -0 0" position="0 -0.3 -0.3" scale="0.05 0.05 0.05" src="#earringModel" class="earring-entity" visible="true"></a-gltf-model>
        </a-entity>

        <a-entity mindar-face-target="anchorIndex: 1">
            <a-sphere color="red" radius="0.1"></a-sphere>
        </a-entity>

        <a-camera active="false" position="0 0 0" rotation-reader zoom="1" look-controls="enabled:false;">

        </a-camera>

    
    </a-scene>
  </template>
  
  <script>
  import {toRefs} from "vue";
  
  export default {
    name: "EventDragNDropObject",
    props: ['objectList', 'assetList', "targetInfo"],
    emits: [
      'dragstart:object',
      'dragend:object',
      'load:scene',
      'request:orientationpermission',
      'allow:orientationpermission',
      'reject:orientationpermission',
      'animationcomplete'
    ],
    components: {},
  
    setup(props, {emit}) {
      //props
      const {objectList} = toRefs(props);

      objectList;
   
    
  
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
        permissionRequested
      }
    }
  }
  </script>
  
  <style scoped>
   
  </style>