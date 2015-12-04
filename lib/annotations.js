'use strict';

var internal_1 = require('./internal');
var utilities_1 = require('utilities');
var di_1 = require('di');
var repository_1 = require('./repository');
var di_2 = require('di');
exports.inject = di_2.inject;
function controller(controllerName) {
    return function (target) {
        var name = controllerName || utilities_1.camelcase(target.name);
        repository_1.Repository.add(internal_1.DependencyType.Controller, name, target);
    };
}
exports.controller = controller;
function _module(moduleName) {
    return function (target) {
        var name = moduleName || utilities_1.camelcase(target.name);
        repository_1.Repository.add(internal_1.DependencyType.Module, name, target);
    };
}
exports.module = _module;
function service(serviceName, moduleName) {
    return function (target) {
        var name = serviceName || utilities_1.camelcase(target.name);
        repository_1.Repository.add(internal_1.DependencyType.Service, name, target);
    };
}
exports.service = service;
function factory(factoryName) {
    return function (target) {
        repository_1.Repository.add(internal_1.DependencyType.Factory, factoryName, target);
    };
}
exports.factory = factory;
function config(config) {
    return function (target) {
        di_1.Metadata.define(internal_1.DIServiceConfig, config, target, undefined);
    };
}
exports.config = config;
function template(name) {
    return function (target) {
        di_1.Metadata.define(internal_1.Metakey[internal_1.Metakey.Template], name, target, undefined);
    };
}
exports.template = template;