var context_1 = require('./context');
class ObjectObserveProxy extends context_1.Context {
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
exports.ObjectObserveProxy = ObjectObserveProxy;
