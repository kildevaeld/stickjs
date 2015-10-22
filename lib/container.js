import { DIContainer, DIBadKeyError, Resolver, FactoryActivator } from 'di';
import { StickDependencyError } from './typings';
import { Repository } from './repository';
import { DependencyType, setActivator } from './internal';
import * as utils from 'utilities';
import { ControllerFactory } from './controller.factory';
export * from 'di';
export function tryCatch(fn, ctx, args) {
    let result, error;
    try {
        result = utils.callFunc(fn, ctx, args);
    }
    catch (e) {
        error = e;
    }
    return [result, error];
}
export class Container extends DIContainer {
    constructor(info) {
        super(info);
        this.__instances = new Map();
    }
    hasInstance(key) {
        return this.__instances.has(key);
    }
    hasHandler(name, parent, repository) {
        let has = super.hasHandler(name, parent);
        return (!has && repository) ? Repository.hasAny(name) : has;
    }
    get(key, targetKey) {
        var entry;
        if (key === null || key === undefined) {
            throw new DIBadKeyError();
        }
        if (key === DIContainer) {
            return this;
        }
        if (key instanceof Resolver) {
            return key.get(this);
        }
        entry = this.entries.get(key);
        if (entry !== undefined) {
            return entry[0](this);
        }
        if (this.parent && this.parent.hasHandler(key)) {
            return this.parent.get(key, targetKey);
        }
        entry = Repository.any(key);
        if (entry != null) {
            this.register(entry);
            return this.entries.get(key)[0](this);
        }
        // No point in registrering a string
        if (typeof key === 'string') {
            throw new StickDependencyError('no component registered for key: ' + key);
        }
        this.autoRegister(key, targetKey);
        entry = this.entries.get(key);
        return entry[0](this);
    }
    registerSingleton(key, fn, targetKey = undefined) {
        return this.registerHandler(key, (x) => {
            if (this.__instances.has(key)) {
                return this.__instances.get(key);
            }
            else {
                let singleton = this.invoke(fn, null, targetKey);
                this.__instances.set(key, singleton);
                return singleton;
            }
        });
    }
    registerInstance(key, instance, track = false) {
        super.registerInstance(key, instance);
        if (track) {
            this.__instances.set(key, instance);
        }
    }
    clear() {
        for (let key of this.__instances.keys()) {
            this.destroy(key);
        }
    }
    destroy(key = null, fn = null) {
        if (key == null) {
            for (let key of this.__instances.keys()) {
                this.destroy(key, fn);
            }
            delete this.constructionInfo;
            //this.entries
            return;
        }
        let instance = this.__instances.get(key);
        if (instance) {
            if (fn) {
                fn(instance);
            }
            else if (typeof instance.$destroy === 'function') {
                instance.$destroy();
            }
            this.__instances.delete(key);
            instance = void 0;
        }
        else {
            console.log('could not find key ', key);
        }
    }
    register(item) {
        switch (item.type) {
            case DependencyType.Controller:
                let factory = new ControllerFactory(item.name, item.handler, this.createChild());
                this.registerInstance(item.name, factory, true);
                break;
            case DependencyType.Service:
                this.registerSingleton(item.name, item.handler);
                break;
            case DependencyType.Factory:
                if (typeof item.handler === 'function') {
                    setActivator(item.handler, FactoryActivator.instance);
                    this.registerSingleton(item.name, item.handler);
                }
                else {
                    this.registerInstance(item.name, item.handler);
                }
                break;
        }
    }
    createChild() {
        let child = new Container();
        child.parent = this;
        return child;
    }
}
