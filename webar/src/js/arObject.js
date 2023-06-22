/**
 * 개별 객체의 타입값을 받아서 3d객체의 타입 반환
 * @param type
 * @returns {string}
 */


export const getObjectType = (type) => {
  const TYPES = ['SPHERE', 'CUBE', 'CYLINDER', 'IMAGE', 'GIF', 'VIDEO', '3D'];
  return TYPES[type];
}

/**
 * stayEffectType 값을 받아서 스테이오브젝트 애니메이션 타입 반환
 * @param type
 * @returns {string}
 */
export const getStayEffectType = (type) => {
  const TYPES = ['NONE', 'ROTATE', 'HEARTBEAT', 'FADEOUT'];
  return TYPES[type];
}

/**
 * touchEffectType 값을 받아서 터치오브젝트 애니메이션 타입 반환
 * @param type
 * @returns {string}
 */
export const getTouchEffectType = (type) => {
  const TYPES = ['NONE', 'FADEOUT', 'OBJCHANGE', 'GLTFFADEOUT'];
  return TYPES[type];
}

/**
 * stamp 방향 타입 반환
 * @param type
 * @returns {string}
 */
export const getStampPanelDirection = (type) => {
  const TYPES = ['BOTTOM', 'RIGHT', 'LEFT', 'TOP'];
  return TYPES[type];
}

/**
 * 브릿지 타입 반환
 * @param type
 * @returns {string}
 */
export const getBridgeType = (type) => {
  const TYPES = ['IMAGE', 'GIF', 'VIDEO'];
  return TYPES[type];
}

/**
 * 브릿지 방향 타입 반환
 * @param type
 * @returns {string}
 */
export const getBridgeOrientationType = (type) => {
  const TYPES = ['LANDSCAPE', 'PORTRAIT'];
  return TYPES[type];
}

/**
 * 결과 팝업 타입 반환
 * @param type
 * @returns {string}
 */
export const getCompleteModalType = (type) => {
  const TYPES = ['FULL', 'LAYER'];
  return TYPES[type];
}

/**
 * 타입을 받아서 animation string을 반환
 * @param type
 * @returns {string|null}
 */
export const getAnimation = (type, sizeProps) => {
  let size = {x:1,y:1,z:1}
  if(sizeProps) {
    size = {...sizeProps}
  }

  const {x,y,z} = size
  
  if (!type) return '';
  if (type === 'ROTATION') {
    return 'property: rotation; to: 0 360 0; easing:linear; loop: true; dur: 3000';
  } else if (type === 'HEARTBEAT') {
    return `property: scale; easing: easeInCubic; dir:alternate; loop: true; dur: 550; from: ${x*0.8} ${y*0.8} ${z*0.8}; to: ${x} ${y} ${z}`;
  } else if (type === 'FADEOUT') {
    return 'property: components.material.material.opacity; loop: false; dur:1000; from: 1; to: 0';
  } else if (type === 'GLTFFADEOUT') {
    return 'property: model-opacity; dur:1000; from: 1; to: 0; loop: false;'
  }
  return '';
}

/**
 * 타입을 받아서 스테이 animation string 반환
 * @param type
 * @returns {string|null}
 */
const getStayAnimation = (type) => {
  return getAnimation(type);
}

/**
 * 타입을 받아서 터치효과 animation string 반환
 * @param type
 * @returns {string|null}
 */
export const getTouchAnimation = (type) => {
  return getAnimation(type);
}

/**
 * min ~ max사이의 난수 반환 (소수점 2자리)
 * @param min
 * @param max
 * @returns {string|*|string}
 */
