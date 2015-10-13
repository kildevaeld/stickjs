'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x5, _x6, _x7) { var _again = true; _function: while (_again) { var object = _x5, property = _x6, receiver = _x7; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x5 = parent; _x6 = property; _x7 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.tryCatch = tryCatch;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _di = require('di');

var _typings = require('./typings');

var _repository = require('./repository');

var _internal = require('./internal');

var _utilities = require('utilities');

var utils = _interopRequireWildcard(_utilities);

function tryCatch(fn, ctx, args) {
    var result = undefined,
        error = undefined;
    try {
        result = utils.callFunc(fn, ctx, args);
    } catch (e) {
        error = e;
    }
    return [result, error];
}

var Container = (function (_DIContainer) {
    _inherits(Container, _DIContainer);

    function Container(info) {
        _classCallCheck(this, Container);

        _get(Object.getPrototypeOf(Container.prototype), 'constructor', this).call(this, info);
        this.__instances = new Map();
    }

    _createClass(Container, [{
        key: 'hasInstance',
        value: function hasInstance(key) {
            return this.__instances.has(key);
        }
    }, {
        key: 'get',
        value: function get(key, targetKey) {
            var entry;
            if (key === null || key === undefined) {
                throw new _di.DIBadKeyError();
            }
            if (key === _di.DIContainer) {
                return this;
            }
            if (key instanceof _di.Resolver) {
                return key.get(this);
            }
            entry = this.entries.get(key);
            if (entry !== undefined) {
                return entry[0](this);
            }
            if (this.parent && this.parent.hasHandler(key)) {
                return this.parent.get(key, targetKey);
            }
            entry = _repository.Repository.any(key);
            if (entry != null) {
                this.register(entry);
                return this.entries.get(key)[0](this);
            }
            // No point in registrering a string
            if (typeof key === 'string') {
                throw new _typings.StickDependencyError('no component registered for key: ' + key);
            }
            this.autoRegister(key, targetKey);
            entry = this.entries.get(key);
            return entry[0](this);
        }
    }, {
        key: 'registerSingleton',
        value: function registerSingleton(key, fn) {
            var _this = this;

            var targetKey = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

            return this.registerHandler(key, function (x) {
                if (_this.__instances.has(key)) {
                    return _this.__instances.get(key);
                } else {
                    var singleton = _this.invoke(fn, null, targetKey);
                    _this.__instances.set(key, singleton);
                    return singleton;
                }
            });
        }
    }, {
        key: 'registerInstance',
        value: function registerInstance(key, instance) {
            var track = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

            _get(Object.getPrototypeOf(Container.prototype), 'registerInstance', this).call(this, key, instance);
            if (track) {
                this.__instances.set(key, instance);
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.__instances.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    this.destroy(key);
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
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            var key = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
            var fn = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            if (key == null) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this.__instances.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _key = _step2.value;

                        this.destroy(_key, fn);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                            _iterator2['return']();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                delete this.constructionInfo;
                //this.entries
                return;
            }
            var instance = this.__instances.get(key);
            if (instance) {
                if (fn) {
                    fn(instance);
                } else if (typeof instance.$destroy === 'function') {
                    instance.$destroy();
                }
                this.__instances['delete'](key);
                instance = void 0;
            } else {
                console.log('could not find key ', key);
            }
        }
    }, {
        key: 'register',
        value: function register(item) {
            switch (item.type) {
                case _internal.DependencyType.Controller:
                    this.registerTransient(item.name, item.handler);
                    break;
                case _internal.DependencyType.Service:
                    this.registerSingleton(item.name, item.handler);
                    break;
                case _internal.DependencyType.Factory:
                    if (typeof item.handler === 'function') {
                        (0, _internal.setActivator)(item.handler, _di.FactoryActivator.instance);
                        this.registerSingleton(item.name, item.handler);
                    } else {
                        this.registerInstance(item.name, item.handler);
                    }
                    break;
            }
        }
    }, {
        key: 'createChild',
        value: function createChild() {
            var child = new Container();
            child.parent = this;
            return child;
        }
    }]);

    return Container;
})(_di.DIContainer);

exports.Container = Container;