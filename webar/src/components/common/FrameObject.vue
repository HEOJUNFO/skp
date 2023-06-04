<template>
    <frame-entity
        ar-type="stayObject"
        :ar-data="arData"
        :touch-effect-type="arData.type"
        v-if="!isTouched && visible"
        @dragstart:object="dragStart"
        @dragend:object="dragEnd"
        @animationcomplete:object="animationcomplete"
        @timeout:object="timeout"
        ref="stayObjectEl"
    />

  </template>
  
  <script>
  import {computed, ref, toRefs} from "vue";
  import FrameEntity from "@/components/common/FrameEntity";
  
  export default {
    name: "DragObject",
    components: {FrameEntity},
    props: {
      arData: {
        type: Object,
      },
      visible: {
        type: Boolean,
      }
    },
    emits: ['dragstart:object', 'dragend:object', 'animationcomplete:object', 'timeout:object'],
  
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
  
      // drag start 이벤트 처리
      const dragStart = ({type, itemID}) => {
        console.log("object dragstart: "+type+","+itemID)
        emit('dragstart:object', {type, itemID});
      }
  
      //drag end 이벤트 처리
      const dragEnd = ({type, itemID, position}) => {
        console.log("object dragend: %s, %s, %s, %s ", type, itemID, position.x, position.y);
        emit('dragend:object', {type, itemID, position});
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
        dragStart,
        dragEnd,
        animationcomplete,
        timeout,
      }
    }
  }
  </script>
  
  <style scoped>
  
  </style>