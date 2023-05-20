/*
*
* ar object관련
* object/asset정보를 store에서 파싱
* objectList에서 이벤트 완료된 object제거
* 이벤트 완료 체크
*
* */

import {computed, ref} from "vue";
import {useStore} from "vuex";

export default function useArObjectInfo() {
  const {getters, dispatch} = useStore();

  const arObjectInfoList = ref(null);
  const arAssetInfoList = ref(null);
  //add by jinylee
  const arDropTargetInfo = ref(null);

  const setArObjectInfoListFromStore = () => {
    arObjectInfoList.value = getters[`eventData/arObjectInfoList`];
    arAssetInfoList.value = getters[`eventData/arAssetInfoList`];
    //add by jinylee
    arDropTargetInfo.value = getters[`eventData/arDropTargetInfo`];
  };

  const removeItem = (itemID) => {
    if (itemID) {
      arObjectInfoList.value = arObjectInfoList.value.filter(item => item.stayObject.itemID !== itemID);
      arAssetInfoList.value = arAssetInfoList.value.filter(item => item.itemID !== itemID);
      dispatch("eventData/setIsEventFinish", arObjectInfoList.value.length === 0);
    } else {
      throw new Error("itemID must be required");
    }
  };

  const isEventFinish = computed(() => arObjectInfoList.value.length === 0);

  return {
    arObjectInfoList,
    arAssetInfoList,
    arDropTargetInfo,
    isEventFinish,

    removeItem,
    setArObjectInfoListFromStore,
  };
}