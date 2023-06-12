
<template>
  <template v-if="arData">
    <a-plane v-if="isTrash" id="close-button" class="clickable" gesture-handler="locationBased: true"
      src="#button-texture" width="0.1" height="0.1" position="0 0.6 -2" @mousedown="stickerListUpdate(arData)"></a-plane>
    <a-sphere v-if="objectType === `SPHERE`" v-bind="attrs" class="clickable" gesture-handler="locationBased: true"
      @animationcomplete="animationcomplete" />

    <a-cylinder v-else-if="objectType === `CYLINDER`" v-bind="attrs" class="clickable"
      gesture-handler="locationBased: true" @animationcomplete="animationcomplete" />

    <a-box v-else-if="objectType === `CUBE`" v-bind="attrs" class="clickable" gesture-handler="locationBased: true"
      @animationcomplete="animationcomplete" />

    <a-image v-else-if="objectType === `IMAGE`" v-bind="attrs" class="clickable" gesture-handler="locationBased: true"
      @animationcomplete="animationcomplete" />

    <a-entity v-else-if="objectType === `GIF`" v-bind="attrs" class="clickable" gesture-handler="locationBased: true"
      @animationcomplete="animationcomplete" />

    <a-video v-else-if="objectType === `VIDEO`" loop="false" v-bind="attrs" class="clickable"
      gesture-handler="locationBased: true" @animationcomplete="animationcomplete" animation-mixer />

    <a-gltf-model v-else-if="objectType === `3D`" v-bind="attrs" gesture-handler="locationBased: true"
      @animationcomplete="animationcomplete" animation-mixer>
      <a-box class="clickable" position="0 0 0" scale="3 3 3" material="opacity: 0.0; transparent: true" renderOrder="0"
        raycaster> </a-box>
    </a-gltf-model>

    <a-gltf-model v-else-if="objectType === `CHARACTER`" v-bind="attrs" gesture-handler="locationBased: true"
      @animationcomplete="animationcomplete" animation-mixer>
      <a-box class="clickable" position="0 0 0" scale="3 3 3" material="opacity: 0.0; transparent: true" renderOrder="0"
        raycaster> </a-box>
    </a-gltf-model>

    <a-plane v-else-if="objectType === `STICKER`" v-bind="attrs" class="clickable" gesture-handler="locationBased: true"
      @animationcomplete="animationcomplete" renderOrder="1" @mousedown="setTrash"></a-plane>

  </template>
</template>
  
<script>
import { computed, onMounted, ref, toRefs, watch } from "vue";
import { getObjectAttrs, getTouchAnimation } from "@/js/arObject";

export default {
  name: "DragEntity",
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
  emits: ['animationcomplete:object', 'timeout:object'],
  setup(props, { emit }) {
    const isTrash = ref(false);
    // 상속받은 데이터 & 타입 & 터치이펙트 타입
    const { arData, arType, touchEffectType } = toRefs(props);
    // 객체 타입
    const objectType = computed(() => arData.value.type);
    // arData에 arType추가 (a-asset id용)
    arData.value.objectType = arType.value;
    // 데이터에서 AR Object데이터로 변환
    const attrs = ref(getObjectAttrs(arData.value))

    watch(arData, (newValue) => {
      attrs.value = getObjectAttrs(newValue);
    })

    const setTrash = () => {
      isTrash.value = !isTrash.value;
    }

    const stickerListUpdate = (arData) => {
      window.parent.stickerListUpdate(arData)
    }


    //animation complete event
    const animationcomplete = () => {
      emit('animationcomplete:object', arData.value.itemID);
    }

    //effect function for touching
    const playTouchEffect = () => {
      if (!touchEffectType.value) return;
      //완료 팝업 삭제
      // if (touchEffectType.value === 'NONE') {
      //   animationcomplete();
      // }
      // FADEOUT효과를 gftl모델(type:6)의 경우 다른 애니메이션으로 대체
      if (touchEffectType.value === 'FADEOUT') {
        if (arData.value.type === "3D") {
          attrs.value.animation = getTouchAnimation('GLTFFADEOUT');
          return;
        }
      }
      // 일반 에니메이션 효과 재생
      attrs.value.animation = getTouchAnimation(touchEffectType.value);
    }

    //dom mounted 후 체크 로직
    onMounted(() => {
      // playTime이 있는경우 playTime후 timecomplete이벤트 발생 (비디오 제외)
      if (arType.value === 'touchObject' && `VIDEO` !== objectType.value) {
        setTimeout(() => emit('timeout:object', arData.value.itemID), 3 * 1000)
      }

      // 체인지 오브젝트 비디오 일 때 mounted시 재생 및 end이벤트 처리
      if (arType.value === 'touchObject' && `VIDEO` === objectType.value) {
        const videoEl = document.querySelector(attrs.value.src)
        videoEl.play();
        videoEl.addEventListener('ended', () => emit('timeout:object', arData.value.itemID))
      }
    })

    return {
      attrs,
      objectType,
      animationcomplete,
      playTouchEffect,
      setTrash,
      isTrash,
      stickerListUpdate
    }
  }
}
</script>
  
<style scoped></style>