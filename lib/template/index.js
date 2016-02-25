"use strict";

function __export(m) {
    for (var p in m) {
        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
}
var stick_1 = require('../stick');
__export(require('./template.view'));
var controller_1 = require('./components/controller');
var repeat_1 = require('./components/repeat');
var show_1 = require('./components/show');
var unsafe_1 = require('./components/unsafe');
var delegate_1 = require('./components/delegate');
var view_1 = require('./components/view');
stick_1.component('controller', controller_1.Controller);
stick_1.component('repeat', repeat_1.Repeat);
stick_1.component('hide', show_1.Hide);
stick_1.component('show', show_1.Show);
stick_1.component('unsafe', unsafe_1.Unsafe);
stick_1.component('delegate', delegate_1.Delegate);
stick_1.component('view', view_1.View);
__export(require('./components/base-component'));