'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

require('./services/template');

require('./services/http');

require('./services/router');

require('./template/index');

var _utilities = require('utilities');

var u = _interopRequireWildcard(_utilities);

var utils = u;
exports.utils = utils;

var _stick = require('./stick');

_defaults(exports, _interopExportWildcard(_stick, _defaults));

var _collection = require('collection');

_defaults(exports, _interopExportWildcard(_collection, _defaults));