import { EventEmitter } from 'eventsjs';
import * as utils from 'utilities';
export class Observer extends EventEmitter {
    constructor(el) {
        super();
        this.observer = new MutationObserver(utils.bind(this._observe, this));
        /*this.observer.observe(el, {
            attributes: true,
            childList: true,
            characterData: true
        });*/
        this.observers = new Map();
    }
    observe(elm, fn) {
        this.observer.observe(elm, {
            attributes: true,
            childList: true
        });
        this.observers.set(elm, fn);
    }
    unobserve() {
    }
    _observe(records, observer) {
        for (let i = 0, ii = records.length; i < ii; i++) {
            let record = records[i];
            if (this.observers.has(record.target)) {
                this.observers.get(record.target)();
            }
        }
    }
    $destroy() {
        super.destroy();
        this.observer.disconnect();
    }
}
