import {computed, ref} from "vue";
import {useStore} from "vuex";

export default function useImageScanningInfo({eventIsScanEl}) {
  const {getters, dispatch} = useStore();
  const imageScanningInfoList = ref(null);

  const setImageScanningInfoFromStore = () => {
    imageScanningInfoList.value = getters['eventData/imageScanningInfoList'];
  }

  const removeItem = (itemID) => {
    if(!itemID)throw new Error('itemID must be required');
    imageScanningInfoList.value = imageScanningInfoList.value.filter(item => item.itemID !== itemID);
    dispatch('eventData/setIsEventFinish', imageScanningInfoList.value.length === 0)
  }

  const isEventFinish = computed(() => imageScanningInfoList.value.length === 0)

  const addScanEvent = () => { // vue
    eventIsScanEl.value.addEvent();
  }

  return {
    imageScanningInfoList,
    isEventFinish,
    removeItem,
    addScanEvent,
    setImageScanningInfoFromStore,
  }
}