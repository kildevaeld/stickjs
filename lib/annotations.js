'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.controller = controller;
exports.module = _module;
exports.service = service;
exports.factory = factory;
exports.config = config;
exports.template = template;

var _internal = require('./internal');

var _utilities = require('utilities');

var _di = require('di');

var _repository = require('./repository');

Object.defineProperty(exports, 'inject', {
    enumerable: true,
    get: function get() {
        return _di.inject;
    }
});

function controller(controllerName) {
    return function (target) {
        var name = controllerName || (0, _utilities.camelcase)(target.name);
        _repository.Repository.add(_internal.DependencyType.Controller, name, target);
    };
}

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

function template(name) {
    return function (target) {
        _di.Metadata.define(_internal.Metakey[_internal.Metakey.Template], name, target, undefined);
    };
}