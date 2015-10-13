import { Context } from './context';
export class ObjectObserveProxy extends Context {
    $observe() {
        //if (this.__observing) return
        Object.observe(this, this.__onchange);
        //super.observe();
    }
    $unobserve() {
        //if (!this.__observing) return
        Object.unobserve(this, this.__onchange);
        //super.unobserve();
    }
    $createChild() {
        let child = new ObjectObserveProxy();
        child.__parent = this;
        return child;
    }
}
