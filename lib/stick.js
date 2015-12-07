var internal_1 = require('./internal');
var typings_1 = require('./typings');
var repository_1 = require('./repository');
var utils = require('utilities');
var module_factory_1 = require('./module.factory');
var container_1 = require('./container');
var base_component_1 = require('./template/components/base-component');
var templ = require('templ');
var annotations = require('./annotations');
exports.decorators = annotations;
function service(name, definition) {
    let [fn] = internal_1.getDependencies(definition);
    if (fn && typeof fn === 'function') {
        repository_1.Repository.add(internal_1.DependencyType.Service, name, fn);
    }
    else {
        throw new typings_1.StickError('service should be a function');
    }
}
exports.service = service;
function factory(name, factory) {
    let [fn] = internal_1.getDependencies(factory);
    if (!fn)
        throw new typings_1.StickError('factory');
    repository_1.Repository.add(internal_1.DependencyType.Factory, name, fn);
}
exports.factory = factory;
const container = new container_1.Container();
function module(name, definition) {
    if (definition == null) {
        let factory;
        // Check if module already is defined
        if (container.hasHandler(name)) {
            factory = container.get(name);
        }
        else if (repository_1.Repository.has(internal_1.DependencyType.Module, name)) {
            let result = repository_1.Repository.get(internal_1.DependencyType.Module, name);
            factory = new module_factory_1.ModuleFactory(name, result.handler, container.createChild());
            container.registerInstance(name, factory);
        }
        else {
            throw new typings_1.StickError(`no module named ${name}`);
        }
        return factory;
    }
    let [def, deps] = internal_1.getDependencies(definition);
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
                internal_1.getDependencies(fn);
            }
            else {
                fn.inject = deps;
            }
            utils.assign(fn.prototype, copy);
        }
        else if (typeof def === 'function') {
            fn = def;
        }
        if (typeof fn !== 'function') {
            throw new typings_1.StickError('controller defition should be a function or an object literal');
        }
        let factory = new module_factory_1.ModuleFactory(name, fn, container.createChild());
        container.registerInstance(name, factory, true);
        return factory;
    }
    else {
        throw new typings_1.StickError('controller defition should be a function or an object literal');
    }
}
exports.module = module;
function component(name, handler) {
    let component;
    let [c, deps] = internal_1.getDependencies(handler);
    if (typeof c === 'function') {
        component = {
            initialize: c,
        };
    }
    else if (utils.isObject(c) && typeof c.initialize === 'function') {
        let fn = c;
        if (deps && deps.length) {
            fn.initialize.inject = deps;
        }
        else {
            internal_1.getDependencies(c.initialize);
        }
        component = c;
    }
    else {
        throw new typings_1.StickError("component should be a function or an object");
    }
    let Component = utils.inherits(base_component_1.BaseComponent, component);
    templ.component(name, Component);
}
exports.component = component;
function attribute(name, handler) {
    templ.attribute(name, handler);
}
exports.attribute = attribute;
function decorator(name, decorator) {
    if (utils.has(exports.decorators, name)) {
        throw new Error(`decorator called ${name} already defined!`);
    }
    exports.decorators[name] = decorator;
}
exports.decorator = decorator;
function modifier(name, modifier) {
    templ.modifier(name, modifier);
}
exports.modifier = modifier;
