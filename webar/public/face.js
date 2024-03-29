(() => {
	const {
		Controller: e,
		UI: t
	} = window.MINDAR.FACE, i = AFRAME.THREE;
	AFRAME.registerSystem("mindar-face-system", {
		container: null,
		video: null,
		shouldFaceUser: !0,
		lastHasFace: !1,
		init: function() {
			this.anchorEntities = [], this.faceMeshEntities = []
		},
		setup: function({
			uiLoading: e,
			uiScanning: i,
			uiError: s,
			filterMinCF: a,
			filterBeta: n
		}) {
			this.ui = new t({
				uiLoading: e,
				uiScanning: i,
				uiError: s
			}), this.filterMinCF = a, this.filterBeta = n
		},
		registerFaceMesh: function(e) {
			this.faceMeshEntities.push({
				el: e
			})
		},
		registerAnchor: function(e, t) {
			this.anchorEntities.push({
				el: e,
				anchorIndex: t
			})
		},
		start: function() {
			this.ui.showLoading(), this.container = this.el.sceneEl.parentNode, this._startVideo()
		},
		stop: function() {
			this.pause(), this.video.srcObject.getTracks().forEach((function(e) {
				e.stop()
			})), this.video.remove()
		},
		changeCamera: function(faceType) {
			this.shouldFaceUser = faceType == 'user' ? 1 : 0;
			this.pause();
		},
		switchCamera: function() {
			this.shouldFaceUser = !this.shouldFaceUser, this.stop(), this.start()
		},
		pause: function(e = !1) {
			e || this.video.pause(), this.controller.stopProcessVideo()
		},
		unpause: function() {
			this.video.play(), this.controller.processVideo(this.video)
		},
		__startVideo: function() {
			this.video = document.createElement("img"), this.video.onload = async () => {
				this.video.videoWidth = this.video.width, this.video.videoHeight = this.video.height, await this._setupAR(), this._processVideo(), this.ui.hideLoading()
			}, this.video.style.position = "absolute", this.video.style.top = "0px", this.video.style.left = "0px", this.video.style.zIndex = "-2", this.video.src = "./assets/face1.jpeg", this.container.appendChild(this.video)
		},
		_startVideo: function() {
            // 아래 주석을 대신하여 위의 작성
            this.video = document.querySelector("video");

            this.video.addEventListener("loadedmetadata", (async () => {
                this.video.setAttribute("width", this.video.videoWidth);
                this.video.setAttribute("height", this.video.videoHeight);
				await this._setupAR();
                
                this._processVideo();
                this.ui.hideLoading();
            }));
            this.video.src = "./assets/face1.jpeg";
            

            /*
			if (this.video = document.createElement("video"), this.video.setAttribute("autoplay", ""), this.video.setAttribute("muted", ""), this.video.setAttribute("playsinline", ""), this.video.style.position = "absolute", this.video.style.top = "0px", this.video.style.left = "0px", this.video.style.zIndex = "-2", this.container.appendChild(this.video), !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return this.el.emit("arError", {
				error: "VIDEO_FAIL"
			}), void this.ui.showCompatibility();
			navigator.mediaDevices.getUserMedia({
				audio: !1,
				video: {
					facingMode: this.shouldFaceUser ? "face" : "environment"
				}
			}).then((e => {
				this.video.addEventListener("loadedmetadata", (async () => {
					this.video.setAttribute("width", this.video.videoWidth), this.video.setAttribute("height", this.video.videoHeight), await this._setupAR(), this._processVideo(), this.ui.hideLoading()
				})), this.video.srcObject = e
			})).catch((e => {
				console.log("getUserMedia error", e), this.el.emit("arError", {
					error: "VIDEO_FAIL"
				})
			}))*/
		},
		_processVideo: function() {
			this.controller.onUpdate = ({
				hasFace: e,
				estimateResult: t
			}) => {
				if (e && !this.lastHasFace && this.el.emit("targetFound"), !e && this.lastHasFace && this.el.emit("targetLost"), this.lastHasFace = e, e) {
					const {
						faceMatrix: e
					} = t;
					for (let e = 0; e < this.anchorEntities.length; e++) {
						const t = this.controller.getLandmarkMatrix(this.anchorEntities[e].anchorIndex);
						this.anchorEntities[e].el.updateVisibility(!0), this.anchorEntities[e].el.updateMatrix(t)
					}
					for (let t = 0; t < this.faceMeshEntities.length; t++) this.faceMeshEntities[t].el.updateVisibility(!0), this.faceMeshEntities[t].el.updateMatrix(e)
				} else {
					for (let e = 0; e < this.anchorEntities.length; e++) this.anchorEntities[e].el.updateVisibility(!1);
					for (let e = 0; e < this.faceMeshEntities.length; e++) this.faceMeshEntities[e].el.updateVisibility(!1)
				}
			}, this.controller.processVideo(this.video)
		},
		_setupAR: async function() {
			this.controller = new e({
				filterMinCF: this.filterMinCF,
				filterBeta: this.filterBeta
			}), this._resize(), await this.controller.setup(this.video), await this.controller.dummyRun(this.video);
			const {
				fov: t,
				aspect: s,
				near: a,
				far: n
			} = this.controller.getCameraParams(), o = new i.PerspectiveCamera;
			o.fov = t, o.aspect = s, o.near = a, o.far = n, o.updateProjectionMatrix();
			const r = this.container.getElementsByTagName("a-camera")[0];
			for (let e = 0; e < this.faceMeshEntities.length; e++) this.faceMeshEntities[e].el.addFaceMesh(this.controller.createThreeFaceGeometry(i));
			this._resize(), window.addEventListener("resize", this._resize.bind(this)), this.el.emit("arReady")
		},
		_resize: function() {
		}
	}), AFRAME.registerComponent("mindar-face", {
		dependencies: ["mindar-face-system"],
		schema: {
			autoStart: {
				type: "boolean",
				default: !0
			},
			faceOccluder: {
				type: "boolean",
				default: !0
			},
			uiLoading: {
				type: "string",
				default: "yes"
			},
			uiScanning: {
				type: "string",
				default: "yes"
			},
			uiError: {
				type: "string",
				default: "yes"
			},
			filterMinCF: {
				type: "number",
				default: -1
			},
			filterBeta: {
				type: "number",
				default: -1
			}
		},
		init: function() {
			const e = this.el.sceneEl.systems["mindar-face-system"];
			if (this.data.faceOccluder) {
				const e = document.createElement("a-entity");
				e.setAttribute("mindar-face-default-face-occluder", !0), this.el.sceneEl.appendChild(e)
			}
			e.setup({
				uiLoading: this.data.uiLoading,
				uiScanning: this.data.uiScanning,
				uiError: this.data.uiError,
				filterMinCF: -1 === this.data.filterMinCF ? null : this.data.filterMinCF,
				filterBeta: -1 === this.data.filterBeta ? null : this.data.filterBeta
			}), this.data.autoStart && this.el.sceneEl.addEventListener("renderstart", (() => {
				e.start()
			}))
		}
	}), AFRAME.registerComponent("mindar-face-target", {
		dependencies: ["mindar-face-system"],
		schema: {
			anchorIndex: {
				type: "number"
			}
		},
		init: function() {
			this.faceSystem = this.el.sceneEl.systems["mindar-face-system"];
			this.el.sceneEl.systems["mindar-face-system"].registerAnchor(this, this.data.anchorIndex);
			this.scaleMatrix = new THREE.Matrix4().makeScale(-1, 1, 1);
			const e = this.el.object3D;
			e.visible = !1, e.matrixAutoUpdate = !1
		},
		updateVisibility(e) {
			this.el.object3D.visible = e
		},
		updateMatrix(e) {			
			if(this.faceSystem.shouldFaceUser) {
				// set matrix
				let matrix = new THREE.Matrix4().set(-e[0], e[1], e[2], e[3], -e[4], e[5], e[6], e[7], -e[8], e[9], e[10], e[11], -e[12], e[13], e[14], e[15]);
				matrix.premultiply(this.scaleMatrix);
				
				// set object3d
				this.el.object3D.matrix = matrix;
			}
			else{
				this.el.object3D.matrix.set(...e);
			}
		}
	}), AFRAME.registerComponent("mindar-face-occluder", {
		init: function() {
			this.el.object3D, this.el.addEventListener("model-loaded", (() => {
				this.el.getObject3D("mesh").traverse((e => {
					if (e.isMesh) {
						const t = new i.MeshStandardMaterial({
							colorWrite: !1
						});
						e.material = t
					}
				}))
			}))
		}
	}), AFRAME.registerComponent("mindar-face-default-face-occluder", {
		init: function() {
			this.faceSystem = this.el.sceneEl.systems["mindar-face-system"];
			this.el.sceneEl.systems["mindar-face-system"].registerFaceMesh(this), this.el.object3D.matrixAutoUpdate = !1
			this.scaleMatrix = new THREE.Matrix4().makeScale(-1, 1, 1);
		},
		updateVisibility(e) {
			this.el.object3D.visible = e
		},
		updateMatrix(e) {
			if(this.faceSystem.shouldFaceUser) {
				// set matrix
				let matrix = new THREE.Matrix4().set(-e[0], e[1], e[2], e[3], -e[4], e[5], e[6], e[7], -e[8], e[9], e[10], e[11], -e[12], e[13], e[14], e[15]);
				matrix.premultiply(this.scaleMatrix);
				
				// set object3d
				this.el.object3D.matrix = matrix;
			}
			else{
				this.el.object3D.matrix.set(...e);
			}
		},
		addFaceMesh(e) {
			const t = new i.MeshBasicMaterial({
					colorWrite: !1
				}),
				s = new i.Mesh(e, t);
			this.el.setObject3D("mesh", s)
		}
	})
})();