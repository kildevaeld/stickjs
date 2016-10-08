"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var collection_1 = require('collection');
var utils = require('orange');
var decorators = require('./decorators');
var debug = require('debug')('stick:state');
function isObject(a) {
    return a === Object(a);
}
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
var State_1 = void 0;
var State = State_1 = function (_collection_1$NestedM) {
    _inherits(State, _collection_1$NestedM);

    function State(container, values) {
        _classCallCheck(this, State);

        var _this = _possibleConstructorReturn(this, (State.__proto__ || Object.getPrototypeOf(State)).call(this, values));

        _this._container = container;
        debug('%s: State created', _this.uid);
        return _this;
    }

    _createClass(State, [{
        key: "get",

        /*public pick(attr:string|string[], ...attrs:string[]): any {
            if (arguments.length === 1) {
                if (!Array.isArray(attr)) {
                    attrs = [attr];
                } else {
                    attrs = <string[]>attr;
                }
            } else {
                attrs = [<string>attr].concat(attrs);
            }
            let out = {};
            for (let i = 0, ii = attrs.length; i < ii; i++ ) {
                if (this.has(attrs[i])) out[attrs[i]] = this.get(attrs[i]);
            }
            
            return out;
        }*/
        value: function get(key) {
            var data = _get(State.prototype.__proto__ || Object.getPrototypeOf(State.prototype), "get", this).call(this, key);
            debug("%s: Get attribute: %s", this.uid, key, data);
            return data;
        }
    }, {
        key: "set",
        value: function set(key, val) {
            var _this2 = this;

            var opts = { array: false },
                value = {},
                unset = {};
            if (typeof key === 'string') {
                if (val == null) {
                    unset[key] = val;
                } else {
                    value[key] = val;
                }
            } else if (isObject(key)) {
                value = key;
            }

            var _exports$get_atribute = exports.get_atributes(value);

            var attr = _exports$get_atribute.attr;
            var deferred = _exports$get_atribute.deferred;

            if (!utils.isEmpty(deferred)) {
                debug("%s: Resolve deferred values: %j", this.uid, Object.keys(deferred));
                utils.objectToPromise(deferred).then(function (obj) {
                    _this2.set(obj);
                });
            }
            if (!utils.isEmpty(attr)) {
                debug("%s: Set attributes: ", this.uid, attr);
                _get(State.prototype.__proto__ || Object.getPrototypeOf(State.prototype), "set", this).call(this, attr, opts);
            }
            if (!utils.isEmpty(unset)) {
                // Should unset
                debug("%s: Unset attributes: %j", this.uid, Object.keys(unset));
                _get(State.prototype.__proto__ || Object.getPrototypeOf(State.prototype), "set", this).call(this, unset);
            }
            return this;
        }
    }, {
        key: "createChild",
        value: function createChild(container, values) {
            if (!container) container = this.container.createChild();
            var state = new State_1(container, values);
            state._parent = state;
            debug("%s: Create child %s", this.uid, state.uid);
            return state;
        }
    }, {
        key: "$destroy",
        value: function $destroy() {
            _get(State.prototype.__proto__ || Object.getPrototypeOf(State.prototype), "destroy", this).call(this);
            debug("%s: State destroyed", this.uid);
        }
    }, {
        key: "parent",
        get: function get() {
            return this._parent;
        }
    }, {
        key: "container",
        get: function get() {
            return this._container;
        }
    }]);

    return State;
}(collection_1.NestedModel);
State = State_1 = __decorate([decorators.inject('$container')], State);
exports.State = State;