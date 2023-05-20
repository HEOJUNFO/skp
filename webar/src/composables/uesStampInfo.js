/*
*
* stamp 목록 vuex에서 파싱
* 사용된 stamp update
* 미션 팝업 오픈(image scanning)
*
* */

import {ref} from "vue";
import {useStore} from "vuex";

export default function uesStampInfo({stampEl, missionModalEl}) {
  const {getters} = useStore();
  const stampInfoList = ref(null);

  const setStampInfoListFromStore = () => {
    stampInfoList.value = getters['eventData/stampPanelInfo'];
  }

  const updateStamp = (itemID) => {
    if(!itemID)throw new Error('itemID must be required');
    if(!stampEl)throw new Error('stampEl must be required');
    if (stampInfoList.value) stampEl.value.setStamp(itemID);
  }

  const openMissionModal = (itemID) => {
    if(!itemID)throw new Error('itemID must be required');
    if(!missionModalEl)throw new Error('missionModalEl must be required');
    if (stampInfoList.value) missionModalEl.value.openModal(itemID);
  }

  return {
    stampInfoList,

    setStampInfoListFromStore,
    updateStamp,
    openMissionModal,
  }
}