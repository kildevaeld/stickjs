'use strict';

var object_observer_context_1 = require('./object-observer-context');
var dirty_object_context_1 = require('./dirty-object-context');
function createContext(model, mediator) {
    if (typeof Object.observe === 'function') {
        return new object_observer_context_1.ObjectObserveProxy(mediator);
    } /*else if (typeof (global||window).Proxy  === 'function') {
        
      }*/
    else {
            return new dirty_object_context_1.DirtyObjectObserver(mediator);
        }
}
exports.createContext = createContext;
function getContext() {
    if (typeof Object.observe === 'function') {
        return object_observer_context_1.ObjectObserveProxy;
    } /*else if (typeof (global||window).Proxy  === 'function') {
        
      }*/
    else {
            return dirty_object_context_1.DirtyObjectObserver;
        }
}
exports.getContext = getContext;