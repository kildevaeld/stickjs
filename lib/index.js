'use strict';

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
require('./services/index');
require('./template/index');
var u = require('utilities');
exports.utils = u;
__export(require('./stick'));
var collection_1 = require('collection');
exports.Collection = collection_1.Collection;
exports.NestedModel = collection_1.NestedModel;
exports.ready = u.domReady();