'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _internal = require('./internal');

var _utilities = require('utilities');

var _di = require('di');

var Repository;
exports.Repository = Repository;
(function (Repository) {
    Repository.items = [];
    function add(type, name, target) {
        var item = undefined;
        if (item = (0, _utilities.find)(Repository.items, function (i) {
            return i.name == name;
        })) {
            throw new Error(type + ' named ' + name + ' already imported as ' + item.type);
        }
        var config = _di.Metadata.get(_internal.DIServiceConfig, target);
        Repository.items.push({
            name: name,
            handler: target,
            type: type,
            config: config
        });
    }
    Repository.add = add;
    function has(type, name) {
        return !!get(type, name);
    }
    Repository.has = has;
    function get(type, name) {
        return (0, _utilities.find)(Repository.items, function (i) {
            return i.name == name && i.type == type;
        });
    }
    Repository.get = get;
    function any(name) {
        return (0, _utilities.find)(Repository.items, function (i) {
            return i.name == name;
        });
    }
    Repository.any = any;
})(Repository || (exports.Repository = Repository = {}));