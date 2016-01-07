import {Container} from './container'
import {getDependencies, setActivator, DependencyType, setDependencyType} from './internal'
import {StickError} from './typings'
import {FactoryActivator} from 'di'
import * as utils from 'utilities'
import {Template} from 'templ/lib/vnode'
import {TemplateView} from './template/template.view'
import {getContext, IContext} from './context'

import {TemplateCreator} from './services/template'
import {ControllerFactory} from './controller.factory'
import {Observer} from './observer'

export type ControllerDefinition = FunctionConstructor|Object|any[];

export interface ModuleCreateOptions {
	el?: HTMLElement
	parent?:Container
  template?: string | Template
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
	
	/**
	 * Create a factory function
	 * @param {String} name
	 */
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

	/**
	 * Create a new instance of the module
	 * @method create
	 * @params {Object} options 
	 * @return {Promise}
	 */
	create (options:ModuleCreateOptions = {}): utils.IPromise<any> {
		// There can only be one.
		if (this.container.hasInstance(this.name)) {
			return utils.Promise.resolve(this.container.get(this.name));
		}

		this.container.registerSingleton('$context', getContext());

		let ctx: IContext = this.container.get('$context');

		if (options.parent) {
      this.container.parent = options.parent;
      if (options.parent.hasHandler('$context')) {
        (<any>ctx).__parent = options.parent.get('$context');
      }
		}

		if (options.template || options.el) {

			return this.resolveTemplate(ctx, options)
			.then((template) => {

        this.container.registerInstance("template", template, true);


        if (options.el) {
          let el = this.container.get('template').render()
          options.el.innerHTML = '';
          options.el.appendChild(el);
          this.container.registerInstance('$elm', options.el, true)
        }

        ctx.$observe()
        let mod = this.container.get(this.name);
        ctx.$unobserve();

			})


		} 
		
		ctx.$observe()
		let mod = this.container.get(this.name);
		ctx.$unobserve();

		return utils.Promise.resolve(mod)
	}

  private resolveTemplate(ctx: IContext, options: ModuleCreateOptions): utils.IPromise<TemplateView> {
    let $template: TemplateCreator = this.container.get('$templateCreator');
    let promise: utils.IPromise<string>
    if (options.el) {
      let templateString = options.el.innerHTML;
      promise = utils.Promise.resolve(templateString)
    } else if (options.template) {
      if (options.template instanceof Template) {
        let view = (<Template>options.template).view((<any>ctx).__model, {
          container: this.container
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
		//this.container.destroy();
	}
}