import { Context } from './context';
import { nextTick, equal } from 'utilities/lib/index';
let reserved = ['model', 'parent', '__queue', '_onchange', '__timer', '_listeners', '__subscribers'];
export class DirtyObjectObserver extends Context {
    $observe() {
        this.$unobserve();
        nextTick(() => {
            this._check(this.__model);
        });
        this.__timer = setInterval(() => {
            this._check(this.__model);
        }, 300);
        //super.observe();
    }
    $unobserve() {
        if (this.__timer) {
            clearTimeout(this.__timer);
            this.__timer = null;
        }
        //super.unobserve();
    }
    _check(model) {
        let attributes = this.__model.toJSON();
        let events = [], v, ev;
        for (let k of Object.keys(this)) {
            v = this[k];
            if (~reserved.indexOf(k))
                continue;
            ev = {
                name: k,
                object: this,
                type: v == null ? "delete" : ""
            };
            if (v && !attributes[k]) {
                ev.type = "add";
            }
            else if (v && !equal(v, attributes[k])) {
                ev.type = "update";
            }
            ev.oldValue = attributes[k];
            events.push(ev);
            delete attributes[k];
        }
        for (let k in attributes) {
            events.push({
                name: k,
                object: this,
                type: 'delete',
                oldValue: attributes[k]
            });
        }
        if (events.length)
            this.__onchange(events);
    }
    $createChild() {
        let child = new DirtyObjectObserver();
        child.__parent = this;
        return child;
    }
}