'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AchtungSteering = require('./AchtungSteering');

var _AchtungSteering2 = _interopRequireDefault(_AchtungSteering);

var _JoystickSteering = require('./JoystickSteering');

var _JoystickSteering2 = _interopRequireDefault(_JoystickSteering);

var _AngleSteering = require('./AngleSteering');

var _AngleSteering2 = _interopRequireDefault(_AngleSteering);

var _GrabSteering = require('./GrabSteering');

var _GrabSteering2 = _interopRequireDefault(_GrabSteering);

var _leapjs = require('leapjs');

var _leapjs2 = _interopRequireDefault(_leapjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LeapSteering = function () {
  function LeapSteering(left, right, mode, options) {
    _classCallCheck(this, LeapSteering);

    if (mode === undefined) {
      throw new Error('A steering mode needs to be provided. Got ' + (typeof mode === 'undefined' ? 'undefined' : _typeof(mode)));
    }
    if (typeof mode !== 'string') {
      throw new Error('Steering mode parameter needs to be a string. Got ' + (typeof mode === 'undefined' ? 'undefined' : _typeof(mode)));
    }

    this.initialize = this.initialize.bind(this);
    this.start = this.start.bind(this);

    this.mode = mode === 'Achtung' ? new _AchtungSteering2.default(left, right, options.keyToggle, options.keypressDuration) : mode === 'Joystick' ? new _JoystickSteering2.default(left, right, options.keyToggle, options.keypressDuration) : mode === 'Angle' ? new _AngleSteering2.default(left, right, options) : mode === 'Grab' ? new _GrabSteering2.default(left, right, options) : new Error('No matching mode');
  }

  _createClass(LeapSteering, [{
    key: 'initialize',
    value: function initialize() {

      console.log("Initializing...");
      this.controller = new _leapjs2.default.Controller({ frameEventName: "deviceFrame" });

      console.log("Trying to connect...");
      this.controller.connect();

      this.controller.on('connect', function () {
        console.log("Connected!");
      });
    }
  }, {
    key: 'start',
    value: function start(frame) {

      if (this.mode instanceof Error) {
        throw this.mode;
      }

      console.log("Start");
      this.controller.on('frame', this.mode.turn);
    }
  }]);

  return LeapSteering;
}();

exports.default = LeapSteering;
//# sourceMappingURL=Steering.js.map
