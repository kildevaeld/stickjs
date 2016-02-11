"use strict";

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) {
            return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) {
                resolve(value);
            });
        }
        function onfulfill(value) {
            try {
                step("next", value);
            } catch (e) {
                reject(e);
            }
        }
        function onreject(value) {
            try {
                step("throw", value);
            } catch (e) {
                reject(e);
            }
        }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
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