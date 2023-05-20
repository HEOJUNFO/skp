<template>
<!--  <div class="arjs-loader">
    <div>Loading, please wait...</div>
  </div>-->
  <a-scene
      embedded
      renderer="gammaOutput: true; logarithmicDepthBuffer: true;"
      vr-mode-ui="enabled: false;"
      arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: false;"
      device-orientation-permission-ui="enabled: false"
      @loaded="loadedScene"
  >
    <a-nft
        v-for="(item, i) in scanningList"
        :key="`nftobject_${item.itemID}`"
        :url="item.sourceUri"
        :ref="el => { if (el) nftEls[i] = el }"
        :data-makerid="i"
        type="nft"
        smooth="true"
        smoothCount="10"
        smoothTolerance=".01"
        smoothThreshold="5"
        emitevents="true"
    >
      <!--
      <ar-entity
          v-if="objectRefData"
          ar-type="stayObject"
          :ar-data="objectRefData"
          ref="stayObject"
      />
      -->
    </a-nft>

    <a-entity camera position="0 0 0"></a-entity>
  </a-scene>
</template>

<script>
import { onMounted, onUnmounted, ref, toRefs, computed} from "vue";
import {useStore} from "vuex";

export default {
  name: "EventScanObject",
  props: ['scanningList'],
  emits: ['makerfound', 'lastMakerfound', 'markerLost', 'load:scene', 'load:nft'],
  setup(props, {emit}) {
    // nft element
    const nftEls = ref([]);

    let completeList = [];
    // 스캐닝 정보목록
    const {scanningList} = toRefs(props);

    // loading image 상태
    const {getters} = useStore();
    const loadingState = computed(() => getters['loading/loadingState']);

    let isPlaySound = false;
    let soundItemID = -1;


    const addEvent = () => {
      completeList.forEach((item, i) => {
        if(!item) {
          const el = nftEls.value[i];
          el.addEventListener('markerFound', makerFound);
          el.addEventListener('markerLost', markerLost);
        }
      })
    }

    const removeEvent = () => {
      completeList.forEach((item, i) => {
        const el = nftEls.value[i];
        el.removeEventListener('markerFound', makerFound);
        el.removeEventListener('markerLost', markerLost);
      })
    }

    // let requestAnimation = null;

    // maker found
    const makerFound = ({target}) => {
      const itemID = scanningList.value[target.dataset.makerid].itemID;
      if(itemID && loadingState.value ==="COMPLETE") {
        emit('makerfound', itemID);
        removeEvent();
        playSound(itemID);
        // requestAnimation = requestAnimationFrame(checkNFTPoint);
        isPlaySound = true;
        soundItemID = itemID;
      }
    }

    const markerLost = ({target}) => {
      const itemID = scanningList.value[target.dataset.makerid].itemID;
      emit('markerLost', itemID);
      target.removeEventListener('markerLost', markerLost);
      // cancelAnimationFrame(requestAnimation);
    }

    const playSound = (itemID) => {
      const item = scanningList.value.find((item) => item.itemID === itemID)
      const audio = new Audio(item.scanningSoundUri);
      audio.play();
    }

    const loadedScene = () => {
      emit('load:scene')
    }

    let loadCounter = 0;
    const loadedNft = () => {
      loadCounter++;
      if(loadCounter === scanningList.value.length) {
        emit('load:nft')
      }
    }

    console.log(`!!!!!!!!!!!!!!!!  deviceorientation`, DeviceMotionEvent);

    const getAccel = () => {
      DeviceMotionEvent.requestPermission().then(response => {
        if (response == 'granted') {
          // Add a listener to get smartphone acceleration
          // in the XYZ axes (units in m/s^2)
          window.addEventListener('devicemotion', (/*event*/) => {
            // console.log(event);
            if(!isPlaySound && soundItemID > 0) {
              console.log(`test`)
              playSound(soundItemID);
              isPlaySound = false;
              soundItemID = -1;
            }
          });
          // Add a listener to get smartphone orientation
          // in the alpha-beta-gamma axes (units in degrees)
          // window.addEventListener('deviceorientation',(event) => {
          //   console.log(event);
          //   if(!isPlaySound && soundItemID > 0) {
          //     playSound(soundItemID);
          //     isPlaySound = false;
          //     soundItemID = -1;
          //   }
          // });
        }
      });
    };

    onMounted(() => {
      console.log("------------- onMounted------------");
      completeList = Array(nftEls.value.length).fill(false);
      addEvent(); // scan event
      window.addEventListener('arjs-nft-loaded', loadedNft); // load event
    });

    onUnmounted( ()=> {
      // scan event
      removeEvent();
      // load event
      window.removeEventListener('arjs-nft-loaded', loadedNft);
    });


    // getAccel();
    const test = () => {
      getAccel();
    }

    return {
      nftEls,
      addEvent,
      removeEvent,
      makerFound,
      loadedNft,
      loadedScene,
      test
    }
  }
}
</script>

<style scoped>
  button {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    background: red;
    font-size: 50px;
  }
</style>