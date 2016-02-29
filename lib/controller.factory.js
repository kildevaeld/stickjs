"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var utils = require('utilities');
var eventsjs_1 = require('eventsjs');
var errors_1 = require('./errors');
var vnode_1 = require('templ/lib/vnode');
var debug = require('debug')('stick:factory:controller');
var wrap = function wrap(el, name, contextName) {
    var div = document.createElement('controller');
    div.setAttribute('name', name);
    if (contextName != name) div.setAttribute('as', contextName);
    div.appendChild(el);
    return div;
};

var ControllerFactory = function (_eventsjs_1$EventEmit) {
    _inherits(ControllerFactory, _eventsjs_1$EventEmit);

    function ControllerFactory(name, controller, container) {
        _classCallCheck(this, ControllerFactory);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ControllerFactory).call(this));

        _this.container = container;
        _this.controller = controller;
        _this.name = name;
        _this._id = utils.uniqueId("ctrl");
        if (typeof controller === 'function' && controller.name == "") {
            try {
                Object.defineProperty(controller, 'name', {
                    value: name
                });
            } catch (e) {}
        }
        debug("%s: Controller factory created: '%s', container %s", _this.id, name, _this.container.id);
        return _this;
    }

    _createClass(ControllerFactory, [{
        key: 'create',

        /**
         * Create an instance of a controller
         * @param  {ControllerCreateOptions} options
         * @return {utils.IPromise<any>}
         * Call onTemplateRender (), onElementAttached
         * emits before:template:render, template:render, before:element:attached, element:attached
         */
        value: function create(options) {
            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee() {
                var contextName, $state, template, controller, el;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!this.container.hasInstance(this.name)) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt('return', utils.Promise.resolve(this.container.get(this.name)));

                            case 2:
                                this.container.registerSingleton(this.name, this.controller);
                                contextName = options.contextName || this.name;
                                // State

                                _context.next = 6;
                                return this.container.get('$state');

                            case 6:
                                $state = _context.sent;

                                $state = $state.createChild(this.container, options.state);
                                this.container.registerInstance('$state', $state, true);
                                // Template
                                _context.next = 11;
                                return this.resolveTemplate($state, options);

                            case 11:
                                template = _context.sent;

                                debug("%s: Created template: %s", this.id, template.id);
                                this.container.registerInstance('template', template, true);
                                debug("%s: Instantiating controller '%s' as '%s'", this.id, this.name, contextName);
                                _context.next = 17;
                                return this.container.get(this.name);

                            case 17:
                                controller = _context.sent;

                                $state.set(contextName, controller);
                                template.setTarget(controller);
                                this.trigger('before:template:render');
                                el = template.render();
                                // Wrap element if its a DocumentFragment

                                if (el.nodeType === 11 || el.nodeType === 3) {
                                    if (el.children.length === 1) {
                                        el = el.firstChild.nodeType === 3 ? wrap(el, this.name, contextName) : el.firstChild;
                                    } else {
                                        el = wrap(el, this.name, contextName);
                                    }
                                }
                                this.container.registerInstance('$el', el, true);
                                if (typeof controller.onTemplateRender === 'function') {
                                    controller.onTemplateRender.call(controller, el, template);
                                }
                                this.trigger('template:render');
                                if (options.el) {
                                    this.trigger('before:element:attached', options.el);
                                    options.el.innerHTML = '';
                                    options.el.appendChild(el);
                                    if (typeof controller.onElementAttached === 'function') {
                                        controller.onElementAttached.call(controller, el, options.el);
                                    }
                                    this.trigger('element:attached', el, options.el);
                                }
                                return _context.abrupt('return', controller);

                            case 28:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: 'resolveTemplate',
        value: function resolveTemplate(state, options) {
            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee2() {
                var $template, $resolver, promise, _templateString, view, templateString;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.container.get('$templateCreator');

                            case 2:
                                $template = _context2.sent;
                                _context2.next = 5;
                                return this.container.get('$templateResolver');

                            case 5:
                                $resolver = _context2.sent;
                                promise = undefined;

                                if (!(options.el && !options.template)) {
                                    _context2.next = 12;
                                    break;
                                }

                                _templateString = options.el.innerHTML;

                                promise = utils.Promise.resolve(_templateString);
                                _context2.next = 20;
                                break;

                            case 12:
                                if (!options.template) {
                                    _context2.next = 19;
                                    break;
                                }

                                if (!(options.template instanceof vnode_1.Template)) {
                                    _context2.next = 16;
                                    break;
                                }

                                view = options.template.view(state, {
                                    container: this.container,
                                    parentView: options.parentView
                                });
                                return _context2.abrupt('return', view);

                            case 16:
                                promise = $resolver(options.template);
                                _context2.next = 20;
                                break;

                            case 19:
                                return _context2.abrupt('return', utils.Promise.reject(new errors_1.StickError("no element or template")));

                            case 20:
                                _context2.next = 22;
                                return promise;

                            case 22:
                                templateString = _context2.sent;
                                return _context2.abrupt('return', $template(templateString, state));

                            case 24:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee3() {
                var controller;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                debug("%s: Destroying controller '%s'", this.id, this.name);
                                _context3.next = 3;
                                return this.container.get(this.name);

                            case 3:
                                controller = _context3.sent;

                                if (typeof controller.onDestroy === 'function') {
                                    controller.onDestroy.call(controller);
                                }
                                this.container.clear();
                                this.container.entries.clear();

                            case 7:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }, {
        key: 'id',
        get: function get() {
            return this._id;
        }
    }]);

    return ControllerFactory;
}(eventsjs_1.EventEmitter);

exports.ControllerFactory = ControllerFactory;