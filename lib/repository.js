"use strict";

var internal_1 = require('./internal');
var utilities_1 = require('utilities');
var stick_di_1 = require('stick.di');
var debug = require('debug')('stick:container:repository');
var fnToStr = Function.prototype.toString;
var isNonArrowFnRegex = /^\s*function/;
var isArrowFnWithParensRegex = /^\([^\)]*\) *=>/;
var isArrowFnWithoutParensRegex = /^[^=]*=>/;
var Repository;
(function (Repository) {
    Repository.items = [];
    function add(type, name, target) {
        debug("Adding dependency: %s, name: %s", internal_1.DependencyType[type], name);
        var item = void 0;
        if (item = utilities_1.find(Repository.items, function (i) {
            return i.name == name;
        })) {
            Repository.items.splice(Repository.items.indexOf(item), 1);
        }
        var config = void 0;
        try {
            config = stick_di_1.Metadata.get(internal_1.DIServiceConfig, target);
        } catch (e) {}
        if (typeof target === 'function' && target.name == "") {
            try {
                Object.defineProperty(target, 'name', {
                    value: name
                });
            } catch (e) {}
        }
        Repository.items.push({
            name: name,
            handler: target,
            type: type,
            config: config
        });
    }
    Repository.add = add;
    function hasAny(name) {
        return !!any(name);
    }
    Repository.hasAny = hasAny;
    function has(type, name) {
        return !!get(type, name);
    }
    Repository.has = has;
    function get(type, name) {
        debug("Get dependency: %s, name: %s", internal_1.DependencyType[type], name);
        return utilities_1.find(Repository.items, function (i) {
            return i.name == name && i.type == type;
        });
    }
    Repository.get = get;
    function any(name) {
        return utilities_1.find(Repository.items, function (i) {
            return i.name == name;
        });
    }
    Repository.any = any;
})(Repository = exports.Repository || (exports.Repository = {}));