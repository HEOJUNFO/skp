import _ from "lodash";

export const jsonData = {
  namespaced: true,
  state: () => ({
    eventData: {},
    offsetActionObjectBasic: {
      eventId: "1234", // 이벤트ID
      eventTitle: "test", // 이벤트명
      eventLogicalType: "BASIC", // 기본형 : BASIC, 브릿지형 : BRIDGE, 미션클리어형 : MISSION, 이미지스캐닝형 : SCANNING
      arBgImage: "", // AR 백그라운드 이미지 URL
      arSkinImage: "https://dt-static.syrup.co.kr/webar/images/EVENT_554813.png", // AR 스킨 이미지 URL
      arObjectInfo: [
        {
          arEventObjectId: "1", // *인덱스 번호
          objectSettingType: "CUBE", // *IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectSettingUrl: "https://dt-static.syrup.co.kr/webar/images/object_sphere_img.png", // *리소스 url 값
          objectSizeX: "0.2", // *오브젝트 크기
          objectSizeY: "0.2", // *오브젝트 크기
          objectSizeZ: "0.2", // *오브젝트 크기
          objectPositionX: "-0.7", // *좌표값 (-2.0 ~ 2.0)
          objectPositionY: "-0.3", // *좌표값 (-2.0 ~ 2.0)
          objectPositionZ: "-1.7", // *좌표값 (-2.0 ~ 2.0)
          stayEffectType: "ROTATION", // *NONE : NONE, Rotation : ROTATION, Heartbeat : HEARTBEAT
          clickEventType: "OBJCHANGE", // *NONE : NONE, Fade-out : FADEOUT, Object change : OBJCHANGE
          videoPlayRepeatType: "Y", // *반복함 : Y, 반복안함 : N
          catchSoundType: "URL", // *선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          catchSoundFile: "https://dt-static.syrup.co.kr/webar/mp3/touch_effect_sound_1.mp3", // *리소스 값
          objectChangeSettingType: "VIDEO", // *IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          // "objectChangeSettingType": "GIF", // *IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectChangeSettingUrl: "https://dt-static.syrup.co.kr/webar/mp4/ForBiggerFun.mp4", // *리소스 url 값
          // "objectChangeSettingUrl": "https://dt-static.syrup.co.kr/webar/images/object_gif_2.gif", // *리소스 url 값
          objectChangeSizeX: "", // *체인지 오브젝트 크기
          objectChangeSizeY: "", // *체인지 오브젝트 크기
          objectChangeSizeZ: "", // *체인지 오브젝트 크기
          missionInactiveThumbnailUrl: "", // *스템프: 리소스 url 값
          missionActiveThumbnailUrl: "", // *스탬프: 리소스 url 값
          bridgeForceExposureTimeType: "N",
          bridgeForceExposureTimeSecond: 0,
          bridgeType: "", // *브릿지 : 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
          bridgeUrl: "", // *브릿지 : 리소스 url 값
          bridgeExposureTimeSecond: "", // *playtime 숫자 값
          bridgeDisplayDirectionType: "", // 가로 : WIDTH, 세로 : HEIGHT
          bridgeObjectSizeX: "",
          bridgeObjectSizeY: "",
          bridgeObjectSizeZ: "",
        },
        {
          arEventObjectId: "2", // 인덱스 번호
          objectSettingType: "VIDEO", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectSettingUrl: "https://dt-static.syrup.co.kr/webar/mp4/ForBiggerFun.mp4", // 리소스 url 값
          objectSizeX: "", // 오브젝트 크기
          objectSizeY: "", // 오브젝트 크기
          objectSizeZ: "", // 오브젝트 크기
          objectPositionX: "-0.2", // 좌표값 (-2.0 ~ 2.0)
          objectPositionY: "0", // 좌표값 (-2.0 ~ 2.0)
          objectPositionZ: "-0.5", // 좌표값 (-2.0 ~ 2.0)
          stayEffectType: "HEARTBEAT", // NONE : NONE, Rotation : ROTATION, Heartbeat : HEARTBEAT
          clickEventType: "FADEOUT", // NONE : NONE, Fade-out : FADEOUT, Object change : OBJCHANGE
          videoPlayRepeatType: "N", // 반복함 : Y, 반복안함 : N
          catchSoundType: "URL", // 선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          catchSoundFile: "https://dt-static.syrup.co.kr/webar/mp3/touch_effect_sound_2.mp3", // 리소스 값
          objectChangeSettingType: "", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectChangeSettingUrl: "", // 리소스 url 값
          objectChangeSizeX: "", // 체인지 오브젝트 크기
          objectChangeSizeY: "", // 체인지 오브젝트 크기
          objectChangeSizeZ: "", // 체인지 오브젝트 크기
          missionInactiveThumbnailUrl: "", // 리소스 url 값
          missionActiveThumbnailUrl: "", // 리소스 url 값
          bridgeForceExposureTimeType: "N",
          bridgeForceExposureTimeSecond: 0,
          bridgeType: "", // 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
          bridgeUrl: "", // 리소스 url 값
          bridgeExposureTimeSecond: "", // 숫자 값
          bridgeDisplayDirectionType: "", // 가로 : WIDTH, 세로 : HEIGHT
          bridgeObjectSizeX: "",
          bridgeObjectSizeY: "",
          bridgeObjectSizeZ: "",
        },
        {
          arEventObjectId: "3", // 인덱스 번호
          objectSettingType: "CYLINDER", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectSettingUrl: "https://dt-static.syrup.co.kr/webar/images/object_cylinder_img.png", // 리소스 url 값
          objectSizeX: "1", // 오브젝트 크기
          objectSizeY: "1", // 오브젝트 크기
          objectSizeZ: "1", // 오브젝트 크기
          objectPositionX: "1", // 좌표값 (-2.0 ~ 2.0)
          objectPositionY: "-1.2", // 좌표값 (-2.0 ~ 2.0)
          objectPositionZ: "-2", // 좌표값 (-2.0 ~ 2.0)
          stayEffectType: "HEARTBEAT", // NONE : NONE, Rotation : ROTATION, Heartbeat : HEARTBEAT
          clickEventType: "FADEOUT", // NONE : NONE, Fade-out : FADEOUT, Object change : OBJCHANGE
          videoPlayRepeatType: "", // 반복함 : Y, 반복안함 : N
          catchSoundType: "URL", // 선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          catchSoundFile: "https://dt-static.syrup.co.kr/webar/mp3/touch_effect_sound_3.mp3", // 리소스 값
          objectChangeSettingType: "", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectChangeSettingUrl: "", // 리소스 url 값
          objectChangeSizeX: "", // 체인지 오브젝트 크기
          objectChangeSizeY: "", // 체인지 오브젝트 크기
          objectChangeSizeZ: "", // 체인지 오브젝트 크기
          missionInactiveThumbnailUrl: "", // 리소스 url 값
          missionActiveThumbnailUrl: "", // 리소스 url 값
          bridgeForceExposureTimeType: "N",
          bridgeForceExposureTimeSecond: 0,
          bridgeType: "", // 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
          bridgeUrl: "", // 리소스 url 값
          bridgeExposureTimeSecond: "", // 숫자 값
          bridgeDisplayDirectionType: "", // 가로 : WIDTH, 세로 : HEIGHT
          bridgeObjectSizeX: "",
          bridgeObjectSizeY: "",
          bridgeObjectSizeZ: "",
        },
        {
          arEventObjectId: "4", // 인덱스 번호
          objectSettingType: "GIF", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectSettingUrl: "https://mayognaise.github.io/aframe-gif-shader/basic/banana.gif", // 리소스 url 값
          // "objectSettingUrl": "/images/test_img7.gif", // 리소스 url 값
          objectSizeX: "", // 오브젝트 크기
          objectSizeY: "", // 오브젝트 크기
          objectSizeZ: "", // 오브젝트 크기
          objectPositionX: "0", // 좌표값 (-2.0 ~ 2.0)
          objectPositionY: "-0.5", // 좌표값 (-2.0 ~ 2.0)
          objectPositionZ: "-1.5", // 좌표값 (-2.0 ~ 2.0)
          stayEffectType: "NONE", // NONE : NONE, Rotation : ROTATION, Heartbeat : HEARTBEAT
          clickEventType: "FADEOUT", // NONE : NONE, Fade-out : FADEOUT, Object change : OBJCHANGE
          videoPlayRepeatType: "", // 반복함 : Y, 반복안함 : N
          catchSoundType: "URL", // 선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          catchSoundFile: "https://dt-static.syrup.co.kr/webar/mp3/touch_effect_sound_4.mp3", // 리소스 값
          objectChangeSettingType: "", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectChangeSettingUrl: "", // 리소스 url 값
          objectChangeSizeX: "", // 체인지 오브젝트 크기
          objectChangeSizeY: "", // 체인지 오브젝트 크기
          objectChangeSizeZ: "", // 체인지 오브젝트 크기
          missionInactiveThumbnailUrl: "", // 리소스 url 값
          missionActiveThumbnailUrl: "", // 리소스 url 값
          bridgeForceExposureTimeType: "N",
          bridgeForceExposureTimeSecond: 0,
          bridgeType: "", // 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
          bridgeUrl: "", // 리소스 url 값
          bridgeExposureTimeSecond: "", // 숫자 값
          bridgeDisplayDirectionType: "", // 가로 : WIDTH, 세로 : HEIGHT
          bridgeObjectSizeX: "",
          bridgeObjectSizeY: "",
          bridgeObjectSizeZ: "",
        },
        {
          arEventObjectId: "5", // 인덱스 번호
          objectSettingType: "3D", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          // "objectSettingUrl": "https://dt-static.syrup.co.kr/webar/gltf/mei/scene.gltf", // 리소스 url 값
          objectSettingUrl: "https://dt-static.syrup.co.kr/3d/shiba/scene.gltf", // 리소스 url 값
          objectSizeX: "0.5", // 오브젝트 크기
          objectSizeY: "0.5", // 오브젝트 크기
          objectSizeZ: "0.5", // 오브젝트 크기
          objectPositionX: "0.2", // 좌표값 (-2.0 ~ 2.0)
          objectPositionY: "-0.5", // 좌표값 (-2.0 ~ 2.0)
          objectPositionZ: "-2", // 좌표값 (-2.0 ~ 2.0)
          stayEffectType: "ROTATION", // NONE : NONE, Rotation : ROTATION, Heartbeat : HEARTBEAT
          clickEventType: "FADEOUT", // NONE : NONE, Fade-out : FADEOUT, Object change : OBJCHANGE
          videoPlayRepeatType: "", // 반복함 : Y, 반복안함 : N
          catchSoundType: "URL", // 선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          catchSoundFile: "https://dt-static.syrup.co.kr/webar/mp3/touch_effect_sound_5.mp3", // 리소스 값
          objectChangeSettingType: "", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectChangeSettingUrl: "", // 리소스 url 값
          objectChangeSizeX: "", // 체인지 오브젝트 크기
          objectChangeSizeY: "", // 체인지 오브젝트 크기
          objectChangeSizeZ: "", // 체인지 오브젝트 크기
          missionInactiveThumbnailUrl: "", // 리소스 url 값
          missionActiveThumbnailUrl: "", // 리소스 url 값
          bridgeForceExposureTimeType: "N",
          bridgeForceExposureTimeSecond: 0,
          bridgeType: "", // 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
          bridgeUrl: "", // 리소스 url 값
          bridgeExposureTimeSecond: "", // 숫자 값
          bridgeDisplayDirectionType: "", // 가로 : WIDTH, 세로 : HEIGHT
          bridgeObjectSizeX: "",
          bridgeObjectSizeY: "",
          bridgeObjectSizeZ: "",
        },
      ],
      arEventLogicalInfo: {
        arEventLogicalId: "", //인덱스 번호
        panPositionType: "", //상단 : TOP, 하단 : BOTTOM, 좌측 : LEFT, 우측 : RIGHT
        panMissionNumber: "", // 숫자 값
        bridgeForceExposureTimeType: "N",
        bridgeForceExposureTimeSecond: 0,
        bridgeType: "", // 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
        bridgeUrl: "", //	리소스 url 값
        bridgeExposureTimeType: "", // 설정함 : Y, 설정안함 : N
        bridgeExposureTimeSecond: "", // 숫자 값
        bridgeDisplayDirectionType: "", // 가로 : WIDTH, 세로 : HEIGHT
      },
      arScanningImageInfo: [
        {
          sortNumber: "", //	순서 숫자 값
          scanningImageUrl: "", //	리소스 url 값
          scanningSoundType: "", //	선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          scanningSoundFile: "", //	파일 값
          activeThumbnailUrl: "", //	리소스 url 값
          inactiveThumbnailUrl: "", //	리소스 url 값
        },
      ],
    },
    offsetActionObjectMission: {
      eventId: "", // 이벤트ID
      eventTitle: "", // 이벤트명
      eventLogicalType: "MISSION", // 기본형 : BASIC, 브릿지형 : BRIDGE, 미션클리어형 : MISSION, 이미지스캐닝형 : SCANNING
      arBgImage: "", // AR 백그라운드 이미지 URL
      arSkinImage: "https://dt-static.syrup.co.kr/webar/images/EVENT_565783.png", // AR 스킨 이미지 URL
      arObjectInfo: [
        {
          arEventObjectId: "1", // 인덱스 번호
          objectSettingType: "IMAGE", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectSettingUrl: "https://dt-static.syrup.co.kr/webar/images/object_img_1.png", // 리소스 url 값
          objectSizeX: "", // 오브젝트 크기
          objectSizeY: "", // 오브젝트 크기
          objectSizeZ: "", // 오브젝트 크기
          objectPositionX: "0", // 좌표값 (-2.0 ~ 2.0)
          objectPositionY: "0", // 좌표값 (-2.0 ~ 2.0)
          objectPositionZ: "-0.5", // 좌표값 (-2.0 ~ 2.0)
          stayEffectType: "NONE", // NONE : NONE, Rotation : ROTATION, Heartbeat : HEARTBEAT
          clickEventType: "FADEOUT", // NONE : NONE, Fade-out : FADEOUT, Object change : OBJCHANGE
          videoPlayRepeatType: "", // 반복함 : Y, 반복안함 : N
          catchSoundType: "URL", // 선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          catchSoundFile: "https://dt-static.syrup.co.kr/webar/mp3/touch_effect_sound_1.mp3", // 리소스 값
          objectChangeSettingType: "", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectChangeSettingUrl: "", // 리소스 url 값
          objectChangeSizeX: "", // 체인지 오브젝트 크기
          objectChangeSizeY: "", // 체인지 오브젝트 크기
          objectChangeSizeZ: "", // 체인지 오브젝트 크기
          missionInactiveThumbnailUrl: "https://dt-static.syrup.co.kr/webar/images/pannel_img_1_dis.png", // 스템프: 리소스 url 값
          missionActiveThumbnailUrl: "https://dt-static.syrup.co.kr/webar/images/pannel_img_1_en.png", // 스탬프: 리소스 url 값
          bridgeForceExposureTimeType: "N",
          bridgeForceExposureTimeSecond: 0,
          bridgeType: "", // 브릿지 : 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
          bridgeUrl: "", // 브릿지 : 리소스 url 값
          bridgeExposureTimeSecond: "", // playtime 숫자 값
          bridgeDisplayDirectionType: "", // 가로 : WIDTH, 세로 : HEIGHT
          bridgeObjectSizeX: "",
          bridgeObjectSizeY: "",
          bridgeObjectSizeZ: "",
        },
        {
          arEventObjectId: "2", // 인덱스 번호
          objectSettingType: "IMAGE", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectSettingUrl: "https://dt-static.syrup.co.kr/webar/images/object_img_2.png", // 리소스 url 값
          objectSizeX: "", // 오브젝트 크기
          objectSizeY: "", // 오브젝트 크기
          objectSizeZ: "", // 오브젝트 크기
          objectPositionX: "0.5", // 좌표값 (-2.0 ~ 2.0)
          objectPositionY: "0", // 좌표값 (-2.0 ~ 2.0)
          objectPositionZ: "-0.5", // 좌표값 (-2.0 ~ 2.0)
          stayEffectType: "HEARTBEAT", // NONE : NONE, Rotation : ROTATION, Heartbeat : HEARTBEAT
          clickEventType: "FADEOUT", // NONE : NONE, Fade-out : FADEOUT, Object change : OBJCHANGE
          videoPlayRepeatType: "Y", // 반복함 : Y, 반복안함 : N
          catchSoundType: "URL", // 선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          catchSoundFile: "https://dt-static.syrup.co.kr/webar/mp3/touch_effect_sound_2.mp3", // 리소스 값
          objectChangeSettingType: "", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectChangeSettingUrl: "", // 리소스 url 값
          objectChangeSizeX: "", // 체인지 오브젝트 크기
          objectChangeSizeY: "", // 체인지 오브젝트 크기
          objectChangeSizeZ: "", // 체인지 오브젝트 크기
          missionInactiveThumbnailUrl: "https://dt-static.syrup.co.kr/webar/images/pannel_img_2_dis.png", // 리소스 url 값
          missionActiveThumbnailUrl: "https://dt-static.syrup.co.kr/webar/images/pannel_img_2_en.png", // 리소스 url 값
          bridgeForceExposureTimeType: "N",
          bridgeForceExposureTimeSecond: 0,
          bridgeType: "", // 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
          bridgeUrl: "", // 리소스 url 값
          bridgeExposureTimeSecond: "", // 숫자 값
          bridgeDisplayDirectionType: "", // 가로 : WIDTH, 세로 : HEIGHT
          bridgeObjectSizeX: "",
          bridgeObjectSizeY: "",
          bridgeObjectSizeZ: "",
        },
        {
          arEventObjectId: "3", // 인덱스 번호
          objectSettingType: "IMAGE", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectSettingUrl: "https://dt-static.syrup.co.kr/webar/images/object_img_3.png", // 리소스 url 값
          objectSizeX: "", // 오브젝트 크기
          objectSizeY: "", // 오브젝트 크기
          objectSizeZ: "", // 오브젝트 크기
          objectPositionX: "-0.5", // 좌표값 (-2.0 ~ 2.0)
          objectPositionY: "-0.5", // 좌표값 (-2.0 ~ 2.0)
          objectPositionZ: "-2", // 좌표값 (-2.0 ~ 2.0)
          stayEffectType: "HEARTBEAT", // NONE : NONE, Rotation : ROTATION, Heartbeat : HEARTBEAT
          clickEventType: "FADEOUT", // NONE : NONE, Fade-out : FADEOUT, Object change : OBJCHANGE
          videoPlayRepeatType: "", // 반복함 : Y, 반복안함 : N
          catchSoundType: "URL", // 선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          catchSoundFile: "https://dt-static.syrup.co.kr/webar/mp3/touch_effect_sound_3.mp3", // 리소스 값
          objectChangeSettingType: "", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectChangeSettingUrl: "", // 리소스 url 값
          objectChangeSizeX: "", // 체인지 오브젝트 크기
          objectChangeSizeY: "", // 체인지 오브젝트 크기
          objectChangeSizeZ: "", // 체인지 오브젝트 크기
          missionInactiveThumbnailUrl: "https://dt-static.syrup.co.kr/webar/images/pannel_img_3_dis.png", // 리소스 url 값
          missionActiveThumbnailUrl: "https://dt-static.syrup.co.kr/webar/images/pannel_img_3_en.png", // 리소스 url 값
          bridgeForceExposureTimeType: "N",
          bridgeForceExposureTimeSecond: 0,
          bridgeType: "", // 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
          bridgeUrl: "", // 리소스 url 값
          bridgeExposureTimeSecond: "", // 숫자 값
          bridgeDisplayDirectionType: "", // 가로 : WIDTH, 세로 : HEIGHT
          bridgeObjectSizeX: "",
          bridgeObjectSizeY: "",
          bridgeObjectSizeZ: "",
        },
      ],
      arEventLogicalInfo: {
        arEventLogicalId: "1", //인덱스 번호
        panPositionType: "TOP", //상단 : TOP, 하단 : BOTTOM, 좌측 : LEFT, 우측 : RIGHT
        panMissionNumber: "", // 숫자 값
        bridgeForceExposureTimeType: "N",
        bridgeForceExposureTimeSecond: 0,
        bridgeType: "", // 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
        bridgeUrl: "", //	리소스 url 값
        bridgeExposureTimeType: "", // 설정함 : Y, 설정안함 : N
        bridgeExposureTimeSecond: "", // 숫자 값
        bridgeDisplayDirectionType: "", // 가로 : WIDTH, 세로 : HEIGHT
        bridgeObjectSizeX: "",
        bridgeObjectSizeY: "",
        bridgeObjectSizeZ: "",
      },
      arScanningImageInfo: [
        {
          sortNumber: "", //	순서 숫자 값
          scanningImageUrl: "", //	리소스 url 값
          scanningSoundType: "", //	선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          scanningSoundFile: "", //	파일 값
          activeThumbnailUrl: "", //	리소스 url 값
          inactiveThumbnailUrl: "", //	리소스 url 값
        },
      ],
    },
    offsetActionObjectBridge: {
      eventId: "", // 이벤트ID
      eventTitle: "", // 이벤트명
      eventLogicalType: "BRIDGE", // 기본형 : BASIC, 브릿지형 : BRIDGE, 미션클리어형 : MISSION, 이미지스캐닝형 : SCANNING
      arBgImage: "", // AR 백그라운드 이미지 URL
      arSkinImage: "https://dt-static.syrup.co.kr/webar/images/EVENT_554813.png", // AR 스킨 이미지 URL
      arObjectInfo: [
        {
          arEventObjectId: "1", // 인덱스 번호
          objectSettingType: "SPHERE", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectSettingUrl: "https://dt-static.syrup.co.kr/webar/images/object_sphere_img.png", // 리소스 url 값
          objectSizeX: "", // 오브젝트 크기
          objectSizeY: "", // 오브젝트 크기
          objectSizeZ: "", // 오브젝트 크기
          objectPositionX: "-0.7", // 좌표값 (-2.0 ~ 2.0)
          objectPositionY: "-0.3", // 좌표값 (-2.0 ~ 2.0)
          objectPositionZ: "-1.7", // 좌표값 (-2.0 ~ 2.0)
          stayEffectType: "ROTATION", // NONE : NONE, Rotation : ROTATION, Heartbeat : HEARTBEAT
          clickEventType: "OBJCHANGE", // NONE : NONE, Fade-out : FADEOUT, Object change : OBJCHANGE
          videoPlayRepeatType: "", // 반복함 : Y, 반복안함 : N
          catchSoundType: "URL", // 선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          catchSoundFile: "https://dt-static.syrup.co.kr/webar/mp3/touch_effect_sound_4.mp3", // 리소스 값
          objectChangeSettingType: "GIF", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectChangeSettingUrl: "https://dt-static.syrup.co.kr/webar/images/object_gif_2.gif", // 리소스 url 값
          objectChangeSizeX: "", // 체인지 오브젝트 크기
          objectChangeSizeY: "", // 체인지 오브젝트 크기
          objectChangeSizeZ: "", // 체인지 오브젝트 크기
          missionInactiveThumbnailUrl: "", // 스템프: 리소스 url 값
          missionActiveThumbnailUrl: "", // 스탬프: 리소스 url 값
          bridgeForceExposureTimeType: "N",
          bridgeForceExposureTimeSecond: 0,
          bridgeType: "IMAGE", // 브릿지 : 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
          bridgeUrl: "https://dt-static.syrup.co.kr/webar/images/bridge_horizontal_img_1.png", // 브릿지 : 리소스 url 값
          bridgeExposureTimeSecond: "3", // playtime 숫자 값
          bridgeDisplayDirectionType: "WIDTH", // 가로 : WIDTH, 세로 : HEIGHT
          bridgeObjectSizeX: "",
          bridgeObjectSizeY: "",
          bridgeObjectSizeZ: "",
        },
        {
          arEventObjectId: "2", // 인덱스 번호
          objectSettingType: "VIDEO", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectSettingUrl: "https://dt-static.syrup.co.kr/webar/mp4/ForBiggerFun.mp4", // 리소스 url 값
          objectSizeX: "", // 오브젝트 크기
          objectSizeY: "", // 오브젝트 크기
          objectSizeZ: "", // 오브젝트 크기
          objectPositionX: "0.1", // 좌표값 (-2.0 ~ 2.0)
          objectPositionY: "-0.1", // 좌표값 (-2.0 ~ 2.0)
          objectPositionZ: "-0.5", // 좌표값 (-2.0 ~ 2.0)
          stayEffectType: "HEARTBEAT", // NONE : NONE, Rotation : ROTATION, Heartbeat : HEARTBEAT
          clickEventType: "FADEOUT", // NONE : NONE, Fade-out : FADEOUT, Object change : OBJCHANGE
          videoPlayRepeatType: "N", // 반복함 : Y, 반복안함 : N
          catchSoundType: "URL", // 선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          catchSoundFile: "https://dt-static.syrup.co.kr/webar/mp3/touch_effect_sound_5.mp3", // 리소스 값
          objectChangeSettingType: "", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectChangeSettingUrl: "", // 리소스 url 값
          objectChangeSizeX: "", // 체인지 오브젝트 크기
          objectChangeSizeY: "", // 체인지 오브젝트 크기
          objectChangeSizeZ: "", // 체인지 오브젝트 크기
          missionInactiveThumbnailUrl: "", // 리소스 url 값
          missionActiveThumbnailUrl: "", // 리소스 url 값
          bridgeForceExposureTimeType: "Y",
          bridgeForceExposureTimeSecond: 4,
          bridgeType: "VIDEO", // 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
          bridgeUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", // 리소스 url 값
          bridgeExposureTimeSecond: "200000", // 숫자 값
          bridgeDisplayDirectionType: "HEIGHT", // 가로 : WIDTH, 세로 : HEIGHT
          bridgeObjectSizeX: 0.01,
          bridgeObjectSizeY: 0.01,
          bridgeObjectSizeZ: 0.01,
        },
        {
          arEventObjectId: "3", // 인덱스 번호
          objectSettingType: "CYLINDER", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectSettingUrl: "https://dt-static.syrup.co.kr/webar/images/object_cylinder_img.png", // 리소스 url 값
          objectSizeX: "", // 오브젝트 크기
          objectSizeY: "", // 오브젝트 크기
          objectSizeZ: "", // 오브젝트 크기
          objectPositionX: "0", // 좌표값 (-2.0 ~ 2.0)
          objectPositionY: "-1.2", // 좌표값 (-2.0 ~ 2.0)
          objectPositionZ: "-2", // 좌표값 (-2.0 ~ 2.0)
          stayEffectType: "HEARTBEAT", // NONE : NONE, Rotation : ROTATION, Heartbeat : HEARTBEAT
          clickEventType: "FADEOUT", // NONE : NONE, Fade-out : FADEOUT, Object change : OBJCHANGE
          videoPlayRepeatType: "", // 반복함 : Y, 반복안함 : N
          catchSoundType: "URL", // 선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          catchSoundFile: "https://dt-static.syrup.co.kr/webar/mp3/touch_effect_sound_1.mp3", // 리소스 값
          objectChangeSettingType: "", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectChangeSettingUrl: "", // 리소스 url 값
          objectChangeSizeX: "", // 체인지 오브젝트 크기
          objectChangeSizeY: "", // 체인지 오브젝트 크기
          objectChangeSizeZ: "", // 체인지 오브젝트 크기
          missionInactiveThumbnailUrl: "", // 리소스 url 값
          missionActiveThumbnailUrl: "", // 리소스 url 값
          bridgeForceExposureTimeType: "N",
          bridgeForceExposureTimeSecond: 0,
          bridgeType: "GIF", // 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
          bridgeUrl: "https://dt-static.syrup.co.kr/webar/images/bridge_horizontal_gif_2.gif", // 리소스 url 값
          bridgeExposureTimeSecond: "", // 숫자 값
          bridgeDisplayDirectionType: "WIDTH", // 가로 : WIDTH, 세로 : HEIGHT
          bridgeObjectSizeX: "",
          bridgeObjectSizeY: "",
          bridgeObjectSizeZ: "",
        },
        {
          arEventObjectId: "4", // 인덱스 번호
          objectSettingType: "GIF", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectSettingUrl: "https://dt-static.syrup.co.kr/webar/images/object_gif_1.gif", // 리소스 url 값
          objectSizeX: "", // 오브젝트 크기
          objectSizeY: "", // 오브젝트 크기
          objectSizeZ: "", // 오브젝트 크기
          objectPositionX: "1", // 좌표값 (-2.0 ~ 2.0)
          objectPositionY: "-0.2", // 좌표값 (-2.0 ~ 2.0)
          objectPositionZ: "0.5", // 좌표값 (-2.0 ~ 2.0)
          stayEffectType: "NONE", // NONE : NONE, Rotation : ROTATION, Heartbeat : HEARTBEAT
          clickEventType: "FADEOUT", // NONE : NONE, Fade-out : FADEOUT, Object change : OBJCHANGE
          videoPlayRepeatType: "", // 반복함 : Y, 반복안함 : N
          catchSoundType: "URL", // 선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          catchSoundFile: "https://dt-static.syrup.co.kr/webar/mp3/touch_effect_sound_2.mp3", // 리소스 값
          objectChangeSettingType: "", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectChangeSettingUrl: "", // 리소스 url 값
          objectChangeSizeX: "", // 체인지 오브젝트 크기
          objectChangeSizeY: "", // 체인지 오브젝트 크기
          objectChangeSizeZ: "", // 체인지 오브젝트 크기
          missionInactiveThumbnailUrl: "", // 리소스 url 값
          missionActiveThumbnailUrl: "", // 리소스 url 값
          bridgeForceExposureTimeType: "Y",
          bridgeForceExposureTimeSecond: 4,
          bridgeType: "VIDEO", // 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
          bridgeUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", // 리소스 url 값
          bridgeExposureTimeSecond: "", // 숫자 값
          bridgeDisplayDirectionType: "", // 가로 : WIDTH, 세로 : HEIGHT
          bridgeObjectSizeX: "",
          bridgeObjectSizeY: "",
          bridgeObjectSizeZ: "",
        },
        {
          arEventObjectId: "5", // 인덱스 번호
          objectSettingType: "3D", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectSettingUrl: "https://dt-static.syrup.co.kr/webar/gltf/pony_cartoon/scene.gltf", // 리소스 url 값
          objectSizeX: "0.2", // 오브젝트 크기
          objectSizeY: "0.2", // 오브젝트 크기
          objectSizeZ: "0.2", // 오브젝트 크기
          objectPositionX: "-0.5", // 좌표값 (-2.0 ~ 2.0)
          objectPositionY: "0.5", // 좌표값 (-2.0 ~ 2.0)
          objectPositionZ: "-2", // 좌표값 (-2.0 ~ 2.0)
          stayEffectType: "NONE", // NONE : NONE, Rotation : ROTATION, Heartbeat : HEARTBEAT
          clickEventType: "FADEOUT", // NONE : NONE, Fade-out : FADEOUT, Object change : OBJCHANGE
          videoPlayRepeatType: "", // 반복함 : Y, 반복안함 : N
          catchSoundType: "URL", // 선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          catchSoundFile: "https://dt-static.syrup.co.kr/webar/mp3/touch_effect_sound_3.mp3", // 리소스 값
          objectChangeSettingType: "", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectChangeSettingUrl: "", // 리소스 url 값
          objectChangeSizeX: "", // 체인지 오브젝트 크기
          objectChangeSizeY: "", // 체인지 오브젝트 크기
          objectChangeSizeZ: "", // 체인지 오브젝트 크기
          missionInactiveThumbnailUrl: "", // 리소스 url 값
          missionActiveThumbnailUrl: "", // 리소스 url 값
          bridgeForceExposureTimeType: "Y",
          bridgeForceExposureTimeSecond: 3,
          bridgeType: "VIDEO", // 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
          bridgeUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", // 리소스 url 값
          bridgeExposureTimeSecond: "", // 숫자 값
          bridgeDisplayDirectionType: "HEIGHT", // 가로 : WIDTH, 세로 : HEIGHT
          bridgeObjectSizeX: 0.05,
          bridgeObjectSizeY: 0.05,
          bridgeObjectSizeZ: 0.05,
          bridgeForce: true,
          bridgeForceTimeSecond: 10,
        },
      ],
      arEventLogicalInfo: {
        arEventLogicalId: "", //인덱스 번호
        panPositionType: "", //상단 : TOP, 하단 : BOTTOM, 좌측 : LEFT, 우측 : RIGHT
        panMissionNumber: "", // 숫자 값
        bridgeForceExposureTimeType: "N",
        bridgeForceExposureTimeSecond: 0,
        bridgeType: "", // 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
        bridgeUrl: "", //	리소스 url 값
        bridgeExposureTimeType: "", // 설정함 : Y, 설정안함 : N
        bridgeExposureTimeSecond: "", // 숫자 값
        bridgeDisplayDirectionType: "", // 가로 : WIDTH, 세로 : HEIGHT
        bridgeObjectSizeX: "",
        bridgeObjectSizeY: "",
        bridgeObjectSizeZ: "",
      },
      arScanningImageInfo: [
        {
          sortNumber: "", //	순서 숫자 값
          scanningImageUrl: "", //	리소스 url 값
          scanningSoundType: "", //	선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          scanningSoundFile: "", //	파일 값
          activeThumbnailUrl: "", //	리소스 url 값
          inactiveThumbnailUrl: "", //	리소스 url 값
        },
      ],
    },
    offsetImageScanningMission: {
      eventId: "", // 이벤트ID
      eventTitle: "", // 이벤트명
      eventLogicalType: "SCANNING", // 기본형 : BASIC, 브릿지형 : BRIDGE, 미션클리어형 : MISSION, 이미지스캐닝형 : SCANNING
      arBgImage: "", // AR 백그라운드 이미지 URL
      arSkinImage: "https://dt-static.syrup.co.kr/webar/images/EVENT_555475.png", // AR 스킨 이미지 URL
      arObjectInfo: [
        {
          arEventObjectId: "", // 인덱스 번호
          objectSettingType: "", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectSettingUrl: "", // 리소스 url 값
          objectSizeX: "", // 오브젝트 크기
          objectSizeY: "", // 오브젝트 크기
          objectSizeZ: "", // 오브젝트 크기
          objectPositionX: "", // 좌표값 (-2.0 ~ 2.0)
          objectPositionY: "", // 좌표값 (-2.0 ~ 2.0)
          objectPositionZ: "", // 좌표값 (-2.0 ~ 2.0)
          stayEffectType: "", // NONE : NONE, Rotation : ROTATION, Heartbeat : HEARTBEAT
          clickEventType: "", // NONE : NONE, Fade-out : FADEOUT, Object change : OBJCHANGE
          videoPlayRepeatType: "", // 반복함 : Y, 반복안함 : N
          catchSoundType: "", // 선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          catchSoundFile: "", // 리소스 값
          objectChangeSettingType: "", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectChangeSettingUrl: "", // 리소스 url 값
          objectChangeSizeX: "", // 체인지 오브젝트 크기
          objectChangeSizeY: "", // 체인지 오브젝트 크기
          objectChangeSizeZ: "", // 체인지 오브젝트 크기
          missionInactiveThumbnailUrl: "", // 스템프: 리소스 url 값
          missionActiveThumbnailUrl: "", // 스탬프: 리소스 url 값
          bridgeForceExposureTimeType: "N",
          bridgeForceExposureTimeSecond: 0,
          bridgeType: "", // 브릿지 : 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
          bridgeUrl: "", // 브릿지 : 리소스 url 값
          bridgeExposureTimeSecond: "", // playtime 숫자 값
          bridgeDisplayDirectionType: "", // type 가로 : WIDTH, 세로 : HEIGHT
          bridgeObjectSizeX: "",
          bridgeObjectSizeY: "",
          bridgeObjectSizeZ: "",
        },
      ],
      arEventLogicalInfo: {
        arEventLogicalId: "0", //인덱스 번호
        panPositionType: "BOTTOM", //상단 : TOP, 하단 : BOTTOM, 좌측 : LEFT, 우측 : RIGHT
        panMissionNumber: "", // 숫자 값
        // "bridgeType": "3D", // 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
        // "bridgeUrl": "https://dt-static.syrup.co.kr/webar/gltf/viernes/scene.gltf", // 리소스 url 값
        // "bridgeExposureTimeSecond": "200000", // 숫자 값
        // "bridgeDisplayDirectionType": "HEIGHT", // 가로 : WIDTH, 세로 : HEIGHT
        // "bridgeObjectSizeX": 0.01,
        // "bridgeObjectSizeY": 0.01,
        // "bridgeObjectSizeZ": 0.01
        bridgeForceExposureTimeType: "N",
        bridgeForceExposureTimeSecond: 0,
        bridgeType: "VIDEO", // 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
        bridgeUrl: "https://dt-static.syrup.co.kr/webar/mp4/object_video_chromakey_1.mp4", //	리소스 url 값
        bridgeExposureTimeType: "N", // 설정함 : Y, 설정안함 : N
        bridgeExposureTimeSecond: "3", // 숫자 값
        bridgeDisplayDirectionType: "WIDTH", // 가로 : WIDTH, 세로 : HEIGHT
        bridgeObjectSizeX: "",
        bridgeObjectSizeY: "",
        bridgeObjectSizeZ: "",
      },
      arScanningImageInfo: [
        {
          sortNumber: "1", //	순서 숫자 값
          scanningImageUrl: "https://dt-static.syrup.co.kr/webar/nft/pinball/pinball", //	리소스 url 값
          scanningSoundType: "", //	선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          scanningSoundFile: "https://dt-static.syrup.co.kr/webar/mp3/touch_effect_sound_4.mp3", //	파일 값
          activeThumbnailUrl: "https://dt-static.syrup.co.kr/webar/images/pinball.png", //	리소스 url 값
          inactiveThumbnailUrl: "https://dt-static.syrup.co.kr/webar/images/pinball_dis.png", //	리소스 url 값
        },
        {
          sortNumber: "2", //	순서 숫자 값
          scanningImageUrl: "https://dt-static.syrup.co.kr/webar/nft/mcdonald/mcdonald", //	리소스 url 값
          scanningSoundType: "", //	선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          scanningSoundFile: "https://dt-static.syrup.co.kr/webar/mp3/touch_effect_sound_5.mp3", //	파일 값
          activeThumbnailUrl: "https://dt-static.syrup.co.kr/webar/images/mcdonald.png", //	리소스 url 값
          inactiveThumbnailUrl: "https://dt-static.syrup.co.kr/webar/images/mcdonald_dis.png", //	리소스 url 값
        },
      ],
    },
    // add drag and drop
    offsetActionObjectDragNDrop: {
      eventId: "dnd111", // 이벤트ID
      eventTitle: "test", // 이벤트명
      eventLogicalType: "DRAG_DROP", // 기본형 : BASIC, 브릿지형 : BRIDGE, 미션클리어형 : MISSION, 이미지스캐닝형 : SCANNING, 드래그드롭형:DRAG_DROP
      arBgImage: "", // AR 백그라운드 이미지 URL
      arSkinImage: "https://dt-static.syrup.co.kr/webar/images/EVENT_554813.png", // AR 스킨 이미지 URL
      arObjectInfo: [
        {
          arEventObjectId: "dnd222", // *인덱스 번호
          objectSettingType: "CUBE", // *IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectSettingUrl: "https://dt-static.syrup.co.kr/webar/images/object_sphere_img.png", // *리소스 url 값
          objectSizeX: "0.5", // *오브젝트 크기
          objectSizeY: "0.5", // *오브젝트 크기
          objectSizeZ: "0.5", // *오브젝트 크기
          objectPositionX: "0.0", // *좌표값 (-2.0 ~ 2.0)
          objectPositionY: "1.3", // *좌표값 (-2.0 ~ 2.0)
          objectPositionZ: "-1.7", // *좌표값 (-2.0 ~ 2.0)
          stayEffectType: "ROTATION", // *NONE : NONE, Rotation : ROTATION, Heartbeat : HEARTBEAT
          clickEventType: "OBJCHANGE", // *NONE : NONE, Fade-out : FADEOUT, Object change : OBJCHANGE
          videoPlayRepeatType: "Y", // *반복함 : Y, 반복안함 : N
          catchSoundType: "URL", // *선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          catchSoundFile: "https://dt-static.syrup.co.kr/webar/mp3/touch_effect_sound_1.mp3", // *리소스 값
          objectChangeSettingType: "VIDEO", // *IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          // "objectChangeSettingType": "GIF", // *IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectChangeSettingUrl: "https://dt-static.syrup.co.kr/webar/mp4/ForBiggerFun.mp4", // *리소스 url 값
          // "objectChangeSettingUrl": "https://dt-static.syrup.co.kr/webar/images/object_gif_2.gif", // *리소스 url 값
          objectChangeSizeX: "", // *체인지 오브젝트 크기
          objectChangeSizeY: "", // *체인지 오브젝트 크기
          objectChangeSizeZ: "", // *체인지 오브젝트 크기
          missionInactiveThumbnailUrl: "", // *스템프: 리소스 url 값
          missionActiveThumbnailUrl: "", // *스탬프: 리소스 url 값
          bridgeForceExposureTimeType: "N",
          bridgeForceExposureTimeSecond: 0,
          bridgeType: "", // *브릿지 : 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
          bridgeUrl: "", // *브릿지 : 리소스 url 값
          bridgeExposureTimeSecond: "", // *playtime 숫자 값
          bridgeDisplayDirectionType: "", // 가로 : WIDTH, 세로 : HEIGHT
          bridgeObjectSizeX: "",
          bridgeObjectSizeY: "",
          bridgeObjectSizeZ: "",
        },
        {
          arEventObjectId: "dnd222", // *인덱스 번호
          objectSettingType: "CUBE", // *IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectSettingUrl: "https://dt-static.syrup.co.kr/webar/images/object_sphere_img.png", // *리소스 url 값
          objectSizeX: "0.5", // *오브젝트 크기
          objectSizeY: "0.5", // *오브젝트 크기
          objectSizeZ: "0.5", // *오브젝트 크기
          objectPositionX: "0.0", // *좌표값 (-2.0 ~ 2.0)
          objectPositionY: "1.3", // *좌표값 (-2.0 ~ 2.0)
          objectPositionZ: "-1.7", // *좌표값 (-2.0 ~ 2.0)
          stayEffectType: "ROTATION", // *NONE : NONE, Rotation : ROTATION, Heartbeat : HEARTBEAT
          clickEventType: "OBJCHANGE", // *NONE : NONE, Fade-out : FADEOUT, Object change : OBJCHANGE
          videoPlayRepeatType: "Y", // *반복함 : Y, 반복안함 : N
          catchSoundType: "URL", // *선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          catchSoundFile: "https://dt-static.syrup.co.kr/webar/mp3/touch_effect_sound_1.mp3", // *리소스 값
          objectChangeSettingType: "VIDEO", // *IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectChangeSettingUrl: "https://dt-static.syrup.co.kr/webar/mp4/ForBiggerFun.mp4", // *리소스 url 값
          objectChangeSizeX: "", // *체인지 오브젝트 크기
          objectChangeSizeY: "", // *체인지 오브젝트 크기
          objectChangeSizeZ: "", // *체인지 오브젝트 크기
          missionInactiveThumbnailUrl: "", // *스템프: 리소스 url 값
          missionActiveThumbnailUrl: "", // *스탬프: 리소스 url 값
          bridgeForceExposureTimeType: "N",
          bridgeForceExposureTimeSecond: 0,
          bridgeType: "", // *브릿지 : 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
          bridgeUrl: "", // *브릿지 : 리소스 url 값
          bridgeExposureTimeSecond: "", // *playtime 숫자 값
          bridgeDisplayDirectionType: "", // 가로 : WIDTH, 세로 : HEIGHT
          bridgeObjectSizeX: "",
          bridgeObjectSizeY: "",
          bridgeObjectSizeZ: "",
        },
      ],
      arEventLogicalInfo: {
        arEventLogicalId: "", //인덱스 번호
        panPositionType: "", //상단 : TOP, 하단 : BOTTOM, 좌측 : LEFT, 우측 : RIGHT
        panMissionNumber: "", // 숫자 값
        bridgeForceExposureTimeType: "N",
        bridgeForceExposureTimeSecond: 0,
        bridgeType: "", // 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
        bridgeUrl: "", //	리소스 url 값
        bridgeExposureTimeType: "", // 설정함 : Y, 설정안함 : N
        bridgeExposureTimeSecond: "", // 숫자 값
        bridgeDisplayDirectionType: "", // 가로 : WIDTH, 세로 : HEIGHT
        // add by jinylee
        nftWalletImgUrl: "https://dt-static.syrup.co.kr/webar/images/object_img_3.png", //DnD 타겟 Image Url( ex. 지갑이미지)
        nftWalletPositionX: "0.0", //DnD 타겟 3D 좌표 X
        nftWalletPositionY: "-0.5", //DnD 타겟 3D 좌표 Y
        nftWalletPositionZ: "-1.0", //DnD 타겟 3D 좌표 Z
        nftWalletSizeX: "0.2", //DnD 타겟 3D width
        nftWalletSizeY: "0.2", //DnD 타겟 3D height
      },
      arScanningImageInfo: [
        {
          sortNumber: "", //	순서 숫자 값
          scanningImageUrl: "", //	리소스 url 값
          scanningSoundType: "", //	선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          scanningSoundFile: "", //	파일 값
          activeThumbnailUrl: "", //	리소스 url 값
          inactiveThumbnailUrl: "", //	리소스 url 값
        },
      ],
    },
    offsetResultData: {
      eventId: "21917",
      finishYn: "Y", // Y/N : AR이벤트 미종료(N), AR이벤트 종료(Y)
      resultMessage: "정상",
      resultCode: "0000",
      eventLogWinningId: "0",
      winningInfo: {
        arEventWinningId: "0",
        winningType: "NFT", // 기타(배송) : ETC, 기프티콘 : GIFTICON, 꽝 : FAIL, NFT: NFT
        winningImageUrl: "https://dt-static.syrup.co.kr/webar/images/event_result.jpeg", // 당첨 이미지url : 이미지 리소스 uri
        autoWinningYn: "N",
      },
      winningButtonInfo: [
        {
          arEventWinningButtonId: "0",
          buttonActionType: "SUBSCRIPTION", // 버튼유형 : 경품배송입력 : DELIVERY, 계속하기(닫기) : CLOSE, URL접속 : URL, 응모정보입력: SUBSCRIPTION
          buttonText: "응모정보입력", // 버튼 문구
          linkUrl: "",
        },
        {
          arEventWinningButtonId: "1",
          buttonActionType: "URL",
          buttonText: "링크",
          linkUrl: "https://www.11st.co.kr/",
        },
        {
          arEventWinningButtonId: "2",
          buttonActionType: "CLOSE",
          buttonText: "닫기",
          linkUrl: "",
        },
      ],
    },
    offsetPhotoBoxData: {
      deviceLocationFindSettingYn: "Y", //디바이스 위치 찾기 버튼 설정 여부 설정안함: N / 설정함: Y
      deviceLocationFindButtonText: "셀픽 디바이스 찾기", //디바이스 위치 찾기 버튼 문구
      locationFindExposureType: "MAP", //위치 찾기 노출 설정 지도보기: MAP / 팝업보기: POPUP
      locationFindPopupImgUrl: "https://dt-static.syrup.co.kr/busanexpo/img/skin/skin_01.png", //위치 찾기 팝업 이미지 URL
      freePrintControlYn: "Y", //무료출력수 제어 설정안함: N / 설정함: Y
      freePrintCustomerCount: "3", //무료출력수 제어 설정 값

      bannerList: [
        {
            arNftBannerId: 575,
            bannerImgUrl: "https://sodarimg.syrup.co.kr/is/marketing/202307/17TXDUjo7V8e97f111de4f563eeecafa5e459c45eb.png",
            bannerTargetUrl: "https://www.naver.com",
            bannerSort: 1
        },
        {
          arNftBannerId: 576,
          bannerImgUrl: "https://sodarimg.syrup.co.kr/is/marketing/202308/17TYXF1a4L7702c0ddb3beebbaa456a81c12287d8f.png",
          bannerTargetUrl: "https://www.naver.com",
          bannerSort: 2
      }, {
        arNftBannerId: 576,
        bannerImgUrl: "https://sodarimg.syrup.co.kr/is/marketing/202308/17TYXF1a4L7702c0ddb3beebbaa456a81c12287d8f.png",
        bannerTargetUrl: "https://www.naver.com",
        bannerSort: 3
    }
    ],

   
      deviceGpsList: [
        {
          deviceGpsId: "0", //인덱스 번호
          sort: "0", //순서
          deviceName:"디바이스1", //디바이스명
          gpsName: "위치1", //위치명
          thirdPartyType:"SELPIC", // 업체종류(셀픽,...) 셀픽: SELPIC
          deviceGpsLatitude: "37.4027214", //위도
          deviceGpsLongitude: "127.456748456", //경도
        },
        {
          deviceGpsId: "1", //인덱스 번호
          sort: "1", //순서
          deviceName:"디바이스2", //디바이스명
          gpsName: "위치2", //위치명
          thirdPartyType:"SELPIC", // 업체종류(셀픽,...) 셀픽: SELPIC
          deviceGpsLatitude: "37.4027054", //위도
          deviceGpsLongitude: "127.1033341", //경도
        }
      ],
    },
    offsetActionObjectFrame: {
    eventId: "dnd222", // 이벤트ID
    eventTitle: "test", // 이벤트명
    eventLogicalType: "PHOTO_BASIC", // 기본형 : BASIC, 브릿지형 : BRIDGE, 미션클리어형 : MISSION, 이미지스캐닝형 : SCANNING, 드래그드롭형:DRAG_DROP
    arBgImage: "", // AR 백그라운드 이미지 URL
    arSkinImage: "https://dt-static.syrup.co.kr/webar/images/EVENT_554813.png", // AR 스킨 이미지 URL
    
    loadingImgYn: "N", // 로딩 이미지 설정여부 	String	설정안함 : N / 설정함 : Y
    loadingImgUrl: "https://playardev.syrup.co.kr/sodarimg/is/marketing/202308/17TYXHq7Gz77789cbd499ec888b9e6e0b2a0ab613f.png", // 로딩 이미지 url	String

      arObjectInfo: [
        {
          arEventObjectId: "1", // 인덱스 번호
          objectSettingType: "3D", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectSettingUrl: "https://dt-static.syrup.co.kr/3d/shiba/scene.gltf", // 리소스 url 값
          objectSizeX: "0.5", // 오브젝트 크기
          objectSizeY: "0.5", // 오브젝트 크기
          objectSizeZ: "0.5", // 오브젝트 크기
          objectPositionX: "0", // 좌표값 (-2.0 ~ 2.0)
          objectPositionY: "0.7", // 좌표값 (-2.0 ~ 2.0)
          objectPositionZ: "-2", // 좌표값 (-2.0 ~ 2.0)
          stayEffectType: "ROTATION", // NONE : NONE, Rotation : ROTATION, Heartbeat : HEARTBEAT
          clickEventType: "FADEOUT", // NONE : NONE, Fade-out : FADEOUT, Object change : OBJCHANGE
          videoPlayRepeatType: "", // 반복함 : Y, 반복안함 : N
          catchSoundType: "URL", // 선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          catchSoundFile: "https://dt-static.syrup.co.kr/webar/mp3/touch_effect_sound_5.mp3", // 리소스 값
          objectChangeSettingType: "", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectChangeSettingUrl: "", // 리소스 url 값
          objectChangeSizeX: "", // 체인지 오브젝트 크기
          objectChangeSizeY: "", // 체인지 오브젝트 크기
          objectChangeSizeZ: "", // 체인지 오브젝트 크기
          missionInactiveThumbnailUrl: "", // 리소스 url 값
          missionActiveThumbnailUrl: "", // 리소스 url 값
          bridgeForceExposureTimeType: "N",
          bridgeForceExposureTimeSecond: 0,
          bridgeType: "", // 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
          bridgeUrl: "", // 리소스 url 값
          bridgeExposureTimeSecond: "", // 숫자 값
          bridgeDisplayDirectionType: "", // 가로 : WIDTH, 세로 : HEIGHT
          bridgeObjectSizeX: "",
          bridgeObjectSizeY: "",
          bridgeObjectSizeZ: "",
        },
        {
          arEventObjectId: "2", // 인덱스 번호
          objectSettingType: "3D", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectSettingUrl: "https://dt-static.syrup.co.kr/webar/gltf/mei/scene.gltf", // 리소스 url 값
          objectSizeX: "0.005", // 오브젝트 크기
          objectSizeY: "0.005", // 오브젝트 크기
          objectSizeZ: "0.005", // 오브젝트 크기
          objectPositionX: "0", // 좌표값 (-2.0 ~ 2.0)
          objectPositionY: "0.2", // 좌표값 (-2.0 ~ 2.0)
          objectPositionZ: "-2", // 좌표값 (-2.0 ~ 2.0)
          stayEffectType: "ROTATION", // NONE : NONE, Rotation : ROTATION, Heartbeat : HEARTBEAT
          clickEventType: "FADEOUT", // NONE : NONE, Fade-out : FADEOUT, Object change : OBJCHANGE
          videoPlayRepeatType: "", // 반복함 : Y, 반복안함 : N
          catchSoundType: "URL", // 선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          catchSoundFile: "https://dt-static.syrup.co.kr/webar/mp3/touch_effect_sound_5.mp3", // 리소스 값
          objectChangeSettingType: "", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectChangeSettingUrl: "", // 리소스 url 값
          objectChangeSizeX: "", // 체인지 오브젝트 크기
          objectChangeSizeY: "", // 체인지 오브젝트 크기
          objectChangeSizeZ: "", // 체인지 오브젝트 크기
          missionInactiveThumbnailUrl: "", // 리소스 url 값
          missionActiveThumbnailUrl: "", // 리소스 url 값
          bridgeForceExposureTimeType: "N",
          bridgeForceExposureTimeSecond: 0,
          bridgeType: "", // 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
          bridgeUrl: "", // 리소스 url 값
          bridgeExposureTimeSecond: "", // 숫자 값
          bridgeDisplayDirectionType: "", // 가로 : WIDTH, 세로 : HEIGHT
          bridgeObjectSizeX: "",
          bridgeObjectSizeY: "",
          bridgeObjectSizeZ: "",
        },
        {
          arEventObjectId: "3", // 인덱스 번호
          objectSettingType: "3D", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectSettingUrl: "https://dt-static.syrup.co.kr/webar/gltf/pony_cartoon/scene.gltf", // 리소스 url 값
          objectSizeX: "0.4", // 오브젝트 크기
          objectSizeY: "0.4", // 오브젝트 크기
          objectSizeZ: "0.4", // 오브젝트 크기
          objectPositionX: "0", // 좌표값 (-2.0 ~ 2.0)
          objectPositionY: "0.4", // 좌표값 (-2.0 ~ 2.0)
          objectPositionZ: "-2", // 좌표값 (-2.0 ~ 2.0)
          stayEffectType: "NONE", // NONE : NONE, Rotation : ROTATION, Heartbeat : HEARTBEAT
          clickEventType: "FADEOUT", // NONE : NONE, Fade-out : FADEOUT, Object change : OBJCHANGE
          videoPlayRepeatType: "", // 반복함 : Y, 반복안함 : N
          catchSoundType: "URL", // 선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          catchSoundFile: "https://dt-static.syrup.co.kr/webar/mp3/touch_effect_sound_3.mp3", // 리소스 값
          objectChangeSettingType: "", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectChangeSettingUrl: "", // 리소스 url 값
          objectChangeSizeX: "", // 체인지 오브젝트 크기
          objectChangeSizeY: "", // 체인지 오브젝트 크기
          objectChangeSizeZ: "", // 체인지 오브젝트 크기
          missionInactiveThumbnailUrl: "", // 리소스 url 값
          missionActiveThumbnailUrl: "", // 리소스 url 값
          bridgeForceExposureTimeType: "Y",
          bridgeForceExposureTimeSecond: 3,
          bridgeType: "VIDEO", // 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
          bridgeUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", // 리소스 url 값
          bridgeExposureTimeSecond: "", // 숫자 값
          bridgeDisplayDirectionType: "HEIGHT", // 가로 : WIDTH, 세로 : HEIGHT
          bridgeObjectSizeX: 0.05,
          bridgeObjectSizeY: 0.05,
          bridgeObjectSizeZ: 0.05,
          bridgeForce: true,
          bridgeForceTimeSecond: 10,
        },
        {
          arEventObjectId: "4", // *인덱스 번호
          objectSettingType: "CUBE", // *IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectSettingUrl: "https://dt-static.syrup.co.kr/webar/images/object_sphere_img.png", // *리소스 url 값
          objectSizeX: "0.4", // *오브젝트 크기
          objectSizeY: "0.2", // *오브젝트 크기
          objectSizeZ: "0.4", // *오브젝트 크기
          objectPositionX: "0", // *좌표값 (-2.0 ~ 2.0)
          objectPositionY: "1.2", // *좌표값 (-2.0 ~ 2.0)
          objectPositionZ: "-1.7", // *좌표값 (-2.0 ~ 2.0)
          stayEffectType: "ROTATION", // *NONE : NONE, Rotation : ROTATION, Heartbeat : HEARTBEAT
          clickEventType: "OBJCHANGE", // *NONE : NONE, Fade-out : FADEOUT, Object change : OBJCHANGE
          videoPlayRepeatType: "Y", // *반복함 : Y, 반복안함 : N
          catchSoundType: "URL", // *선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          catchSoundFile: "https://dt-static.syrup.co.kr/webar/mp3/touch_effect_sound_1.mp3", // *리소스 값
          objectChangeSettingType: "VIDEO", // *IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectChangeSettingUrl: "https://dt-static.syrup.co.kr/webar/mp4/ForBiggerFun.mp4", // *리소스 url 값
          objectChangeSizeX: "", // *체인지 오브젝트 크기
          objectChangeSizeY: "", // *체인지 오브젝트 크기
          objectChangeSizeZ: "", // *체인지 오브젝트 크기
          missionInactiveThumbnailUrl: "", // *스템프: 리소스 url 값
          missionActiveThumbnailUrl: "", // *스탬프: 리소스 url 값
          bridgeForceExposureTimeType: "N",
          bridgeForceExposureTimeSecond: 0,
          bridgeType: "", // *브릿지 : 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
          bridgeUrl: "", // *브릿지 : 리소스 url 값
          bridgeExposureTimeSecond: "", // *playtime 숫자 값
          bridgeDisplayDirectionType: "", // 가로 : WIDTH, 세로 : HEIGHT
          bridgeObjectSizeX: "",
          bridgeObjectSizeY: "",
          bridgeObjectSizeZ: "",
        },
      ],
      arEventLogicalInfo: {
        arEventLogicalId: "", //인덱스 번호
        panPositionType: "", //상단 : TOP, 하단 : BOTTOM, 좌측 : LEFT, 우측 : RIGHT
        panMissionNumber: "", // 숫자 값
        bridgeForceExposureTimeType: "N",
        bridgeForceExposureTimeSecond: 0,
        bridgeType: "", // 이미지 : IMAGE, GIF : GIF, VIDEO : VIDEO, 선택안함 : NONE
        bridgeUrl: "", //	리소스 url 값
        bridgeExposureTimeType: "", // 설정함 : Y, 설정안함 : N
        bridgeExposureTimeSecond: "", // 숫자 값
        bridgeDisplayDirectionType: "", // 가로 : WIDTH, 세로 : HEIGHT
        nftWalletImgUrl: "https://dt-static.syrup.co.kr/webar/images/object_img_3.png", //DnD 타겟 Image Url( ex. 지갑이미지)
        nftWalletPositionX: "0.0", //DnD 타겟 3D 좌표 X
        nftWalletPositionY: "-0.5", //DnD 타겟 3D 좌표 Y
        nftWalletPositionZ: "-1.0", //DnD 타겟 3D 좌표 Z
        nftWalletSizeX: "0.2", //DnD 타겟 3D width
        nftWalletSizeY: "0.2", //DnD 타겟 3D height
      },
      arScanningImageInfo: [
        {
          sortNumber: "", //	순서 숫자 값
          scanningImageUrl: "", //	리소스 url 값
          scanningSoundType: "", //	선택암함 : N, URL입력 : URL, Library선택 : LIBRARY
          scanningSoundFile: "", //	파일 값
          activeThumbnailUrl: "", //	리소스 url 값
          inactiveThumbnailUrl: "", //	리소스 url 값
        },
      ],
      photoLogicalInfo: {
        tutorialYn: "Y",                   //  튜토리얼 사용 설정	String	설정안함 : N / 설정함 : Y
        photoRatioSettingType:"BASIC",         //  AR 포토 비율 설정 	String	기본비율 : BASIC / 확장비율 : EXTENSION
        arFrameSettingYn: "Y",             //  AR 프레임 설정 여부 	String	설정안함 : N / 설정함 : Y
        photoTabMenuAddSettingYn: "Y",     //  탭메뉴 추가설정 	String	설정안함 : N / 설정함 : Y
        tabMenuTitle: "양양서피비치",                 //	탭메뉴 제목	String	
        arFilterSettingYn: "Y",            //	AR 필터 설정 	String	설정안함 : N / 설정함 : Y
        arCharacterSettingYn: "Y",         //	AR 캐릭터 설정 	String	설정안함 : N / 설정함 : Y
        arStickerSettingYn: "Y",           //	스티커 설정 	String	설정안함 : N / 설정함 : Y
        filmResultImgUrl: "https://playardev.syrup.co.kr/sodarimg/is/marketing/202307/17TXPZUMWG7670fd3ecc43bb78a9aacbba1eecd253.png",             //	촬영 결과 이미지 url	String	
        hashTagSettingYn: "Y",	            //  해시태그 설정 여부 	String	설정안함 : N / 설정함 : Y
        hashTagValue: [
          "AR포토개발",
          "모두화이팅",
          "AR포토개발",
          "모두화이팅",
      ],                // 	해시태그 값 	String	콤마 , 로 구분자
        shareAgreePopupSettingYn: "Y",	    // 	공유하기 동의팝업 설정여부 	String	설정안함 : N / 설정함 : Y
        agreePopupText: "안녕하세요. Play AR입니다.\\n인스타 이벤트 참여를 위해서는\\n개인정보사용 동의가 필요합니다.",	  // 	동의 팝업 문구	String	
        agreePopupDetailLinkUrl: "https://www.naver.com/",	    // 	자세히 보기 링크 url	String	
        agreePopupInputText: "  인스타ID를 입력해주세요",	        // 	동의 입력창 기본 문구	String	
        photoPrintSettingYn: "Y",	        // 	사진 출력 설정 여부 	String	설정안함 : N / 설정함 : Y
        photoPrintButtonText: "사진 출력하기",	        // 	사진 출력 버튼명	String	
        photoGiveAwaySettingYn: "Y",	      // 	경품 당첨 설정 여부 	String	설정안함 : N / 설정함 : Y
        photoGiveAwayButtonText: "경품 추첨하기",	    // 	경품 당첨 버튼명	String	
        filmResultFooterImgSettingYn: "Y",	// 	결과 하단 이미지 설정 여부 	String	설정안함 : N / 설정함 : Y
        filmResultFooterImgUrl: "https://sodarimg.syrup.co.kr/is/marketing/202307/17TXDU5LkV7fe41e322ad0d2ec7d5537c4590a167.png  ",	      // 	하단 이미지 url	String	하단 이미지 url
      },
      photoContentsInfo: {
        frameContentsInfo: [
            {
                id: 932,
                sort: 1,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "CC_Skin (1)",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/frame/Thumbnail/Thumbnail_CC_Skin (1).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/frame/origin/CC_Skin (1).png",
                photoContentTabMenuType: "FRAME"
            },
            {
                id: 933,
                sort: 2,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "CC_Skin (2)",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/frame/Thumbnail/Thumbnail_CC_Skin (2).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/frame/origin/CC_Skin (2).png",
                photoContentTabMenuType: "FRAME"
            },
            {
                id: 934,
                sort: 3,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "CC_Skin (4)",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/frame/Thumbnail/Thumbnail_CC_Skin (4).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/frame/origin/CC_Skin (4).png",
                photoContentTabMenuType: "FRAME"
            },
            {
                id: 935,
                sort: 4,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "CC_Skin (5)",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/frame/Thumbnail/Thumbnail_CC_Skin (5).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/frame/origin/CC_Skin (5).png",
                photoContentTabMenuType: "FRAME"
            },
            {
                id: 936,
                sort: 5,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "CC_Skin (6)",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/frame/Thumbnail/Thumbnail_CC_Skin (6).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/frame/origin/CC_Skin (6).png",
                photoContentTabMenuType: "FRAME"
            },
            {
                id: 937,
                sort: 6,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "CC_Skin (7)",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/frame/Thumbnail/Thumbnail_CC_Skin (7).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/frame/origin/CC_Skin (7).png",
                photoContentTabMenuType: "FRAME"
            },
            {
                id: 938,
                sort: 7,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "CC_Skin (8)",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/frame/Thumbnail/Thumbnail_CC_Skin (8).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/frame/origin/CC_Skin (8).png",
                photoContentTabMenuType: "FRAME"
            },
            {
                id: 939,
                sort: 8,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "CC_Skin (3)",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/frame/Thumbnail/Thumbnail_CC_Skin (3).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/frame/origin/CC_Skin (3).png",
                photoContentTabMenuType: "FRAME"
            }
        ],
        "tabContentsInfo": [
            {
                id: 940,
                sort: 1,
                photoContentChoiceType: "DIRECT",
                photoThumbnailImgUrl: "https://playardev.syrup.co.kr/sodarimg/is/marketing/202308/17TYYCo4rX23cbd4e314c99f1630ce0f0cd0724c74.png",
                photoOriginalFileUrl: "https://playardev.syrup.co.kr/sodarimg/is/marketing/202308/17TYYCo6Ep7e0c12a65f6117f368c62d56eb6eed11.png",
                photoContentTabMenuType: "STICKER"
            },
            {
                id: 941,
                sort: 2,
                photoContentChoiceType: "DIRECT",
                photoThumbnailImgUrl: "https://playardev.syrup.co.kr/sodarimg/is/marketing/202308/17TYYCo97ze0a91a5a83d4f91dec523a92a9e200e4.png",
                photoOriginalFileUrl: "https://playardev.syrup.co.kr/sodarimg/is/marketing/202308/17TYYCoayKfb503cb335b7763f30082f0156997835.png",
                photoContentTabMenuType: "STICKER"
            },
            {
                id: 942,
                sort: 3,
                photoContentChoiceType: "DIRECT",
                photoThumbnailImgUrl: "https://playardev.syrup.co.kr/sodarimg/is/marketing/202308/17TYYComZf42f0837206fe6079e454b01b2353a454.png",
                photoOriginalFileUrl: "https://playardev.syrup.co.kr/sodarimg/is/marketing/202308/17TYYCooCmd200b0c00ba73406c54618cedc161fd1.png",
                photoContentTabMenuType: "STICKER"
            }
        ],
        "filterContentsInfo": [
            {
                id: 943,
                sort: 1,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "Glasses (1).json",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/filter/Glasses/Thumbnail_Glasses (1).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/filter/Glasses/Glasses (1).json",
                photoContentTabMenuType: "FILTER"
            },
            {
                id: 944,
                sort: 2,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "Glasses (2).json",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/filter/Glasses/Thumbnail_Glasses (2).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/filter/Glasses/Glasses (2).json",
                photoContentTabMenuType: "FILTER"
            },
            {
                id: 945,
                sort: 3,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "Glasses (3).json",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/filter/Glasses/Thumbnail_Glasses (3).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/filter/Glasses/Glasses (3).json",
                photoContentTabMenuType: "FILTER"
            },
            {
                id: 946,
                sort: 4,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "Hat (1).json",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/filter/Hat/Thumbnail_Hat (1).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/filter/Hat/Hat (1).json",
                photoContentTabMenuType: "FILTER"
            },
            {
                id: 947,
                sort: 5,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "Hat (2).json",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/filter/Hat/Thumbnail_Hat (2).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/filter/Hat/Hat (2).json",
                photoContentTabMenuType: "FILTER"
            },
            {
                id: 948,
                sort: 6,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "Hat (3).json",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/filter/Hat/Thumbnail_Hat (3).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/filter/Hat/Hat (3).json",
                photoContentTabMenuType: "FILTER"
            },
            {
                id: 949,
                sort: 7,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "Hat (5).json",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/filter/Hat/Thumbnail_Hat (5).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/filter/Hat/Hat (5).json",
                photoContentTabMenuType: "FILTER"
            },
            {
                id: 950,
                sort: 8,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "Hat (6).json",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/filter/Hat/Thumbnail_Hat (6).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/filter/Hat/Hat (6).json",
                photoContentTabMenuType: "FILTER"
            },
            {
                id: 951,
                sort: 9,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "Hat (7).json",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/filter/Hat/Thumbnail_Hat (7).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/filter/Hat/Hat (7).json",
                photoContentTabMenuType: "FILTER"
            },
            {
                id: 952,
                sort: 10,
                photoContentChoiceType: "DIRECT",
                photoThumbnailImgUrl: "https://playardev.syrup.co.kr/sodarimg/is/marketing/202308/17TYYCp*Pp9846e4091ad117658050cc3b323766ed.png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/filter/snow/snow.json",
                photoContentTabMenuType: "FILTER"
            },
            {
                id: 953,
                sort: 11,
                photoContentChoiceType: "DIRECT",
                photoThumbnailImgUrl: "https://playardev.syrup.co.kr/sodarimg/is/marketing/202308/17TYYCq2Hrf54f33492a74f29a86e1fea1a4d91a35.png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/filter/star/star.json",
                photoContentTabMenuType: "FILTER"
            }
        ],
        "characterContentsInfo": [
            {
                id: 954,
                sort: 1,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "Thumbnail_character(1).png",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/character/Thumbnail/Thumbnail_character(1).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/character/origin/character(1).gltf",
                photoContentTabMenuType: "CHARACTER"
            },
            {
                id: 955,
                sort: 2,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "Thumbnail_character(2).png",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/character/Thumbnail/Thumbnail_character(2).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/character/origin/character(2).gltf",
                photoContentTabMenuType: "CHARACTER"
            }
        ],
        "stickerContentsInfo": [
            {
                id: 956,
                sort: 1,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "sticker (1).png",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/sticker/Thumbnail/Thumbnail_sticker (1).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/sticker/origin/sticker (1).png",
                photoContentTabMenuType: "STICKER"
            },
            {
                id: 957,
                sort: 2,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "sticker (2).png",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/sticker/Thumbnail/Thumbnail_sticker (2).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/sticker/origin/sticker (2).png",
                photoContentTabMenuType: "STICKER"
            },
            {
                id: 958,
                sort: 3,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "sticker (3).png",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/sticker/Thumbnail/Thumbnail_sticker (3).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/sticker/origin/sticker (3).png",
                photoContentTabMenuType: "STICKER"
            },
            {
                id: 959,
                sort: 4,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "sticker (4).png",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/sticker/Thumbnail/Thumbnail_sticker (4).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/sticker/origin/sticker (4).png",
                photoContentTabMenuType: "STICKER"
            },
            {
                id: 960,
                sort: 5,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "sticker (5).png",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/sticker/Thumbnail/Thumbnail_sticker (5).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/sticker/origin/sticker (5).png",
                photoContentTabMenuType: "STICKER"
            },
            {
                id: 961,
                sort: 6,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "sticker (6).png",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/sticker/Thumbnail/Thumbnail_sticker (6).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/sticker/origin/sticker (6).png",
                photoContentTabMenuType: "STICKER"
            },
            {
                id: 962,
                sort: 7,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "sticker (7).png",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/sticker/Thumbnail/Thumbnail_sticker (7).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/sticker/origin/sticker (7).png",
                photoContentTabMenuType: "STICKER"
            },
            {
                id: 963,
                sort: 8,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "sticker (8).png",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/sticker/Thumbnail/Thumbnail_sticker (8).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/sticker/origin/sticker (8).png",
                photoContentTabMenuType: "STICKER"
            },
            {
                id: 964,
                sort: 9,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "sticker (9).png",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/sticker/Thumbnail/Thumbnail_sticker (9).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/sticker/origin/sticker (9).png",
                photoContentTabMenuType: "STICKER"
            },
            {
                id: 965,
                sort: 10,
                photoContentChoiceType: "LIBRARY",
                photoFileName: "sticker (10).png",
                photoThumbnailImgUrl: "https://dt-static.syrup.co.kr/sodar/sticker/Thumbnail/Thumbnail_sticker (10).png",
                photoOriginalFileUrl: "https://dt-static.syrup.co.kr/sodar/sticker/origin/sticker (10).png",
                photoContentTabMenuType: "STICKER"
            }
        ]
    },
    },
    actionObjectBasic: null,
    actionObjectMission: null,
    actionObjectBridge: null,
    imageScanningMission: null,
    resultData: null,
    actionObjectDragNDrop: null,
    actionObjectFrame : null,
    photoBoxData: null,
    storageNames: [
      "skWebArActionObjectBasic",
      "skWebArActionObjectMission",
      "skWebArActionObjectBridge",
      "skWebArImageScanningMission",
      "skWebArResultData",
      "skWebArActionObjectDragNDrop",
      "skWebArActionObjectFrame",
      "skWebArPhotoBoxData",
    ],
  }),
  mutations: {
    ["SET_EVENT_DATA"](state, payload) {
      state.eventData = payload;
    },
    ["SET_ACTION_OBJECT_BASIC"](state, payload) {
      state.actionObjectBasic = payload;
    },
    ["SET_ACTION_OBJECT_MISSION"](state, payload) {
      state.actionObjectMission = payload;
    },
    ["SET_ACTION_OBJECT_BRIDGE"](state, payload) {
      state.actionObjectBridge = payload;
    },
    // add drag and drop
    ["SET_ACTION_OBJECT_DRAGNDROP"](state, payload) {
      state.actionObjectDragNDrop = payload;
    },
    ["SET_ACTION_OBJECT_FRAME"](state, payload) {
      state.actionObjectFrame = payload;
    },
    //
    ["SET_IMAGE_SCANNING_MISSION"](state, payload) {
      state.imageScanningMission = payload;
    },
    ["SET_RESULT_DATA"](state, payload) {
      state.resultData = payload;
    },
    ["SET_PHOTO_BOX_DATA"](state, payload) {
      state.photoBoxData = payload;
    }
  },
  getters: {
    eventData(state) {
      return state.eventData;
    },
    actionObjectBasic(state) {
      return state.actionObjectBasic;
    },
    actionObjectMission(state) {
      return state.actionObjectMission;
    },
    actionObjectBridge(state) {
      return state.actionObjectBridge;
    },
    imageScanningMission(state) {
      return state.imageScanningMission;
    },
    storageNames(state) {
      return state.storageNames;
    },
    resultData(state) {
      return state.resultData;
    },
    // add drag and drop
    actionObjectDragNDrop(state) {
      return state.actionObjectDragNDrop;
    },
    actionObjectFrame(state) {
      return state.actionObjectFrame;
    },
    photoBoxData(state) {
      return state.photoBoxData;
    }
  },
  actions: {
    resetAllData({ dispatch }) {
      dispatch("resetActionObjectBasic");
      dispatch("resetActionObjectMission");
      dispatch("resetActionObjectBridge");
      dispatch("resetImageScanningMission");
      dispatch("resetImageScanningMission");
      dispatch("resetImageResultData");
      dispatch("resetActionObjectDragNDrop");
      dispatch("resetActionObjectFrame");
      dispatch("resetPhotoBoxData");
    },
    resetActionObjectBasic({ state, commit }) {
      commit("SET_ACTION_OBJECT_BASIC", _.cloneDeep(state.offsetActionObjectBasic));
    },
    resetActionObjectMission({ state, commit }) {
      commit("SET_ACTION_OBJECT_MISSION", _.cloneDeep(state.offsetActionObjectMission));
    },
    resetActionObjectBridge({ state, commit }) {
      commit("SET_ACTION_OBJECT_BRIDGE", _.cloneDeep(state.offsetActionObjectBridge));
    },
    resetImageScanningMission({ state, commit }) {
      commit("SET_IMAGE_SCANNING_MISSION", _.cloneDeep(state.offsetImageScanningMission));
    },
    resetImageResultData({ state, commit }) {
      commit("SET_RESULT_DATA", _.cloneDeep(state.offsetResultData));
    },
    resetActionObjectDragNDrop({ state, commit }) {
      commit("SET_ACTION_OBJECT_DRAGNDROP", _.cloneDeep(state.offsetActionObjectDragNDrop));
    },
    resetActionObjectFrame({ state, commit }) {
      commit("SET_ACTION_OBJECT_FRAME", _.cloneDeep(state.offsetActionObjectFrame));
    },
    resetPhotoBoxData({ state, commit }) {
      commit("SET_PHOTO_BOX_DATA", _.cloneDeep(state.offsetPhotoBoxData));
    },

    setActionObjectBasic({ state, commit }) {
      const storeData = localStorage.getItem(state.storageNames[0]);
      const data = storeData && storeData !== "" ? JSON.parse(storeData) : _.cloneDeep(state.offsetActionObjectBasic);
      commit("eventData/SET_EVENT_DATA", data, { root: true });
    },
    setActionObjectMission({ state, commit }) {
      const storeData = localStorage.getItem(state.storageNames[1]);
      const data = storeData && storeData !== "" ? JSON.parse(storeData) : _.cloneDeep(state.offsetActionObjectMission);
      commit("eventData/SET_EVENT_DATA", data, { root: true });
    },
    setActionObjectBridge({ state, commit }) {
      const storeData = localStorage.getItem(state.storageNames[2]);
      const data = storeData && storeData !== "" ? JSON.parse(storeData) : _.cloneDeep(state.offsetActionObjectBridge);
      commit("eventData/SET_EVENT_DATA", data, { root: true });
    },
    setImageScanningMission({ state, commit }) {
      const storeData = localStorage.getItem(state.storageNames[3]);
      const data = storeData && storeData !== "" ? JSON.parse(storeData) : _.cloneDeep(state.offsetImageScanningMission);
      commit("eventData/SET_EVENT_DATA", data, { root: true });
    },
    setImageResultData({ state, commit }) {
      const storeData = localStorage.getItem(state.storageNames[4]);
      const data = storeData && storeData !== "" ? JSON.parse(storeData) : _.cloneDeep(state.offsetResultData);
      commit("eventData/SET_EVENT_RESULT", data, { root: true });
    },
    //add drag and drop
    setActionObjectDragNDrop({ state, commit }) {
      const storeData = localStorage.getItem(state.storageNames[5]);
      //수정필요
      const data = storeData && storeData !== "" ? JSON.parse(storeData) : _.cloneDeep(state.offsetActionObjectDragNDrop);
      commit("eventData/SET_EVENT_DATA", data, { root: true });
    },
    setActionObjectFrame({ state, commit }) {
      const storeData = localStorage.getItem(state.storageNames[6]);
      const data = storeData && storeData !== "" ? JSON.parse(storeData) : _.cloneDeep(state.offsetActionObjectFrame);
      commit("eventData/SET_EVENT_DATA", data, { root: true });
    },
    setPhotoBoxData({ state, commit }) {
      const storeData = localStorage.getItem(state.storageNames[7]);
      const data = storeData && storeData !== "" ? JSON.parse(storeData) : _.cloneDeep(state.offsetPhotoBoxData);
      commit("eventData/SET_PHOTO_BOX_DATA", data, { root: true });
    },
  }
};

