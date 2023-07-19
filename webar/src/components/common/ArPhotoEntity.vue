
<template>
  <template v-if="arData">
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
      <a-box class="clickable" position="0 0 0" scale="1 1.75 1" renderOrder="0" raycaster opacity="0" translate="true"
        alpha-test="0.5"> </a-box>
    </a-gltf-model>

    <a-plane ref="stickerRef" v-else-if="objectType === `STICKER`" v-bind="attrs" outline
      gesture-handler="locationBased: true" renderOrder="0" @mousedown="startLongPress" @mouseup="cancelLongPress">
      <a-box class="clickable" position="0 0 -0.2" scale="0.5 0.5 0.2" renderOrder="0" raycaster opacity="0"
        translate="true"> </a-box>
    </a-plane>
    <a-plane ref="trashRef" id="close-button" position="0 0.55 -1" class="clickable" gesture-handler="locationBased: true"
      src="#trash-texture" width="0.25" height="0.25" alpha-test="0.5" visible="false" opacity="0.8" translate="true"
      @mousedown="listUpdate(arData)"></a-plane>

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
    const stickerRef = ref(null);
    const trashRef = ref(null);
    let startPos = null;

    const { arData, arType, touchEffectType } = toRefs(props);
    const objectType = computed(() => arData.value.type);
    arData.value.objectType = arType.value;
    const attrs = ref(getObjectAttrs(arData.value))

    watch(arData, (newValue) => {
      attrs.value = getObjectAttrs(newValue);
    })

    watch(stickerRef, () => {
      setTimeout(() => {
        stickerRef.value.setAttribute('opacity', 1);
      }, 200);
    }, { deep: true });

    const setTrash = () => {
      if (trashRef.value.object3D.visible) {
        trashRef.value.object3D.visible = false;
        stickerRef.value.components.outline.setTrash(false);
      }
      else {
        trashRef.value.object3D.visible = true;
        stickerRef.value.components.outline.setTrash(true);
      }
    }

    let wasTrashSet = false;

    const startLongPress = () => {
      startPos = stickerRef.value.object3D.position.clone();
      if (trashRef.value.object3D.visible) {
        setTrash();
        wasTrashSet = true;
      } else {
        wasTrashSet = false;
      }
    }

    const cancelLongPress = () => {
      console.log('cancelLongPress', wasTrashSet)
      const endPos = stickerRef.value.object3D.position;
      const distance = startPos.distanceTo(endPos);

      const threshold = 0.05;
      if (distance < threshold && !wasTrashSet) {

        setTrash();
      }
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
      listUpdate,
      stickerRef,
      trashRef,
    }
  }
}
</script>
  
<style scoped></style>