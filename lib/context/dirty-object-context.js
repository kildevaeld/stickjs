'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _context = require('./context');

var _utilitiesLibIndex = require('utilities/lib/index');

var reserved = ['model', 'parent', '__queue', '_onchange', '__timer', '_listeners', '__subscribers'];

var DirtyObjectObserver = (function (_Context) {
    _inherits(DirtyObjectObserver, _Context);

    function DirtyObjectObserver() {
        _classCallCheck(this, DirtyObjectObserver);

        _get(Object.getPrototypeOf(DirtyObjectObserver.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(DirtyObjectObserver, [{
        key: '$observe',
        value: function $observe() {
            var _this = this;

            this.$unobserve();
            (0, _utilitiesLibIndex.nextTick)(function () {
                _this._check(_this.__model);
            });
            this.__timer = setInterval(function () {
                _this._check(_this.__model);
            }, 300);
            //super.observe();
        }
    }, {
        key: '$unobserve',
        value: function $unobserve() {
            if (this.__timer) {
                clearTimeout(this.__timer);
                this.__timer = null;
            }
            //super.unobserve();
        }
    }, {
        key: '_check',
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
                    } else if (v && !(0, _utilitiesLibIndex.equal)(v, attributes[k])) {
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
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
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
        key: '$createChild',
        value: function $createChild() {
            var child = new DirtyObjectObserver();
            child.__parent = this;
            return child;
        }
    }]);

    return DirtyObjectObserver;
})(_context.Context);

exports.DirtyObjectObserver = DirtyObjectObserver;