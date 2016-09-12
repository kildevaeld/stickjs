"use strict";

function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
var stick_1 = require('../stick');
__export(require('./template.view'));
require('./attributes/index');
var index_1 = require('./components/index');
stick_1.component('hide', index_1.Hide);
stick_1.component('show', index_1.Show);
stick_1.component('unsafe', index_1.Unsafe);
stick_1.component('delegate', index_1.Delegate);
__export(require('./components/base-component'));
__export(require('./attributes/base-attribute'));
var action_1 = require('templ/lib/action');
exports.Reference = action_1.Reference;
exports.Assignment = action_1.Assignment;
exports.Call = action_1.Call;