"use strict";

function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
require('./services/index');
require('./template/index');
var u = require('utilities');
var d = require('./decorators');
exports.utils = u;
exports.decorators = d;
__export(require('./stick'));
__export(require('collection'));
exports.ready = u.domReady();
var templ = require('./template');
exports.template = templ;