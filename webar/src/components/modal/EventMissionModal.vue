<template>
  <vue-final-modal
      v-model="showModal"
      content-class="win_popup"
      overlay-class="dimmed_bg_lightdark"
      :click-to-close="false"
      @opened="opened"
  >
    <div class="popup_contents" v-if="modalData">
<!--      <img @load="loadImage" src="../../assets/img/pop_scan.png" alt="">-->
      <img src="https://dt-static.syrup.co.kr/scan/scanningok.png" alt="">
      <div class="scan_img">
        <img @load="loadImage" :src="modalData.enableThumbnailUri" alt="">
      </div>
    </div>

    <a href="#" class="close" @click.prevent="closeModal">닫기</a>

    <div class="btn">
      <a href="#" class="continue" @click.prevent="closeModal">계속 도전</a>
    </div>
  </vue-final-modal>
</template>

<script>
import {ref, toRefs} from "vue";

export default {
  name: "EventMissionModal",
  props: {
    missionList: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup(props, {emit}) {
    // 브릿지 데이터
    const {missionList} = toRefs(props);
    // 모달 데이터
    const modalData = ref(null);
    // 모달 flag
    const showModal = ref(false);
    //


    // 팝업 오픈
    const openModal = (itemID) => {
      if(missionList.value.stampInfoObjectList) {
        modalData.value = missionList.value.stampInfoObjectList.find(item => item.itemID === itemID);
      }
      // showModal.value = true;
    }

    const opened = () => {
      autoClose();
    }

    const autoClose = () => {
      // setTimeout(()=>{
      //   closeModal();
      // }, 3000);
    }

    const closeModal = () => {
      showModal.value = false;
      emit('close:modal');
    }

    const loadImage = () => {
      showModal.value = true;
    }

    return {
      modalData,
      showModal,

      openModal,
      opened,
      closeModal,
      loadImage,
    }
  }
}
</script>

<style scoped>

</style>