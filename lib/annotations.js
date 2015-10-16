import { DependencyType, DIServiceConfig, Metakey } from './internal';
import { camelcase } from 'utilities';
import { Metadata } from 'di';
import { Repository } from './repository';
export function controller(controllerName) {
    return function (target) {
        let name = controllerName || camelcase(target.name);
        Repository.add(DependencyType.Controller, name, target);
    };
}
export function module(moduleName) {
    return function (target) {
        let name = moduleName || camelcase(target.name);
        Repository.add(DependencyType.Module, name, target);
    };
}
export function service(serviceName, moduleName) {
    return function (target) {
        let name = serviceName || camelcase(target.name);
        Repository.add(DependencyType.Service, name, target);
    };
}
export function factory(factoryName) {
    return function (target) {
        Repository.add(DependencyType.Factory, factoryName, target);
    };
}
export function config(config) {
    return function (target) {
        Metadata.define(DIServiceConfig, config, target, undefined);
    };
}
export function template(name) {
    return function (target) {
        Metadata.define(Metakey[Metakey.Template], name, target, undefined);
    };
}
