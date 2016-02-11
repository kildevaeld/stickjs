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
var utilities_1 = require('utilities');
exports.Delegate = {
    initialize: function initialize($container) {
        this._onEvent = utilities_1.bind(this._onEvent, this);
        //stick.utils.delegate(this.ref, this.attributes.selector, 'click', this._onEvent);
        //if (!this.event) this.event = this.key.match(/on(.+)/)[1].toLowerCase();
        //debug('added event listener %s: %o', this.event, this.value)
        //this.view.addListener(this.ref, this.event, this._onEvent)
        var view = this.childTemplate.view(this.view.context, {
            parent: this.view,
            container: this.view._container
        });
        this._subview = view;
        this._container = this.document.createElement('div');
        this._container.appendChild(view.render());
        this.section.appendChild(this._container);
        //this.$context = $context;
        utilities_1.delegate(this._container, this.attributes.selector, 'click', this._onEvent);
    },
    update: function update() {},
    _onEvent: function _onEvent(e) {
        var self = this;
        //let fn;
        /*if (this.value instanceof templ.Assignment) {
            fn = this.value.assign;
        } else {
            fn = this.value;
        }*/
        var fn = this.attributes.click;
        if (typeof fn !== 'function') {
            //return;
            throw new Error('[event] value is not a function');
        }
        //this.$context.call(fn, undefined, e)
        fn(e);
    },
    onDestroy: function destroy() {
        //debug('removed event listener %s: %o', this.event, this.value);
        utilities_1.undelegate(this._container, this.attributes.selector, 'click', this._onEvent);
        //this.view.removeListener(this.ref, this.event, this._onEvent);
        this._subview.$destroy();
    }
};