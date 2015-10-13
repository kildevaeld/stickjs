import {Container} from './container';
import * as utils from 'utilities';
import {IContext} from './context'
import {setActivator} from './internal'
import {FactoryActivator} from 'di'
import {TemplateCreator, TemplateResolver} from './services/template'
import {StickError} from './typings'
import {TemplateView} from './template/template.view'
import * as templ from 'templ';

export interface ControllerCreateOptions {
	el?: HTMLElement
	template?: string|templ.vnode.Template
}

export class ControllerFactory {
	controller: FunctionConstructor
	container: Container
	name: string
	constructor (name:string, controller:FunctionConstructor, container:Container) {
		this.container = container
		this.controller = controller
		this.name = name;
		this.container.registerSingleton(name, controller);
		
	}
		
	create (options?:ControllerCreateOptions): utils.IPromise<any> {
		
		if (this.container.hasInstance(this.name)) {
			return utils.Promise.resolve(this.container.get(this.name));
		}
		
		let $context: IContext = this.container.get('$context');
		

		this.container.registerInstance('$context', $context.$createChild(), true);
		
		$context = this.container.get('$context');
		console.log(this.container)
		return this.resolveTemplate($context, options)
		.then( template => {
			this.container.registerInstance('template', template, true);
			
			$context.$observe();
			let controller = this.container.get(this.name);
			$context.$unobserve();
			
			if (options.el) {
				options.el.innerHTML = '';
				options.el.appendChild(template.render());
			}
			return controller;
		});
		
		
	}
	
	resolveTemplate(ctx:IContext, options:ControllerCreateOptions): utils.IPromise<TemplateView> {
		let $template: TemplateCreator = this.container.get('$templateCreator');
		let promise: utils.IPromise<string>
		if (options.el) {
			let templateString = options.el.innerHTML;
			promise = utils.Promise.resolve(templateString)
		} else if (options.template) {
			if (options.template instanceof templ.vnode.Template) {
				let view = (<templ.vnode.Template>options.template).view((<any>ctx).__model, {
					container:this.container
				});
				return utils.Promise.resolve(view);
			}
			
			promise = this.container.get('$templateResolver')(options.template)
			
		} else {
			return utils.Promise.reject(new StickError("no element or template"));
		}
		
		return promise.then((templateString) => {
			return $template(templateString, (<any>ctx).__model)	
		})
	}
	
	destroy () {
		this.container.clear();
	}
}