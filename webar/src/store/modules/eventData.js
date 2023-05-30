//function import from src/apis/index.js
import { getEventData, getEventResult } from "@/apis";

export const eventData = {
  namespaced: true,
  state: () => ({
    eventData: {},
    eventResult: {},
    isEventFinish: false,
  }),
  mutations: {
    ["SET_EVENT_DATA"](state, payload) {
      state.eventData = payload;
    },
    ["SET_EVENT_RESULT"](state, payload) {
      state.eventResult = payload;
    },
    ["isEventFinish"](state, payload) {
      state.isEventFinish = payload;
    },
  },
  getters: {
    eventData({ eventData }) {
      return eventData;
    },
    // 3d객체 정보
    arObjectInfoList({ eventData }) {
      // 데이터 파싱
      const { arObjectInfo, eventLogicalType } = eventData;
      switch (eventLogicalType) {
        case "SCANNING":
          return null;
        default:
          return Array.isArray(arObjectInfo) ? arObjectInfo.reduce(getArObjectData, []) : [];
      }
    },
    // asset 정보
    frameContentsInfoList({ eventData }) {
      const { photoContentsInfo } = eventData;
      
      return  Array.isArray(photoContentsInfo) ? photoContentsInfo[0].frameContentsInfo.map(getContentsData) : [];
    },
    arAssetInfoList({ eventData }) {
      const { arObjectInfo } = eventData;
      return Array.isArray(arObjectInfo) ? arObjectInfo.reduce(getAssetData, []) : [];
    },
    // stamp 정보
    stampPanelInfo({ eventData }) {
      const { arObjectInfo, arEventLogicalInfo, eventLogicalType, arScanningImageInfo } = eventData;
      switch (eventLogicalType) {
        case "MISSION":
          return {
            stampPanelDirection: arEventLogicalInfo.panPositionType,
            stampInfoObjectList: Array.isArray(arObjectInfo) ? arObjectInfo.map(getStampData) : [],
          };
        case "SCANNING":
          return {
            stampPanelDirection: arEventLogicalInfo.panPositionType,
            stampInfoObjectList: Array.isArray(arScanningImageInfo) ? arScanningImageInfo.map(getScanningStampData) : [],
          };
        default:
          return null;
      }
    },
    // Bridge 정보
    bridgeObjectInfoList({ eventData }) {
      const { eventLogicalType, arObjectInfo, arEventLogicalInfo } = eventData;

      switch (eventLogicalType) {
        case "SCANNING":
          return getScanningBridgeData(arEventLogicalInfo);
        default:
          return Array.isArray(arObjectInfo) ? arObjectInfo.map(getBridgeData) : null;
      }
    },
    // 이미지 스캔 목록 정보
    imageScanningInfoList({ eventData }) {
      const { eventLogicalType } = eventData;
      switch (eventLogicalType) {
        case "SCANNING":
          return eventData?.arScanningImageInfo.map(getScanningData);
        default:
          return null;
      }
    },
    // add by jinylee.
    arDropTargetInfo({ eventData }) {
      // 순서가 중요
      const { eventLogicalType, arEventLogicalInfo } = eventData;

      switch (eventLogicalType) {
        case "DRAG_DROP":
          return arEventLogicalInfo;
        default:
          return null;
      }
    },

    // Background 정보
    backgroundUri({ eventData }) {
      return eventData?.arSkinImage ?? "";
    },
    backgroundUriList({ eventData }) {
      return eventData?.arSkinImageList ?? [];
    },

    templateType(state) {
      return state.eventData?.eventLogicalType;
    },
    eventResult(state) {
      return state.eventResult;
    },
    isEventFinish(state) {
      return state.isEventFinish;
    },
  },
  actions: {
    // 이벤트 데이터 파싱
    async getEventData({ commit, dispatch }, params) {
      try {
        const res = await getEventData(params);
        if (res.data.resultCode.toString() === "200") {
          commit("SET_EVENT_DATA", res.data.result);
          return;
        }
        // 에러처리
        dispatch("ajaxStatus/setResponse", res.data, { root: true });
      } catch ({ status: resultCode, statusText: resultMessage }) {
        // alert(err);
        dispatch("ajaxStatus/setResponse", { resultCode, resultMessage }, { root: true });
        // return err
      }
    },
    // 이벤트 결과 파싱
    async getEventResult({ commit, dispatch }, params) {
      try {
        const res = await getEventResult(params);
        if (res.data.resultCode.toString() === "200") {
          commit("SET_EVENT_RESULT", res.data.result);
          return;
        }
        // 에러 처리
        dispatch("ajaxStatus/setResponse", res.data, { root: true });
      } catch ({ status: resultCode, statusText: resultMessage }) {
        // alert(err);
        dispatch("ajaxStatus/setResponse", { resultCode, resultMessage }, { root: true });
        // return err
      }
    },
    // session storage에 저장된 오브젝트 데이터 파싱
    async getStroageEventData({ commit }) {
      return new Promise((resolve) => {
        const storageData = sessionStorage.getItem("skWebArJson");
        commit("SET_EVENT_DATA", JSON.parse(storageData));
        resolve(storageData);
      });
    },
    // session storage에 저장된 이벤트 결과 데이터 파싱
    async getStroageEventResultData({ commit }) {
      return new Promise((resolve) => {
        const storageData = sessionStorage.getItem("skWebArResultJson");
        commit("SET_EVENT_RESULT", JSON.parse(storageData));
        resolve(storageData);
      });
    },
    setIsEventFinish({ commit }, param) {
      commit("isEventFinish", param);
    },
  },
};
// 이벤트 오브젝트 데이터 파싱
function getArObjectData(acc, item) {
  const {
    arEventObjectId,
    objectSettingType,
    objectSettingUrl,
    objectSizeX,
    objectSizeY,
    objectSizeZ,
    objectPositionX,
    objectPositionY,
    objectPositionZ,
    stayEffectType,
    clickEventType,
    videoPlayRepeatType,
    catchSoundFile,
    objectChangeSettingType,
    objectChangeSettingUrl,
    objectChangeSizeX,
    objectChangeSizeY,
    objectChangeSizeZ,
  } = item;

  const result = {
    touchEffectType: clickEventType,
    touchSoundUri: catchSoundFile,
  };

  if (objectSettingType) {
    result.stayObject = {
      itemID: arEventObjectId,
      type: objectSettingType,
      positionX: objectPositionX,
      positionY: objectPositionY,
      positionZ: objectPositionZ,
      sizeX: objectSizeX,
      sizeY: objectSizeY,
      sizeZ: objectSizeZ,
      sourceUri: objectSettingUrl,
      stayEffectType: stayEffectType,
      mediaLooping: videoPlayRepeatType === "Y" ? true : false,
    };
  }

  if (clickEventType === "OBJCHANGE") {
    result.touchObject = {
      itemID: arEventObjectId,
      type: objectChangeSettingType,
      positionX: "",
      positionY: "",
      positionZ: "",
      sizeX: objectChangeSizeX,
      sizeY: objectChangeSizeY,
      sizeZ: objectChangeSizeZ,
      sourceUri: objectChangeSettingUrl,
    };
  }
  acc.push(result);

  return acc;
}
// asset data파싱
function getAssetData(acc, item) {
  const {
    clickEventType,
    objectSettingType,
    objectSettingUrl,
    arEventObjectId,
    videoPlayRepeatType = true,
    objectChangeSettingType,
    objectChangeSettingUrl,
  } = item;

  // stay object
  if (objectSettingType) {
    let result = {
      type: objectSettingType,
      sourceUri: objectSettingUrl,
      itemID: arEventObjectId,
      id: `stayObject_${arEventObjectId}`,
      objectType: "stayObject",
    };

    if (objectSettingType === "VIDEO") {
      result = { ...result, mediaLooping: String(videoPlayRepeatType) === "Y" };
    }
    acc.push(result);
  }
  // touch object
  if (clickEventType === "OBJCHANGE") {
    let result = {
      type: objectChangeSettingType,
      sourceUri: objectChangeSettingUrl,
      itemID: arEventObjectId,
      id: `touchObject_${arEventObjectId}`,
      objectType: "touchObject",
    };

    if (objectChangeSettingType === "VIDEO") {
      result = { ...result, mediaLooping: false };
    }
    acc.push(result);
  }

  return acc;
}
// stamp data 파싱
function getStampData(item) {
  const { arEventObjectId, missionInactiveThumbnailUrl, missionActiveThumbnailUrl } = item;
  return {
    itemID: arEventObjectId,
    enableThumbnailUri: missionInactiveThumbnailUrl,
    disableThumbnailUri: missionActiveThumbnailUrl,
  };
}
// 스케닝 stamp 파싱
function getScanningStampData(item) {
  const { sortNumber, activeThumbnailUrl, inactiveThumbnailUrl } = item;
  return {
    itemID: sortNumber,
    enableThumbnailUri: activeThumbnailUrl,
    disableThumbnailUri: inactiveThumbnailUrl,
  };
}
function getContentsData(item){
  const { photoContentChoiceType, photoFileName , photoThumbnailImgUrl, photoOriginalFileUrl, photoContentTabMenuType,sort} = item;
  return {
    itemID: sort,
    type: photoContentChoiceType,
    thumbnailUri: photoThumbnailImgUrl,
    sourceUri: photoOriginalFileUrl,
    tabMenuType: photoContentTabMenuType,
    fileName: photoFileName,
  };
    
}
// 브릿지 데이터 파싱
function getBridgeData(item) {
  const {
    arEventObjectId,
    bridgeType,
    bridgeUrl,
    bridgeExposureTimeSecond,
    bridgeDisplayDirectionType,
    bridgeObjectSizeX,
    bridgeObjectSizeY,
    bridgeObjectSizeZ,
    bridgeForceExposureTimeType,
    bridgeForceExposureTimeSecond,
  } = item;
  return {
    itemID: arEventObjectId,
    bridgeType: bridgeType,
    sourceUri: bridgeUrl,
    bridgeDirection: bridgeDisplayDirectionType,
    playTime: bridgeExposureTimeSecond,
    sizeX: bridgeObjectSizeX,
    sizeY: bridgeObjectSizeY,
    sizeZ: bridgeObjectSizeZ,
    forcePlay: bridgeForceExposureTimeType,
    forcePlayTime: bridgeForceExposureTimeSecond,
  };
}
// 스케닝 데이터 파싱
function getScanningData(item) {
  const { sortNumber, scanningImageUrl, scanningSoundFile } = item;
  return {
    itemID: sortNumber,
    scanningSoundUri: scanningSoundFile,
    sourceUri: scanningImageUrl,
  };
}
// 스케닝 브릿지 파싱
function getScanningBridgeData(item) {
  const {
    arEventLogicalId,
    bridgeType,
    bridgeUrl,
    bridgeDisplayDirectionType,
    bridgeExposureTimeSecond,
    bridgeObjectSizeX,
    bridgeObjectSizeY,
    bridgeObjectSizeZ,
    bridgeForceExposureTimeType,
    bridgeForceExposureTimeSecond,
  } = item;
  return [
    {
      itemID: arEventLogicalId,
      bridgeType: bridgeType,
      sourceUri: bridgeUrl,
      bridgeDirection: bridgeDisplayDirectionType,
      playTime: bridgeExposureTimeSecond,
      sizeX: bridgeObjectSizeX,
      sizeY: bridgeObjectSizeY,
      sizeZ: bridgeObjectSizeZ,
      forcePlay: bridgeForceExposureTimeType,
      forcePlayTime: bridgeForceExposureTimeSecond,
    },
  ];
}
