"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _router = require('./router');

var _utilities = require('utilities');

var utils = _interopRequireWildcard(_utilities);

var _annotations = require('../../annotations');

var _di = require('di');

var _controllerFactory = require('../../controller.factory');

var _moduleFactory = require('../../module.factory');

var _stick = require('../../stick');

var _internal = require('../../internal');

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2:
            return decorators.reduceRight(function (o, d) {
                return d && d(o) || o;
            }, target);
        case 3:
            return decorators.reduceRight(function (o, d) {
                return (d && d(target, key), void 0);
            }, void 0);
        case 4:
            return decorators.reduceRight(function (o, d) {
                return d && d(target, key, o) || o;
            }, desc);
    }
};

(0, _stick.decorator)("route", function () {
    return function (target) {
        if (!(0, _internal.isDependencyType)(target, _internal.DependencyType.Controller)) {
            throw new Error('[route] target not a controller');
        }
    };
});
var RouterService = (function () {
    /**
     * @param {IContext} ctx
     * @param {Container} container
     * @constructor RouterService
     */

    function RouterService(ctx, container) {
        _classCallCheck(this, RouterService);

        this.router = new _router.Router({
            execute: utils.bind(this.__execute, this)
        });
        this.context = ctx;
        this.container = container;
        this.router.history.start();
    }

    _createClass(RouterService, [{
        key: "swapElements",
        value: function swapElements(target, element) {
            if (this.swap) {
                this.swap(target, element);
                return;
            }
            target.innerHTML = "";
            target.appendChild(element);
        }
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
                } else {
                    target = options.target;
                }
                var factory = _this.container.get(options.controller);
                if (factory == null || !(factory instanceof _controllerFactory.ControllerFactory) && !(factory instanceof _moduleFactory.ModuleFactory)) {
                    console.log(factory);
                    throw new Error('controller is');
                }
                factory.create({
                    template: options.template,
                    el: target,
                    parent: _this.container
                }).then(function (controller) {
                    if (_this._currentController != null) {
                        _this._currentController.destroy();
                    }
                    _this._currentController = factory;
                    var template = factory.container.get('template');
                    //target.innerHTML = '';
                    _this.swapElements(target, template.render());
                    //target.appendChild(template.render())
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
    }]);

    return RouterService;
})();
exports.RouterService = RouterService;
exports.RouterService = RouterService = __decorate([(0, _di.inject)('$context', '$container'), (0, _annotations.service)('$router')], RouterService);