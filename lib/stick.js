'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

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
    var _internal_1$getDependencies = internal_1.getDependencies(definition);

    var _internal_1$getDependencies2 = _slicedToArray(_internal_1$getDependencies, 1);

    var fn = _internal_1$getDependencies2[0];

    if (fn && typeof fn === 'function') {
        repository_1.Repository.add(internal_1.DependencyType.Service, name, fn);
    } else {
        throw new typings_1.StickError('service should be a function');
    }
}
exports.service = service;
function factory(name, factory) {
    var _internal_1$getDependencies3 = internal_1.getDependencies(factory);

    var _internal_1$getDependencies32 = _slicedToArray(_internal_1$getDependencies3, 1);

    var fn = _internal_1$getDependencies32[0];

    if (!fn) throw new typings_1.StickError('factory');
    repository_1.Repository.add(internal_1.DependencyType.Factory, name, fn);
}
exports.factory = factory;
var container = new container_1.Container();
function _module(name) {
    var definition = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    if (definition == null) {
        var _factory = undefined;
        // Check if module already is defined
        if (container.hasHandler(name)) {
            _factory = container.get(name);
        } else if (repository_1.Repository.has(internal_1.DependencyType.Module, name)) {
            var result = repository_1.Repository.get(internal_1.DependencyType.Module, name);
            _factory = new module_factory_1.ModuleFactory(name, result.handler, container.createChild());
            container.registerInstance(name, _factory);
        } else {
            throw new typings_1.StickError('no module named ' + name);
        }
        return _factory;
    }

    var _internal_1$getDependencies4 = internal_1.getDependencies(definition);

    var _internal_1$getDependencies42 = _slicedToArray(_internal_1$getDependencies4, 2);

    var def = _internal_1$getDependencies42[0];
    var deps = _internal_1$getDependencies42[1];

    if (def) {
        var fn = undefined;
        if (typeof def !== 'function' && utils.isObject(def)) {
            var copy = utils.extend({}, def);
            if (typeof def.initialize === 'function') {
                fn = def.initialize;
                delete copy.initialize;
            } else if (typeof def.constructor === 'function') {
                fn = def.constructor;
                delete copy.constructor;
            }
            if (!deps || deps.length == 0) {
                internal_1.getDependencies(fn);
            } else {
                fn.inject = deps;
            }
            utils.assign(fn.prototype, copy);
        } else if (typeof def === 'function') {
            fn = def;
        }
        if (typeof fn !== 'function') {
            throw new typings_1.StickError('controller defition should be a function or an object literal');
        }
        var _factory2 = new module_factory_1.ModuleFactory(name, fn, container.createChild());
        container.registerInstance(name, _factory2, true);
        return _factory2;
    } else {
        throw new typings_1.StickError('controller defition should be a function or an object literal');
    }
}
exports.module = _module;
function component(name, handler) {
    var component = undefined;

    var _internal_1$getDependencies5 = internal_1.getDependencies(handler);

    var _internal_1$getDependencies52 = _slicedToArray(_internal_1$getDependencies5, 2);

    var c = _internal_1$getDependencies52[0];
    var deps = _internal_1$getDependencies52[1];

    if (typeof c === 'function') {
        component = {
            initialize: c
        };
    } else if (utils.isObject(c) && typeof c.initialize === 'function') {
        if (deps && deps.length) {
            c.initialize.inject = deps;
        } else {
            internal_1.getDependencies(c.initialize);
        }
        component = c;
    } else {
        throw new typings_1.StickError("component should be a function or an object");
    }
    var Component = utils.inherits(base_component_1.BaseComponent, component);
    templ.component(name, Component);
}
exports.component = component;
function attribute(name, handler) {
    templ.attribute(name, handler);
}
exports.attribute = attribute;
function decorator(name, decorator) {
    if (utils.has(exports.decorators, name)) {
        throw new Error('decorator called ' + name + ' already defined!');
    }
    exports.decorators[name] = decorator;
}
exports.decorator = decorator;
function modifier(name, modifier) {
    templ.modifier(name, modifier);
}
exports.modifier = modifier;