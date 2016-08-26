"use strict";

var utils = require('utilities');
var stick_di_1 = require('stick.di');
var paramRegEx = /function[^(]*\(([^)]*)\)/i;
function getFunctionParameters(fn) {
    var cache = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    var params = stick_di_1.Metadata.getOwn(stick_di_1.Metadata.paramTypes, fn);
    if (!params) {
        var match = fn.toString().match(paramRegEx);
        if (match) {
            params = match[1].replace(/,/, ' ').split(' ').map(function (x) {
                return x.replace(',', '').trim();
            }).filter(function (m) {
                return m !== '';
            });
            if (cache) stick_di_1.Metadata.define(stick_di_1.Metadata.paramTypes, params, fn, undefined);
        }
    }
    return params || [];
}
exports.getFunctionParameters = getFunctionParameters;
(function (DependencyType) {
    DependencyType[DependencyType["Service"] = 0] = "Service";
    DependencyType[DependencyType["Module"] = 1] = "Module";
    DependencyType[DependencyType["Controller"] = 2] = "Controller";
    DependencyType[DependencyType["Factory"] = 3] = "Factory";
})(exports.DependencyType || (exports.DependencyType = {}));
var DependencyType = exports.DependencyType;
(function (Metakey) {
    Metakey[Metakey["DependencyType"] = 0] = "DependencyType";
    Metakey[Metakey["Template"] = 1] = "Template";
})(exports.Metakey || (exports.Metakey = {}));
var Metakey = exports.Metakey;
exports.DIServiceConfig = "mobyjs:service:config";
function getDependencies(fn) {
    var dependencies = void 0;
    // [dep..., Function] style
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
            /*if (_fn.__metadata__ && _fn.__metadata__.undefined['design:paramtypes']) {
                delete _fn.__metadata__.undefined['design:paramtypes']
             }*/
            dependencies = getFunctionParameters(fn);
            _fn.inject = dependencies;
        }
    } else {
        return [fn, null];
    }
    return [fn, dependencies];
}
exports.getDependencies = getDependencies;
function tryCatch(fn) {
    var val = void 0,
        err = void 0;
    try {
        val = fn();
    } catch (e) {
        err = e;
    }
    return [val, err];
}
function resolveDependencies(target, container) {
    var i = void 0,
        ii = void 0,
        ret = void 0,
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
exports.resolveDependencies = resolveDependencies;
function setDependencyType(type) {
    return function (target) {
        var str = Metakey[Metakey.DependencyType];
        stick_di_1.Metadata.define(str, type, target, undefined);
    };
}
exports.setDependencyType = setDependencyType;
function getDependencyType(target) {
    var key = Metakey[Metakey.DependencyType],
        type = stick_di_1.Metadata.getOwn(key, target, undefined);
    return type;
}
exports.getDependencyType = getDependencyType;
function isDependencyType(target, type) {
    return getDependencyType(target) === type;
}
exports.isDependencyType = isDependencyType;
function setActivator(target, activator) {
    var instanceActivatorKey = stick_di_1.Metadata.instanceActivator;
    stick_di_1.Metadata.define(instanceActivatorKey, activator, target, undefined);
}
exports.setActivator = setActivator;
function setDependencyResolver(target, activator) {
    var dependencyResolverKey = stick_di_1.Metadata.dependencyResolver;
    stick_di_1.Metadata.define(dependencyResolverKey, activator, target, undefined);
}
exports.setDependencyResolver = setDependencyResolver;