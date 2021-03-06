import {getDependencies, DependencyType, setActivator} from './internal'
import {StickError} from './errors'
import {Repository} from './repository'
import * as utils from 'orange'

import {ModuleFactory} from './module.factory'
import {Container, FactoryActivator} from './container'
import {AttributeDefinition, ComponentDefinition} from './template/index'
import {BaseComponent} from './template/components/base-component'
import {AttributeConstructor} from 'templ/lib/vnode';
import * as templ from 'templ';
import * as annotations from './decorators'

declare const require:any;
const debug = require('debug')('stick');

export {Repository} from './repository'
export {ModuleFactory} from './module.factory';

export function service(name: string, definition: Function) {
		let [fn] = getDependencies(definition);

		if (fn && typeof fn === 'function') {
		Repository.add(DependencyType.Service, name, fn);
		} else {
		throw new StickError('service should be a function');
		}
}

export function factory(name: string, factory: any | any[]) {
		
		let [fn] = getDependencies(factory);

		if (!fn) throw new StickError('factory');

		Repository.add(DependencyType.Factory, name, fn);

}


const container = new Container();

export function module(name: string, definition: Function | Object | any[] = null): ModuleFactory {

	if (definition == null) {
		let factory;
		// Check if module already is defined
		if (container.hasHandler(name)) {
			factory = container.get(name)
		// Check if the module is in the repository
		} else if (Repository.has(DependencyType.Module, name)) {
			let result = Repository.get(DependencyType.Module, name);
			factory = new ModuleFactory(name, result.handler, container.createChild());
			container.registerInstance(name, factory);
		} else {
			throw new StickError(`no module named ${name}`);
		}
		return factory;
	}


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
			} else {
				fn.inject = deps;
			}

			utils.assign(fn.prototype, copy);

		} else if (typeof def === 'function') {
			fn = def
		}

		if (typeof fn !== 'function') {
			throw new StickError('controller defition should be a function or an object literal')
		}

		let factory = new ModuleFactory(name, fn, container.createChild())
		container.registerInstance(name, factory, true);
		return factory

	} else {
		throw new StickError('controller defition should be a function or an object literal')
	}

}


export function component(name: string, handler: ComponentDefinition|Function) {

	//let component: ComponentDefinition
	let Component: any

	if (typeof handler === 'function') {
		/*component = {
			initialize: <any>handler,
		}*/
		Component = handler;
	} else if (utils.isObject(handler) && typeof (<any>handler).initialize === 'function') {
		Component = utils.inherits(<any>BaseComponent, handler);
		//component = <ComponentDefinition>handler;
	} else {
		throw new StickError("component should be a function or an object");
	}

	//let Component = utils.inherits(<any>BaseComponent, component)
    debug('defining component: %s', name);
	templ.component(name, Component);
}

export function attribute(name: string, handler: AttributeConstructor) {
    debug('defining attribute: %s', name);
	templ.attribute(name, <any>handler);
}

export function decorator(name: string, decorator: any) {
	if (utils.has(annotations, name)) {
		throw new Error(`decorator called ${name} already defined!`);
	}
	annotations[name] = decorator;
}

export function modifier(name: string, modifier: (value:any) => any) {
    debug('defining modifier: %s', name);
	templ.modifier(name, modifier);
}