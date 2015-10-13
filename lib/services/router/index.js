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
export let RouterService = class {
    constructor(ctx, container) {
        this.router = new Router({
            execute: utils.bind(this.__execute, this)
        });
        this.context = ctx;
        this.container = container;
        this.router.history.start();
    }
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
        if (!this.container.hasHandler(options.controller)) {
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
                console.log('ctroller', controller);
                if (this._currentController != null) {
                    this._currentController.destroy();
                }
                this._currentController = factory;
                let template = factory.container.get('template');
                target.innerHTML = '';
                target.appendChild(template.render());
            });
            /*let target: HTMLElement;
            if (typeof options.target === 'string') {
                target = <HTMLElement>document.querySelector(<string>options.target)
            } else {
                target = <HTMLElement>options.target;
            }
            
            
            let templateResolver = <TemplateResolver>this.container.get('templateResolver');
            
            let controller = this.container.get(options.controller);
            templateResolver.resolve(options.template)
            .then( (str) => {
                if (!str) {
                    throw new Error('template');
                }
                
                let ctx = controller.ctx;
            
                let template = templ.compile(str, {
                    viewClass: <any>TemplateView
                })
            
                let view = <any>template.view(ctx.model, {
                    container: this.container,
                    delegator: new EventDelegator(controller, ctx, this.container)
                });
                
                controller.template = view
                
                target.appendChild(view.render())
                
            })	*/
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
