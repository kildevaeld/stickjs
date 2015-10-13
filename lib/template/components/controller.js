/// <reference path="../../typings" />
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _templ = require('templ');

var _controllerFactory = require('../../controller.factory');

var ControllerComponent = (function (_components$BaseComponent) {
    _inherits(ControllerComponent, _components$BaseComponent);

    function ControllerComponent() {
        _classCallCheck(this, ControllerComponent);

        _get(Object.getPrototypeOf(ControllerComponent.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(ControllerComponent, [{
        key: 'initialize',
        value: function initialize() {
            var _this = this;

            this.container = this.view._container;
            if (this.attributes['name']) {
                this.name = this.attributes['name'];
                this.as = this.attributes['as'] || this.name;
            }
            //this.__initController(this.name)
            var factory = this.view._container.get(this.name);
            if (!(factory instanceof _controllerFactory.ControllerFactory)) {
                throw new Error(this.name + ' is not a controller');
            }
            var template = this.childTemplate;
            if (this.attributes['template']) {
                template = this.attributes['template'];
            }
            factory.create({
                template: template
            }).then(function (controller) {
                var template = factory.container.get('template');
                _this.section.appendChild(template.render());
            });
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            _get(Object.getPrototypeOf(ControllerComponent.prototype), 'destroy', this).call(this);
            if (this.subview) {
                this.subview.remove();
                delete this.subview;
            }
            //this.controller.destroy();
        }
    }]);

    return ControllerComponent;
})(_templ.components.BaseComponent);

exports.ControllerComponent = ControllerComponent;