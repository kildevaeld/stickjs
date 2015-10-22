import { callFunc } from 'utilities';
import * as templ from 'templ';
import { resolveDependencies } from '../../internal';
const vnode = templ.vnode;
export class BaseComponent {
    constructor(section, vvnode, attributes, view) {
        this.section = section;
        this.vnode = vvnode;
        this.attributes = attributes;
        this.view = view;
        this.document = view.template.options.document;
        if (vvnode.childNodes)
            this.childTemplate = vnode.template(vnode.fragment(vvnode.childNodes), view.template.options);
        for (var key in attributes)
            this.setAttribute(key, attributes[key]);
        let container = this.view._container;
        resolveDependencies(this.initialize, container)
            .then(deps => {
            callFunc(this.initialize, this, deps);
        }).catch((e) => {
            throw e;
        });
    }
    initialize() {
    }
    setAttribute(key, value) {
        this.attributes[key] = value;
    }
    removeAttribute(key) {
        this.attributes[key] = void 0;
    }
    destroy() {
        let a = this;
        if (typeof a.onDestroy === 'funciton') {
            a.onDestroy();
        }
    }
}
