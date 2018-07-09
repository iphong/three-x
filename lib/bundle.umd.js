(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("prop-types"), require("react"), require("three"));
	else if(typeof define === 'function' && define.amd)
		define(["prop-types", "react", "three"], factory);
	else if(typeof exports === 'object')
		exports["ThreeX"] = factory(require("prop-types"), require("react"), require("three"));
	else
		root["ThreeX"] = factory(root[undefined], root["React"], root["THREE"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_three__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/three/examples/js/controls/FlyControls.js":
/*!****************************************************************!*\
  !*** ./node_modules/three/examples/js/controls/FlyControls.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @author James Baicoianu / http://www.baicoianu.com/
 */
THREE.FlyControls = function (object, domElement) {
  this.object = object;
  this.domElement = domElement !== undefined ? domElement : document;
  if (domElement) this.domElement.setAttribute('tabindex', -1); // API

  this.movementSpeed = 1.0;
  this.rollSpeed = 0.005;
  this.dragToLook = false;
  this.autoForward = false; // disable default target object behavior
  // internals

  this.tmpQuaternion = new THREE.Quaternion();
  this.mouseStatus = 0;
  this.moveState = {
    up: 0,
    down: 0,
    left: 0,
    right: 0,
    forward: 0,
    back: 0,
    pitchUp: 0,
    pitchDown: 0,
    yawLeft: 0,
    yawRight: 0,
    rollLeft: 0,
    rollRight: 0
  };
  this.moveVector = new THREE.Vector3(0, 0, 0);
  this.rotationVector = new THREE.Vector3(0, 0, 0);

  this.handleEvent = function (event) {
    if (typeof this[event.type] == 'function') {
      this[event.type](event);
    }
  };

  this.keydown = function (event) {
    if (event.altKey) {
      return;
    } //event.preventDefault();


    switch (event.keyCode) {
      case 16:
        /* shift */
        this.movementSpeedMultiplier = .1;
        break;

      case 87:
        /*W*/
        this.moveState.forward = 1;
        break;

      case 83:
        /*S*/
        this.moveState.back = 1;
        break;

      case 65:
        /*A*/
        this.moveState.left = 1;
        break;

      case 68:
        /*D*/
        this.moveState.right = 1;
        break;

      case 82:
        /*R*/
        this.moveState.up = 1;
        break;

      case 70:
        /*F*/
        this.moveState.down = 1;
        break;

      case 38:
        /*up*/
        this.moveState.pitchUp = 1;
        break;

      case 40:
        /*down*/
        this.moveState.pitchDown = 1;
        break;

      case 37:
        /*left*/
        this.moveState.yawLeft = 1;
        break;

      case 39:
        /*right*/
        this.moveState.yawRight = 1;
        break;

      case 81:
        /*Q*/
        this.moveState.rollLeft = 1;
        break;

      case 69:
        /*E*/
        this.moveState.rollRight = 1;
        break;
    }

    this.updateMovementVector();
    this.updateRotationVector();
  };

  this.keyup = function (event) {
    switch (event.keyCode) {
      case 16:
        /* shift */
        this.movementSpeedMultiplier = 1;
        break;

      case 87:
        /*W*/
        this.moveState.forward = 0;
        break;

      case 83:
        /*S*/
        this.moveState.back = 0;
        break;

      case 65:
        /*A*/
        this.moveState.left = 0;
        break;

      case 68:
        /*D*/
        this.moveState.right = 0;
        break;

      case 82:
        /*R*/
        this.moveState.up = 0;
        break;

      case 70:
        /*F*/
        this.moveState.down = 0;
        break;

      case 38:
        /*up*/
        this.moveState.pitchUp = 0;
        break;

      case 40:
        /*down*/
        this.moveState.pitchDown = 0;
        break;

      case 37:
        /*left*/
        this.moveState.yawLeft = 0;
        break;

      case 39:
        /*right*/
        this.moveState.yawRight = 0;
        break;

      case 81:
        /*Q*/
        this.moveState.rollLeft = 0;
        break;

      case 69:
        /*E*/
        this.moveState.rollRight = 0;
        break;
    }

    this.updateMovementVector();
    this.updateRotationVector();
  };

  this.mousedown = function (event) {
    if (this.domElement !== document) {
      this.domElement.focus();
    }

    event.preventDefault();
    event.stopPropagation();

    if (this.dragToLook) {
      this.mouseStatus++;
    } else {
      switch (event.button) {
        case 0:
          this.moveState.forward = 1;
          break;

        case 2:
          this.moveState.back = 1;
          break;
      }

      this.updateMovementVector();
    }
  };

  this.mousemove = function (event) {
    if (!this.dragToLook || this.mouseStatus > 0) {
      var container = this.getContainerDimensions();
      var halfWidth = container.size[0] / 2;
      var halfHeight = container.size[1] / 2;
      this.moveState.yawLeft = -(event.pageX - container.offset[0] - halfWidth) / halfWidth;
      this.moveState.pitchDown = (event.pageY - container.offset[1] - halfHeight) / halfHeight;
      this.updateRotationVector();
    }
  };

  this.mouseup = function (event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.dragToLook) {
      this.mouseStatus--;
      this.moveState.yawLeft = this.moveState.pitchDown = 0;
    } else {
      switch (event.button) {
        case 0:
          this.moveState.forward = 0;
          break;

        case 2:
          this.moveState.back = 0;
          break;
      }

      this.updateMovementVector();
    }

    this.updateRotationVector();
  };

  this.update = function (delta) {
    var moveMult = delta * this.movementSpeed;
    var rotMult = delta * this.rollSpeed;
    this.object.translateX(this.moveVector.x * moveMult);
    this.object.translateY(this.moveVector.y * moveMult);
    this.object.translateZ(this.moveVector.z * moveMult);
    this.tmpQuaternion.set(this.rotationVector.x * rotMult, this.rotationVector.y * rotMult, this.rotationVector.z * rotMult, 1).normalize();
    this.object.quaternion.multiply(this.tmpQuaternion); // expose the rotation vector for convenience

    this.object.rotation.setFromQuaternion(this.object.quaternion, this.object.rotation.order);
  };

  this.updateMovementVector = function () {
    var forward = this.moveState.forward || this.autoForward && !this.moveState.back ? 1 : 0;
    this.moveVector.x = -this.moveState.left + this.moveState.right;
    this.moveVector.y = -this.moveState.down + this.moveState.up;
    this.moveVector.z = -forward + this.moveState.back; //console.log( 'move:', [ this.moveVector.x, this.moveVector.y, this.moveVector.z ] );
  };

  this.updateRotationVector = function () {
    this.rotationVector.x = -this.moveState.pitchDown + this.moveState.pitchUp;
    this.rotationVector.y = -this.moveState.yawRight + this.moveState.yawLeft;
    this.rotationVector.z = -this.moveState.rollRight + this.moveState.rollLeft; //console.log( 'rotate:', [ this.rotationVector.x, this.rotationVector.y, this.rotationVector.z ] );
  };

  this.getContainerDimensions = function () {
    if (this.domElement != document) {
      return {
        size: [this.domElement.offsetWidth, this.domElement.offsetHeight],
        offset: [this.domElement.offsetLeft, this.domElement.offsetTop]
      };
    } else {
      return {
        size: [window.innerWidth, window.innerHeight],
        offset: [0, 0]
      };
    }
  };

  function bind(scope, fn) {
    return function () {
      fn.apply(scope, arguments);
    };
  }

  function contextmenu(event) {
    event.preventDefault();
  }

  this.dispose = function () {
    this.domElement.removeEventListener('contextmenu', contextmenu, false);
    this.domElement.removeEventListener('mousedown', _mousedown, false);
    this.domElement.removeEventListener('mousemove', _mousemove, false);
    this.domElement.removeEventListener('mouseup', _mouseup, false);
    window.removeEventListener('keydown', _keydown, false);
    window.removeEventListener('keyup', _keyup, false);
  };

  var _mousemove = bind(this, this.mousemove);

  var _mousedown = bind(this, this.mousedown);

  var _mouseup = bind(this, this.mouseup);

  var _keydown = bind(this, this.keydown);

  var _keyup = bind(this, this.keyup);

  this.domElement.addEventListener('contextmenu', contextmenu, false);
  this.domElement.addEventListener('mousemove', _mousemove, false);
  this.domElement.addEventListener('mousedown', _mousedown, false);
  this.domElement.addEventListener('mouseup', _mouseup, false);
  window.addEventListener('keydown', _keydown, false);
  window.addEventListener('keyup', _keyup, false);
  this.updateMovementVector();
  this.updateRotationVector();
};

/***/ }),

/***/ "./node_modules/three/examples/js/controls/MapControls.js":
/*!****************************************************************!*\
  !*** ./node_modules/three/examples/js/controls/MapControls.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 * @author moroine / https://github.com/moroine
 */
// This set of controls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
// This is very similar to OrbitControls, another set of touch behavior
//
//    Orbit - right mouse / touch: two-finger rotate
//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
//    Pan - left mouse, or arrow keys / touch: one-finger move
THREE.MapControls = function (object, domElement) {
  this.object = object;
  this.domElement = domElement !== undefined ? domElement : document; // Set to false to disable this control

  this.enabled = true; // "target" sets the location of focus, where the object orbits around

  this.target = new THREE.Vector3(); // How far you can dolly in and out ( PerspectiveCamera only )

  this.minDistance = 0;
  this.maxDistance = Infinity; // How far you can zoom in and out ( OrthographicCamera only )

  this.minZoom = 0;
  this.maxZoom = Infinity; // How far you can orbit vertically, upper and lower limits.
  // Range is 0 to Math.PI radians.

  this.minPolarAngle = 0; // radians

  this.maxPolarAngle = Math.PI; // radians
  // How far you can orbit horizontally, upper and lower limits.
  // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].

  this.minAzimuthAngle = -Infinity; // radians

  this.maxAzimuthAngle = Infinity; // radians
  // Set to true to enable damping (inertia)
  // If damping is enabled, you must call controls.update() in your animation loop

  this.enableDamping = false;
  this.dampingFactor = 0.25; // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
  // Set to false to disable zooming

  this.enableZoom = true;
  this.zoomSpeed = 1.0; // Set to false to disable rotating

  this.enableRotate = true;
  this.rotateSpeed = 1.0; // Set to false to disable panning

  this.enablePan = true;
  this.panSpeed = 1.0;
  this.screenSpacePanning = false; // if true, pan in screen-space

  this.keyPanSpeed = 7.0; // pixels moved per arrow key push
  // Set to true to automatically rotate around the target
  // If auto-rotate is enabled, you must call controls.update() in your animation loop

  this.autoRotate = false;
  this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60
  // Set to false to disable use of the keys

  this.enableKeys = true; // The four arrow keys

  this.keys = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    BOTTOM: 40
  }; // Mouse buttons

  this.mouseButtons = {
    ORBIT: THREE.MOUSE.RIGHT,
    ZOOM: THREE.MOUSE.MIDDLE,
    PAN: THREE.MOUSE.LEFT
  }; // for reset

  this.target0 = this.target.clone();
  this.position0 = this.object.position.clone();
  this.zoom0 = this.object.zoom; //
  // public methods
  //

  this.getPolarAngle = function () {
    return spherical.phi;
  };

  this.getAzimuthalAngle = function () {
    return spherical.theta;
  };

  this.saveState = function () {
    scope.target0.copy(scope.target);
    scope.position0.copy(scope.object.position);
    scope.zoom0 = scope.object.zoom;
  };

  this.reset = function () {
    scope.target.copy(scope.target0);
    scope.object.position.copy(scope.position0);
    scope.object.zoom = scope.zoom0;
    scope.object.updateProjectionMatrix();
    scope.dispatchEvent(changeEvent);
    scope.update();
    state = STATE.NONE;
  }; // this method is exposed, but perhaps it would be better if we can make it private...


  this.update = function () {
    var offset = new THREE.Vector3(); // so camera.up is the orbit axis

    var quat = new THREE.Quaternion().setFromUnitVectors(object.up, new THREE.Vector3(0, 1, 0));
    var quatInverse = quat.clone().inverse();
    var lastPosition = new THREE.Vector3();
    var lastQuaternion = new THREE.Quaternion();
    return function update() {
      var position = scope.object.position;
      offset.copy(position).sub(scope.target); // rotate offset to "y-axis-is-up" space

      offset.applyQuaternion(quat); // angle from z-axis around y-axis

      spherical.setFromVector3(offset);

      if (scope.autoRotate && state === STATE.NONE) {
        rotateLeft(getAutoRotationAngle());
      }

      spherical.theta += sphericalDelta.theta;
      spherical.phi += sphericalDelta.phi; // restrict theta to be between desired limits

      spherical.theta = Math.max(scope.minAzimuthAngle, Math.min(scope.maxAzimuthAngle, spherical.theta)); // restrict phi to be between desired limits

      spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, spherical.phi));
      spherical.makeSafe();
      spherical.radius *= scale; // restrict radius to be between desired limits

      spherical.radius = Math.max(scope.minDistance, Math.min(scope.maxDistance, spherical.radius)); // move target to panned location

      scope.target.add(panOffset);
      offset.setFromSpherical(spherical); // rotate offset back to "camera-up-vector-is-up" space

      offset.applyQuaternion(quatInverse);
      position.copy(scope.target).add(offset);
      scope.object.lookAt(scope.target);

      if (scope.enableDamping === true) {
        sphericalDelta.theta *= 1 - scope.dampingFactor;
        sphericalDelta.phi *= 1 - scope.dampingFactor;
        panOffset.multiplyScalar(1 - scope.dampingFactor);
      } else {
        sphericalDelta.set(0, 0, 0);
        panOffset.set(0, 0, 0);
      }

      scale = 1; // update condition is:
      // min(camera displacement, camera rotation in radians)^2 > EPS
      // using small-angle approximation cos(x/2) = 1 - x^2 / 8

      if (zoomChanged || lastPosition.distanceToSquared(scope.object.position) > EPS || 8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS) {
        scope.dispatchEvent(changeEvent);
        lastPosition.copy(scope.object.position);
        lastQuaternion.copy(scope.object.quaternion);
        zoomChanged = false;
        return true;
      }

      return false;
    };
  }();

  this.dispose = function () {
    scope.domElement.removeEventListener('contextmenu', onContextMenu, false);
    scope.domElement.removeEventListener('mousedown', onMouseDown, false);
    scope.domElement.removeEventListener('wheel', onMouseWheel, false);
    scope.domElement.removeEventListener('touchstart', onTouchStart, false);
    scope.domElement.removeEventListener('touchend', onTouchEnd, false);
    scope.domElement.removeEventListener('touchmove', onTouchMove, false);
    document.removeEventListener('mousemove', onMouseMove, false);
    document.removeEventListener('mouseup', onMouseUp, false);
    window.removeEventListener('keydown', onKeyDown, false); //scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?
  }; //
  // internals
  //


  var scope = this;
  var changeEvent = {
    type: 'change'
  };
  var startEvent = {
    type: 'start'
  };
  var endEvent = {
    type: 'end'
  };
  var STATE = {
    NONE: 0,
    ROTATE_UP: 1,
    ROTATE_LEFT: 2,
    ROTATE: 3,
    // ROTATE_UP | ROTATE_LEFT
    DOLLY: 4,
    DOLLY_ROTATE: 7,
    // ROTATE | DOLLY
    PAN: 8,
    DOLLY_PAN: 12 // DOLLY | PAN

  };
  var state = STATE.NONE;
  var EPS = 0.000001; // current position in spherical coordinates

  var spherical = new THREE.Spherical();
  var sphericalDelta = new THREE.Spherical();
  var scale = 1;
  var panOffset = new THREE.Vector3();
  var zoomChanged = false;
  var rotateStart = new THREE.Vector2();
  var rotateStart2 = new THREE.Vector2();
  var rotateEnd = new THREE.Vector2();
  var rotateEnd2 = new THREE.Vector2();
  var rotateDelta = new THREE.Vector2();
  var rotateDelta2 = new THREE.Vector2();
  var rotateDeltaStartFingers = new THREE.Vector2();
  var rotateDeltaEndFingers = new THREE.Vector2();
  var panStart = new THREE.Vector2();
  var panEnd = new THREE.Vector2();
  var panDelta = new THREE.Vector2();
  var dollyStart = new THREE.Vector2();
  var dollyEnd = new THREE.Vector2();
  var dollyDelta = new THREE.Vector2();

  function getAutoRotationAngle() {
    return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
  }

  function getZoomScale() {
    return Math.pow(0.95, scope.zoomSpeed);
  }

  function rotateLeft(angle) {
    sphericalDelta.theta -= angle;
  }

  function rotateUp(angle) {
    sphericalDelta.phi -= angle;
  }

  var panLeft = function () {
    var v = new THREE.Vector3();
    return function panLeft(distance, objectMatrix) {
      v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix

      v.multiplyScalar(-distance);
      panOffset.add(v);
    };
  }();

  var panUp = function () {
    var v = new THREE.Vector3();
    return function panUp(distance, objectMatrix) {
      if (scope.screenSpacePanning === true) {
        v.setFromMatrixColumn(objectMatrix, 1);
      } else {
        v.setFromMatrixColumn(objectMatrix, 0);
        v.crossVectors(scope.object.up, v);
      }

      v.multiplyScalar(distance);
      panOffset.add(v);
    };
  }(); // deltaX and deltaY are in pixels; right and down are positive


  var pan = function () {
    var offset = new THREE.Vector3();
    return function pan(deltaX, deltaY) {
      var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

      if (scope.object.isPerspectiveCamera) {
        // perspective
        var position = scope.object.position;
        offset.copy(position).sub(scope.target);
        var targetDistance = offset.length(); // half of the fov is center to top of screen

        targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180.0); // we use only clientHeight here so aspect ratio does not distort speed

        panLeft(2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix);
        panUp(2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix);
      } else if (scope.object.isOrthographicCamera) {
        // orthographic
        panLeft(deltaX * (scope.object.right - scope.object.left) / scope.object.zoom / element.clientWidth, scope.object.matrix);
        panUp(deltaY * (scope.object.top - scope.object.bottom) / scope.object.zoom / element.clientHeight, scope.object.matrix);
      } else {
        // camera neither orthographic nor perspective
        console.warn('WARNING: MapControls.js encountered an unknown camera type - pan disabled.');
        scope.enablePan = false;
      }
    };
  }();

  function dollyIn(dollyScale) {
    if (scope.object.isPerspectiveCamera) {
      scale /= dollyScale;
    } else if (scope.object.isOrthographicCamera) {
      scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom * dollyScale));
      scope.object.updateProjectionMatrix();
      zoomChanged = true;
    } else {
      console.warn('WARNING: MapControls.js encountered an unknown camera type - dolly/zoom disabled.');
      scope.enableZoom = false;
    }
  }

  function dollyOut(dollyScale) {
    if (scope.object.isPerspectiveCamera) {
      scale *= dollyScale;
    } else if (scope.object.isOrthographicCamera) {
      scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / dollyScale));
      scope.object.updateProjectionMatrix();
      zoomChanged = true;
    } else {
      console.warn('WARNING: MapControls.js encountered an unknown camera type - dolly/zoom disabled.');
      scope.enableZoom = false;
    }
  } //
  // event callbacks - update the object state
  //


  function handleMouseDownRotate(event) {
    //console.log( 'handleMouseDownRotate' );
    rotateStart.set(event.clientX, event.clientY);
  }

  function handleMouseDownDolly(event) {
    //console.log( 'handleMouseDownDolly' );
    dollyStart.set(event.clientX, event.clientY);
  }

  function handleMouseDownPan(event) {
    //console.log( 'handleMouseDownPan' );
    panStart.set(event.clientX, event.clientY);
  }

  function handleMouseMoveRotate(event) {
    //console.log( 'handleMouseMoveRotate' );
    rotateEnd.set(event.clientX, event.clientY);
    rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);
    var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
    rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight); // yes, height

    rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
    rotateStart.copy(rotateEnd);
    scope.update();
  }

  function handleMouseMoveDolly(event) {
    //console.log( 'handleMouseMoveDolly' );
    dollyEnd.set(event.clientX, event.clientY);
    dollyDelta.subVectors(dollyEnd, dollyStart);

    if (dollyDelta.y > 0) {
      dollyIn(getZoomScale());
    } else if (dollyDelta.y < 0) {
      dollyOut(getZoomScale());
    }

    dollyStart.copy(dollyEnd);
    scope.update();
  }

  function handleMouseMovePan(event) {
    //console.log( 'handleMouseMovePan' );
    panEnd.set(event.clientX, event.clientY);
    panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);
    pan(panDelta.x, panDelta.y);
    panStart.copy(panEnd);
    scope.update();
  }

  function handleMouseUp(event) {// console.log( 'handleMouseUp' );
  }

  function handleMouseWheel(event) {
    // console.log( 'handleMouseWheel' );
    if (event.deltaY < 0) {
      dollyOut(getZoomScale());
    } else if (event.deltaY > 0) {
      dollyIn(getZoomScale());
    }

    scope.update();
  }

  function handleKeyDown(event) {
    //console.log( 'handleKeyDown' );
    switch (event.keyCode) {
      case scope.keys.UP:
        pan(0, scope.keyPanSpeed);
        scope.update();
        break;

      case scope.keys.BOTTOM:
        pan(0, -scope.keyPanSpeed);
        scope.update();
        break;

      case scope.keys.LEFT:
        pan(scope.keyPanSpeed, 0);
        scope.update();
        break;

      case scope.keys.RIGHT:
        pan(-scope.keyPanSpeed, 0);
        scope.update();
        break;
    }
  }

  function handleTouchStartRotate(event) {
    // console.log( 'handleTouchStartRotate' );
    // First finger
    rotateStart.set(event.touches[0].pageX, event.touches[0].pageY); // Second finger

    rotateStart2.set(event.touches[1].pageX, event.touches[1].pageY);
  }

  function handleTouchStartDolly(event) {
    if (scope.enableZoom) {
      // console.log( 'handleTouchStartDolly' );
      var dx = event.touches[0].pageX - event.touches[1].pageX;
      var dy = event.touches[0].pageY - event.touches[1].pageY;
      var distance = Math.sqrt(dx * dx + dy * dy);
      dollyStart.set(0, distance);
    }
  }

  function handleTouchStartPan(event) {
    if (scope.enablePan) {
      // console.log( 'handleTouchStartPan' );
      panStart.set(event.touches[0].pageX, event.touches[0].pageY);
    }
  }

  function handleTouchMoveRotate(event) {
    if (scope.enableRotate === false) return;
    if ((state & STATE.ROTATE) === 0) return; // First finger

    rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY); // Second finger

    rotateEnd2.set(event.touches[1].pageX, event.touches[1].pageY);
    rotateDelta.subVectors(rotateEnd, rotateStart);
    rotateDelta2.subVectors(rotateEnd2, rotateStart2);
    rotateDeltaStartFingers.subVectors(rotateStart2, rotateStart);
    rotateDeltaEndFingers.subVectors(rotateEnd2, rotateEnd);

    if (isRotateUp()) {
      var element = scope.domElement === document ? scope.domElement.body : scope.domElement; // rotating up and down along whole screen attempts to go 360, but limited to 180

      rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight); // Start rotateUp ==> disable all movement to prevent flickering

      state = STATE.ROTATE_UP;
    } else if ((state & STATE.ROTATE_LEFT) !== 0) {
      rotateLeft((rotateDeltaStartFingers.angle() - rotateDeltaEndFingers.angle()) * scope.rotateSpeed);
    }

    rotateStart.copy(rotateEnd);
    rotateStart2.copy(rotateEnd2);
  }

  function isRotateUp() {
    // At start, does the two fingers are aligned horizontally
    if (!isHorizontal(rotateDeltaStartFingers)) {
      return false;
    } // At end, does the two fingers are aligned horizontally


    if (!isHorizontal(rotateDeltaEndFingers)) {
      return false;
    } // does the first finger moved vertically between start and end


    if (!isVertical(rotateDelta)) {
      return false;
    } // does the second finger moved vertically between start and end


    if (!isVertical(rotateDelta2)) {
      return false;
    } // Does the two finger moved in the same direction (prevent moving one finger vertically up while the other goes down)


    return rotateDelta.dot(rotateDelta2) > 0;
  }

  var isHorizontal = function () {
    var precision = Math.sin(Math.PI / 6);
    return function isHorizontal(vector) {
      return Math.abs(Math.sin(vector.angle())) < precision;
    };
  }();

  var isVertical = function () {
    var precision = Math.cos(Math.PI / 2 - Math.PI / 6);
    return function isVertical(vector) {
      return Math.abs(Math.cos(vector.angle())) < precision;
    };
  }();

  function handleTouchMoveDolly(event) {
    if (scope.enableZoom === false) return;
    if ((state & STATE.DOLLY) === 0) return; // console.log( 'handleTouchMoveDolly' );

    var dx = event.touches[0].pageX - event.touches[1].pageX;
    var dy = event.touches[0].pageY - event.touches[1].pageY;
    var distance = Math.sqrt(dx * dx + dy * dy);
    dollyEnd.set(0, distance);
    dollyDelta.set(0, Math.pow(dollyEnd.y / dollyStart.y, scope.zoomSpeed));
    dollyIn(dollyDelta.y);
    dollyStart.copy(dollyEnd);
  }

  function handleTouchMovePan(event) {
    if (scope.enablePan === false) return;
    if ((state & STATE.PAN) === 0) return; // console.log( 'handleTouchMovePan' );

    panEnd.set(event.touches[0].pageX, event.touches[0].pageY);
    panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);
    pan(panDelta.x, panDelta.y);
    panStart.copy(panEnd);
  }

  function handleTouchEnd(event) {} //console.log( 'handleTouchEnd' );
  //
  // event handlers - FSM: listen for events and reset state
  //


  function onMouseDown(event) {
    if (scope.enabled === false) return;
    event.preventDefault();

    switch (event.button) {
      case scope.mouseButtons.ORBIT:
        if (scope.enableRotate === false) return;
        handleMouseDownRotate(event);
        state = STATE.ROTATE;
        break;

      case scope.mouseButtons.ZOOM:
        if (scope.enableZoom === false) return;
        handleMouseDownDolly(event);
        state = STATE.DOLLY;
        break;

      case scope.mouseButtons.PAN:
        if (scope.enablePan === false) return;
        handleMouseDownPan(event);
        state = STATE.PAN;
        break;
    }

    if (state !== STATE.NONE) {
      document.addEventListener('mousemove', onMouseMove, false);
      document.addEventListener('mouseup', onMouseUp, false);
      scope.dispatchEvent(startEvent);
    }
  }

  function onMouseMove(event) {
    if (scope.enabled === false) return;
    event.preventDefault();

    switch (state) {
      case STATE.ROTATE:
        if (scope.enableRotate === false) return;
        handleMouseMoveRotate(event);
        break;

      case STATE.DOLLY:
        if (scope.enableZoom === false) return;
        handleMouseMoveDolly(event);
        break;

      case STATE.PAN:
        if (scope.enablePan === false) return;
        handleMouseMovePan(event);
        break;
    }
  }

  function onMouseUp(event) {
    if (scope.enabled === false) return;
    handleMouseUp(event);
    document.removeEventListener('mousemove', onMouseMove, false);
    document.removeEventListener('mouseup', onMouseUp, false);
    scope.dispatchEvent(endEvent);
    state = STATE.NONE;
  }

  function onMouseWheel(event) {
    if (scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE && state !== STATE.ROTATE) return;
    event.preventDefault();
    event.stopPropagation();
    scope.dispatchEvent(startEvent);
    handleMouseWheel(event);
    scope.dispatchEvent(endEvent);
  }

  function onKeyDown(event) {
    if (scope.enabled === false || scope.enableKeys === false || scope.enablePan === false) return;
    handleKeyDown(event);
  }

  function onTouchStart(event) {
    if (scope.enabled === false) return;
    event.preventDefault();

    switch (event.touches.length) {
      case 1:
        // one-fingered touch: pan
        if (scope.enablePan === false) return;
        handleTouchStartPan(event);
        state = STATE.PAN;
        break;

      case 2:
        // two-fingered touch: rotate-dolly
        if (scope.enableZoom === false && scope.enableRotate === false) return;
        handleTouchStartRotate(event);
        handleTouchStartDolly(event);
        state = STATE.DOLLY_ROTATE;
        break;

      default:
        state = STATE.NONE;
    }

    if (state !== STATE.NONE) {
      scope.dispatchEvent(startEvent);
    }
  }

  function onTouchMove(event) {
    if (scope.enabled === false) return;
    event.preventDefault();
    event.stopPropagation();

    switch (event.touches.length) {
      case 1:
        // one-fingered touch: pan
        if (scope.enablePan === false) return;
        if (state !== STATE.PAN) return; // is this needed?

        handleTouchMovePan(event);
        scope.update();
        break;

      case 2:
        // two-fingered touch: rotate-dolly
        if (scope.enableZoom === false && scope.enableRotate === false) return;
        if ((state & STATE.DOLLY_ROTATE) === 0) return; // is this needed?

        handleTouchMoveRotate(event);
        handleTouchMoveDolly(event);
        scope.update();
        break;

      default:
        state = STATE.NONE;
    }
  }

  function onTouchEnd(event) {
    if (scope.enabled === false) return;
    handleTouchEnd(event);
    scope.dispatchEvent(endEvent);
    state = STATE.NONE;
  }

  function onContextMenu(event) {
    if (scope.enabled === false) return;
    event.preventDefault();
  } //


  scope.domElement.addEventListener('contextmenu', onContextMenu, false);
  scope.domElement.addEventListener('mousedown', onMouseDown, false);
  scope.domElement.addEventListener('wheel', onMouseWheel, false);
  scope.domElement.addEventListener('touchstart', onTouchStart, false);
  scope.domElement.addEventListener('touchend', onTouchEnd, false);
  scope.domElement.addEventListener('touchmove', onTouchMove, false);
  window.addEventListener('keydown', onKeyDown, false); // force an update at start

  this.update();
};

THREE.MapControls.prototype = Object.create(THREE.EventDispatcher.prototype);
THREE.MapControls.prototype.constructor = THREE.MapControls;
Object.defineProperties(THREE.MapControls.prototype, {
  center: {
    get: function () {
      console.warn('THREE.MapControls: .center has been renamed to .target');
      return this.target;
    }
  },
  // backward compatibility
  noZoom: {
    get: function () {
      console.warn('THREE.MapControls: .noZoom has been deprecated. Use .enableZoom instead.');
      return !this.enableZoom;
    },
    set: function (value) {
      console.warn('THREE.MapControls: .noZoom has been deprecated. Use .enableZoom instead.');
      this.enableZoom = !value;
    }
  },
  noRotate: {
    get: function () {
      console.warn('THREE.MapControls: .noRotate has been deprecated. Use .enableRotate instead.');
      return !this.enableRotate;
    },
    set: function (value) {
      console.warn('THREE.MapControls: .noRotate has been deprecated. Use .enableRotate instead.');
      this.enableRotate = !value;
    }
  },
  noPan: {
    get: function () {
      console.warn('THREE.MapControls: .noPan has been deprecated. Use .enablePan instead.');
      return !this.enablePan;
    },
    set: function (value) {
      console.warn('THREE.MapControls: .noPan has been deprecated. Use .enablePan instead.');
      this.enablePan = !value;
    }
  },
  noKeys: {
    get: function () {
      console.warn('THREE.MapControls: .noKeys has been deprecated. Use .enableKeys instead.');
      return !this.enableKeys;
    },
    set: function (value) {
      console.warn('THREE.MapControls: .noKeys has been deprecated. Use .enableKeys instead.');
      this.enableKeys = !value;
    }
  },
  staticMoving: {
    get: function () {
      console.warn('THREE.MapControls: .staticMoving has been deprecated. Use .enableDamping instead.');
      return !this.enableDamping;
    },
    set: function (value) {
      console.warn('THREE.MapControls: .staticMoving has been deprecated. Use .enableDamping instead.');
      this.enableDamping = !value;
    }
  },
  dynamicDampingFactor: {
    get: function () {
      console.warn('THREE.MapControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
      return this.dampingFactor;
    },
    set: function (value) {
      console.warn('THREE.MapControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
      this.dampingFactor = value;
    }
  }
});

/***/ }),

/***/ "./node_modules/three/examples/js/controls/OrbitControls.js":
/*!******************************************************************!*\
  !*** ./node_modules/three/examples/js/controls/OrbitControls.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @author qiao / https://github.com/qiao
 * @author mrdoob / http://mrdoob.com
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author erich666 / http://erichaines.com
 */
// This set of controls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
//
//    Orbit - left mouse / touch: one-finger move
//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
//    Pan - right mouse, or arrow keys / touch: two-finger move
THREE.OrbitControls = function (object, domElement) {
  this.object = object;
  this.domElement = domElement !== undefined ? domElement : document; // Set to false to disable this control

  this.enabled = true; // "target" sets the location of focus, where the object orbits around

  this.target = new THREE.Vector3(); // How far you can dolly in and out ( PerspectiveCamera only )

  this.minDistance = 0;
  this.maxDistance = Infinity; // How far you can zoom in and out ( OrthographicCamera only )

  this.minZoom = 0;
  this.maxZoom = Infinity; // How far you can orbit vertically, upper and lower limits.
  // Range is 0 to Math.PI radians.

  this.minPolarAngle = 0; // radians

  this.maxPolarAngle = Math.PI; // radians
  // How far you can orbit horizontally, upper and lower limits.
  // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].

  this.minAzimuthAngle = -Infinity; // radians

  this.maxAzimuthAngle = Infinity; // radians
  // Set to true to enable damping (inertia)
  // If damping is enabled, you must call controls.update() in your animation loop

  this.enableDamping = false;
  this.dampingFactor = 0.25; // This option actually enables dollying in and out; left as "zoom" for backwards compatibility.
  // Set to false to disable zooming

  this.enableZoom = true;
  this.zoomSpeed = 1.0; // Set to false to disable rotating

  this.enableRotate = true;
  this.rotateSpeed = 1.0; // Set to false to disable panning

  this.enablePan = true;
  this.panSpeed = 1.0;
  this.screenSpacePanning = false; // if true, pan in screen-space

  this.keyPanSpeed = 7.0; // pixels moved per arrow key push
  // Set to true to automatically rotate around the target
  // If auto-rotate is enabled, you must call controls.update() in your animation loop

  this.autoRotate = false;
  this.autoRotateSpeed = 2.0; // 30 seconds per round when fps is 60
  // Set to false to disable use of the keys

  this.enableKeys = true; // The four arrow keys

  this.keys = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    BOTTOM: 40
  }; // Mouse buttons

  this.mouseButtons = {
    ORBIT: THREE.MOUSE.LEFT,
    ZOOM: THREE.MOUSE.MIDDLE,
    PAN: THREE.MOUSE.RIGHT
  }; // for reset

  this.target0 = this.target.clone();
  this.position0 = this.object.position.clone();
  this.zoom0 = this.object.zoom; //
  // public methods
  //

  this.getPolarAngle = function () {
    return spherical.phi;
  };

  this.getAzimuthalAngle = function () {
    return spherical.theta;
  };

  this.saveState = function () {
    scope.target0.copy(scope.target);
    scope.position0.copy(scope.object.position);
    scope.zoom0 = scope.object.zoom;
  };

  this.reset = function () {
    scope.target.copy(scope.target0);
    scope.object.position.copy(scope.position0);
    scope.object.zoom = scope.zoom0;
    scope.object.updateProjectionMatrix();
    scope.dispatchEvent(changeEvent);
    scope.update();
    state = STATE.NONE;
  }; // this method is exposed, but perhaps it would be better if we can make it private...


  this.update = function () {
    var offset = new THREE.Vector3(); // so camera.up is the orbit axis

    var quat = new THREE.Quaternion().setFromUnitVectors(object.up, new THREE.Vector3(0, 1, 0));
    var quatInverse = quat.clone().inverse();
    var lastPosition = new THREE.Vector3();
    var lastQuaternion = new THREE.Quaternion();
    return function update() {
      var position = scope.object.position;
      offset.copy(position).sub(scope.target); // rotate offset to "y-axis-is-up" space

      offset.applyQuaternion(quat); // angle from z-axis around y-axis

      spherical.setFromVector3(offset);

      if (scope.autoRotate && state === STATE.NONE) {
        rotateLeft(getAutoRotationAngle());
      }

      spherical.theta += sphericalDelta.theta;
      spherical.phi += sphericalDelta.phi; // restrict theta to be between desired limits

      spherical.theta = Math.max(scope.minAzimuthAngle, Math.min(scope.maxAzimuthAngle, spherical.theta)); // restrict phi to be between desired limits

      spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, spherical.phi));
      spherical.makeSafe();
      spherical.radius *= scale; // restrict radius to be between desired limits

      spherical.radius = Math.max(scope.minDistance, Math.min(scope.maxDistance, spherical.radius)); // move target to panned location

      scope.target.add(panOffset);
      offset.setFromSpherical(spherical); // rotate offset back to "camera-up-vector-is-up" space

      offset.applyQuaternion(quatInverse);
      position.copy(scope.target).add(offset);
      scope.object.lookAt(scope.target);

      if (scope.enableDamping === true) {
        sphericalDelta.theta *= 1 - scope.dampingFactor;
        sphericalDelta.phi *= 1 - scope.dampingFactor;
        panOffset.multiplyScalar(1 - scope.dampingFactor);
      } else {
        sphericalDelta.set(0, 0, 0);
        panOffset.set(0, 0, 0);
      }

      scale = 1; // update condition is:
      // min(camera displacement, camera rotation in radians)^2 > EPS
      // using small-angle approximation cos(x/2) = 1 - x^2 / 8

      if (zoomChanged || lastPosition.distanceToSquared(scope.object.position) > EPS || 8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS) {
        scope.dispatchEvent(changeEvent);
        lastPosition.copy(scope.object.position);
        lastQuaternion.copy(scope.object.quaternion);
        zoomChanged = false;
        return true;
      }

      return false;
    };
  }();

  this.dispose = function () {
    scope.domElement.removeEventListener('contextmenu', onContextMenu, false);
    scope.domElement.removeEventListener('mousedown', onMouseDown, false);
    scope.domElement.removeEventListener('wheel', onMouseWheel, false);
    scope.domElement.removeEventListener('touchstart', onTouchStart, false);
    scope.domElement.removeEventListener('touchend', onTouchEnd, false);
    scope.domElement.removeEventListener('touchmove', onTouchMove, false);
    document.removeEventListener('mousemove', onMouseMove, false);
    document.removeEventListener('mouseup', onMouseUp, false);
    window.removeEventListener('keydown', onKeyDown, false); //scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?
  }; //
  // internals
  //


  var scope = this;
  var changeEvent = {
    type: 'change'
  };
  var startEvent = {
    type: 'start'
  };
  var endEvent = {
    type: 'end'
  };
  var STATE = {
    NONE: -1,
    ROTATE: 0,
    DOLLY: 1,
    PAN: 2,
    TOUCH_ROTATE: 3,
    TOUCH_DOLLY_PAN: 4
  };
  var state = STATE.NONE;
  var EPS = 0.000001; // current position in spherical coordinates

  var spherical = new THREE.Spherical();
  var sphericalDelta = new THREE.Spherical();
  var scale = 1;
  var panOffset = new THREE.Vector3();
  var zoomChanged = false;
  var rotateStart = new THREE.Vector2();
  var rotateEnd = new THREE.Vector2();
  var rotateDelta = new THREE.Vector2();
  var panStart = new THREE.Vector2();
  var panEnd = new THREE.Vector2();
  var panDelta = new THREE.Vector2();
  var dollyStart = new THREE.Vector2();
  var dollyEnd = new THREE.Vector2();
  var dollyDelta = new THREE.Vector2();

  function getAutoRotationAngle() {
    return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
  }

  function getZoomScale() {
    return Math.pow(0.95, scope.zoomSpeed);
  }

  function rotateLeft(angle) {
    sphericalDelta.theta -= angle;
  }

  function rotateUp(angle) {
    sphericalDelta.phi -= angle;
  }

  var panLeft = function () {
    var v = new THREE.Vector3();
    return function panLeft(distance, objectMatrix) {
      v.setFromMatrixColumn(objectMatrix, 0); // get X column of objectMatrix

      v.multiplyScalar(-distance);
      panOffset.add(v);
    };
  }();

  var panUp = function () {
    var v = new THREE.Vector3();
    return function panUp(distance, objectMatrix) {
      if (scope.screenSpacePanning === true) {
        v.setFromMatrixColumn(objectMatrix, 1);
      } else {
        v.setFromMatrixColumn(objectMatrix, 0);
        v.crossVectors(scope.object.up, v);
      }

      v.multiplyScalar(distance);
      panOffset.add(v);
    };
  }(); // deltaX and deltaY are in pixels; right and down are positive


  var pan = function () {
    var offset = new THREE.Vector3();
    return function pan(deltaX, deltaY) {
      var element = scope.domElement === document ? scope.domElement.body : scope.domElement;

      if (scope.object.isPerspectiveCamera) {
        // perspective
        var position = scope.object.position;
        offset.copy(position).sub(scope.target);
        var targetDistance = offset.length(); // half of the fov is center to top of screen

        targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180.0); // we use only clientHeight here so aspect ratio does not distort speed

        panLeft(2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix);
        panUp(2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix);
      } else if (scope.object.isOrthographicCamera) {
        // orthographic
        panLeft(deltaX * (scope.object.right - scope.object.left) / scope.object.zoom / element.clientWidth, scope.object.matrix);
        panUp(deltaY * (scope.object.top - scope.object.bottom) / scope.object.zoom / element.clientHeight, scope.object.matrix);
      } else {
        // camera neither orthographic nor perspective
        console.warn('WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.');
        scope.enablePan = false;
      }
    };
  }();

  function dollyIn(dollyScale) {
    if (scope.object.isPerspectiveCamera) {
      scale /= dollyScale;
    } else if (scope.object.isOrthographicCamera) {
      scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom * dollyScale));
      scope.object.updateProjectionMatrix();
      zoomChanged = true;
    } else {
      console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
      scope.enableZoom = false;
    }
  }

  function dollyOut(dollyScale) {
    if (scope.object.isPerspectiveCamera) {
      scale *= dollyScale;
    } else if (scope.object.isOrthographicCamera) {
      scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / dollyScale));
      scope.object.updateProjectionMatrix();
      zoomChanged = true;
    } else {
      console.warn('WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.');
      scope.enableZoom = false;
    }
  } //
  // event callbacks - update the object state
  //


  function handleMouseDownRotate(event) {
    //console.log( 'handleMouseDownRotate' );
    rotateStart.set(event.clientX, event.clientY);
  }

  function handleMouseDownDolly(event) {
    //console.log( 'handleMouseDownDolly' );
    dollyStart.set(event.clientX, event.clientY);
  }

  function handleMouseDownPan(event) {
    //console.log( 'handleMouseDownPan' );
    panStart.set(event.clientX, event.clientY);
  }

  function handleMouseMoveRotate(event) {
    //console.log( 'handleMouseMoveRotate' );
    rotateEnd.set(event.clientX, event.clientY);
    rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);
    var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
    rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight); // yes, height

    rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
    rotateStart.copy(rotateEnd);
    scope.update();
  }

  function handleMouseMoveDolly(event) {
    //console.log( 'handleMouseMoveDolly' );
    dollyEnd.set(event.clientX, event.clientY);
    dollyDelta.subVectors(dollyEnd, dollyStart);

    if (dollyDelta.y > 0) {
      dollyIn(getZoomScale());
    } else if (dollyDelta.y < 0) {
      dollyOut(getZoomScale());
    }

    dollyStart.copy(dollyEnd);
    scope.update();
  }

  function handleMouseMovePan(event) {
    //console.log( 'handleMouseMovePan' );
    panEnd.set(event.clientX, event.clientY);
    panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);
    pan(panDelta.x, panDelta.y);
    panStart.copy(panEnd);
    scope.update();
  }

  function handleMouseUp(event) {// console.log( 'handleMouseUp' );
  }

  function handleMouseWheel(event) {
    // console.log( 'handleMouseWheel' );
    if (event.deltaY < 0) {
      dollyOut(getZoomScale());
    } else if (event.deltaY > 0) {
      dollyIn(getZoomScale());
    }

    scope.update();
  }

  function handleKeyDown(event) {
    //console.log( 'handleKeyDown' );
    switch (event.keyCode) {
      case scope.keys.UP:
        pan(0, scope.keyPanSpeed);
        scope.update();
        break;

      case scope.keys.BOTTOM:
        pan(0, -scope.keyPanSpeed);
        scope.update();
        break;

      case scope.keys.LEFT:
        pan(scope.keyPanSpeed, 0);
        scope.update();
        break;

      case scope.keys.RIGHT:
        pan(-scope.keyPanSpeed, 0);
        scope.update();
        break;
    }
  }

  function handleTouchStartRotate(event) {
    //console.log( 'handleTouchStartRotate' );
    rotateStart.set(event.touches[0].pageX, event.touches[0].pageY);
  }

  function handleTouchStartDollyPan(event) {
    //console.log( 'handleTouchStartDollyPan' );
    if (scope.enableZoom) {
      var dx = event.touches[0].pageX - event.touches[1].pageX;
      var dy = event.touches[0].pageY - event.touches[1].pageY;
      var distance = Math.sqrt(dx * dx + dy * dy);
      dollyStart.set(0, distance);
    }

    if (scope.enablePan) {
      var x = 0.5 * (event.touches[0].pageX + event.touches[1].pageX);
      var y = 0.5 * (event.touches[0].pageY + event.touches[1].pageY);
      panStart.set(x, y);
    }
  }

  function handleTouchMoveRotate(event) {
    //console.log( 'handleTouchMoveRotate' );
    rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY);
    rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);
    var element = scope.domElement === document ? scope.domElement.body : scope.domElement;
    rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight); // yes, height

    rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
    rotateStart.copy(rotateEnd);
    scope.update();
  }

  function handleTouchMoveDollyPan(event) {
    //console.log( 'handleTouchMoveDollyPan' );
    if (scope.enableZoom) {
      var dx = event.touches[0].pageX - event.touches[1].pageX;
      var dy = event.touches[0].pageY - event.touches[1].pageY;
      var distance = Math.sqrt(dx * dx + dy * dy);
      dollyEnd.set(0, distance);
      dollyDelta.set(0, Math.pow(dollyEnd.y / dollyStart.y, scope.zoomSpeed));
      dollyIn(dollyDelta.y);
      dollyStart.copy(dollyEnd);
    }

    if (scope.enablePan) {
      var x = 0.5 * (event.touches[0].pageX + event.touches[1].pageX);
      var y = 0.5 * (event.touches[0].pageY + event.touches[1].pageY);
      panEnd.set(x, y);
      panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);
      pan(panDelta.x, panDelta.y);
      panStart.copy(panEnd);
    }

    scope.update();
  }

  function handleTouchEnd(event) {} //console.log( 'handleTouchEnd' );
  //
  // event handlers - FSM: listen for events and reset state
  //


  function onMouseDown(event) {
    if (scope.enabled === false) return;
    event.preventDefault();

    switch (event.button) {
      case scope.mouseButtons.ORBIT:
        if (scope.enableRotate === false) return;
        handleMouseDownRotate(event);
        state = STATE.ROTATE;
        break;

      case scope.mouseButtons.ZOOM:
        if (scope.enableZoom === false) return;
        handleMouseDownDolly(event);
        state = STATE.DOLLY;
        break;

      case scope.mouseButtons.PAN:
        if (scope.enablePan === false) return;
        handleMouseDownPan(event);
        state = STATE.PAN;
        break;
    }

    if (state !== STATE.NONE) {
      document.addEventListener('mousemove', onMouseMove, false);
      document.addEventListener('mouseup', onMouseUp, false);
      scope.dispatchEvent(startEvent);
    }
  }

  function onMouseMove(event) {
    if (scope.enabled === false) return;
    event.preventDefault();

    switch (state) {
      case STATE.ROTATE:
        if (scope.enableRotate === false) return;
        handleMouseMoveRotate(event);
        break;

      case STATE.DOLLY:
        if (scope.enableZoom === false) return;
        handleMouseMoveDolly(event);
        break;

      case STATE.PAN:
        if (scope.enablePan === false) return;
        handleMouseMovePan(event);
        break;
    }
  }

  function onMouseUp(event) {
    if (scope.enabled === false) return;
    handleMouseUp(event);
    document.removeEventListener('mousemove', onMouseMove, false);
    document.removeEventListener('mouseup', onMouseUp, false);
    scope.dispatchEvent(endEvent);
    state = STATE.NONE;
  }

  function onMouseWheel(event) {
    if (scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE && state !== STATE.ROTATE) return;
    event.preventDefault();
    event.stopPropagation();
    scope.dispatchEvent(startEvent);
    handleMouseWheel(event);
    scope.dispatchEvent(endEvent);
  }

  function onKeyDown(event) {
    if (scope.enabled === false || scope.enableKeys === false || scope.enablePan === false) return;
    handleKeyDown(event);
  }

  function onTouchStart(event) {
    if (scope.enabled === false) return;
    event.preventDefault();

    switch (event.touches.length) {
      case 1:
        // one-fingered touch: rotate
        if (scope.enableRotate === false) return;
        handleTouchStartRotate(event);
        state = STATE.TOUCH_ROTATE;
        break;

      case 2:
        // two-fingered touch: dolly-pan
        if (scope.enableZoom === false && scope.enablePan === false) return;
        handleTouchStartDollyPan(event);
        state = STATE.TOUCH_DOLLY_PAN;
        break;

      default:
        state = STATE.NONE;
    }

    if (state !== STATE.NONE) {
      scope.dispatchEvent(startEvent);
    }
  }

  function onTouchMove(event) {
    if (scope.enabled === false) return;
    event.preventDefault();
    event.stopPropagation();

    switch (event.touches.length) {
      case 1:
        // one-fingered touch: rotate
        if (scope.enableRotate === false) return;
        if (state !== STATE.TOUCH_ROTATE) return; // is this needed?

        handleTouchMoveRotate(event);
        break;

      case 2:
        // two-fingered touch: dolly-pan
        if (scope.enableZoom === false && scope.enablePan === false) return;
        if (state !== STATE.TOUCH_DOLLY_PAN) return; // is this needed?

        handleTouchMoveDollyPan(event);
        break;

      default:
        state = STATE.NONE;
    }
  }

  function onTouchEnd(event) {
    if (scope.enabled === false) return;
    handleTouchEnd(event);
    scope.dispatchEvent(endEvent);
    state = STATE.NONE;
  }

  function onContextMenu(event) {
    if (scope.enabled === false) return;
    event.preventDefault();
  } //


  scope.domElement.addEventListener('contextmenu', onContextMenu, false);
  scope.domElement.addEventListener('mousedown', onMouseDown, false);
  scope.domElement.addEventListener('wheel', onMouseWheel, false);
  scope.domElement.addEventListener('touchstart', onTouchStart, false);
  scope.domElement.addEventListener('touchend', onTouchEnd, false);
  scope.domElement.addEventListener('touchmove', onTouchMove, false);
  window.addEventListener('keydown', onKeyDown, false); // force an update at start

  this.update();
};

THREE.OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype);
THREE.OrbitControls.prototype.constructor = THREE.OrbitControls;
Object.defineProperties(THREE.OrbitControls.prototype, {
  center: {
    get: function () {
      console.warn('THREE.OrbitControls: .center has been renamed to .target');
      return this.target;
    }
  },
  // backward compatibility
  noZoom: {
    get: function () {
      console.warn('THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
      return !this.enableZoom;
    },
    set: function (value) {
      console.warn('THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead.');
      this.enableZoom = !value;
    }
  },
  noRotate: {
    get: function () {
      console.warn('THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
      return !this.enableRotate;
    },
    set: function (value) {
      console.warn('THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead.');
      this.enableRotate = !value;
    }
  },
  noPan: {
    get: function () {
      console.warn('THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
      return !this.enablePan;
    },
    set: function (value) {
      console.warn('THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead.');
      this.enablePan = !value;
    }
  },
  noKeys: {
    get: function () {
      console.warn('THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
      return !this.enableKeys;
    },
    set: function (value) {
      console.warn('THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead.');
      this.enableKeys = !value;
    }
  },
  staticMoving: {
    get: function () {
      console.warn('THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');
      return !this.enableDamping;
    },
    set: function (value) {
      console.warn('THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead.');
      this.enableDamping = !value;
    }
  },
  dynamicDampingFactor: {
    get: function () {
      console.warn('THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
      return this.dampingFactor;
    },
    set: function (value) {
      console.warn('THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.');
      this.dampingFactor = value;
    }
  }
});

/***/ }),

/***/ "./node_modules/three/examples/js/controls/PointerLockControls.js":
/*!************************************************************************!*\
  !*** ./node_modules/three/examples/js/controls/PointerLockControls.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.PointerLockControls = function (camera) {
  var scope = this;
  camera.rotation.set(0, 0, 0);
  var pitchObject = new THREE.Object3D();
  pitchObject.add(camera);
  var yawObject = new THREE.Object3D();
  yawObject.position.y = 10;
  yawObject.add(pitchObject);
  var PI_2 = Math.PI / 2;

  var onMouseMove = function (event) {
    if (scope.enabled === false) return;
    var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
    yawObject.rotation.y -= movementX * 0.002;
    pitchObject.rotation.x -= movementY * 0.002;
    pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, pitchObject.rotation.x));
  };

  this.dispose = function () {
    document.removeEventListener('mousemove', onMouseMove, false);
  };

  document.addEventListener('mousemove', onMouseMove, false);
  this.enabled = false;

  this.getObject = function () {
    return yawObject;
  };

  this.getDirection = function () {
    // assumes the camera itself is not rotated
    var direction = new THREE.Vector3(0, 0, -1);
    var rotation = new THREE.Euler(0, 0, 0, 'YXZ');
    return function (v) {
      rotation.set(pitchObject.rotation.x, yawObject.rotation.y, 0);
      v.copy(direction).applyEuler(rotation);
      return v;
    };
  }();
};

/***/ }),

/***/ "./node_modules/three/examples/js/loaders/MTLLoader.js":
/*!*************************************************************!*\
  !*** ./node_modules/three/examples/js/loaders/MTLLoader.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Loads a Wavefront .mtl file specifying materials
 *
 * @author angelxuanchang
 */
THREE.MTLLoader = function (manager) {
  this.manager = manager !== undefined ? manager : THREE.DefaultLoadingManager;
};

THREE.MTLLoader.prototype = {
  constructor: THREE.MTLLoader,

  /**
   * Loads and parses a MTL asset from a URL.
   *
   * @param {String} url - URL to the MTL file.
   * @param {Function} [onLoad] - Callback invoked with the loaded object.
   * @param {Function} [onProgress] - Callback for download progress.
   * @param {Function} [onError] - Callback for download errors.
   *
   * @see setPath setTexturePath
   *
   * @note In order for relative texture references to resolve correctly
   * you must call setPath and/or setTexturePath explicitly prior to load.
   */
  load: function (url, onLoad, onProgress, onError) {
    var scope = this;
    var loader = new THREE.FileLoader(this.manager);
    loader.setPath(this.path);
    loader.load(url, function (text) {
      onLoad(scope.parse(text));
    }, onProgress, onError);
  },

  /**
   * Set base path for resolving references.
   * If set this path will be prepended to each loaded and found reference.
   *
   * @see setTexturePath
   * @param {String} path
   * @return {THREE.MTLLoader}
   *
   * @example
   *     mtlLoader.setPath( 'assets/obj/' );
   *     mtlLoader.load( 'my.mtl', ... );
   */
  setPath: function (path) {
    this.path = path;
    return this;
  },

  /**
   * Set base path for resolving texture references.
   * If set this path will be prepended found texture reference.
   * If not set and setPath is, it will be used as texture base path.
   *
   * @see setPath
   * @param {String} path
   * @return {THREE.MTLLoader}
   *
   * @example
   *     mtlLoader.setPath( 'assets/obj/' );
   *     mtlLoader.setTexturePath( 'assets/textures/' );
   *     mtlLoader.load( 'my.mtl', ... );
   */
  setTexturePath: function (path) {
    this.texturePath = path;
    return this;
  },
  setBaseUrl: function (path) {
    console.warn('THREE.MTLLoader: .setBaseUrl() is deprecated. Use .setTexturePath( path ) for texture path or .setPath( path ) for general base path instead.');
    return this.setTexturePath(path);
  },
  setCrossOrigin: function (value) {
    this.crossOrigin = value;
    return this;
  },
  setMaterialOptions: function (value) {
    this.materialOptions = value;
    return this;
  },

  /**
   * Parses a MTL file.
   *
   * @param {String} text - Content of MTL file
   * @return {THREE.MTLLoader.MaterialCreator}
   *
   * @see setPath setTexturePath
   *
   * @note In order for relative texture references to resolve correctly
   * you must call setPath and/or setTexturePath explicitly prior to parse.
   */
  parse: function (text) {
    var lines = text.split('\n');
    var info = {};
    var delimiter_pattern = /\s+/;
    var materialsInfo = {};

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      line = line.trim();

      if (line.length === 0 || line.charAt(0) === '#') {
        // Blank line or comment ignore
        continue;
      }

      var pos = line.indexOf(' ');
      var key = pos >= 0 ? line.substring(0, pos) : line;
      key = key.toLowerCase();
      var value = pos >= 0 ? line.substring(pos + 1) : '';
      value = value.trim();

      if (key === 'newmtl') {
        // New material
        info = {
          name: value
        };
        materialsInfo[value] = info;
      } else if (info) {
        if (key === 'ka' || key === 'kd' || key === 'ks') {
          var ss = value.split(delimiter_pattern, 3);
          info[key] = [parseFloat(ss[0]), parseFloat(ss[1]), parseFloat(ss[2])];
        } else {
          info[key] = value;
        }
      }
    }

    var materialCreator = new THREE.MTLLoader.MaterialCreator(this.texturePath || this.path, this.materialOptions);
    materialCreator.setCrossOrigin(this.crossOrigin);
    materialCreator.setManager(this.manager);
    materialCreator.setMaterials(materialsInfo);
    return materialCreator;
  }
};
/**
 * Create a new THREE-MTLLoader.MaterialCreator
 * @param baseUrl - Url relative to which textures are loaded
 * @param options - Set of options on how to construct the materials
 *                  side: Which side to apply the material
 *                        THREE.FrontSide (default), THREE.BackSide, THREE.DoubleSide
 *                  wrap: What type of wrapping to apply for textures
 *                        THREE.RepeatWrapping (default), THREE.ClampToEdgeWrapping, THREE.MirroredRepeatWrapping
 *                  normalizeRGB: RGBs need to be normalized to 0-1 from 0-255
 *                                Default: false, assumed to be already normalized
 *                  ignoreZeroRGBs: Ignore values of RGBs (Ka,Kd,Ks) that are all 0's
 *                                  Default: false
 * @constructor
 */

THREE.MTLLoader.MaterialCreator = function (baseUrl, options) {
  this.baseUrl = baseUrl || '';
  this.options = options;
  this.materialsInfo = {};
  this.materials = {};
  this.materialsArray = [];
  this.nameLookup = {};
  this.side = this.options && this.options.side ? this.options.side : THREE.FrontSide;
  this.wrap = this.options && this.options.wrap ? this.options.wrap : THREE.RepeatWrapping;
};

THREE.MTLLoader.MaterialCreator.prototype = {
  constructor: THREE.MTLLoader.MaterialCreator,
  crossOrigin: 'anonymous',
  setCrossOrigin: function (value) {
    this.crossOrigin = value;
    return this;
  },
  setManager: function (value) {
    this.manager = value;
  },
  setMaterials: function (materialsInfo) {
    this.materialsInfo = this.convert(materialsInfo);
    this.materials = {};
    this.materialsArray = [];
    this.nameLookup = {};
  },
  convert: function (materialsInfo) {
    if (!this.options) return materialsInfo;
    var converted = {};

    for (var mn in materialsInfo) {
      // Convert materials info into normalized form based on options
      var mat = materialsInfo[mn];
      var covmat = {};
      converted[mn] = covmat;

      for (var prop in mat) {
        var save = true;
        var value = mat[prop];
        var lprop = prop.toLowerCase();

        switch (lprop) {
          case 'kd':
          case 'ka':
          case 'ks':
            // Diffuse color (color under white light) using RGB values
            if (this.options && this.options.normalizeRGB) {
              value = [value[0] / 255, value[1] / 255, value[2] / 255];
            }

            if (this.options && this.options.ignoreZeroRGBs) {
              if (value[0] === 0 && value[1] === 0 && value[2] === 0) {
                // ignore
                save = false;
              }
            }

            break;

          default:
            break;
        }

        if (save) {
          covmat[lprop] = value;
        }
      }
    }

    return converted;
  },
  preload: function () {
    for (var mn in this.materialsInfo) {
      this.create(mn);
    }
  },
  getIndex: function (materialName) {
    return this.nameLookup[materialName];
  },
  getAsArray: function () {
    var index = 0;

    for (var mn in this.materialsInfo) {
      this.materialsArray[index] = this.create(mn);
      this.nameLookup[mn] = index;
      index++;
    }

    return this.materialsArray;
  },
  create: function (materialName) {
    if (this.materials[materialName] === undefined) {
      this.createMaterial_(materialName);
    }

    return this.materials[materialName];
  },
  createMaterial_: function (materialName) {
    // Create material
    var scope = this;
    var mat = this.materialsInfo[materialName];
    var params = {
      name: materialName,
      side: this.side
    };

    function resolveURL(baseUrl, url) {
      if (typeof url !== 'string' || url === '') return ''; // Absolute URL

      if (/^https?:\/\//i.test(url)) return url;
      return baseUrl + url;
    }

    function setMapForType(mapType, value) {
      if (params[mapType]) return; // Keep the first encountered texture

      var texParams = scope.getTextureParams(value, params);
      var map = scope.loadTexture(resolveURL(scope.baseUrl, texParams.url));
      map.repeat.copy(texParams.scale);
      map.offset.copy(texParams.offset);
      map.wrapS = scope.wrap;
      map.wrapT = scope.wrap;
      params[mapType] = map;
    }

    for (var prop in mat) {
      var value = mat[prop];
      var n;
      if (value === '') continue;

      switch (prop.toLowerCase()) {
        // Ns is material specular exponent
        case 'kd':
          // Diffuse color (color under white light) using RGB values
          params.color = new THREE.Color().fromArray(value);
          break;

        case 'ks':
          // Specular color (color when light is reflected from shiny surface) using RGB values
          params.specular = new THREE.Color().fromArray(value);
          break;

        case 'map_kd':
          // Diffuse texture map
          setMapForType("map", value);
          break;

        case 'map_ks':
          // Specular map
          setMapForType("specularMap", value);
          break;

        case 'norm':
          setMapForType("normalMap", value);
          break;

        case 'map_bump':
        case 'bump':
          // Bump texture map
          setMapForType("bumpMap", value);
          break;

        case 'ns':
          // The specular exponent (defines the focus of the specular highlight)
          // A high exponent results in a tight, concentrated highlight. Ns values normally range from 0 to 1000.
          params.shininess = parseFloat(value);
          break;

        case 'd':
          n = parseFloat(value);

          if (n < 1) {
            params.opacity = n;
            params.transparent = true;
          }

          break;

        case 'tr':
          n = parseFloat(value);
          if (this.options && this.options.invertTrProperty) n = 1 - n;

          if (n > 0) {
            params.opacity = 1 - n;
            params.transparent = true;
          }

          break;

        default:
          break;
      }
    }

    this.materials[materialName] = new THREE.MeshPhongMaterial(params);
    return this.materials[materialName];
  },
  getTextureParams: function (value, matParams) {
    var texParams = {
      scale: new THREE.Vector2(1, 1),
      offset: new THREE.Vector2(0, 0)
    };
    var items = value.split(/\s+/);
    var pos;
    pos = items.indexOf('-bm');

    if (pos >= 0) {
      matParams.bumpScale = parseFloat(items[pos + 1]);
      items.splice(pos, 2);
    }

    pos = items.indexOf('-s');

    if (pos >= 0) {
      texParams.scale.set(parseFloat(items[pos + 1]), parseFloat(items[pos + 2]));
      items.splice(pos, 4); // we expect 3 parameters here!
    }

    pos = items.indexOf('-o');

    if (pos >= 0) {
      texParams.offset.set(parseFloat(items[pos + 1]), parseFloat(items[pos + 2]));
      items.splice(pos, 4); // we expect 3 parameters here!
    }

    texParams.url = items.join(' ').trim();
    return texParams;
  },
  loadTexture: function (url, mapping, onLoad, onProgress, onError) {
    var texture;
    var loader = THREE.Loader.Handlers.get(url);
    var manager = this.manager !== undefined ? this.manager : THREE.DefaultLoadingManager;

    if (loader === null) {
      loader = new THREE.TextureLoader(manager);
    }

    if (loader.setCrossOrigin) loader.setCrossOrigin(this.crossOrigin);
    texture = loader.load(url, onLoad, onProgress, onError);
    if (mapping !== undefined) texture.mapping = mapping;
    return texture;
  }
};

/***/ }),

/***/ "./node_modules/three/examples/js/loaders/OBJLoader.js":
/*!*************************************************************!*\
  !*** ./node_modules/three/examples/js/loaders/OBJLoader.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @author mrdoob / http://mrdoob.com/
 */
THREE.OBJLoader = function () {
  // o object_name | g group_name
  var object_pattern = /^[og]\s*(.+)?/; // mtllib file_reference

  var material_library_pattern = /^mtllib /; // usemtl material_name

  var material_use_pattern = /^usemtl /;

  function ParserState() {
    var state = {
      objects: [],
      object: {},
      vertices: [],
      normals: [],
      colors: [],
      uvs: [],
      materialLibraries: [],
      startObject: function (name, fromDeclaration) {
        // If the current object (initial from reset) is not from a g/o declaration in the parsed
        // file. We need to use it for the first parsed g/o to keep things in sync.
        if (this.object && this.object.fromDeclaration === false) {
          this.object.name = name;
          this.object.fromDeclaration = fromDeclaration !== false;
          return;
        }

        var previousMaterial = this.object && typeof this.object.currentMaterial === 'function' ? this.object.currentMaterial() : undefined;

        if (this.object && typeof this.object._finalize === 'function') {
          this.object._finalize(true);
        }

        this.object = {
          name: name || '',
          fromDeclaration: fromDeclaration !== false,
          geometry: {
            vertices: [],
            normals: [],
            colors: [],
            uvs: []
          },
          materials: [],
          smooth: true,
          startMaterial: function (name, libraries) {
            var previous = this._finalize(false); // New usemtl declaration overwrites an inherited material, except if faces were declared
            // after the material, then it must be preserved for proper MultiMaterial continuation.


            if (previous && (previous.inherited || previous.groupCount <= 0)) {
              this.materials.splice(previous.index, 1);
            }

            var material = {
              index: this.materials.length,
              name: name || '',
              mtllib: Array.isArray(libraries) && libraries.length > 0 ? libraries[libraries.length - 1] : '',
              smooth: previous !== undefined ? previous.smooth : this.smooth,
              groupStart: previous !== undefined ? previous.groupEnd : 0,
              groupEnd: -1,
              groupCount: -1,
              inherited: false,
              clone: function (index) {
                var cloned = {
                  index: typeof index === 'number' ? index : this.index,
                  name: this.name,
                  mtllib: this.mtllib,
                  smooth: this.smooth,
                  groupStart: 0,
                  groupEnd: -1,
                  groupCount: -1,
                  inherited: false
                };
                cloned.clone = this.clone.bind(cloned);
                return cloned;
              }
            };
            this.materials.push(material);
            return material;
          },
          currentMaterial: function () {
            if (this.materials.length > 0) {
              return this.materials[this.materials.length - 1];
            }

            return undefined;
          },
          _finalize: function (end) {
            var lastMultiMaterial = this.currentMaterial();

            if (lastMultiMaterial && lastMultiMaterial.groupEnd === -1) {
              lastMultiMaterial.groupEnd = this.geometry.vertices.length / 3;
              lastMultiMaterial.groupCount = lastMultiMaterial.groupEnd - lastMultiMaterial.groupStart;
              lastMultiMaterial.inherited = false;
            } // Ignore objects tail materials if no face declarations followed them before a new o/g started.


            if (end && this.materials.length > 1) {
              for (var mi = this.materials.length - 1; mi >= 0; mi--) {
                if (this.materials[mi].groupCount <= 0) {
                  this.materials.splice(mi, 1);
                }
              }
            } // Guarantee at least one empty material, this makes the creation later more straight forward.


            if (end && this.materials.length === 0) {
              this.materials.push({
                name: '',
                smooth: this.smooth
              });
            }

            return lastMultiMaterial;
          }
        }; // Inherit previous objects material.
        // Spec tells us that a declared material must be set to all objects until a new material is declared.
        // If a usemtl declaration is encountered while this new object is being parsed, it will
        // overwrite the inherited material. Exception being that there was already face declarations
        // to the inherited material, then it will be preserved for proper MultiMaterial continuation.

        if (previousMaterial && previousMaterial.name && typeof previousMaterial.clone === 'function') {
          var declared = previousMaterial.clone(0);
          declared.inherited = true;
          this.object.materials.push(declared);
        }

        this.objects.push(this.object);
      },
      finalize: function () {
        if (this.object && typeof this.object._finalize === 'function') {
          this.object._finalize(true);
        }
      },
      parseVertexIndex: function (value, len) {
        var index = parseInt(value, 10);
        return (index >= 0 ? index - 1 : index + len / 3) * 3;
      },
      parseNormalIndex: function (value, len) {
        var index = parseInt(value, 10);
        return (index >= 0 ? index - 1 : index + len / 3) * 3;
      },
      parseUVIndex: function (value, len) {
        var index = parseInt(value, 10);
        return (index >= 0 ? index - 1 : index + len / 2) * 2;
      },
      addVertex: function (a, b, c) {
        var src = this.vertices;
        var dst = this.object.geometry.vertices;
        dst.push(src[a + 0], src[a + 1], src[a + 2]);
        dst.push(src[b + 0], src[b + 1], src[b + 2]);
        dst.push(src[c + 0], src[c + 1], src[c + 2]);
      },
      addVertexPoint: function (a) {
        var src = this.vertices;
        var dst = this.object.geometry.vertices;
        dst.push(src[a + 0], src[a + 1], src[a + 2]);
      },
      addVertexLine: function (a) {
        var src = this.vertices;
        var dst = this.object.geometry.vertices;
        dst.push(src[a + 0], src[a + 1], src[a + 2]);
      },
      addNormal: function (a, b, c) {
        var src = this.normals;
        var dst = this.object.geometry.normals;
        dst.push(src[a + 0], src[a + 1], src[a + 2]);
        dst.push(src[b + 0], src[b + 1], src[b + 2]);
        dst.push(src[c + 0], src[c + 1], src[c + 2]);
      },
      addColor: function (a, b, c) {
        var src = this.colors;
        var dst = this.object.geometry.colors;
        dst.push(src[a + 0], src[a + 1], src[a + 2]);
        dst.push(src[b + 0], src[b + 1], src[b + 2]);
        dst.push(src[c + 0], src[c + 1], src[c + 2]);
      },
      addUV: function (a, b, c) {
        var src = this.uvs;
        var dst = this.object.geometry.uvs;
        dst.push(src[a + 0], src[a + 1]);
        dst.push(src[b + 0], src[b + 1]);
        dst.push(src[c + 0], src[c + 1]);
      },
      addUVLine: function (a) {
        var src = this.uvs;
        var dst = this.object.geometry.uvs;
        dst.push(src[a + 0], src[a + 1]);
      },
      addFace: function (a, b, c, ua, ub, uc, na, nb, nc) {
        var vLen = this.vertices.length;
        var ia = this.parseVertexIndex(a, vLen);
        var ib = this.parseVertexIndex(b, vLen);
        var ic = this.parseVertexIndex(c, vLen);
        this.addVertex(ia, ib, ic);

        if (ua !== undefined && ua !== '') {
          var uvLen = this.uvs.length;
          ia = this.parseUVIndex(ua, uvLen);
          ib = this.parseUVIndex(ub, uvLen);
          ic = this.parseUVIndex(uc, uvLen);
          this.addUV(ia, ib, ic);
        }

        if (na !== undefined && na !== '') {
          // Normals are many times the same. If so, skip function call and parseInt.
          var nLen = this.normals.length;
          ia = this.parseNormalIndex(na, nLen);
          ib = na === nb ? ia : this.parseNormalIndex(nb, nLen);
          ic = na === nc ? ia : this.parseNormalIndex(nc, nLen);
          this.addNormal(ia, ib, ic);
        }

        if (this.colors.length > 0) {
          this.addColor(ia, ib, ic);
        }
      },
      addPointGeometry: function (vertices) {
        this.object.geometry.type = 'Points';
        var vLen = this.vertices.length;

        for (var vi = 0, l = vertices.length; vi < l; vi++) {
          this.addVertexPoint(this.parseVertexIndex(vertices[vi], vLen));
        }
      },
      addLineGeometry: function (vertices, uvs) {
        this.object.geometry.type = 'Line';
        var vLen = this.vertices.length;
        var uvLen = this.uvs.length;

        for (var vi = 0, l = vertices.length; vi < l; vi++) {
          this.addVertexLine(this.parseVertexIndex(vertices[vi], vLen));
        }

        for (var uvi = 0, l = uvs.length; uvi < l; uvi++) {
          this.addUVLine(this.parseUVIndex(uvs[uvi], uvLen));
        }
      }
    };
    state.startObject('', false);
    return state;
  } //


  function OBJLoader(manager) {
    this.manager = manager !== undefined ? manager : THREE.DefaultLoadingManager;
    this.materials = null;
  }

  OBJLoader.prototype = {
    constructor: OBJLoader,
    load: function (url, onLoad, onProgress, onError) {
      var scope = this;
      var loader = new THREE.FileLoader(scope.manager);
      loader.setPath(this.path);
      loader.load(url, function (text) {
        onLoad(scope.parse(text));
      }, onProgress, onError);
    },
    setPath: function (value) {
      this.path = value;
      return this;
    },
    setMaterials: function (materials) {
      this.materials = materials;
      return this;
    },
    parse: function (text) {
      console.time('OBJLoader');
      var state = new ParserState();

      if (text.indexOf('\r\n') !== -1) {
        // This is faster than String.split with regex that splits on both
        text = text.replace(/\r\n/g, '\n');
      }

      if (text.indexOf('\\\n') !== -1) {
        // join lines separated by a line continuation character (\)
        text = text.replace(/\\\n/g, '');
      }

      var lines = text.split('\n');
      var line = '',
          lineFirstChar = '';
      var lineLength = 0;
      var result = []; // Faster to just trim left side of the line. Use if available.

      var trimLeft = typeof ''.trimLeft === 'function';

      for (var i = 0, l = lines.length; i < l; i++) {
        line = lines[i];
        line = trimLeft ? line.trimLeft() : line.trim();
        lineLength = line.length;
        if (lineLength === 0) continue;
        lineFirstChar = line.charAt(0); // @todo invoke passed in handler if any

        if (lineFirstChar === '#') continue;

        if (lineFirstChar === 'v') {
          var data = line.split(/\s+/);

          switch (data[0]) {
            case 'v':
              state.vertices.push(parseFloat(data[1]), parseFloat(data[2]), parseFloat(data[3]));

              if (data.length === 8) {
                state.colors.push(parseFloat(data[4]), parseFloat(data[5]), parseFloat(data[6]));
              }

              break;

            case 'vn':
              state.normals.push(parseFloat(data[1]), parseFloat(data[2]), parseFloat(data[3]));
              break;

            case 'vt':
              state.uvs.push(parseFloat(data[1]), parseFloat(data[2]));
              break;
          }
        } else if (lineFirstChar === 'f') {
          var lineData = line.substr(1).trim();
          var vertexData = lineData.split(/\s+/);
          var faceVertices = []; // Parse the face vertex data into an easy to work with format

          for (var j = 0, jl = vertexData.length; j < jl; j++) {
            var vertex = vertexData[j];

            if (vertex.length > 0) {
              var vertexParts = vertex.split('/');
              faceVertices.push(vertexParts);
            }
          } // Draw an edge between the first vertex and all subsequent vertices to form an n-gon


          var v1 = faceVertices[0];

          for (var j = 1, jl = faceVertices.length - 1; j < jl; j++) {
            var v2 = faceVertices[j];
            var v3 = faceVertices[j + 1];
            state.addFace(v1[0], v2[0], v3[0], v1[1], v2[1], v3[1], v1[2], v2[2], v3[2]);
          }
        } else if (lineFirstChar === 'l') {
          var lineParts = line.substring(1).trim().split(" ");
          var lineVertices = [],
              lineUVs = [];

          if (line.indexOf("/") === -1) {
            lineVertices = lineParts;
          } else {
            for (var li = 0, llen = lineParts.length; li < llen; li++) {
              var parts = lineParts[li].split("/");
              if (parts[0] !== "") lineVertices.push(parts[0]);
              if (parts[1] !== "") lineUVs.push(parts[1]);
            }
          }

          state.addLineGeometry(lineVertices, lineUVs);
        } else if (lineFirstChar === 'p') {
          var lineData = line.substr(1).trim();
          var pointData = lineData.split(" ");
          state.addPointGeometry(pointData);
        } else if ((result = object_pattern.exec(line)) !== null) {
          // o object_name
          // or
          // g group_name
          // WORKAROUND: https://bugs.chromium.org/p/v8/issues/detail?id=2869
          // var name = result[ 0 ].substr( 1 ).trim();
          var name = (" " + result[0].substr(1).trim()).substr(1);
          state.startObject(name);
        } else if (material_use_pattern.test(line)) {
          // material
          state.object.startMaterial(line.substring(7).trim(), state.materialLibraries);
        } else if (material_library_pattern.test(line)) {
          // mtl file
          state.materialLibraries.push(line.substring(7).trim());
        } else if (lineFirstChar === 's') {
          result = line.split(' '); // smooth shading
          // @todo Handle files that have varying smooth values for a set of faces inside one geometry,
          // but does not define a usemtl for each face set.
          // This should be detected and a dummy material created (later MultiMaterial and geometry groups).
          // This requires some care to not create extra material on each smooth value for "normal" obj files.
          // where explicit usemtl defines geometry groups.
          // Example asset: examples/models/obj/cerberus/Cerberus.obj

          /*
           * http://paulbourke.net/dataformats/obj/
           * or
           * http://www.cs.utah.edu/~boulos/cs3505/obj_spec.pdf
           *
           * From chapter "Grouping" Syntax explanation "s group_number":
           * "group_number is the smoothing group number. To turn off smoothing groups, use a value of 0 or off.
           * Polygonal elements use group numbers to put elements in different smoothing groups. For free-form
           * surfaces, smoothing groups are either turned on or off; there is no difference between values greater
           * than 0."
           */

          if (result.length > 1) {
            var value = result[1].trim().toLowerCase();
            state.object.smooth = value !== '0' && value !== 'off';
          } else {
            // ZBrush can produce "s" lines #11707
            state.object.smooth = true;
          }

          var material = state.object.currentMaterial();
          if (material) material.smooth = state.object.smooth;
        } else {
          // Handle null terminated files without exception
          if (line === '\0') continue;
          throw new Error('THREE.OBJLoader: Unexpected line: "' + line + '"');
        }
      }

      state.finalize();
      var container = new THREE.Group();
      container.materialLibraries = [].concat(state.materialLibraries);

      for (var i = 0, l = state.objects.length; i < l; i++) {
        var object = state.objects[i];
        var geometry = object.geometry;
        var materials = object.materials;
        var isLine = geometry.type === 'Line';
        var isPoints = geometry.type === 'Points';
        var hasVertexColors = false; // Skip o/g line declarations that did not follow with any faces

        if (geometry.vertices.length === 0) continue;
        var buffergeometry = new THREE.BufferGeometry();
        buffergeometry.addAttribute('position', new THREE.Float32BufferAttribute(geometry.vertices, 3));

        if (geometry.normals.length > 0) {
          buffergeometry.addAttribute('normal', new THREE.Float32BufferAttribute(geometry.normals, 3));
        } else {
          buffergeometry.computeVertexNormals();
        }

        if (geometry.colors.length > 0) {
          hasVertexColors = true;
          buffergeometry.addAttribute('color', new THREE.Float32BufferAttribute(geometry.colors, 3));
        }

        if (geometry.uvs.length > 0) {
          buffergeometry.addAttribute('uv', new THREE.Float32BufferAttribute(geometry.uvs, 2));
        } // Create materials


        var createdMaterials = [];

        for (var mi = 0, miLen = materials.length; mi < miLen; mi++) {
          var sourceMaterial = materials[mi];
          var material = undefined;

          if (this.materials !== null) {
            material = this.materials.create(sourceMaterial.name); // mtl etc. loaders probably can't create line materials correctly, copy properties to a line material.

            if (isLine && material && !(material instanceof THREE.LineBasicMaterial)) {
              var materialLine = new THREE.LineBasicMaterial();
              materialLine.copy(material);
              materialLine.lights = false; // TOFIX

              material = materialLine;
            } else if (isPoints && material && !(material instanceof THREE.PointsMaterial)) {
              var materialPoints = new THREE.PointsMaterial({
                size: 10,
                sizeAttenuation: false
              });
              materialLine.copy(material);
              material = materialPoints;
            }
          }

          if (!material) {
            if (isLine) {
              material = new THREE.LineBasicMaterial();
            } else if (isPoints) {
              material = new THREE.PointsMaterial({
                size: 1,
                sizeAttenuation: false
              });
            } else {
              material = new THREE.MeshPhongMaterial();
            }

            material.name = sourceMaterial.name;
          }

          material.flatShading = sourceMaterial.smooth ? false : true;
          material.vertexColors = hasVertexColors ? THREE.VertexColors : THREE.NoColors;
          createdMaterials.push(material);
        } // Create mesh


        var mesh;

        if (createdMaterials.length > 1) {
          for (var mi = 0, miLen = materials.length; mi < miLen; mi++) {
            var sourceMaterial = materials[mi];
            buffergeometry.addGroup(sourceMaterial.groupStart, sourceMaterial.groupCount, mi);
          }

          if (isLine) {
            mesh = new THREE.LineSegments(buffergeometry, createdMaterials);
          } else if (isPoints) {
            mesh = new THREE.Points(buffergeometry, createdMaterials);
          } else {
            mesh = new THREE.Mesh(buffergeometry, createdMaterials);
          }
        } else {
          if (isLine) {
            mesh = new THREE.LineSegments(buffergeometry, createdMaterials[0]);
          } else if (isPoints) {
            mesh = new THREE.Points(buffergeometry, createdMaterials[0]);
          } else {
            mesh = new THREE.Mesh(buffergeometry, createdMaterials[0]);
          }
        }

        mesh.name = object.name;
        container.add(mesh);
      }

      console.timeEnd('OBJLoader');
      return container;
    }
  };
  return OBJLoader;
}();

/***/ }),

/***/ "./node_modules/three/examples/js/objects/Sky.js":
/*!*******************************************************!*\
  !*** ./node_modules/three/examples/js/objects/Sky.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @author zz85 / https://github.com/zz85
 *
 * Based on "A Practical Analytic Model for Daylight"
 * aka The Preetham Model, the de facto standard analytic skydome model
 * http://www.cs.utah.edu/~shirley/papers/sunsky/sunsky.pdf
 *
 * First implemented by Simon Wallner
 * http://www.simonwallner.at/projects/atmospheric-scattering
 *
 * Improved by Martin Upitis
 * http://blenderartists.org/forum/showthread.php?245954-preethams-sky-impementation-HDR
 *
 * Three.js integration by zz85 http://twitter.com/blurspline
*/
THREE.Sky = function () {
  var shader = THREE.Sky.SkyShader;
  var material = new THREE.ShaderMaterial({
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: THREE.UniformsUtils.clone(shader.uniforms),
    side: THREE.BackSide
  });
  THREE.Mesh.call(this, new THREE.BoxBufferGeometry(1, 1, 1), material);
};

THREE.Sky.prototype = Object.create(THREE.Mesh.prototype);
THREE.Sky.SkyShader = {
  uniforms: {
    luminance: {
      value: 1
    },
    turbidity: {
      value: 2
    },
    rayleigh: {
      value: 1
    },
    mieCoefficient: {
      value: 0.005
    },
    mieDirectionalG: {
      value: 0.8
    },
    sunPosition: {
      value: new THREE.Vector3()
    }
  },
  vertexShader: ['uniform vec3 sunPosition;', 'uniform float rayleigh;', 'uniform float turbidity;', 'uniform float mieCoefficient;', 'varying vec3 vWorldPosition;', 'varying vec3 vSunDirection;', 'varying float vSunfade;', 'varying vec3 vBetaR;', 'varying vec3 vBetaM;', 'varying float vSunE;', 'const vec3 up = vec3( 0.0, 1.0, 0.0 );', // constants for atmospheric scattering
  'const float e = 2.71828182845904523536028747135266249775724709369995957;', 'const float pi = 3.141592653589793238462643383279502884197169;', // wavelength of used primaries, according to preetham
  'const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );', // this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
  // (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
  'const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );', // mie stuff
  // K coefficient for the primaries
  'const float v = 4.0;', 'const vec3 K = vec3( 0.686, 0.678, 0.666 );', // MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
  'const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );', // earth shadow hack
  // cutoffAngle = pi / 1.95;
  'const float cutoffAngle = 1.6110731556870734;', 'const float steepness = 1.5;', 'const float EE = 1000.0;', 'float sunIntensity( float zenithAngleCos ) {', '	zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );', '	return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );', '}', 'vec3 totalMie( float T ) {', '	float c = ( 0.2 * T ) * 10E-18;', '	return 0.434 * c * MieConst;', '}', 'void main() {', '	vec4 worldPosition = modelMatrix * vec4( position, 1.0 );', '	vWorldPosition = worldPosition.xyz;', '	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );', '	gl_Position.z = gl_Position.w;', // set z to camera.far
  '	vSunDirection = normalize( sunPosition );', '	vSunE = sunIntensity( dot( vSunDirection, up ) );', '	vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );', '	float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );', // extinction (absorbtion + out scattering)
  // rayleigh coefficients
  '	vBetaR = totalRayleigh * rayleighCoefficient;', // mie coefficients
  '	vBetaM = totalMie( turbidity ) * mieCoefficient;', '}'].join('\n'),
  fragmentShader: ['varying vec3 vWorldPosition;', 'varying vec3 vSunDirection;', 'varying float vSunfade;', 'varying vec3 vBetaR;', 'varying vec3 vBetaM;', 'varying float vSunE;', 'uniform float luminance;', 'uniform float mieDirectionalG;', 'const vec3 cameraPos = vec3( 0.0, 0.0, 0.0 );', // constants for atmospheric scattering
  'const float pi = 3.141592653589793238462643383279502884197169;', 'const float n = 1.0003;', // refractive index of air
  'const float N = 2.545E25;', // number of molecules per unit volume for air at
  // 288.15K and 1013mb (sea level -45 celsius)
  // optical length at zenith for molecules
  'const float rayleighZenithLength = 8.4E3;', 'const float mieZenithLength = 1.25E3;', 'const vec3 up = vec3( 0.0, 1.0, 0.0 );', // 66 arc seconds -> degrees, and the cosine of that
  'const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;', // 3.0 / ( 16.0 * pi )
  'const float THREE_OVER_SIXTEENPI = 0.05968310365946075;', // 1.0 / ( 4.0 * pi )
  'const float ONE_OVER_FOURPI = 0.07957747154594767;', 'float rayleighPhase( float cosTheta ) {', '	return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );', '}', 'float hgPhase( float cosTheta, float g ) {', '	float g2 = pow( g, 2.0 );', '	float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );', '	return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );', '}', // Filmic ToneMapping http://filmicgames.com/archives/75
  'const float A = 0.15;', 'const float B = 0.50;', 'const float C = 0.10;', 'const float D = 0.20;', 'const float E = 0.02;', 'const float F = 0.30;', 'const float whiteScale = 1.0748724675633854;', // 1.0 / Uncharted2Tonemap(1000.0)
  'vec3 Uncharted2Tonemap( vec3 x ) {', '	return ( ( x * ( A * x + C * B ) + D * E ) / ( x * ( A * x + B ) + D * F ) ) - E / F;', '}', 'void main() {', // optical length
  // cutoff angle at 90 to avoid singularity in next formula.
  '	float zenithAngle = acos( max( 0.0, dot( up, normalize( vWorldPosition - cameraPos ) ) ) );', '	float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );', '	float sR = rayleighZenithLength * inverse;', '	float sM = mieZenithLength * inverse;', // combined extinction factor
  '	vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );', // in scattering
  '	float cosTheta = dot( normalize( vWorldPosition - cameraPos ), vSunDirection );', '	float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );', '	vec3 betaRTheta = vBetaR * rPhase;', '	float mPhase = hgPhase( cosTheta, mieDirectionalG );', '	vec3 betaMTheta = vBetaM * mPhase;', '	vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );', '	Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );', // nightsky
  '	vec3 direction = normalize( vWorldPosition - cameraPos );', '	float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]', '	float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]', '	vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );', '	vec3 L0 = vec3( 0.1 ) * Fex;', // composition + solar disc
  '	float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );', '	L0 += ( vSunE * 19000.0 * Fex ) * sundisk;', '	vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );', '	vec3 curr = Uncharted2Tonemap( ( log2( 2.0 / pow( luminance, 4.0 ) ) ) * texColor );', '	vec3 color = curr * whiteScale;', '	vec3 retColor = pow( color, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );', '	gl_FragColor = vec4( retColor, 1.0 );', '}'].join('\n')
};

/***/ }),

/***/ "./node_modules/three/src/constants.js":
/*!*********************************************!*\
  !*** ./node_modules/three/src/constants.js ***!
  \*********************************************/
/*! exports provided: REVISION, MOUSE, CullFaceNone, CullFaceBack, CullFaceFront, CullFaceFrontBack, FrontFaceDirectionCW, FrontFaceDirectionCCW, BasicShadowMap, PCFShadowMap, PCFSoftShadowMap, FrontSide, BackSide, DoubleSide, FlatShading, SmoothShading, NoColors, FaceColors, VertexColors, NoBlending, NormalBlending, AdditiveBlending, SubtractiveBlending, MultiplyBlending, CustomBlending, AddEquation, SubtractEquation, ReverseSubtractEquation, MinEquation, MaxEquation, ZeroFactor, OneFactor, SrcColorFactor, OneMinusSrcColorFactor, SrcAlphaFactor, OneMinusSrcAlphaFactor, DstAlphaFactor, OneMinusDstAlphaFactor, DstColorFactor, OneMinusDstColorFactor, SrcAlphaSaturateFactor, NeverDepth, AlwaysDepth, LessDepth, LessEqualDepth, EqualDepth, GreaterEqualDepth, GreaterDepth, NotEqualDepth, MultiplyOperation, MixOperation, AddOperation, NoToneMapping, LinearToneMapping, ReinhardToneMapping, Uncharted2ToneMapping, CineonToneMapping, UVMapping, CubeReflectionMapping, CubeRefractionMapping, EquirectangularReflectionMapping, EquirectangularRefractionMapping, SphericalReflectionMapping, CubeUVReflectionMapping, CubeUVRefractionMapping, RepeatWrapping, ClampToEdgeWrapping, MirroredRepeatWrapping, NearestFilter, NearestMipMapNearestFilter, NearestMipMapLinearFilter, LinearFilter, LinearMipMapNearestFilter, LinearMipMapLinearFilter, UnsignedByteType, ByteType, ShortType, UnsignedShortType, IntType, UnsignedIntType, FloatType, HalfFloatType, UnsignedShort4444Type, UnsignedShort5551Type, UnsignedShort565Type, UnsignedInt248Type, AlphaFormat, RGBFormat, RGBAFormat, LuminanceFormat, LuminanceAlphaFormat, RGBEFormat, DepthFormat, DepthStencilFormat, RGB_S3TC_DXT1_Format, RGBA_S3TC_DXT1_Format, RGBA_S3TC_DXT3_Format, RGBA_S3TC_DXT5_Format, RGB_PVRTC_4BPPV1_Format, RGB_PVRTC_2BPPV1_Format, RGBA_PVRTC_4BPPV1_Format, RGBA_PVRTC_2BPPV1_Format, RGB_ETC1_Format, RGBA_ASTC_4x4_Format, RGBA_ASTC_5x4_Format, RGBA_ASTC_5x5_Format, RGBA_ASTC_6x5_Format, RGBA_ASTC_6x6_Format, RGBA_ASTC_8x5_Format, RGBA_ASTC_8x6_Format, RGBA_ASTC_8x8_Format, RGBA_ASTC_10x5_Format, RGBA_ASTC_10x6_Format, RGBA_ASTC_10x8_Format, RGBA_ASTC_10x10_Format, RGBA_ASTC_12x10_Format, RGBA_ASTC_12x12_Format, LoopOnce, LoopRepeat, LoopPingPong, InterpolateDiscrete, InterpolateLinear, InterpolateSmooth, ZeroCurvatureEnding, ZeroSlopeEnding, WrapAroundEnding, TrianglesDrawMode, TriangleStripDrawMode, TriangleFanDrawMode, LinearEncoding, sRGBEncoding, GammaEncoding, RGBEEncoding, LogLuvEncoding, RGBM7Encoding, RGBM16Encoding, RGBDEncoding, BasicDepthPacking, RGBADepthPacking, TangentSpaceNormalMap, ObjectSpaceNormalMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REVISION", function() { return REVISION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MOUSE", function() { return MOUSE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CullFaceNone", function() { return CullFaceNone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CullFaceBack", function() { return CullFaceBack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CullFaceFront", function() { return CullFaceFront; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CullFaceFrontBack", function() { return CullFaceFrontBack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FrontFaceDirectionCW", function() { return FrontFaceDirectionCW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FrontFaceDirectionCCW", function() { return FrontFaceDirectionCCW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasicShadowMap", function() { return BasicShadowMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PCFShadowMap", function() { return PCFShadowMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PCFSoftShadowMap", function() { return PCFSoftShadowMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FrontSide", function() { return FrontSide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BackSide", function() { return BackSide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DoubleSide", function() { return DoubleSide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlatShading", function() { return FlatShading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SmoothShading", function() { return SmoothShading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoColors", function() { return NoColors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FaceColors", function() { return FaceColors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VertexColors", function() { return VertexColors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoBlending", function() { return NoBlending; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NormalBlending", function() { return NormalBlending; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdditiveBlending", function() { return AdditiveBlending; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubtractiveBlending", function() { return SubtractiveBlending; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiplyBlending", function() { return MultiplyBlending; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomBlending", function() { return CustomBlending; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddEquation", function() { return AddEquation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubtractEquation", function() { return SubtractEquation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReverseSubtractEquation", function() { return ReverseSubtractEquation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MinEquation", function() { return MinEquation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaxEquation", function() { return MaxEquation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZeroFactor", function() { return ZeroFactor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OneFactor", function() { return OneFactor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SrcColorFactor", function() { return SrcColorFactor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OneMinusSrcColorFactor", function() { return OneMinusSrcColorFactor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SrcAlphaFactor", function() { return SrcAlphaFactor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OneMinusSrcAlphaFactor", function() { return OneMinusSrcAlphaFactor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DstAlphaFactor", function() { return DstAlphaFactor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OneMinusDstAlphaFactor", function() { return OneMinusDstAlphaFactor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DstColorFactor", function() { return DstColorFactor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OneMinusDstColorFactor", function() { return OneMinusDstColorFactor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SrcAlphaSaturateFactor", function() { return SrcAlphaSaturateFactor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NeverDepth", function() { return NeverDepth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlwaysDepth", function() { return AlwaysDepth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LessDepth", function() { return LessDepth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LessEqualDepth", function() { return LessEqualDepth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EqualDepth", function() { return EqualDepth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GreaterEqualDepth", function() { return GreaterEqualDepth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GreaterDepth", function() { return GreaterDepth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotEqualDepth", function() { return NotEqualDepth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiplyOperation", function() { return MultiplyOperation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MixOperation", function() { return MixOperation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddOperation", function() { return AddOperation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoToneMapping", function() { return NoToneMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinearToneMapping", function() { return LinearToneMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReinhardToneMapping", function() { return ReinhardToneMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Uncharted2ToneMapping", function() { return Uncharted2ToneMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CineonToneMapping", function() { return CineonToneMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UVMapping", function() { return UVMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CubeReflectionMapping", function() { return CubeReflectionMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CubeRefractionMapping", function() { return CubeRefractionMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquirectangularReflectionMapping", function() { return EquirectangularReflectionMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquirectangularRefractionMapping", function() { return EquirectangularRefractionMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SphericalReflectionMapping", function() { return SphericalReflectionMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CubeUVReflectionMapping", function() { return CubeUVReflectionMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CubeUVRefractionMapping", function() { return CubeUVRefractionMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RepeatWrapping", function() { return RepeatWrapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClampToEdgeWrapping", function() { return ClampToEdgeWrapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MirroredRepeatWrapping", function() { return MirroredRepeatWrapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NearestFilter", function() { return NearestFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NearestMipMapNearestFilter", function() { return NearestMipMapNearestFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NearestMipMapLinearFilter", function() { return NearestMipMapLinearFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinearFilter", function() { return LinearFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinearMipMapNearestFilter", function() { return LinearMipMapNearestFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinearMipMapLinearFilter", function() { return LinearMipMapLinearFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnsignedByteType", function() { return UnsignedByteType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ByteType", function() { return ByteType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShortType", function() { return ShortType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnsignedShortType", function() { return UnsignedShortType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntType", function() { return IntType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnsignedIntType", function() { return UnsignedIntType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FloatType", function() { return FloatType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HalfFloatType", function() { return HalfFloatType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnsignedShort4444Type", function() { return UnsignedShort4444Type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnsignedShort5551Type", function() { return UnsignedShort5551Type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnsignedShort565Type", function() { return UnsignedShort565Type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnsignedInt248Type", function() { return UnsignedInt248Type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlphaFormat", function() { return AlphaFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBFormat", function() { return RGBFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBAFormat", function() { return RGBAFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LuminanceFormat", function() { return LuminanceFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LuminanceAlphaFormat", function() { return LuminanceAlphaFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBEFormat", function() { return RGBEFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepthFormat", function() { return DepthFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepthStencilFormat", function() { return DepthStencilFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGB_S3TC_DXT1_Format", function() { return RGB_S3TC_DXT1_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBA_S3TC_DXT1_Format", function() { return RGBA_S3TC_DXT1_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBA_S3TC_DXT3_Format", function() { return RGBA_S3TC_DXT3_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBA_S3TC_DXT5_Format", function() { return RGBA_S3TC_DXT5_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGB_PVRTC_4BPPV1_Format", function() { return RGB_PVRTC_4BPPV1_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGB_PVRTC_2BPPV1_Format", function() { return RGB_PVRTC_2BPPV1_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBA_PVRTC_4BPPV1_Format", function() { return RGBA_PVRTC_4BPPV1_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBA_PVRTC_2BPPV1_Format", function() { return RGBA_PVRTC_2BPPV1_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGB_ETC1_Format", function() { return RGB_ETC1_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBA_ASTC_4x4_Format", function() { return RGBA_ASTC_4x4_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBA_ASTC_5x4_Format", function() { return RGBA_ASTC_5x4_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBA_ASTC_5x5_Format", function() { return RGBA_ASTC_5x5_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBA_ASTC_6x5_Format", function() { return RGBA_ASTC_6x5_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBA_ASTC_6x6_Format", function() { return RGBA_ASTC_6x6_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBA_ASTC_8x5_Format", function() { return RGBA_ASTC_8x5_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBA_ASTC_8x6_Format", function() { return RGBA_ASTC_8x6_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBA_ASTC_8x8_Format", function() { return RGBA_ASTC_8x8_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBA_ASTC_10x5_Format", function() { return RGBA_ASTC_10x5_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBA_ASTC_10x6_Format", function() { return RGBA_ASTC_10x6_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBA_ASTC_10x8_Format", function() { return RGBA_ASTC_10x8_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBA_ASTC_10x10_Format", function() { return RGBA_ASTC_10x10_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBA_ASTC_12x10_Format", function() { return RGBA_ASTC_12x10_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBA_ASTC_12x12_Format", function() { return RGBA_ASTC_12x12_Format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoopOnce", function() { return LoopOnce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoopRepeat", function() { return LoopRepeat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoopPingPong", function() { return LoopPingPong; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InterpolateDiscrete", function() { return InterpolateDiscrete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InterpolateLinear", function() { return InterpolateLinear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InterpolateSmooth", function() { return InterpolateSmooth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZeroCurvatureEnding", function() { return ZeroCurvatureEnding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZeroSlopeEnding", function() { return ZeroSlopeEnding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WrapAroundEnding", function() { return WrapAroundEnding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrianglesDrawMode", function() { return TrianglesDrawMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TriangleStripDrawMode", function() { return TriangleStripDrawMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TriangleFanDrawMode", function() { return TriangleFanDrawMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinearEncoding", function() { return LinearEncoding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sRGBEncoding", function() { return sRGBEncoding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GammaEncoding", function() { return GammaEncoding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBEEncoding", function() { return RGBEEncoding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogLuvEncoding", function() { return LogLuvEncoding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBM7Encoding", function() { return RGBM7Encoding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBM16Encoding", function() { return RGBM16Encoding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBDEncoding", function() { return RGBDEncoding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasicDepthPacking", function() { return BasicDepthPacking; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RGBADepthPacking", function() { return RGBADepthPacking; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TangentSpaceNormalMap", function() { return TangentSpaceNormalMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectSpaceNormalMap", function() { return ObjectSpaceNormalMap; });
var REVISION = '94';
var MOUSE = {
  LEFT: 0,
  MIDDLE: 1,
  RIGHT: 2
};
var CullFaceNone = 0;
var CullFaceBack = 1;
var CullFaceFront = 2;
var CullFaceFrontBack = 3;
var FrontFaceDirectionCW = 0;
var FrontFaceDirectionCCW = 1;
var BasicShadowMap = 0;
var PCFShadowMap = 1;
var PCFSoftShadowMap = 2;
var FrontSide = 0;
var BackSide = 1;
var DoubleSide = 2;
var FlatShading = 1;
var SmoothShading = 2;
var NoColors = 0;
var FaceColors = 1;
var VertexColors = 2;
var NoBlending = 0;
var NormalBlending = 1;
var AdditiveBlending = 2;
var SubtractiveBlending = 3;
var MultiplyBlending = 4;
var CustomBlending = 5;
var AddEquation = 100;
var SubtractEquation = 101;
var ReverseSubtractEquation = 102;
var MinEquation = 103;
var MaxEquation = 104;
var ZeroFactor = 200;
var OneFactor = 201;
var SrcColorFactor = 202;
var OneMinusSrcColorFactor = 203;
var SrcAlphaFactor = 204;
var OneMinusSrcAlphaFactor = 205;
var DstAlphaFactor = 206;
var OneMinusDstAlphaFactor = 207;
var DstColorFactor = 208;
var OneMinusDstColorFactor = 209;
var SrcAlphaSaturateFactor = 210;
var NeverDepth = 0;
var AlwaysDepth = 1;
var LessDepth = 2;
var LessEqualDepth = 3;
var EqualDepth = 4;
var GreaterEqualDepth = 5;
var GreaterDepth = 6;
var NotEqualDepth = 7;
var MultiplyOperation = 0;
var MixOperation = 1;
var AddOperation = 2;
var NoToneMapping = 0;
var LinearToneMapping = 1;
var ReinhardToneMapping = 2;
var Uncharted2ToneMapping = 3;
var CineonToneMapping = 4;
var UVMapping = 300;
var CubeReflectionMapping = 301;
var CubeRefractionMapping = 302;
var EquirectangularReflectionMapping = 303;
var EquirectangularRefractionMapping = 304;
var SphericalReflectionMapping = 305;
var CubeUVReflectionMapping = 306;
var CubeUVRefractionMapping = 307;
var RepeatWrapping = 1000;
var ClampToEdgeWrapping = 1001;
var MirroredRepeatWrapping = 1002;
var NearestFilter = 1003;
var NearestMipMapNearestFilter = 1004;
var NearestMipMapLinearFilter = 1005;
var LinearFilter = 1006;
var LinearMipMapNearestFilter = 1007;
var LinearMipMapLinearFilter = 1008;
var UnsignedByteType = 1009;
var ByteType = 1010;
var ShortType = 1011;
var UnsignedShortType = 1012;
var IntType = 1013;
var UnsignedIntType = 1014;
var FloatType = 1015;
var HalfFloatType = 1016;
var UnsignedShort4444Type = 1017;
var UnsignedShort5551Type = 1018;
var UnsignedShort565Type = 1019;
var UnsignedInt248Type = 1020;
var AlphaFormat = 1021;
var RGBFormat = 1022;
var RGBAFormat = 1023;
var LuminanceFormat = 1024;
var LuminanceAlphaFormat = 1025;
var RGBEFormat = RGBAFormat;
var DepthFormat = 1026;
var DepthStencilFormat = 1027;
var RGB_S3TC_DXT1_Format = 33776;
var RGBA_S3TC_DXT1_Format = 33777;
var RGBA_S3TC_DXT3_Format = 33778;
var RGBA_S3TC_DXT5_Format = 33779;
var RGB_PVRTC_4BPPV1_Format = 35840;
var RGB_PVRTC_2BPPV1_Format = 35841;
var RGBA_PVRTC_4BPPV1_Format = 35842;
var RGBA_PVRTC_2BPPV1_Format = 35843;
var RGB_ETC1_Format = 36196;
var RGBA_ASTC_4x4_Format = 37808;
var RGBA_ASTC_5x4_Format = 37809;
var RGBA_ASTC_5x5_Format = 37810;
var RGBA_ASTC_6x5_Format = 37811;
var RGBA_ASTC_6x6_Format = 37812;
var RGBA_ASTC_8x5_Format = 37813;
var RGBA_ASTC_8x6_Format = 37814;
var RGBA_ASTC_8x8_Format = 37815;
var RGBA_ASTC_10x5_Format = 37816;
var RGBA_ASTC_10x6_Format = 37817;
var RGBA_ASTC_10x8_Format = 37818;
var RGBA_ASTC_10x10_Format = 37819;
var RGBA_ASTC_12x10_Format = 37820;
var RGBA_ASTC_12x12_Format = 37821;
var LoopOnce = 2200;
var LoopRepeat = 2201;
var LoopPingPong = 2202;
var InterpolateDiscrete = 2300;
var InterpolateLinear = 2301;
var InterpolateSmooth = 2302;
var ZeroCurvatureEnding = 2400;
var ZeroSlopeEnding = 2401;
var WrapAroundEnding = 2402;
var TrianglesDrawMode = 0;
var TriangleStripDrawMode = 1;
var TriangleFanDrawMode = 2;
var LinearEncoding = 3000;
var sRGBEncoding = 3001;
var GammaEncoding = 3007;
var RGBEEncoding = 3002;
var LogLuvEncoding = 3003;
var RGBM7Encoding = 3004;
var RGBM16Encoding = 3005;
var RGBDEncoding = 3006;
var BasicDepthPacking = 3200;
var RGBADepthPacking = 3201;
var TangentSpaceNormalMap = 0;
var ObjectSpaceNormalMap = 1;

/***/ }),

/***/ "./node_modules/three/src/core/BufferAttribute.js":
/*!********************************************************!*\
  !*** ./node_modules/three/src/core/BufferAttribute.js ***!
  \********************************************************/
/*! exports provided: Float64BufferAttribute, Float32BufferAttribute, Uint32BufferAttribute, Int32BufferAttribute, Uint16BufferAttribute, Int16BufferAttribute, Uint8ClampedBufferAttribute, Uint8BufferAttribute, Int8BufferAttribute, BufferAttribute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Float64BufferAttribute", function() { return Float64BufferAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Float32BufferAttribute", function() { return Float32BufferAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Uint32BufferAttribute", function() { return Uint32BufferAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Int32BufferAttribute", function() { return Int32BufferAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Uint16BufferAttribute", function() { return Uint16BufferAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Int16BufferAttribute", function() { return Int16BufferAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Uint8ClampedBufferAttribute", function() { return Uint8ClampedBufferAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Uint8BufferAttribute", function() { return Uint8BufferAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Int8BufferAttribute", function() { return Int8BufferAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BufferAttribute", function() { return BufferAttribute; });
/* harmony import */ var _math_Vector4_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Vector4.js */ "./node_modules/three/src/math/Vector4.js");
/* harmony import */ var _math_Vector3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Vector3.js */ "./node_modules/three/src/math/Vector3.js");
/* harmony import */ var _math_Vector2_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Vector2.js */ "./node_modules/three/src/math/Vector2.js");
/* harmony import */ var _math_Color_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../math/Color.js */ "./node_modules/three/src/math/Color.js");




/**
 * @author mrdoob / http://mrdoob.com/
 */

function BufferAttribute(array, itemSize, normalized) {
  if (Array.isArray(array)) {
    throw new TypeError('THREE.BufferAttribute: array should be a Typed Array.');
  }

  this.name = '';
  this.array = array;
  this.itemSize = itemSize;
  this.count = array !== undefined ? array.length / itemSize : 0;
  this.normalized = normalized === true;
  this.dynamic = false;
  this.updateRange = {
    offset: 0,
    count: -1
  };
  this.version = 0;
}

Object.defineProperty(BufferAttribute.prototype, 'needsUpdate', {
  set: function (value) {
    if (value === true) this.version++;
  }
});
Object.assign(BufferAttribute.prototype, {
  isBufferAttribute: true,
  onUploadCallback: function () {},
  setArray: function (array) {
    if (Array.isArray(array)) {
      throw new TypeError('THREE.BufferAttribute: array should be a Typed Array.');
    }

    this.count = array !== undefined ? array.length / this.itemSize : 0;
    this.array = array;
    return this;
  },
  setDynamic: function (value) {
    this.dynamic = value;
    return this;
  },
  copy: function (source) {
    this.name = source.name;
    this.array = new source.array.constructor(source.array);
    this.itemSize = source.itemSize;
    this.count = source.count;
    this.normalized = source.normalized;
    this.dynamic = source.dynamic;
    return this;
  },
  copyAt: function (index1, attribute, index2) {
    index1 *= this.itemSize;
    index2 *= attribute.itemSize;

    for (var i = 0, l = this.itemSize; i < l; i++) {
      this.array[index1 + i] = attribute.array[index2 + i];
    }

    return this;
  },
  copyArray: function (array) {
    this.array.set(array);
    return this;
  },
  copyColorsArray: function (colors) {
    var array = this.array,
        offset = 0;

    for (var i = 0, l = colors.length; i < l; i++) {
      var color = colors[i];

      if (color === undefined) {
        console.warn('THREE.BufferAttribute.copyColorsArray(): color is undefined', i);
        color = new _math_Color_js__WEBPACK_IMPORTED_MODULE_3__["Color"]();
      }

      array[offset++] = color.r;
      array[offset++] = color.g;
      array[offset++] = color.b;
    }

    return this;
  },
  copyVector2sArray: function (vectors) {
    var array = this.array,
        offset = 0;

    for (var i = 0, l = vectors.length; i < l; i++) {
      var vector = vectors[i];

      if (vector === undefined) {
        console.warn('THREE.BufferAttribute.copyVector2sArray(): vector is undefined', i);
        vector = new _math_Vector2_js__WEBPACK_IMPORTED_MODULE_2__["Vector2"]();
      }

      array[offset++] = vector.x;
      array[offset++] = vector.y;
    }

    return this;
  },
  copyVector3sArray: function (vectors) {
    var array = this.array,
        offset = 0;

    for (var i = 0, l = vectors.length; i < l; i++) {
      var vector = vectors[i];

      if (vector === undefined) {
        console.warn('THREE.BufferAttribute.copyVector3sArray(): vector is undefined', i);
        vector = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
      }

      array[offset++] = vector.x;
      array[offset++] = vector.y;
      array[offset++] = vector.z;
    }

    return this;
  },
  copyVector4sArray: function (vectors) {
    var array = this.array,
        offset = 0;

    for (var i = 0, l = vectors.length; i < l; i++) {
      var vector = vectors[i];

      if (vector === undefined) {
        console.warn('THREE.BufferAttribute.copyVector4sArray(): vector is undefined', i);
        vector = new _math_Vector4_js__WEBPACK_IMPORTED_MODULE_0__["Vector4"]();
      }

      array[offset++] = vector.x;
      array[offset++] = vector.y;
      array[offset++] = vector.z;
      array[offset++] = vector.w;
    }

    return this;
  },
  set: function (value, offset) {
    if (offset === undefined) offset = 0;
    this.array.set(value, offset);
    return this;
  },
  getX: function (index) {
    return this.array[index * this.itemSize];
  },
  setX: function (index, x) {
    this.array[index * this.itemSize] = x;
    return this;
  },
  getY: function (index) {
    return this.array[index * this.itemSize + 1];
  },
  setY: function (index, y) {
    this.array[index * this.itemSize + 1] = y;
    return this;
  },
  getZ: function (index) {
    return this.array[index * this.itemSize + 2];
  },
  setZ: function (index, z) {
    this.array[index * this.itemSize + 2] = z;
    return this;
  },
  getW: function (index) {
    return this.array[index * this.itemSize + 3];
  },
  setW: function (index, w) {
    this.array[index * this.itemSize + 3] = w;
    return this;
  },
  setXY: function (index, x, y) {
    index *= this.itemSize;
    this.array[index + 0] = x;
    this.array[index + 1] = y;
    return this;
  },
  setXYZ: function (index, x, y, z) {
    index *= this.itemSize;
    this.array[index + 0] = x;
    this.array[index + 1] = y;
    this.array[index + 2] = z;
    return this;
  },
  setXYZW: function (index, x, y, z, w) {
    index *= this.itemSize;
    this.array[index + 0] = x;
    this.array[index + 1] = y;
    this.array[index + 2] = z;
    this.array[index + 3] = w;
    return this;
  },
  onUpload: function (callback) {
    this.onUploadCallback = callback;
    return this;
  },
  clone: function () {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
}); //

function Int8BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Int8Array(array), itemSize, normalized);
}

Int8BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Int8BufferAttribute.prototype.constructor = Int8BufferAttribute;

function Uint8BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Uint8Array(array), itemSize, normalized);
}

Uint8BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Uint8BufferAttribute.prototype.constructor = Uint8BufferAttribute;

function Uint8ClampedBufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Uint8ClampedArray(array), itemSize, normalized);
}

Uint8ClampedBufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Uint8ClampedBufferAttribute.prototype.constructor = Uint8ClampedBufferAttribute;

function Int16BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Int16Array(array), itemSize, normalized);
}

Int16BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Int16BufferAttribute.prototype.constructor = Int16BufferAttribute;

function Uint16BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Uint16Array(array), itemSize, normalized);
}

Uint16BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Uint16BufferAttribute.prototype.constructor = Uint16BufferAttribute;

function Int32BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Int32Array(array), itemSize, normalized);
}

Int32BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Int32BufferAttribute.prototype.constructor = Int32BufferAttribute;

function Uint32BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Uint32Array(array), itemSize, normalized);
}

Uint32BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Uint32BufferAttribute.prototype.constructor = Uint32BufferAttribute;

function Float32BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Float32Array(array), itemSize, normalized);
}

Float32BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Float32BufferAttribute.prototype.constructor = Float32BufferAttribute;

function Float64BufferAttribute(array, itemSize, normalized) {
  BufferAttribute.call(this, new Float64Array(array), itemSize, normalized);
}

Float64BufferAttribute.prototype = Object.create(BufferAttribute.prototype);
Float64BufferAttribute.prototype.constructor = Float64BufferAttribute; //



/***/ }),

/***/ "./node_modules/three/src/core/BufferGeometry.js":
/*!*******************************************************!*\
  !*** ./node_modules/three/src/core/BufferGeometry.js ***!
  \*******************************************************/
/*! exports provided: BufferGeometry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BufferGeometry", function() { return BufferGeometry; });
/* harmony import */ var _math_Vector3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Vector3.js */ "./node_modules/three/src/math/Vector3.js");
/* harmony import */ var _math_Box3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Box3.js */ "./node_modules/three/src/math/Box3.js");
/* harmony import */ var _EventDispatcher_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EventDispatcher.js */ "./node_modules/three/src/core/EventDispatcher.js");
/* harmony import */ var _BufferAttribute_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BufferAttribute.js */ "./node_modules/three/src/core/BufferAttribute.js");
/* harmony import */ var _math_Sphere_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../math/Sphere.js */ "./node_modules/three/src/math/Sphere.js");
/* harmony import */ var _DirectGeometry_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DirectGeometry.js */ "./node_modules/three/src/core/DirectGeometry.js");
/* harmony import */ var _Object3D_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Object3D.js */ "./node_modules/three/src/core/Object3D.js");
/* harmony import */ var _math_Matrix4_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../math/Matrix4.js */ "./node_modules/three/src/math/Matrix4.js");
/* harmony import */ var _math_Matrix3_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../math/Matrix3.js */ "./node_modules/three/src/math/Matrix3.js");
/* harmony import */ var _math_Math_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../math/Math.js */ "./node_modules/three/src/math/Math.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils.js */ "./node_modules/three/src/utils.js");











/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */

var bufferGeometryId = 1; // BufferGeometry uses odd numbers as Id

function BufferGeometry() {
  Object.defineProperty(this, 'id', {
    value: bufferGeometryId += 2
  });
  this.uuid = _math_Math_js__WEBPACK_IMPORTED_MODULE_9__["_Math"].generateUUID();
  this.name = '';
  this.type = 'BufferGeometry';
  this.index = null;
  this.attributes = {};
  this.morphAttributes = {};
  this.groups = [];
  this.boundingBox = null;
  this.boundingSphere = null;
  this.drawRange = {
    start: 0,
    count: Infinity
  };
  this.userData = {};
}

BufferGeometry.prototype = Object.assign(Object.create(_EventDispatcher_js__WEBPACK_IMPORTED_MODULE_2__["EventDispatcher"].prototype), {
  constructor: BufferGeometry,
  isBufferGeometry: true,
  getIndex: function () {
    return this.index;
  },
  setIndex: function (index) {
    if (Array.isArray(index)) {
      this.index = new (Object(_utils_js__WEBPACK_IMPORTED_MODULE_10__["arrayMax"])(index) > 65535 ? _BufferAttribute_js__WEBPACK_IMPORTED_MODULE_3__["Uint32BufferAttribute"] : _BufferAttribute_js__WEBPACK_IMPORTED_MODULE_3__["Uint16BufferAttribute"])(index, 1);
    } else {
      this.index = index;
    }
  },
  addAttribute: function (name, attribute) {
    if (!(attribute && attribute.isBufferAttribute) && !(attribute && attribute.isInterleavedBufferAttribute)) {
      console.warn('THREE.BufferGeometry: .addAttribute() now expects ( name, attribute ).');
      return this.addAttribute(name, new _BufferAttribute_js__WEBPACK_IMPORTED_MODULE_3__["BufferAttribute"](arguments[1], arguments[2]));
    }

    if (name === 'index') {
      console.warn('THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute.');
      this.setIndex(attribute);
      return this;
    }

    this.attributes[name] = attribute;
    return this;
  },
  getAttribute: function (name) {
    return this.attributes[name];
  },
  removeAttribute: function (name) {
    delete this.attributes[name];
    return this;
  },
  addGroup: function (start, count, materialIndex) {
    this.groups.push({
      start: start,
      count: count,
      materialIndex: materialIndex !== undefined ? materialIndex : 0
    });
  },
  clearGroups: function () {
    this.groups = [];
  },
  setDrawRange: function (start, count) {
    this.drawRange.start = start;
    this.drawRange.count = count;
  },
  applyMatrix: function (matrix) {
    var position = this.attributes.position;

    if (position !== undefined) {
      matrix.applyToBufferAttribute(position);
      position.needsUpdate = true;
    }

    var normal = this.attributes.normal;

    if (normal !== undefined) {
      var normalMatrix = new _math_Matrix3_js__WEBPACK_IMPORTED_MODULE_8__["Matrix3"]().getNormalMatrix(matrix);
      normalMatrix.applyToBufferAttribute(normal);
      normal.needsUpdate = true;
    }

    if (this.boundingBox !== null) {
      this.computeBoundingBox();
    }

    if (this.boundingSphere !== null) {
      this.computeBoundingSphere();
    }

    return this;
  },
  rotateX: function () {
    // rotate geometry around world x-axis
    var m1 = new _math_Matrix4_js__WEBPACK_IMPORTED_MODULE_7__["Matrix4"]();
    return function rotateX(angle) {
      m1.makeRotationX(angle);
      this.applyMatrix(m1);
      return this;
    };
  }(),
  rotateY: function () {
    // rotate geometry around world y-axis
    var m1 = new _math_Matrix4_js__WEBPACK_IMPORTED_MODULE_7__["Matrix4"]();
    return function rotateY(angle) {
      m1.makeRotationY(angle);
      this.applyMatrix(m1);
      return this;
    };
  }(),
  rotateZ: function () {
    // rotate geometry around world z-axis
    var m1 = new _math_Matrix4_js__WEBPACK_IMPORTED_MODULE_7__["Matrix4"]();
    return function rotateZ(angle) {
      m1.makeRotationZ(angle);
      this.applyMatrix(m1);
      return this;
    };
  }(),
  translate: function () {
    // translate geometry
    var m1 = new _math_Matrix4_js__WEBPACK_IMPORTED_MODULE_7__["Matrix4"]();
    return function translate(x, y, z) {
      m1.makeTranslation(x, y, z);
      this.applyMatrix(m1);
      return this;
    };
  }(),
  scale: function () {
    // scale geometry
    var m1 = new _math_Matrix4_js__WEBPACK_IMPORTED_MODULE_7__["Matrix4"]();
    return function scale(x, y, z) {
      m1.makeScale(x, y, z);
      this.applyMatrix(m1);
      return this;
    };
  }(),
  lookAt: function () {
    var obj = new _Object3D_js__WEBPACK_IMPORTED_MODULE_6__["Object3D"]();
    return function lookAt(vector) {
      obj.lookAt(vector);
      obj.updateMatrix();
      this.applyMatrix(obj.matrix);
    };
  }(),
  center: function () {
    var offset = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    return function center() {
      this.computeBoundingBox();
      this.boundingBox.getCenter(offset).negate();
      this.translate(offset.x, offset.y, offset.z);
      return this;
    };
  }(),
  setFromObject: function (object) {
    // console.log( 'THREE.BufferGeometry.setFromObject(). Converting', object, this );
    var geometry = object.geometry;

    if (object.isPoints || object.isLine) {
      var positions = new _BufferAttribute_js__WEBPACK_IMPORTED_MODULE_3__["Float32BufferAttribute"](geometry.vertices.length * 3, 3);
      var colors = new _BufferAttribute_js__WEBPACK_IMPORTED_MODULE_3__["Float32BufferAttribute"](geometry.colors.length * 3, 3);
      this.addAttribute('position', positions.copyVector3sArray(geometry.vertices));
      this.addAttribute('color', colors.copyColorsArray(geometry.colors));

      if (geometry.lineDistances && geometry.lineDistances.length === geometry.vertices.length) {
        var lineDistances = new _BufferAttribute_js__WEBPACK_IMPORTED_MODULE_3__["Float32BufferAttribute"](geometry.lineDistances.length, 1);
        this.addAttribute('lineDistance', lineDistances.copyArray(geometry.lineDistances));
      }

      if (geometry.boundingSphere !== null) {
        this.boundingSphere = geometry.boundingSphere.clone();
      }

      if (geometry.boundingBox !== null) {
        this.boundingBox = geometry.boundingBox.clone();
      }
    } else if (object.isMesh) {
      if (geometry && geometry.isGeometry) {
        this.fromGeometry(geometry);
      }
    }

    return this;
  },
  setFromPoints: function (points) {
    var position = [];

    for (var i = 0, l = points.length; i < l; i++) {
      var point = points[i];
      position.push(point.x, point.y, point.z || 0);
    }

    this.addAttribute('position', new _BufferAttribute_js__WEBPACK_IMPORTED_MODULE_3__["Float32BufferAttribute"](position, 3));
    return this;
  },
  updateFromObject: function (object) {
    var geometry = object.geometry;

    if (object.isMesh) {
      var direct = geometry.__directGeometry;

      if (geometry.elementsNeedUpdate === true) {
        direct = undefined;
        geometry.elementsNeedUpdate = false;
      }

      if (direct === undefined) {
        return this.fromGeometry(geometry);
      }

      direct.verticesNeedUpdate = geometry.verticesNeedUpdate;
      direct.normalsNeedUpdate = geometry.normalsNeedUpdate;
      direct.colorsNeedUpdate = geometry.colorsNeedUpdate;
      direct.uvsNeedUpdate = geometry.uvsNeedUpdate;
      direct.groupsNeedUpdate = geometry.groupsNeedUpdate;
      geometry.verticesNeedUpdate = false;
      geometry.normalsNeedUpdate = false;
      geometry.colorsNeedUpdate = false;
      geometry.uvsNeedUpdate = false;
      geometry.groupsNeedUpdate = false;
      geometry = direct;
    }

    var attribute;

    if (geometry.verticesNeedUpdate === true) {
      attribute = this.attributes.position;

      if (attribute !== undefined) {
        attribute.copyVector3sArray(geometry.vertices);
        attribute.needsUpdate = true;
      }

      geometry.verticesNeedUpdate = false;
    }

    if (geometry.normalsNeedUpdate === true) {
      attribute = this.attributes.normal;

      if (attribute !== undefined) {
        attribute.copyVector3sArray(geometry.normals);
        attribute.needsUpdate = true;
      }

      geometry.normalsNeedUpdate = false;
    }

    if (geometry.colorsNeedUpdate === true) {
      attribute = this.attributes.color;

      if (attribute !== undefined) {
        attribute.copyColorsArray(geometry.colors);
        attribute.needsUpdate = true;
      }

      geometry.colorsNeedUpdate = false;
    }

    if (geometry.uvsNeedUpdate) {
      attribute = this.attributes.uv;

      if (attribute !== undefined) {
        attribute.copyVector2sArray(geometry.uvs);
        attribute.needsUpdate = true;
      }

      geometry.uvsNeedUpdate = false;
    }

    if (geometry.lineDistancesNeedUpdate) {
      attribute = this.attributes.lineDistance;

      if (attribute !== undefined) {
        attribute.copyArray(geometry.lineDistances);
        attribute.needsUpdate = true;
      }

      geometry.lineDistancesNeedUpdate = false;
    }

    if (geometry.groupsNeedUpdate) {
      geometry.computeGroups(object.geometry);
      this.groups = geometry.groups;
      geometry.groupsNeedUpdate = false;
    }

    return this;
  },
  fromGeometry: function (geometry) {
    geometry.__directGeometry = new _DirectGeometry_js__WEBPACK_IMPORTED_MODULE_5__["DirectGeometry"]().fromGeometry(geometry);
    return this.fromDirectGeometry(geometry.__directGeometry);
  },
  fromDirectGeometry: function (geometry) {
    var positions = new Float32Array(geometry.vertices.length * 3);
    this.addAttribute('position', new _BufferAttribute_js__WEBPACK_IMPORTED_MODULE_3__["BufferAttribute"](positions, 3).copyVector3sArray(geometry.vertices));

    if (geometry.normals.length > 0) {
      var normals = new Float32Array(geometry.normals.length * 3);
      this.addAttribute('normal', new _BufferAttribute_js__WEBPACK_IMPORTED_MODULE_3__["BufferAttribute"](normals, 3).copyVector3sArray(geometry.normals));
    }

    if (geometry.colors.length > 0) {
      var colors = new Float32Array(geometry.colors.length * 3);
      this.addAttribute('color', new _BufferAttribute_js__WEBPACK_IMPORTED_MODULE_3__["BufferAttribute"](colors, 3).copyColorsArray(geometry.colors));
    }

    if (geometry.uvs.length > 0) {
      var uvs = new Float32Array(geometry.uvs.length * 2);
      this.addAttribute('uv', new _BufferAttribute_js__WEBPACK_IMPORTED_MODULE_3__["BufferAttribute"](uvs, 2).copyVector2sArray(geometry.uvs));
    }

    if (geometry.uvs2.length > 0) {
      var uvs2 = new Float32Array(geometry.uvs2.length * 2);
      this.addAttribute('uv2', new _BufferAttribute_js__WEBPACK_IMPORTED_MODULE_3__["BufferAttribute"](uvs2, 2).copyVector2sArray(geometry.uvs2));
    } // groups


    this.groups = geometry.groups; // morphs

    for (var name in geometry.morphTargets) {
      var array = [];
      var morphTargets = geometry.morphTargets[name];

      for (var i = 0, l = morphTargets.length; i < l; i++) {
        var morphTarget = morphTargets[i];
        var attribute = new _BufferAttribute_js__WEBPACK_IMPORTED_MODULE_3__["Float32BufferAttribute"](morphTarget.length * 3, 3);
        array.push(attribute.copyVector3sArray(morphTarget));
      }

      this.morphAttributes[name] = array;
    } // skinning


    if (geometry.skinIndices.length > 0) {
      var skinIndices = new _BufferAttribute_js__WEBPACK_IMPORTED_MODULE_3__["Float32BufferAttribute"](geometry.skinIndices.length * 4, 4);
      this.addAttribute('skinIndex', skinIndices.copyVector4sArray(geometry.skinIndices));
    }

    if (geometry.skinWeights.length > 0) {
      var skinWeights = new _BufferAttribute_js__WEBPACK_IMPORTED_MODULE_3__["Float32BufferAttribute"](geometry.skinWeights.length * 4, 4);
      this.addAttribute('skinWeight', skinWeights.copyVector4sArray(geometry.skinWeights));
    } //


    if (geometry.boundingSphere !== null) {
      this.boundingSphere = geometry.boundingSphere.clone();
    }

    if (geometry.boundingBox !== null) {
      this.boundingBox = geometry.boundingBox.clone();
    }

    return this;
  },
  computeBoundingBox: function () {
    if (this.boundingBox === null) {
      this.boundingBox = new _math_Box3_js__WEBPACK_IMPORTED_MODULE_1__["Box3"]();
    }

    var position = this.attributes.position;

    if (position !== undefined) {
      this.boundingBox.setFromBufferAttribute(position);
    } else {
      this.boundingBox.makeEmpty();
    }

    if (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) {
      console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
    }
  },
  computeBoundingSphere: function () {
    var box = new _math_Box3_js__WEBPACK_IMPORTED_MODULE_1__["Box3"]();
    var vector = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    return function computeBoundingSphere() {
      if (this.boundingSphere === null) {
        this.boundingSphere = new _math_Sphere_js__WEBPACK_IMPORTED_MODULE_4__["Sphere"]();
      }

      var position = this.attributes.position;

      if (position) {
        var center = this.boundingSphere.center;
        box.setFromBufferAttribute(position);
        box.getCenter(center); // hoping to find a boundingSphere with a radius smaller than the
        // boundingSphere of the boundingBox: sqrt(3) smaller in the best case

        var maxRadiusSq = 0;

        for (var i = 0, il = position.count; i < il; i++) {
          vector.x = position.getX(i);
          vector.y = position.getY(i);
          vector.z = position.getZ(i);
          maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vector));
        }

        this.boundingSphere.radius = Math.sqrt(maxRadiusSq);

        if (isNaN(this.boundingSphere.radius)) {
          console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
        }
      }
    };
  }(),
  computeFaceNormals: function () {// backwards compatibility
  },
  computeVertexNormals: function () {
    var index = this.index;
    var attributes = this.attributes;
    var groups = this.groups;

    if (attributes.position) {
      var positions = attributes.position.array;

      if (attributes.normal === undefined) {
        this.addAttribute('normal', new _BufferAttribute_js__WEBPACK_IMPORTED_MODULE_3__["BufferAttribute"](new Float32Array(positions.length), 3));
      } else {
        // reset existing normals to zero
        var array = attributes.normal.array;

        for (var i = 0, il = array.length; i < il; i++) {
          array[i] = 0;
        }
      }

      var normals = attributes.normal.array;
      var vA, vB, vC;
      var pA = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"](),
          pB = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"](),
          pC = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
      var cb = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"](),
          ab = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"](); // indexed elements

      if (index) {
        var indices = index.array;

        if (groups.length === 0) {
          this.addGroup(0, indices.length);
        }

        for (var j = 0, jl = groups.length; j < jl; ++j) {
          var group = groups[j];
          var start = group.start;
          var count = group.count;

          for (var i = start, il = start + count; i < il; i += 3) {
            vA = indices[i + 0] * 3;
            vB = indices[i + 1] * 3;
            vC = indices[i + 2] * 3;
            pA.fromArray(positions, vA);
            pB.fromArray(positions, vB);
            pC.fromArray(positions, vC);
            cb.subVectors(pC, pB);
            ab.subVectors(pA, pB);
            cb.cross(ab);
            normals[vA] += cb.x;
            normals[vA + 1] += cb.y;
            normals[vA + 2] += cb.z;
            normals[vB] += cb.x;
            normals[vB + 1] += cb.y;
            normals[vB + 2] += cb.z;
            normals[vC] += cb.x;
            normals[vC + 1] += cb.y;
            normals[vC + 2] += cb.z;
          }
        }
      } else {
        // non-indexed elements (unconnected triangle soup)
        for (var i = 0, il = positions.length; i < il; i += 9) {
          pA.fromArray(positions, i);
          pB.fromArray(positions, i + 3);
          pC.fromArray(positions, i + 6);
          cb.subVectors(pC, pB);
          ab.subVectors(pA, pB);
          cb.cross(ab);
          normals[i] = cb.x;
          normals[i + 1] = cb.y;
          normals[i + 2] = cb.z;
          normals[i + 3] = cb.x;
          normals[i + 4] = cb.y;
          normals[i + 5] = cb.z;
          normals[i + 6] = cb.x;
          normals[i + 7] = cb.y;
          normals[i + 8] = cb.z;
        }
      }

      this.normalizeNormals();
      attributes.normal.needsUpdate = true;
    }
  },
  merge: function (geometry, offset) {
    if (!(geometry && geometry.isBufferGeometry)) {
      console.error('THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.', geometry);
      return;
    }

    if (offset === undefined) {
      offset = 0;
      console.warn('THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. ' + 'Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge.');
    }

    var attributes = this.attributes;

    for (var key in attributes) {
      if (geometry.attributes[key] === undefined) continue;
      var attribute1 = attributes[key];
      var attributeArray1 = attribute1.array;
      var attribute2 = geometry.attributes[key];
      var attributeArray2 = attribute2.array;
      var attributeSize = attribute2.itemSize;

      for (var i = 0, j = attributeSize * offset; i < attributeArray2.length; i++, j++) {
        attributeArray1[j] = attributeArray2[i];
      }
    }

    return this;
  },
  normalizeNormals: function () {
    var vector = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    return function normalizeNormals() {
      var normals = this.attributes.normal;

      for (var i = 0, il = normals.count; i < il; i++) {
        vector.x = normals.getX(i);
        vector.y = normals.getY(i);
        vector.z = normals.getZ(i);
        vector.normalize();
        normals.setXYZ(i, vector.x, vector.y, vector.z);
      }
    };
  }(),
  toNonIndexed: function () {
    if (this.index === null) {
      console.warn('THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed.');
      return this;
    }

    var geometry2 = new BufferGeometry();
    var indices = this.index.array;
    var attributes = this.attributes;

    for (var name in attributes) {
      var attribute = attributes[name];
      var array = attribute.array;
      var itemSize = attribute.itemSize;
      var array2 = new array.constructor(indices.length * itemSize);
      var index = 0,
          index2 = 0;

      for (var i = 0, l = indices.length; i < l; i++) {
        index = indices[i] * itemSize;

        for (var j = 0; j < itemSize; j++) {
          array2[index2++] = array[index++];
        }
      }

      geometry2.addAttribute(name, new _BufferAttribute_js__WEBPACK_IMPORTED_MODULE_3__["BufferAttribute"](array2, itemSize));
    }

    var groups = this.groups;

    for (var i = 0, l = groups.length; i < l; i++) {
      var group = groups[i];
      geometry2.addGroup(group.start, group.count, group.materialIndex);
    }

    return geometry2;
  },
  toJSON: function () {
    var data = {
      metadata: {
        version: 4.5,
        type: 'BufferGeometry',
        generator: 'BufferGeometry.toJSON'
      }
    }; // standard BufferGeometry serialization

    data.uuid = this.uuid;
    data.type = this.type;
    if (this.name !== '') data.name = this.name;
    if (Object.keys(this.userData).length > 0) data.userData = this.userData;

    if (this.parameters !== undefined) {
      var parameters = this.parameters;

      for (var key in parameters) {
        if (parameters[key] !== undefined) data[key] = parameters[key];
      }

      return data;
    }

    data.data = {
      attributes: {}
    };
    var index = this.index;

    if (index !== null) {
      var array = Array.prototype.slice.call(index.array);
      data.data.index = {
        type: index.array.constructor.name,
        array: array
      };
    }

    var attributes = this.attributes;

    for (var key in attributes) {
      var attribute = attributes[key];
      var array = Array.prototype.slice.call(attribute.array);
      data.data.attributes[key] = {
        itemSize: attribute.itemSize,
        type: attribute.array.constructor.name,
        array: array,
        normalized: attribute.normalized
      };
    }

    var groups = this.groups;

    if (groups.length > 0) {
      data.data.groups = JSON.parse(JSON.stringify(groups));
    }

    var boundingSphere = this.boundingSphere;

    if (boundingSphere !== null) {
      data.data.boundingSphere = {
        center: boundingSphere.center.toArray(),
        radius: boundingSphere.radius
      };
    }

    return data;
  },
  clone: function () {
    /*
     // Handle primitives
    	 var parameters = this.parameters;
    	 if ( parameters !== undefined ) {
    	 var values = [];
    	 for ( var key in parameters ) {
    	 values.push( parameters[ key ] );
    	 }
    	 var geometry = Object.create( this.constructor.prototype );
     this.constructor.apply( geometry, values );
     return geometry;
    	 }
    	 return new this.constructor().copy( this );
     */
    return new BufferGeometry().copy(this);
  },
  copy: function (source) {
    var name, i, l; // reset

    this.index = null;
    this.attributes = {};
    this.morphAttributes = {};
    this.groups = [];
    this.boundingBox = null;
    this.boundingSphere = null; // name

    this.name = source.name; // index

    var index = source.index;

    if (index !== null) {
      this.setIndex(index.clone());
    } // attributes


    var attributes = source.attributes;

    for (name in attributes) {
      var attribute = attributes[name];
      this.addAttribute(name, attribute.clone());
    } // morph attributes


    var morphAttributes = source.morphAttributes;

    for (name in morphAttributes) {
      var array = [];
      var morphAttribute = morphAttributes[name]; // morphAttribute: array of Float32BufferAttributes

      for (i = 0, l = morphAttribute.length; i < l; i++) {
        array.push(morphAttribute[i].clone());
      }

      this.morphAttributes[name] = array;
    } // groups


    var groups = source.groups;

    for (i = 0, l = groups.length; i < l; i++) {
      var group = groups[i];
      this.addGroup(group.start, group.count, group.materialIndex);
    } // bounding box


    var boundingBox = source.boundingBox;

    if (boundingBox !== null) {
      this.boundingBox = boundingBox.clone();
    } // bounding sphere


    var boundingSphere = source.boundingSphere;

    if (boundingSphere !== null) {
      this.boundingSphere = boundingSphere.clone();
    } // draw range


    this.drawRange.start = source.drawRange.start;
    this.drawRange.count = source.drawRange.count; // user data

    this.userData = source.userData;
    return this;
  },
  dispose: function () {
    this.dispatchEvent({
      type: 'dispose'
    });
  }
});


/***/ }),

/***/ "./node_modules/three/src/core/DirectGeometry.js":
/*!*******************************************************!*\
  !*** ./node_modules/three/src/core/DirectGeometry.js ***!
  \*******************************************************/
/*! exports provided: DirectGeometry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DirectGeometry", function() { return DirectGeometry; });
/* harmony import */ var _math_Vector2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Vector2.js */ "./node_modules/three/src/math/Vector2.js");
/**
 * @author mrdoob / http://mrdoob.com/
 */


function DirectGeometry() {
  this.vertices = [];
  this.normals = [];
  this.colors = [];
  this.uvs = [];
  this.uvs2 = [];
  this.groups = [];
  this.morphTargets = {};
  this.skinWeights = [];
  this.skinIndices = []; // this.lineDistances = [];

  this.boundingBox = null;
  this.boundingSphere = null; // update flags

  this.verticesNeedUpdate = false;
  this.normalsNeedUpdate = false;
  this.colorsNeedUpdate = false;
  this.uvsNeedUpdate = false;
  this.groupsNeedUpdate = false;
}

Object.assign(DirectGeometry.prototype, {
  computeGroups: function (geometry) {
    var group;
    var groups = [];
    var materialIndex = undefined;
    var faces = geometry.faces;

    for (var i = 0; i < faces.length; i++) {
      var face = faces[i]; // materials

      if (face.materialIndex !== materialIndex) {
        materialIndex = face.materialIndex;

        if (group !== undefined) {
          group.count = i * 3 - group.start;
          groups.push(group);
        }

        group = {
          start: i * 3,
          materialIndex: materialIndex
        };
      }
    }

    if (group !== undefined) {
      group.count = i * 3 - group.start;
      groups.push(group);
    }

    this.groups = groups;
  },
  fromGeometry: function (geometry) {
    var faces = geometry.faces;
    var vertices = geometry.vertices;
    var faceVertexUvs = geometry.faceVertexUvs;
    var hasFaceVertexUv = faceVertexUvs[0] && faceVertexUvs[0].length > 0;
    var hasFaceVertexUv2 = faceVertexUvs[1] && faceVertexUvs[1].length > 0; // morphs

    var morphTargets = geometry.morphTargets;
    var morphTargetsLength = morphTargets.length;
    var morphTargetsPosition;

    if (morphTargetsLength > 0) {
      morphTargetsPosition = [];

      for (var i = 0; i < morphTargetsLength; i++) {
        morphTargetsPosition[i] = [];
      }

      this.morphTargets.position = morphTargetsPosition;
    }

    var morphNormals = geometry.morphNormals;
    var morphNormalsLength = morphNormals.length;
    var morphTargetsNormal;

    if (morphNormalsLength > 0) {
      morphTargetsNormal = [];

      for (var i = 0; i < morphNormalsLength; i++) {
        morphTargetsNormal[i] = [];
      }

      this.morphTargets.normal = morphTargetsNormal;
    } // skins


    var skinIndices = geometry.skinIndices;
    var skinWeights = geometry.skinWeights;
    var hasSkinIndices = skinIndices.length === vertices.length;
    var hasSkinWeights = skinWeights.length === vertices.length; //

    if (vertices.length > 0 && faces.length === 0) {
      console.error('THREE.DirectGeometry: Faceless geometries are not supported.');
    }

    for (var i = 0; i < faces.length; i++) {
      var face = faces[i];
      this.vertices.push(vertices[face.a], vertices[face.b], vertices[face.c]);
      var vertexNormals = face.vertexNormals;

      if (vertexNormals.length === 3) {
        this.normals.push(vertexNormals[0], vertexNormals[1], vertexNormals[2]);
      } else {
        var normal = face.normal;
        this.normals.push(normal, normal, normal);
      }

      var vertexColors = face.vertexColors;

      if (vertexColors.length === 3) {
        this.colors.push(vertexColors[0], vertexColors[1], vertexColors[2]);
      } else {
        var color = face.color;
        this.colors.push(color, color, color);
      }

      if (hasFaceVertexUv === true) {
        var vertexUvs = faceVertexUvs[0][i];

        if (vertexUvs !== undefined) {
          this.uvs.push(vertexUvs[0], vertexUvs[1], vertexUvs[2]);
        } else {
          console.warn('THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ', i);
          this.uvs.push(new _math_Vector2_js__WEBPACK_IMPORTED_MODULE_0__["Vector2"](), new _math_Vector2_js__WEBPACK_IMPORTED_MODULE_0__["Vector2"](), new _math_Vector2_js__WEBPACK_IMPORTED_MODULE_0__["Vector2"]());
        }
      }

      if (hasFaceVertexUv2 === true) {
        var vertexUvs = faceVertexUvs[1][i];

        if (vertexUvs !== undefined) {
          this.uvs2.push(vertexUvs[0], vertexUvs[1], vertexUvs[2]);
        } else {
          console.warn('THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ', i);
          this.uvs2.push(new _math_Vector2_js__WEBPACK_IMPORTED_MODULE_0__["Vector2"](), new _math_Vector2_js__WEBPACK_IMPORTED_MODULE_0__["Vector2"](), new _math_Vector2_js__WEBPACK_IMPORTED_MODULE_0__["Vector2"]());
        }
      } // morphs


      for (var j = 0; j < morphTargetsLength; j++) {
        var morphTarget = morphTargets[j].vertices;
        morphTargetsPosition[j].push(morphTarget[face.a], morphTarget[face.b], morphTarget[face.c]);
      }

      for (var j = 0; j < morphNormalsLength; j++) {
        var morphNormal = morphNormals[j].vertexNormals[i];
        morphTargetsNormal[j].push(morphNormal.a, morphNormal.b, morphNormal.c);
      } // skins


      if (hasSkinIndices) {
        this.skinIndices.push(skinIndices[face.a], skinIndices[face.b], skinIndices[face.c]);
      }

      if (hasSkinWeights) {
        this.skinWeights.push(skinWeights[face.a], skinWeights[face.b], skinWeights[face.c]);
      }
    }

    this.computeGroups(geometry);
    this.verticesNeedUpdate = geometry.verticesNeedUpdate;
    this.normalsNeedUpdate = geometry.normalsNeedUpdate;
    this.colorsNeedUpdate = geometry.colorsNeedUpdate;
    this.uvsNeedUpdate = geometry.uvsNeedUpdate;
    this.groupsNeedUpdate = geometry.groupsNeedUpdate;
    return this;
  }
});


/***/ }),

/***/ "./node_modules/three/src/core/EventDispatcher.js":
/*!********************************************************!*\
  !*** ./node_modules/three/src/core/EventDispatcher.js ***!
  \********************************************************/
/*! exports provided: EventDispatcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventDispatcher", function() { return EventDispatcher; });
/**
 * https://github.com/mrdoob/eventdispatcher.js/
 */
function EventDispatcher() {}

Object.assign(EventDispatcher.prototype, {
  addEventListener: function (type, listener) {
    if (this._listeners === undefined) this._listeners = {};
    var listeners = this._listeners;

    if (listeners[type] === undefined) {
      listeners[type] = [];
    }

    if (listeners[type].indexOf(listener) === -1) {
      listeners[type].push(listener);
    }
  },
  hasEventListener: function (type, listener) {
    if (this._listeners === undefined) return false;
    var listeners = this._listeners;
    return listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1;
  },
  removeEventListener: function (type, listener) {
    if (this._listeners === undefined) return;
    var listeners = this._listeners;
    var listenerArray = listeners[type];

    if (listenerArray !== undefined) {
      var index = listenerArray.indexOf(listener);

      if (index !== -1) {
        listenerArray.splice(index, 1);
      }
    }
  },
  dispatchEvent: function (event) {
    if (this._listeners === undefined) return;
    var listeners = this._listeners;
    var listenerArray = listeners[event.type];

    if (listenerArray !== undefined) {
      event.target = this;
      var array = listenerArray.slice(0);

      for (var i = 0, l = array.length; i < l; i++) {
        array[i].call(this, event);
      }
    }
  }
});


/***/ }),

/***/ "./node_modules/three/src/core/Layers.js":
/*!***********************************************!*\
  !*** ./node_modules/three/src/core/Layers.js ***!
  \***********************************************/
/*! exports provided: Layers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layers", function() { return Layers; });
/**
 * @author mrdoob / http://mrdoob.com/
 */
function Layers() {
  this.mask = 1 | 0;
}

Object.assign(Layers.prototype, {
  set: function (channel) {
    this.mask = 1 << channel | 0;
  },
  enable: function (channel) {
    this.mask |= 1 << channel | 0;
  },
  toggle: function (channel) {
    this.mask ^= 1 << channel | 0;
  },
  disable: function (channel) {
    this.mask &= ~(1 << channel | 0);
  },
  test: function (layers) {
    return (this.mask & layers.mask) !== 0;
  }
});


/***/ }),

/***/ "./node_modules/three/src/core/Object3D.js":
/*!*************************************************!*\
  !*** ./node_modules/three/src/core/Object3D.js ***!
  \*************************************************/
/*! exports provided: Object3D */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Object3D", function() { return Object3D; });
/* harmony import */ var _math_Quaternion_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Quaternion.js */ "./node_modules/three/src/math/Quaternion.js");
/* harmony import */ var _math_Vector3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Vector3.js */ "./node_modules/three/src/math/Vector3.js");
/* harmony import */ var _math_Matrix4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Matrix4.js */ "./node_modules/three/src/math/Matrix4.js");
/* harmony import */ var _EventDispatcher_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EventDispatcher.js */ "./node_modules/three/src/core/EventDispatcher.js");
/* harmony import */ var _math_Euler_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../math/Euler.js */ "./node_modules/three/src/math/Euler.js");
/* harmony import */ var _Layers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Layers.js */ "./node_modules/three/src/core/Layers.js");
/* harmony import */ var _math_Matrix3_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../math/Matrix3.js */ "./node_modules/three/src/math/Matrix3.js");
/* harmony import */ var _math_Math_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../math/Math.js */ "./node_modules/three/src/math/Math.js");








/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author elephantatwork / www.elephantatwork.ch
 */

var object3DId = 0;

function Object3D() {
  Object.defineProperty(this, 'id', {
    value: object3DId++
  });
  this.uuid = _math_Math_js__WEBPACK_IMPORTED_MODULE_7__["_Math"].generateUUID();
  this.name = '';
  this.type = 'Object3D';
  this.parent = null;
  this.children = [];
  this.up = Object3D.DefaultUp.clone();
  var position = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
  var rotation = new _math_Euler_js__WEBPACK_IMPORTED_MODULE_4__["Euler"]();
  var quaternion = new _math_Quaternion_js__WEBPACK_IMPORTED_MODULE_0__["Quaternion"]();
  var scale = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_1__["Vector3"](1, 1, 1);

  function onRotationChange() {
    quaternion.setFromEuler(rotation, false);
  }

  function onQuaternionChange() {
    rotation.setFromQuaternion(quaternion, undefined, false);
  }

  rotation.onChange(onRotationChange);
  quaternion.onChange(onQuaternionChange);
  Object.defineProperties(this, {
    position: {
      enumerable: true,
      value: position
    },
    rotation: {
      enumerable: true,
      value: rotation
    },
    quaternion: {
      enumerable: true,
      value: quaternion
    },
    scale: {
      enumerable: true,
      value: scale
    },
    modelViewMatrix: {
      value: new _math_Matrix4_js__WEBPACK_IMPORTED_MODULE_2__["Matrix4"]()
    },
    normalMatrix: {
      value: new _math_Matrix3_js__WEBPACK_IMPORTED_MODULE_6__["Matrix3"]()
    }
  });
  this.matrix = new _math_Matrix4_js__WEBPACK_IMPORTED_MODULE_2__["Matrix4"]();
  this.matrixWorld = new _math_Matrix4_js__WEBPACK_IMPORTED_MODULE_2__["Matrix4"]();
  this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate;
  this.matrixWorldNeedsUpdate = false;
  this.layers = new _Layers_js__WEBPACK_IMPORTED_MODULE_5__["Layers"]();
  this.visible = true;
  this.castShadow = false;
  this.receiveShadow = false;
  this.frustumCulled = true;
  this.renderOrder = 0;
  this.userData = {};
}

Object3D.DefaultUp = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_1__["Vector3"](0, 1, 0);
Object3D.DefaultMatrixAutoUpdate = true;
Object3D.prototype = Object.assign(Object.create(_EventDispatcher_js__WEBPACK_IMPORTED_MODULE_3__["EventDispatcher"].prototype), {
  constructor: Object3D,
  isObject3D: true,
  onBeforeRender: function () {},
  onAfterRender: function () {},
  applyMatrix: function (matrix) {
    this.matrix.multiplyMatrices(matrix, this.matrix);
    this.matrix.decompose(this.position, this.quaternion, this.scale);
  },
  applyQuaternion: function (q) {
    this.quaternion.premultiply(q);
    return this;
  },
  setRotationFromAxisAngle: function (axis, angle) {
    // assumes axis is normalized
    this.quaternion.setFromAxisAngle(axis, angle);
  },
  setRotationFromEuler: function (euler) {
    this.quaternion.setFromEuler(euler, true);
  },
  setRotationFromMatrix: function (m) {
    // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
    this.quaternion.setFromRotationMatrix(m);
  },
  setRotationFromQuaternion: function (q) {
    // assumes q is normalized
    this.quaternion.copy(q);
  },
  rotateOnAxis: function () {
    // rotate object on axis in object space
    // axis is assumed to be normalized
    var q1 = new _math_Quaternion_js__WEBPACK_IMPORTED_MODULE_0__["Quaternion"]();
    return function rotateOnAxis(axis, angle) {
      q1.setFromAxisAngle(axis, angle);
      this.quaternion.multiply(q1);
      return this;
    };
  }(),
  rotateOnWorldAxis: function () {
    // rotate object on axis in world space
    // axis is assumed to be normalized
    // method assumes no rotated parent
    var q1 = new _math_Quaternion_js__WEBPACK_IMPORTED_MODULE_0__["Quaternion"]();
    return function rotateOnWorldAxis(axis, angle) {
      q1.setFromAxisAngle(axis, angle);
      this.quaternion.premultiply(q1);
      return this;
    };
  }(),
  rotateX: function () {
    var v1 = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_1__["Vector3"](1, 0, 0);
    return function rotateX(angle) {
      return this.rotateOnAxis(v1, angle);
    };
  }(),
  rotateY: function () {
    var v1 = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_1__["Vector3"](0, 1, 0);
    return function rotateY(angle) {
      return this.rotateOnAxis(v1, angle);
    };
  }(),
  rotateZ: function () {
    var v1 = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_1__["Vector3"](0, 0, 1);
    return function rotateZ(angle) {
      return this.rotateOnAxis(v1, angle);
    };
  }(),
  translateOnAxis: function () {
    // translate object by distance along axis in object space
    // axis is assumed to be normalized
    var v1 = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
    return function translateOnAxis(axis, distance) {
      v1.copy(axis).applyQuaternion(this.quaternion);
      this.position.add(v1.multiplyScalar(distance));
      return this;
    };
  }(),
  translateX: function () {
    var v1 = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_1__["Vector3"](1, 0, 0);
    return function translateX(distance) {
      return this.translateOnAxis(v1, distance);
    };
  }(),
  translateY: function () {
    var v1 = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_1__["Vector3"](0, 1, 0);
    return function translateY(distance) {
      return this.translateOnAxis(v1, distance);
    };
  }(),
  translateZ: function () {
    var v1 = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_1__["Vector3"](0, 0, 1);
    return function translateZ(distance) {
      return this.translateOnAxis(v1, distance);
    };
  }(),
  localToWorld: function (vector) {
    return vector.applyMatrix4(this.matrixWorld);
  },
  worldToLocal: function () {
    var m1 = new _math_Matrix4_js__WEBPACK_IMPORTED_MODULE_2__["Matrix4"]();
    return function worldToLocal(vector) {
      return vector.applyMatrix4(m1.getInverse(this.matrixWorld));
    };
  }(),
  lookAt: function () {
    // This method does not support objects with rotated and/or translated parent(s)
    var m1 = new _math_Matrix4_js__WEBPACK_IMPORTED_MODULE_2__["Matrix4"]();
    var vector = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
    return function lookAt(x, y, z) {
      if (x.isVector3) {
        vector.copy(x);
      } else {
        vector.set(x, y, z);
      }

      if (this.isCamera) {
        m1.lookAt(this.position, vector, this.up);
      } else {
        m1.lookAt(vector, this.position, this.up);
      }

      this.quaternion.setFromRotationMatrix(m1);
    };
  }(),
  add: function (object) {
    if (arguments.length > 1) {
      for (var i = 0; i < arguments.length; i++) {
        this.add(arguments[i]);
      }

      return this;
    }

    if (object === this) {
      console.error("THREE.Object3D.add: object can't be added as a child of itself.", object);
      return this;
    }

    if (object && object.isObject3D) {
      if (object.parent !== null) {
        object.parent.remove(object);
      }

      object.parent = this;
      object.dispatchEvent({
        type: 'added'
      });
      this.children.push(object);
    } else {
      console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", object);
    }

    return this;
  },
  remove: function (object) {
    if (arguments.length > 1) {
      for (var i = 0; i < arguments.length; i++) {
        this.remove(arguments[i]);
      }

      return this;
    }

    var index = this.children.indexOf(object);

    if (index !== -1) {
      object.parent = null;
      object.dispatchEvent({
        type: 'removed'
      });
      this.children.splice(index, 1);
    }

    return this;
  },
  getObjectById: function (id) {
    return this.getObjectByProperty('id', id);
  },
  getObjectByName: function (name) {
    return this.getObjectByProperty('name', name);
  },
  getObjectByProperty: function (name, value) {
    if (this[name] === value) return this;

    for (var i = 0, l = this.children.length; i < l; i++) {
      var child = this.children[i];
      var object = child.getObjectByProperty(name, value);

      if (object !== undefined) {
        return object;
      }
    }

    return undefined;
  },
  getWorldPosition: function (target) {
    if (target === undefined) {
      console.warn('THREE.Object3D: .getWorldPosition() target is now required');
      target = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
    }

    this.updateMatrixWorld(true);
    return target.setFromMatrixPosition(this.matrixWorld);
  },
  getWorldQuaternion: function () {
    var position = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
    var scale = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
    return function getWorldQuaternion(target) {
      if (target === undefined) {
        console.warn('THREE.Object3D: .getWorldQuaternion() target is now required');
        target = new _math_Quaternion_js__WEBPACK_IMPORTED_MODULE_0__["Quaternion"]();
      }

      this.updateMatrixWorld(true);
      this.matrixWorld.decompose(position, target, scale);
      return target;
    };
  }(),
  getWorldScale: function () {
    var position = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
    var quaternion = new _math_Quaternion_js__WEBPACK_IMPORTED_MODULE_0__["Quaternion"]();
    return function getWorldScale(target) {
      if (target === undefined) {
        console.warn('THREE.Object3D: .getWorldScale() target is now required');
        target = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
      }

      this.updateMatrixWorld(true);
      this.matrixWorld.decompose(position, quaternion, target);
      return target;
    };
  }(),
  getWorldDirection: function () {
    var quaternion = new _math_Quaternion_js__WEBPACK_IMPORTED_MODULE_0__["Quaternion"]();
    return function getWorldDirection(target) {
      if (target === undefined) {
        console.warn('THREE.Object3D: .getWorldDirection() target is now required');
        target = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
      }

      this.getWorldQuaternion(quaternion);
      return target.set(0, 0, 1).applyQuaternion(quaternion);
    };
  }(),
  raycast: function () {},
  traverse: function (callback) {
    callback(this);
    var children = this.children;

    for (var i = 0, l = children.length; i < l; i++) {
      children[i].traverse(callback);
    }
  },
  traverseVisible: function (callback) {
    if (this.visible === false) return;
    callback(this);
    var children = this.children;

    for (var i = 0, l = children.length; i < l; i++) {
      children[i].traverseVisible(callback);
    }
  },
  traverseAncestors: function (callback) {
    var parent = this.parent;

    if (parent !== null) {
      callback(parent);
      parent.traverseAncestors(callback);
    }
  },
  updateMatrix: function () {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    this.matrixWorldNeedsUpdate = true;
  },
  updateMatrixWorld: function (force) {
    if (this.matrixAutoUpdate) this.updateMatrix();

    if (this.matrixWorldNeedsUpdate || force) {
      if (this.parent === null) {
        this.matrixWorld.copy(this.matrix);
      } else {
        this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
      }

      this.matrixWorldNeedsUpdate = false;
      force = true;
    } // update children


    var children = this.children;

    for (var i = 0, l = children.length; i < l; i++) {
      children[i].updateMatrixWorld(force);
    }
  },
  toJSON: function (meta) {
    // meta is a string when called from JSON.stringify
    var isRootObject = meta === undefined || typeof meta === 'string';
    var output = {}; // meta is a hash used to collect geometries, materials.
    // not providing it implies that this is the root object
    // being serialized.

    if (isRootObject) {
      // initialize meta obj
      meta = {
        geometries: {},
        materials: {},
        textures: {},
        images: {},
        shapes: {}
      };
      output.metadata = {
        version: 4.5,
        type: 'Object',
        generator: 'Object3D.toJSON'
      };
    } // standard Object3D serialization


    var object = {};
    object.uuid = this.uuid;
    object.type = this.type;
    if (this.name !== '') object.name = this.name;
    if (this.castShadow === true) object.castShadow = true;
    if (this.receiveShadow === true) object.receiveShadow = true;
    if (this.visible === false) object.visible = false;
    if (this.frustumCulled === false) object.frustumCulled = false;
    if (this.renderOrder !== 0) object.renderOrder = this.renderOrder;
    if (JSON.stringify(this.userData) !== '{}') object.userData = this.userData;
    object.layers = this.layers.mask;
    object.matrix = this.matrix.toArray();
    if (this.matrixAutoUpdate === false) object.matrixAutoUpdate = false; //

    function serialize(library, element) {
      if (library[element.uuid] === undefined) {
        library[element.uuid] = element.toJSON(meta);
      }

      return element.uuid;
    }

    if (this.geometry !== undefined) {
      object.geometry = serialize(meta.geometries, this.geometry);
      var parameters = this.geometry.parameters;

      if (parameters !== undefined && parameters.shapes !== undefined) {
        var shapes = parameters.shapes;

        if (Array.isArray(shapes)) {
          for (var i = 0, l = shapes.length; i < l; i++) {
            var shape = shapes[i];
            serialize(meta.shapes, shape);
          }
        } else {
          serialize(meta.shapes, shapes);
        }
      }
    }

    if (this.material !== undefined) {
      if (Array.isArray(this.material)) {
        var uuids = [];

        for (var i = 0, l = this.material.length; i < l; i++) {
          uuids.push(serialize(meta.materials, this.material[i]));
        }

        object.material = uuids;
      } else {
        object.material = serialize(meta.materials, this.material);
      }
    } //


    if (this.children.length > 0) {
      object.children = [];

      for (var i = 0; i < this.children.length; i++) {
        object.children.push(this.children[i].toJSON(meta).object);
      }
    }

    if (isRootObject) {
      var geometries = extractFromCache(meta.geometries);
      var materials = extractFromCache(meta.materials);
      var textures = extractFromCache(meta.textures);
      var images = extractFromCache(meta.images);
      var shapes = extractFromCache(meta.shapes);
      if (geometries.length > 0) output.geometries = geometries;
      if (materials.length > 0) output.materials = materials;
      if (textures.length > 0) output.textures = textures;
      if (images.length > 0) output.images = images;
      if (shapes.length > 0) output.shapes = shapes;
    }

    output.object = object;
    return output; // extract data from the cache hash
    // remove metadata on each item
    // and return as array

    function extractFromCache(cache) {
      var values = [];

      for (var key in cache) {
        var data = cache[key];
        delete data.metadata;
        values.push(data);
      }

      return values;
    }
  },
  clone: function (recursive) {
    return new this.constructor().copy(this, recursive);
  },
  copy: function (source, recursive) {
    if (recursive === undefined) recursive = true;
    this.name = source.name;
    this.up.copy(source.up);
    this.position.copy(source.position);
    this.quaternion.copy(source.quaternion);
    this.scale.copy(source.scale);
    this.matrix.copy(source.matrix);
    this.matrixWorld.copy(source.matrixWorld);
    this.matrixAutoUpdate = source.matrixAutoUpdate;
    this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;
    this.layers.mask = source.layers.mask;
    this.visible = source.visible;
    this.castShadow = source.castShadow;
    this.receiveShadow = source.receiveShadow;
    this.frustumCulled = source.frustumCulled;
    this.renderOrder = source.renderOrder;
    this.userData = JSON.parse(JSON.stringify(source.userData));

    if (recursive === true) {
      for (var i = 0; i < source.children.length; i++) {
        var child = source.children[i];
        this.add(child.clone());
      }
    }

    return this;
  }
});


/***/ }),

/***/ "./node_modules/three/src/helpers/GridHelper.js":
/*!******************************************************!*\
  !*** ./node_modules/three/src/helpers/GridHelper.js ***!
  \******************************************************/
/*! exports provided: GridHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridHelper", function() { return GridHelper; });
/* harmony import */ var _objects_LineSegments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../objects/LineSegments.js */ "./node_modules/three/src/objects/LineSegments.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants.js */ "./node_modules/three/src/constants.js");
/* harmony import */ var _materials_LineBasicMaterial_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../materials/LineBasicMaterial.js */ "./node_modules/three/src/materials/LineBasicMaterial.js");
/* harmony import */ var _core_BufferAttribute_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/BufferAttribute.js */ "./node_modules/three/src/core/BufferAttribute.js");
/* harmony import */ var _core_BufferGeometry_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/BufferGeometry.js */ "./node_modules/three/src/core/BufferGeometry.js");
/* harmony import */ var _math_Color_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../math/Color.js */ "./node_modules/three/src/math/Color.js");
/**
 * @author mrdoob / http://mrdoob.com/
 */







function GridHelper(size, divisions, color1, color2) {
  size = size || 10;
  divisions = divisions || 10;
  color1 = new _math_Color_js__WEBPACK_IMPORTED_MODULE_5__["Color"](color1 !== undefined ? color1 : 0x444444);
  color2 = new _math_Color_js__WEBPACK_IMPORTED_MODULE_5__["Color"](color2 !== undefined ? color2 : 0x888888);
  var center = divisions / 2;
  var step = size / divisions;
  var halfSize = size / 2;
  var vertices = [],
      colors = [];

  for (var i = 0, j = 0, k = -halfSize; i <= divisions; i++, k += step) {
    vertices.push(-halfSize, 0, k, halfSize, 0, k);
    vertices.push(k, 0, -halfSize, k, 0, halfSize);
    var color = i === center ? color1 : color2;
    color.toArray(colors, j);
    j += 3;
    color.toArray(colors, j);
    j += 3;
    color.toArray(colors, j);
    j += 3;
    color.toArray(colors, j);
    j += 3;
  }

  var geometry = new _core_BufferGeometry_js__WEBPACK_IMPORTED_MODULE_4__["BufferGeometry"]();
  geometry.addAttribute('position', new _core_BufferAttribute_js__WEBPACK_IMPORTED_MODULE_3__["Float32BufferAttribute"](vertices, 3));
  geometry.addAttribute('color', new _core_BufferAttribute_js__WEBPACK_IMPORTED_MODULE_3__["Float32BufferAttribute"](colors, 3));
  var material = new _materials_LineBasicMaterial_js__WEBPACK_IMPORTED_MODULE_2__["LineBasicMaterial"]({
    vertexColors: _constants_js__WEBPACK_IMPORTED_MODULE_1__["VertexColors"]
  });
  _objects_LineSegments_js__WEBPACK_IMPORTED_MODULE_0__["LineSegments"].call(this, geometry, material);
}

GridHelper.prototype = Object.create(_objects_LineSegments_js__WEBPACK_IMPORTED_MODULE_0__["LineSegments"].prototype);
GridHelper.prototype.constructor = GridHelper;


/***/ }),

/***/ "./node_modules/three/src/materials/LineBasicMaterial.js":
/*!***************************************************************!*\
  !*** ./node_modules/three/src/materials/LineBasicMaterial.js ***!
  \***************************************************************/
/*! exports provided: LineBasicMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineBasicMaterial", function() { return LineBasicMaterial; });
/* harmony import */ var _Material_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Material.js */ "./node_modules/three/src/materials/Material.js");
/* harmony import */ var _math_Color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Color.js */ "./node_modules/three/src/math/Color.js");


/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 *
 * parameters = {
 *  color: <hex>,
 *  opacity: <float>,
 *
 *  linewidth: <float>,
 *  linecap: "round",
 *  linejoin: "round"
 * }
 */

function LineBasicMaterial(parameters) {
  _Material_js__WEBPACK_IMPORTED_MODULE_0__["Material"].call(this);
  this.type = 'LineBasicMaterial';
  this.color = new _math_Color_js__WEBPACK_IMPORTED_MODULE_1__["Color"](0xffffff);
  this.linewidth = 1;
  this.linecap = 'round';
  this.linejoin = 'round';
  this.lights = false;
  this.setValues(parameters);
}

LineBasicMaterial.prototype = Object.create(_Material_js__WEBPACK_IMPORTED_MODULE_0__["Material"].prototype);
LineBasicMaterial.prototype.constructor = LineBasicMaterial;
LineBasicMaterial.prototype.isLineBasicMaterial = true;

LineBasicMaterial.prototype.copy = function (source) {
  _Material_js__WEBPACK_IMPORTED_MODULE_0__["Material"].prototype.copy.call(this, source);
  this.color.copy(source.color);
  this.linewidth = source.linewidth;
  this.linecap = source.linecap;
  this.linejoin = source.linejoin;
  return this;
};



/***/ }),

/***/ "./node_modules/three/src/materials/Material.js":
/*!******************************************************!*\
  !*** ./node_modules/three/src/materials/Material.js ***!
  \******************************************************/
/*! exports provided: Material */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Material", function() { return Material; });
/* harmony import */ var _core_EventDispatcher_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/EventDispatcher.js */ "./node_modules/three/src/core/EventDispatcher.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants.js */ "./node_modules/three/src/constants.js");
/* harmony import */ var _math_Math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Math.js */ "./node_modules/three/src/math/Math.js");



/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

var materialId = 0;

function Material() {
  Object.defineProperty(this, 'id', {
    value: materialId++
  });
  this.uuid = _math_Math_js__WEBPACK_IMPORTED_MODULE_2__["_Math"].generateUUID();
  this.name = '';
  this.type = 'Material';
  this.fog = true;
  this.lights = true;
  this.blending = _constants_js__WEBPACK_IMPORTED_MODULE_1__["NormalBlending"];
  this.side = _constants_js__WEBPACK_IMPORTED_MODULE_1__["FrontSide"];
  this.flatShading = false;
  this.vertexColors = _constants_js__WEBPACK_IMPORTED_MODULE_1__["NoColors"]; // THREE.NoColors, THREE.VertexColors, THREE.FaceColors

  this.opacity = 1;
  this.transparent = false;
  this.blendSrc = _constants_js__WEBPACK_IMPORTED_MODULE_1__["SrcAlphaFactor"];
  this.blendDst = _constants_js__WEBPACK_IMPORTED_MODULE_1__["OneMinusSrcAlphaFactor"];
  this.blendEquation = _constants_js__WEBPACK_IMPORTED_MODULE_1__["AddEquation"];
  this.blendSrcAlpha = null;
  this.blendDstAlpha = null;
  this.blendEquationAlpha = null;
  this.depthFunc = _constants_js__WEBPACK_IMPORTED_MODULE_1__["LessEqualDepth"];
  this.depthTest = true;
  this.depthWrite = true;
  this.clippingPlanes = null;
  this.clipIntersection = false;
  this.clipShadows = false;
  this.shadowSide = null;
  this.colorWrite = true;
  this.precision = null; // override the renderer's default precision for this material

  this.polygonOffset = false;
  this.polygonOffsetFactor = 0;
  this.polygonOffsetUnits = 0;
  this.dithering = false;
  this.alphaTest = 0;
  this.premultipliedAlpha = false;
  this.overdraw = 0; // Overdrawn pixels (typically between 0 and 1) for fixing antialiasing gaps in CanvasRenderer

  this.visible = true;
  this.userData = {};
  this.needsUpdate = true;
}

Material.prototype = Object.assign(Object.create(_core_EventDispatcher_js__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"].prototype), {
  constructor: Material,
  isMaterial: true,
  onBeforeCompile: function () {},
  setValues: function (values) {
    if (values === undefined) return;

    for (var key in values) {
      var newValue = values[key];

      if (newValue === undefined) {
        console.warn("THREE.Material: '" + key + "' parameter is undefined.");
        continue;
      } // for backward compatability if shading is set in the constructor


      if (key === 'shading') {
        console.warn('THREE.' + this.type + ': .shading has been removed. Use the boolean .flatShading instead.');
        this.flatShading = newValue === _constants_js__WEBPACK_IMPORTED_MODULE_1__["FlatShading"] ? true : false;
        continue;
      }

      var currentValue = this[key];

      if (currentValue === undefined) {
        console.warn("THREE." + this.type + ": '" + key + "' is not a property of this material.");
        continue;
      }

      if (currentValue && currentValue.isColor) {
        currentValue.set(newValue);
      } else if (currentValue && currentValue.isVector3 && newValue && newValue.isVector3) {
        currentValue.copy(newValue);
      } else if (key === 'overdraw') {
        // ensure overdraw is backwards-compatible with legacy boolean type
        this[key] = Number(newValue);
      } else {
        this[key] = newValue;
      }
    }
  },
  toJSON: function (meta) {
    var isRoot = meta === undefined || typeof meta === 'string';

    if (isRoot) {
      meta = {
        textures: {},
        images: {}
      };
    }

    var data = {
      metadata: {
        version: 4.5,
        type: 'Material',
        generator: 'Material.toJSON'
      }
    }; // standard Material serialization

    data.uuid = this.uuid;
    data.type = this.type;
    if (this.name !== '') data.name = this.name;
    if (this.color && this.color.isColor) data.color = this.color.getHex();
    if (this.roughness !== undefined) data.roughness = this.roughness;
    if (this.metalness !== undefined) data.metalness = this.metalness;
    if (this.emissive && this.emissive.isColor) data.emissive = this.emissive.getHex();
    if (this.emissiveIntensity !== 1) data.emissiveIntensity = this.emissiveIntensity;
    if (this.specular && this.specular.isColor) data.specular = this.specular.getHex();
    if (this.shininess !== undefined) data.shininess = this.shininess;
    if (this.clearCoat !== undefined) data.clearCoat = this.clearCoat;
    if (this.clearCoatRoughness !== undefined) data.clearCoatRoughness = this.clearCoatRoughness;
    if (this.map && this.map.isTexture) data.map = this.map.toJSON(meta).uuid;
    if (this.alphaMap && this.alphaMap.isTexture) data.alphaMap = this.alphaMap.toJSON(meta).uuid;
    if (this.lightMap && this.lightMap.isTexture) data.lightMap = this.lightMap.toJSON(meta).uuid;

    if (this.aoMap && this.aoMap.isTexture) {
      data.aoMap = this.aoMap.toJSON(meta).uuid;
      data.aoMapIntensity = this.aoMapIntensity;
    }

    if (this.bumpMap && this.bumpMap.isTexture) {
      data.bumpMap = this.bumpMap.toJSON(meta).uuid;
      data.bumpScale = this.bumpScale;
    }

    if (this.normalMap && this.normalMap.isTexture) {
      data.normalMap = this.normalMap.toJSON(meta).uuid;
      data.normalMapType = this.normalMapType;
      data.normalScale = this.normalScale.toArray();
    }

    if (this.displacementMap && this.displacementMap.isTexture) {
      data.displacementMap = this.displacementMap.toJSON(meta).uuid;
      data.displacementScale = this.displacementScale;
      data.displacementBias = this.displacementBias;
    }

    if (this.roughnessMap && this.roughnessMap.isTexture) data.roughnessMap = this.roughnessMap.toJSON(meta).uuid;
    if (this.metalnessMap && this.metalnessMap.isTexture) data.metalnessMap = this.metalnessMap.toJSON(meta).uuid;
    if (this.emissiveMap && this.emissiveMap.isTexture) data.emissiveMap = this.emissiveMap.toJSON(meta).uuid;
    if (this.specularMap && this.specularMap.isTexture) data.specularMap = this.specularMap.toJSON(meta).uuid;

    if (this.envMap && this.envMap.isTexture) {
      data.envMap = this.envMap.toJSON(meta).uuid;
      data.reflectivity = this.reflectivity; // Scale behind envMap
    }

    if (this.gradientMap && this.gradientMap.isTexture) {
      data.gradientMap = this.gradientMap.toJSON(meta).uuid;
    }

    if (this.size !== undefined) data.size = this.size;
    if (this.sizeAttenuation !== undefined) data.sizeAttenuation = this.sizeAttenuation;
    if (this.blending !== _constants_js__WEBPACK_IMPORTED_MODULE_1__["NormalBlending"]) data.blending = this.blending;
    if (this.flatShading === true) data.flatShading = this.flatShading;
    if (this.side !== _constants_js__WEBPACK_IMPORTED_MODULE_1__["FrontSide"]) data.side = this.side;
    if (this.vertexColors !== _constants_js__WEBPACK_IMPORTED_MODULE_1__["NoColors"]) data.vertexColors = this.vertexColors;
    if (this.opacity < 1) data.opacity = this.opacity;
    if (this.transparent === true) data.transparent = this.transparent;
    data.depthFunc = this.depthFunc;
    data.depthTest = this.depthTest;
    data.depthWrite = this.depthWrite; // rotation (SpriteMaterial)

    if (this.rotation !== 0) data.rotation = this.rotation;
    if (this.linewidth !== 1) data.linewidth = this.linewidth;
    if (this.dashSize !== undefined) data.dashSize = this.dashSize;
    if (this.gapSize !== undefined) data.gapSize = this.gapSize;
    if (this.scale !== undefined) data.scale = this.scale;
    if (this.dithering === true) data.dithering = true;
    if (this.alphaTest > 0) data.alphaTest = this.alphaTest;
    if (this.premultipliedAlpha === true) data.premultipliedAlpha = this.premultipliedAlpha;
    if (this.wireframe === true) data.wireframe = this.wireframe;
    if (this.wireframeLinewidth > 1) data.wireframeLinewidth = this.wireframeLinewidth;
    if (this.wireframeLinecap !== 'round') data.wireframeLinecap = this.wireframeLinecap;
    if (this.wireframeLinejoin !== 'round') data.wireframeLinejoin = this.wireframeLinejoin;
    if (this.morphTargets === true) data.morphTargets = true;
    if (this.skinning === true) data.skinning = true;
    if (this.visible === false) data.visible = false;
    if (JSON.stringify(this.userData) !== '{}') data.userData = this.userData; // TODO: Copied from Object3D.toJSON

    function extractFromCache(cache) {
      var values = [];

      for (var key in cache) {
        var data = cache[key];
        delete data.metadata;
        values.push(data);
      }

      return values;
    }

    if (isRoot) {
      var textures = extractFromCache(meta.textures);
      var images = extractFromCache(meta.images);
      if (textures.length > 0) data.textures = textures;
      if (images.length > 0) data.images = images;
    }

    return data;
  },
  clone: function () {
    return new this.constructor().copy(this);
  },
  copy: function (source) {
    this.name = source.name;
    this.fog = source.fog;
    this.lights = source.lights;
    this.blending = source.blending;
    this.side = source.side;
    this.flatShading = source.flatShading;
    this.vertexColors = source.vertexColors;
    this.opacity = source.opacity;
    this.transparent = source.transparent;
    this.blendSrc = source.blendSrc;
    this.blendDst = source.blendDst;
    this.blendEquation = source.blendEquation;
    this.blendSrcAlpha = source.blendSrcAlpha;
    this.blendDstAlpha = source.blendDstAlpha;
    this.blendEquationAlpha = source.blendEquationAlpha;
    this.depthFunc = source.depthFunc;
    this.depthTest = source.depthTest;
    this.depthWrite = source.depthWrite;
    this.colorWrite = source.colorWrite;
    this.precision = source.precision;
    this.polygonOffset = source.polygonOffset;
    this.polygonOffsetFactor = source.polygonOffsetFactor;
    this.polygonOffsetUnits = source.polygonOffsetUnits;
    this.dithering = source.dithering;
    this.alphaTest = source.alphaTest;
    this.premultipliedAlpha = source.premultipliedAlpha;
    this.overdraw = source.overdraw;
    this.visible = source.visible;
    this.userData = JSON.parse(JSON.stringify(source.userData));
    this.clipShadows = source.clipShadows;
    this.clipIntersection = source.clipIntersection;
    var srcPlanes = source.clippingPlanes,
        dstPlanes = null;

    if (srcPlanes !== null) {
      var n = srcPlanes.length;
      dstPlanes = new Array(n);

      for (var i = 0; i !== n; ++i) dstPlanes[i] = srcPlanes[i].clone();
    }

    this.clippingPlanes = dstPlanes;
    this.shadowSide = source.shadowSide;
    return this;
  },
  dispose: function () {
    this.dispatchEvent({
      type: 'dispose'
    });
  }
});


/***/ }),

/***/ "./node_modules/three/src/math/Box3.js":
/*!*********************************************!*\
  !*** ./node_modules/three/src/math/Box3.js ***!
  \*********************************************/
/*! exports provided: Box3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Box3", function() { return Box3; });
/* harmony import */ var _Vector3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector3.js */ "./node_modules/three/src/math/Vector3.js");
/* harmony import */ var _Sphere_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sphere.js */ "./node_modules/three/src/math/Sphere.js");


/**
 * @author bhouston / http://clara.io
 * @author WestLangley / http://github.com/WestLangley
 */

function Box3(min, max) {
  this.min = min !== undefined ? min : new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"](+Infinity, +Infinity, +Infinity);
  this.max = max !== undefined ? max : new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"](-Infinity, -Infinity, -Infinity);
}

Object.assign(Box3.prototype, {
  isBox3: true,
  set: function (min, max) {
    this.min.copy(min);
    this.max.copy(max);
    return this;
  },
  setFromArray: function (array) {
    var minX = +Infinity;
    var minY = +Infinity;
    var minZ = +Infinity;
    var maxX = -Infinity;
    var maxY = -Infinity;
    var maxZ = -Infinity;

    for (var i = 0, l = array.length; i < l; i += 3) {
      var x = array[i];
      var y = array[i + 1];
      var z = array[i + 2];
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (z < minZ) minZ = z;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
      if (z > maxZ) maxZ = z;
    }

    this.min.set(minX, minY, minZ);
    this.max.set(maxX, maxY, maxZ);
    return this;
  },
  setFromBufferAttribute: function (attribute) {
    var minX = +Infinity;
    var minY = +Infinity;
    var minZ = +Infinity;
    var maxX = -Infinity;
    var maxY = -Infinity;
    var maxZ = -Infinity;

    for (var i = 0, l = attribute.count; i < l; i++) {
      var x = attribute.getX(i);
      var y = attribute.getY(i);
      var z = attribute.getZ(i);
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (z < minZ) minZ = z;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
      if (z > maxZ) maxZ = z;
    }

    this.min.set(minX, minY, minZ);
    this.max.set(maxX, maxY, maxZ);
    return this;
  },
  setFromPoints: function (points) {
    this.makeEmpty();

    for (var i = 0, il = points.length; i < il; i++) {
      this.expandByPoint(points[i]);
    }

    return this;
  },
  setFromCenterAndSize: function () {
    var v1 = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    return function setFromCenterAndSize(center, size) {
      var halfSize = v1.copy(size).multiplyScalar(0.5);
      this.min.copy(center).sub(halfSize);
      this.max.copy(center).add(halfSize);
      return this;
    };
  }(),
  setFromObject: function (object) {
    this.makeEmpty();
    return this.expandByObject(object);
  },
  clone: function () {
    return new this.constructor().copy(this);
  },
  copy: function (box) {
    this.min.copy(box.min);
    this.max.copy(box.max);
    return this;
  },
  makeEmpty: function () {
    this.min.x = this.min.y = this.min.z = +Infinity;
    this.max.x = this.max.y = this.max.z = -Infinity;
    return this;
  },
  isEmpty: function () {
    // this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  },
  getCenter: function (target) {
    if (target === undefined) {
      console.warn('THREE.Box3: .getCenter() target is now required');
      target = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    }

    return this.isEmpty() ? target.set(0, 0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);
  },
  getSize: function (target) {
    if (target === undefined) {
      console.warn('THREE.Box3: .getSize() target is now required');
      target = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    }

    return this.isEmpty() ? target.set(0, 0, 0) : target.subVectors(this.max, this.min);
  },
  expandByPoint: function (point) {
    this.min.min(point);
    this.max.max(point);
    return this;
  },
  expandByVector: function (vector) {
    this.min.sub(vector);
    this.max.add(vector);
    return this;
  },
  expandByScalar: function (scalar) {
    this.min.addScalar(-scalar);
    this.max.addScalar(scalar);
    return this;
  },
  expandByObject: function () {
    // Computes the world-axis-aligned bounding box of an object (including its children),
    // accounting for both the object's, and children's, world transforms
    var scope, i, l;
    var v1 = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();

    function traverse(node) {
      var geometry = node.geometry;

      if (geometry !== undefined) {
        if (geometry.isGeometry) {
          var vertices = geometry.vertices;

          for (i = 0, l = vertices.length; i < l; i++) {
            v1.copy(vertices[i]);
            v1.applyMatrix4(node.matrixWorld);
            scope.expandByPoint(v1);
          }
        } else if (geometry.isBufferGeometry) {
          var attribute = geometry.attributes.position;

          if (attribute !== undefined) {
            for (i = 0, l = attribute.count; i < l; i++) {
              v1.fromBufferAttribute(attribute, i).applyMatrix4(node.matrixWorld);
              scope.expandByPoint(v1);
            }
          }
        }
      }
    }

    return function expandByObject(object) {
      scope = this;
      object.updateMatrixWorld(true);
      object.traverse(traverse);
      return this;
    };
  }(),
  containsPoint: function (point) {
    return point.x < this.min.x || point.x > this.max.x || point.y < this.min.y || point.y > this.max.y || point.z < this.min.z || point.z > this.max.z ? false : true;
  },
  containsBox: function (box) {
    return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y && this.min.z <= box.min.z && box.max.z <= this.max.z;
  },
  getParameter: function (point, target) {
    // This can potentially have a divide by zero if the box
    // has a size dimension of 0.
    if (target === undefined) {
      console.warn('THREE.Box3: .getParameter() target is now required');
      target = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    }

    return target.set((point.x - this.min.x) / (this.max.x - this.min.x), (point.y - this.min.y) / (this.max.y - this.min.y), (point.z - this.min.z) / (this.max.z - this.min.z));
  },
  intersectsBox: function (box) {
    // using 6 splitting planes to rule out intersections.
    return box.max.x < this.min.x || box.min.x > this.max.x || box.max.y < this.min.y || box.min.y > this.max.y || box.max.z < this.min.z || box.min.z > this.max.z ? false : true;
  },
  intersectsSphere: function () {
    var closestPoint = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    return function intersectsSphere(sphere) {
      // Find the point on the AABB closest to the sphere center.
      this.clampPoint(sphere.center, closestPoint); // If that point is inside the sphere, the AABB and sphere intersect.

      return closestPoint.distanceToSquared(sphere.center) <= sphere.radius * sphere.radius;
    };
  }(),
  intersectsPlane: function (plane) {
    // We compute the minimum and maximum dot product values. If those values
    // are on the same side (back or front) of the plane, then there is no intersection.
    var min, max;

    if (plane.normal.x > 0) {
      min = plane.normal.x * this.min.x;
      max = plane.normal.x * this.max.x;
    } else {
      min = plane.normal.x * this.max.x;
      max = plane.normal.x * this.min.x;
    }

    if (plane.normal.y > 0) {
      min += plane.normal.y * this.min.y;
      max += plane.normal.y * this.max.y;
    } else {
      min += plane.normal.y * this.max.y;
      max += plane.normal.y * this.min.y;
    }

    if (plane.normal.z > 0) {
      min += plane.normal.z * this.min.z;
      max += plane.normal.z * this.max.z;
    } else {
      min += plane.normal.z * this.max.z;
      max += plane.normal.z * this.min.z;
    }

    return min <= plane.constant && max >= plane.constant;
  },
  intersectsTriangle: function () {
    // triangle centered vertices
    var v0 = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    var v1 = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    var v2 = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"](); // triangle edge vectors

    var f0 = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    var f1 = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    var f2 = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    var testAxis = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    var center = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    var extents = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    var triangleNormal = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();

    function satForAxes(axes) {
      var i, j;

      for (i = 0, j = axes.length - 3; i <= j; i += 3) {
        testAxis.fromArray(axes, i); // project the aabb onto the seperating axis

        var r = extents.x * Math.abs(testAxis.x) + extents.y * Math.abs(testAxis.y) + extents.z * Math.abs(testAxis.z); // project all 3 vertices of the triangle onto the seperating axis

        var p0 = v0.dot(testAxis);
        var p1 = v1.dot(testAxis);
        var p2 = v2.dot(testAxis); // actual test, basically see if either of the most extreme of the triangle points intersects r

        if (Math.max(-Math.max(p0, p1, p2), Math.min(p0, p1, p2)) > r) {
          // points of the projected triangle are outside the projected half-length of the aabb
          // the axis is seperating and we can exit
          return false;
        }
      }

      return true;
    }

    return function intersectsTriangle(triangle) {
      if (this.isEmpty()) {
        return false;
      } // compute box center and extents


      this.getCenter(center);
      extents.subVectors(this.max, center); // translate triangle to aabb origin

      v0.subVectors(triangle.a, center);
      v1.subVectors(triangle.b, center);
      v2.subVectors(triangle.c, center); // compute edge vectors for triangle

      f0.subVectors(v1, v0);
      f1.subVectors(v2, v1);
      f2.subVectors(v0, v2); // test against axes that are given by cross product combinations of the edges of the triangle and the edges of the aabb
      // make an axis testing of each of the 3 sides of the aabb against each of the 3 sides of the triangle = 9 axis of separation
      // axis_ij = u_i x f_j (u0, u1, u2 = face normals of aabb = x,y,z axes vectors since aabb is axis aligned)

      var axes = [0, -f0.z, f0.y, 0, -f1.z, f1.y, 0, -f2.z, f2.y, f0.z, 0, -f0.x, f1.z, 0, -f1.x, f2.z, 0, -f2.x, -f0.y, f0.x, 0, -f1.y, f1.x, 0, -f2.y, f2.x, 0];

      if (!satForAxes(axes)) {
        return false;
      } // test 3 face normals from the aabb


      axes = [1, 0, 0, 0, 1, 0, 0, 0, 1];

      if (!satForAxes(axes)) {
        return false;
      } // finally testing the face normal of the triangle
      // use already existing triangle edge vectors here


      triangleNormal.crossVectors(f0, f1);
      axes = [triangleNormal.x, triangleNormal.y, triangleNormal.z];
      return satForAxes(axes);
    };
  }(),
  clampPoint: function (point, target) {
    if (target === undefined) {
      console.warn('THREE.Box3: .clampPoint() target is now required');
      target = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    }

    return target.copy(point).clamp(this.min, this.max);
  },
  distanceToPoint: function () {
    var v1 = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    return function distanceToPoint(point) {
      var clampedPoint = v1.copy(point).clamp(this.min, this.max);
      return clampedPoint.sub(point).length();
    };
  }(),
  getBoundingSphere: function () {
    var v1 = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    return function getBoundingSphere(target) {
      if (target === undefined) {
        console.warn('THREE.Box3: .getBoundingSphere() target is now required');
        target = new _Sphere_js__WEBPACK_IMPORTED_MODULE_1__["Sphere"]();
      }

      this.getCenter(target.center);
      target.radius = this.getSize(v1).length() * 0.5;
      return target;
    };
  }(),
  intersect: function (box) {
    this.min.max(box.min);
    this.max.min(box.max); // ensure that if there is no overlap, the result is fully empty, not slightly empty with non-inf/+inf values that will cause subsequence intersects to erroneously return valid values.

    if (this.isEmpty()) this.makeEmpty();
    return this;
  },
  union: function (box) {
    this.min.min(box.min);
    this.max.max(box.max);
    return this;
  },
  applyMatrix4: function (matrix) {
    // transform of empty box is an empty box.
    if (this.isEmpty()) return this;
    var m = matrix.elements;
    var xax = m[0] * this.min.x,
        xay = m[1] * this.min.x,
        xaz = m[2] * this.min.x;
    var xbx = m[0] * this.max.x,
        xby = m[1] * this.max.x,
        xbz = m[2] * this.max.x;
    var yax = m[4] * this.min.y,
        yay = m[5] * this.min.y,
        yaz = m[6] * this.min.y;
    var ybx = m[4] * this.max.y,
        yby = m[5] * this.max.y,
        ybz = m[6] * this.max.y;
    var zax = m[8] * this.min.z,
        zay = m[9] * this.min.z,
        zaz = m[10] * this.min.z;
    var zbx = m[8] * this.max.z,
        zby = m[9] * this.max.z,
        zbz = m[10] * this.max.z;
    this.min.x = Math.min(xax, xbx) + Math.min(yax, ybx) + Math.min(zax, zbx) + m[12];
    this.min.y = Math.min(xay, xby) + Math.min(yay, yby) + Math.min(zay, zby) + m[13];
    this.min.z = Math.min(xaz, xbz) + Math.min(yaz, ybz) + Math.min(zaz, zbz) + m[14];
    this.max.x = Math.max(xax, xbx) + Math.max(yax, ybx) + Math.max(zax, zbx) + m[12];
    this.max.y = Math.max(xay, xby) + Math.max(yay, yby) + Math.max(zay, zby) + m[13];
    this.max.z = Math.max(xaz, xbz) + Math.max(yaz, ybz) + Math.max(zaz, zbz) + m[14];
    return this;
  },
  translate: function (offset) {
    this.min.add(offset);
    this.max.add(offset);
    return this;
  },
  equals: function (box) {
    return box.min.equals(this.min) && box.max.equals(this.max);
  }
});


/***/ }),

/***/ "./node_modules/three/src/math/Color.js":
/*!**********************************************!*\
  !*** ./node_modules/three/src/math/Color.js ***!
  \**********************************************/
/*! exports provided: Color */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return Color; });
/* harmony import */ var _Math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Math.js */ "./node_modules/three/src/math/Math.js");

/**
 * @author mrdoob / http://mrdoob.com/
 */

var ColorKeywords = {
  'aliceblue': 0xF0F8FF,
  'antiquewhite': 0xFAEBD7,
  'aqua': 0x00FFFF,
  'aquamarine': 0x7FFFD4,
  'azure': 0xF0FFFF,
  'beige': 0xF5F5DC,
  'bisque': 0xFFE4C4,
  'black': 0x000000,
  'blanchedalmond': 0xFFEBCD,
  'blue': 0x0000FF,
  'blueviolet': 0x8A2BE2,
  'brown': 0xA52A2A,
  'burlywood': 0xDEB887,
  'cadetblue': 0x5F9EA0,
  'chartreuse': 0x7FFF00,
  'chocolate': 0xD2691E,
  'coral': 0xFF7F50,
  'cornflowerblue': 0x6495ED,
  'cornsilk': 0xFFF8DC,
  'crimson': 0xDC143C,
  'cyan': 0x00FFFF,
  'darkblue': 0x00008B,
  'darkcyan': 0x008B8B,
  'darkgoldenrod': 0xB8860B,
  'darkgray': 0xA9A9A9,
  'darkgreen': 0x006400,
  'darkgrey': 0xA9A9A9,
  'darkkhaki': 0xBDB76B,
  'darkmagenta': 0x8B008B,
  'darkolivegreen': 0x556B2F,
  'darkorange': 0xFF8C00,
  'darkorchid': 0x9932CC,
  'darkred': 0x8B0000,
  'darksalmon': 0xE9967A,
  'darkseagreen': 0x8FBC8F,
  'darkslateblue': 0x483D8B,
  'darkslategray': 0x2F4F4F,
  'darkslategrey': 0x2F4F4F,
  'darkturquoise': 0x00CED1,
  'darkviolet': 0x9400D3,
  'deeppink': 0xFF1493,
  'deepskyblue': 0x00BFFF,
  'dimgray': 0x696969,
  'dimgrey': 0x696969,
  'dodgerblue': 0x1E90FF,
  'firebrick': 0xB22222,
  'floralwhite': 0xFFFAF0,
  'forestgreen': 0x228B22,
  'fuchsia': 0xFF00FF,
  'gainsboro': 0xDCDCDC,
  'ghostwhite': 0xF8F8FF,
  'gold': 0xFFD700,
  'goldenrod': 0xDAA520,
  'gray': 0x808080,
  'green': 0x008000,
  'greenyellow': 0xADFF2F,
  'grey': 0x808080,
  'honeydew': 0xF0FFF0,
  'hotpink': 0xFF69B4,
  'indianred': 0xCD5C5C,
  'indigo': 0x4B0082,
  'ivory': 0xFFFFF0,
  'khaki': 0xF0E68C,
  'lavender': 0xE6E6FA,
  'lavenderblush': 0xFFF0F5,
  'lawngreen': 0x7CFC00,
  'lemonchiffon': 0xFFFACD,
  'lightblue': 0xADD8E6,
  'lightcoral': 0xF08080,
  'lightcyan': 0xE0FFFF,
  'lightgoldenrodyellow': 0xFAFAD2,
  'lightgray': 0xD3D3D3,
  'lightgreen': 0x90EE90,
  'lightgrey': 0xD3D3D3,
  'lightpink': 0xFFB6C1,
  'lightsalmon': 0xFFA07A,
  'lightseagreen': 0x20B2AA,
  'lightskyblue': 0x87CEFA,
  'lightslategray': 0x778899,
  'lightslategrey': 0x778899,
  'lightsteelblue': 0xB0C4DE,
  'lightyellow': 0xFFFFE0,
  'lime': 0x00FF00,
  'limegreen': 0x32CD32,
  'linen': 0xFAF0E6,
  'magenta': 0xFF00FF,
  'maroon': 0x800000,
  'mediumaquamarine': 0x66CDAA,
  'mediumblue': 0x0000CD,
  'mediumorchid': 0xBA55D3,
  'mediumpurple': 0x9370DB,
  'mediumseagreen': 0x3CB371,
  'mediumslateblue': 0x7B68EE,
  'mediumspringgreen': 0x00FA9A,
  'mediumturquoise': 0x48D1CC,
  'mediumvioletred': 0xC71585,
  'midnightblue': 0x191970,
  'mintcream': 0xF5FFFA,
  'mistyrose': 0xFFE4E1,
  'moccasin': 0xFFE4B5,
  'navajowhite': 0xFFDEAD,
  'navy': 0x000080,
  'oldlace': 0xFDF5E6,
  'olive': 0x808000,
  'olivedrab': 0x6B8E23,
  'orange': 0xFFA500,
  'orangered': 0xFF4500,
  'orchid': 0xDA70D6,
  'palegoldenrod': 0xEEE8AA,
  'palegreen': 0x98FB98,
  'paleturquoise': 0xAFEEEE,
  'palevioletred': 0xDB7093,
  'papayawhip': 0xFFEFD5,
  'peachpuff': 0xFFDAB9,
  'peru': 0xCD853F,
  'pink': 0xFFC0CB,
  'plum': 0xDDA0DD,
  'powderblue': 0xB0E0E6,
  'purple': 0x800080,
  'rebeccapurple': 0x663399,
  'red': 0xFF0000,
  'rosybrown': 0xBC8F8F,
  'royalblue': 0x4169E1,
  'saddlebrown': 0x8B4513,
  'salmon': 0xFA8072,
  'sandybrown': 0xF4A460,
  'seagreen': 0x2E8B57,
  'seashell': 0xFFF5EE,
  'sienna': 0xA0522D,
  'silver': 0xC0C0C0,
  'skyblue': 0x87CEEB,
  'slateblue': 0x6A5ACD,
  'slategray': 0x708090,
  'slategrey': 0x708090,
  'snow': 0xFFFAFA,
  'springgreen': 0x00FF7F,
  'steelblue': 0x4682B4,
  'tan': 0xD2B48C,
  'teal': 0x008080,
  'thistle': 0xD8BFD8,
  'tomato': 0xFF6347,
  'turquoise': 0x40E0D0,
  'violet': 0xEE82EE,
  'wheat': 0xF5DEB3,
  'white': 0xFFFFFF,
  'whitesmoke': 0xF5F5F5,
  'yellow': 0xFFFF00,
  'yellowgreen': 0x9ACD32
};

function Color(r, g, b) {
  if (g === undefined && b === undefined) {
    // r is THREE.Color, hex or string
    return this.set(r);
  }

  return this.setRGB(r, g, b);
}

Object.assign(Color.prototype, {
  isColor: true,
  r: 1,
  g: 1,
  b: 1,
  set: function (value) {
    if (value && value.isColor) {
      this.copy(value);
    } else if (typeof value === 'number') {
      this.setHex(value);
    } else if (typeof value === 'string') {
      this.setStyle(value);
    }

    return this;
  },
  setScalar: function (scalar) {
    this.r = scalar;
    this.g = scalar;
    this.b = scalar;
    return this;
  },
  setHex: function (hex) {
    hex = Math.floor(hex);
    this.r = (hex >> 16 & 255) / 255;
    this.g = (hex >> 8 & 255) / 255;
    this.b = (hex & 255) / 255;
    return this;
  },
  setRGB: function (r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    return this;
  },
  setHSL: function () {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
      return p;
    }

    return function setHSL(h, s, l) {
      // h,s,l ranges are in 0.0 - 1.0
      h = _Math_js__WEBPACK_IMPORTED_MODULE_0__["_Math"].euclideanModulo(h, 1);
      s = _Math_js__WEBPACK_IMPORTED_MODULE_0__["_Math"].clamp(s, 0, 1);
      l = _Math_js__WEBPACK_IMPORTED_MODULE_0__["_Math"].clamp(l, 0, 1);

      if (s === 0) {
        this.r = this.g = this.b = l;
      } else {
        var p = l <= 0.5 ? l * (1 + s) : l + s - l * s;
        var q = 2 * l - p;
        this.r = hue2rgb(q, p, h + 1 / 3);
        this.g = hue2rgb(q, p, h);
        this.b = hue2rgb(q, p, h - 1 / 3);
      }

      return this;
    };
  }(),
  setStyle: function (style) {
    function handleAlpha(string) {
      if (string === undefined) return;

      if (parseFloat(string) < 1) {
        console.warn('THREE.Color: Alpha component of ' + style + ' will be ignored.');
      }
    }

    var m;

    if (m = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(style)) {
      // rgb / hsl
      var color;
      var name = m[1];
      var components = m[2];

      switch (name) {
        case 'rgb':
        case 'rgba':
          if (color = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
            // rgb(255,0,0) rgba(255,0,0,0.5)
            this.r = Math.min(255, parseInt(color[1], 10)) / 255;
            this.g = Math.min(255, parseInt(color[2], 10)) / 255;
            this.b = Math.min(255, parseInt(color[3], 10)) / 255;
            handleAlpha(color[5]);
            return this;
          }

          if (color = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
            // rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
            this.r = Math.min(100, parseInt(color[1], 10)) / 100;
            this.g = Math.min(100, parseInt(color[2], 10)) / 100;
            this.b = Math.min(100, parseInt(color[3], 10)) / 100;
            handleAlpha(color[5]);
            return this;
          }

          break;

        case 'hsl':
        case 'hsla':
          if (color = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
            // hsl(120,50%,50%) hsla(120,50%,50%,0.5)
            var h = parseFloat(color[1]) / 360;
            var s = parseInt(color[2], 10) / 100;
            var l = parseInt(color[3], 10) / 100;
            handleAlpha(color[5]);
            return this.setHSL(h, s, l);
          }

          break;
      }
    } else if (m = /^\#([A-Fa-f0-9]+)$/.exec(style)) {
      // hex color
      var hex = m[1];
      var size = hex.length;

      if (size === 3) {
        // #ff0
        this.r = parseInt(hex.charAt(0) + hex.charAt(0), 16) / 255;
        this.g = parseInt(hex.charAt(1) + hex.charAt(1), 16) / 255;
        this.b = parseInt(hex.charAt(2) + hex.charAt(2), 16) / 255;
        return this;
      } else if (size === 6) {
        // #ff0000
        this.r = parseInt(hex.charAt(0) + hex.charAt(1), 16) / 255;
        this.g = parseInt(hex.charAt(2) + hex.charAt(3), 16) / 255;
        this.b = parseInt(hex.charAt(4) + hex.charAt(5), 16) / 255;
        return this;
      }
    }

    if (style && style.length > 0) {
      // color keywords
      var hex = ColorKeywords[style];

      if (hex !== undefined) {
        // red
        this.setHex(hex);
      } else {
        // unknown color
        console.warn('THREE.Color: Unknown color ' + style);
      }
    }

    return this;
  },
  clone: function () {
    return new this.constructor(this.r, this.g, this.b);
  },
  copy: function (color) {
    this.r = color.r;
    this.g = color.g;
    this.b = color.b;
    return this;
  },
  copyGammaToLinear: function (color, gammaFactor) {
    if (gammaFactor === undefined) gammaFactor = 2.0;
    this.r = Math.pow(color.r, gammaFactor);
    this.g = Math.pow(color.g, gammaFactor);
    this.b = Math.pow(color.b, gammaFactor);
    return this;
  },
  copyLinearToGamma: function (color, gammaFactor) {
    if (gammaFactor === undefined) gammaFactor = 2.0;
    var safeInverse = gammaFactor > 0 ? 1.0 / gammaFactor : 1.0;
    this.r = Math.pow(color.r, safeInverse);
    this.g = Math.pow(color.g, safeInverse);
    this.b = Math.pow(color.b, safeInverse);
    return this;
  },
  convertGammaToLinear: function (gammaFactor) {
    this.copyGammaToLinear(this, gammaFactor);
    return this;
  },
  convertLinearToGamma: function (gammaFactor) {
    this.copyLinearToGamma(this, gammaFactor);
    return this;
  },
  copySRGBToLinear: function () {
    function SRGBToLinear(c) {
      return c < 0.04045 ? c * 0.0773993808 : Math.pow(c * 0.9478672986 + 0.0521327014, 2.4);
    }

    return function copySRGBToLinear(color) {
      this.r = SRGBToLinear(color.r);
      this.g = SRGBToLinear(color.g);
      this.b = SRGBToLinear(color.b);
      return this;
    };
  }(),
  copyLinearToSRGB: function () {
    function LinearToSRGB(c) {
      return c < 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 0.41666) - 0.055;
    }

    return function copyLinearToSRGB(color) {
      this.r = LinearToSRGB(color.r);
      this.g = LinearToSRGB(color.g);
      this.b = LinearToSRGB(color.b);
      return this;
    };
  }(),
  convertSRGBToLinear: function () {
    this.copySRGBToLinear(this);
    return this;
  },
  convertLinearToSRGB: function () {
    this.copyLinearToSRGB(this);
    return this;
  },
  getHex: function () {
    return this.r * 255 << 16 ^ this.g * 255 << 8 ^ this.b * 255 << 0;
  },
  getHexString: function () {
    return ('000000' + this.getHex().toString(16)).slice(-6);
  },
  getHSL: function (target) {
    // h,s,l ranges are in 0.0 - 1.0
    if (target === undefined) {
      console.warn('THREE.Color: .getHSL() target is now required');
      target = {
        h: 0,
        s: 0,
        l: 0
      };
    }

    var r = this.r,
        g = this.g,
        b = this.b;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var hue, saturation;
    var lightness = (min + max) / 2.0;

    if (min === max) {
      hue = 0;
      saturation = 0;
    } else {
      var delta = max - min;
      saturation = lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min);

      switch (max) {
        case r:
          hue = (g - b) / delta + (g < b ? 6 : 0);
          break;

        case g:
          hue = (b - r) / delta + 2;
          break;

        case b:
          hue = (r - g) / delta + 4;
          break;
      }

      hue /= 6;
    }

    target.h = hue;
    target.s = saturation;
    target.l = lightness;
    return target;
  },
  getStyle: function () {
    return 'rgb(' + (this.r * 255 | 0) + ',' + (this.g * 255 | 0) + ',' + (this.b * 255 | 0) + ')';
  },
  offsetHSL: function () {
    var hsl = {};
    return function (h, s, l) {
      this.getHSL(hsl);
      hsl.h += h;
      hsl.s += s;
      hsl.l += l;
      this.setHSL(hsl.h, hsl.s, hsl.l);
      return this;
    };
  }(),
  add: function (color) {
    this.r += color.r;
    this.g += color.g;
    this.b += color.b;
    return this;
  },
  addColors: function (color1, color2) {
    this.r = color1.r + color2.r;
    this.g = color1.g + color2.g;
    this.b = color1.b + color2.b;
    return this;
  },
  addScalar: function (s) {
    this.r += s;
    this.g += s;
    this.b += s;
    return this;
  },
  sub: function (color) {
    this.r = Math.max(0, this.r - color.r);
    this.g = Math.max(0, this.g - color.g);
    this.b = Math.max(0, this.b - color.b);
    return this;
  },
  multiply: function (color) {
    this.r *= color.r;
    this.g *= color.g;
    this.b *= color.b;
    return this;
  },
  multiplyScalar: function (s) {
    this.r *= s;
    this.g *= s;
    this.b *= s;
    return this;
  },
  lerp: function (color, alpha) {
    this.r += (color.r - this.r) * alpha;
    this.g += (color.g - this.g) * alpha;
    this.b += (color.b - this.b) * alpha;
    return this;
  },
  equals: function (c) {
    return c.r === this.r && c.g === this.g && c.b === this.b;
  },
  fromArray: function (array, offset) {
    if (offset === undefined) offset = 0;
    this.r = array[offset];
    this.g = array[offset + 1];
    this.b = array[offset + 2];
    return this;
  },
  toArray: function (array, offset) {
    if (array === undefined) array = [];
    if (offset === undefined) offset = 0;
    array[offset] = this.r;
    array[offset + 1] = this.g;
    array[offset + 2] = this.b;
    return array;
  },
  toJSON: function () {
    return this.getHex();
  }
});


/***/ }),

/***/ "./node_modules/three/src/math/Euler.js":
/*!**********************************************!*\
  !*** ./node_modules/three/src/math/Euler.js ***!
  \**********************************************/
/*! exports provided: Euler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Euler", function() { return Euler; });
/* harmony import */ var _Quaternion_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Quaternion.js */ "./node_modules/three/src/math/Quaternion.js");
/* harmony import */ var _Vector3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vector3.js */ "./node_modules/three/src/math/Vector3.js");
/* harmony import */ var _Matrix4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Matrix4.js */ "./node_modules/three/src/math/Matrix4.js");
/* harmony import */ var _Math_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Math.js */ "./node_modules/three/src/math/Math.js");




/**
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 */

function Euler(x, y, z, order) {
  this._x = x || 0;
  this._y = y || 0;
  this._z = z || 0;
  this._order = order || Euler.DefaultOrder;
}

Euler.RotationOrders = ['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX'];
Euler.DefaultOrder = 'XYZ';
Object.defineProperties(Euler.prototype, {
  x: {
    get: function () {
      return this._x;
    },
    set: function (value) {
      this._x = value;
      this.onChangeCallback();
    }
  },
  y: {
    get: function () {
      return this._y;
    },
    set: function (value) {
      this._y = value;
      this.onChangeCallback();
    }
  },
  z: {
    get: function () {
      return this._z;
    },
    set: function (value) {
      this._z = value;
      this.onChangeCallback();
    }
  },
  order: {
    get: function () {
      return this._order;
    },
    set: function (value) {
      this._order = value;
      this.onChangeCallback();
    }
  }
});
Object.assign(Euler.prototype, {
  isEuler: true,
  set: function (x, y, z, order) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._order = order || this._order;
    this.onChangeCallback();
    return this;
  },
  clone: function () {
    return new this.constructor(this._x, this._y, this._z, this._order);
  },
  copy: function (euler) {
    this._x = euler._x;
    this._y = euler._y;
    this._z = euler._z;
    this._order = euler._order;
    this.onChangeCallback();
    return this;
  },
  setFromRotationMatrix: function (m, order, update) {
    var clamp = _Math_js__WEBPACK_IMPORTED_MODULE_3__["_Math"].clamp; // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

    var te = m.elements;
    var m11 = te[0],
        m12 = te[4],
        m13 = te[8];
    var m21 = te[1],
        m22 = te[5],
        m23 = te[9];
    var m31 = te[2],
        m32 = te[6],
        m33 = te[10];
    order = order || this._order;

    if (order === 'XYZ') {
      this._y = Math.asin(clamp(m13, -1, 1));

      if (Math.abs(m13) < 0.99999) {
        this._x = Math.atan2(-m23, m33);
        this._z = Math.atan2(-m12, m11);
      } else {
        this._x = Math.atan2(m32, m22);
        this._z = 0;
      }
    } else if (order === 'YXZ') {
      this._x = Math.asin(-clamp(m23, -1, 1));

      if (Math.abs(m23) < 0.99999) {
        this._y = Math.atan2(m13, m33);
        this._z = Math.atan2(m21, m22);
      } else {
        this._y = Math.atan2(-m31, m11);
        this._z = 0;
      }
    } else if (order === 'ZXY') {
      this._x = Math.asin(clamp(m32, -1, 1));

      if (Math.abs(m32) < 0.99999) {
        this._y = Math.atan2(-m31, m33);
        this._z = Math.atan2(-m12, m22);
      } else {
        this._y = 0;
        this._z = Math.atan2(m21, m11);
      }
    } else if (order === 'ZYX') {
      this._y = Math.asin(-clamp(m31, -1, 1));

      if (Math.abs(m31) < 0.99999) {
        this._x = Math.atan2(m32, m33);
        this._z = Math.atan2(m21, m11);
      } else {
        this._x = 0;
        this._z = Math.atan2(-m12, m22);
      }
    } else if (order === 'YZX') {
      this._z = Math.asin(clamp(m21, -1, 1));

      if (Math.abs(m21) < 0.99999) {
        this._x = Math.atan2(-m23, m22);
        this._y = Math.atan2(-m31, m11);
      } else {
        this._x = 0;
        this._y = Math.atan2(m13, m33);
      }
    } else if (order === 'XZY') {
      this._z = Math.asin(-clamp(m12, -1, 1));

      if (Math.abs(m12) < 0.99999) {
        this._x = Math.atan2(m32, m22);
        this._y = Math.atan2(m13, m11);
      } else {
        this._x = Math.atan2(-m23, m33);
        this._y = 0;
      }
    } else {
      console.warn('THREE.Euler: .setFromRotationMatrix() given unsupported order: ' + order);
    }

    this._order = order;
    if (update !== false) this.onChangeCallback();
    return this;
  },
  setFromQuaternion: function () {
    var matrix = new _Matrix4_js__WEBPACK_IMPORTED_MODULE_2__["Matrix4"]();
    return function setFromQuaternion(q, order, update) {
      matrix.makeRotationFromQuaternion(q);
      return this.setFromRotationMatrix(matrix, order, update);
    };
  }(),
  setFromVector3: function (v, order) {
    return this.set(v.x, v.y, v.z, order || this._order);
  },
  reorder: function () {
    // WARNING: this discards revolution information -bhouston
    var q = new _Quaternion_js__WEBPACK_IMPORTED_MODULE_0__["Quaternion"]();
    return function reorder(newOrder) {
      q.setFromEuler(this);
      return this.setFromQuaternion(q, newOrder);
    };
  }(),
  equals: function (euler) {
    return euler._x === this._x && euler._y === this._y && euler._z === this._z && euler._order === this._order;
  },
  fromArray: function (array) {
    this._x = array[0];
    this._y = array[1];
    this._z = array[2];
    if (array[3] !== undefined) this._order = array[3];
    this.onChangeCallback();
    return this;
  },
  toArray: function (array, offset) {
    if (array === undefined) array = [];
    if (offset === undefined) offset = 0;
    array[offset] = this._x;
    array[offset + 1] = this._y;
    array[offset + 2] = this._z;
    array[offset + 3] = this._order;
    return array;
  },
  toVector3: function (optionalResult) {
    if (optionalResult) {
      return optionalResult.set(this._x, this._y, this._z);
    } else {
      return new _Vector3_js__WEBPACK_IMPORTED_MODULE_1__["Vector3"](this._x, this._y, this._z);
    }
  },
  onChange: function (callback) {
    this.onChangeCallback = callback;
    return this;
  },
  onChangeCallback: function () {}
});


/***/ }),

/***/ "./node_modules/three/src/math/Math.js":
/*!*********************************************!*\
  !*** ./node_modules/three/src/math/Math.js ***!
  \*********************************************/
/*! exports provided: _Math */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_Math", function() { return _Math; });
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mrdoob / http://mrdoob.com/
 */
var _Math = {
  DEG2RAD: Math.PI / 180,
  RAD2DEG: 180 / Math.PI,
  generateUUID: function () {
    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
    var lut = [];

    for (var i = 0; i < 256; i++) {
      lut[i] = (i < 16 ? '0' : '') + i.toString(16);
    }

    return function generateUUID() {
      var d0 = Math.random() * 0xffffffff | 0;
      var d1 = Math.random() * 0xffffffff | 0;
      var d2 = Math.random() * 0xffffffff | 0;
      var d3 = Math.random() * 0xffffffff | 0;
      var uuid = lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' + lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' + lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] + lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff]; // .toUpperCase() here flattens concatenated strings to save heap memory space.

      return uuid.toUpperCase();
    };
  }(),
  clamp: function (value, min, max) {
    return Math.max(min, Math.min(max, value));
  },
  // compute euclidian modulo of m % n
  // https://en.wikipedia.org/wiki/Modulo_operation
  euclideanModulo: function (n, m) {
    return (n % m + m) % m;
  },
  // Linear mapping from range <a1, a2> to range <b1, b2>
  mapLinear: function (x, a1, a2, b1, b2) {
    return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
  },
  // https://en.wikipedia.org/wiki/Linear_interpolation
  lerp: function (x, y, t) {
    return (1 - t) * x + t * y;
  },
  // http://en.wikipedia.org/wiki/Smoothstep
  smoothstep: function (x, min, max) {
    if (x <= min) return 0;
    if (x >= max) return 1;
    x = (x - min) / (max - min);
    return x * x * (3 - 2 * x);
  },
  smootherstep: function (x, min, max) {
    if (x <= min) return 0;
    if (x >= max) return 1;
    x = (x - min) / (max - min);
    return x * x * x * (x * (x * 6 - 15) + 10);
  },
  // Random integer from <low, high> interval
  randInt: function (low, high) {
    return low + Math.floor(Math.random() * (high - low + 1));
  },
  // Random float from <low, high> interval
  randFloat: function (low, high) {
    return low + Math.random() * (high - low);
  },
  // Random float from <-range/2, range/2> interval
  randFloatSpread: function (range) {
    return range * (0.5 - Math.random());
  },
  degToRad: function (degrees) {
    return degrees * _Math.DEG2RAD;
  },
  radToDeg: function (radians) {
    return radians * _Math.RAD2DEG;
  },
  isPowerOfTwo: function (value) {
    return (value & value - 1) === 0 && value !== 0;
  },
  ceilPowerOfTwo: function (value) {
    return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
  },
  floorPowerOfTwo: function (value) {
    return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
  }
};


/***/ }),

/***/ "./node_modules/three/src/math/Matrix3.js":
/*!************************************************!*\
  !*** ./node_modules/three/src/math/Matrix3.js ***!
  \************************************************/
/*! exports provided: Matrix3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Matrix3", function() { return Matrix3; });
/* harmony import */ var _Vector3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector3.js */ "./node_modules/three/src/math/Vector3.js");

/**
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 * @author tschw
 */

function Matrix3() {
  this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1];

  if (arguments.length > 0) {
    console.error('THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.');
  }
}

Object.assign(Matrix3.prototype, {
  isMatrix3: true,
  set: function (n11, n12, n13, n21, n22, n23, n31, n32, n33) {
    var te = this.elements;
    te[0] = n11;
    te[1] = n21;
    te[2] = n31;
    te[3] = n12;
    te[4] = n22;
    te[5] = n32;
    te[6] = n13;
    te[7] = n23;
    te[8] = n33;
    return this;
  },
  identity: function () {
    this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
    return this;
  },
  clone: function () {
    return new this.constructor().fromArray(this.elements);
  },
  copy: function (m) {
    var te = this.elements;
    var me = m.elements;
    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];
    te[4] = me[4];
    te[5] = me[5];
    te[6] = me[6];
    te[7] = me[7];
    te[8] = me[8];
    return this;
  },
  setFromMatrix4: function (m) {
    var me = m.elements;
    this.set(me[0], me[4], me[8], me[1], me[5], me[9], me[2], me[6], me[10]);
    return this;
  },
  applyToBufferAttribute: function () {
    var v1 = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    return function applyToBufferAttribute(attribute) {
      for (var i = 0, l = attribute.count; i < l; i++) {
        v1.x = attribute.getX(i);
        v1.y = attribute.getY(i);
        v1.z = attribute.getZ(i);
        v1.applyMatrix3(this);
        attribute.setXYZ(i, v1.x, v1.y, v1.z);
      }

      return attribute;
    };
  }(),
  multiply: function (m) {
    return this.multiplyMatrices(this, m);
  },
  premultiply: function (m) {
    return this.multiplyMatrices(m, this);
  },
  multiplyMatrices: function (a, b) {
    var ae = a.elements;
    var be = b.elements;
    var te = this.elements;
    var a11 = ae[0],
        a12 = ae[3],
        a13 = ae[6];
    var a21 = ae[1],
        a22 = ae[4],
        a23 = ae[7];
    var a31 = ae[2],
        a32 = ae[5],
        a33 = ae[8];
    var b11 = be[0],
        b12 = be[3],
        b13 = be[6];
    var b21 = be[1],
        b22 = be[4],
        b23 = be[7];
    var b31 = be[2],
        b32 = be[5],
        b33 = be[8];
    te[0] = a11 * b11 + a12 * b21 + a13 * b31;
    te[3] = a11 * b12 + a12 * b22 + a13 * b32;
    te[6] = a11 * b13 + a12 * b23 + a13 * b33;
    te[1] = a21 * b11 + a22 * b21 + a23 * b31;
    te[4] = a21 * b12 + a22 * b22 + a23 * b32;
    te[7] = a21 * b13 + a22 * b23 + a23 * b33;
    te[2] = a31 * b11 + a32 * b21 + a33 * b31;
    te[5] = a31 * b12 + a32 * b22 + a33 * b32;
    te[8] = a31 * b13 + a32 * b23 + a33 * b33;
    return this;
  },
  multiplyScalar: function (s) {
    var te = this.elements;
    te[0] *= s;
    te[3] *= s;
    te[6] *= s;
    te[1] *= s;
    te[4] *= s;
    te[7] *= s;
    te[2] *= s;
    te[5] *= s;
    te[8] *= s;
    return this;
  },
  determinant: function () {
    var te = this.elements;
    var a = te[0],
        b = te[1],
        c = te[2],
        d = te[3],
        e = te[4],
        f = te[5],
        g = te[6],
        h = te[7],
        i = te[8];
    return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
  },
  getInverse: function (matrix, throwOnDegenerate) {
    if (matrix && matrix.isMatrix4) {
      console.error("THREE.Matrix3: .getInverse() no longer takes a Matrix4 argument.");
    }

    var me = matrix.elements,
        te = this.elements,
        n11 = me[0],
        n21 = me[1],
        n31 = me[2],
        n12 = me[3],
        n22 = me[4],
        n32 = me[5],
        n13 = me[6],
        n23 = me[7],
        n33 = me[8],
        t11 = n33 * n22 - n32 * n23,
        t12 = n32 * n13 - n33 * n12,
        t13 = n23 * n12 - n22 * n13,
        det = n11 * t11 + n21 * t12 + n31 * t13;

    if (det === 0) {
      var msg = "THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0";

      if (throwOnDegenerate === true) {
        throw new Error(msg);
      } else {
        console.warn(msg);
      }

      return this.identity();
    }

    var detInv = 1 / det;
    te[0] = t11 * detInv;
    te[1] = (n31 * n23 - n33 * n21) * detInv;
    te[2] = (n32 * n21 - n31 * n22) * detInv;
    te[3] = t12 * detInv;
    te[4] = (n33 * n11 - n31 * n13) * detInv;
    te[5] = (n31 * n12 - n32 * n11) * detInv;
    te[6] = t13 * detInv;
    te[7] = (n21 * n13 - n23 * n11) * detInv;
    te[8] = (n22 * n11 - n21 * n12) * detInv;
    return this;
  },
  transpose: function () {
    var tmp,
        m = this.elements;
    tmp = m[1];
    m[1] = m[3];
    m[3] = tmp;
    tmp = m[2];
    m[2] = m[6];
    m[6] = tmp;
    tmp = m[5];
    m[5] = m[7];
    m[7] = tmp;
    return this;
  },
  getNormalMatrix: function (matrix4) {
    return this.setFromMatrix4(matrix4).getInverse(this).transpose();
  },
  transposeIntoArray: function (r) {
    var m = this.elements;
    r[0] = m[0];
    r[1] = m[3];
    r[2] = m[6];
    r[3] = m[1];
    r[4] = m[4];
    r[5] = m[7];
    r[6] = m[2];
    r[7] = m[5];
    r[8] = m[8];
    return this;
  },
  setUvTransform: function (tx, ty, sx, sy, rotation, cx, cy) {
    var c = Math.cos(rotation);
    var s = Math.sin(rotation);
    this.set(sx * c, sx * s, -sx * (c * cx + s * cy) + cx + tx, -sy * s, sy * c, -sy * (-s * cx + c * cy) + cy + ty, 0, 0, 1);
  },
  scale: function (sx, sy) {
    var te = this.elements;
    te[0] *= sx;
    te[3] *= sx;
    te[6] *= sx;
    te[1] *= sy;
    te[4] *= sy;
    te[7] *= sy;
    return this;
  },
  rotate: function (theta) {
    var c = Math.cos(theta);
    var s = Math.sin(theta);
    var te = this.elements;
    var a11 = te[0],
        a12 = te[3],
        a13 = te[6];
    var a21 = te[1],
        a22 = te[4],
        a23 = te[7];
    te[0] = c * a11 + s * a21;
    te[3] = c * a12 + s * a22;
    te[6] = c * a13 + s * a23;
    te[1] = -s * a11 + c * a21;
    te[4] = -s * a12 + c * a22;
    te[7] = -s * a13 + c * a23;
    return this;
  },
  translate: function (tx, ty) {
    var te = this.elements;
    te[0] += tx * te[2];
    te[3] += tx * te[5];
    te[6] += tx * te[8];
    te[1] += ty * te[2];
    te[4] += ty * te[5];
    te[7] += ty * te[8];
    return this;
  },
  equals: function (matrix) {
    var te = this.elements;
    var me = matrix.elements;

    for (var i = 0; i < 9; i++) {
      if (te[i] !== me[i]) return false;
    }

    return true;
  },
  fromArray: function (array, offset) {
    if (offset === undefined) offset = 0;

    for (var i = 0; i < 9; i++) {
      this.elements[i] = array[i + offset];
    }

    return this;
  },
  toArray: function (array, offset) {
    if (array === undefined) array = [];
    if (offset === undefined) offset = 0;
    var te = this.elements;
    array[offset] = te[0];
    array[offset + 1] = te[1];
    array[offset + 2] = te[2];
    array[offset + 3] = te[3];
    array[offset + 4] = te[4];
    array[offset + 5] = te[5];
    array[offset + 6] = te[6];
    array[offset + 7] = te[7];
    array[offset + 8] = te[8];
    return array;
  }
});


/***/ }),

/***/ "./node_modules/three/src/math/Matrix4.js":
/*!************************************************!*\
  !*** ./node_modules/three/src/math/Matrix4.js ***!
  \************************************************/
/*! exports provided: Matrix4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Matrix4", function() { return Matrix4; });
/* harmony import */ var _Vector3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector3.js */ "./node_modules/three/src/math/Vector3.js");

/**
 * @author mrdoob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author jordi_ros / http://plattsoft.com
 * @author D1plo1d / http://github.com/D1plo1d
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author timknip / http://www.floorplanner.com/
 * @author bhouston / http://clara.io
 * @author WestLangley / http://github.com/WestLangley
 */

function Matrix4() {
  this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

  if (arguments.length > 0) {
    console.error('THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.');
  }
}

Object.assign(Matrix4.prototype, {
  isMatrix4: true,
  set: function (n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
    var te = this.elements;
    te[0] = n11;
    te[4] = n12;
    te[8] = n13;
    te[12] = n14;
    te[1] = n21;
    te[5] = n22;
    te[9] = n23;
    te[13] = n24;
    te[2] = n31;
    te[6] = n32;
    te[10] = n33;
    te[14] = n34;
    te[3] = n41;
    te[7] = n42;
    te[11] = n43;
    te[15] = n44;
    return this;
  },
  identity: function () {
    this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  },
  clone: function () {
    return new Matrix4().fromArray(this.elements);
  },
  copy: function (m) {
    var te = this.elements;
    var me = m.elements;
    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];
    te[4] = me[4];
    te[5] = me[5];
    te[6] = me[6];
    te[7] = me[7];
    te[8] = me[8];
    te[9] = me[9];
    te[10] = me[10];
    te[11] = me[11];
    te[12] = me[12];
    te[13] = me[13];
    te[14] = me[14];
    te[15] = me[15];
    return this;
  },
  copyPosition: function (m) {
    var te = this.elements,
        me = m.elements;
    te[12] = me[12];
    te[13] = me[13];
    te[14] = me[14];
    return this;
  },
  extractBasis: function (xAxis, yAxis, zAxis) {
    xAxis.setFromMatrixColumn(this, 0);
    yAxis.setFromMatrixColumn(this, 1);
    zAxis.setFromMatrixColumn(this, 2);
    return this;
  },
  makeBasis: function (xAxis, yAxis, zAxis) {
    this.set(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, 0, 0, 0, 1);
    return this;
  },
  extractRotation: function () {
    var v1 = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    return function extractRotation(m) {
      // this method does not support reflection matrices
      var te = this.elements;
      var me = m.elements;
      var scaleX = 1 / v1.setFromMatrixColumn(m, 0).length();
      var scaleY = 1 / v1.setFromMatrixColumn(m, 1).length();
      var scaleZ = 1 / v1.setFromMatrixColumn(m, 2).length();
      te[0] = me[0] * scaleX;
      te[1] = me[1] * scaleX;
      te[2] = me[2] * scaleX;
      te[3] = 0;
      te[4] = me[4] * scaleY;
      te[5] = me[5] * scaleY;
      te[6] = me[6] * scaleY;
      te[7] = 0;
      te[8] = me[8] * scaleZ;
      te[9] = me[9] * scaleZ;
      te[10] = me[10] * scaleZ;
      te[11] = 0;
      te[12] = 0;
      te[13] = 0;
      te[14] = 0;
      te[15] = 1;
      return this;
    };
  }(),
  makeRotationFromEuler: function (euler) {
    if (!(euler && euler.isEuler)) {
      console.error('THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.');
    }

    var te = this.elements;
    var x = euler.x,
        y = euler.y,
        z = euler.z;
    var a = Math.cos(x),
        b = Math.sin(x);
    var c = Math.cos(y),
        d = Math.sin(y);
    var e = Math.cos(z),
        f = Math.sin(z);

    if (euler.order === 'XYZ') {
      var ae = a * e,
          af = a * f,
          be = b * e,
          bf = b * f;
      te[0] = c * e;
      te[4] = -c * f;
      te[8] = d;
      te[1] = af + be * d;
      te[5] = ae - bf * d;
      te[9] = -b * c;
      te[2] = bf - ae * d;
      te[6] = be + af * d;
      te[10] = a * c;
    } else if (euler.order === 'YXZ') {
      var ce = c * e,
          cf = c * f,
          de = d * e,
          df = d * f;
      te[0] = ce + df * b;
      te[4] = de * b - cf;
      te[8] = a * d;
      te[1] = a * f;
      te[5] = a * e;
      te[9] = -b;
      te[2] = cf * b - de;
      te[6] = df + ce * b;
      te[10] = a * c;
    } else if (euler.order === 'ZXY') {
      var ce = c * e,
          cf = c * f,
          de = d * e,
          df = d * f;
      te[0] = ce - df * b;
      te[4] = -a * f;
      te[8] = de + cf * b;
      te[1] = cf + de * b;
      te[5] = a * e;
      te[9] = df - ce * b;
      te[2] = -a * d;
      te[6] = b;
      te[10] = a * c;
    } else if (euler.order === 'ZYX') {
      var ae = a * e,
          af = a * f,
          be = b * e,
          bf = b * f;
      te[0] = c * e;
      te[4] = be * d - af;
      te[8] = ae * d + bf;
      te[1] = c * f;
      te[5] = bf * d + ae;
      te[9] = af * d - be;
      te[2] = -d;
      te[6] = b * c;
      te[10] = a * c;
    } else if (euler.order === 'YZX') {
      var ac = a * c,
          ad = a * d,
          bc = b * c,
          bd = b * d;
      te[0] = c * e;
      te[4] = bd - ac * f;
      te[8] = bc * f + ad;
      te[1] = f;
      te[5] = a * e;
      te[9] = -b * e;
      te[2] = -d * e;
      te[6] = ad * f + bc;
      te[10] = ac - bd * f;
    } else if (euler.order === 'XZY') {
      var ac = a * c,
          ad = a * d,
          bc = b * c,
          bd = b * d;
      te[0] = c * e;
      te[4] = -f;
      te[8] = d * e;
      te[1] = ac * f + bd;
      te[5] = a * e;
      te[9] = ad * f - bc;
      te[2] = bc * f - ad;
      te[6] = b * e;
      te[10] = bd * f + ac;
    } // bottom row


    te[3] = 0;
    te[7] = 0;
    te[11] = 0; // last column

    te[12] = 0;
    te[13] = 0;
    te[14] = 0;
    te[15] = 1;
    return this;
  },
  makeRotationFromQuaternion: function () {
    var zero = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0);
    var one = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"](1, 1, 1);
    return function makeRotationFromQuaternion(q) {
      return this.compose(zero, q, one);
    };
  }(),
  lookAt: function () {
    var x = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    var y = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    var z = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    return function lookAt(eye, target, up) {
      var te = this.elements;
      z.subVectors(eye, target);

      if (z.lengthSq() === 0) {
        // eye and target are in the same position
        z.z = 1;
      }

      z.normalize();
      x.crossVectors(up, z);

      if (x.lengthSq() === 0) {
        // up and z are parallel
        if (Math.abs(up.z) === 1) {
          z.x += 0.0001;
        } else {
          z.z += 0.0001;
        }

        z.normalize();
        x.crossVectors(up, z);
      }

      x.normalize();
      y.crossVectors(z, x);
      te[0] = x.x;
      te[4] = y.x;
      te[8] = z.x;
      te[1] = x.y;
      te[5] = y.y;
      te[9] = z.y;
      te[2] = x.z;
      te[6] = y.z;
      te[10] = z.z;
      return this;
    };
  }(),
  multiply: function (m, n) {
    if (n !== undefined) {
      console.warn('THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.');
      return this.multiplyMatrices(m, n);
    }

    return this.multiplyMatrices(this, m);
  },
  premultiply: function (m) {
    return this.multiplyMatrices(m, this);
  },
  multiplyMatrices: function (a, b) {
    var ae = a.elements;
    var be = b.elements;
    var te = this.elements;
    var a11 = ae[0],
        a12 = ae[4],
        a13 = ae[8],
        a14 = ae[12];
    var a21 = ae[1],
        a22 = ae[5],
        a23 = ae[9],
        a24 = ae[13];
    var a31 = ae[2],
        a32 = ae[6],
        a33 = ae[10],
        a34 = ae[14];
    var a41 = ae[3],
        a42 = ae[7],
        a43 = ae[11],
        a44 = ae[15];
    var b11 = be[0],
        b12 = be[4],
        b13 = be[8],
        b14 = be[12];
    var b21 = be[1],
        b22 = be[5],
        b23 = be[9],
        b24 = be[13];
    var b31 = be[2],
        b32 = be[6],
        b33 = be[10],
        b34 = be[14];
    var b41 = be[3],
        b42 = be[7],
        b43 = be[11],
        b44 = be[15];
    te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
    te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
    te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
    te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
    return this;
  },
  multiplyScalar: function (s) {
    var te = this.elements;
    te[0] *= s;
    te[4] *= s;
    te[8] *= s;
    te[12] *= s;
    te[1] *= s;
    te[5] *= s;
    te[9] *= s;
    te[13] *= s;
    te[2] *= s;
    te[6] *= s;
    te[10] *= s;
    te[14] *= s;
    te[3] *= s;
    te[7] *= s;
    te[11] *= s;
    te[15] *= s;
    return this;
  },
  applyToBufferAttribute: function () {
    var v1 = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    return function applyToBufferAttribute(attribute) {
      for (var i = 0, l = attribute.count; i < l; i++) {
        v1.x = attribute.getX(i);
        v1.y = attribute.getY(i);
        v1.z = attribute.getZ(i);
        v1.applyMatrix4(this);
        attribute.setXYZ(i, v1.x, v1.y, v1.z);
      }

      return attribute;
    };
  }(),
  determinant: function () {
    var te = this.elements;
    var n11 = te[0],
        n12 = te[4],
        n13 = te[8],
        n14 = te[12];
    var n21 = te[1],
        n22 = te[5],
        n23 = te[9],
        n24 = te[13];
    var n31 = te[2],
        n32 = te[6],
        n33 = te[10],
        n34 = te[14];
    var n41 = te[3],
        n42 = te[7],
        n43 = te[11],
        n44 = te[15]; //TODO: make this more efficient
    //( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

    return n41 * (+n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34) + n42 * (+n11 * n23 * n34 - n11 * n24 * n33 + n14 * n21 * n33 - n13 * n21 * n34 + n13 * n24 * n31 - n14 * n23 * n31) + n43 * (+n11 * n24 * n32 - n11 * n22 * n34 - n14 * n21 * n32 + n12 * n21 * n34 + n14 * n22 * n31 - n12 * n24 * n31) + n44 * (-n13 * n22 * n31 - n11 * n23 * n32 + n11 * n22 * n33 + n13 * n21 * n32 - n12 * n21 * n33 + n12 * n23 * n31);
  },
  transpose: function () {
    var te = this.elements;
    var tmp;
    tmp = te[1];
    te[1] = te[4];
    te[4] = tmp;
    tmp = te[2];
    te[2] = te[8];
    te[8] = tmp;
    tmp = te[6];
    te[6] = te[9];
    te[9] = tmp;
    tmp = te[3];
    te[3] = te[12];
    te[12] = tmp;
    tmp = te[7];
    te[7] = te[13];
    te[13] = tmp;
    tmp = te[11];
    te[11] = te[14];
    te[14] = tmp;
    return this;
  },
  setPosition: function (v) {
    var te = this.elements;
    te[12] = v.x;
    te[13] = v.y;
    te[14] = v.z;
    return this;
  },
  getInverse: function (m, throwOnDegenerate) {
    // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
    var te = this.elements,
        me = m.elements,
        n11 = me[0],
        n21 = me[1],
        n31 = me[2],
        n41 = me[3],
        n12 = me[4],
        n22 = me[5],
        n32 = me[6],
        n42 = me[7],
        n13 = me[8],
        n23 = me[9],
        n33 = me[10],
        n43 = me[11],
        n14 = me[12],
        n24 = me[13],
        n34 = me[14],
        n44 = me[15],
        t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
        t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
        t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
        t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
    var det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

    if (det === 0) {
      var msg = "THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0";

      if (throwOnDegenerate === true) {
        throw new Error(msg);
      } else {
        console.warn(msg);
      }

      return this.identity();
    }

    var detInv = 1 / det;
    te[0] = t11 * detInv;
    te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
    te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
    te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;
    te[4] = t12 * detInv;
    te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
    te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
    te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;
    te[8] = t13 * detInv;
    te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
    te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
    te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;
    te[12] = t14 * detInv;
    te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
    te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
    te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;
    return this;
  },
  scale: function (v) {
    var te = this.elements;
    var x = v.x,
        y = v.y,
        z = v.z;
    te[0] *= x;
    te[4] *= y;
    te[8] *= z;
    te[1] *= x;
    te[5] *= y;
    te[9] *= z;
    te[2] *= x;
    te[6] *= y;
    te[10] *= z;
    te[3] *= x;
    te[7] *= y;
    te[11] *= z;
    return this;
  },
  getMaxScaleOnAxis: function () {
    var te = this.elements;
    var scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
    var scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
    var scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
    return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
  },
  makeTranslation: function (x, y, z) {
    this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
    return this;
  },
  makeRotationX: function (theta) {
    var c = Math.cos(theta),
        s = Math.sin(theta);
    this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
    return this;
  },
  makeRotationY: function (theta) {
    var c = Math.cos(theta),
        s = Math.sin(theta);
    this.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);
    return this;
  },
  makeRotationZ: function (theta) {
    var c = Math.cos(theta),
        s = Math.sin(theta);
    this.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  },
  makeRotationAxis: function (axis, angle) {
    // Based on http://www.gamedev.net/reference/articles/article1199.asp
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var t = 1 - c;
    var x = axis.x,
        y = axis.y,
        z = axis.z;
    var tx = t * x,
        ty = t * y;
    this.set(tx * x + c, tx * y - s * z, tx * z + s * y, 0, tx * y + s * z, ty * y + c, ty * z - s * x, 0, tx * z - s * y, ty * z + s * x, t * z * z + c, 0, 0, 0, 0, 1);
    return this;
  },
  makeScale: function (x, y, z) {
    this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
    return this;
  },
  makeShear: function (x, y, z) {
    this.set(1, y, z, 0, x, 1, z, 0, x, y, 1, 0, 0, 0, 0, 1);
    return this;
  },
  compose: function (position, quaternion, scale) {
    var te = this.elements;
    var x = quaternion._x,
        y = quaternion._y,
        z = quaternion._z,
        w = quaternion._w;
    var x2 = x + x,
        y2 = y + y,
        z2 = z + z;
    var xx = x * x2,
        xy = x * y2,
        xz = x * z2;
    var yy = y * y2,
        yz = y * z2,
        zz = z * z2;
    var wx = w * x2,
        wy = w * y2,
        wz = w * z2;
    var sx = scale.x,
        sy = scale.y,
        sz = scale.z;
    te[0] = (1 - (yy + zz)) * sx;
    te[1] = (xy + wz) * sx;
    te[2] = (xz - wy) * sx;
    te[3] = 0;
    te[4] = (xy - wz) * sy;
    te[5] = (1 - (xx + zz)) * sy;
    te[6] = (yz + wx) * sy;
    te[7] = 0;
    te[8] = (xz + wy) * sz;
    te[9] = (yz - wx) * sz;
    te[10] = (1 - (xx + yy)) * sz;
    te[11] = 0;
    te[12] = position.x;
    te[13] = position.y;
    te[14] = position.z;
    te[15] = 1;
    return this;
  },
  decompose: function () {
    var vector = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    var matrix = new Matrix4();
    return function decompose(position, quaternion, scale) {
      var te = this.elements;
      var sx = vector.set(te[0], te[1], te[2]).length();
      var sy = vector.set(te[4], te[5], te[6]).length();
      var sz = vector.set(te[8], te[9], te[10]).length(); // if determine is negative, we need to invert one scale

      var det = this.determinant();
      if (det < 0) sx = -sx;
      position.x = te[12];
      position.y = te[13];
      position.z = te[14]; // scale the rotation part

      matrix.copy(this);
      var invSX = 1 / sx;
      var invSY = 1 / sy;
      var invSZ = 1 / sz;
      matrix.elements[0] *= invSX;
      matrix.elements[1] *= invSX;
      matrix.elements[2] *= invSX;
      matrix.elements[4] *= invSY;
      matrix.elements[5] *= invSY;
      matrix.elements[6] *= invSY;
      matrix.elements[8] *= invSZ;
      matrix.elements[9] *= invSZ;
      matrix.elements[10] *= invSZ;
      quaternion.setFromRotationMatrix(matrix);
      scale.x = sx;
      scale.y = sy;
      scale.z = sz;
      return this;
    };
  }(),
  makePerspective: function (left, right, top, bottom, near, far) {
    if (far === undefined) {
      console.warn('THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.');
    }

    var te = this.elements;
    var x = 2 * near / (right - left);
    var y = 2 * near / (top - bottom);
    var a = (right + left) / (right - left);
    var b = (top + bottom) / (top - bottom);
    var c = -(far + near) / (far - near);
    var d = -2 * far * near / (far - near);
    te[0] = x;
    te[4] = 0;
    te[8] = a;
    te[12] = 0;
    te[1] = 0;
    te[5] = y;
    te[9] = b;
    te[13] = 0;
    te[2] = 0;
    te[6] = 0;
    te[10] = c;
    te[14] = d;
    te[3] = 0;
    te[7] = 0;
    te[11] = -1;
    te[15] = 0;
    return this;
  },
  makeOrthographic: function (left, right, top, bottom, near, far) {
    var te = this.elements;
    var w = 1.0 / (right - left);
    var h = 1.0 / (top - bottom);
    var p = 1.0 / (far - near);
    var x = (right + left) * w;
    var y = (top + bottom) * h;
    var z = (far + near) * p;
    te[0] = 2 * w;
    te[4] = 0;
    te[8] = 0;
    te[12] = -x;
    te[1] = 0;
    te[5] = 2 * h;
    te[9] = 0;
    te[13] = -y;
    te[2] = 0;
    te[6] = 0;
    te[10] = -2 * p;
    te[14] = -z;
    te[3] = 0;
    te[7] = 0;
    te[11] = 0;
    te[15] = 1;
    return this;
  },
  equals: function (matrix) {
    var te = this.elements;
    var me = matrix.elements;

    for (var i = 0; i < 16; i++) {
      if (te[i] !== me[i]) return false;
    }

    return true;
  },
  fromArray: function (array, offset) {
    if (offset === undefined) offset = 0;

    for (var i = 0; i < 16; i++) {
      this.elements[i] = array[i + offset];
    }

    return this;
  },
  toArray: function (array, offset) {
    if (array === undefined) array = [];
    if (offset === undefined) offset = 0;
    var te = this.elements;
    array[offset] = te[0];
    array[offset + 1] = te[1];
    array[offset + 2] = te[2];
    array[offset + 3] = te[3];
    array[offset + 4] = te[4];
    array[offset + 5] = te[5];
    array[offset + 6] = te[6];
    array[offset + 7] = te[7];
    array[offset + 8] = te[8];
    array[offset + 9] = te[9];
    array[offset + 10] = te[10];
    array[offset + 11] = te[11];
    array[offset + 12] = te[12];
    array[offset + 13] = te[13];
    array[offset + 14] = te[14];
    array[offset + 15] = te[15];
    return array;
  }
});


/***/ }),

/***/ "./node_modules/three/src/math/Quaternion.js":
/*!***************************************************!*\
  !*** ./node_modules/three/src/math/Quaternion.js ***!
  \***************************************************/
/*! exports provided: Quaternion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Quaternion", function() { return Quaternion; });
/* harmony import */ var _Vector3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector3.js */ "./node_modules/three/src/math/Vector3.js");

/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 */

function Quaternion(x, y, z, w) {
  this._x = x || 0;
  this._y = y || 0;
  this._z = z || 0;
  this._w = w !== undefined ? w : 1;
}

Object.assign(Quaternion, {
  slerp: function (qa, qb, qm, t) {
    return qm.copy(qa).slerp(qb, t);
  },
  slerpFlat: function (dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {
    // fuzz-free, array-based Quaternion SLERP operation
    var x0 = src0[srcOffset0 + 0],
        y0 = src0[srcOffset0 + 1],
        z0 = src0[srcOffset0 + 2],
        w0 = src0[srcOffset0 + 3],
        x1 = src1[srcOffset1 + 0],
        y1 = src1[srcOffset1 + 1],
        z1 = src1[srcOffset1 + 2],
        w1 = src1[srcOffset1 + 3];

    if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {
      var s = 1 - t,
          cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,
          dir = cos >= 0 ? 1 : -1,
          sqrSin = 1 - cos * cos; // Skip the Slerp for tiny steps to avoid numeric problems:

      if (sqrSin > Number.EPSILON) {
        var sin = Math.sqrt(sqrSin),
            len = Math.atan2(sin, cos * dir);
        s = Math.sin(s * len) / sin;
        t = Math.sin(t * len) / sin;
      }

      var tDir = t * dir;
      x0 = x0 * s + x1 * tDir;
      y0 = y0 * s + y1 * tDir;
      z0 = z0 * s + z1 * tDir;
      w0 = w0 * s + w1 * tDir; // Normalize in case we just did a lerp:

      if (s === 1 - t) {
        var f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);
        x0 *= f;
        y0 *= f;
        z0 *= f;
        w0 *= f;
      }
    }

    dst[dstOffset] = x0;
    dst[dstOffset + 1] = y0;
    dst[dstOffset + 2] = z0;
    dst[dstOffset + 3] = w0;
  }
});
Object.defineProperties(Quaternion.prototype, {
  x: {
    get: function () {
      return this._x;
    },
    set: function (value) {
      this._x = value;
      this.onChangeCallback();
    }
  },
  y: {
    get: function () {
      return this._y;
    },
    set: function (value) {
      this._y = value;
      this.onChangeCallback();
    }
  },
  z: {
    get: function () {
      return this._z;
    },
    set: function (value) {
      this._z = value;
      this.onChangeCallback();
    }
  },
  w: {
    get: function () {
      return this._w;
    },
    set: function (value) {
      this._w = value;
      this.onChangeCallback();
    }
  }
});
Object.assign(Quaternion.prototype, {
  set: function (x, y, z, w) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
    this.onChangeCallback();
    return this;
  },
  clone: function () {
    return new this.constructor(this._x, this._y, this._z, this._w);
  },
  copy: function (quaternion) {
    this._x = quaternion.x;
    this._y = quaternion.y;
    this._z = quaternion.z;
    this._w = quaternion.w;
    this.onChangeCallback();
    return this;
  },
  setFromEuler: function (euler, update) {
    if (!(euler && euler.isEuler)) {
      throw new Error('THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.');
    }

    var x = euler._x,
        y = euler._y,
        z = euler._z,
        order = euler.order; // http://www.mathworks.com/matlabcentral/fileexchange/
    // 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
    //	content/SpinCalc.m

    var cos = Math.cos;
    var sin = Math.sin;
    var c1 = cos(x / 2);
    var c2 = cos(y / 2);
    var c3 = cos(z / 2);
    var s1 = sin(x / 2);
    var s2 = sin(y / 2);
    var s3 = sin(z / 2);

    if (order === 'XYZ') {
      this._x = s1 * c2 * c3 + c1 * s2 * s3;
      this._y = c1 * s2 * c3 - s1 * c2 * s3;
      this._z = c1 * c2 * s3 + s1 * s2 * c3;
      this._w = c1 * c2 * c3 - s1 * s2 * s3;
    } else if (order === 'YXZ') {
      this._x = s1 * c2 * c3 + c1 * s2 * s3;
      this._y = c1 * s2 * c3 - s1 * c2 * s3;
      this._z = c1 * c2 * s3 - s1 * s2 * c3;
      this._w = c1 * c2 * c3 + s1 * s2 * s3;
    } else if (order === 'ZXY') {
      this._x = s1 * c2 * c3 - c1 * s2 * s3;
      this._y = c1 * s2 * c3 + s1 * c2 * s3;
      this._z = c1 * c2 * s3 + s1 * s2 * c3;
      this._w = c1 * c2 * c3 - s1 * s2 * s3;
    } else if (order === 'ZYX') {
      this._x = s1 * c2 * c3 - c1 * s2 * s3;
      this._y = c1 * s2 * c3 + s1 * c2 * s3;
      this._z = c1 * c2 * s3 - s1 * s2 * c3;
      this._w = c1 * c2 * c3 + s1 * s2 * s3;
    } else if (order === 'YZX') {
      this._x = s1 * c2 * c3 + c1 * s2 * s3;
      this._y = c1 * s2 * c3 + s1 * c2 * s3;
      this._z = c1 * c2 * s3 - s1 * s2 * c3;
      this._w = c1 * c2 * c3 - s1 * s2 * s3;
    } else if (order === 'XZY') {
      this._x = s1 * c2 * c3 - c1 * s2 * s3;
      this._y = c1 * s2 * c3 - s1 * c2 * s3;
      this._z = c1 * c2 * s3 + s1 * s2 * c3;
      this._w = c1 * c2 * c3 + s1 * s2 * s3;
    }

    if (update !== false) this.onChangeCallback();
    return this;
  },
  setFromAxisAngle: function (axis, angle) {
    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
    // assumes axis is normalized
    var halfAngle = angle / 2,
        s = Math.sin(halfAngle);
    this._x = axis.x * s;
    this._y = axis.y * s;
    this._z = axis.z * s;
    this._w = Math.cos(halfAngle);
    this.onChangeCallback();
    return this;
  },
  setFromRotationMatrix: function (m) {
    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
    // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
    var te = m.elements,
        m11 = te[0],
        m12 = te[4],
        m13 = te[8],
        m21 = te[1],
        m22 = te[5],
        m23 = te[9],
        m31 = te[2],
        m32 = te[6],
        m33 = te[10],
        trace = m11 + m22 + m33,
        s;

    if (trace > 0) {
      s = 0.5 / Math.sqrt(trace + 1.0);
      this._w = 0.25 / s;
      this._x = (m32 - m23) * s;
      this._y = (m13 - m31) * s;
      this._z = (m21 - m12) * s;
    } else if (m11 > m22 && m11 > m33) {
      s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
      this._w = (m32 - m23) / s;
      this._x = 0.25 * s;
      this._y = (m12 + m21) / s;
      this._z = (m13 + m31) / s;
    } else if (m22 > m33) {
      s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
      this._w = (m13 - m31) / s;
      this._x = (m12 + m21) / s;
      this._y = 0.25 * s;
      this._z = (m23 + m32) / s;
    } else {
      s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
      this._w = (m21 - m12) / s;
      this._x = (m13 + m31) / s;
      this._y = (m23 + m32) / s;
      this._z = 0.25 * s;
    }

    this.onChangeCallback();
    return this;
  },
  setFromUnitVectors: function () {
    // assumes direction vectors vFrom and vTo are normalized
    var v1 = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    var r;
    var EPS = 0.000001;
    return function setFromUnitVectors(vFrom, vTo) {
      if (v1 === undefined) v1 = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
      r = vFrom.dot(vTo) + 1;

      if (r < EPS) {
        r = 0;

        if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
          v1.set(-vFrom.y, vFrom.x, 0);
        } else {
          v1.set(0, -vFrom.z, vFrom.y);
        }
      } else {
        v1.crossVectors(vFrom, vTo);
      }

      this._x = v1.x;
      this._y = v1.y;
      this._z = v1.z;
      this._w = r;
      return this.normalize();
    };
  }(),
  inverse: function () {
    // quaternion is assumed to have unit length
    return this.conjugate();
  },
  conjugate: function () {
    this._x *= -1;
    this._y *= -1;
    this._z *= -1;
    this.onChangeCallback();
    return this;
  },
  dot: function (v) {
    return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;
  },
  lengthSq: function () {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  },
  length: function () {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  },
  normalize: function () {
    var l = this.length();

    if (l === 0) {
      this._x = 0;
      this._y = 0;
      this._z = 0;
      this._w = 1;
    } else {
      l = 1 / l;
      this._x = this._x * l;
      this._y = this._y * l;
      this._z = this._z * l;
      this._w = this._w * l;
    }

    this.onChangeCallback();
    return this;
  },
  multiply: function (q, p) {
    if (p !== undefined) {
      console.warn('THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.');
      return this.multiplyQuaternions(q, p);
    }

    return this.multiplyQuaternions(this, q);
  },
  premultiply: function (q) {
    return this.multiplyQuaternions(q, this);
  },
  multiplyQuaternions: function (a, b) {
    // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
    var qax = a._x,
        qay = a._y,
        qaz = a._z,
        qaw = a._w;
    var qbx = b._x,
        qby = b._y,
        qbz = b._z,
        qbw = b._w;
    this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
    this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
    this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
    this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
    this.onChangeCallback();
    return this;
  },
  slerp: function (qb, t) {
    if (t === 0) return this;
    if (t === 1) return this.copy(qb);
    var x = this._x,
        y = this._y,
        z = this._z,
        w = this._w; // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

    var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

    if (cosHalfTheta < 0) {
      this._w = -qb._w;
      this._x = -qb._x;
      this._y = -qb._y;
      this._z = -qb._z;
      cosHalfTheta = -cosHalfTheta;
    } else {
      this.copy(qb);
    }

    if (cosHalfTheta >= 1.0) {
      this._w = w;
      this._x = x;
      this._y = y;
      this._z = z;
      return this;
    }

    var sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

    if (sqrSinHalfTheta <= Number.EPSILON) {
      var s = 1 - t;
      this._w = s * w + t * this._w;
      this._x = s * x + t * this._x;
      this._y = s * y + t * this._y;
      this._z = s * z + t * this._z;
      return this.normalize();
    }

    var sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
    var halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
    var ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta,
        ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
    this._w = w * ratioA + this._w * ratioB;
    this._x = x * ratioA + this._x * ratioB;
    this._y = y * ratioA + this._y * ratioB;
    this._z = z * ratioA + this._z * ratioB;
    this.onChangeCallback();
    return this;
  },
  equals: function (quaternion) {
    return quaternion._x === this._x && quaternion._y === this._y && quaternion._z === this._z && quaternion._w === this._w;
  },
  fromArray: function (array, offset) {
    if (offset === undefined) offset = 0;
    this._x = array[offset];
    this._y = array[offset + 1];
    this._z = array[offset + 2];
    this._w = array[offset + 3];
    this.onChangeCallback();
    return this;
  },
  toArray: function (array, offset) {
    if (array === undefined) array = [];
    if (offset === undefined) offset = 0;
    array[offset] = this._x;
    array[offset + 1] = this._y;
    array[offset + 2] = this._z;
    array[offset + 3] = this._w;
    return array;
  },
  onChange: function (callback) {
    this.onChangeCallback = callback;
    return this;
  },
  onChangeCallback: function () {}
});


/***/ }),

/***/ "./node_modules/three/src/math/Ray.js":
/*!********************************************!*\
  !*** ./node_modules/three/src/math/Ray.js ***!
  \********************************************/
/*! exports provided: Ray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ray", function() { return Ray; });
/* harmony import */ var _Vector3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector3.js */ "./node_modules/three/src/math/Vector3.js");

/**
 * @author bhouston / http://clara.io
 */

function Ray(origin, direction) {
  this.origin = origin !== undefined ? origin : new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
  this.direction = direction !== undefined ? direction : new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
}

Object.assign(Ray.prototype, {
  set: function (origin, direction) {
    this.origin.copy(origin);
    this.direction.copy(direction);
    return this;
  },
  clone: function () {
    return new this.constructor().copy(this);
  },
  copy: function (ray) {
    this.origin.copy(ray.origin);
    this.direction.copy(ray.direction);
    return this;
  },
  at: function (t, target) {
    if (target === undefined) {
      console.warn('THREE.Ray: .at() target is now required');
      target = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    }

    return target.copy(this.direction).multiplyScalar(t).add(this.origin);
  },
  lookAt: function (v) {
    this.direction.copy(v).sub(this.origin).normalize();
    return this;
  },
  recast: function () {
    var v1 = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    return function recast(t) {
      this.origin.copy(this.at(t, v1));
      return this;
    };
  }(),
  closestPointToPoint: function (point, target) {
    if (target === undefined) {
      console.warn('THREE.Ray: .closestPointToPoint() target is now required');
      target = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    }

    target.subVectors(point, this.origin);
    var directionDistance = target.dot(this.direction);

    if (directionDistance < 0) {
      return target.copy(this.origin);
    }

    return target.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);
  },
  distanceToPoint: function (point) {
    return Math.sqrt(this.distanceSqToPoint(point));
  },
  distanceSqToPoint: function () {
    var v1 = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    return function distanceSqToPoint(point) {
      var directionDistance = v1.subVectors(point, this.origin).dot(this.direction); // point behind the ray

      if (directionDistance < 0) {
        return this.origin.distanceToSquared(point);
      }

      v1.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);
      return v1.distanceToSquared(point);
    };
  }(),
  distanceSqToSegment: function () {
    var segCenter = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    var segDir = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    var diff = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    return function distanceSqToSegment(v0, v1, optionalPointOnRay, optionalPointOnSegment) {
      // from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteDistRaySegment.h
      // It returns the min distance between the ray and the segment
      // defined by v0 and v1
      // It can also set two optional targets :
      // - The closest point on the ray
      // - The closest point on the segment
      segCenter.copy(v0).add(v1).multiplyScalar(0.5);
      segDir.copy(v1).sub(v0).normalize();
      diff.copy(this.origin).sub(segCenter);
      var segExtent = v0.distanceTo(v1) * 0.5;
      var a01 = -this.direction.dot(segDir);
      var b0 = diff.dot(this.direction);
      var b1 = -diff.dot(segDir);
      var c = diff.lengthSq();
      var det = Math.abs(1 - a01 * a01);
      var s0, s1, sqrDist, extDet;

      if (det > 0) {
        // The ray and segment are not parallel.
        s0 = a01 * b1 - b0;
        s1 = a01 * b0 - b1;
        extDet = segExtent * det;

        if (s0 >= 0) {
          if (s1 >= -extDet) {
            if (s1 <= extDet) {
              // region 0
              // Minimum at interior points of ray and segment.
              var invDet = 1 / det;
              s0 *= invDet;
              s1 *= invDet;
              sqrDist = s0 * (s0 + a01 * s1 + 2 * b0) + s1 * (a01 * s0 + s1 + 2 * b1) + c;
            } else {
              // region 1
              s1 = segExtent;
              s0 = Math.max(0, -(a01 * s1 + b0));
              sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
            }
          } else {
            // region 5
            s1 = -segExtent;
            s0 = Math.max(0, -(a01 * s1 + b0));
            sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
          }
        } else {
          if (s1 <= -extDet) {
            // region 4
            s0 = Math.max(0, -(-a01 * segExtent + b0));
            s1 = s0 > 0 ? -segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
            sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
          } else if (s1 <= extDet) {
            // region 3
            s0 = 0;
            s1 = Math.min(Math.max(-segExtent, -b1), segExtent);
            sqrDist = s1 * (s1 + 2 * b1) + c;
          } else {
            // region 2
            s0 = Math.max(0, -(a01 * segExtent + b0));
            s1 = s0 > 0 ? segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
            sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
          }
        }
      } else {
        // Ray and segment are parallel.
        s1 = a01 > 0 ? -segExtent : segExtent;
        s0 = Math.max(0, -(a01 * s1 + b0));
        sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
      }

      if (optionalPointOnRay) {
        optionalPointOnRay.copy(this.direction).multiplyScalar(s0).add(this.origin);
      }

      if (optionalPointOnSegment) {
        optionalPointOnSegment.copy(segDir).multiplyScalar(s1).add(segCenter);
      }

      return sqrDist;
    };
  }(),
  intersectSphere: function () {
    var v1 = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    return function intersectSphere(sphere, target) {
      v1.subVectors(sphere.center, this.origin);
      var tca = v1.dot(this.direction);
      var d2 = v1.dot(v1) - tca * tca;
      var radius2 = sphere.radius * sphere.radius;
      if (d2 > radius2) return null;
      var thc = Math.sqrt(radius2 - d2); // t0 = first intersect point - entrance on front of sphere

      var t0 = tca - thc; // t1 = second intersect point - exit point on back of sphere

      var t1 = tca + thc; // test to see if both t0 and t1 are behind the ray - if so, return null

      if (t0 < 0 && t1 < 0) return null; // test to see if t0 is behind the ray:
      // if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
      // in order to always return an intersect point that is in front of the ray.

      if (t0 < 0) return this.at(t1, target); // else t0 is in front of the ray, so return the first collision point scaled by t0

      return this.at(t0, target);
    };
  }(),
  intersectsSphere: function (sphere) {
    return this.distanceToPoint(sphere.center) <= sphere.radius;
  },
  distanceToPlane: function (plane) {
    var denominator = plane.normal.dot(this.direction);

    if (denominator === 0) {
      // line is coplanar, return origin
      if (plane.distanceToPoint(this.origin) === 0) {
        return 0;
      } // Null is preferable to undefined since undefined means.... it is undefined


      return null;
    }

    var t = -(this.origin.dot(plane.normal) + plane.constant) / denominator; // Return if the ray never intersects the plane

    return t >= 0 ? t : null;
  },
  intersectPlane: function (plane, target) {
    var t = this.distanceToPlane(plane);

    if (t === null) {
      return null;
    }

    return this.at(t, target);
  },
  intersectsPlane: function (plane) {
    // check if the ray lies on the plane first
    var distToPoint = plane.distanceToPoint(this.origin);

    if (distToPoint === 0) {
      return true;
    }

    var denominator = plane.normal.dot(this.direction);

    if (denominator * distToPoint < 0) {
      return true;
    } // ray origin is behind the plane (and is pointing behind it)


    return false;
  },
  intersectBox: function (box, target) {
    var tmin, tmax, tymin, tymax, tzmin, tzmax;
    var invdirx = 1 / this.direction.x,
        invdiry = 1 / this.direction.y,
        invdirz = 1 / this.direction.z;
    var origin = this.origin;

    if (invdirx >= 0) {
      tmin = (box.min.x - origin.x) * invdirx;
      tmax = (box.max.x - origin.x) * invdirx;
    } else {
      tmin = (box.max.x - origin.x) * invdirx;
      tmax = (box.min.x - origin.x) * invdirx;
    }

    if (invdiry >= 0) {
      tymin = (box.min.y - origin.y) * invdiry;
      tymax = (box.max.y - origin.y) * invdiry;
    } else {
      tymin = (box.max.y - origin.y) * invdiry;
      tymax = (box.min.y - origin.y) * invdiry;
    }

    if (tmin > tymax || tymin > tmax) return null; // These lines also handle the case where tmin or tmax is NaN
    // (result of 0 * Infinity). x !== x returns true if x is NaN

    if (tymin > tmin || tmin !== tmin) tmin = tymin;
    if (tymax < tmax || tmax !== tmax) tmax = tymax;

    if (invdirz >= 0) {
      tzmin = (box.min.z - origin.z) * invdirz;
      tzmax = (box.max.z - origin.z) * invdirz;
    } else {
      tzmin = (box.max.z - origin.z) * invdirz;
      tzmax = (box.min.z - origin.z) * invdirz;
    }

    if (tmin > tzmax || tzmin > tmax) return null;
    if (tzmin > tmin || tmin !== tmin) tmin = tzmin;
    if (tzmax < tmax || tmax !== tmax) tmax = tzmax; //return point closest to the ray (positive side)

    if (tmax < 0) return null;
    return this.at(tmin >= 0 ? tmin : tmax, target);
  },
  intersectsBox: function () {
    var v = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    return function intersectsBox(box) {
      return this.intersectBox(box, v) !== null;
    };
  }(),
  intersectTriangle: function () {
    // Compute the offset origin, edges, and normal.
    var diff = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    var edge1 = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    var edge2 = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    var normal = new _Vector3_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
    return function intersectTriangle(a, b, c, backfaceCulling, target) {
      // from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h
      edge1.subVectors(b, a);
      edge2.subVectors(c, a);
      normal.crossVectors(edge1, edge2); // Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
      // E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
      //   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
      //   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
      //   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)

      var DdN = this.direction.dot(normal);
      var sign;

      if (DdN > 0) {
        if (backfaceCulling) return null;
        sign = 1;
      } else if (DdN < 0) {
        sign = -1;
        DdN = -DdN;
      } else {
        return null;
      }

      diff.subVectors(this.origin, a);
      var DdQxE2 = sign * this.direction.dot(edge2.crossVectors(diff, edge2)); // b1 < 0, no intersection

      if (DdQxE2 < 0) {
        return null;
      }

      var DdE1xQ = sign * this.direction.dot(edge1.cross(diff)); // b2 < 0, no intersection

      if (DdE1xQ < 0) {
        return null;
      } // b1+b2 > 1, no intersection


      if (DdQxE2 + DdE1xQ > DdN) {
        return null;
      } // Line intersects triangle, check if ray does.


      var QdN = -sign * diff.dot(normal); // t < 0, no intersection

      if (QdN < 0) {
        return null;
      } // Ray intersects triangle.


      return this.at(QdN / DdN, target);
    };
  }(),
  applyMatrix4: function (matrix4) {
    this.origin.applyMatrix4(matrix4);
    this.direction.transformDirection(matrix4);
    return this;
  },
  equals: function (ray) {
    return ray.origin.equals(this.origin) && ray.direction.equals(this.direction);
  }
});


/***/ }),

/***/ "./node_modules/three/src/math/Sphere.js":
/*!***********************************************!*\
  !*** ./node_modules/three/src/math/Sphere.js ***!
  \***********************************************/
/*! exports provided: Sphere */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sphere", function() { return Sphere; });
/* harmony import */ var _Box3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Box3.js */ "./node_modules/three/src/math/Box3.js");
/* harmony import */ var _Vector3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vector3.js */ "./node_modules/three/src/math/Vector3.js");


/**
 * @author bhouston / http://clara.io
 * @author mrdoob / http://mrdoob.com/
 */

function Sphere(center, radius) {
  this.center = center !== undefined ? center : new _Vector3_js__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
  this.radius = radius !== undefined ? radius : 0;
}

Object.assign(Sphere.prototype, {
  set: function (center, radius) {
    this.center.copy(center);
    this.radius = radius;
    return this;
  },
  setFromPoints: function () {
    var box = new _Box3_js__WEBPACK_IMPORTED_MODULE_0__["Box3"]();
    return function setFromPoints(points, optionalCenter) {
      var center = this.center;

      if (optionalCenter !== undefined) {
        center.copy(optionalCenter);
      } else {
        box.setFromPoints(points).getCenter(center);
      }

      var maxRadiusSq = 0;

      for (var i = 0, il = points.length; i < il; i++) {
        maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(points[i]));
      }

      this.radius = Math.sqrt(maxRadiusSq);
      return this;
    };
  }(),
  clone: function () {
    return new this.constructor().copy(this);
  },
  copy: function (sphere) {
    this.center.copy(sphere.center);
    this.radius = sphere.radius;
    return this;
  },
  empty: function () {
    return this.radius <= 0;
  },
  containsPoint: function (point) {
    return point.distanceToSquared(this.center) <= this.radius * this.radius;
  },
  distanceToPoint: function (point) {
    return point.distanceTo(this.center) - this.radius;
  },
  intersectsSphere: function (sphere) {
    var radiusSum = this.radius + sphere.radius;
    return sphere.center.distanceToSquared(this.center) <= radiusSum * radiusSum;
  },
  intersectsBox: function (box) {
    return box.intersectsSphere(this);
  },
  intersectsPlane: function (plane) {
    return Math.abs(plane.distanceToPoint(this.center)) <= this.radius;
  },
  clampPoint: function (point, target) {
    var deltaLengthSq = this.center.distanceToSquared(point);

    if (target === undefined) {
      console.warn('THREE.Sphere: .clampPoint() target is now required');
      target = new _Vector3_js__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
    }

    target.copy(point);

    if (deltaLengthSq > this.radius * this.radius) {
      target.sub(this.center).normalize();
      target.multiplyScalar(this.radius).add(this.center);
    }

    return target;
  },
  getBoundingBox: function (target) {
    if (target === undefined) {
      console.warn('THREE.Sphere: .getBoundingBox() target is now required');
      target = new _Box3_js__WEBPACK_IMPORTED_MODULE_0__["Box3"]();
    }

    target.set(this.center, this.center);
    target.expandByScalar(this.radius);
    return target;
  },
  applyMatrix4: function (matrix) {
    this.center.applyMatrix4(matrix);
    this.radius = this.radius * matrix.getMaxScaleOnAxis();
    return this;
  },
  translate: function (offset) {
    this.center.add(offset);
    return this;
  },
  equals: function (sphere) {
    return sphere.center.equals(this.center) && sphere.radius === this.radius;
  }
});


/***/ }),

/***/ "./node_modules/three/src/math/Vector2.js":
/*!************************************************!*\
  !*** ./node_modules/three/src/math/Vector2.js ***!
  \************************************************/
/*! exports provided: Vector2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector2", function() { return Vector2; });
/**
 * @author mrdoob / http://mrdoob.com/
 * @author philogb / http://blog.thejit.org/
 * @author egraether / http://egraether.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 */
function Vector2(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

Object.defineProperties(Vector2.prototype, {
  "width": {
    get: function () {
      return this.x;
    },
    set: function (value) {
      this.x = value;
    }
  },
  "height": {
    get: function () {
      return this.y;
    },
    set: function (value) {
      this.y = value;
    }
  }
});
Object.assign(Vector2.prototype, {
  isVector2: true,
  set: function (x, y) {
    this.x = x;
    this.y = y;
    return this;
  },
  setScalar: function (scalar) {
    this.x = scalar;
    this.y = scalar;
    return this;
  },
  setX: function (x) {
    this.x = x;
    return this;
  },
  setY: function (y) {
    this.y = y;
    return this;
  },
  setComponent: function (index, value) {
    switch (index) {
      case 0:
        this.x = value;
        break;

      case 1:
        this.y = value;
        break;

      default:
        throw new Error('index is out of range: ' + index);
    }

    return this;
  },
  getComponent: function (index) {
    switch (index) {
      case 0:
        return this.x;

      case 1:
        return this.y;

      default:
        throw new Error('index is out of range: ' + index);
    }
  },
  clone: function () {
    return new this.constructor(this.x, this.y);
  },
  copy: function (v) {
    this.x = v.x;
    this.y = v.y;
    return this;
  },
  add: function (v, w) {
    if (w !== undefined) {
      console.warn('THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
      return this.addVectors(v, w);
    }

    this.x += v.x;
    this.y += v.y;
    return this;
  },
  addScalar: function (s) {
    this.x += s;
    this.y += s;
    return this;
  },
  addVectors: function (a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    return this;
  },
  addScaledVector: function (v, s) {
    this.x += v.x * s;
    this.y += v.y * s;
    return this;
  },
  sub: function (v, w) {
    if (w !== undefined) {
      console.warn('THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
      return this.subVectors(v, w);
    }

    this.x -= v.x;
    this.y -= v.y;
    return this;
  },
  subScalar: function (s) {
    this.x -= s;
    this.y -= s;
    return this;
  },
  subVectors: function (a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    return this;
  },
  multiply: function (v) {
    this.x *= v.x;
    this.y *= v.y;
    return this;
  },
  multiplyScalar: function (scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  },
  divide: function (v) {
    this.x /= v.x;
    this.y /= v.y;
    return this;
  },
  divideScalar: function (scalar) {
    return this.multiplyScalar(1 / scalar);
  },
  applyMatrix3: function (m) {
    var x = this.x,
        y = this.y;
    var e = m.elements;
    this.x = e[0] * x + e[3] * y + e[6];
    this.y = e[1] * x + e[4] * y + e[7];
    return this;
  },
  min: function (v) {
    this.x = Math.min(this.x, v.x);
    this.y = Math.min(this.y, v.y);
    return this;
  },
  max: function (v) {
    this.x = Math.max(this.x, v.x);
    this.y = Math.max(this.y, v.y);
    return this;
  },
  clamp: function (min, max) {
    // assumes min < max, componentwise
    this.x = Math.max(min.x, Math.min(max.x, this.x));
    this.y = Math.max(min.y, Math.min(max.y, this.y));
    return this;
  },
  clampScalar: function () {
    var min = new Vector2();
    var max = new Vector2();
    return function clampScalar(minVal, maxVal) {
      min.set(minVal, minVal);
      max.set(maxVal, maxVal);
      return this.clamp(min, max);
    };
  }(),
  clampLength: function (min, max) {
    var length = this.length();
    return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
  },
  floor: function () {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  },
  ceil: function () {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  },
  round: function () {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  },
  roundToZero: function () {
    this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
    this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
    return this;
  },
  negate: function () {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  },
  dot: function (v) {
    return this.x * v.x + this.y * v.y;
  },
  lengthSq: function () {
    return this.x * this.x + this.y * this.y;
  },
  length: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
  manhattanLength: function () {
    return Math.abs(this.x) + Math.abs(this.y);
  },
  normalize: function () {
    return this.divideScalar(this.length() || 1);
  },
  angle: function () {
    // computes the angle in radians with respect to the positive x-axis
    var angle = Math.atan2(this.y, this.x);
    if (angle < 0) angle += 2 * Math.PI;
    return angle;
  },
  distanceTo: function (v) {
    return Math.sqrt(this.distanceToSquared(v));
  },
  distanceToSquared: function (v) {
    var dx = this.x - v.x,
        dy = this.y - v.y;
    return dx * dx + dy * dy;
  },
  manhattanDistanceTo: function (v) {
    return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
  },
  setLength: function (length) {
    return this.normalize().multiplyScalar(length);
  },
  lerp: function (v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    return this;
  },
  lerpVectors: function (v1, v2, alpha) {
    return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
  },
  equals: function (v) {
    return v.x === this.x && v.y === this.y;
  },
  fromArray: function (array, offset) {
    if (offset === undefined) offset = 0;
    this.x = array[offset];
    this.y = array[offset + 1];
    return this;
  },
  toArray: function (array, offset) {
    if (array === undefined) array = [];
    if (offset === undefined) offset = 0;
    array[offset] = this.x;
    array[offset + 1] = this.y;
    return array;
  },
  fromBufferAttribute: function (attribute, index, offset) {
    if (offset !== undefined) {
      console.warn('THREE.Vector2: offset has been removed from .fromBufferAttribute().');
    }

    this.x = attribute.getX(index);
    this.y = attribute.getY(index);
    return this;
  },
  rotateAround: function (center, angle) {
    var c = Math.cos(angle),
        s = Math.sin(angle);
    var x = this.x - center.x;
    var y = this.y - center.y;
    this.x = x * c - y * s + center.x;
    this.y = x * s + y * c + center.y;
    return this;
  }
});


/***/ }),

/***/ "./node_modules/three/src/math/Vector3.js":
/*!************************************************!*\
  !*** ./node_modules/three/src/math/Vector3.js ***!
  \************************************************/
/*! exports provided: Vector3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector3", function() { return Vector3; });
/* harmony import */ var _Math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Math.js */ "./node_modules/three/src/math/Math.js");
/* harmony import */ var _Matrix4_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Matrix4.js */ "./node_modules/three/src/math/Matrix4.js");
/* harmony import */ var _Quaternion_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Quaternion.js */ "./node_modules/three/src/math/Quaternion.js");



/**
 * @author mrdoob / http://mrdoob.com/
 * @author kile / http://kile.stravaganza.org/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */

function Vector3(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}

Object.assign(Vector3.prototype, {
  isVector3: true,
  set: function (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  },
  setScalar: function (scalar) {
    this.x = scalar;
    this.y = scalar;
    this.z = scalar;
    return this;
  },
  setX: function (x) {
    this.x = x;
    return this;
  },
  setY: function (y) {
    this.y = y;
    return this;
  },
  setZ: function (z) {
    this.z = z;
    return this;
  },
  setComponent: function (index, value) {
    switch (index) {
      case 0:
        this.x = value;
        break;

      case 1:
        this.y = value;
        break;

      case 2:
        this.z = value;
        break;

      default:
        throw new Error('index is out of range: ' + index);
    }

    return this;
  },
  getComponent: function (index) {
    switch (index) {
      case 0:
        return this.x;

      case 1:
        return this.y;

      case 2:
        return this.z;

      default:
        throw new Error('index is out of range: ' + index);
    }
  },
  clone: function () {
    return new this.constructor(this.x, this.y, this.z);
  },
  copy: function (v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  },
  add: function (v, w) {
    if (w !== undefined) {
      console.warn('THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
      return this.addVectors(v, w);
    }

    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  },
  addScalar: function (s) {
    this.x += s;
    this.y += s;
    this.z += s;
    return this;
  },
  addVectors: function (a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    return this;
  },
  addScaledVector: function (v, s) {
    this.x += v.x * s;
    this.y += v.y * s;
    this.z += v.z * s;
    return this;
  },
  sub: function (v, w) {
    if (w !== undefined) {
      console.warn('THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
      return this.subVectors(v, w);
    }

    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  },
  subScalar: function (s) {
    this.x -= s;
    this.y -= s;
    this.z -= s;
    return this;
  },
  subVectors: function (a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    return this;
  },
  multiply: function (v, w) {
    if (w !== undefined) {
      console.warn('THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.');
      return this.multiplyVectors(v, w);
    }

    this.x *= v.x;
    this.y *= v.y;
    this.z *= v.z;
    return this;
  },
  multiplyScalar: function (scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  },
  multiplyVectors: function (a, b) {
    this.x = a.x * b.x;
    this.y = a.y * b.y;
    this.z = a.z * b.z;
    return this;
  },
  applyEuler: function () {
    var quaternion = new _Quaternion_js__WEBPACK_IMPORTED_MODULE_2__["Quaternion"]();
    return function applyEuler(euler) {
      if (!(euler && euler.isEuler)) {
        console.error('THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.');
      }

      return this.applyQuaternion(quaternion.setFromEuler(euler));
    };
  }(),
  applyAxisAngle: function () {
    var quaternion = new _Quaternion_js__WEBPACK_IMPORTED_MODULE_2__["Quaternion"]();
    return function applyAxisAngle(axis, angle) {
      return this.applyQuaternion(quaternion.setFromAxisAngle(axis, angle));
    };
  }(),
  applyMatrix3: function (m) {
    var x = this.x,
        y = this.y,
        z = this.z;
    var e = m.elements;
    this.x = e[0] * x + e[3] * y + e[6] * z;
    this.y = e[1] * x + e[4] * y + e[7] * z;
    this.z = e[2] * x + e[5] * y + e[8] * z;
    return this;
  },
  applyMatrix4: function (m) {
    var x = this.x,
        y = this.y,
        z = this.z;
    var e = m.elements;
    var w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
    this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
    this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
    this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
    return this;
  },
  applyQuaternion: function (q) {
    var x = this.x,
        y = this.y,
        z = this.z;
    var qx = q.x,
        qy = q.y,
        qz = q.z,
        qw = q.w; // calculate quat * vector

    var ix = qw * x + qy * z - qz * y;
    var iy = qw * y + qz * x - qx * z;
    var iz = qw * z + qx * y - qy * x;
    var iw = -qx * x - qy * y - qz * z; // calculate result * inverse quat

    this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return this;
  },
  project: function () {
    var matrix = new _Matrix4_js__WEBPACK_IMPORTED_MODULE_1__["Matrix4"]();
    return function project(camera) {
      matrix.multiplyMatrices(camera.projectionMatrix, matrix.getInverse(camera.matrixWorld));
      return this.applyMatrix4(matrix);
    };
  }(),
  unproject: function () {
    var matrix = new _Matrix4_js__WEBPACK_IMPORTED_MODULE_1__["Matrix4"]();
    return function unproject(camera) {
      matrix.multiplyMatrices(camera.matrixWorld, matrix.getInverse(camera.projectionMatrix));
      return this.applyMatrix4(matrix);
    };
  }(),
  transformDirection: function (m) {
    // input: THREE.Matrix4 affine matrix
    // vector interpreted as a direction
    var x = this.x,
        y = this.y,
        z = this.z;
    var e = m.elements;
    this.x = e[0] * x + e[4] * y + e[8] * z;
    this.y = e[1] * x + e[5] * y + e[9] * z;
    this.z = e[2] * x + e[6] * y + e[10] * z;
    return this.normalize();
  },
  divide: function (v) {
    this.x /= v.x;
    this.y /= v.y;
    this.z /= v.z;
    return this;
  },
  divideScalar: function (scalar) {
    return this.multiplyScalar(1 / scalar);
  },
  min: function (v) {
    this.x = Math.min(this.x, v.x);
    this.y = Math.min(this.y, v.y);
    this.z = Math.min(this.z, v.z);
    return this;
  },
  max: function (v) {
    this.x = Math.max(this.x, v.x);
    this.y = Math.max(this.y, v.y);
    this.z = Math.max(this.z, v.z);
    return this;
  },
  clamp: function (min, max) {
    // assumes min < max, componentwise
    this.x = Math.max(min.x, Math.min(max.x, this.x));
    this.y = Math.max(min.y, Math.min(max.y, this.y));
    this.z = Math.max(min.z, Math.min(max.z, this.z));
    return this;
  },
  clampScalar: function () {
    var min = new Vector3();
    var max = new Vector3();
    return function clampScalar(minVal, maxVal) {
      min.set(minVal, minVal, minVal);
      max.set(maxVal, maxVal, maxVal);
      return this.clamp(min, max);
    };
  }(),
  clampLength: function (min, max) {
    var length = this.length();
    return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
  },
  floor: function () {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    return this;
  },
  ceil: function () {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    return this;
  },
  round: function () {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);
    return this;
  },
  roundToZero: function () {
    this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
    this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
    this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z);
    return this;
  },
  negate: function () {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  },
  dot: function (v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  },
  // TODO lengthSquared?
  lengthSq: function () {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  },
  length: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  },
  manhattanLength: function () {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  },
  normalize: function () {
    return this.divideScalar(this.length() || 1);
  },
  setLength: function (length) {
    return this.normalize().multiplyScalar(length);
  },
  lerp: function (v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    this.z += (v.z - this.z) * alpha;
    return this;
  },
  lerpVectors: function (v1, v2, alpha) {
    return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
  },
  cross: function (v, w) {
    if (w !== undefined) {
      console.warn('THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.');
      return this.crossVectors(v, w);
    }

    return this.crossVectors(this, v);
  },
  crossVectors: function (a, b) {
    var ax = a.x,
        ay = a.y,
        az = a.z;
    var bx = b.x,
        by = b.y,
        bz = b.z;
    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;
    return this;
  },
  projectOnVector: function (vector) {
    var scalar = vector.dot(this) / vector.lengthSq();
    return this.copy(vector).multiplyScalar(scalar);
  },
  projectOnPlane: function () {
    var v1 = new Vector3();
    return function projectOnPlane(planeNormal) {
      v1.copy(this).projectOnVector(planeNormal);
      return this.sub(v1);
    };
  }(),
  reflect: function () {
    // reflect incident vector off plane orthogonal to normal
    // normal is assumed to have unit length
    var v1 = new Vector3();
    return function reflect(normal) {
      return this.sub(v1.copy(normal).multiplyScalar(2 * this.dot(normal)));
    };
  }(),
  angleTo: function (v) {
    var theta = this.dot(v) / Math.sqrt(this.lengthSq() * v.lengthSq()); // clamp, to handle numerical problems

    return Math.acos(_Math_js__WEBPACK_IMPORTED_MODULE_0__["_Math"].clamp(theta, -1, 1));
  },
  distanceTo: function (v) {
    return Math.sqrt(this.distanceToSquared(v));
  },
  distanceToSquared: function (v) {
    var dx = this.x - v.x,
        dy = this.y - v.y,
        dz = this.z - v.z;
    return dx * dx + dy * dy + dz * dz;
  },
  manhattanDistanceTo: function (v) {
    return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
  },
  setFromSpherical: function (s) {
    var sinPhiRadius = Math.sin(s.phi) * s.radius;
    this.x = sinPhiRadius * Math.sin(s.theta);
    this.y = Math.cos(s.phi) * s.radius;
    this.z = sinPhiRadius * Math.cos(s.theta);
    return this;
  },
  setFromCylindrical: function (c) {
    this.x = c.radius * Math.sin(c.theta);
    this.y = c.y;
    this.z = c.radius * Math.cos(c.theta);
    return this;
  },
  setFromMatrixPosition: function (m) {
    var e = m.elements;
    this.x = e[12];
    this.y = e[13];
    this.z = e[14];
    return this;
  },
  setFromMatrixScale: function (m) {
    var sx = this.setFromMatrixColumn(m, 0).length();
    var sy = this.setFromMatrixColumn(m, 1).length();
    var sz = this.setFromMatrixColumn(m, 2).length();
    this.x = sx;
    this.y = sy;
    this.z = sz;
    return this;
  },
  setFromMatrixColumn: function (m, index) {
    return this.fromArray(m.elements, index * 4);
  },
  equals: function (v) {
    return v.x === this.x && v.y === this.y && v.z === this.z;
  },
  fromArray: function (array, offset) {
    if (offset === undefined) offset = 0;
    this.x = array[offset];
    this.y = array[offset + 1];
    this.z = array[offset + 2];
    return this;
  },
  toArray: function (array, offset) {
    if (array === undefined) array = [];
    if (offset === undefined) offset = 0;
    array[offset] = this.x;
    array[offset + 1] = this.y;
    array[offset + 2] = this.z;
    return array;
  },
  fromBufferAttribute: function (attribute, index, offset) {
    if (offset !== undefined) {
      console.warn('THREE.Vector3: offset has been removed from .fromBufferAttribute().');
    }

    this.x = attribute.getX(index);
    this.y = attribute.getY(index);
    this.z = attribute.getZ(index);
    return this;
  }
});


/***/ }),

/***/ "./node_modules/three/src/math/Vector4.js":
/*!************************************************!*\
  !*** ./node_modules/three/src/math/Vector4.js ***!
  \************************************************/
/*! exports provided: Vector4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector4", function() { return Vector4; });
/**
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */
function Vector4(x, y, z, w) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
  this.w = w !== undefined ? w : 1;
}

Object.assign(Vector4.prototype, {
  isVector4: true,
  set: function (x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    return this;
  },
  setScalar: function (scalar) {
    this.x = scalar;
    this.y = scalar;
    this.z = scalar;
    this.w = scalar;
    return this;
  },
  setX: function (x) {
    this.x = x;
    return this;
  },
  setY: function (y) {
    this.y = y;
    return this;
  },
  setZ: function (z) {
    this.z = z;
    return this;
  },
  setW: function (w) {
    this.w = w;
    return this;
  },
  setComponent: function (index, value) {
    switch (index) {
      case 0:
        this.x = value;
        break;

      case 1:
        this.y = value;
        break;

      case 2:
        this.z = value;
        break;

      case 3:
        this.w = value;
        break;

      default:
        throw new Error('index is out of range: ' + index);
    }

    return this;
  },
  getComponent: function (index) {
    switch (index) {
      case 0:
        return this.x;

      case 1:
        return this.y;

      case 2:
        return this.z;

      case 3:
        return this.w;

      default:
        throw new Error('index is out of range: ' + index);
    }
  },
  clone: function () {
    return new this.constructor(this.x, this.y, this.z, this.w);
  },
  copy: function (v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    this.w = v.w !== undefined ? v.w : 1;
    return this;
  },
  add: function (v, w) {
    if (w !== undefined) {
      console.warn('THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
      return this.addVectors(v, w);
    }

    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    this.w += v.w;
    return this;
  },
  addScalar: function (s) {
    this.x += s;
    this.y += s;
    this.z += s;
    this.w += s;
    return this;
  },
  addVectors: function (a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;
    this.z = a.z + b.z;
    this.w = a.w + b.w;
    return this;
  },
  addScaledVector: function (v, s) {
    this.x += v.x * s;
    this.y += v.y * s;
    this.z += v.z * s;
    this.w += v.w * s;
    return this;
  },
  sub: function (v, w) {
    if (w !== undefined) {
      console.warn('THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
      return this.subVectors(v, w);
    }

    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    this.w -= v.w;
    return this;
  },
  subScalar: function (s) {
    this.x -= s;
    this.y -= s;
    this.z -= s;
    this.w -= s;
    return this;
  },
  subVectors: function (a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;
    this.z = a.z - b.z;
    this.w = a.w - b.w;
    return this;
  },
  multiplyScalar: function (scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    this.w *= scalar;
    return this;
  },
  applyMatrix4: function (m) {
    var x = this.x,
        y = this.y,
        z = this.z,
        w = this.w;
    var e = m.elements;
    this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
    this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
    this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
    this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;
    return this;
  },
  divideScalar: function (scalar) {
    return this.multiplyScalar(1 / scalar);
  },
  setAxisAngleFromQuaternion: function (q) {
    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm
    // q is assumed to be normalized
    this.w = 2 * Math.acos(q.w);
    var s = Math.sqrt(1 - q.w * q.w);

    if (s < 0.0001) {
      this.x = 1;
      this.y = 0;
      this.z = 0;
    } else {
      this.x = q.x / s;
      this.y = q.y / s;
      this.z = q.z / s;
    }

    return this;
  },
  setAxisAngleFromRotationMatrix: function (m) {
    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm
    // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
    var angle,
        x,
        y,
        z,
        // variables for result
    epsilon = 0.01,
        // margin to allow for rounding errors
    epsilon2 = 0.1,
        // margin to distinguish between 0 and 180 degrees
    te = m.elements,
        m11 = te[0],
        m12 = te[4],
        m13 = te[8],
        m21 = te[1],
        m22 = te[5],
        m23 = te[9],
        m31 = te[2],
        m32 = te[6],
        m33 = te[10];

    if (Math.abs(m12 - m21) < epsilon && Math.abs(m13 - m31) < epsilon && Math.abs(m23 - m32) < epsilon) {
      // singularity found
      // first check for identity matrix which must have +1 for all terms
      // in leading diagonal and zero in other terms
      if (Math.abs(m12 + m21) < epsilon2 && Math.abs(m13 + m31) < epsilon2 && Math.abs(m23 + m32) < epsilon2 && Math.abs(m11 + m22 + m33 - 3) < epsilon2) {
        // this singularity is identity matrix so angle = 0
        this.set(1, 0, 0, 0);
        return this; // zero angle, arbitrary axis
      } // otherwise this singularity is angle = 180


      angle = Math.PI;
      var xx = (m11 + 1) / 2;
      var yy = (m22 + 1) / 2;
      var zz = (m33 + 1) / 2;
      var xy = (m12 + m21) / 4;
      var xz = (m13 + m31) / 4;
      var yz = (m23 + m32) / 4;

      if (xx > yy && xx > zz) {
        // m11 is the largest diagonal term
        if (xx < epsilon) {
          x = 0;
          y = 0.707106781;
          z = 0.707106781;
        } else {
          x = Math.sqrt(xx);
          y = xy / x;
          z = xz / x;
        }
      } else if (yy > zz) {
        // m22 is the largest diagonal term
        if (yy < epsilon) {
          x = 0.707106781;
          y = 0;
          z = 0.707106781;
        } else {
          y = Math.sqrt(yy);
          x = xy / y;
          z = yz / y;
        }
      } else {
        // m33 is the largest diagonal term so base result on this
        if (zz < epsilon) {
          x = 0.707106781;
          y = 0.707106781;
          z = 0;
        } else {
          z = Math.sqrt(zz);
          x = xz / z;
          y = yz / z;
        }
      }

      this.set(x, y, z, angle);
      return this; // return 180 deg rotation
    } // as we have reached here there are no singularities so we can handle normally


    var s = Math.sqrt((m32 - m23) * (m32 - m23) + (m13 - m31) * (m13 - m31) + (m21 - m12) * (m21 - m12)); // used to normalize

    if (Math.abs(s) < 0.001) s = 1; // prevent divide by zero, should not happen if matrix is orthogonal and should be
    // caught by singularity test above, but I've left it in just in case

    this.x = (m32 - m23) / s;
    this.y = (m13 - m31) / s;
    this.z = (m21 - m12) / s;
    this.w = Math.acos((m11 + m22 + m33 - 1) / 2);
    return this;
  },
  min: function (v) {
    this.x = Math.min(this.x, v.x);
    this.y = Math.min(this.y, v.y);
    this.z = Math.min(this.z, v.z);
    this.w = Math.min(this.w, v.w);
    return this;
  },
  max: function (v) {
    this.x = Math.max(this.x, v.x);
    this.y = Math.max(this.y, v.y);
    this.z = Math.max(this.z, v.z);
    this.w = Math.max(this.w, v.w);
    return this;
  },
  clamp: function (min, max) {
    // assumes min < max, componentwise
    this.x = Math.max(min.x, Math.min(max.x, this.x));
    this.y = Math.max(min.y, Math.min(max.y, this.y));
    this.z = Math.max(min.z, Math.min(max.z, this.z));
    this.w = Math.max(min.w, Math.min(max.w, this.w));
    return this;
  },
  clampScalar: function () {
    var min, max;
    return function clampScalar(minVal, maxVal) {
      if (min === undefined) {
        min = new Vector4();
        max = new Vector4();
      }

      min.set(minVal, minVal, minVal, minVal);
      max.set(maxVal, maxVal, maxVal, maxVal);
      return this.clamp(min, max);
    };
  }(),
  clampLength: function (min, max) {
    var length = this.length();
    return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
  },
  floor: function () {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    this.w = Math.floor(this.w);
    return this;
  },
  ceil: function () {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    this.w = Math.ceil(this.w);
    return this;
  },
  round: function () {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);
    this.w = Math.round(this.w);
    return this;
  },
  roundToZero: function () {
    this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
    this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
    this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z);
    this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w);
    return this;
  },
  negate: function () {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    this.w = -this.w;
    return this;
  },
  dot: function (v) {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
  },
  lengthSq: function () {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  },
  length: function () {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  },
  manhattanLength: function () {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  },
  normalize: function () {
    return this.divideScalar(this.length() || 1);
  },
  setLength: function (length) {
    return this.normalize().multiplyScalar(length);
  },
  lerp: function (v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    this.z += (v.z - this.z) * alpha;
    this.w += (v.w - this.w) * alpha;
    return this;
  },
  lerpVectors: function (v1, v2, alpha) {
    return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
  },
  equals: function (v) {
    return v.x === this.x && v.y === this.y && v.z === this.z && v.w === this.w;
  },
  fromArray: function (array, offset) {
    if (offset === undefined) offset = 0;
    this.x = array[offset];
    this.y = array[offset + 1];
    this.z = array[offset + 2];
    this.w = array[offset + 3];
    return this;
  },
  toArray: function (array, offset) {
    if (array === undefined) array = [];
    if (offset === undefined) offset = 0;
    array[offset] = this.x;
    array[offset + 1] = this.y;
    array[offset + 2] = this.z;
    array[offset + 3] = this.w;
    return array;
  },
  fromBufferAttribute: function (attribute, index, offset) {
    if (offset !== undefined) {
      console.warn('THREE.Vector4: offset has been removed from .fromBufferAttribute().');
    }

    this.x = attribute.getX(index);
    this.y = attribute.getY(index);
    this.z = attribute.getZ(index);
    this.w = attribute.getW(index);
    return this;
  }
});


/***/ }),

/***/ "./node_modules/three/src/objects/Line.js":
/*!************************************************!*\
  !*** ./node_modules/three/src/objects/Line.js ***!
  \************************************************/
/*! exports provided: Line */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Line", function() { return Line; });
/* harmony import */ var _math_Sphere_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math/Sphere.js */ "./node_modules/three/src/math/Sphere.js");
/* harmony import */ var _math_Ray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Ray.js */ "./node_modules/three/src/math/Ray.js");
/* harmony import */ var _math_Matrix4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Matrix4.js */ "./node_modules/three/src/math/Matrix4.js");
/* harmony import */ var _core_Object3D_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/Object3D.js */ "./node_modules/three/src/core/Object3D.js");
/* harmony import */ var _math_Vector3_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../math/Vector3.js */ "./node_modules/three/src/math/Vector3.js");
/* harmony import */ var _materials_LineBasicMaterial_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../materials/LineBasicMaterial.js */ "./node_modules/three/src/materials/LineBasicMaterial.js");
/* harmony import */ var _core_BufferGeometry_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/BufferGeometry.js */ "./node_modules/three/src/core/BufferGeometry.js");
/* harmony import */ var _LineSegments_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./LineSegments.js */ "./node_modules/three/src/objects/LineSegments.js");
/* harmony import */ var _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/BufferAttribute */ "./node_modules/three/src/core/BufferAttribute.js");









/**
 * @author mrdoob / http://mrdoob.com/
 */

function Line(geometry, material, mode) {
  if (mode === 1) {
    console.warn('THREE.Line: parameter THREE.LinePieces no longer supported. Created THREE.LineSegments instead.');
    return new _LineSegments_js__WEBPACK_IMPORTED_MODULE_7__["LineSegments"](geometry, material);
  }

  _core_Object3D_js__WEBPACK_IMPORTED_MODULE_3__["Object3D"].call(this);
  this.type = 'Line';
  this.geometry = geometry !== undefined ? geometry : new _core_BufferGeometry_js__WEBPACK_IMPORTED_MODULE_6__["BufferGeometry"]();
  this.material = material !== undefined ? material : new _materials_LineBasicMaterial_js__WEBPACK_IMPORTED_MODULE_5__["LineBasicMaterial"]({
    color: Math.random() * 0xffffff
  });
}

Line.prototype = Object.assign(Object.create(_core_Object3D_js__WEBPACK_IMPORTED_MODULE_3__["Object3D"].prototype), {
  constructor: Line,
  isLine: true,
  computeLineDistances: function () {
    var start = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_4__["Vector3"]();
    var end = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_4__["Vector3"]();
    return function computeLineDistances() {
      var geometry = this.geometry;

      if (geometry.isBufferGeometry) {
        // we assume non-indexed geometry
        if (geometry.index === null) {
          var positionAttribute = geometry.attributes.position;
          var lineDistances = [0];

          for (var i = 1, l = positionAttribute.count; i < l; i++) {
            start.fromBufferAttribute(positionAttribute, i - 1);
            end.fromBufferAttribute(positionAttribute, i);
            lineDistances[i] = lineDistances[i - 1];
            lineDistances[i] += start.distanceTo(end);
          }

          geometry.addAttribute('lineDistance', new _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_8__["Float32BufferAttribute"](lineDistances, 1));
        } else {
          console.warn('THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.');
        }
      } else if (geometry.isGeometry) {
        var vertices = geometry.vertices;
        var lineDistances = geometry.lineDistances;
        lineDistances[0] = 0;

        for (var i = 1, l = vertices.length; i < l; i++) {
          lineDistances[i] = lineDistances[i - 1];
          lineDistances[i] += vertices[i - 1].distanceTo(vertices[i]);
        }
      }

      return this;
    };
  }(),
  raycast: function () {
    var inverseMatrix = new _math_Matrix4_js__WEBPACK_IMPORTED_MODULE_2__["Matrix4"]();
    var ray = new _math_Ray_js__WEBPACK_IMPORTED_MODULE_1__["Ray"]();
    var sphere = new _math_Sphere_js__WEBPACK_IMPORTED_MODULE_0__["Sphere"]();
    return function raycast(raycaster, intersects) {
      var precision = raycaster.linePrecision;
      var precisionSq = precision * precision;
      var geometry = this.geometry;
      var matrixWorld = this.matrixWorld; // Checking boundingSphere distance to ray

      if (geometry.boundingSphere === null) geometry.computeBoundingSphere();
      sphere.copy(geometry.boundingSphere);
      sphere.applyMatrix4(matrixWorld);
      if (raycaster.ray.intersectsSphere(sphere) === false) return; //

      inverseMatrix.getInverse(matrixWorld);
      ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);
      var vStart = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_4__["Vector3"]();
      var vEnd = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_4__["Vector3"]();
      var interSegment = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_4__["Vector3"]();
      var interRay = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_4__["Vector3"]();
      var step = this && this.isLineSegments ? 2 : 1;

      if (geometry.isBufferGeometry) {
        var index = geometry.index;
        var attributes = geometry.attributes;
        var positions = attributes.position.array;

        if (index !== null) {
          var indices = index.array;

          for (var i = 0, l = indices.length - 1; i < l; i += step) {
            var a = indices[i];
            var b = indices[i + 1];
            vStart.fromArray(positions, a * 3);
            vEnd.fromArray(positions, b * 3);
            var distSq = ray.distanceSqToSegment(vStart, vEnd, interRay, interSegment);
            if (distSq > precisionSq) continue;
            interRay.applyMatrix4(this.matrixWorld); //Move back to world space for distance calculation

            var distance = raycaster.ray.origin.distanceTo(interRay);
            if (distance < raycaster.near || distance > raycaster.far) continue;
            intersects.push({
              distance: distance,
              // What do we want? intersection point on the ray or on the segment??
              // point: raycaster.ray.at( distance ),
              point: interSegment.clone().applyMatrix4(this.matrixWorld),
              index: i,
              face: null,
              faceIndex: null,
              object: this
            });
          }
        } else {
          for (var i = 0, l = positions.length / 3 - 1; i < l; i += step) {
            vStart.fromArray(positions, 3 * i);
            vEnd.fromArray(positions, 3 * i + 3);
            var distSq = ray.distanceSqToSegment(vStart, vEnd, interRay, interSegment);
            if (distSq > precisionSq) continue;
            interRay.applyMatrix4(this.matrixWorld); //Move back to world space for distance calculation

            var distance = raycaster.ray.origin.distanceTo(interRay);
            if (distance < raycaster.near || distance > raycaster.far) continue;
            intersects.push({
              distance: distance,
              // What do we want? intersection point on the ray or on the segment??
              // point: raycaster.ray.at( distance ),
              point: interSegment.clone().applyMatrix4(this.matrixWorld),
              index: i,
              face: null,
              faceIndex: null,
              object: this
            });
          }
        }
      } else if (geometry.isGeometry) {
        var vertices = geometry.vertices;
        var nbVertices = vertices.length;

        for (var i = 0; i < nbVertices - 1; i += step) {
          var distSq = ray.distanceSqToSegment(vertices[i], vertices[i + 1], interRay, interSegment);
          if (distSq > precisionSq) continue;
          interRay.applyMatrix4(this.matrixWorld); //Move back to world space for distance calculation

          var distance = raycaster.ray.origin.distanceTo(interRay);
          if (distance < raycaster.near || distance > raycaster.far) continue;
          intersects.push({
            distance: distance,
            // What do we want? intersection point on the ray or on the segment??
            // point: raycaster.ray.at( distance ),
            point: interSegment.clone().applyMatrix4(this.matrixWorld),
            index: i,
            face: null,
            faceIndex: null,
            object: this
          });
        }
      }
    };
  }(),
  clone: function () {
    return new this.constructor(this.geometry, this.material).copy(this);
  }
});


/***/ }),

/***/ "./node_modules/three/src/objects/LineSegments.js":
/*!********************************************************!*\
  !*** ./node_modules/three/src/objects/LineSegments.js ***!
  \********************************************************/
/*! exports provided: LineSegments */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineSegments", function() { return LineSegments; });
/* harmony import */ var _Line_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Line.js */ "./node_modules/three/src/objects/Line.js");
/* harmony import */ var _math_Vector3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math/Vector3.js */ "./node_modules/three/src/math/Vector3.js");
/* harmony import */ var _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/BufferAttribute */ "./node_modules/three/src/core/BufferAttribute.js");



/**
 * @author mrdoob / http://mrdoob.com/
 */

function LineSegments(geometry, material) {
  _Line_js__WEBPACK_IMPORTED_MODULE_0__["Line"].call(this, geometry, material);
  this.type = 'LineSegments';
}

LineSegments.prototype = Object.assign(Object.create(_Line_js__WEBPACK_IMPORTED_MODULE_0__["Line"].prototype), {
  constructor: LineSegments,
  isLineSegments: true,
  computeLineDistances: function () {
    var start = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
    var end = new _math_Vector3_js__WEBPACK_IMPORTED_MODULE_1__["Vector3"]();
    return function computeLineDistances() {
      var geometry = this.geometry;

      if (geometry.isBufferGeometry) {
        // we assume non-indexed geometry
        if (geometry.index === null) {
          var positionAttribute = geometry.attributes.position;
          var lineDistances = [];

          for (var i = 0, l = positionAttribute.count; i < l; i += 2) {
            start.fromBufferAttribute(positionAttribute, i);
            end.fromBufferAttribute(positionAttribute, i + 1);
            lineDistances[i] = i === 0 ? 0 : lineDistances[i - 1];
            lineDistances[i + 1] = lineDistances[i] + start.distanceTo(end);
          }

          geometry.addAttribute('lineDistance', new _core_BufferAttribute__WEBPACK_IMPORTED_MODULE_2__["Float32BufferAttribute"](lineDistances, 1));
        } else {
          console.warn('THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.');
        }
      } else if (geometry.isGeometry) {
        var vertices = geometry.vertices;
        var lineDistances = geometry.lineDistances;

        for (var i = 0, l = vertices.length; i < l; i += 2) {
          start.copy(vertices[i]);
          end.copy(vertices[i + 1]);
          lineDistances[i] = i === 0 ? 0 : lineDistances[i - 1];
          lineDistances[i + 1] = lineDistances[i] + start.distanceTo(end);
        }
      }

      return this;
    };
  }()
});


/***/ }),

/***/ "./node_modules/three/src/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/three/src/utils.js ***!
  \*****************************************/
/*! exports provided: arrayMin, arrayMax */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayMin", function() { return arrayMin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayMax", function() { return arrayMax; });
/**
 * @author mrdoob / http://mrdoob.com/
 */
function arrayMin(array) {
  if (array.length === 0) return Infinity;
  var min = array[0];

  for (var i = 1, l = array.length; i < l; ++i) {
    if (array[i] < min) min = array[i];
  }

  return min;
}

function arrayMax(array) {
  if (array.length === 0) return -Infinity;
  var max = array[0];

  for (var i = 1, l = array.length; i < l; ++i) {
    if (array[i] > max) max = array[i];
  }

  return max;
}



/***/ }),

/***/ "./src/File3D.js":
/*!***********************!*\
  !*** ./src/File3D.js ***!
  \***********************/
/*! exports provided: File3D */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Three) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "File3D", function() { return File3D; });
/* harmony import */ var three_examples_js_loaders_OBJLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/js/loaders/OBJLoader */ "./node_modules/three/examples/js/loaders/OBJLoader.js");
/* harmony import */ var three_examples_js_loaders_OBJLoader__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three_examples_js_loaders_OBJLoader__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three_examples_js_loaders_MTLLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/js/loaders/MTLLoader */ "./node_modules/three/examples/js/loaders/MTLLoader.js");
/* harmony import */ var three_examples_js_loaders_MTLLoader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(three_examples_js_loaders_MTLLoader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Object3D__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Object3D */ "./src/Object3D.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class File3D extends _Object3D__WEBPACK_IMPORTED_MODULE_2__["Object3D"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "objLoader", new Three.OBJLoader());

    _defineProperty(this, "matLoader", new Three.MTLLoader());

    _defineProperty(this, "enhance", object => {
      object.castShadow = true;
      object.receiveShadow = true;
      object.children.forEach(this.enhance);
      return object;
    });
  }

  componentDidMount() {
    this.matLoader.setPath('/ss-virtual-showroom/assets/').load(this.props.mtl, material => {
      material.preload();
      this.objLoader.setMaterials(material).setPath(' http://localhost:63342/ss-virtual-showroom/assets/').load(this.props.obj, object => {
        this.object = this.enhance(object);
        if (this.parent) this.parent.add(this.object);
      });
    });
  }

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! three */ "three")))

/***/ }),

/***/ "./src/Floor3D.js":
/*!************************!*\
  !*** ./src/Floor3D.js ***!
  \************************/
/*! exports provided: Floor3D */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Three) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Floor3D", function() { return Floor3D; });
/* harmony import */ var three_src_helpers_GridHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/src/helpers/GridHelper */ "./node_modules/three/src/helpers/GridHelper.js");
/* harmony import */ var _Object3D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Object3D */ "./src/Object3D.js");


class Floor3D extends _Object3D__WEBPACK_IMPORTED_MODULE_1__["Object3D"] {
  constructor(props) {
    super(props);
    const material = new Three.MeshPhysicalMaterial();
    const geometry = new Three.PlaneBufferGeometry(10, 10);
    const plane = new Three.Mesh(geometry, material);
    plane.rotation.x = Math.PI / -2;
    plane.receiveShadow = true;
    plane.castShadow = true;
    const grid = new Three.GridHelper(10, 10);
    this.object = new Three.Group();
    this.object.add(plane);
    this.object.add(grid);
    new Three.TextureLoader().setPath('/ss-virtual-showroom/assets/').load('UV_Grid_Sm.jpg', texture => {
      texture.mapping = Three.UVMapping;
      texture.wrapS = Three.RepeatWrapping;
      texture.wrapT = Three.RepeatWrapping;
      texture.repeat.set(1, 1);
      material.map = texture;
      material.needsUpdate = true;
    });
  }

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! three */ "three")))

/***/ }),

/***/ "./src/Object3D.js":
/*!*************************!*\
  !*** ./src/Object3D.js ***!
  \*************************/
/*! exports provided: ParentContext, Object3D */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(React, PropTypes) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParentContext", function() { return ParentContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Object3D", function() { return Object3D; });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ParentContext = React.createContext(null);
class Object3D extends React.Component {
  componentDidMount() {
    if (this.object && this.parent) {
      this.parent.add(this.object);
    }

    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  componentWillUnmount() {
    if (this.object && this.parent) {
      this.parent.remove(this.object);
    }
  }

  update() {}

  render() {
    return React.createElement(ParentContext.Consumer, null, parent => {
      this.parent = parent;
      return React.createElement(ParentContext.Provider, {
        value: this
      }, this.props.children);
    });
  }

}

_defineProperty(Object3D, "propTypes", {
  children: PropTypes.node
});

_defineProperty(Object3D, "defaultProps", {
  children: null
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! react */ "react"), __webpack_require__(/*! prop-types */ "prop-types")))

/***/ }),

/***/ "./src/Scene3D.js":
/*!************************!*\
  !*** ./src/Scene3D.js ***!
  \************************/
/*! exports provided: Scene3D */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Three, React, PropTypes) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scene3D", function() { return Scene3D; });
/* harmony import */ var three_examples_js_controls_FlyControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/js/controls/FlyControls */ "./node_modules/three/examples/js/controls/FlyControls.js");
/* harmony import */ var three_examples_js_controls_FlyControls__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three_examples_js_controls_FlyControls__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three_examples_js_controls_MapControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/js/controls/MapControls */ "./node_modules/three/examples/js/controls/MapControls.js");
/* harmony import */ var three_examples_js_controls_MapControls__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(three_examples_js_controls_MapControls__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var three_examples_js_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/js/controls/OrbitControls */ "./node_modules/three/examples/js/controls/OrbitControls.js");
/* harmony import */ var three_examples_js_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(three_examples_js_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var three_examples_js_controls_PointerLockControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/js/controls/PointerLockControls */ "./node_modules/three/examples/js/controls/PointerLockControls.js");
/* harmony import */ var three_examples_js_controls_PointerLockControls__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(three_examples_js_controls_PointerLockControls__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Object3D__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Object3D */ "./src/Object3D.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






class Scene3D extends _Object3D__WEBPACK_IMPORTED_MODULE_4__["Object3D"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "clock", new Three.Clock());

    _defineProperty(this, "wrapper", React.createRef());

    _defineProperty(this, "scene", new Three.Scene());

    _defineProperty(this, "camera", new Three.PerspectiveCamera());

    _defineProperty(this, "renderer", new Three.WebGLRenderer({
      antialias: true
    }));

    _defineProperty(this, "controls", {
      // fpv: new Three.PointerLockControls(this.camera),
      // fly: new Three.FlyControls(this.camera),
      // map: new Three.MapControls(this.camera),
      orbit: new Three.OrbitControls(this.camera)
    });

    _defineProperty(this, "update", () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.camera.fov = this.props.fov;
      this.camera.far = this.props.far;
      this.camera.near = this.props.near;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
      this.renderer.shadowMap.enabled = true;
      this.renderer.antialias = this.props.antialias;

      if (this.controls.current !== this.controls[this.props.controls]) {
        if (this.controls.current) {
          this.controls.current.enabled = false;
        }

        this.controls.current = this.controls[this.props.controls];
        this.controls.current.enabled = true;
      }
    });

    _defineProperty(this, "animate", () => {
      this.controls.current.update();
      this.renderer.render(this.scene, this.camera);

      if (this.mounted) {
        requestAnimationFrame(this.animate);
      }
    });

    _defineProperty(this, "handleClick", e => {// e.currentTarget.requestPointerLock()
    });
  }

  componentDidMount() {
    this.mounted = true; // this.controls.map.enabled = false

    this.controls.orbit.enabled = false; // this.controls.screenSpacePanning = true
    // this.controls.fly.enabled = false
    // this.controls.fpv.enabled = false

    this.wrapper.current.appendChild(this.renderer.domElement);
    this.camera.position.set(-2, 1, 7); // this.object.add(this.controls.fpv.getObject())
    // this.controls.fly.dragToLook = false
    // this.controls.fly.movementSpeed = 1
    // this.controls.fly.rollSpeed = 0.5
    // this.controls.map.target.set(0, 2, 0)

    this.controls.orbit.target.set(0, 1, 0);
    addEventListener('resize', this.update, true);
    this.update();
    this.animate(); // Test objects

    new Three.TextureLoader().setPath('/ss-virtual-showroom/assets/').load('metal.jpg', texture => {
      texture.mapping = Three.SphericalReflectionMapping;
      const geometry = new Three.SphereGeometry(0.5, 48, 48);
      const material = new Three.MeshLambertMaterial({
        envMap: texture
      });
      this.box = new Three.Mesh(geometry, material);
      this.box.position.set(-1.5, 0.5, 0);
      this.box.castShadow = true;
      this.scene.add(this.box);
      this.update();
    });
    new Three.TextureLoader().setPath('/ss-virtual-showroom/assets/').load('2294472375_24a3b8ef46_o.jpg', texture => {
      texture.mapping = Three.EquirectangularReflectionMapping;
      const geometry = new Three.SphereGeometry(0.5, 48, 48);
      const material = new Three.MeshPhongMaterial({
        envMap: texture,
        emissive: 0.5,
        reflectivity: 0.7
      });
      this.box = new Three.Mesh(geometry, material);
      this.box.position.set(1.5, 0.5, 0);
      this.box.castShadow = true;
      this.scene.add(this.box);
      this.update();
    });
  }

  componentWillUnmount() {
    this.mounted = false;
    removeEventListener('resize', this.update, true);
  }

  render() {
    return React.createElement(_Object3D__WEBPACK_IMPORTED_MODULE_4__["ParentContext"].Provider, {
      value: this.scene
    }, this.props.children, React.createElement("div", {
      ref: this.wrapper,
      onClick: this.handleClick
    }));
  }

}

_defineProperty(Scene3D, "propTypes", {
  children: PropTypes.node,
  antialias: PropTypes.bool,
  controls: PropTypes.oneOf(['fpv', 'fly', 'map', 'orbit']),
  far: PropTypes.number,
  fov: PropTypes.number,
  near: PropTypes.number,
  zoom: PropTypes.number
});

_defineProperty(Scene3D, "defaultProps", {
  children: null,
  antialias: true,
  controls: 'orbit',
  far: 4000,
  fov: 60,
  near: 0.01,
  zoom: 1
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! three */ "three"), __webpack_require__(/*! react */ "react"), __webpack_require__(/*! prop-types */ "prop-types")))

/***/ }),

/***/ "./src/Sky3D.js":
/*!**********************!*\
  !*** ./src/Sky3D.js ***!
  \**********************/
/*! exports provided: Sky3D */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(Three, PropTypes) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sky3D", function() { return Sky3D; });
/* harmony import */ var Object3D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Object3D */ "./src/Object3D.js");
/* harmony import */ var three_examples_js_objects_Sky__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/js/objects/Sky */ "./node_modules/three/examples/js/objects/Sky.js");
/* harmony import */ var three_examples_js_objects_Sky__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(three_examples_js_objects_Sky__WEBPACK_IMPORTED_MODULE_1__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class Sky3D extends Object3D__WEBPACK_IMPORTED_MODULE_0__["Object3D"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "sky", new Three.Sky());

    _defineProperty(this, "light", new Three.DirectionalLight());

    _defineProperty(this, "hemi", new Three.HemisphereLight());

    _defineProperty(this, "ambient", new Three.AmbientLight());

    _defineProperty(this, "object", Object.assign(new Three.Group(), {
      children: [this.sky, this.light, this.hemi, this.ambient]
    }));
  }

  update() {
    const {
      sky,
      light,
      hemi
    } = this;
    const distance = 100;
    const {
      inclination,
      azimuth,
      turbidity,
      rayleigh,
      luminance,
      mieCoefficient,
      mieDirectionalG
    } = this.props;
    const theta = Math.PI * (inclination - 0.5);
    const phi = 2 * Math.PI * (azimuth - 0.5);
    const sunX = distance * Math.cos(phi);
    const sunY = distance * Math.sin(phi) * Math.sin(theta);
    const sunZ = distance * Math.sin(phi) * Math.cos(theta);
    sky.scale.setScalar(400000);
    sky.material.uniforms.turbidity.value = turbidity;
    sky.material.uniforms.rayleigh.value = rayleigh;
    sky.material.uniforms.luminance.value = luminance;
    sky.material.uniforms.mieCoefficient.value = mieCoefficient;
    sky.material.uniforms.mieDirectionalG.value = mieDirectionalG;
    sky.material.uniforms.sunPosition.value.set(sunX, sunY, sunZ);
    light.castShadow = true;
    light.position.copy(sky.material.uniforms.sunPosition.value);
    light.intensity = 1;
    light.color.setHSL(0.1, 1, 0.95);
    light.shadow.mapSize.width = 4096;
    light.shadow.mapSize.height = 4096;
    hemi.intensity = 0.6;
    hemi.color.setHSL(0.6, 1, 0.6);
    hemi.groundColor.setHSL(0.095, 1, 0.75);
    hemi.position.set(0, 50, 0);
  }

}

_defineProperty(Sky3D, "propTypes", _objectSpread({}, Object3D__WEBPACK_IMPORTED_MODULE_0__["Object3D"].propTypes, {
  azimuth: PropTypes.number,
  inclination: PropTypes.number,
  rayleigh: PropTypes.number,
  turbidity: PropTypes.number,
  luminance: PropTypes.number,
  mieCoefficient: PropTypes.number,
  mieDirectionalG: PropTypes.number
}));

_defineProperty(Sky3D, "defaultProps", _objectSpread({}, Object3D__WEBPACK_IMPORTED_MODULE_0__["Object3D"].defaultProps, {
  azimuth: 0.28,
  inclination: -0.35,
  rayleigh: 2,
  turbidity: 10,
  luminance: 1,
  mieCoefficient: 0.003,
  mieDirectionalG: 0.8
}));
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! three */ "three"), __webpack_require__(/*! prop-types */ "prop-types")))

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: Scene3D, ParentContext, Object3D, Floor3D, File3D, Sky3D */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Scene3D__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Scene3D */ "./src/Scene3D.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Scene3D", function() { return _Scene3D__WEBPACK_IMPORTED_MODULE_0__["Scene3D"]; });

/* harmony import */ var _Object3D__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Object3D */ "./src/Object3D.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ParentContext", function() { return _Object3D__WEBPACK_IMPORTED_MODULE_1__["ParentContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Object3D", function() { return _Object3D__WEBPACK_IMPORTED_MODULE_1__["Object3D"]; });

/* harmony import */ var _Floor3D__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Floor3D */ "./src/Floor3D.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Floor3D", function() { return _Floor3D__WEBPACK_IMPORTED_MODULE_2__["Floor3D"]; });

/* harmony import */ var _File3D__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./File3D */ "./src/File3D.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "File3D", function() { return _File3D__WEBPACK_IMPORTED_MODULE_3__["File3D"]; });

/* harmony import */ var _Sky3D__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Sky3D */ "./src/Sky3D.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Sky3D", function() { return _Sky3D__WEBPACK_IMPORTED_MODULE_4__["Sky3D"]; });







/***/ }),

/***/ "prop-types":
/*!**************************************************************************************!*\
  !*** external {"commonjs":"prop-types","commonjs2":"prop-types","amd":"prop-types"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_prop_types__;

/***/ }),

/***/ "react":
/*!**************************************************************************************!*\
  !*** external {"commonjs":"react","commonjs2":"react","amd":"react","root":"React"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ }),

/***/ "three":
/*!**************************************************************************************!*\
  !*** external {"commonjs":"three","commonjs2":"three","amd":"three","root":"THREE"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_three__;

/***/ })

/******/ });
});
//# sourceMappingURL=bundle.umd.js.map