"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) {
            return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) {
                resolve(value);
            });
        }
        function onfulfill(value) {
            try {
                step("next", value);
            } catch (e) {
                reject(e);
            }
        }
        function onreject(value) {
            try {
                step("throw", value);
            } catch (e) {
                reject(e);
            }
        }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
var utilities_1 = require('utilities');
var vnode_1 = require('templ/lib/vnode');

var BaseComponent = function () {
    function BaseComponent(section, vvnode, attributes, view) {
        _classCallCheck(this, BaseComponent);

        if (this.update) {
            this.update = utilities_1.bind(this.update, this);
        }
        this.section = section;
        this.vnode = vvnode;
        this.attributes = attributes;
        this.view = view;
        this.document = view.template.options.document;
        if (vvnode.childNodes) this.childTemplate = vnode_1.template(vnode_1.fragment(vvnode.childNodes), view.template.options);
        for (var key in attributes) {
            this.setAttribute(key, attributes[key]);
        }var container = this.view.container;
        this.initialize.call(this, container);
    }

    _createClass(BaseComponent, [{
        key: "initialize",
        value: function initialize() {}
    }, {
        key: "setAttribute",
        value: function setAttribute(key, value) {
            this.attributes[key] = value;
        }
    }, {
        key: "removeAttribute",
        value: function removeAttribute(key) {
            this.attributes[key] = void 0;
        }
    }, {
        key: "getAttribute",
        value: function getAttribute(key) {
            return this.attributes[key];
        }
    }, {
        key: "destroy",
        value: function destroy() {
            var a = this;
            if (typeof a.onDestroy === 'function') {
                a.onDestroy();
            }
        }
    }]);

    return BaseComponent;
}();

exports.BaseComponent = BaseComponent;