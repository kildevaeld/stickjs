'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

var _routerIndex = require('./router/index');

_defaults(exports, _interopExportWildcard(_routerIndex, _defaults));

var _http = require('./http');

_defaults(exports, _interopExportWildcard(_http, _defaults));

var _template = require('./template');

_defaults(exports, _interopExportWildcard(_template, _defaults));