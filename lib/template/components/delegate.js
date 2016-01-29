'use strict';

var utilities_1 = require('utilities');
exports.Delegate = {
    initialize: function initialize($context) {
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
        this.$context = $context;
        utilities_1.delegate(this._container, this._attributes.selector, 'click', this._onEvent);
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
        var fn = this._attributes.click;
        if (typeof fn !== 'function') {
            //return;
            throw new Error('[event] value is not a function');
        }
        //this.$context.call(fn, undefined, e)
        fn(e);
    },
    destroy: function destroy() {
        //debug('removed event listener %s: %o', this.event, this.value);
        utilities_1.undelegate(this._container, this._attributes.selector, 'click', this._onEvent);
        //this.view.removeListener(this.ref, this.event, this._onEvent);
        this._subview.remove();
    }
};