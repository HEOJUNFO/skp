import {computed, ref} from "vue";
import {useStore} from "vuex";

export default function useArObjectInfo() {
  const {getters} = useStore();

  const characterList = ref(null);
  const filterList = ref(null);
  const stickerList = ref(null);
  const tabList = ref(null);
  const frameList = ref(null);


    
    const setList = () => {
        characterList.value = createList('eventData/characterContentsInfoList');
        filterList.value = createList('eventData/filterContentsInfoList');
        stickerList.value = createList('eventData/stickerContentsInfoList');
        tabList.value = createList('eventData/tabContentsInfoList')
        frameList.value = createFrameList();
    }

    function createList(urlGetter) {
      const url = computed(() => getters[urlGetter]);

      return url.value.map((item, index) => {
        let tabId = 1;
        let select = false;
        if(urlGetter === 'eventData/characterContentsInfoList') {
          select = index === 0;
        }
       
        return {
          id: index + 1,
          tabId: tabId,
          src: item.thumbnailUri,
          file: item.sourceUri,
          name: item.fileName,
          select: select,
          type: item.tabMenuType,
          sort: item.itemID
        };
      });
    }

    window.createEffectList = function () {
      const characterList = createList('eventData/characterContentsInfoList');
      const filterList = createList('eventData/filterContentsInfoList');
      const stickerList = createList('eventData/stickerContentsInfoList');
      const tabList = createList('eventData/tabContentsInfoList')

      return {
        characterList,
        filterList,
        stickerList,
        tabList,
      }
    }

    const createGetterFunction = (getterPath) => {
        return function () {
          const computedValue = computed(() => {
            const isValue = getters[getterPath];
            return isValue;
          });
          return computedValue.value;
        }
      }
  
      window.photoRatioSettingType = createGetterFunction('eventData/photoRatioSettingType');
      window.arFrameSettingYn = createGetterFunction('eventData/arFrameSettingYn');
      window.arFilterSettingYn = createGetterFunction('eventData/arFilterSettingYn');
      window.arCharacterSettingYn = createGetterFunction('eventData/arCharacterSettingYn');
      window.arStickerSettingYn = createGetterFunction('eventData/arStickerSettingYn');
      window.arTabSettingYn = createGetterFunction('eventData/photoTabMenuAddSettingYn');
      window.tabMenuTitle = createGetterFunction('eventData/tabMenuTitle');

      window.createFrameList = function () {
        const frameList = createFrameList();
        return frameList
      }
  
      function createFrameList() {
        const url = computed(() => getters['eventData/frameContentsInfoList']);
  
        const frameList = url.value.slice(0, 9).map((item, index) => {
          let tabId = 1;
          let select = index === 0;
  
          return {
            id: index + 1,
            tabId: tabId,
            src: item.thumbnailUri,
            name: item.fileName,
            select: select,
          };
        });
        return frameList;
      }
  return {
    characterList,
    filterList,
    stickerList,
    tabList,
    frameList,
    setList,
  };
}