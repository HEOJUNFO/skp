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
      <img id="wallet-image" v-if="targetInfo" v-bind:src="targetInfo.nftWalletImgUrl"/>
    </a-assets>

    <a-entity position="0 0 -2">
      <drag-object
          v-for="item in objectList"
          :key="`dragobject_${item.stayObject.itemID}`"
          :ar-data="item"
          @dragstart:object="dragStart"
          @dragend:object="dragEnd"
          @animationcomplete:object="animationcomplete"
          @timeout:object="timeout"
      />
    </a-entity>

    <a-entity cursor="rayOrigin: mouse; fuse: false" position="0 0 -1">
      <a-camera rotation-reader zoom="1" look-controls="reverseMouseDrag: true; touchEnabled: false;">
        <a-entity id="wallet" v-if="targetInfo"
                  v-bind:geometry="'primitive: plane; width: '+targetInfo.nftWalletSizeX+'; height: '+targetInfo.nftWalletSizeX"
                  v-bind:position="targetInfo.nftWalletPositionX+' '+targetInfo.nftWalletPositionY+' '+targetInfo.nftWalletPositionZ"
                  material="color: white; shader: flat; src: #wallet-image">
        </a-entity>
      </a-camera>
    </a-entity>
  </a-scene>
</template>

<script>
// import {computed, toRefs} from "vue";
import {toRefs} from "vue";
import DragObject from "@/components/common/DragObject"
import ArAsset from "@/components/common/ArAsset";


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
  components: {ArAsset, DragObject},

  setup(props, {emit}) {
    //props
    const {objectList} = toRefs(props);

    // 아이템 드래그 시작
    const dragStart = ({type, itemID}) => {
      console.log("nftobject dragstart: %s, %s", type, itemID);
      let camera = document.querySelector('a-camera');
      if (camera) {
        camera.setAttribute("look-controls-enabled", "false");
      }
      // camera.setAttribute("keyboard-controls", "fpsMode:true");
      emit('dragstart', {type, itemID})
    };

    // 아이템 드랍
    const dragEnd = ({type, itemID, position}) => {
      console.log("nftobject dragend: %s, %s, %s, %s ", type, itemID, position.x, position.y);
      let walletBBox = walletClientBBox();
      console.log("wallet bbox : ", walletBBox);

      let camera = document.querySelector('a-camera');
      if(camera){
        camera.removeAttribute("look-controls-enabled");
        // camera.removeAttribute("keyboard-controls");
      }

      if(
          position.x >= walletBBox.x1 && position.x <=walletBBox.x2 &&
          position.y >= walletBBox.y1 && position.y <=walletBBox.y2
      ){
        console.log("Intersect with wallet!!!!!");
		playSound();
        emit('animationcomplete', {itemID})
      }else{
        console.log("Not intersect with wallet!!!!!");
      }
    };

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

    //function wallet client bbox
    function walletClientBBox() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      console.log("w:%s,h:%s", width, height);
      // postion entire coordinate of initial is (-1~+1,-1~+1)
      let px = width / 2.0; // client pixel per 1 x position
      let py = height / 2.0; // client pixel per 1 y position
      console.log("screen pixel for position coordinate : %s,%s", px, py);
      let wx = 0.0;   // wallet position x
      let wy = 0.0 // wallet position y
      let ww = 0.1;  // wallet width of position
      let wh = 0.1;  // wallet height of position
      let walletEl = document.querySelector("#wallet");
      if(walletEl){
        let pos = walletEl.getAttribute("position");
        let geo = walletEl.getAttribute("geometry");
        wx = pos.x;
        wy = pos.y;
        ww = geo.width;
        wh = geo.height;
      }
      console.log("wallet position, size : cx=%s,cy=%s,w=%s,h=%s", wx, wy, ww, wh);
      let dx1 = 1.0 + (wx - ww);  // left distance from left
      let dy1 = 1.0 - (wy + wh);  // upper distance from top
      let dx2 = 1.0 + (wx + ww);  // right distance from left
      let dy2 = 1.0 - (wy - wh);  // lower distance from top
      console.log("wallet distance from screen zero : x1=%s, y1=%s, x2=%s, y2=%s", dx1, dy1, dx2, dy2);
      // left-top(x1,y1), right-bottom (x2,y2)
      return {x1: dx1 * px, y1: dy1 * py, x2: dx2 * px, y2: dy2 * py};
    }

	const audio = new Audio(objectList?.value[0]?.touchSoundUri);
	// audio.addEventListener('loadeddata',() => {\    
    // });
	const playSound = () => {
		audio.play();
	}

    return {
      dragStart,
      dragEnd,
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