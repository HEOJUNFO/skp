
<template>
  <template v-if="arData">
    <a-gltf-model ref="modelRef" v-if="objectType === `CHARACTER`" v-bind="attrs" gesture-handler="locationBased: true"
      @animationcomplete="animationcomplete" animation-mixer>
      <a-box ref="characterRef" position="0 0 1" scale="1 1.75 0.01" renderOrder="0" opacity="0" translate="true"
        alpha-test="0.5" @mousedown="startCharacterPress(), characterSet(arData)" @mouseup="cancelCharacterPress()">
      </a-box>
    </a-gltf-model>

    <a-image ref="stickerRef2" v-else-if="objectType === `STICKER2`" v-bind="attrs" outline
      gesture-handler="locationBased: true" @mousedown="startCharacterPress(), characterSet(arData)"
      @mouseup="cancelCharacterPress()">
      <a-box class="clickable" position="0 0 -0.2" scale="1 1 0.2" renderOrder="0" raycaster opacity="0" translate="true"
        alpha-test="0.5"> </a-box>
    </a-image>

    <a-image ref="stickerRef" v-else-if="objectType === `STICKER`" v-bind="attrs" outline
      gesture-handler="locationBased: true" @mousedown="startStickerPress(), stickerSet(arData)"
      @mouseup="cancelStickerPress()">
      <a-box class="clickable" position="0 0 -0.2" scale="1 1 0.2" renderOrder="0" raycaster opacity="0" translate="true"
        alpha-test="0.5"> </a-box>
    </a-image>
    <a-plane ref="trashRef" id="close-button" position="0 0.3 -1" class="clickable" gesture-handler="locationBased: true"
      src="#trash-texture" width="0.22" height="0.22" alpha-test="0.5" visible="false" opacity="0.8" translate="true"
      @mousedown="listUpdate()" :animation="animationData()"></a-plane>
    <a-plane ref="trashRef2" id="close-button2" position="0 0.3 -1" class="clickable"
      gesture-handler="locationBased: true" src="#trash-texture" width="0.22" height="0.22" alpha-test="0.5"
      visible="false" opacity="0.8" translate="true" @mousedown="listUpdate()" :animation="animationData()"></a-plane>

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
    const stickerRef2 = ref(null);
    const characterRef = ref(null);
    const modelRef = ref(null);
    const trashRef = ref(null);
    const trashRef2 = ref(null);
    const isIOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);

    let startPos = null;
    let startPos2 = null;
    let startScale = null;
    let startScale2 = null;

    const { arData, arType, touchEffectType } = toRefs(props);
    const objectType = computed(() => {
      if (arData.value.type === 'CHARACTER') {
        return arData.value.file.includes('gltf') ? 'CHARACTER' : 'STICKER2';
      }
      return arData.value.type;
    });

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
    const setCharacterTrash = () => {
      if (arFrameSettingYn.value) {
        trashRef2.value.object3D.position.set(0, 0.55, -1);
      }
      if (trashRef2.value.object3D.visible) {
        trashRef2.value.object3D.visible = false;
        if (stickerRef2.value) {
          stickerRef2.value.components.outline.setTrash(false);
        }
      }
      else {
        trashRef2.value.object3D.visible = true;
        if (stickerRef2.value) {
          stickerRef2.value.components.outline.setTrash(true);
        }
      }
    }

    const startStickerPress = () => {
      EventBus.setState('Sticker')
      startPos = stickerRef.value.object3D.position.clone();
      startScale = stickerRef.value.object3D.scale.clone();
    }

    const cancelStickerPress = () => {
      if (startPos === null) return;
      const endPos = stickerRef.value.object3D.position;
      const endScale = stickerRef.value.object3D.scale;
      const distance = startPos.distanceTo(endPos);

      const threshold = 0.1;
      if (distance < threshold && startScale.equals(endScale)) {
        setTrash();
      }
    }

    const startCharacterPress = () => {
      EventBus.setState('Character')
      if (objectType.value === 'STICKER2') {
        startPos2 = stickerRef2.value.object3D.position.clone();
        startScale2 = stickerRef2.value.object3D.scale.clone();
      } else {
        startPos2 = modelRef.value.object3D.position.clone();
        startScale2 = modelRef.value.object3D.scale.clone();
      }

    }

    const cancelCharacterPress = () => {
      if (startPos2 === null) return;
      let endPos;
      let endScale;

      if (objectType.value === 'STICKER2') {
        endPos = stickerRef2.value.object3D.position;
        endScale = stickerRef2.value.object3D.scale;

      } else {
        endPos = modelRef.value.object3D.position;
        endScale = modelRef.value.object3D.scale;
      }
      const distance = startPos2.distanceTo(endPos);
      const threshold = 0.05;
      if (distance < threshold && startScale2.equals(endScale)) {
        setCharacterTrash();
      }
    }

    const stickerSet = (arData) => {
      EventBus.emit('setSticker', arData.id)
    }

    const characterSet = (arData) => {
      EventBus.emit('setCharacter', arData.id)
    }

    const listUpdate = () => {
      const lastValue = EventBus.getState();
      console.log(lastValue)
      if (lastValue === 'Sticker') {
        EventBus.emit('deleteStickerItem')
      }
      if (lastValue === 'Character') {
        EventBus.emit('deleteCharacterItem')
      }
    }

    EventBus.on("toggleBottomBar", () => {
      if (stickerRef.value) {
        trashRef.value.object3D.visible = false;
        stickerRef.value.components.outline.setTrash(false);
      }
      if (characterRef.value) {
        trashRef2.value.object3D.visible = false;
      }
      if (stickerRef2.value) {
        trashRef2.value.object3D.visible = false;
        stickerRef2.value.components.outline.setTrash(false);
      }
    })

    EventBus.on("scale", () => {
      if (stickerRef.value) {
        trashRef.value.object3D.visible = false;
        stickerRef.value.components.outline.setTrash(false);
      }
      if (characterRef.value) {
        trashRef2.value.object3D.visible = false;
      }
      if (stickerRef2.value) {
        trashRef2.value.object3D.visible = false;
        stickerRef2.value.components.outline.setTrash(false);
      }
    })

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
      startCharacterPress,
      cancelCharacterPress,
      startStickerPress,
      cancelStickerPress,
      listUpdate,
      stickerRef,
      stickerRef2,
      trashRef,
      trashRef2,
      isIOS,
      stickerSet,
      characterSet,
      characterRef,
      modelRef,
    }
  }
}
</script>
  
<style scoped></style>