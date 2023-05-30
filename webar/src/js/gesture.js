export function setGesture() {
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
}