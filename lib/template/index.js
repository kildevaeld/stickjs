"use strict";

function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
var stick_1 = require('../stick');
__export(require('./template.view'));
require('./components/controller');
require('./components/repeat');
var show_1 = require('./components/show');
var unsafe_1 = require('./components/unsafe');
var delegate_1 = require('./components/delegate');
require('./components/view');
//component('controller', Controller);
//component('repeat', Repeat);
stick_1.component('hide', show_1.Hide);
stick_1.component('show', show_1.Show);
stick_1.component('unsafe', unsafe_1.Unsafe);
stick_1.component('delegate', delegate_1.Delegate);
//component('view', View);
__export(require('./components/base-component'));
var view_1 = require('templ/lib/view');
exports.Reference = view_1.Reference;
exports.Assignment = view_1.Assignment;
exports.Call = view_1.Call;