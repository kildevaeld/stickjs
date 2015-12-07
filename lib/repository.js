var internal_1 = require('./internal');
var utilities_1 = require('utilities');
var di_1 = require('di');
var Repository;
(function (Repository) {
    Repository.items = [];
    function add(type, name, target) {
        let item;
        if ((item = utilities_1.find(Repository.items, (i) => i.name == name))) {
            Repository.items.splice(Repository.items.indexOf(item), 1);
        }
        let config = di_1.Metadata.get(internal_1.DIServiceConfig, target);
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
        return utilities_1.find(Repository.items, (i) => i.name == name && i.type == type);
    }
    Repository.get = get;
    function any(name) {
        return utilities_1.find(Repository.items, (i) => i.name == name);
    }
    Repository.any = any;
})(Repository = exports.Repository || (exports.Repository = {}));
