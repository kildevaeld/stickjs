'use strict';

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