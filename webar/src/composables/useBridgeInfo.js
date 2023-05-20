import {ref} from "vue";
import {useStore} from "vuex";

export default function useBridgeInfo({bridgeEl}) {
  const {getters} = useStore();
  const bridgeInfoList = ref(null);

  const setBridgeInfoListFromStore = () => {
    bridgeInfoList.value = getters['eventData/bridgeObjectInfoList'];
  }

  const openBridgePopup = (itemID) => {
    if(!itemID)throw new Error('itemID must be required');
    if(!bridgeEl)throw new Error('bridgeEl must be required');
    if (bridgeInfoList.value) bridgeEl.value.openModal(itemID);
  }

  return {
    bridgeInfoList,

    setBridgeInfoListFromStore,
    openBridgePopup,
  }
}