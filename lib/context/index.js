import { ObjectObserveProxy } from './object-observer-context';
import { DirtyObjectObserver } from './dirty-object-context';
export function createContext(model) {
    if (typeof Object.observe === 'function') {
        return new ObjectObserveProxy();
    } /*else if (typeof (global||window).Proxy  === 'function') {
        
    }*/
    else {
        return new DirtyObjectObserver();
    }
}
export function getContext() {
    if (typeof Object.observe === 'function') {
        return ObjectObserveProxy;
    } /*else if (typeof (global||window).Proxy  === 'function') {
        
    }*/
    else {
        return DirtyObjectObserver;
    }
}
