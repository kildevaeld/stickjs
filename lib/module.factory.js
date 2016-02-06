'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var internal_1 = require('./internal');
var eventsjs_1 = require('eventsjs');
var repository_1 = require('./repository');
var typings_1 = require('./typings');
var di_1 = require('di');
var utils = require('utilities');
var vnode_1 = require('templ/lib/vnode');
var state_1 = require('./context/state');
var controller_factory_1 = require('./controller.factory');

var ModuleFactory = function (_eventsjs_1$EventEmit) {
    _inherits(ModuleFactory, _eventsjs_1$EventEmit);

    function ModuleFactory(name, module, container) {
        _classCallCheck(this, ModuleFactory);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ModuleFactory).call(this));

        if (arguments.length != 3) {
            throw new Error();
        }
        _this.name = name;
        _this.module = module;
        _this.container = container;
        _this.container.registerSingleton(name, module);
        _this.container.registerInstance('$container', _this.container);
        return _this;
    }

    _createClass(ModuleFactory, [{
        key: 'controller',
        value: function controller(name, definition) {
            var _internal_1$getDepend = internal_1.getDependencies(definition);

            var _internal_1$getDepend2 = _slicedToArray(_internal_1$getDepend, 2);

            var def = _internal_1$getDepend2[0];
            var deps = _internal_1$getDepend2[1];

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
            var _internal_1$getDepend3 = internal_1.getDependencies(definition);

            var _internal_1$getDepend4 = _slicedToArray(_internal_1$getDepend3, 1);

            var fn = _internal_1$getDepend4[0];

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
            var _internal_1$getDepend5 = internal_1.getDependencies(_factory);

            var _internal_1$getDepend6 = _slicedToArray(_internal_1$getDepend5, 1);

            var fn = _internal_1$getDepend6[0];

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
         *
         * Call onTemplateRender (), onElementAttached
         * emits before:template:render, template:render, before:element:attached, element:attached
         *
        */

    }, {
        key: 'create',
        value: function create() {
            var _this2 = this;

            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            // There can only be one.
            if (this.container.hasInstance(this.name)) {
                return utils.Promise.resolve(this.container.get(this.name));
            }
            this.container.registerSingleton('$state', state_1.State);
            var state = this.container.get('$state');
            if (options.template || options.el) {
                return this.resolveTemplate(state, options).then(function (template) {
                    _this2.container.registerInstance("template", template, true);
                    var m = _this2.container.get(_this2.name);
                    template.setTarget(m);
                    //(<any>template)._target = m;
                    _this2.trigger('before:template:render');
                    var el = _this2.container.get('template').render();
                    if (el instanceof DocumentFragment) {
                        // FIXME:
                        if (el.children.length === 1) {} else {
                            var div = document.createElement('module');
                            div.appendChild(el);
                            el = div;
                        }
                    }
                    _this2.container.registerInstance('$el', el, true);
                    if (typeof m.onTemplateRender === 'function') {
                        m.onTemplateRender.call(m, el, template);
                    }
                    _this2.trigger('template:render');
                    if (options.el) {
                        _this2.trigger('before:element:attached', options.el);
                        options.el.innerHTML = '';
                        options.el.appendChild(el);
                        if (typeof m.onElementAttached === 'function') {
                            m.onElementAttached.call(m, el, options.el);
                        }
                        _this2.trigger('element:attached', el, options.el);
                    }
                    return m;
                });
            }
            return utils.Promise.resolve(this.container.get(this.name));
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
        value: function resolveTemplate(state, options) {
            var $template = this.container.get('$templateCreator');
            var promise = undefined;
            if (options.el) {
                if (options.template == null) {
                    promise = utils.Promise.resolve(options.el.innerHTML);
                }
            }
            if (!promise && options.template) {
                if (options.template instanceof vnode_1.Template) {
                    var view = options.template.view(state, {
                        container: this.container
                    });
                    return utils.Promise.resolve(view);
                }
                promise = this.container.get('$templateResolver')(options.template);
            } else if (!options.el) {
                return utils.Promise.reject(new typings_1.StickError("no element or template"));
            }
            return promise.then(function (templateString) {
                return $template(templateString, state);
            });
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            //this.container.destroy();
        }
    }]);

    return ModuleFactory;
}(eventsjs_1.EventEmitter);

exports.ModuleFactory = ModuleFactory;