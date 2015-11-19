import {Router, RouteHandler} from './router'
//import {classtype, ClassType} from '../../internal'
import {bind} from 'utilities'
import {IContext} from '../../context'
import * as utils from 'utilities'
import {Container} from '../../container'
import {service} from '../../annotations'
import * as templ from 'templ'
import {inject} from 'di'
import {ControllerFactory} from '../../controller.factory'
import {ModuleFactory} from '../../module.factory'
import {decorator} from '../../stick'
import {isDependencyType, DependencyType} from '../../internal'
export interface RouteOptions {
	controller:string
	template?:string
	target?:string|HTMLElement
}


decorator("route", function () : ClassDecorator {
	return function (target:Function) {
		if (!isDependencyType(target, DependencyType.Controller)) {
			throw new Error('[route] target not a controller');
		}

	}
})

export interface Route {
	fragment: string
	parameters: string[]
}


@inject('$context', '$container')
@service('$router')
/** Router */
export class RouterService {
	router: Router
	context: IContext
	container:Container
	_currentController: ControllerFactory
	swap:any
	/**
	 * @param {IContext} ctx
	 * @param {Container} container
	 * @constructor RouterService
	 */
	constructor (ctx:IContext, container: Container) {
    this.router = new Router({
      execute: <any>utils.bind(this.__execute, this)
    });
		this.context = ctx;
		this.container = container;
		this.router.history.start()
	}

	public swapElements (target:HTMLElement, element: HTMLElement) {

		if (this.swap) {
      this.swap(target, element);
			return
		}
    target.innerHTML = "";
    target.appendChild(element);
	}

	public else(handler:RouteHandler|RouteOptions) {
		if (typeof handler !== 'function') {
			handler = this.__handleController(<RouteOptions>handler);
		}

		this.router.history.on('route:unmatched', <RouteHandler>handler);
	}


	/**
	 * @param  {string|RegExp} route
	 * @param  {RouteHandler|RouteOptions} handler
	 * @return {RouterService} RouterService
	 */
	public route (route:string|RegExp, handler:RouteHandler|RouteOptions): RouterService {

		if (typeof handler === 'function') {
			this.router.route(route, <RouteHandler>handler)
		} else if (utils.isObject(handler)) {
			this.router.route(route, this.__handleController(<RouteOptions>handler));
		}

		return this
	}


	public navigate(route: string, options) {
		this.router.navigate(route, options);
	}

	private __execute (callback:RouteHandler, name: string, args:any[]) {
		if (this.container.hasHandler('$route')) {
			this.container.unregister('$route');
		}

		this.container.registerInstance('$route', {
			fragment: name,
			parameters: args
		});

		this.context.$call(callback,this.context,args)
	}

	private __handleController(options:RouteOptions): RouteHandler {
		if (!this.container.hasHandler(options.controller, true, true)) {
			throw new Error('[router] controller');
		}

		return (...args:any[]) => {

			let target: HTMLElement;
			if (typeof options.target === 'string') {
				target = <HTMLElement>document.querySelector(<string>options.target)
			} else {
				target = <HTMLElement>options.target;
			}

			let factory = this.container.get(options.controller);

			if (factory == null || (!(factory instanceof ControllerFactory) && !(factory instanceof ModuleFactory))) {
        console.log(factory);
        throw new Error('controller is');
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


				this.swapElements(target, template.render())

			})

		}
	}

	$destroy () {
		if (this.container.hasHandler('$route')) {
			this.container.unregister('$route');
		}
		if (this._currentController) {
			this._currentController.destroy();
			delete this._currentController;
		}
	}
}