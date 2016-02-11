'use strict';

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
var templ = require('templ/lib/view');
var utilities_1 = require('utilities');
exports.Delegate = {
    initialize: function initialize($container) {
        this._onEvent = utilities_1.bind(this._onEvent, this);
        var view = this.childTemplate.view(this.view.context, {
            parent: this.view
        });
        this._subview = view;
        this._container = this.document.createElement('div');
        this._container.appendChild(view.render());
        this.section.appendChild(this._container);
        utilities_1.delegate(this._container, this.attributes.selector, 'click', this._onEvent);
    },
    update: function update() {},
    _onEvent: function _onEvent(e) {
        var self = this;
        var fn = this.attributes.click;
        //let fn;
        if (fn instanceof templ.Assignment) {
            fn = fn.assign;
        }
        if (typeof fn !== 'function') {
            throw new Error('[event] value is not a function');
        }
        fn(e);
    },
    onDestroy: function destroy() {
        utilities_1.undelegate(this._container, this.attributes.selector, 'click', this._onEvent);
        this._subview.$destroy();
    }
};