"use strict";

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) {
            return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) {
                resolve(value);
            });
        }
        function onfulfill(value) {
            try {
                step("next", value);
            } catch (e) {
                reject(e);
            }
        }
        function onreject(value) {
            try {
                step("throw", value);
            } catch (e) {
                reject(e);
            }
        }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
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