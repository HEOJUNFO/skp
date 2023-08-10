import { EventBus } from "@/js/EventBus";

export function setGesture() {
  window.AFRAME.registerComponent("gesture-handler", {
      schema: {
        enabled: { default: false },
        moveFactor: { default: 2.5 },
        rotateFactor: {default : 8},
        minScale: { default: 0.6 },
        maxScale: { default: 4 },
        locationBased: { default: false},
      },
    
      init: function () {
        const axisY = new window.THREE.Vector3(0, 1, 0).normalize();
        const axisX = new window.THREE.Vector3(1, 0, 0).normalize();
        this.moveState = 'fingermove';

        this.handleScale = this.handleScale.bind(this);
        this.handleMove = this.handleMove.bind(this);
        this.handleRotationY = this.handleRotation.bind(this,axisY);
        this.handleRotationX = this.handleRotation.bind(this,axisX);
        this.eventUpdate = this.eventUpdate.bind(this);

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
    
    
        this.el.addEventListener('mousedown', function () {
          this.data.enabled = true;
          this.eventUpdate();
          console.log('clicked')
        }.bind(this));


        this.el.addEventListener('mouseup', function () {
          this.data.enabled = false;
          this.eventUpdate();
          console.log('clicked')
        }.bind(this));


      },
    
      update: function () {
        this.eventUpdate()
      },
    
      remove: function () {
        this.el.sceneEl.removeEventListener("onefingermove", this.handleMove);
        this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
        this.el.sceneEl.removeEventListener("onefingerrotY", this.handleRotationY);
        this.el.sceneEl.removeEventListener("onefingerrotX", this.handleRotationX);
      },
      handleMove: function (event) {
        EventBus.emit('scale')
        if (this.isVisible) {
    
          this.el.object3D.position.x += event.detail.positionChange.x * this.data.moveFactor;
          this.el.object3D.position.y -= event.detail.positionChange.y * this.data.moveFactor;
    
        }
      },
      //회전 커스텀 함수 월드기준으로 회전한다
      handleRotation : function (axis, event){       
        const rotWorldMatrix = new window.THREE.Matrix4();
        let rotateFactor =  this.data.rotateFactor;

        if(axis.y > 0){
          rotateFactor *= event.detail.positionChange.x;
        }
        else{
          rotateFactor *= event.detail.positionChange.y;
        }

        rotWorldMatrix.makeRotationAxis(axis, rotateFactor);
        rotWorldMatrix.multiply(this.el.object3D.matrix);
    
        const rotMat2 = new window.THREE.Matrix4().extractRotation(rotWorldMatrix);
        const rotQuat = new window.THREE.Quaternion().setFromRotationMatrix(rotMat2);
        this.el.object3D.quaternion.copy(rotQuat);
        this.el.object3D.updateMatrix();
      },
    
      handleScale: function (event) {
        EventBus.emit('scale')
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
      eventUpdate : function (){
        if (this.data.enabled) {
          this.el.sceneEl.addEventListener("onefingermove", this.handleMove);
          this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
          // this.el.sceneEl.addEventListener("onefingerrotY", this.handleRotationY);
          // this.el.sceneEl.addEventListener("onefingerrotX", this.handleRotationX);

        } else {
          this.el.sceneEl.removeEventListener("onefingermove", this.handleMove);
          this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
          // this.el.sceneEl.removeEventListener("onefingerrotY", this.handleRotationY);
          // this.el.sceneEl.removeEventListener("onefingerrotX", this.handleRotationX);
        }
      }
    });
    
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
          
          if(currentState.positionRaw.y > window.innerHeight - 100){
            this.moveState = 'fingerrotY';
          }
          else if(currentState.positionRaw.x > window.innerWidth - 50){
            this.moveState = 'fingerrotX';
          }
          else{
            this.moveState = 'fingermove';
          }
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
            this.getEventPrefix(currentState.touchCount) + this.moveState;
    
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
        let prefix = numberNames[Math.min(touchCount, 4) - 1];
        
        return prefix;
      }
    });    
}