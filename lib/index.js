"use strict";

function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
require('./services/index');
require('./template/index');
var d = require('./decorators');
exports.decorators = d;
__export(require('./stick'));
__export(require('./services/index'));
var templ = require('./template/index');
exports.template = templ;
__export(require('./template/index'));