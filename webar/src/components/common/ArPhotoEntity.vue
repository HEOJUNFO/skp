
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

    <a-image ref="stickerRef" v-else-if="objectType === `STICKER`" v-bind="attrs" outline
      gesture-handler="locationBased: true" @mousedown="startLongPress(), stickerSet(arData)" @mouseup="cancelLongPress">
      <a-box class="clickable" position="0 0 -0.2" scale="0.5 0.5 0.2" renderOrder="0" raycaster opacity="0"
        translate="true"> </a-box>
    </a-image>
    <a-plane ref="trashRef" id="close-button" position="0 0.3 -1" class="clickable" gesture-handler="locationBased: true"
      src="#trash-texture" width="0.22" height="0.22" alpha-test="0.5" visible="false" opacity="0.8" translate="true"
      @mousedown="listUpdate()" :animation="animationData()"></a-plane>

  </template>
</template>
  
<script>
import { computed, onMounted, ref, toRefs, watch } from "vue";
import { getObjectAttrs, getTouchAnimation } from "@/js/arObject";
import { EventBus } from "@/js/EventBus";
import { useStore } from "vuex";

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
  methods: {
    animationData() {
      let scaleFrom = `${1 * 0.8} ${1 * 0.8} ${1 * 0.8}`;
      let scaleTo = `${1} ${1} ${1}`;

      return `property: scale; easing: easeInCubic; dir:alternate; loop: true; dur: 550; from: ${scaleFrom}; to: ${scaleTo}`;
    }
  },
  emits: ['animationcomplete:object', 'timeout:object'],
  setup(props, { emit }) {
    const store = useStore();
    const stickerRef = ref(null);
    const trashRef = ref(null);
    const isIOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);

    let startPos = null;

    const { arData, arType, touchEffectType } = toRefs(props);
    const objectType = computed(() => arData.value.type);
    arData.value.objectType = arType.value;
    const attrs = ref(getObjectAttrs(arData.value))

    const arFrameSettingYn = computed(() => {
      const isArFrameSetting = store.getters['eventData/arFrameSettingYn'];
      return isArFrameSetting === 'Y';
    });

    watch(arData, (newValue) => {
      attrs.value = getObjectAttrs(newValue);
    })

    const setTrash = () => {
      if (arFrameSettingYn.value) {
        trashRef.value.object3D.position.set(0, 0.55, -1);
      }
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
      if (startPos === null) return;
      const endPos = stickerRef.value.object3D.position;
      const distance = startPos.distanceTo(endPos);

      const threshold = 0.05;
      if (distance < threshold && !wasTrashSet) {
        setTrash();
      }
    }

    const stickerSet = (arData) => {
      EventBus.emit('setSticker', arData.id)
    }

    const listUpdate = () => {
      EventBus.emit('deleteStickerItem')
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
      isIOS,
      stickerSet,
    }
  }
}
</script>
  
<style scoped></style>