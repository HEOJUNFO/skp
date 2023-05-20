<template>
  <a-scene
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
      <ar-asset
          v-for="item in assetList"
          :key="`asset_${item.itemID}`"
          :asset-data="item"
          @ended:video="videocomplete"
      />
    </a-assets>

    <a-entity position="0 0 -2">
      <ar-object
          v-for="item in objectList"
          :key="`arobject_${item.stayObject.itemID}`"
          :ar-data="item"
          @animationcomplete:object="animationcomplete"
          @click:object="clickObject"
          @timeout:object="timeout"
      />
    </a-entity>

    <a-entity
        camera="zoom: 2.5; "
        cursor="rayOrigin: mouse; fuse: false"
        position="0 0 -1"
        look-controls="reverseMouseDrag: true; touchEnabled: false;"
    >
    </a-entity>
  </a-scene>
</template>

<script>
import ArObject from "@/components/common/ArObject"
import ArAsset from "@/components/common/ArAsset";

export default {
  name: "EventArObject",
  props: ['objectList', 'assetList'],
  emits: [
    'click:object',
    'load:scene',
    'request:orientationpermission',
    'allow:orientationpermission',
    'reject:orientationpermission',
    'animationcomplete'
  ],
  components: {ArAsset, ArObject},
  setup(props, {emit}) {
    // isIOS13

    // 아이템 클릭
    const clickObject = (date) => {
      emit('click:object', date)
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
      removeItem(itemID)
    }
    // 아이템 제거
    const removeItem = (itemID) => {
      emit('remove', itemID);
    }

    const loaded = () => {
      emit('load:scene')
    }

    const permissionGranted = () => {
      emit('allow:orientationpermission')
    }

    const permissionRejected = () => {
      emit('reject:orientationpermission')
    }

    const permissionRequested = () => {
      emit('request:orientationpermission')
    }

    return {

      clickObject,
      animationcomplete,
      videocomplete,
      timeout,
      loaded,
      permissionGranted,
      permissionRejected,
      permissionRequested,
    }
  }
}
</script>

<style scoped>

</style>