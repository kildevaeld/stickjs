"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var router_1 = require('./router');
var utils = require('utilities');
var annotations_1 = require('../../annotations');
var controller_factory_1 = require('../../controller.factory');
var module_factory_1 = require('../../module.factory');
var stick_1 = require('../../stick');
var internal_1 = require('../../internal');
stick_1.decorator("route", function () {
    return function (target) {
        if (!internal_1.isDependencyType(target, internal_1.DependencyType.Controller)) {
            throw new Error('[route] target not a controller');
        }
    };
});

var RouterOptions = function RouterOptions() {
    _classCallCheck(this, RouterOptions);

    this.execute = null;
    this.pushState = false;
};

exports.RouterOptions = RouterOptions;
var RouterService = function () {
    /**
     * @param {IContext} ctx
     * @param {Container} container
     * @constructor RouterService
     */

    function RouterService(ctx, container) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, RouterService);

        console.log(options);
        options.execute = options.execute || utils.bind(this.__execute, this);
        this.router = new router_1.Router(options);
        this.context = ctx;
        this.container = container;
        this.router.history.start();
    }

    _createClass(RouterService, [{
        key: "setTarget",
        value: function setTarget(target) {
            if (typeof target === 'string') {
                target = document.querySelector(target);
            }
            this.target = target;
        }
    }, {
        key: "swapElements",
        value: function swapElements(target, element) {
            if (this.swap) {
                this.swap(target, element);
                return;
            }
            target.innerHTML = "";
            target.appendChild(element);
        }
        /**
         * Notfound handler
         * @param {RouteHandler|RouteOptions} handler
         */

    }, {
        key: "else",
        value: function _else(handler) {
            if (typeof handler !== 'function') {
                handler = this.__handleController(handler);
            }
            this.router.history.on('route:unmatched', handler);
        }
        /**
         * @param  {string|RegExp} route
         * @param  {RouteHandler|RouteOptions} handler
         * @return {RouterService} RouterService
         */

    }, {
        key: "route",
        value: function route(_route, handler) {
            if (typeof handler === 'function') {
                this.router.route(_route, handler);
            } else if (utils.isObject(handler)) {
                this.router.route(_route, this.__handleController(handler));
            }
            return this;
        }
    }, {
        key: "reload",
        value: function reload() {
            this.router.history.loadUrl();
        }
        /**
         * Navigate to fragment
         * @param {string} route   Fragment to navigate to
         * @param {Object} options options
         */

    }, {
        key: "navigate",
        value: function navigate(route, options) {
            this.router.navigate(route, options);
        }
    }, {
        key: "__execute",
        value: function __execute(callback, name, args) {
            if (this.container.hasHandler('$route')) {
                this.container.unregister('$route');
            }
            this.container.registerInstance('$route', {
                fragment: name,
                parameters: args
            });
            this.context.$call(callback, this.context, args);
        }
    }, {
        key: "__handleController",
        value: function __handleController(options) {
            var _this = this;

            if (!this.container.hasHandler(options.controller, true, true)) {
                throw new Error('[router] controller');
            }
            return function () {
                var target = undefined;
                if (typeof options.target === 'string') {
                    target = document.querySelector(options.target);
                } else if (options.target && options.target instanceof Element) {
                    target = options.target;
                } else {
                    target = _this.target;
                }
                if (target == null) {
                    throw new Error('[router] target not defined');
                }
                var factory = _this.container.get(options.controller);
                if (factory == null || !(factory instanceof controller_factory_1.ControllerFactory) && !(factory instanceof module_factory_1.ModuleFactory)) {
                    throw new Error(options.controller + " not a controller");
                }
                factory.create({
                    template: options.template,
                    parent: _this.container
                }).then(function (controller) {
                    if (_this._currentController != null) {
                        _this._currentController.destroy();
                    }
                    _this._currentController = factory;
                    var template = factory.container.get('template');
                    _this.swapElements(target, template.render());
                });
            };
        }
    }, {
        key: "$destroy",
        value: function $destroy() {
            if (this.container.hasHandler('$route')) {
                this.container.unregister('$route');
            }
            if (this._currentController) {
                this._currentController.destroy();
                delete this._currentController;
            }
        }
    }, {
        key: "target",
        get: function get() {
            return this._target;
        },
        set: function set(target) {
            this._target = target;
        }
    }]);

    return RouterService;
}();
RouterService = __decorate([annotations_1.config(RouterOptions), annotations_1.inject('$context', '$container', '$routerProvider'), annotations_1.service('$router')], RouterService);
exports.RouterService = RouterService;