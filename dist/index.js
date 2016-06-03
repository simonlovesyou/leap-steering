'use strict';

var _lib = require('./lib/');

var _lib2 = _interopRequireDefault(_lib);

var _robotjs = require('robotjs');

var _robotjs2 = _interopRequireDefault(_robotjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var test = process.env.NODE_ENV ? process.env.NODE_ENV.match(/test/) ? true : false : false;

console.log(test);

var options = {
  keypressDuration: 40,
  keyToggle: test ? function () {} : _robotjs2.default.keyToggle
};

//robot.keyToggle('up', 'down');

var steering = new _lib2.default('left', 'right', process.argv[2] || 'Achtung', options);

steering.initialize();
steering.start();
//# sourceMappingURL=index.js.map
