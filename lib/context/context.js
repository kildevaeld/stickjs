"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var collection_1 = require('collection');
var utils = require('utilities');
var annotations_1 = require('../annotations');
exports.get_atributes = function (attributes) {
    var keys = Object.keys(attributes),
        deferred = {},
        attr = {};
    keys.map(function (key) {
        return { key: key, value: attributes[key] };
    }).filter(function (pair) {
        if (!utils.has(attributes, pair.key)) return false;
        if (pair.value && utils.isPromise(pair.value)) {
            deferred[pair.key] = pair.value;
            delete attributes[pair.key];
            return false;
        }
        return true;
    }).forEach(function (a) {
        attr[a.key] = a.value;
    });
    return { attr: attr, deferred: deferred };
};
var reserved_words = ["__queue", "__parent", "__model", "__subscriber", '__mediator'];
var Context = function () {
    function Context(mediator) {
        _classCallCheck(this, Context);

        this.__queue = 0;
        this.__mediator = mediator;
        this.__model = new collection_1.NestedModel();
        this.__onchange = utils.bind(this.__onchange, this);
        this.__model.on('change', this.__onModelChange, this);
        this.__subscribers = new Map();
    }

    _createClass(Context, [{
        key: "$call",
        value: function $call(fn, ctx, args) {
            var _this = this;

            this.$observe();
            var results = utils.callFunc(fn, ctx, args);
            if (results) {
                this.__queue++;
                return utils.toPromise(results).then(function () {
                    if (--_this.__queue === 0) _this.$unobserve();
                    return results;
                });
            } else {
                var _ret = function () {
                    var defer = utils.deferred();
                    utils.nextTick(function () {
                        if (_this.__queue == 0) _this.$unobserve();
                        defer.resolve(null);
                    });
                    return {
                        v: defer.promise
                    };
                }();

                if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
            }
        }
    }, {
        key: "$subscribe",
        value: function $subscribe(event, _handler) {
            var _this2 = this;

            var ctx = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

            var ev = {
                event: event,
                handler: function handler() {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    _this2.$call(_handler, ctx, args);
                },
                id: utils.uniqueId("ctx")
            };
            this.__subscribers.set(_handler, ev);
            this.__mediator.subscribe(event, ev.handler, this);
            return ev.id;
        }
    }, {
        key: "__onModelChange",
        value: function __onModelChange() {
            var changed = this.__model.changed;
            for (var k in changed) {
                if (this[k] == changed[k]) continue;
                this[k] = changed[k];
            }
        }
    }, {
        key: "$unsubscribe",
        value: function $unsubscribe(event, handler) {
            var ev = null,
                key = null;
            if (typeof handler === 'string') {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.__subscribers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _step$value = _slicedToArray(_step.value, 2);

                        var k = _step$value[0];
                        var v = _step$value[1];

                        if (v.id === handler) {
                            ev = this.__subscribers.get(k);
                            key = k;
                        }
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
            } else if (this.__subscribers.has(handler)) {
                ev = this.__subscribers.get(handler);
                key = handler;
            }
            if (ev !== null) {
                this.__mediator.unsubscribe(event, ev.handler);
                this.__subscribers.delete(key);
            }
            return this;
        }
    }, {
        key: "$publish",
        value: function $publish(event) {
            var _mediator;

            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
            }

            (_mediator = this.__mediator).publish.apply(_mediator, [event].concat(args));
        }
    }, {
        key: "__onchange",
        value: function __onchange(events) {
            var _this3 = this;

            var props = {};
            for (var i = 0, ii = events.length; i < ii; i++) {
                var e = events[i];
                var names = e.name.split('.');
                if (!! ~reserved_words.indexOf(names[0])) {
                    //console.warn('cannot set a reserved word:', reserved_words);
                    continue;
                }
                if (e.type === 'delete') {
                    this.__model.set(e.name, { unset: true });
                } else {
                    props[e.name] = this[e.name];
                }
            }

            var _exports$get_atribute = exports.get_atributes(props);

            var attr = _exports$get_atribute.attr;
            var deferred = _exports$get_atribute.deferred;

            if (Object.keys(attr).length) {
                var _props = this.__normalizeAttr(attr);
                this.$unobserve();
                this.__model.set(_props);
                utils.extend(this, _props);
                this.$observe();
            }
            if (Object.keys(deferred).length) {
                this.__queue++;
                utils.toPromise(deferred).then(function (props) {
                    if (--_this3.__queue === 0) {
                        _this3.$unobserve();
                    }
                    props = _this3.__normalizeAttr(props);
                    utils.extend(_this3, props);
                    _this3.__model.set(props);
                }).catch(function (e) {
                    _this3.__model.trigger('error', e);
                    _this3.$unobserve();
                });
            }
        }
    }, {
        key: "__normalizeAttr",
        value: function __normalizeAttr(attr) {
            for (var key in attr) {
                var val = attr[key];
                if (Array.isArray(val) && val.length > 0 && utils.isObject(val[0])) {
                    val = new collection_1.Collection(val);
                    attr[key] = val;
                }
            }
            return attr;
        }
    }, {
        key: "$destroy",
        value: function $destroy() {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.__subscribers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _step2$value = _slicedToArray(_step2.value, 2);

                    var k = _step2$value[0];
                    var v = _step2$value[1];

                    this.__mediator.unsubscribe(v.event, k);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            this.__model.off('change', this.__onModelChange, this);
            this.__subscribers.clear();
        }
    }, {
        key: "$root",
        get: function get() {
            var parent = this.__parent;
            while (parent != null) {
                if (!parent.__parent) return parent;
                parent = parent.__parent;
            }
            return this;
        }
    }, {
        key: "$parent",
        get: function get() {
            return this.__parent;
        }
    }]);

    return Context;
}();
Context = __decorate([annotations_1.inject('$mediator')], Context);
exports.Context = Context;