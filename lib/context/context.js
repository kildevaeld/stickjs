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

var Context = (function () {
    /*constructor (model?:IModel, parent?:IContext) {*/

    function Context() {
        _classCallCheck(this, Context);

        this.__queue = 0;
        //this.__parent = parent;
        this.__model = new _collection.NestedModel();
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
        value: function $subscribe(event, handler) {}
    }, {
        key: '$unsubsribe',
        value: function $unsubsribe(event, handler) {}
    }, {
        key: '$publish',
        value: function $publish(event) {}
    }, {
        key: '__onchange',
        value: function __onchange(events) {
            var _this2 = this;

            var props = {};
            for (var i = 0, ii = events.length; i < ii; i++) {
                var e = events[i];
                var names = e.name.split('.');
                if (e.name === '__parent' || e.name === '__queue' || names[0] == '__model') continue;
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
                    if (--_this2.__queue === 0) {
                        _this2.$unobserve();
                    }
                    props = _this2.__normalizeAttr(props);
                    utils.extend(_this2, props);
                    _this2.__model.set(props);
                })['catch'](function (e) {
                    _this2.__model.trigger('error', e);
                    _this2.$unobserve();
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
    }]);

    return Context;
})();

exports.Context = Context;