"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) {
            return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) {
                resolve(value);
            });
        }
        function onfulfill(value) {
            try {
                step("next", value);
            } catch (e) {
                reject(e);
            }
        }
        function onreject(value) {
            try {
                step("throw", value);
            } catch (e) {
                reject(e);
            }
        }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
var internal_1 = require('./internal');
var eventsjs_1 = require('eventsjs');
var repository_1 = require('./repository');
var errors_1 = require('./errors');
var di_1 = require('di');
var utils = require('utilities');
var vnode_1 = require('templ/lib/vnode');
var state_1 = require('./state');
var controller_factory_1 = require('./controller.factory');
//import {Observer} from './observer'
var debug = require('debug')('stick:factory:module');
var wrap = function wrap(el, name) {
    var div = document.createElement('module');
    div.setAttribute('name', name);
    //if (contextName != this.name) div.setAttribute('as', contextName);
    div.appendChild(el);
    return div;
};

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
        if (typeof module === 'function' && module.name == "") {
            Object.defineProperty(module, 'name', {
                value: name
            });
        }
        _this._id = utils.uniqueId("mod");
        debug("%s: Module factory created: '%s', container: %s", _this.id, name, _this.container.id);
        _this.container.registerSingleton(name, module);
        _this.container.registerInstance('$container', _this.container);
        return _this;
    }

    _createClass(ModuleFactory, [{
        key: "controller",
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
                    throw new errors_1.StickError('controller defition should be a function or an object literal');
                }
                internal_1.setDependencyType(internal_1.DependencyType.Controller)(fn);
                var factory = new controller_factory_1.ControllerFactory(name, fn, this.container.createChild());
                this.container.registerInstance(name, factory, true);
                debug("%s: Register controller: '%s', %s", this.id, name, factory.id);
            } else {
                throw new errors_1.StickError("controller definition should be a function, function constructor or a object literal");
            }
            return this;
        }
    }, {
        key: "service",
        value: function service(name, definition) {
            var _internal_1$getDepend3 = internal_1.getDependencies(definition);

            var _internal_1$getDepend4 = _slicedToArray(_internal_1$getDepend3, 1);

            var fn = _internal_1$getDepend4[0];

            if (fn && typeof fn === 'function') {
                internal_1.setDependencyType(internal_1.DependencyType.Service)(fn);
                this.container.registerService(name, fn);
                debug("%s Register service %s", this.id, name);
            } else {
                throw new errors_1.StickError('service should be a function');
            }
            return this;
        }
        /**
         * Create a factory function
         * @param {String} name
         */

    }, {
        key: "factory",
        value: function factory(name, _factory) {
            var _internal_1$getDepend5 = internal_1.getDependencies(_factory);

            var _internal_1$getDepend6 = _slicedToArray(_internal_1$getDepend5, 1);

            var fn = _internal_1$getDepend6[0];

            if (!fn) throw new errors_1.StickError('factory');
            debug("%s Register factory %s", this.id, name);
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
        key: "create",
        value: function create() {
            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee() {
                var state, template, mod, el;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!this.container.hasInstance(this.name)) {
                                    _context.next = 3;
                                    break;
                                }

                                debug("%s: Resolving module %s", this.id, this.name);
                                //return utils.Promise.resolve(this.container.get(this.name));
                                return _context.abrupt("return", this.container.get(this.name));

                            case 3:
                                this.container.registerSingleton('$state', state_1.State);
                                _context.next = 6;
                                return this.container.get('$state');

                            case 6:
                                state = _context.sent;

                                debug("%s: Creating module %s", this.id, this.name);

                                if (!(options.template || options.el)) {
                                    _context.next = 27;
                                    break;
                                }

                                _context.next = 11;
                                return this.resolveTemplate(state, options);

                            case 11:
                                template = _context.sent;

                                debug("%s: Created template: %s", this.id, template.id);
                                this.container.registerInstance('template', template, true);
                                debug("%s: Instantiating module '%s'", this.id, this.name);
                                _context.next = 17;
                                return this.container.get(this.name);

                            case 17:
                                mod = _context.sent;

                                template.setTarget(mod);
                                //$state.set(contextName, controller);
                                this.trigger('before:template:render');
                                el = template.render();

                                if (el.nodeType === 11 || el.nodeType === 3) {
                                    if (el.children.length === 1) {
                                        el = el.firstChild.nodeType === 3 ? wrap(el, this.name) : el.firstChild;
                                    } else {
                                        el = wrap(el, this.name);
                                    }
                                }
                                this.container.registerInstance('$el', el, true);
                                if (typeof mod.onTemplateRender === 'function') {
                                    mod.onTemplateRender.call(mod, el, template);
                                }
                                this.trigger('template:render');
                                if (options.el) {
                                    this.trigger('before:element:attached', options.el);
                                    options.el.innerHTML = '';
                                    options.el.appendChild(el);
                                    if (typeof mod.onElementAttached === 'function') {
                                        mod.onElementAttached.call(mod, el, options.el);
                                    }
                                    this.trigger('element:attached', el, options.el);
                                }
                                return _context.abrupt("return", mod);

                            case 27:
                                return _context.abrupt("return", this.container.get(this.name));

                            case 28:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "configure",
        value: function configure(name) {
            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee2() {
                var configName, provider, serv;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                configName = name;

                                if (!/Provider$/.test(name)) {
                                    configName = name + 'Provider';
                                } else {
                                    name = name.replace('Provider', '');
                                }
                                provider = undefined;
                                // Check if provider is registered

                                if (!this.container.hasHandler(configName, false, false)) {
                                    _context2.next = 7;
                                    break;
                                }

                                return _context2.abrupt("return", this.container.get(name));

                            case 7:
                                if (!repository_1.Repository.has(internal_1.DependencyType.Service, name)) {
                                    _context2.next = 12;
                                    break;
                                }

                                serv = repository_1.Repository.get(internal_1.DependencyType.Service, name);

                                this.container.register(serv);

                                if (!this.container.hasHandler(configName, false, false)) {
                                    _context2.next = 12;
                                    break;
                                }

                                return _context2.abrupt("return", this.container.get(configName));

                            case 12:
                                throw new Error('No provider for ' + name.replace('Provider', ''));

                            case 13:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: "resolveTemplate",
        value: function resolveTemplate(state, options) {
            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee3() {
                var $template, $resolver, promise, _templateString, view, templateString;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.container.get('$templateCreator');

                            case 2:
                                $template = _context3.sent;
                                _context3.next = 5;
                                return this.container.get('$templateResolver');

                            case 5:
                                $resolver = _context3.sent;
                                promise = undefined;

                                if (!(options.el && !options.template)) {
                                    _context3.next = 12;
                                    break;
                                }

                                _templateString = options.el.innerHTML;

                                promise = utils.Promise.resolve(_templateString);
                                _context3.next = 20;
                                break;

                            case 12:
                                if (!options.template) {
                                    _context3.next = 19;
                                    break;
                                }

                                if (!(options.template instanceof vnode_1.Template)) {
                                    _context3.next = 16;
                                    break;
                                }

                                view = options.template.view(state, {
                                    container: this.container
                                });
                                return _context3.abrupt("return", view);

                            case 16:
                                promise = $resolver(options.template);
                                _context3.next = 20;
                                break;

                            case 19:
                                return _context3.abrupt("return", utils.Promise.reject(new errors_1.StickError("no element or template")));

                            case 20:
                                _context3.next = 22;
                                return promise;

                            case 22:
                                templateString = _context3.sent;
                                return _context3.abrupt("return", $template(templateString, state));

                            case 24:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }, {
        key: "destroy",
        value: function destroy() {
            //this.container.destroy();
        }
    }, {
        key: "id",
        get: function get() {
            return this._id;
        }
    }]);

    return ModuleFactory;
}(eventsjs_1.EventEmitter);

exports.ModuleFactory = ModuleFactory;