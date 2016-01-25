import {Router, RouteHandler, IRouterOptions} from './router';
import {IContext} from '../../context';
import * as utils from 'utilities';
import {Container} from '../../container';
import {service, inject, config} from '../../annotations';
import {ControllerFactory} from '../../controller.factory';
import {ModuleFactory} from '../../module.factory';
import {decorator} from '../../stick';
import {isDependencyType, DependencyType} from '../../internal';

export interface RouteOptions {
	controller:string;
	template?:string;
	target?:string|HTMLElement;
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

export class RouterOptions implements IRouterOptions {
	execute: (callback:RouteHandler, name:string, args:any[]) => void
    pushState: boolean
    constructor () {
        this.execute = null;
        this.pushState = false;
    }
}



@config(RouterOptions)
@inject('$context', '$container', '$routerProvider')
@service('$router')
/** Router */
export class RouterService {
	router: Router
	context: IContext
	container:Container
	_currentController: ControllerFactory
	swap:any
	private  _target: HTMLElement;

	get target (): HTMLElement {
		return this._target;
	}
	set target (target:HTMLElement) {
		this._target = target
	}
	
	setTarget (target:HTMLElement|string) {
		if (typeof target === 'string') {
			target = <HTMLElement>document.querySelector(<string>target)
		}
		this.target = <HTMLElement>target
	}


	/**
	 * @param {IContext} ctx
	 * @param {Container} container
	 * @constructor RouterService
	 */
	constructor (ctx:IContext, container: Container, options:IRouterOptions={}) {
        console.log(options);
        options.execute = options.execute||utils.bind(this.__execute, this);
        this.router = new Router(options);
		this.context = ctx;
		this.container = container;
		this.router.history.start()
	}

	private swapElements (target:HTMLElement, element: HTMLElement) {

		if (this.swap) {
      this.swap(target, element);
			return
		}
    target.innerHTML = "";
    target.appendChild(element);
	}

	/**
	 * Notfound handler
	 * @param {RouteHandler|RouteOptions} handler
	 */
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

	public reload () {
		this.router.history.loadUrl()
	}


	/**
	 * Navigate to fragment
	 * @param {string} route   Fragment to navigate to
	 * @param {Object} options options
	 */
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
			} else if (options.target && options.target instanceof Element) {
				target = <HTMLElement>options.target;
			} else {
				target = this.target
			}

			if (target == null) {
				throw new Error('[router] target not defined')
			}

			let factory = this.container.get(options.controller);

			if (factory == null || (!(factory instanceof ControllerFactory) && !(factory instanceof ModuleFactory))) {
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