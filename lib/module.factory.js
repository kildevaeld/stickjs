'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var internal_1 = require('./internal');
var repository_1 = require('./repository');
var typings_1 = require('./typings');
var di_1 = require('di');
var utils = require('utilities');
var vnode_1 = require('templ/lib/vnode');
var context_1 = require('./context');
var controller_factory_1 = require('./controller.factory');

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
            var _internal_1$getDependencies = internal_1.getDependencies(definition);

            var _internal_1$getDependencies2 = _slicedToArray(_internal_1$getDependencies, 2);

            var def = _internal_1$getDependencies2[0];
            var deps = _internal_1$getDependencies2[1];

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
                        internal_1.getDependencies(fn);
                    }
                    utils.assign(fn.prototype, copy);
                } else if (typeof def === 'function') {
                    fn = def;
                }
                if (typeof fn !== 'function') {
                    throw new typings_1.StickError('controller defition should be a function or an object literal');
                }
                internal_1.setDependencyType(internal_1.DependencyType.Controller)(fn);
                var factory = new controller_factory_1.ControllerFactory(name, fn, this.container.createChild());
                this.container.registerInstance(name, factory, true);
            } else {
                throw new typings_1.StickError("controller definition should be a function, function constructor or a object literal");
            }
            return this;
        }
    }, {
        key: 'service',
        value: function service(name, definition) {
            var _internal_1$getDependencies3 = internal_1.getDependencies(definition);

            var _internal_1$getDependencies32 = _slicedToArray(_internal_1$getDependencies3, 1);

            var fn = _internal_1$getDependencies32[0];

            if (fn && typeof fn === 'function') {
                internal_1.setDependencyType(internal_1.DependencyType.Service)(fn);
                this.container.registerService(name, fn);
            } else {
                throw new typings_1.StickError('service should be a function');
            }
            return this;
        }

        /**
         * Create a factory function
         * @param {String} name
         */
    }, {
        key: 'factory',
        value: function factory(name, _factory) {
            var _internal_1$getDependencies4 = internal_1.getDependencies(_factory);

            var _internal_1$getDependencies42 = _slicedToArray(_internal_1$getDependencies4, 1);

            var fn = _internal_1$getDependencies42[0];

            if (!fn) throw new typings_1.StickError('factory');
            if (typeof fn === 'function') {
                internal_1.setDependencyType(internal_1.DependencyType.Factory)(fn);
                internal_1.setActivator(fn, di_1.FactoryActivator.instance);
                this.container.registerSingleton(name, fn);
            } else {
                this.container.registerInstance(name, fn);
            }
            return this;
        }

        /**
         * Create a new instance of the module
         * @method create
         * @params {Object} options
         * @return {Promise}
         */
    }, {
        key: 'create',
        value: function create() {
            var _this = this;

            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            // There can only be one.
            if (this.container.hasInstance(this.name)) {
                return utils.Promise.resolve(this.container.get(this.name));
            }
            this.container.registerSingleton('$context', context_1.getContext());
            var ctx = this.container.get('$context');
            if (options.parent) {
                this.container.parent = options.parent;
                if (options.parent.hasHandler('$context')) {
                    ctx.__parent = options.parent.get('$context');
                }
            }
            if (options.template || options.el) {
                return this.resolveTemplate(ctx, options).then(function (template) {
                    _this.container.registerInstance("template", template, true);
                    if (options.el) {
                        var el = _this.container.get('template').render();
                        options.el.innerHTML = '';
                        options.el.appendChild(el);
                        _this.container.registerInstance('$elm', options.el, true);
                    }
                    ctx.$observe();
                    var mod = _this.container.get(_this.name);
                    ctx.$unobserve();
                    return mod;
                });
            }
            ctx.$observe();
            var mod = this.container.get(this.name);
            ctx.$unobserve();
            return utils.Promise.resolve(mod);
        }
    }, {
        key: 'configure',
        value: function configure(name) {
            var configName = name;
            if (!/Provider$/.test(name)) {
                configName = name + 'Provider';
            } else {
                name = name.replace('Provider', '');
            }
            var provider = undefined;
            // Check if provider is registered
            if (this.container.hasHandler(configName, false, false)) {
                return Promise.resolve(this.container.get(name));
            } else if (repository_1.Repository.has(internal_1.DependencyType.Service, name)) {
                var serv = repository_1.Repository.get(internal_1.DependencyType.Service, name);
                this.container.register(serv);
                if (this.container.hasHandler(configName, false, false)) {
                    return Promise.resolve(this.container.get(configName));
                }
            }
            return utils.Promise.reject(new Error('No provider for ' + name.replace('Provider', '')));
        }
    }, {
        key: 'resolveTemplate',
        value: function resolveTemplate(ctx, options) {
            var $template = this.container.get('$templateCreator');
            var promise = undefined;
            if (options.el) {
                if (options.template == null) {
                    promise = utils.Promise.resolve(options.el.innerHTML);
                }
            }
            if (!promise && options.template) {
                if (options.template instanceof vnode_1.Template) {
                    var view = options.template.view(ctx.__model, {
                        container: this.container
                    });
                    return utils.Promise.resolve(view);
                }
                promise = this.container.get('$templateResolver')(options.template);
            } else if (!options.el) {
                return utils.Promise.reject(new typings_1.StickError("no element or template"));
            }
            return promise.then(function (templateString) {
                return $template(templateString, ctx.__model);
            });
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            //this.container.destroy();
        }
    }]);

    return ModuleFactory;
})();

exports.ModuleFactory = ModuleFactory;