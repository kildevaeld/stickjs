/// <reference path="../../typings" />
var utilities_1 = require('utilities');
var templ = require('templ');
var internal_1 = require('../../internal');
const vnode = templ.vnode;
class BaseComponent {
    constructor(section, vvnode, attributes, view) {
        if (this.initialize) {
            this.initialize = utilities_1.bind(this.initialize, this);
        }
        if (this.update) {
            this.update = utilities_1.bind(this.update, this);
        }
        this.section = section;
        this.vnode = vvnode;
        this.attributes = attributes;
        this._attributes = {};
        this.view = view;
        this.document = view.template.options.document;
        if (vvnode.childNodes)
            this.childTemplate = vnode.template(vnode.fragment(vvnode.childNodes), view.template.options);
        for (var key in attributes)
            this.setAttribute(key, attributes[key]);
        let container = this.view._container;
        internal_1.resolveDependencies(this.initialize, container)
            .then(deps => {
            utilities_1.callFunc(this.initialize, this, deps);
        }).catch((e) => {
            throw e;
        });
    }
    initialize() {
    }
    setAttribute(key, value) {
        this._attributes[key] = value;
    }
    removeAttribute(key) {
        this._attributes[key] = void 0;
    }
    destroy() {
        let a = this;
        if (typeof a.onDestroy === 'function') {
            a.onDestroy();
        }
    }
}
exports.BaseComponent = BaseComponent;
