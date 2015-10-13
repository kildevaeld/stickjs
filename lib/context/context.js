import { Collection, NestedModel } from 'collection';
import * as utils from 'utilities';
import { EventEmitter } from 'eventsjs';
export const get_atributes = function (attributes) {
    let keys = Object.keys(attributes), deferred = {}, attr = {};
    keys.map(key => {
        return { key: key, value: attributes[key] };
    }).filter(pair => {
        if (!utils.has(attributes, pair.key))
            return false;
        if (pair.value && utils.isPromise(pair.value)) {
            deferred[pair.key] = pair.value;
            delete attributes[pair.key];
            return false;
        }
        return true;
    }).forEach((a) => {
        attr[a.key] = a.value;
    });
    return { attr, deferred };
};
export class Context {
    constructor() {
        this.__queue = 0;
        this.__model = new NestedModel();
        this.__onchange = utils.bind(this.__onchange, this);
    }
    get $root() {
        let parent = this.__parent;
        while (parent != null) {
            if (!parent.__parent)
                return parent;
            parent = parent.__parent;
        }
        return this;
    }
    $call(fn, ctx, args) {
        this.$observe();
        let results = utils.callFunc(fn, ctx, args);
        if (results) {
            this.__queue++;
            return utils.toPromise(results)
                .then(() => {
                if (--this.__queue === 0)
                    this.$unobserve();
                return results;
            });
        }
        else {
            let defer = utils.deferred();
            utils.nextTick(() => {
                if (this.__queue == 0)
                    this.$unobserve();
                defer.resolve(null);
            });
            return defer.promise;
        }
    }
    $subscribe(event, handler) {
        Context.emitter.on(event, (...args) => {
            this.$call(handler, this, args);
        });
    }
    $unsubsribe(event, handler) {
    }
    $publish(event, ...args) {
    }
    __onchange(events) {
        let props = {};
        for (let i = 0, ii = events.length; i < ii; i++) {
            let e = events[i];
            let names = e.name.split('.');
            if (e.name === '__parent' || e.name === '__queue' || names[0] == '__model')
                continue;
            if (e.type === 'delete') {
                this.__model.set(e.name, { unset: true });
            }
            else {
                props[e.name] = this[e.name];
            }
        }
        let { attr, deferred } = get_atributes(props);
        if (Object.keys(attr).length) {
            let props = this.__normalizeAttr(attr);
            this.$unobserve();
            this.__model.set(props);
            utils.extend(this, props);
            this.$observe();
        }
        if (Object.keys(deferred).length) {
            this.__queue++;
            utils.toPromise(deferred)
                .then((props) => {
                if (--this.__queue === 0) {
                    this.$unobserve();
                }
                props = this.__normalizeAttr(props);
                utils.extend(this, props);
                this.__model.set(props);
            }).catch((e) => {
                this.__model.trigger('error', e);
                this.$unobserve();
            });
        }
    }
    __normalizeAttr(attr) {
        for (let key in attr) {
            let val = attr[key];
            if (Array.isArray(val) && val.length > 0 && utils.isObject(val[0])) {
                val = new Collection(val);
                attr[key] = val;
            }
        }
        return attr;
    }
}
Context.emitter = new EventEmitter();
