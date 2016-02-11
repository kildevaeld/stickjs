"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var context_1 = require('./context');

var ObjectObserveProxy = function (_context_1$Context) {
    _inherits(ObjectObserveProxy, _context_1$Context);

    function ObjectObserveProxy() {
        _classCallCheck(this, ObjectObserveProxy);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ObjectObserveProxy).apply(this, arguments));
    }

    _createClass(ObjectObserveProxy, [{
        key: "$observe",
        value: function $observe() {
            Object.observe(this, this.__onchange);
        }
    }, {
        key: "$unobserve",
        value: function $unobserve() {
            Object.unobserve(this, this.__onchange);
        }
    }, {
        key: "$createChild",
        value: function $createChild() {
            var child = new ObjectObserveProxy(this.__mediator);
            child.__parent = this;
            return child;
        }
    }]);

    return ObjectObserveProxy;
}(context_1.Context);

exports.ObjectObserveProxy = ObjectObserveProxy;