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

export interface RouteOptions {
	controller:string
	template?:string
	target?:string|HTMLElement
}

@inject('$context', '$container')
@service('$router')
export class RouterService {
	router: Router
	context: IContext
	container:Container
	constructor (ctx:IContext, container: Container) {
		this.router = new Router({
			execute: utils.bind(this.__execute, this)
		})
		this.context = ctx;
		this.container = container;
		this.router.history.start()
	}
	
	route (route:string|RegExp, handler:RouteHandler|RouteOptions): RouterService {
		
		if (typeof handler === 'function') {
			this.router.route(route, <RouteHandler>handler)
		} else if (utils.isObject(handler)) {
			this.router.route(route, this.__handleController(<RouteOptions>handler));
		}
		
		return this
	}
	
	private __execute (callback:RouteHandler, args:any[]) {
		
		this.context.$call(callback,this.context,args)
	}
	
	private __handleController(options:RouteOptions): RouteHandler {
		
		if (!this.container.hasHandler(options.controller)) {
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
			
			if (factory == null || !(factory instanceof ControllerFactory)) {
				throw new Error('controller')
			}
			
			factory.create({
				template: options.template
			}).then(controller => {
				let template = factory.container.get('template');
				target.innerHTML = '';
				target.appendChild(template.render())
			})
			
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
			
			
		}
	}
}