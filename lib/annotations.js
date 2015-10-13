'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.module = _module;
exports.service = service;
exports.factory = factory;
exports.config = config;

var _internal = require('./internal');

var _utilities = require('utilities');

var _di = require('di');

var _repository = require('./repository');

/*export function controller (moduleName:string, controllerName?:string): ClassDecorator {
    return function (target:Function) {
        
        let name = controllerName||camelcase(target.name);
        
        
        Repository.add(DependencyType.Controller, )
        
        classtype(ClassType.Controller)(target);
        
        if (!metadata.has(moduleName)) {
            metadata.set(moduleName, []);
        }
        
        let types = metadata.get(moduleName);
        
        let exists = find(types, i => i.name === name);
        
        if (exists) {
            throw new Error('controller already exists in module');
        }
        
        metadata.get(moduleName).push(map);
        
    }
}*/

function _module(moduleName) {
    return function (target) {
        var name = moduleName || (0, _utilities.camelcase)(target.name);
        _repository.Repository.add(_internal.DependencyType.Module, name, target);
    };
}

function service(serviceName, moduleName) {
    return function (target) {
        var name = serviceName || (0, _utilities.camelcase)(target.name);
        _repository.Repository.add(_internal.DependencyType.Service, name, target);
    };
}

function factory(factoryName) {
    return function (target) {
        _repository.Repository.add(_internal.DependencyType.Factory, factoryName, target);
    };
}

function config(config) {
    return function (target) {
        _di.Metadata.define(_internal.DIServiceConfig, config, target, undefined);
    };
}