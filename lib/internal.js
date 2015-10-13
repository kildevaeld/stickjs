import * as utils from 'utilities';
import { Metadata } from 'di';
const paramRegEx = /function[^(]*\(([^)]*)\)/i;
export function getFunctionParameters(fn, cache = true) {
    let params = Metadata.getOwn(Metadata.paramTypes, fn);
    if (!params) {
        let match = fn.toString().match(paramRegEx);
        if (match) {
            params = match[1].replace(/,/, ' ').split(' ').map(x => x.replace(',', '').trim())
                .filter(m => m !== '');
            if (cache)
                Metadata.define(Metadata.paramTypes, params, fn, undefined);
        }
    }
    return params || [];
}
export var DependencyType;
(function (DependencyType) {
    DependencyType[DependencyType["Service"] = 0] = "Service";
    DependencyType[DependencyType["Module"] = 1] = "Module";
    DependencyType[DependencyType["Controller"] = 2] = "Controller";
    DependencyType[DependencyType["Factory"] = 3] = "Factory";
})(DependencyType || (DependencyType = {}));
export var Metakey;
(function (Metakey) {
    Metakey[Metakey["DependencyType"] = 0] = "DependencyType";
})(Metakey || (Metakey = {}));
export const DIServiceConfig = "mobyjs:service:config";
export function getDependencies(fn) {
    let dependencies;
    if (fn.constructor === Array) {
        let tmp = fn.pop();
        dependencies = fn;
        fn = tmp;
        fn.inject = dependencies;
    }
    else if (typeof fn === 'function') {
        dependencies = utils.result(fn, "inject");
        if (!dependencies || dependencies.length == 0) {
            let _fn = fn;
            // FIXME: Find a way not to delete type scripts type descriptions
            // But as it is now, context will be inferred as an Object
            if (_fn.__metadata__ && _fn.__metadata__.undefined['design:paramtypes']) {
                delete _fn.__metadata__.undefined['design:paramtypes'];
            }
            dependencies = getFunctionParameters(fn);
            _fn.inject = dependencies;
        }
    }
    else {
        return [fn, null];
    }
    return [fn, dependencies];
}
export function setDependencyType(type) {
    return function (target) {
        let str = Metakey[Metakey.DependencyType];
        Metadata.define(str, type, target, undefined);
    };
}
export function getDependencyType(target) {
    let key = Metakey[Metakey.DependencyType], type = Metadata.getOwn(key, target, undefined);
    return type;
}
export function isDependencyType(target, type) {
    return getDependencyType(target) === type;
}
export function setActivator(target, activator) {
    let instanceActivatorKey = Metadata.instanceActivator;
    Metadata.define(instanceActivatorKey, activator, target, undefined);
}
export function setDependencyResolver(target, activator) {
    let dependencyResolverKey = Metadata.dependencyResolver;
    Metadata.define(dependencyResolverKey, activator, target, undefined);
}
