<template>
  <ar-entity
      ar-type="stayObject"
      :ar-data="arData.stayObject"
      :touch-effect-type="arData.touchEffectType"
      v-if="!isTouched"
      @click:object="clickObject"
      @animationcomplete:object="animationcomplete"
      @timeout:object="timeout"
      ref="stayObjectEl"
  />
  <ar-entity
      ar-type="touchObject"
      :ar-data="arData.touchObject"
      v-if="isTouched"
      @click:object="clickObject"
      @animationcomplete:object="animationcomplete"
      @timeout:object="timeout"
  />
</template>

<script>
import {computed, ref, toRefs} from "vue";
import ArEntity from "@/components/common/ArEntity";

export default {
  name: "ArObject",
  components: {ArEntity},
  props: {
    arData: {
      type: Object,
    }
  },
  emits:['click:object', 'animationcomplete:object', 'timeout:object'],
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
    if(arData.value.touchEffectType === 'OBJCHANGE') {
      const positionNames = ['positionX', 'positionY', 'positionZ'];
      positionNames.forEach((item) => {
        if (!arData.value.touchObject[item]) {
          arData.value.touchObject[item] = arData.value.stayObject[item];
        }
      })
    }

    const clickObject = ({type, itemID}) => {
      // 터치 효과 타입별 동작
      const effectType = touchEffectType.value;
      
      //
      if(type === 'stayObject'){
        // change object로 3d객체 변경
        if(effectType === 'OBJCHANGE') {
          isTouched.value = true;
        }
        // 체인지 오브젝트가 아닌경우 애니메이션 실행
        if(effectType !== 'OBJCHANGE') {
          stayObjectEl.value.playTouchEffect();
        }
        // 소리재생
        playSound();
      }
      emit('click:object', {itemID, effectType});
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

    // 소리 재생
    // TODO 데이터 파싱 여부를 확인하여 플레이
    const audio = new Audio(arData.value.touchSoundUri);
    // audio.addEventListener('loadeddata',() => {
    //
    // });
    const playSound = () => {
      audio.play();
    }

    return {
      isTouched,

      stayObjectEl,

      clickObject,
      animationcomplete,
      timeout,
    }
  }
}
</script>

<style scoped>

</style>