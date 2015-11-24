'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _collection = require('collection');

var _utilities = require('utilities');

var utils = _interopRequireWildcard(_utilities);

var _eventsjs = require('eventsjs');

var get_atributes = function get_atributes(attributes) {
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
exports.get_atributes = get_atributes;
var reserved_words = ["__queue", "__parent", "__model", "__subscriber"];

var Context = (function () {
    function Context() {
        _classCallCheck(this, Context);

        this.__queue = 0;
        this.__model = new _collection.NestedModel();
        this.__onchange = utils.bind(this.__onchange, this);
        this.__subscribers = {};
    }

    _createClass(Context, [{
        key: '$call',
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
                var _ret = (function () {
                    var defer = utils.deferred();
                    utils.nextTick(function () {
                        if (_this.__queue == 0) _this.$unobserve();
                        defer.resolve(null);
                    });
                    return {
                        v: defer.promise
                    };
                })();

                if (typeof _ret === 'object') return _ret.v;
            }
        }
    }, {
        key: '$subscribe',
        value: function $subscribe(event, handler) {
            if (this.$root !== this) {
                return this.$root.$subscribe(event, handler);
            }
            var subscribers = this.__subscribers[event] || (this.__subscribers[event] = []);
            subscribers.push(handler);
            return this;
        }
    }, {
        key: '$unsubscribe',
        value: function $unsubscribe(event, handler) {
            if (this.$root !== this) {
                return this.$root.$unsubscribe(event, handler);
            }
            var subscribers = this.__subscribers[event] || (this.__subscribers[event] = []);
            var i = subscribers.indexOf(handler);
            if (i > -1) {
                subscribers.splice(i, 1);
            }
            return this;
        }
    }, {
        key: '$publish',
        value: function $publish(event) {
            var _this2 = this;

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            var subscribers = this.__subscribers[event];
            if (subscribers) {
                this.$call(function () {
                    (0, _eventsjs.callFunc)(subscribers, _this2, args);
                });
            }
            if (this.__parent) {
                var _parent;

                (_parent = this.__parent).$publish.apply(_parent, [event].concat(args));
            }
        }
    }, {
        key: '__onchange',
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

            var _get_atributes = get_atributes(props);

            var attr = _get_atributes.attr;
            var deferred = _get_atributes.deferred;

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
                })['catch'](function (e) {
                    _this3.__model.trigger('error', e);
                    _this3.$unobserve();
                });
            }
        }
    }, {
        key: '__normalizeAttr',
        value: function __normalizeAttr(attr) {
            for (var key in attr) {
                var val = attr[key];
                if (Array.isArray(val) && val.length > 0 && utils.isObject(val[0])) {
                    val = new _collection.Collection(val);
                    attr[key] = val;
                }
            }
            return attr;
        }
    }, {
        key: '$root',
        get: function get() {
            var parent = this.__parent;
            while (parent != null) {
                if (!parent.__parent) return parent;
                parent = parent.__parent;
            }
            return this;
        }
    }, {
        key: '$parent',
        get: function get() {
            return this.__parent;
        }
    }]);

    return Context;
})();

exports.Context = Context;