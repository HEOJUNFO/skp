export function setAframe() {
  /*
  window.AFRAME.registerComponent('play-on-click', {
    init: function () {
      // console.log('init', this.el);
      var buttonEls = this.buttonEls = this.el.querySelectorAll('.click-el');
      this.onClick = this.onClick.bind(this);

      for(let i=0; i<buttonEls.length; i++) {
        buttonEls[i].addEventListener('mouseenter', this.onMouseEnter);
        buttonEls[i].addEventListener('mouseleave', this.onMouseLeave);
        buttonEls[i].addEventListener('click', this.onClick);
      }
    },
    play: function () {
      window.addEventListener('click', this.onClick);
    },
    pause: function () {
      window.removeEventListener('click', this.onClick);
    },
    onClick: function () {
      // alert(`onClick, ${this.el}`)
      var videoEl = this.el.getAttribute('material').src;
      // console.log(`onClick,` ,videoEl)
      if (!videoEl) { return; }
      this.el.object3D.visible = true;
      videoEl.play();
    }
  });
  */

  /*
  window.AFRAME.registerComponent('mouseevents', {
    init() {
      this.onClick = this.onClick.bind(this);
      this.onMouseEnter = this.onMouseEnter.bind(this);
      this.onMouseLeave = this.onMouseLeave.bind(this);

      console.log('click-test init')
      let buttonEls = this.buttonEls = this.el.querySelectorAll('.click-el');
      console.log(buttonEls)

      for(let i=0; i<buttonEls.length; i++) {
        console.log(buttonEls[i])
        buttonEls[i].addEventListener('mouseenter', this.onMouseEnter);
        buttonEls[i].addEventListener('mouseleave', this.onMouseLeave);
        buttonEls[i].addEventListener('click', this.onClick);
      }

    },
    onMouseEnter(evt) {
      console.log('onMouseEnter', evt.target);
    },
    onMouseLeave(evt) {
      console.log('onMouseLeave', evt.target);
    },
    onClick(evt) {
      console.log('onClick', evt.target)
    }
  })
  */

  /*
  window.AFRAME.registerComponent('gltfmodel', {
    init() {
      console.log('gltfmodel')
      this.onClick = this.onClick.bind(this);
      this.onMouseEnter = this.onMouseEnter.bind(this);
      this.onMouseLeave = this.onMouseLeave.bind(this);

      //
      // let buttonEls = this.buttonEls = this.el.querySelectorAll('.gltf-el');
      // console.log(buttonEls)
      //
      // for(let i=0; i<buttonEls.length; i++) {
      //   console.log(buttonEls[i])
      //   buttonEls[i].addEventListener('mouseenter', this.onMouseEnter);
      //   buttonEls[i].addEventListener('mouseleave', this.onMouseLeave);
      //   buttonEls[i].addEventListener('click', this.onClick);
      // }
      this.el.addEventListener('model-loaded', () => {
        console.log('model-loaded', this.el)
        this.el.addEventListener('mouseenter', this.onMouseEnter);
        this.el.addEventListener('mouseleave', this.onMouseLeave);
        this.el.addEventListener('click', this.onClick);
      })

    },
    onMouseEnter(evt) {
      console.log('onMouseEnter', evt.target);
    },
    onMouseLeave(evt) {
      console.log('onMouseLeave', evt.target);
    },
    onClick(evt) {
      console.log('onClick', evt)
      // alert('click')
    }
  })
  */

  window.AFRAME.registerComponent('drag-rotate-component',{
    schema : {
      speed : {default:1},
      isTouchMove : {default:false}
    },
    init : function(){
      this.ifTouchStart = false;
      this.data.isTouchMove = false;
      this.x_touch_cord = 0;
      this.y_touch_cord = 0;

      this.el.addEventListener('mousedown',this.OnElementTouchStart.bind(this));
      this.el.addEventListener('touchstart',this.OnElementTouchStart.bind(this));
      document.addEventListener('touchstart',this.OnDocumentTouchStart.bind(this));
      document.addEventListener('touchend',this.OnDocumentTouchEnd.bind(this));
      document.addEventListener('touchmove',this.OnDocumentTouchMove.bind(this));
    },
    OnElementTouchStart : function() {
      this.ifTouchStart = true;
    },
    OnDocumentTouchStart : function(event){
      this.x_touch_cord = event.touches[0].clientX;
      this.y_touch_cord = event.touches[0].clientY;
    },
    OnDocumentTouchEnd : function(){
      this.ifTouchStart = false;
      this.touchMove = false;
      this.data.isTouchMove = false
    },
    OnDocumentTouchMove : function(event)
    {
      if(this.ifTouchStart)
      {
        var temp_x = event.touches[0].clientX-this.x_touch_cord;
        var temp_y = event.touches[0].clientY-this.y_touch_cord;
        var rotation = this.el.getAttribute('rotation')
        this.el.setAttribute('rotation', {...rotation, x: rotation.x + (temp_y*1), y: rotation.y + (temp_x*1)})
        this.x_touch_cord = event.touches[0].clientX;
        this.y_touch_cord = event.touches[0].clientY;

        // 미세하게 움직일 시 move를 적용하지 않는다..
        if(Math.abs(temp_x) < 1.5 && Math.abs(temp_y) < 1.5)return
        this.data.isTouchMove = true;
      }
    }
  });

  // gltf opacity ( gltf 투명화 )
  /**
   * gltf 투명화가 가능하게
   * gltf인 경우에는 opacity가 아니라 model-opacity로 투명도를 조정해야한다.
   */
  window.AFRAME.registerComponent('model-opacity', {
    schema: {default: 1.0},
    init: function () {
      this.el.addEventListener('model-loaded', this.update.bind(this));
    },
    update: function () {
      var mesh = this.el.getObject3D('mesh');
      var data = this.data;
      if (!mesh) { return; }
      mesh.traverse(function (node) {
        if (node.isMesh) {
          node.material.opacity = data;
          node.material.transparent = data < 1.0;
          node.material.needsUpdate = true;
        }
      });
    }
  });

  //---------

  window.AFRAME.registerComponent("gesture-handler", {
    schema: {
      enabled: { default: true },
      rotationFactor: { default: 3 },
      minScale: { default: 0.3 },
      maxScale: { default: 5 },
      locationBased: { default: false},
    },
  
    init: function () {
      this.handleScale = this.handleScale.bind(this);
      this.handleRotation = this.handleRotation.bind(this);
  
      this.isVisible = this.data.locationBased;
      this.initialScale = this.el.object3D.scale.clone();
      this.scaleFactor = 1;
  
      this.el.sceneEl.addEventListener("markerFound", (e) => {
        console.log(e);
        this.isVisible = true;
      });
  
      this.el.sceneEl.addEventListener("markerLost", (e) => {
        console.log(e);
        this.isVisible = false;
      });
  
  
      this.el.addEventListener('click', function (evt) {
        console.log(evt)
        /*
        lastIndex = (lastIndex + 1) % COLORS.length;
        this.setAttribute('material', 'color', COLORS[lastIndex]);
        console.log('I was clicked at: ', evt.detail.intersection.point);*/
      });
  
    },
  
    update: function () {
      if (this.data.enabled) {
        this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
        this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
      } else {
        this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
        this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
      }
    },
  
    remove: function () {
      this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
    },
  
    handleRotation: function (event) {
      /*
      if (this.isVisible) {
  
        let vecters = AFRAME.scenes[0].components['main-scene'].getCameraVector(this.el.object3D);
        let xAxis =  vecters.right;
        let yAxis =  vecters.up;
  
        // 커스텀
        this.rotation(this.el.object3D, xAxis, event.detail.positionChange.y * this.data.rotationFactor); 
        this.rotation(this.el.object3D, yAxis, event.detail.positionChange.x * this.data.rotationFactor); 
      }*/
  
      if (this.isVisible) {
  
        this.el.object3D.position.x += event.detail.positionChange.x * this.data.rotationFactor;
        this.el.object3D.position.y -= event.detail.positionChange.y * this.data.rotationFactor;
  
      }
    },
    //회전 커스텀 함수 월드기준으로 회전한다
    rotation : function (object, axis, radians){
  
      var rotWorldMatrix = new window.THREE.Matrix4();
      rotWorldMatrix.makeRotationAxis(axis.normalize(),radians)
      rotWorldMatrix.multiply(object.matrix);
  
      var rotMat2 = new window.THREE.Matrix4().extractRotation(rotWorldMatrix);
      var rotQuat = new window.THREE.Quaternion().setFromRotationMatrix(rotMat2);
      object.quaternion.copy(rotQuat);
      object.updateMatrix();
    },
  
    handleScale: function (event) {
      if (this.isVisible) {
        this.scaleFactor *=
          1 + event.detail.spreadChange / event.detail.startSpread;
  
        this.scaleFactor = Math.min(
          Math.max(this.scaleFactor, this.data.minScale),
          this.data.maxScale
        );
  
        this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
        this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
        this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
      }
    },
  });
  
  // Component that detects and emits events for touch gestures
  
  window.AFRAME.registerComponent("gesture-detector", {
    schema: {
      element: { default: "" }
    },
  
    init: function() {
      this.targetElement =
        this.data.element && document.querySelector(this.data.element);
  
      if (!this.targetElement) {
        this.targetElement = this.el;
      }
  
      this.internalState = {
        previousState: null
      };
  
      this.emitGestureEvent = this.emitGestureEvent.bind(this);
  
      this.targetElement.addEventListener("touchstart", this.emitGestureEvent);
  
      this.targetElement.addEventListener("touchend", this.emitGestureEvent);
  
      this.targetElement.addEventListener("touchmove", this.emitGestureEvent);
    },
  
    remove: function() {
      this.targetElement.removeEventListener("touchstart", this.emitGestureEvent);
  
      this.targetElement.removeEventListener("touchend", this.emitGestureEvent);
  
      this.targetElement.removeEventListener("touchmove", this.emitGestureEvent);
    },
  
    emitGestureEvent(event) {
      const currentState = this.getTouchState(event);
  
      const previousState = this.internalState.previousState;
  
      const gestureContinues =
        previousState &&
        currentState &&
        currentState.touchCount == previousState.touchCount;
  
      const gestureEnded = previousState && !gestureContinues;
  
      const gestureStarted = currentState && !gestureContinues;
  
      if (gestureEnded) {
        const eventName =
          this.getEventPrefix(previousState.touchCount) + "fingerend";
  
        this.el.emit(eventName, previousState);
  
        this.internalState.previousState = null;
      }
  
      if (gestureStarted) {
        currentState.startTime = performance.now();
  
        currentState.startPosition = currentState.position;
  
        currentState.startSpread = currentState.spread;
  
        const eventName =
          this.getEventPrefix(currentState.touchCount) + "fingerstart";
  
        this.el.emit(eventName, currentState);
  
        this.internalState.previousState = currentState;
      }
  
      if (gestureContinues) {
        const eventDetail = {
          positionChange: {
            x: currentState.position.x - previousState.position.x,
  
            y: currentState.position.y - previousState.position.y
          }
        };
  
        if (currentState.spread) {
          eventDetail.spreadChange = currentState.spread - previousState.spread;
        }
  
        Object.assign(previousState, currentState);

        Object.assign(eventDetail, previousState);
  
        const eventName =
          this.getEventPrefix(currentState.touchCount) + "fingermove";
  
        this.el.emit(eventName, eventDetail);
      }
    },
  
    getTouchState: function(event) {
      if (event.touches.length === 0) {
        return null;
      }
  
      const touchList = [];
  
      for (let i = 0; i < event.touches.length; i++) {
        touchList.push(event.touches[i]);
      }
  
      const touchState = {
        touchCount: touchList.length
      };
  
      const centerPositionRawX =
        touchList.reduce((sum, touch) => sum + touch.clientX, 0) /
        touchList.length;
  
      const centerPositionRawY =
        touchList.reduce((sum, touch) => sum + touch.clientY, 0) /
        touchList.length;
  
      touchState.positionRaw = { x: centerPositionRawX, y: centerPositionRawY };
  
      const screenScale = 2 / (window.innerWidth + window.innerHeight);
  
      touchState.position = {
        x: centerPositionRawX * screenScale,
        y: centerPositionRawY * screenScale
      };
  
      if (touchList.length >= 2) {
        const spread =
          touchList.reduce((sum, touch) => {
            return (
              sum +
              Math.sqrt(
                Math.pow(centerPositionRawX - touch.clientX, 2) +
                  Math.pow(centerPositionRawY - touch.clientY, 2)
              )
            );
          }, 0) / touchList.length;
  
        touchState.spread = spread * screenScale;
      }
  
      return touchState;
    },
  
    getEventPrefix(touchCount) {
      const numberNames = ["one", "two", "three", "many"];
  
      return numberNames[Math.min(touchCount, 4) - 1];
    }
  });


  /*window.AFRAME.registerComponent('click-drag', {
    schema: {
      default: 1.0
    },
    init: function () {
      this.el.addEventListener('dragstart', this.dragstart.bind(this));
      this.el.addEventListener('dragend', this.dragend.bind(this));
    },
    dragstart: function (dragInfo) {
      console.log("drag start" + dragInfo);
      // console.log("before camera:"+this.object3D.rotation.x);
      var camera = document.querySelector('a-camera');
      camera.setAttribute("look-controls-enabled", "false");
      camera.setAttribute("keyboard-controls", "fpsMode:true");
      this.emit("dragstart");
      // console.log("c_rotation:"+c_rotation.x);
      // console.log("camera:"+this.object3D.rotation.x);
      // camera.object3D.rotation.x = c_rotation.x;
      // camera.object3D.rotation.y = c_rotation.y;
      // camera.object3D.rotation.z = c_rotation.z;
      // console.log("after camera:"+this.object3D.rotation.x););
    },
    dragend: function (dragInfo) {
      console.log("drag end" + dragInfo);
      var camera = document.querySelector('a-camera');
      camera.removeAttribute("look-controls-enabled");
      camera.removeAttribute("keyboard-controls");
      this.emit("dragend");
    }
  });
*/
}