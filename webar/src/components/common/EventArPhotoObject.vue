<template>
  <a-scene embedded :mindar-face="isMindARImage == false ? 'uiError:no; uiLoading:no; uiScanning:no;' : null"
    :mindar-image="isMindARImage ? 'imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.2/examples/image-tracking/assets/card-example/card.mind; uiError:no; uiLoading:no; uiScanning:no' : null"
    gesture-detector renderer="gammaInput: true; gammaOutput: false; physicallyCorrectLights: false; " color-space="sRGB"
    vr-mode-ui="enabled: false"
    device-orientation-permission-ui="enabled: true;deviceMotionMessage: 브라우저가 동작 및 방향에 접근하는 것을 허용 하시겠습니까?;allowButtonText: 허용; allowButtonText: 허용; denyButtonText: 거절;"
    debug="false" cursor="rayOrigin: mouse" raycaster="objects: .clickable"
    @deviceorientationpermissiongranted="permissionGranted" @deviceorientationpermissionrejected="permissionRejected"
    @deviceorientationpermissionrequested="permissionRequested" @loaded="loaded">
    <a-assets>
      <img id="trash-texture" src="../../assets/icon/black-trash-button.png">
    </a-assets>

    <a-entity v-if="selectCharacter" position="0 -1 0">
      <ar-photo-object v-for="item in characterList" :key="`arphotoobject_${item.id}`" :ar-data="item"
        :visible="selectCharacter.includes(item.id)" @animationcomplete:object="animationcomplete"
        @timeout:object="timeout" />
    </a-entity>
    <a-entity position="0 -1 0">
      <ar-photo-object v-for="item in stickerList" :key="`arphotoobject_${item.id}`" :ar-data="item" :visible=true
        @animationcomplete:object="animationcomplete" @timeout:object="timeout" />
    </a-entity>
    <a-entity v-if="selectTab" position="0 -1 0">
      <ar-photo-object v-for="item in tabList" :key="`arphotoobject_${item.id}`" :ar-data="item"
        :visible="selectTab.includes(item.id)" @animationcomplete:object="animationcomplete" @timeout:object="timeout" />
    </a-entity>

    <a-entity camera="" position="" wasd-controls="" rotation="" look-controls="enabled:false;"
      aframe-injected=""></a-entity>
  </a-scene>
</template>
  
<script>
import { ref, watch, toRefs } from "vue";
import ArPhotoObject from "@/components/common/ArPhotoObject";

export default {
  name: "EventArPhotoObject",
  props: ['characterList', 'filterList', 'stickerAsset', "tabList"],
  emits: [
    'load:scene',
    'request:orientationpermission',
    'allow:orientationpermission',
    'reject:orientationpermission',
    'animationcomplete'
  ],
  components: { ArPhotoObject },

  setup(props, { emit }) {
    const { stickerAsset } = toRefs(props);
    const isMindARFace = ref(false);
    const isMindARImage = ref(false);
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


    function addStickersToAssets(stickerAsset) {

      let assets = document.querySelector('a-assets');
      stickerAsset.value.forEach((asset) => {
        assets.insertAdjacentHTML('beforeend', `<img id="${asset.sort}" src="${asset.file}" crossOrigin="anonymous">`);
      });

    }
    let entitiesCreated = {};
    let particleCreated = {};

    watch(() => selectFilter, () => {
      const files = selectFilter.value;
      if (files.length === 0 || !files.some(file => file.includes('json'))) {
        isMindARFace.value = false;
        updateVisibilityOfFaceEntities(false);
        updateVisibilityOfParticleEntities(false);
        return;
      }
      Object.keys(entitiesCreated).forEach((key) => {
        if (!files.some(file => file.split('/').pop().split('.')[0] === key)) {
          updateVisibilityOfFaceEntities(false, key);
        }
      });

      Object.keys(particleCreated).forEach((key) => {
        if (!files.some(file => file.split('/').pop().split('.')[0] === key)) {
          updateVisibilityOfParticleEntities(false, key);
        }
      });

      files.forEach((file) => {
        if (!file.includes('json')) return;
        const fileName = file.split('/').pop().split('.')[0];
        fetch(file)
          .then(response => response.json())
          .then(json => {
            if (hasPreset(json) === false) {
              isMindARFace.value = true;
              if (!entitiesCreated[fileName]) {
                generateEntity(json, fileName).forEach(entity => {
                  document.querySelector('a-scene').insertAdjacentHTML('beforeend', entity);
                });
                entitiesCreated[fileName] = true;
              } else {
                updateVisibilityOfFaceEntities(true, fileName);
              }
            }
            else {
              if (!particleCreated[fileName]) {
                generateParticle(json, fileName).forEach(entity => {
                  document.querySelector('a-scene').insertAdjacentHTML('beforeend', entity);
                });
                particleCreated[fileName] = true;
              } else {
                updateVisibilityOfParticleEntities(true, fileName);
              }
            }
          });
      });
    }, { deep: true });

    function generateEntity(jsonData, fileName) {
      return jsonData.map(data => {
        const position = `${data.position.x} ${data.position.y} ${data.position.z}`;
        const rotation = `${data.rotation.x} ${data.rotation.y} ${data.rotation.z}`;
        const scale = `${data.scale.x} ${data.scale.y} ${data.scale.z}`;

        return `<a-entity class='face' id="${fileName}" mindar-face-target="anchorIndex: ${data.facePosition}">
        <a-gltf-model position="${position}" rotation="${rotation}" scale="${scale}" src="${data.url}"
          visible="true"></a-gltf-model>
      </a-entity>`;
      });
    }
    function generateParticle(jsonData, fileName) {
      return jsonData.map(data => {
        const preset = `${data.preset}`;
        const color = `${data.color}`;
        const particleCount = `${data.particleCount}`;
        const velocityValue = `${data.velocityValue}`;
        const accelerationValue = `${data.accelerationValue}`;
        const maxAge = `${data.maxAge}`;
        const size = `${data.size}`;
        const sizeSpread = `${data.sizeSpread}`;
        const opacity = `${data.opacity}`;
        const opacitySpread = `${data.opacitySpread}`;
        const positionSpread = `${data.positionSpread}`;
        const texture = `${data.texture}`;

        return `<a-entity class='particle' id="${fileName}" position="0 -8 -15" visible="true"
        particle-system="preset:${preset}; size:${size}; particleCount:${particleCount}; color:${color}; 
        velocityValue:${velocityValue}; accelerationValue:${accelerationValue}; maxAge:${maxAge}; sizeSpread:${sizeSpread}; 
        opacity:${opacity}; opacitySpread:${opacitySpread}; positionSpread:${positionSpread}; texture:${texture};"
         ></a-entity>`;
      });
    }

    function updateVisibilityOfFaceEntities(isVisible, fileName) {
      const faceEntities = document.querySelectorAll('.face');
      faceEntities.forEach((entity) => {
        if (!fileName || entity.id === fileName) {
          let modelElement = entity.querySelector('a-gltf-model');
          modelElement.setAttribute('visible', isVisible);
        }
      });
    }

    function updateVisibilityOfParticleEntities(isVisible, fileName) {
      const particleEntities = document.querySelectorAll('.particle');
      particleEntities.forEach((entity) => {
        if (!fileName || entity.id === fileName) {
          entity.setAttribute('visible', isVisible);
        }
      });
    }

    function hasPreset(json) {
      return json.some(data => Object.prototype.hasOwnProperty.call(data, 'preset'));
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
      addStickersToAssets(stickerAsset);
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