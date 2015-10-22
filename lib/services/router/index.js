var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
import { Router } from './router';
import * as utils from 'utilities';
import { service } from '../../annotations';
import { inject } from 'di';
import { ControllerFactory } from '../../controller.factory';
import { decorator } from '../../stick';
import { isDependencyType, DependencyType } from '../../internal';
decorator("route", function () {
    return function (target) {
        if (!isDependencyType(target, DependencyType.Controller)) {
            throw new Error('[route] target not a controller');
        }
    };
});
export let RouterService = class {
    /**
     * @param {IContext} ctx
     * @param {Container} container
     * @constructor RouterService
     */
    constructor(ctx, container) {
        this.router = new Router({
            execute: utils.bind(this.__execute, this)
        });
        this.context = ctx;
        this.container = container;
        this.router.history.start();
    }
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
    __execute(callback, args) {
        this.context.$call(callback, this.context, args);
    }
    __handleController(options) {
        console.log('has handler', name);
        if (!this.container.hasHandler(options.controller, true, true)) {
            throw new Error('[router] controller');
        }
        return (...args) => {
            let target;
            if (typeof options.target === 'string') {
                target = document.querySelector(options.target);
            }
            else {
                target = options.target;
            }
            let factory = this.container.get(options.controller);
            if (factory == null || !(factory instanceof ControllerFactory)) {
                throw new Error('controller');
            }
            factory.create({
                template: options.template
            }).then(controller => {
                if (this._currentController != null) {
                    this._currentController.destroy();
                }
                this._currentController = factory;
                let template = factory.container.get('template');
                target.innerHTML = '';
                target.appendChild(template.render());
            });
        };
    }
    $destroy() {
        if (this._currentController) {
            this._currentController.destroy();
            delete this._currentController;
        }
    }
};
RouterService = __decorate([
    inject('$context', '$container'),
    service('$router')
], RouterService);
