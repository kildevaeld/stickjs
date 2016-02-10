'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
var stick_di_1 = require('stick.di');
var errors_1 = require('./errors');
var repository_1 = require('./repository');
var internal_1 = require('./internal');
var utils = require('utilities');
var controller_factory_1 = require('./controller.factory');
__export(require('stick.di'));
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
exports.tryCatch = tryCatch;
// TODO: Handle instances in unregister

var Container = function (_stick_di_1$DIContain) {
    _inherits(Container, _stick_di_1$DIContain);

    function Container(info) {
        _classCallCheck(this, Container);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Container).call(this, info));

        _this.__instances = new Map();
        return _this;
    }

    _createClass(Container, [{
        key: 'hasInstance',
        value: function hasInstance(key) {
            return this.__instances.has(key);
        }
    }, {
        key: 'hasHandler',
        value: function hasHandler(name, parent, repository) {
            var has = _get(Object.getPrototypeOf(Container.prototype), 'hasHandler', this).call(this, name, parent);
            return !has && repository ? repository_1.Repository.hasAny(name) : has;
        }
    }, {
        key: 'get',
        value: function get(key, targetKey) {
            var entry;
            if (key === null || key === undefined) {
                throw new stick_di_1.DIBadKeyError();
            }
            if (key === stick_di_1.DIContainer) {
                return this;
            }
            if (key instanceof stick_di_1.Resolver) {
                return key.get(this);
            }
            entry = this.entries.get(key);
            if (entry !== undefined) {
                return entry[0](this);
            }
            if (this.parent && this.parent.hasHandler(key)) {
                return this.parent.get(key, targetKey);
            }
            entry = repository_1.Repository.any(key);
            if (entry != null) {
                this.register(entry);
                return this.entries.get(key)[0](this);
            }
            // No point in registrering a string
            if (typeof key === 'string') {
                throw new errors_1.StickDependencyError('no component registered for key: ' + key);
            }
            this.autoRegister(key, targetKey);
            entry = this.entries.get(key);
            return entry[0](this);
        }
    }, {
        key: 'registerSingleton',
        value: function registerSingleton(key, fn) {
            var _this2 = this;

            var targetKey = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

            return this.registerHandler(key, function (x) {
                if (_this2.__instances.has(key)) {
                    return _this2.__instances.get(key);
                } else {
                    var singleton = _this2.invoke(fn, null, targetKey);
                    _this2.__instances.set(key, singleton);
                    return singleton;
                }
            });
        }
    }, {
        key: 'registerService',
        value: function registerService(key, fn) {
            var _this3 = this;

            var targetKey = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

            var name = undefined;
            if (typeof key === 'string') {
                name = key;
            } else {
                name = key.name;
            }
            var configKey = name + 'Provider';
            var Config = stick_di_1.Metadata.getOwn(internal_1.DIServiceConfig, fn, targetKey);
            if (Config != null) {
                if (this.hasHandler(configKey, false, false)) {
                    throw new Error('Provider for \'' + name + '\' already defined');
                }
                var config = new Config();
                this.registerInstance(configKey, config);
            }
            return this.registerHandler(key, function (x) {
                if (_this3.__instances.has(key)) {
                    return _this3.__instances.get(key);
                } else {
                    var singleton = _this3.invoke(fn, null, targetKey);
                    _this3.__instances.set(key, singleton);
                    _this3.unregister(configKey);
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
            var keys = this.__instances.keys();
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    this.destroy(key);
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
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                delete this.constructionInfo;
                this.constructionInfo = new Map();
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
                this.__instances.delete(key);
                instance = void 0;
            } else {
                console.log('could not find key ', key);
            }
        }
    }, {
        key: 'register',
        value: function register(item) {
            switch (item.type) {
                case internal_1.DependencyType.Controller:
                    var factory = new controller_factory_1.ControllerFactory(item.name, item.handler, this.createChild());
                    this.registerInstance(item.name, factory, true);
                    break;
                case internal_1.DependencyType.Service:
                    this.registerService(item.name, item.handler);
                    break;
                case internal_1.DependencyType.Factory:
                    if (typeof item.handler === 'function') {
                        internal_1.setActivator(item.handler, stick_di_1.FactoryActivator.instance);
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
}(stick_di_1.DIContainer);

exports.Container = Container;