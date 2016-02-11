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
var index_1 = require('utilities/lib/index');
var reserved = ['model', 'parent', '__queue', '_onchange', '__timer', '_listeners', '__subscribers'];

var DirtyObjectObserver = function (_context_1$Context) {
    _inherits(DirtyObjectObserver, _context_1$Context);

    function DirtyObjectObserver() {
        _classCallCheck(this, DirtyObjectObserver);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DirtyObjectObserver).apply(this, arguments));
    }

    _createClass(DirtyObjectObserver, [{
        key: "$observe",
        value: function $observe() {
            var _this2 = this;

            this.$unobserve();
            index_1.nextTick(function () {
                _this2._check(_this2.__model);
            });
            this.__timer = setInterval(function () {
                _this2._check(_this2.__model);
            }, 300);
            //super.observe();
        }
    }, {
        key: "$unobserve",
        value: function $unobserve() {
            if (this.__timer) {
                clearTimeout(this.__timer);
                this.__timer = null;
            }
            //super.unobserve();
        }
    }, {
        key: "_check",
        value: function _check(model) {
            var attributes = this.__model.toJSON();
            var events = [],
                v = undefined,
                ev = undefined;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.keys(this)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var k = _step.value;

                    v = this[k];
                    if (~reserved.indexOf(k)) continue;
                    ev = {
                        name: k,
                        object: this,
                        type: v == null ? "delete" : ""
                    };
                    if (v && !attributes[k]) {
                        ev.type = "add";
                    } else if (v && !index_1.equal(v, attributes[k])) {
                        ev.type = "update";
                    }
                    ev.oldValue = attributes[k];
                    events.push(ev);
                    delete attributes[k];
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            for (var k in attributes) {
                events.push({
                    name: k,
                    object: this,
                    type: 'delete',
                    oldValue: attributes[k]
                });
            }
            if (events.length) this.__onchange(events);
        }
    }, {
        key: "$createChild",
        value: function $createChild() {
            var child = new DirtyObjectObserver(this.__mediator);
            child.__parent = this;
            return child;
        }
    }]);

    return DirtyObjectObserver;
}(context_1.Context);

exports.DirtyObjectObserver = DirtyObjectObserver;