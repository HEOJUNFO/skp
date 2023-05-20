AFRAME.registerComponent('cycle-count', {
  init: function() {
      this.el.addEventListener('animation-loop', e => {
          //console.log('test');
      });
  }
})


AFRAME.registerComponent("main-scene", {
  init: function () {
    console.log('init');
    var el = this.el;
    var isContinue = checkBrower(false);
    this.captureWidth = 0;
    this.captureHeight = 0;
    this.init = false;

    if(isContinue == false) return;

    //el.renderer.outputEncoding = THREE.LinearEncoding;
    //el.setAttribute('renderer', {colorManagement: true});
    //el.setAttribute('cursor', {rayOrigin: 'mouse', fuse: false});
    //el.setAttribute('webxr', {optionalFeatures: 'hit-test, local-floor'});
    //el.setAttribute('raycaster', {objects: '.raycastable'});
    
    this.handleError = this.handleError.bind(this);
    this.getDevices = this.getDevices.bind(this);
    this.resetCamera = this.resetCamera.bind(this);
    this.filpCamera = this.filpCamera.bind(this);
    this.changeRatio = this.changeRatio.bind(this);
    this.changeModel = this.changeModel.bind(this);
    
    this.devices = [];
    this.selectedCamera = "environment";
    this.cameraResolutionDict = null;
    this.selectedRatio = null;
    this.selectModel = "";

    let hidden;
    let visibilityChange;
    if (typeof document.hidden !== "undefined") { 
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }

    function handleVisibilityChange() {
        if (document[hidden]) {
            console.log('out');
        } else {
            console.log('in');
            this.resetCamera();
        }
    }

    // 화면 나갔다 들어왔을때 이벤트 처리
    document.addEventListener(visibilityChange, handleVisibilityChange.bind(this), false);

    // 비디오 로드 완료시 카메라 한번 리셋
    window.addEventListener('arjs-video-loaded', function () {
      this.resetCamera(); 
    }.bind(this));

    // 모델 로드 이밴트
    this.el.addEventListener('model-loaded', (evt) => {

      window.parent.postMessage({ 
        'type' : 'addModel',
        'value' : evt.target.id,
      }, '*');
    });
    this.el.addEventListener('materialtextureloaded', (evt) => {
      window.parent.postMessage({ 
        'type' : 'addModel',
        'value' : evt.target.id,
      }, '*');
    });
  },
  setCameraResolution: function (info) {
    this.cameraResolutionDict = info;
  },
  //카메라 장치 가져오기
  getDevices: function (deviceInfos) {
    for (var i = 0; i !== deviceInfos.length; ++i) {
      var deviceInfo = deviceInfos[i];
      console.log( "Found device: " + JSON.stringify( deviceInfo ) );
      if (deviceInfo.kind === "videoinput") {
        var id = deviceInfo.deviceId;
        if (!this.devices.includes(id)) {
          this.devices.push(id);
        }
      }
    }
  },
  // 에러로그
  handleError: function (error) {
    alert(error.message + "\n" +error.name);
  },

  // 카메라 정보 갱신
  resetCamera: function() {
    var resolutionInfo = null;
    if(this.cameraResolutionDict != null)
      resolutionInfo = this.cameraResolutionDict[this.selectedRatio];
    else
      resolutionInfo = {width:640, height:640};

  
    var constraints = {
      audio: false,
      video: {
        facingMode: this.selectedCamera,
        width: {
          ideal: resolutionInfo.width,
        },
        height: {
          ideal: resolutionInfo.height,
        },
      },
    };
  
    let domElement = document.querySelector("#arjs-video");

    let factor = 1;
    if(this.selectedCamera == "user")
      factor = -1;

    domElement.style.webkitTransform = "scaleX(" + factor + ")"; 
    domElement.style.transform       = "scaleX(" + factor + ")";

  
    var oldStream = domElement.srcObject;
    oldStream.getTracks().forEach(function (track) {
      track.stop();
    });

    this.resume();
  
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        domElement.srcObject = stream;
  
        var event = new CustomEvent("camera-init", { stream: stream });
        window.dispatchEvent(event);
  
        document.body.addEventListener("click", function () {
          domElement.play();
        });

        let video = document.querySelector("video");
      
        video.videoWidth = resolutionInfo.width;
        video.videoHeight = resolutionInfo.height;

        if(this.init == false){
          window.parent.postMessage({ 
            'type' : 'init',
            'value' : true,
          }, '*');
          this.init = true;
        }
    }.bind(this));
  },
  // 카메라 전후 변경
  filpCamera: function () {
    if (this.selectedCamera === "environment") {
      this.selectedCamera = "user";
  
    } else {
      this.selectedCamera = "environment";
    }
  
    this.resetCamera();  
  },
  // 카메라 비율 변경
  changeRatio: function(ratio) {

    if( this.selectedRatio == ratio ) return;
    this.selectedRatio = ratio;
  
    this.resetCamera();
  },
  // 화면 저장
  capture: function() {    
    this.el.sceneEl.renderer.render(this.el.sceneEl.object3D, this.el.sceneEl.camera);
    html2canvas(document.querySelector('body'), {
        scrollX: 0,
        scrollY: 0,
        width: window.innerWidth, 
        height: window.innerHeight,
        backgroundColor:null
      }).then(function(canvas) {

      // 캡쳐한 캔버스 생성
      let resizedCanvas = document.getElementById("capture-canvas");
      let resizedContext = resizedCanvas.getContext("2d");

      let video = document.querySelector("video");
      let img = document.getElementById("skin-img");

      // 현재 카메라 해상도 가져오기
      let resolutionInfo = this.cameraResolutionDict[this.selectedRatio];

      let width = resolutionInfo.width;
      let height = resolutionInfo.height;

      // 세로비율 화면일경우(대부분의 모바일)
      if(screen.width < screen.height){
        height = resolutionInfo.width;
        width = resolutionInfo.height;
      }
      
      this.captureWidth = width;
      this.captureHeight = height;

      resizedCanvas.width = width;
      resizedCanvas.height = height;
      resizedContext.save();

      // 전면카메라 일때는 좌우 반전되게 설정
      if(this.selectedCamera == "user")
      {
        resizedContext.scale(-1, 1);
        resizedContext.translate(-width, 0);
      }
      
      let widthRatio =  width/video.videoWidth

      resizedContext.fillStyle = "#000000"; // 채우기 스타일을 검은색으로 설정
      resizedContext.fillRect(0, 0, width, height);

      // 비디오 그리기
      resizedContext.drawImage(video,0,0,width,height*widthRatio);
      resizedContext.restore()

      // 3d 오브젝트등 그리기
      resizedContext.drawImage(canvas,0, 0,width,height);

      // 스킨 이미지 그리기
      resizedContext.drawImage(img, 0,0, width, height);

      // 캡쳐 완료 메시지 보내기
      resizedCanvas.toBlob((blob) => {
        const newImg = document.createElement('img');
        const url = URL.createObjectURL(blob);
      
        newImg.onload = () => {
          // no longer need to read the blob so it's revoked
          URL.revokeObjectURL(url);
        };
    
      });

      window.parent.postMessage({ 
        'type' : 'capture',
        'value' : resizedCanvas.toDataURL(),
      }, '*');

    }.bind(this)).catch(e => {
      alert(e);
      console.error(e);
      
    });

  },
  getCaptureData : function(){
    return document.getElementById("capture-canvas").toDataURL();
  },
  download : function(fileName){
    var canvas = document.getElementById("capture-canvas");
    canvas.toBlob(function(blob) {
        saveAs(blob, fileName);
    });
  },
  pause: function(){
    this.el.sceneEl.pause()
    let video = document.querySelector('video');

    if(video != null)
      video.pause()
  },
  resume: function(){
    this.el.sceneEl.play()
    let video = document.querySelector('video');

    if(video != null)
      video.play();
  },
  // 모델 데이터 추가
  addModel(modelInfo){
    let key = modelInfo.id;
    let type = modelInfo.type;
    let src = modelInfo.src;
    let position = modelInfo.position;
    let rotation = modelInfo.rotation;
    let scale = modelInfo.scale;
  
    let assets = document.querySelector("a-scene");
  
    let size = scale + ' ' + scale + ' ' +scale;
    let loader = '';
  
    if(type == 'gltf') {
      loader = `gltf-model="`+src+`"`;

    }
    else if(type == 'obj'){
      loader = `obj-model="obj: url(`+src+`.obj); mtl: url(`+src+`.mtl)`;
    }
    else if (type == 'fbx'){
      loader = `fbx-model="src: url(`+src+`)"`;
    }
    if (type == 'image'){

    }

    let tag = '';
    if (type != 'image'){
      tag = `
      <a-entity 
        class="clickable"
        gesture-handler="locationBased: true"
        name="model"
        id="`+key+`"`+
        loader
        +`position="`+position+`" 
        origin-position="`+position+`" 
        rotation="`+rotation+`"
        scale="`+size+`" 
        visible="false"
        animation-mixer
        cycle-count>
      </a-entity>`;
    
    }
    else{
      let height = modelInfo.height / modelInfo.width;
      tag = `
      <a-image 
        class="clickable"
        gesture-handler="locationBased: true"
        name="model"
        id="`+key+`"
        src="`+src+`"
        position="`+position+`" 
        origin-position="`+position+`" 
        rotation="`+rotation+`"
        scale="`+size+`" 
        visible="false"
        width="1"
        height="`+height+`"
        cycle-count>
      </a-image>`;

    }
    
    assets.insertAdjacentHTML( 'beforeend', tag );
  },
  // 모델 변경
  changeModel: function(key) {
    this.selectModel = key;
    let models = document.getElementsByName("model");
  
    for(let i = 0; i<models.length; i++)
      models[i].setAttribute("visible","false");
  
    let model = document.getElementById(key);
    let pos = model.getAttribute("origin-position").split(' ')


    model.setAttribute("visible","true");
    model.object3D.position.x = parseFloat(pos[0]);
    model.object3D.position.y = parseFloat(pos[1]);
    model.object3D.position.z = parseFloat(pos[2]);
  
    var direction = new THREE.Vector3;
    var camera = this.el.camera;
    //model.object3D.position.copy( camera.position );
    camera.getWorldDirection(direction);
  
    // model.object3D.position.addScaledVector(direction, 10);
    // dirInfo = this.getCameraVector(model.object3D);
    // model.object3D.position.addScaledVector(dirInfo.up, 1.6);

    // //model.object3D.lookAt(camera.position );
    // model.object3D.position.addScaledVector(dirInfo.right, 1.5);
  },
  // 스킨 변경
  changeSkin: function (img) {
    if(img != null){
      document.querySelector('#skin-img').src = img;
      document.querySelector('#skin-img').style.display = '';
    }
    else{
      document.querySelector('#skin-img').style.display = 'none';
    }
  },
  //특정 오브젝트와의 카메라 백터 구하기
  getCameraVector: function (object) {
    let camera =  this.el.camera;
    let cameraRight = document.querySelector('#camera-right');
    let vecCamera = new THREE.Vector3;
    let vecCameraRight = new THREE.Vector3;

    camera.getWorldPosition(vecCamera);
    cameraRight.object3D.getWorldPosition(vecCameraRight);

    let vecDirCameraRight = new THREE.Vector3();
    let vecFront = new THREE.Vector3();
    let vecRight = new THREE.Vector3();
    let vecUp = new THREE.Vector3();
    vecFront.subVectors( object.position ,vecCamera ).normalize();
    vecDirCameraRight.subVectors( vecCameraRight ,vecCamera ).normalize();

    vecUp.crossVectors(vecDirCameraRight,vecFront);
    vecRight.crossVectors(vecFront,vecUp);

    return {up:vecUp, right:vecRight};
  },
  
  
});