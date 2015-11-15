'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.getFunctionParameters = getFunctionParameters;
exports.getDependencies = getDependencies;
exports.resolveDependencies = resolveDependencies;
exports.setDependencyType = setDependencyType;
exports.getDependencyType = getDependencyType;
exports.isDependencyType = isDependencyType;
exports.setActivator = setActivator;
exports.setDependencyResolver = setDependencyResolver;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _utilities = require('utilities');

var utils = _interopRequireWildcard(_utilities);

var _di = require('di');

var paramRegEx = /function[^(]*\(([^)]*)\)/i;

function getFunctionParameters(fn) {
    var cache = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var params = _di.Metadata.getOwn(_di.Metadata.paramTypes, fn);
    if (!params) {
        var match = fn.toString().match(paramRegEx);
        if (match) {
            params = match[1].replace(/,/, ' ').split(' ').map(function (x) {
                return x.replace(',', '').trim();
            }).filter(function (m) {
                return m !== '';
            });
            if (cache) _di.Metadata.define(_di.Metadata.paramTypes, params, fn, undefined);
        }
    }
    return params || [];
}

var DependencyType;
exports.DependencyType = DependencyType;
(function (DependencyType) {
    DependencyType[DependencyType["Service"] = 0] = "Service";
    DependencyType[DependencyType["Module"] = 1] = "Module";
    DependencyType[DependencyType["Controller"] = 2] = "Controller";
    DependencyType[DependencyType["Factory"] = 3] = "Factory";
})(DependencyType || (exports.DependencyType = DependencyType = {}));
var Metakey;
exports.Metakey = Metakey;
(function (Metakey) {
    Metakey[Metakey["DependencyType"] = 0] = "DependencyType";
    Metakey[Metakey["Template"] = 1] = "Template";
})(Metakey || (exports.Metakey = Metakey = {}));
var DIServiceConfig = "mobyjs:service:config";
exports.DIServiceConfig = DIServiceConfig;

function getDependencies(fn) {
    var dependencies = undefined;
    if (fn.constructor === Array) {
        // TODO: Check for function
        var tmp = fn.pop();
        dependencies = fn;
        fn = tmp;
        fn.inject = dependencies;
    } else if (typeof fn === 'function') {
        dependencies = utils.result(fn, "inject");
        if (!dependencies || dependencies.length == 0) {
            var _fn = fn;
            // FIXME: Find a way not to delete type scripts type descriptions
            // But as it is now, context will be inferred as an Object
            if (_fn.__metadata__ && _fn.__metadata__.undefined['design:paramtypes']) {
                delete _fn.__metadata__.undefined['design:paramtypes'];
            }
            dependencies = getFunctionParameters(fn);
            _fn.inject = dependencies;
        }
    } else {
        return [fn, null];
    }
    return [fn, dependencies];
}

function tryCatch(fn) {
    var val = undefined,
        err = undefined;
    try {
        val = fn();
    } catch (e) {
        err = e;
    }
    return [val, err];
}

function resolveDependencies(target, container) {
    var i = undefined,
        ii = undefined,
        ret = undefined,
        inject = target.inject;
    if (!inject) {
        return utils.Promise.resolve([]);
    }
    for (i = 0, ii = inject.length; i < ii; i++) {
        ret = tryCatch(function () {
            return container.get(inject[i]);
        });
        if (ret[1] != null) return utils.Promise.reject(ret[1]);
        inject[i] = ret[0];
    }
    return utils.Promise.all(inject);
}

function setDependencyType(type) {
    return function (target) {
        var str = Metakey[Metakey.DependencyType];
        _di.Metadata.define(str, type, target, undefined);
    };
}

function getDependencyType(target) {
    var key = Metakey[Metakey.DependencyType],
        type = _di.Metadata.getOwn(key, target, undefined);
    return type;
}

function isDependencyType(target, type) {
    return getDependencyType(target) === type;
}

function setActivator(target, activator) {
    var instanceActivatorKey = _di.Metadata.instanceActivator;
    _di.Metadata.define(instanceActivatorKey, activator, target, undefined);
}

function setDependencyResolver(target, activator) {
    var dependencyResolverKey = _di.Metadata.dependencyResolver;
    _di.Metadata.define(dependencyResolverKey, activator, target, undefined);
}