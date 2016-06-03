"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _AbstractSteering2 = require("./AbstractSteering");

var _AbstractSteering3 = _interopRequireDefault(_AbstractSteering2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var min = Infinity;
var max = -Infinity;

var AngleSteering = function (_AbstractSteering) {
  _inherits(AngleSteering, _AbstractSteering);

  function AngleSteering(left, right, options) {
    _classCallCheck(this, AngleSteering);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AngleSteering).call(this, left, right, options));

    _this.pass = true;
    _this.block = false;

    //Bind class functions to the prototype of this class.
    _this.turn = _this.turn.bind(_this);
    return _this;
  }

  _createClass(AngleSteering, [{
    key: "turn",
    value: function turn(rawFrame) {
      var _this2 = this;

      _get(Object.getPrototypeOf(AngleSteering.prototype), "calibrateHand", this).call(this, rawFrame, function (frame, zeroes) {

        var zero = zeroes.roll,
            handRoll = frame.hands[0].roll(),


        //Normalize roll
        roll = handRoll > zero ? Math.min(handRoll, 1) : Math.max(handRoll, -2) / 2,
            key = roll < zero ? _get(Object.getPrototypeOf(AngleSteering.prototype), "right", _this2).call(_this2) : _get(Object.getPrototypeOf(AngleSteering.prototype), "left", _this2).call(_this2);

        if (_this2.pass) {

          _this2.pass = false;

          var waitTime = Math.floor(Math.abs((1 - Math.pow(roll, 2)) * 200));

          _get(Object.getPrototypeOf(AngleSteering.prototype), "keyPress", _this2).call(_this2, key, _this2.block, function () {

            //console.log(roll);

            var waitTime = Math.floor(Math.abs((1 - Math.pow(roll, 2)) * 200));

            console.log("waitTime: " + waitTime);

            //this.block = waitTime > 190;

            var wait = /*this.block || waitTime < 10 ? 0 :*/waitTime;

            setTimeout(function () {
              _this2.pass = true;
            }, wait);
          });
        }
      });
    }
  }]);

  return AngleSteering;
}(_AbstractSteering3.default);

/*turn(rawFrame) {

    super.calibrateHand(rawFrame, (frame, zeroes) => {

      let zero = zeroes.handDirection[0];

      let direction = frame.hands[0].direction[0] || undefined;

      let key = direction < this.zero ? super.left() : super.right();

      if(this.pass) {

        this.pass = false;
        super.keyPress(key, () => {

          let waitTime = Math.floor((Math.abs((1-Math.pow(direction, 2))*200)));

          console.log("waitTime: " + waitTime)

          let wait = waitTime < 45 ? 0 : waitTime

          setTimeout(() => {
            this.pass = true;
          }, wait);
          
        });
      }
    });
  }
*/


exports.default = AngleSteering;
//# sourceMappingURL=AngleSteering.js.map
