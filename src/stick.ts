import {getDependencies, DependencyType, setActivator} from './internal'
import {StickError} from './typings'
import {Repository} from './repository'
import * as utils from 'utilities'

import {ModuleFactory} from './module.factory'
import {Container, FactoryActivator} from './container'
import {AttributeDefinition, ComponentDefinition} from './template/index'
import {BaseComponent} from './template/components/base-component'
import {AttributeConstructor} from 'templ/lib/vnode';
import * as templ from 'templ';
import * as annotations from './annotations'

export const decorators = annotations

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

export function module(name: string, definition: Function | Object | any[]) {

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


export function component(name: string, handler: ComponentDefinition | any[]) {

	let component: AttributeDefinition
	let [c, deps] = getDependencies(handler)

	if (typeof c === 'function') {
		component = {
			initialize: <any>c,
		}
	} else if (utils.isObject(c) && typeof (<any>c).initialize === 'function') {
		if (deps && deps.length) {
			(<any>c).initialize.inject = deps
		} else {
			getDependencies((<any>c).initialize);
		}

		component = c;
	} else {
		throw new StickError("component should be a function or an object");
	}

	let Component = utils.inherits(<any>BaseComponent, component)

	templ.component(name, Component);
}

export function attribute(name: string, handler: AttributeConstructor) {
	templ.attribute(name, <any>handler);
}

export function decorator(name: string, decorator: any) {
	if (utils.has(decorators, name)) {
		throw new Error(`decorator called ${name} already defined!`);
	}
	decorators[name] = decorator;
}

export function modifier(name: string, modifier: (value:any) => any) {
	templ.modifier(name, modifier);
}