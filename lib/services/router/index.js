var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var router_1 = require('./router');
var utils = require('utilities');
var annotations_1 = require('../../annotations');
var di_1 = require('di');
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
let RouterService = class {
    /**
     * @param {IContext} ctx
     * @param {Container} container
     * @constructor RouterService
     */
    constructor(ctx, container) {
        this.router = new router_1.Router({
            execute: utils.bind(this.__execute, this)
        });
        this.context = ctx;
        this.container = container;
        this.router.history.start();
    }
    get target() {
        return this._target;
    }
    set target(target) {
        this._target = target;
    }
    swapElements(target, element) {
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
    else(handler) {
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
    route(route, handler) {
        if (typeof handler === 'function') {
            this.router.route(route, handler);
        }
        else if (utils.isObject(handler)) {
            this.router.route(route, this.__handleController(handler));
        }
        return this;
    }
    reload() {
        this.router.history.loadUrl();
    }
    /**
     * Navigate to fragment
     * @param {string} route   Fragment to navigate to
     * @param {Object} options options
     */
    navigate(route, options) {
        this.router.navigate(route, options);
    }
    __execute(callback, name, args) {
        if (this.container.hasHandler('$route')) {
            this.container.unregister('$route');
        }
        this.container.registerInstance('$route', {
            fragment: name,
            parameters: args
        });
        this.context.$call(callback, this.context, args);
    }
    __handleController(options) {
        if (!this.container.hasHandler(options.controller, true, true)) {
            throw new Error('[router] controller');
        }
        return (...args) => {
            let target;
            if (typeof options.target === 'string') {
                target = document.querySelector(options.target);
            }
            else if (options.target && options.target instanceof Element) {
                target = options.target;
            }
            else {
                target = this.target;
            }
            if (target == null) {
                throw new Error('[router] target not defined');
            }
            let factory = this.container.get(options.controller);
            if (factory == null || (!(factory instanceof controller_factory_1.ControllerFactory) && !(factory instanceof module_factory_1.ModuleFactory))) {
                throw new Error(`${options.controller} not a controller`);
            }
            factory.create({
                template: options.template,
                parent: this.container
            }).then(controller => {
                if (this._currentController != null) {
                    this._currentController.destroy();
                }
                this._currentController = factory;
                let template = factory.container.get('template');
                this.swapElements(target, template.render());
            });
        };
    }
    $destroy() {
        if (this.container.hasHandler('$route')) {
            this.container.unregister('$route');
        }
        if (this._currentController) {
            this._currentController.destroy();
            delete this._currentController;
        }
    }
};
RouterService = __decorate([
    di_1.inject('$context', '$container'),
    annotations_1.service('$router')
], RouterService);
exports.RouterService = RouterService;
