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

  window.AFRAME.registerComponent('frustum-culled', {
    schema: {default: false},
    init: function () {
      this.el.addEventListener('model-loaded', this.update.bind(this));
    },
    update: function () {
      var mesh = this.el.getObject3D('mesh');
      var data = this.data;
      if (!mesh) { return; }
      mesh.traverse(function (node) {
        if (node.isMesh) {
          node.frustumCulled = data;
        }
      });
    }
  });

  window.AFRAME.registerComponent('alpha-test', {
    schema: {default: 0.0},
    init: function () {
      this.el.addEventListener('model-loaded', this.update.bind(this));
    },
    update: function () {
      var mesh = this.el.getObject3D('mesh');
      var data = this.data;
      if (!mesh) { return; }
      mesh.traverse(function (node) {
        if (node.isMesh) {
          node.material.alphaTest = data;
        }
      });
    }
  });

  

  //---------

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