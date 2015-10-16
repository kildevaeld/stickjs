import {getDependencies, DependencyType} from './internal'
import {StickError} from './typings'
import {Repository} from './repository'
import * as utils from 'utilities'

import {ModuleFactory} from './module.factory'
import {Container} from './container'

import * as templ from 'templ';


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
		if (container.hasHandler(name)) {
			factory = container.get(name)
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
			}

			utils.assign(fn.prototype, copy);

		} else if (typeof def === 'function') {
			fn = def
		}

		if (typeof fn !== 'function') {
			throw new StickError('controller defition should be a function or an object literal')
		}

		return new ModuleFactory(name, fn, new Container())

		} else {
		throw new StickError("controller definition should be a function, function constructor or a object literal");
		}

		return null;
}

export interface ComponentDefinition {
	initialize?: () => void
	update?: () => void
}

export interface AttributeDefinition {
	initialize?: () => void
	update?: () => void
}

export function component(name: string, handler: templ.vnode.ComponentConstructor | ComponentDefinition) {
	templ.component(name, <any>handler);
}

export function attribute(name: string, handler: templ.vnode.AttributeConstructor) {
	templ.attribute(name, <any>handler);
}