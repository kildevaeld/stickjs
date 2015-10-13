var internal_1 = require('./internal');
var typings_1 = require('./typings');
var repository_1 = require('./repository');
var utils = require('utilities');
var module_factory_1 = require('./module.factory');
var container_1 = require('./container');
var templ = require('templ');
function service(name, definition) {
    let [fn] = internal_1.getDependencies(definition);
    if (fn && typeof fn === 'function') {
        repository_1.Repository.add(internal_1.DependencyType.Service, name, fn);
    }
    else {
        throw new typings_1.StickError('service should be a function');
    }
    return this;
}
exports.service = service;
function factory(name, factory) {
    let [fn] = internal_1.getDependencies(factory);
    if (!fn)
        throw new typings_1.StickError('factory');
    repository_1.Repository.add(internal_1.DependencyType.Factory, name, fn);
    return this;
}
exports.factory = factory;
function module(name, definition) {
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
            utils.assign(fn.prototype, copy);
        }
        else if (typeof def === 'function') {
            fn = def;
        }
        if (typeof fn !== 'function') {
            throw new typings_1.StickError('controller defition should be a function or an object literal');
        }
        return new module_factory_1.ModuleFactory(name, fn, new container_1.Container());
    }
    else {
        throw new typings_1.StickError("controller definition should be a function, function constructor or a object literal");
    }
    return this;
}
exports.module = module;
function component(name, handler) {
    templ.component(name, handler);
}
exports.component = component;
function attribute(name, handler) {
    templ.attribute(name, handler);
}
exports.attribute = attribute;
