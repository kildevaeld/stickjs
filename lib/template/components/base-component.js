"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var orange_1 = require('orange');
var index_1 = require('templ/lib/vnode/index');
var eventsjs_1 = require('eventsjs');

var BaseComponent = function (_eventsjs_1$EventEmit) {
    _inherits(BaseComponent, _eventsjs_1$EventEmit);

    function BaseComponent(section, vvnode, attributes, view) {
        _classCallCheck(this, BaseComponent);

        var _this = _possibleConstructorReturn(this, (BaseComponent.__proto__ || Object.getPrototypeOf(BaseComponent)).call(this));

        if (_this.update) {
            _this.update = orange_1.bind(_this.update, _this);
        }
        _this.section = section;
        _this.vnode = vvnode;
        _this.attributes = attributes;
        _this.view = view;
        _this.document = view.template.options.document;
        if (vvnode.childNodes) _this.childTemplate = index_1.template(index_1.fragment(vvnode.childNodes), view.template.options);
        for (var key in attributes) {
            _this.setAttribute(key, attributes[key]);
        }var container = _this.view.container;
        return _this;
    }

    _createClass(BaseComponent, [{
        key: 'initialize',
        value: function initialize() {
            return Promise.resolve();
        }
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
        key: 'getAttribute',
        value: function getAttribute(key) {
            return this.attributes[key];
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            var a = this;
            if (typeof a.onDestroy === 'function') {
                a.onDestroy();
            } else if (typeof a.ondestroy === 'function') {
                a.ondestroy();
            }
        }
    }]);

    return BaseComponent;
}(eventsjs_1.EventEmitter);

exports.BaseComponent = BaseComponent;