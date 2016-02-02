import {Container} from './container'
import {getDependencies, setActivator, DependencyType, setDependencyType} from './internal'
import {EventEmitter} from 'eventsjs';
import {Repository} from './repository';
import {StickError} from './typings'
import {FactoryActivator} from 'di'
import * as utils from 'utilities'
import {Template} from 'templ/lib/vnode'
import {TemplateView} from './template/template.view'
import {State} from './context/state';

import {TemplateCreator} from './services/template'
import {ControllerFactory} from './controller.factory'
//import {Observer} from './observer'

export type ControllerDefinition = FunctionConstructor | Object | any[];

export interface ModuleCreateOptions {
	el?: HTMLElement
	parent?: Container
	template?: string | Template
}

export class ModuleFactory extends EventEmitter {
	name: string
	module: FunctionConstructor
	container: Container

	constructor(name: string, module: FunctionConstructor, container: Container) {
		super();
		if (arguments.length != 3) {
			throw new Error();
		}

		this.name = name
		this.module = module
		this.container = container

		this.container.registerSingleton(name, module);
		this.container.registerInstance('$container', this.container);
	}

	controller(name: string, definition: ControllerDefinition): ModuleFactory {

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

			let factory = new ControllerFactory(name, fn, this.container.createChild());
			this.container.registerInstance(name, factory, true);

		} else {
			throw new StickError("controller definition should be a function, function constructor or a object literal");
		}

		return this;
		}

	service(name: string | FunctionConstructor, definition: Function): ModuleFactory {
		let [fn] = getDependencies(definition);

		if (fn && typeof fn === 'function') {
			setDependencyType(DependencyType.Service)(fn);
			this.container.registerService(name, fn);
		} else {
			throw new StickError('service should be a function');
		}

		return this
	}

	/**
	 * Create a factory function
	 * @param {String} name
	 */
		factory(name: string, factory: any | any[]): ModuleFactory {

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
	 *
	 * Call onTemplateRender (), onElementAttached
	 * emits before:template:render, template:render, before:element:attached, element:attached
	 *
	*/
	create(options: ModuleCreateOptions = {}): utils.IPromise<any> {
		// There can only be one.
		if (this.container.hasInstance(this.name)) {
			return utils.Promise.resolve(this.container.get(this.name));
		}

		this.container.registerSingleton('$state', State);

		let state: State = this.container.get('$state');

		if (options.template || options.el) {
			return this.resolveTemplate(state, options)
			.then((template) => {

				this.container.registerInstance("template", template, true);

				let m = this.container.get(this.name);
				template.setTarget(m);
				//(<any>template)._target = m;

				this.trigger('before:template:render');

				let el = this.container.get('template').render()

				if (el instanceof DocumentFragment) {
					if (el.children.length === 1) {
						el = el.firstChild();
					} else {
						let div = document.createElement('module');
						div.appendChild(el);
						el = div;
					}
				}

				this.container.registerInstance('$el', el, true);

				if (typeof m.onTemplateRender === 'function') {
					m.onTemplateRender.call(m, el, template);
				}

				this.trigger('template:render');

 				if (options.el) {
					this.trigger('before:element:attached', options.el);
					options.el.innerHTML = '';
					options.el.appendChild(el);
					if (typeof m.onElementAttached === 'function') {
						m.onElementAttached.call(m, el, options.el);
					}
					this.trigger('element:attached', el, options.el)
				}

				return m;
			});
		}

		return utils.Promise.resolve(this.container.get(this.name))
	}

		public configure<T>(name: string): utils.IPromise<T> {
				let configName = name;
				if (!/Provider$/.test(name)) {
						configName = name + 'Provider';
				} else {
						name = name.replace('Provider', '');
				}

				let provider;
				// Check if provider is registered
				if (this.container.hasHandler(configName, false, false)) {
						return Promise.resolve(this.container.get(name));
						// Register module, if exists, at try loading the provider again
				} else if (Repository.has(DependencyType.Service, name)) {
						let serv = Repository.get(DependencyType.Service, name);
						this.container.register(serv);
						if (this.container.hasHandler(configName, false, false)) {
								return Promise.resolve(this.container.get(configName));
						}
				}

				return utils.Promise.reject(new Error('No provider for ' + name.replace('Provider', '')));
		}

		private resolveTemplate(state: State, options: ModuleCreateOptions): utils.IPromise<TemplateView> {
				let $template: TemplateCreator = this.container.get('$templateCreator');
				let promise: utils.IPromise<string>
				if (options.el) {
						if (options.template == null) {
								promise = utils.Promise.resolve(options.el.innerHTML)
						}
				}

				if (!promise && options.template) {
						if (options.template instanceof Template) {
								let view = (<Template>options.template).view(state, {
										container: this.container
								});
								return utils.Promise.resolve(view);
						}


						promise = this.container.get('$templateResolver')(options.template);

				} else if (!options.el) {
						return utils.Promise.reject(new StickError("no element or template"));
				}

				return promise.then((templateString) => {
						return $template(templateString, state);
				})
		}


		destroy() {
				//this.container.destroy();
		}
}