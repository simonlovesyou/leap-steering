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

var AchtungSteering = function (_AbstractSteering) {
  _inherits(AchtungSteering, _AbstractSteering);

  function AchtungSteering(left, right, options) {
    _classCallCheck(this, AchtungSteering);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AchtungSteering).call(this, left, right, options));

    _this.pass = true;

    //Bind class functions to the prototype of this class.
    _this.turn = _this.turn.bind(_this);
    return _this;
  }

  _createClass(AchtungSteering, [{
    key: "turn",
    value: function turn(rawFrame) {
      var _this2 = this;

      _get(Object.getPrototypeOf(AchtungSteering.prototype), "calibrateHand", this).call(this, rawFrame, function (frame, zeroes) {

        var zero = zeroes.handDirection[0];

        var direction = frame.hands[0].direction[0] || undefined;

        var key = direction < _this2.zero ? _get(Object.getPrototypeOf(AchtungSteering.prototype), "left", _this2).call(_this2) : _get(Object.getPrototypeOf(AchtungSteering.prototype), "right", _this2).call(_this2);

        if (_this2.pass) {

          _this2.pass = false;
          _get(Object.getPrototypeOf(AchtungSteering.prototype), "keyPress", _this2).call(_this2, key, function () {

            var waitTime = Math.floor(Math.abs((1 - Math.pow(direction, 2)) * 200));

            console.log("waitTime: " + waitTime);

            var wait = waitTime < 45 ? 0 : waitTime;

            setTimeout(function () {
              _this2.pass = true;
            }, wait);
          });
        }
      });
    }
  }]);

  return AchtungSteering;
}(_AbstractSteering3.default);

exports.default = AchtungSteering;
//# sourceMappingURL=AchtungSteering.js.map
