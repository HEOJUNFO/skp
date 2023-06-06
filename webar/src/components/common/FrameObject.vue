<template>
    <frame-entity
        ar-type="stayObject"
        :ar-data="arData"
        :touch-effect-type="arData.type"
        v-if="visible"
        @animationcomplete:object="animationcomplete"
        @timeout:object="timeout"
        ref="stayObjectEl"
    />

  </template>
  
  <script>
  import {computed, ref, toRefs} from "vue";
  import FrameEntity from "@/components/common/FrameEntity";
  
  export default {
    name: "FrameObject",
    components: {FrameEntity},
    props: {
      arData: {
        type: Object,
      },
      visible: {
        type: Boolean,
      }
    },
    emits: ['animationcomplete:object', 'timeout:object'],
  
    //setup
    setup(props, {emit}) {
      // props에서 데이터 파싱
      const {arData} = toRefs(props);
  
      // stay object ref
      const stayObjectEl = ref(null);
      // 터치 flag
      const isTouched = ref(false);
      // 터치효과
      const touchEffectType = computed(() => arData.value.touchEffectType);
  
      // TODO 이 부분을 store로 이관할지?
      // touchObject 포지션 정보가 없으면 stayObject정보에 대입
      if (arData.value.touchEffectType === 'OBJCHANGE') {
        const positionNames = ['positionX', 'positionY', 'positionZ'];
        positionNames.forEach((item) => {
          if (!arData.value.touchObject[item]) {
            arData.value.touchObject[item] = arData.value.stayObject[item];
          }
        })
      }
  
      const animationcomplete = (itemID) => {
        // 터치 효과 타입별 동작
        const effectType = touchEffectType.value;
        emit('animationcomplete:object', {itemID, effectType});
      }
      // timeout event
      const timeout = (itemID) => {
        const effectType = touchEffectType.value;
        emit('timeout:object', {itemID, effectType});
      }
  
      return {
        isTouched,
        stayObjectEl,
        animationcomplete,
        timeout,
      }
    }
  }
  </script>
  
  <style scoped>
  
  </style>