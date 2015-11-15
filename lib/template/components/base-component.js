'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilities = require('utilities');

var _templ = require('templ');

var templ = _interopRequireWildcard(_templ);

var _internal = require('../../internal');

var vnode = templ.vnode;

var BaseComponent = (function () {
    function BaseComponent(section, vvnode, attributes, view) {
        var _this = this;

        _classCallCheck(this, BaseComponent);

        this.section = section;
        this.vnode = vvnode;
        this.attributes = attributes;
        this.view = view;
        this.document = view.template.options.document;
        if (vvnode.childNodes) this.childTemplate = vnode.template(vnode.fragment(vvnode.childNodes), view.template.options);
        for (var key in attributes) this.setAttribute(key, attributes[key]);
        var container = this.view._container;
        (0, _internal.resolveDependencies)(this.initialize, container).then(function (deps) {
            (0, _utilities.callFunc)(_this.initialize, _this, deps);
        })['catch'](function (e) {
            throw e;
        });
    }

    _createClass(BaseComponent, [{
        key: 'initialize',
        value: function initialize() {}
    }, {
        key: 'setAttribute',
        value: function setAttribute(key, value) {
            this.attributes[key] = value;
        }
    }, {
        key: 'removeAttribute',
        value: function removeAttribute(key) {
            this.attributes[key] = void 0;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            var a = this;
            if (typeof a.onDestroy === 'funciton') {
                a.onDestroy();
            }
        }
    }]);

    return BaseComponent;
})();

exports.BaseComponent = BaseComponent;