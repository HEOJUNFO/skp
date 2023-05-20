<template>
  <template v-if="arData">
    <a-sphere
        v-if="objectType === `SPHERE`"
        v-bind="attrs"
        @click="clickObject"
        @animationcomplete="animationcomplete"
        drag-rotate-component
    />
    <a-cylinder
        v-else-if="objectType === `CYLINDER`"
        v-bind="attrs"
        @click="clickObject"
        @animationcomplete="animationcomplete"
        drag-rotate-component
    />
    <a-box
        v-else-if="objectType === `CUBE`"
        v-bind="attrs"
        @click="clickObject"
        @animationcomplete="animationcomplete"
        drag-rotate-component
    />
    <a-image
        v-else-if="objectType === `IMAGE`"
        v-bind="attrs"
        @click="clickObject"
        @animationcomplete="animationcomplete"
        drag-rotate-component
    />
    <a-entity
        v-else-if="objectType === `GIF`"
        v-bind="attrs"
        @click="clickObject"
        @animationcomplete="animationcomplete"
        drag-rotate-component
    />
    <a-video
        v-else-if="objectType === `VIDEO`"
        loop="false"
        v-bind="attrs"
        @click="clickObject"
        @animationcomplete="animationcomplete"
        drag-rotate-component
    />
    <a-gltf-model
        v-else-if="objectType === `3D`"
        v-bind="attrs"
        @click="clickObject"
        @animationcomplete="animationcomplete"
        animation-mixer
        drag-rotate-component
    />
  </template>
</template>

<script>
import {computed, onMounted, ref, toRefs, watch} from "vue";
import {getObjectAttrs, getTouchAnimation} from "@/js/arObject";

export default {
  name: "ArEntity",
  props: {
    arData: {
      type: Object,
      default() {
        return {}
      }
    },
    arType: {
      type: String,
    },
    touchEffectType: {
      type: null,
    }
  },
  emits:['click:object', 'animationcomplete:object', 'timeout:object'],
  setup(props, {emit}) {
    // 상속받은 데이터 & 타입 & 터치이펙트 타입
    const {arData, arType, touchEffectType} = toRefs(props);
    // 객체 타입
    const objectType = computed(()=>arData.value.type);
    // arData에 arType추가 (a-asset id용)
    arData.value.objectType = arType.value;
    // 데이터에서 AR Object데이터로 변환
    const attrs = ref(getObjectAttrs(arData.value));
    watch(arData, (newValue) => {
      attrs.value = getObjectAttrs(newValue);
    })

    const clickObject = (e) => {
      // drag일때는
      // aframe 의 drag-rotate-component에서 현재 drag상태를 가져옴
      // touch move일 때에는 click event를 발생 시키지 않는다.
      const {isTouchMove} = e.target.getAttribute('drag-rotate-component');
      if(!isTouchMove) {
        emit('click:object', {type: arType.value, itemID: arData.value.itemID});
      }
    }

    const animationcomplete = () => {
      emit('animationcomplete:object', arData.value.itemID);
    }

    const playTouchEffect = () => {
      if(!touchEffectType.value) return;
      if(touchEffectType.value === 'NONE') {
        animationcomplete();
      }
      // FADEOUT효과를 gftl모델(type:6)의 경우 다른 애니메이션으로 대체
      if(touchEffectType.value === 'FADEOUT') {
        if(arData.value.type === "3D") {
          attrs.value.animation = getTouchAnimation('GLTFFADEOUT');
          return;
        }
      }
      // 일반 에니메이션 효과 재생
      attrs.value.animation = getTouchAnimation(touchEffectType.value);
    }

    onMounted(() => {
      // playTime이 있는경우 playTime후 timecomplete이벤트 발생 (비디오 제외)
      if(arType.value === 'touchObject' && `VIDEO` !== objectType.value) {
        setTimeout(()=> emit('timeout:object', arData.value.itemID), 3 * 1000)
      }

      // 체인지 오브젝트 비디오 일 때 mounted시 재생 및 end이벤트 처리
      if(arType.value === 'touchObject' && `VIDEO` === objectType.value) {
        const videoEl = document.querySelector(attrs.value.src)
        videoEl.play();
        videoEl.addEventListener('ended', () => emit('timeout:object', arData.value.itemID))
      }
    })

    return {
      attrs,
      objectType,

      clickObject,
      animationcomplete,
      playTouchEffect,
    }
  }
}
</script>

<style scoped>

</style>