<template>
  <img
      v-if="!(assetType === 'VIDEO' || assetType === '3D') && isObjectVisible" 
      ref="assetEl"
      v-bind="assetAttr"
  />
  <video
      v-if="assetType === 'VIDEO' && isObjectVisible "
      ref="assetEl"
      v-bind="assetAttr"
      @ended="endedVideo"
  />
  <a-asset-item
      v-if="assetType === '3D' && isObjectVisible "
      ref="assetEl"
      v-bind="assetAttr"
  />
</template>

<script>
import {computed, /*nextTick, onMounted,*/ ref, toRefs, watch} from "vue";
import {getAssetAttrs} from "@/js/arObject";
import {useStore} from "vuex";

export default {
  name: "ArAsset",
  props: ['assetData','selectModel'],
  emits:['ended:video'],
  setup(props, {emit}) {
    const assetEl = ref(null);
    const isObjectVisible = ref(false);
 
    const {assetData} = toRefs(props);
    const {selectModel} = toRefs(props);


    console.log(assetData.value)
    console.log(selectModel.value)
    watch(selectModel, (val) => {
      console.log(val)
      if(val === 1) {
        console.log('true')
        isObjectVisible.value = true;
      } else {
        isObjectVisible.value = false;
      }
    }, {deep:true})
    // asset 속성
    const assetAttr = computed(()=>getAssetAttrs(assetData.value));
    // asset타입
    const assetType = ref(assetData.value.type);
    // object타입
    const objectType = ref(assetData.value.objectType)

    const store = useStore();
    const {getters} = store;
    const loadingState = computed(() => getters['loading/loadingState']);

    // vidoe재생 완료 시 이벤트
    const endedVideo = () => {
      emit('ended:video', assetData.value.itemID);
    }

    const playVideo = () => {
      if(assetType.value === 'VIDEO') {
        assetEl.value.play();
      }
    }

    const stopVideo = () => {
      if(assetType.value === 'VIDEO') {
        assetEl.value.stop();
      }
    }

    // onMounted(() => {
    //   if(assetType.value === 'VIDEO') {
    //     nextTick(() => {
    //       // v-bind로 mute컨트롤이 되지 않음
    //       // assetEl.value.muted = false;
    //       // assetEl.value.stop();
    //     })
    //   }
    // })

    watch(loadingState, (val) => {
      // 비디오 자동 재생
      // (터치 오브젝트 비디오는 자동재생하지 않는다.)
      if(assetType.value === 'VIDEO' && val === 'COMPLETE' && objectType.value !== 'touchObject'){
        assetEl.value.play();
      }
    })

    return {
      assetEl,
      assetType,
      assetAttr,
      playVideo,
      stopVideo,
      endedVideo,
      isObjectVisible

    }
  }
}
</script>

<style scoped>

</style>