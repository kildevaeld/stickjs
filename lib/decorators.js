"use strict";

var internal_1 = require('./internal');
var orange_1 = require('orange');
var stick_di_1 = require('stick.di');
var repository_1 = require('./repository');
var templ = require('templ');
var di = require('stick.di');
exports.autoinject = di.autoinject;
exports.inject = di.inject;
exports.registration = di.registration;
exports.transient = di.transient;
exports.singleton = di.singleton;
exports.instanceActivator = di.instanceActivator;
var debug = require('debug')('stick:decorators');
function controller(controllerName) {
    return function (target) {
        var name = controllerName || orange_1.camelcase(target.name);
        repository_1.Repository.add(internal_1.DependencyType.Controller, name, target);
    };
}
exports.controller = controller;
function _module(moduleName) {
    return function (target) {
        var name = moduleName || orange_1.camelcase(target.name);
        repository_1.Repository.add(internal_1.DependencyType.Module, name, target);
    };
}
exports.module = _module;
function service(serviceName, moduleName) {
    return function (target) {
        var name = serviceName || orange_1.camelcase(target.name);
        repository_1.Repository.add(internal_1.DependencyType.Service, name, target);
    };
}
exports.service = service;
function factory(factoryName) {
    return function (target) {};
}
exports.factory = factory;
function config(config) {
    return function (target) {
        stick_di_1.Metadata.define(internal_1.DIServiceConfig, config, target, undefined);
    };
}
exports.config = config;
function template(name) {
    return function (target) {
        stick_di_1.Metadata.define(internal_1.Metakey[internal_1.Metakey.Template], name, target, undefined);
    };
}
exports.template = template;
function component(name) {
    return function (target) {
        debug('defining component %s, target: %s', name, target.name);
        templ.component(name, target);
    };
}
exports.component = component;
function attribute(name) {
    return function (target) {
        debug('defining attribute %s, target: %s', name, target.name);
        templ.attribute(name, target);
    };
}
exports.attribute = attribute;