'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _internal = require('./internal');

var _typings = require('./typings');

var _di = require('di');

var _utilities = require('utilities');

var utils = _interopRequireWildcard(_utilities);

var _context = require('./context');

var _controllerFactory = require('./controller.factory');

var _observer = require('./observer');

var ModuleFactory = (function () {
    function ModuleFactory(name, module, container) {
        _classCallCheck(this, ModuleFactory);

        if (arguments.length != 3) {
            throw new Error();
        }
        this.name = name;
        this.module = module;
        this.container = container;
        this.container.registerSingleton(name, module);
        this.container.registerInstance('$container', this.container);
    }

    _createClass(ModuleFactory, [{
        key: 'controller',
        value: function controller(name, definition) {
            var _getDependencies = (0, _internal.getDependencies)(definition);

            var _getDependencies2 = _slicedToArray(_getDependencies, 2);

            var def = _getDependencies2[0];
            var deps = _getDependencies2[1];

            if (def) {
                var fn = undefined;
                if (typeof def !== 'function' && utils.isObject(def)) {
                    var copy = utils.extend({}, def);
                    if (typeof def.initialize === 'function') {
                        fn = def.initialize;
                        delete copy.initialize;
                    } else if (typeof def.constructor === 'function') {
                        fn = def.constructor;
                        delete copy.constructor;
                    }
                    if (!deps || deps.length == 0) {
                        (0, _internal.getDependencies)(fn);
                    }
                    utils.assign(fn.prototype, copy);
                } else if (typeof def === 'function') {
                    fn = def;
                }
                if (typeof fn !== 'function') {
                    throw new _typings.StickError('controller defition should be a function or an object literal');
                }
                (0, _internal.setDependencyType)(_internal.DependencyType.Controller)(fn);
                var factory = new _controllerFactory.ControllerFactory(name, fn, this.container.createChild());
                this.container.registerInstance(name, factory, true);
            } else {
                throw new _typings.StickError("controller definition should be a function, function constructor or a object literal");
            }
            return this;
        }
    }, {
        key: 'service',
        value: function service(name, definition) {
            var _getDependencies3 = (0, _internal.getDependencies)(definition);

            var _getDependencies32 = _slicedToArray(_getDependencies3, 1);

            var fn = _getDependencies32[0];

            if (fn && typeof fn === 'function') {
                (0, _internal.setDependencyType)(_internal.DependencyType.Service)(fn);
                this.container.registerSingleton(name, fn);
            } else {
                throw new _typings.StickError('service should be a function');
            }
            return this;
        }
    }, {
        key: 'factory',
        value: function factory(name, _factory) {
            var _getDependencies4 = (0, _internal.getDependencies)(_factory);

            var _getDependencies42 = _slicedToArray(_getDependencies4, 1);

            var fn = _getDependencies42[0];

            if (!fn) throw new _typings.StickError('factory');
            if (typeof fn === 'function') {
                (0, _internal.setDependencyType)(_internal.DependencyType.Factory)(fn);
                (0, _internal.setActivator)(fn, _di.FactoryActivator.instance);
                this.container.registerSingleton(name, fn);
            } else {
                this.container.registerInstance(name, fn);
            }
            return this;
        }
    }, {
        key: 'create',
        value: function create() {
            var _this = this;

            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            if (this.container.hasInstance(this.name)) {
                return utils.Promise.resolve(this.container.get(this.name));
            }
            this.container.registerSingleton('$context', (0, _context.getContext)());
            var ctx = this.container.get('$context');
            if (options.parent) {
                this.container.parent = options.parent;
                if (options.parent.hasHandler('$context')) {
                    ctx.__parent = options.parent.get('$context');
                }
            }
            if (options.el) {
                (function () {
                    // Add mutation observer
                    var observer = new _observer.Observer();
                    _this.container.registerInstance('$observer', observer, true);
                    // Instatiate template
                    var $template = _this.container.get('$templateCreator');
                    var templateString = options.el.innerHTML;
                    _this.factory('template', ['$context', function (ctx) {
                        return $template(templateString, ctx.__model);
                    }]);
                })();
            }
            if (options.el) {
                var el = this.container.get('template').render();
                options.el.innerHTML = '';
                options.el.appendChild(el);
                this.container.registerInstance('$elm', options.el, true);
            }
            ctx.$observe();
            var mod = this.container.get(this.name);
            ctx.$unobserve();
            return utils.Promise.resolve(mod);
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.container.destroy();
        }
    }]);

    return ModuleFactory;
})();

exports.ModuleFactory = ModuleFactory;