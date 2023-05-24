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
      winningInfo: {
        arEventWinningId: "0",
        winningType: "NFT", // 기타(배송) : ETC, 기프티콘 : GIFTICON, 꽝 : FAIL, NFT: NFT
        winningImageUrl: "https://dt-static.syrup.co.kr/webar/images/event_result.jpeg", // 당첨 이미지url : 이미지 리소스 uri
        autoWinningYn: "N",
      },
      winningButtonInfo: [
        {
          buttonActionType: "SUBSCRIPTION", // 버튼유형 : 경품배송입력 : DELIVERY, 계속하기(닫기) : CLOSE, URL접속 : URL, 응모정보입력: SUBSCRIPTION
          buttonText: "응모정보입력", // 버튼 문구
          linkUrl: "",
        },
        {
          buttonActionType: "URL",
          buttonText: "링크",
          linkUrl: "https://www.11st.co.kr/",
        },
        {
          buttonActionType: "CLOSE",
          buttonText: "닫기",
          linkUrl: "",
        },
      ],
    },
    offsetActionObjectFrame: {
      eventId: "dnd111", // 이벤트ID
      eventTitle: "test", // 이벤트명
      eventLogicalType: "Frame", // 기본형 : BASIC, 브릿지형 : BRIDGE, 미션클리어형 : MISSION, 이미지스캐닝형 : SCANNING, 드래그드롭형:DRAG_DROP
      arBgImage: "", // AR 백그라운드 이미지 URL
      arSkinImage: "https://dt-static.syrup.co.kr/webar/images/EVENT_554813.png", // AR 스킨 이미지 URL
      arObjectInfo: [
        {
          arEventObjectId: "1", // 인덱스 번호
          objectSettingType: "3D", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          // "objectSettingUrl": "https://dt-static.syrup.co.kr/webar/gltf/mei/scene.gltf", // 리소스 url 값
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
          arEventObjectId: "4", // 인덱스 번호
          objectSettingType: "3D", // IMAGE(2D) : IMAGE, GIF(2D) : GIF, VIDEO(2D) : VIDEO, CUBE(3D) : CUBE, CYLINDER(3D) : CYLINDER, SPHERE(3D) : SPHERE, 3D: 3D
          objectSettingUrl: "https://dt-static.syrup.co.kr/webar/gltf/viernes/scene.gltf", // 리소스 url 값
          objectSizeX: "0.015", // 오브젝트 크기
          objectSizeY: "0.015", // 오브젝트 크기
          objectSizeZ: "0.015", // 오브젝트 크기
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
    actionObjectBasic: null,
    actionObjectMission: null,
    actionObjectBridge: null,
    imageScanningMission: null,
    resultData: null,
    // add drag and drop
    actionObjectDragNDrop: null,
    actionObjectFrame : null,
    storageNames: [
      "skWebArActionObjectBasic",
      "skWebArActionObjectMission",
      "skWebArActionObjectBridge",
      "skWebArImageScanningMission",
      "skWebArResultData",
      // add drag and drop
      "skWebArActionObjectDragNDrop",
      "skWebArActionObjectFrame",
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
      // add drag and drop
      dispatch("resetActionObjectDragNDrop");
      dispatch("resetActionObjectFrame");
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
    //add drag and drop
    resetActionObjectDragNDrop({ state, commit }) {
      commit("SET_ACTION_OBJECT_DRAGNDROP", _.cloneDeep(state.offsetActionObjectDragNDrop));
    },
    resetActionObjectFrame({ state, commit }) {
      commit("SET_ACTION_OBJECT_FRAME", _.cloneDeep(state.offsetActionObjectFrame));
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
  },
};
