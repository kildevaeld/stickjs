'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.createContext = createContext;
exports.getContext = getContext;

var _objectObserverContext = require('./object-observer-context');

var _dirtyObjectContext = require('./dirty-object-context');

function createContext(model) {
    if (typeof Object.observe === 'function') {
        return new _objectObserverContext.ObjectObserveProxy();
    } /*else if (typeof (global||window).Proxy  === 'function') {
        
      }*/
    else {
            return new _dirtyObjectContext.DirtyObjectObserver();
        }
}

function getContext() {
    if (typeof Object.observe === 'function') {
        return _objectObserverContext.ObjectObserveProxy;
    } /*else if (typeof (global||window).Proxy  === 'function') {
        
      }*/
    else {
            return _dirtyObjectContext.DirtyObjectObserver;
        }
}