function getRandomArbitrary(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

/**
 * num이 있으면 num을 반환 아니면 min, max사이의 난수 발생 (소수점 2자리)
 * @param num
 * @param min
 * @param max
 * @returns {*|string}
 */
function getRandomPosition(num, min = -2, max = 2) {
  return !isNaN(parseFloat(num)) ? num : getRandomArbitrary(min, max);
}


/**
 * 개별적인 X,Y,Z를 취합해서 position string 생성
 * @param positionX
 * @param positionY
 * @param positionZ
 * @returns {string}
 */
function getPosition({positionX, positionY, positionZ}) {
  return `${getRandomPosition(positionX, -2, 2)} ${getRandomPosition(positionY, -1, 1)} ${getRandomPosition(positionZ, -2, 2)}`;
}

/**
 * 개별적인 X,Y,Z를 취합해서 scale string생성
 * @param sizeX
 * @param sizeY
 * @param sizeZ
 * @returns {string}
 */
function getScale({sizeX, sizeY, sizeZ}) {
  return `${sizeX ? sizeX : 0.05} ${sizeY ? sizeY : 0.05} ${sizeZ ? sizeZ : 0.05}`;
}

/**
 * 개별적인 X,Y,Z를 취합해서 rotation string생성
 * @param rotationX
 * @param rotationY
 * @param rotationZ
 * @returns {string}
 */
function getRotation({rotationX, rotationY, rotationZ}) {
  return `${rotationX ? rotationX : 0} ${rotationY ? rotationY : 0} ${rotationZ ? rotationZ : 0}`;
}

/**
 * 타입별 객체 html element 속성 데이터 생성
 * @param data
 * @returns {Object}
 */
export const getObjectAttrs = (data) => {

  const {type} = data;
  /**
   * shpere 타입
   * 크기가 raduis임으로 sizeX만을 사용한다.
   * */
  if (type === 'SPHERE') {
    const radius = data.sizeX ? data.sizeX : 0.2;
    return {
      color: '#fff',
      roughness: '0.2',
      radius,
      src: `#${data.objectType}_${data.itemID}`,
      rotation: getRotation(data),
      position: getPosition(data),
      animation: getStayAnimation(data.stayEffectType, {x:radius, y:radius, z:radius}),
      transparent: true,
    }
  }

  /**
   * cube(box) 타입
   * */
  if (type === 'CUBE') {
    const width = data.sizeX ? data.sizeX : 0.2;
    const height = data.sizeY ? data.sizeY : 0.2;
    return {
      color: '#fff',
      width,
      height,
      src: `#${data.objectType}_${data.itemID}`,
      rotation: getRotation(data),
      position: getPosition(data),
      animation: getStayAnimation(data.stayEffectType, {x: width, y:height, z:1}),
      transparent: true,
      geometry: 'depth: 0.2;',
    }
  }

  /**
   * cylinder 타입
   * sizeX는 raduis에 대입
   * sizeY는 height에 대입
   */
  if (type === 'CYLINDER') {
    const radius=  data.sizeX ? data.sizeX : 0.2;
    const height = data.sizeY ? data.sizeY : 0.4;
    return {
      color: '#fff',
      radius,
      height,
      src: `#${data.objectType}_${data.itemID}`,
      rotation: getRotation(data),
      position: getPosition(data),
      animation: getStayAnimation(data.stayEffectType, {x: radius, y: height, z:1}),
      transparent: true,
    }
  }

  /**
   * image 타입
   */
  if (type === 'IMAGE') {
    const width = data.sizeX ? data.sizeX : 0.3;
    const height = data.sizeY ? data.sizeY : 0.3;
    return {
      width,
      height,
      src: `#${data.objectType}_${data.itemID}`,
      rotation: getRotation(data),
      position: getPosition(data),
      animation: getStayAnimation(data.stayEffectType, {x:width, y:height, z:1}),
      ['look-at']: '[gps-camera]',
      opacity: 1,
      transparent: true,
    }
  }

  /**
   * gif 타입
   * gif파일을 재생하기 위하여 geometry에 plane을 설정하고 사이즈도 설정함
   * gif파일을 재생하기 위하여 material에 값을 대입
   */
  if (type === 'GIF') {
    const sizeX = data.sizeX ? data.sizeX : '0.4'
    const sizeY = data.sizeY ? data.sizeY : '0.4'
    return {
      geometry: `primitive:plane;width:${sizeX};height:${sizeY}`,
      width: data.sizeX ? data.sizeX : 0.4,
      height: data.sizeY ? data.sizeY : 0.4,
      material: `shader:gif;src:#${data.objectType}_${data.itemID};`,
      rotation: getRotation(data),
      position: getPosition(data),
      animation: getStayAnimation(data.stayEffectType, {x:sizeX, y:sizeY, z:1}),
      transparent: true,
    }
  }

  /**
   * video타입
   */
  if (type === 'VIDEO') {
    const width = data.sizeX ? data.sizeX : 0.3;
    const height = data.sizeY ? data.sizeY : 0.3;
    return {
      // id: `${data.objectType}_${data.itemID}`,
      width,
      height,
      src: `#${data.objectType}_${data.itemID}`,
      rotation: getRotation(data),
      position: getPosition(data),
      animation: getStayAnimation(data.stayEffectType, {x:width, y:height, z:1}),
      ['look-at']: '[gps-camera]',
      opacity: 1,
      transparent: true,
    }
  }

  /**
   * 3d모델 (gltf)타입 반환
   * // TODO 관리자에 반영이 되지 않았음.
   */
  if (type === '3D') {
    const scale = getScale(data);
    return {
      rotation: getRotation(data),
      position: getPosition(data),
      scale,
      ['model-opacity']: data.opacity,
      // ['gltf-model']: data.sourceUri,
      animation: getStayAnimation(data.stayEffectType, {x: scale.sizeX, y: scale.sizeY, z: scale.sizeZ}),
      src: `#${data.objectType}_${data.itemID}`
      // ['animation-mixer']: data['animation-mixer']
    }
  }
  if (type === 'CHARACTER') {
     const scale = getScale({sizeX: 0.2, sizeY: 0.2, sizeZ: 0.2});
    return {
      position: getPosition({positionX: 0, positionY: 1, positionZ: -2}),
      scale,
      ['frustum-culled']: false,
      animation: getStayAnimation("ROTATION", {x: scale.sizeX, y: scale.sizeY, z: scale.sizeZ}),
      src: data.file.toString()
      // ['animation-mixer']: data['animation-mixer']
    }
  }
  if (type === 'STICKER') {
    const width = data.sizeX ? data.sizeX : 0.6;
    const height = data.sizeY ? data.sizeY : 0.75;
    return {
      width,
      height,
    ['alpha-test']: 0.5,
      src: data.file.toString(),
      position: getPosition({positionX: getRandomArbitrary(-0.3,0.3), positionY: getRandomArbitrary(0.2,1.2), positionZ: -2}),
      animation: getStayAnimation("", {x:width, y:height, z:1}),
      ['look-at']: '[gps-camera]',
    }
  }
}

/**
 * 타입 별 asset html element 속성 생성
 * image / video 객체와 ID로 1:1매칭이 된다. (getObjectAttrs에서 생성된 객체)
 * @param data
 * @returns {Object}
 */

export const getAssetAttrs = (data) => {
  const {type} = data;
  if (!(type === 'VIDEO' || type === '3D')) {
    return {
      id: data.id,
      src: data.sourceUri,
      crossorigin: 'anonymous'
    }
  }

  if (type === 'VIDEO') {
    return {
      id: data.id,
      src: data.sourceUri,
      loop: data.mediaLooping || false, // false일 시 재생 완료 후 삭제
      playsinline: true,
      autoplay: false,
      muted: true,
      crossorigin: 'anonymous',
    }
  }

  if (type === '3D') {
    return {
      id: data.id,
      src: data.sourceUri
    }
  }
}

/**
 * 브릿지 타입별 객체 html element 속성 데이터 생성
 * @param data
 * @returns {Object}
 */
export const getBridgeObjectAttrs = (data) => {
  const {bridgeType} = data;

  if (bridgeType === '3D') {
    return {
      rotation: getRotation(data),
      position: "0 -0.5 -2",
      scale: getScale(data),
      ['model-opacity']: data.opacity ?? 1,
      // ['gltf-model']: data.sourceUri,
      src: `#bridge3D`,
      animation: getStayAnimation(data.stayEffectType),
      // ['animation-mixer']: data['animation-mixer']
    }
  }
}