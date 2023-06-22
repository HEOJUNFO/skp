
<template>
  <template v-if="arData">
    <a-plane v-if="isTrash" id="close-button" class="clickable" gesture-handler="locationBased: true"
      src="#button-texture" width="0.2" height="0.2" position="0 -0.6 -2" @mousedown="listUpdate(arData)"></a-plane>
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
      <a-box class="clickable" position="0 0 0" scale="3 3 3" renderOrder="0" raycaster visible="false"> </a-box>

    </a-gltf-model>

    <a-gltf-model v-else-if="objectType === `CHARACTER`" v-bind="attrs" gesture-handler="locationBased: true"
      @animationcomplete="animationcomplete" animation-mixer>
      <a-box class="clickable" position="0 0 0" scale="3 3 3" renderOrder="0" raycaster visible="false"> </a-box>
    </a-gltf-model>

    <a-plane v-else-if="objectType === `STICKER`" v-bind="attrs" class="clickable" gesture-handler="locationBased: true"
      @animationcomplete="animationcomplete" renderOrder="0" @mousedown="startLongPress"
      @mouseup="cancelLongPress"></a-plane>

  </template>
</template>
  
<script>
import { computed, onMounted, ref, toRefs, watch } from "vue";
import { getObjectAttrs, getTouchAnimation } from "@/js/arObject";
import { EventBus } from "@/js/EventBus";

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
    const longPressTimer = ref(null);

    const { arData, arType, touchEffectType } = toRefs(props);
    const objectType = computed(() => arData.value.type);
    arData.value.objectType = arType.value;
    const attrs = ref(getObjectAttrs(arData.value))

    watch(arData, (newValue) => {
      attrs.value = getObjectAttrs(newValue);
    })

    const setTrash = () => {
      isTrash.value = !isTrash.value;
    }

    const startLongPress = () => {
      longPressTimer.value = setTimeout(() => {
        setTrash();
      }, 1200);
    }

    const cancelLongPress = () => {
      clearTimeout(longPressTimer.value);
    }

    const listUpdate = (arData) => {
      EventBus.emit('deleteStickerItem', arData)
    }

    const animationcomplete = () => {
      emit('animationcomplete:object', arData.value.itemID);
    }

    const playTouchEffect = () => {
      if (!touchEffectType.value) return;

      if (touchEffectType.value === 'FADEOUT') {
        if (arData.value.type === "3D") {
          attrs.value.animation = getTouchAnimation('GLTFFADEOUT');
          return;
        }
      }
      attrs.value.animation = getTouchAnimation(touchEffectType.value);
    }

    onMounted(() => {
      if (arType.value === 'touchObject' && `VIDEO` !== objectType.value) {
        setTimeout(() => emit('timeout:object', arData.value.itemID), 3 * 1000)
      }

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
      startLongPress,
      cancelLongPress,
      isTrash,
      listUpdate
    }
  }
}
</script>
  
<style scoped></style>