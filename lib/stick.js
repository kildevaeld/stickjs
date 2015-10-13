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

var _templ = require('templ');

var templ = _interopRequireWildcard(_templ);

function service(name, definition) {
    var _getDependencies = (0, _internal.getDependencies)(definition);

    var _getDependencies2 = _slicedToArray(_getDependencies, 1);

    var fn = _getDependencies2[0];

    if (fn && typeof fn === 'function') {
        _repository.Repository.add(_internal.DependencyType.Service, name, fn);
    } else {
        throw new _typings.StickError('service should be a function');
    }
    return this;
}

function factory(name, factory) {
    var _getDependencies3 = (0, _internal.getDependencies)(factory);

    var _getDependencies32 = _slicedToArray(_getDependencies3, 1);

    var fn = _getDependencies32[0];

    if (!fn) throw new _typings.StickError('factory');
    _repository.Repository.add(_internal.DependencyType.Factory, name, fn);
    return this;
}

function _module(name, definition) {
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
    return this;
}

function component(name, handler) {
    templ.component(name, handler);
}

function attribute(name, handler) {
    templ.attribute(name, handler);
}