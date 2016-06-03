'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _robotjs = require('robotjs');

var _robotjs2 = _interopRequireDefault(_robotjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractSteering = function () {
  function AbstractSteering(left, right) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _classCallCheck(this, AbstractSteering);

    if (left === undefined || right === undefined) {
      throw new Error('Left and right turn keys needs to be specified');
    }
    this._leftKey = left;
    this._rightKey = right;

    this.keypressDuration = options.keypressDuration || 40;
    this.turn = options.turn || this.turn;
    this.keyPress = options.keyPress || this.keyPress;
    this.keyToggle = options.keyToggle || _robotjs2.default.keyToggle;

    this.calibratePosThreshold = 2;
    this.calibrateDirectionThreshold = 0.02;
    this.calibrateRollThreshold = 0.02;
    this.zero = 0;
    this.stableFrameCount = 0;
    this.stableFramesRequired = 25;
    this.block = false;

    //Bind class functions to the prototype of this class.
    this.turn = this.turn.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.left = this.left.bind(this);
    this.right = this.right.bind(this);
    this.calibrateHand = this.calibrateHand.bind(this);
  }

  _createClass(AbstractSteering, [{
    key: 'turn',
    value: function turn() {
      throw new Error('The turn function needs to be implemented.');
    }
  }, {
    key: 'left',
    value: function left() {
      return this._leftKey;
    }
  }, {
    key: 'right',
    value: function right() {
      return this._rightKey;
    }
  }, {
    key: 'calibrateHand',
    value: function calibrateHand(frame, cb) {
      var _this = this;

      if (frame.hands.length > 0) {
        var _ret = function () {
          //If a stable frame already as been captured.
          if (_this.stableFrame) {

            var zero = {
              palmPosition: _this.stableFrame.hands[0].palmPosition,
              handDirection: _this.stableFrame.hands[0].direction,
              roll: _this.stableFrame.hands[0].roll(),
              stableFrame: _this.stableFrame
            };
            //Return with the callback.
            return {
              v: cb(frame, zero)
            };
          }

          //Get the palm position from the frame
          var pos = frame.hands[0].palmPosition,


          //Get the direction of the hand from the frame
          dir = frame.hands[0].direction,


          //Get the last known position of the hand
          lastPos = _this.lastPosition || [Infinity, Infinity, Infinity],
              lastDir = _this.lastDirection || [Infinity, Infinity, Infinity],


          //Retrieve the thresholds
          posThresh = _this.calibratePosThreshold,
              dirThresh = _this.calibrateDirectionThreshold,


          //Check if the palm position is stable
          stablePos = pos.every(function (dim, i) {
            return dim >= lastPos[i] - posThresh && dim <= lastPos[i] + posThresh;
          }),

          //Check if the direction of the hand is stable
          stableDir = dir.every(function (dim, i) {
            return dim >= lastDir[i] - dirThresh && dim <= lastDir[i] + dirThresh;
          });

          if (stablePos && stableDir) {
            //Count the number of frames with a stable hand
            console.log(_this.stableFrameCount);
            _this.stableFrameCount++;
          } else {
            //Restart counting
            _this.stableFrameCount = 0;
          }

          //If the number of stable frames have met the requirement.
          if (_this.stableFrameCount === _this.stableFramesRequired) {
            //Save the stable frame to use as reference.
            _this.stableFrame = frame;

            _robotjs2.default.keyToggle('up', 'down');

            console.log("Stable!");
          }

          _this.lastPosition = pos;
          _this.lastDirection = dir;

          //If the hand is lost, reset the stable hand positions
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      } else {
          this.stableFrameCount = 0;
          this.stableFrame = null;
        }
    }
  }, {
    key: 'block',
    value: function block(value) {
      this.block = value;
    }
  }, {
    key: 'keyPress',
    value: function keyPress(key, block, cb) {

      //If block parameter is omitted.
      if (typeof block === 'function' && cb === undefined) {
        cb = block;
        block = undefined;
      }

      //console.log("Blocking: " + block);

      //console.log(block);

      var keyToggle = block === false || block === undefined ? this.keyToggle : function () {};

      //let keyToggle = this.keyToggle;

      //console.log(keyToggle);

      keyToggle(key, 'down');
      //console.log("Pressing down %s", key);

      setTimeout(function () {
        //console.log("Realising %s", key);
        keyToggle(key, 'up');
        cb();
      }, this.keypressDuration);
    }
  }]);

  return AbstractSteering;
}();

exports.default = AbstractSteering;
//# sourceMappingURL=AbstractSteering.js.map
