import {Metadata, DIContainer, IHandlerFunc, ConstructionInfo,
    DIBadKeyError, Resolver, FactoryActivator, ClassActivator} from 'stick.di'

import {StickDependencyError} from './errors'
import {Repository, ItemMap} from './repository'
import {DependencyType, setActivator, DIServiceConfig} from './internal'
import * as utils from 'orange';

import {ControllerFactory} from './controller.factory'

export * from 'stick.di'

export function tryCatch(fn: Function, ctx?: any, args?: any[]): [any, Error] {
    let result, error;
    try {
        result = utils.callFunc(fn, ctx, args);
    } catch (e) {
        error = e;
    }
    return [result, error];
}

// TODO: Handle instances in unregister
export class Container extends DIContainer {
    __instances: Map<any, any>;

    constructor(info?: Map<Function, ConstructionInfo>) {
        super(info);
        this.__instances = new Map<any, any>();

    }

    hasInstance(key: any): boolean {
        return this.__instances.has(key);
    }

    hasHandler(name: string, parent?: boolean, repository?: boolean): boolean {
        let has = super.hasHandler(name, parent);
        return (!has && repository) ? Repository.hasAny(name) : has;
    }

    async get(key: any, targetKey?: string): Promise<any> {
        var entry;

        if (key === null || key === undefined) {
            throw new DIBadKeyError();
        }

        if (key === DIContainer || key == Container) {
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
            return this.parent.get(key, targetKey)
        }

        entry = Repository.any(key);

        if (entry != null) {
            this.register(entry);
            return this.entries.get(key)[0](this);
        }



        // No point in registrering a string
        if (typeof key === 'string') {
            throw new StickDependencyError('no component registered for key: ' + key)
        }

        this.autoRegister(key, targetKey);
        entry = this.entries.get(key);

        return entry[0](this);
    }


    registerSingleton(key: any, fn: Function, targetKey: any = undefined) {

        return this.registerHandler(key, (x) => {
            if (this.__instances.has(key)) {
                return this.__instances.get(key)
            } else {
                let singleton = this.invoke(fn, null, targetKey)
                if (utils.isPromise(singleton)) {
                    return singleton.then( (s) => {
                        this.__instances.set(key, s);
                        return s;
                    })
                }
                this.__instances.set(key, singleton);

                return singleton
            }
        });
    }

    registerService(key: any, fn: Function, targetKey: any = undefined) {
        let name: string;
        if (typeof key === 'string') {
            name = key;
        } else {
            name = key.name;
        }
        let configKey = name + 'Provider';
        let Config = <FunctionConstructor>Metadata.getOwn(DIServiceConfig, fn, targetKey);

        if (Config != null) {
            if (this.hasHandler(configKey, false, false)) {
                throw new Error(`Provider for '${name}' already defined`);
            }
            let config = new Config();
            this.registerInstance(configKey, config);
            //
        }

        return this.registerHandler(key, (x) => {
            if (this.__instances.has(key)) {
                return this.__instances.get(key)
            } else {
                let singleton = this.invoke(fn, null, targetKey)
                this.__instances.set(key, singleton)
                this.unregister(configKey);
                return singleton
            }
        })

    }

    registerInstance(key: any, instance: any, track: boolean = false) {

        super.registerInstance(key, instance);
        if (track) {
            this.__instances.set(key, instance);
        }

    }

    public invoke(fn: Function, deps?: any[], targetKey?: string): any {
        var info = this._getOrCreateConstructionSet(fn, targetKey)

        try {
            var keys, args;
            if (info.dependencyResolver) {
                args = info.dependencyResolver.resolveDependencies(fn);
            } else {
                args = this.resolveDependencies(fn, targetKey)
            }

            if (deps !== undefined && Array.isArray(deps)) {
                args = args.concat(deps);
            }
            
            return utils.arrayToPromise(args)
            .then((args) => {
                return (<any>info.activator).invoke(fn, args, targetKey, keys);
            })

            //debug("%s: invoking '%s', with dependencies:", this.id, fn.name, args);
            //return (<any>info.activator).invoke(fn, args, targetKey, keys);

        } catch (e) {

            var activatingText = info.activator instanceof ClassActivator ? 'instantiating' : 'invoking';
            var message = `Error ${activatingText} ${(<any>fn).name}.`

            message += ' Check the inner error for details.'

            throw new StickDependencyError(message, [e]);

        }
    }

    clear() {
        let keys = this.__instances.keys();
        for (let key of keys) {
            this.destroy(key);
        }
    }

    destroy(key: any = null, fn: (arg: any) => void = null) {
        if (key == null) {
            for (let key of this.__instances.keys()) {
                this.destroy(key, fn);
            }
            delete this.constructionInfo
            this.constructionInfo = new Map()
            //this.entries

            return
        }

        let instance = this.__instances.get(key)

        if (instance) {
            if (fn) {
                fn(instance)
            } else if (typeof instance.$destroy === 'function') {
                instance.$destroy();
            }
            this.__instances.delete(key);
            instance = void 0
        } else {
            console.log('could not find key ', key)
        }
    }

    register(item: ItemMap) {
        switch (item.type) {
            case DependencyType.Controller:
                let factory = new ControllerFactory(item.name, item.handler, this.createChild());
                this.registerInstance(item.name, factory, true);
                break;
            case DependencyType.Service:
                this.registerService(item.name, item.handler);
                break;
            case DependencyType.Factory:

                if (typeof item.handler === 'function') {
                    setActivator(item.handler, FactoryActivator.instance);
                    this.registerSingleton(item.name, item.handler);
                } else {
                    this.registerInstance(item.name, item.handler);
                }

                break;
        }
    }

    createChild(): Container {
        let child = new Container();
        child.parent = this;
        return child;
    }
}