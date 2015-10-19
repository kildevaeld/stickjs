'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

var _stick = require('../stick');

var _componentsController = require('./components/controller');

var _templateView = require('./template.view');

_defaults(exports, _interopExportWildcard(_templateView, _defaults));

(0, _stick.component)('controller', ['$container', _componentsController.Controller]);

var _componentsBaseComponent = require('./components/base-component');

_defaults(exports, _interopExportWildcard(_componentsBaseComponent, _defaults));