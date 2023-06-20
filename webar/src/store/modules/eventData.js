//function import from src/apis/index.js
import { getEventData, getEventResult, getEventPhotoBox } from "@/apis";

export const eventData = {
  namespaced: true,
  state: () => ({
    eventData: {},
    eventResult: {},
    photoBoxData: {},
    isEventFinish: false,
  }),
  mutations: {
    ["SET_EVENT_DATA"](state, payload) {
      state.eventData = payload;
    },
    ["SET_EVENT_RESULT"](state, payload) {
      state.eventResult = payload;
    },
    ["SET_PHOTO_BOX_DATA"](state, payload) {
      state.photoBoxData = payload;
    },
    ["isEventFinish"](state, payload) {
      state.isEventFinish = payload;
    },
  },
  getters: {
    eventData({ eventData }) {
      return eventData;
    },
    photoBoxData({ photoBoxData }) {
      return photoBoxData;
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
      return   photoContentsInfo?.frameContentsInfo?.map(getContentsData) ?? [];
    },
    characterContentsInfoList({ eventData }) {
      const { photoContentsInfo } = eventData;
      return   photoContentsInfo?.characterContentsInfo?.map(getContentsData) ?? [];
    },
    tabContentsInfoList({ eventData }) {
      const { photoContentsInfo } = eventData;
      return  photoContentsInfo?.tabContentsInfo?.map(getContentsData) ?? [];
    },
    filterContentsInfoList({ eventData }) {
      const { photoContentsInfo } = eventData;
      return   photoContentsInfo?.filterContentsInfo?.map(getContentsData) ?? [];
    },
    stickerContentsInfoList({ eventData }) {
      const { photoContentsInfo } = eventData;
      return   photoContentsInfo?.stickerContentsInfo?.map(getContentsData) ?? [];
    },
    arAssetInfoList({ eventData }) {
      const { arObjectInfo } = eventData;
      return Array.isArray(arObjectInfo) ? arObjectInfo.reduce(getAssetData, []) : [];
    },
    bannerList({ photoBoxData }) {
      const { bannerList } = photoBoxData;
      return Array.isArray(bannerList) ? bannerList.map(getBannerData) : [];
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
    loadingImgYn({ eventData }) {
      return eventData?.loadingImgYn ?? "N";
    },
    loadingImgUrl({ eventData }) {
      return eventData?.loadingImgUrl ?? "/img/loading01_114x120.gif";
    },
    tutorialYn({ eventData }) {
      return getPhotoLogicalInfoProperty(eventData, 'tutorialYn', 'N');
    },
    photoRatioSettingType({ eventData }) {
      return getPhotoLogicalInfoProperty(eventData, 'photoRatioSettingType', 'BASIC');
    },
    arFrameSettingYn({ eventData }) {
      return getPhotoLogicalInfoProperty(eventData, 'arFrameSettingYn', 'N');
    },
    photoTabMenuAddSettingYn({ eventData }) {
      return getPhotoLogicalInfoProperty(eventData, 'photoTabMenuAddSettingYn', 'N');
    },
    tabMenuTitle({ eventData }) {
      return getPhotoLogicalInfoProperty(eventData, 'tabMenuTitle', 'default');
    },
    arFilterSettingYn({ eventData }) {
      return getPhotoLogicalInfoProperty(eventData, 'arFilterSettingYn', 'N');
    },
    arCharacterSettingYn({ eventData }) {
      return getPhotoLogicalInfoProperty(eventData, 'arCharacterSettingYn', 'N');
    },
    arStickerSettingYn({ eventData }) {
      return getPhotoLogicalInfoProperty(eventData, 'arStickerSettingYn', 'N');
    },
    filmResultImgUrl({ eventData }) {
      return getPhotoLogicalInfoProperty(eventData, 'filmResultImgUrl', 'default');
    },
    hashTagSettingYn({ eventData }) {
      return getPhotoLogicalInfoProperty(eventData, 'hashTagSettingYn', 'N');
    },
    hashTagValue({ eventData }) {
      return getPhotoLogicalInfoProperty(eventData, 'hashTagValue', 'default');
    },
    shareAgreePopupSettingYn({ eventData }) {
      return getPhotoLogicalInfoProperty(eventData, 'shareAgreePopupSettingYn', 'N');
    },
    agreePopupText({ eventData }) {
      return getPhotoLogicalInfoProperty(eventData, 'agreePopupText', 'default');
    },
    agreePopupDetailLinkUrl({ eventData }) {
      return getPhotoLogicalInfoProperty(eventData, 'agreePopupDetailLinkUrl', 'default');
    },
    agreePopupInputText({ eventData }) {
      return getPhotoLogicalInfoProperty(eventData, 'agreePopupInputText', 'default');
    },
    photoPrintSettingYn({ eventData }) {
      return getPhotoLogicalInfoProperty(eventData, 'photoPrintSettingYn', 'N');
    },
    photoPrintButtonText({ eventData }) {
      return getPhotoLogicalInfoProperty(eventData, 'photoPrintButtonText', 'default');
    },
    photoGiveAwaySettingYn({ eventData }) {
      return getPhotoLogicalInfoProperty(eventData, 'photoGiveAwaySettingYn', 'N');
    },
    photoGiveAwayButtonText({ eventData }) {
      return getPhotoLogicalInfoProperty(eventData, 'photoGiveAwayButtonText', 'default');
    },
    filmResultFooterImgSettingYn({ eventData }) {
      return getPhotoLogicalInfoProperty(eventData, 'filmResultFooterImgSettingYn', 'N');
    },
    filmResultFooterImgUrl({ eventData }) {
      return getPhotoLogicalInfoProperty(eventData, 'filmResultFooterImgUrl', 'default');
    },
    deviceLocationFindSettingYn({ photoBoxData }) {
      return photoBoxData?.deviceLocationFindSettingYn ?? "N";
    },
    deviceLocationFindButtonText({ photoBoxData }) {
      return photoBoxData?.deviceLocationFindButtonText ?? "";
    },
    locationFindExposureType({ photoBoxData }) {
      return photoBoxData?.locationFindExposureType ?? "NONE";
    },
    locationFindPopupImgUrl({ photoBoxData }) {
      return photoBoxData?.locationFindPopupImgUrl ?? "";
    },
    freePrintControlYn({ photoBoxData }) {
      return photoBoxData?.freePrintControlYn ?? "N";
    },
    freePrintCustomerCount({ photoBoxData }) {
      return photoBoxData?.freePrintCustomerCount ?? 10;
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
        console.log(params)
        const res = await getEventData(params);
        if (res.data.resultCode.toString() === "200") {
          console.log("getEventData success")
          commit("SET_EVENT_DATA", res.data.result);
          return;
        }
        console.log("getEventData fail", res.data.resultCode)
        // 에러처리
        dispatch("ajaxStatus/setResponse", res.data, { root: true });
      } catch ({ status: resultCode, statusText: resultMessage }) {
        console.log("getEventData error")
        // alert(err);
        dispatch("ajaxStatus/setResponse", { resultCode, resultMessage }, { root: true });
        // return err
      }
    },
    //포토함 데이터 파싱
    async getEventPhotoBox({ commit, dispatch }, params) {
      try {
        const res = await getEventPhotoBox(params);
        console.log("getEventPhotoBox", res.data.resultCode)
        if (res.data.resultCode.toString() === "200") {
          commit("SET_EVENT_PHOTOBOX", res.data.result);
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
        console.log(JSON.parse(storageData))
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
    chocieType: photoContentChoiceType,
    tabMenuType: photoContentTabMenuType,
    thumbnailUri: photoThumbnailImgUrl,
    sourceUri: photoOriginalFileUrl,
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

function getBannerData(item) {
  const {arNftBannerId, bannerImgUrl, bannerTargetUrl, bannerSort} = item;
  return {
    itemID: arNftBannerId,
    bannerImgUrl: bannerImgUrl,
    bannerTargetUrl: bannerTargetUrl,
    bannerSort: bannerSort,
  };
}

function getPhotoLogicalInfoProperty(eventData, propertyName, defaultValue) {
    return eventData?.photoLogicalInfo?.[propertyName]?? defaultValue; 
}

