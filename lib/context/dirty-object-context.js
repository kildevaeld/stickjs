var context_1 = require('./context');
var index_1 = require('utilities/lib/index');
let reserved = ['model', 'parent', '__queue', '_onchange', '__timer', '_listeners', '__subscribers'];
class DirtyObjectObserver extends context_1.Context {
    $observe() {
        this.$unobserve();
        index_1.nextTick(() => {
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
            else if (v && !index_1.equal(v, attributes[k])) {
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
exports.DirtyObjectObserver = DirtyObjectObserver;
