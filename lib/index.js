'use strict';

function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
require('./services/index');
require('./template/index');
var u = require('utilities');
exports.utils = u;
__export(require('./stick'));
__export(require('collection'));
//export * from './decorators';
exports.ready = u.domReady();