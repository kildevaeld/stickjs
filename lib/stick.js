'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports.service = service;
exports.factory = factory;
exports.module = _module;
exports.component = component;
exports.attribute = attribute;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _internal = require('./internal');

var _typings = require('./typings');

var _repository = require('./repository');

var _utilities = require('utilities');

var utils = _interopRequireWildcard(_utilities);

var _moduleFactory = require('./module.factory');

var _container = require('./container');

var _templateComponentsBaseComponent = require('./template/components/base-component');

var _templ = require('templ');

var templ = _interopRequireWildcard(_templ);

var _annotations = require('./annotations');

var annotations = _interopRequireWildcard(_annotations);

var decorators = annotations;
exports.decorators = decorators;

function service(name, definition) {
    var _getDependencies = (0, _internal.getDependencies)(definition);

    var _getDependencies2 = _slicedToArray(_getDependencies, 1);

    var fn = _getDependencies2[0];

    if (fn && typeof fn === 'function') {
        _repository.Repository.add(_internal.DependencyType.Service, name, fn);
    } else {
        throw new _typings.StickError('service should be a function');
    }
}

function factory(name, factory) {
    var _getDependencies3 = (0, _internal.getDependencies)(factory);

    var _getDependencies32 = _slicedToArray(_getDependencies3, 1);

    var fn = _getDependencies32[0];

    if (!fn) throw new _typings.StickError('factory');
    _repository.Repository.add(_internal.DependencyType.Factory, name, fn);
}

var container = new _container.Container();

function _module(name, definition) {
    if (definition == null) {
        var _factory = undefined;
        if (container.hasHandler(name)) {
            _factory = container.get(name);
        } else if (_repository.Repository.has(_internal.DependencyType.Module, name)) {
            var result = _repository.Repository.get(_internal.DependencyType.Module, name);
            _factory = new _moduleFactory.ModuleFactory(name, result.handler, container.createChild());
            container.registerInstance(name, _factory);
        } else {
            throw new _typings.StickError('no module named ' + name);
        }
        return _factory;
    }

    var _getDependencies4 = (0, _internal.getDependencies)(definition);

    var _getDependencies42 = _slicedToArray(_getDependencies4, 2);

    var def = _getDependencies42[0];
    var deps = _getDependencies42[1];

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
                (0, _internal.getDependencies)(fn);
            }
            utils.assign(fn.prototype, copy);
        } else if (typeof def === 'function') {
            fn = def;
        }
        if (typeof fn !== 'function') {
            throw new _typings.StickError('controller defition should be a function or an object literal');
        }
        return new _moduleFactory.ModuleFactory(name, fn, new _container.Container());
    } else {
        throw new _typings.StickError("controller definition should be a function, function constructor or a object literal");
    }
    return null;
}

function component(name, handler) {
    var component = undefined;

    var _getDependencies5 = (0, _internal.getDependencies)(handler);

    var _getDependencies52 = _slicedToArray(_getDependencies5, 2);

    var c = _getDependencies52[0];
    var deps = _getDependencies52[1];

    if (typeof c === 'function') {
        component = {
            initialize: c
        };
    } else if (utils.isObject(c) && typeof c.initialize === 'function') {
        var fn = c;
        if (deps.length) {
            fn.initialize.inject = deps;
        } else {
            (0, _internal.getDependencies)(c.initialize);
        }
        component = c;
    } else {
        throw new _typings.StickError("component should be a function or an object");
    }
    var Component = utils.inherits(_templateComponentsBaseComponent.BaseComponent, component);
    templ.component(name, Component);
}

function attribute(name, handler) {
    templ.attribute(name, handler);
}