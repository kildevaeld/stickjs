import {getDependencies, DependencyType, setActivator} from './internal'
import {StickError} from './typings'
import {Repository} from './repository'
import * as utils from 'utilities'

import {ModuleFactory} from './module.factory'
import {Container, FactoryActivator} from './container'
import {AttributeDefinition, ComponentDefinition} from './template/index'
import {BaseComponent} from './template/components/base-component'
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

		return new ModuleFactory(name, fn, new Container())

		} else {
		throw new StickError("controller definition should be a function, function constructor or a object literal");
		}

		return null;
}


export function component(name: string, handler:ComponentDefinition|any[]) {

	let component: AttributeDefinition
	let [c, deps] = getDependencies(handler)

	if (typeof c === 'function') {
		component = {
			initialize: <any>c,
		}
	} else if (utils.isObject(c) && typeof (<any>c).initialize === 'function') {
		let fn = (<any>c)
		if (deps.length) {
			fn.initialize.inject = deps
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

export function attribute(name: string, handler: templ.vnode.AttributeConstructor) {
	templ.attribute(name, <any>handler);
}