import { getDependencies, DependencyType } from './internal';
import { StickError } from './typings';
import { Repository } from './repository';
import * as utils from 'utilities';
import { ModuleFactory } from './module.factory';
import { Container } from './container';
import * as templ from 'templ';
export function service(name, definition) {
    let [fn] = getDependencies(definition);
    if (fn && typeof fn === 'function') {
        Repository.add(DependencyType.Service, name, fn);
    }
    else {
        throw new StickError('service should be a function');
    }
}
export function factory(name, factory) {
    let [fn] = getDependencies(factory);
    if (!fn)
        throw new StickError('factory');
    Repository.add(DependencyType.Factory, name, fn);
}
const container = new Container();
export function module(name, definition) {
    if (definition == null) {
        let factory;
        if (container.hasHandler(name)) {
            factory = container.get(name);
        }
        else if (Repository.has(DependencyType.Module, name)) {
            let result = Repository.get(DependencyType.Module, name);
            factory = new ModuleFactory(name, result.handler, container.createChild());
            container.registerInstance(name, factory);
        }
        else {
            throw new StickError(`no module named ${name}`);
        }
        return factory;
    }
    let [def, deps] = getDependencies(definition);
    if (def) {
        let fn;
        if (typeof def !== 'function' && utils.isObject(def)) {
            let copy = utils.extend({}, def);
            if (typeof def.initialize === 'function') {
                fn = def.initialize;
                delete copy.initialize;
            }
            else if (typeof def.constructor === 'function') {
                fn = def.constructor;
                delete copy.constructor;
            }
            if (!deps || deps.length == 0) {
                getDependencies(fn);
            }
            utils.assign(fn.prototype, copy);
        }
        else if (typeof def === 'function') {
            fn = def;
        }
        if (typeof fn !== 'function') {
            throw new StickError('controller defition should be a function or an object literal');
        }
        return new ModuleFactory(name, fn, new Container());
    }
    else {
        throw new StickError("controller definition should be a function, function constructor or a object literal");
    }
    return null;
}
export function component(name, handler) {
    templ.component(name, handler);
}
export function attribute(name, handler) {
    templ.attribute(name, handler);
}
