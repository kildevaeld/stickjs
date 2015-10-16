import {Container} from './container'
import {getDependencies, setActivator, DependencyType, setDependencyType} from './internal'
import {StickError} from './typings'
import {FactoryActivator} from 'di'
import * as utils from 'utilities'

import {getContext, IContext} from './context'

import {TemplateCreator} from './services/template'
import {ControllerFactory} from './controller.factory'

export type ControllerDefinition = FunctionConstructor|Object|any[];

export interface ModuleCreateOptions {
	el?: HTMLElement
}

export class ModuleFactory {
	name: string
	module: FunctionConstructor
	container: Container
	
	constructor(name:string, module:FunctionConstructor, container:Container) {
		if (arguments.length != 3) {
			throw new Error();
		}
		
		this.name = name
		this.module = module
		this.container = container
	
		this.container.registerSingleton(name, module);
		this.container.registerInstance('$container', this.container);
	}
	
	controller (name:string, definition:ControllerDefinition): ModuleFactory {
		
		let [def, deps] = getDependencies(definition)
		
		if (def) {
			let fn
			if (typeof def !== 'function' && utils.isObject(def)) {
				let copy = utils.extend({}, def);
				if (typeof (<any>def).initialize === 'function') {
					fn = (<any>def).initialize
					delete (<any>copy).initialize
				} else if (typeof def.constructor === 'function') {
					fn = def.constructor
					delete copy.constructor
				}
				
				if (!deps || deps.length == 0) {
					getDependencies(fn);
				}
				
				utils.assign(fn.prototype, copy);
				
			} else if (typeof def === 'function') {
				fn = def
			}
			
			if (typeof fn !== 'function') {
				throw new StickError('controller defition should be a function or an object literal')
			}
			setDependencyType(DependencyType.Controller)(fn);
			
			let factory = new ControllerFactory(name,fn, this.container.createChild());
			this.container.registerInstance(name, factory, true);
			
		} else {
			throw new StickError("controller definition should be a function, function constructor or a object literal");
		}
		
		return this
	}
	
	service (name:string|FunctionConstructor, definition:Function): ModuleFactory {
		let [fn] = getDependencies(definition);
		
		if (fn && typeof fn === 'function') {
			setDependencyType(DependencyType.Service)(fn);
			this.container.registerSingleton(name, fn);
			
		} else {
			throw new StickError('service should be a function');
		}
		
		return this
	}
	
	factory (name:string, factory:any|any[]): ModuleFactory {
		
		let [fn] = getDependencies(factory);
		
		if (!fn) throw new StickError('factory');
		
		if (typeof fn === 'function') {
			setDependencyType(DependencyType.Factory)(fn);
			setActivator(fn, FactoryActivator.instance);
			this.container.registerSingleton(name, fn)
		} else {
			this.container.registerInstance(name, fn);	
		}
	
		return this;
	}
	
	create (options:ModuleCreateOptions = {}): utils.IPromise<any> {
		
		if (this.container.hasInstance(this.name)) {
			return utils.Promise.resolve(this.container.get(this.name));
		}
		
		
		this.container.registerSingleton('$context', getContext());
		
		let ctx: IContext = this.container.get('$context');
		
		if (options.el) {
			
			let $template: TemplateCreator = this.container.get('$templateCreator');
			
			let templateString = options.el.innerHTML;
			this.factory('template', ['$context', (ctx) => {
				return $template(templateString, (<any>ctx).__model)
			}]);
		}
		
		if (options.el) {
			let el = this.container.get('template').render()
			options.el.innerHTML = '';
			options.el.appendChild(el);	
		}
		
		ctx.$observe()
		let mod = this.container.get(this.name);
		ctx.$unobserve();
		
		return utils.Promise.resolve(mod)
	}
	
	
	destroy () {
		this.container.destroy();
	}
}