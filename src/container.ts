import {DIContainer, IHandlerFunc, ConstructionInfo, DIBadKeyError, Resolver, FactoryActivator} from 'di'
import {StickDependencyError} from './typings'
import {Repository, ItemMap} from './repository'
import {DependencyType, setActivator} from './internal'
import * as utils from 'utilities'
export function tryCatch(fn:Function, ctx?:any, args?:any[]): [any,Error] {
	let result, error;
	try {
		result = utils.callFunc(fn,ctx,args);
	} catch (e) {
		error = e
	}
	
	return [result, error];
}

export class Container extends DIContainer {
	__instances: Map<any, any>

	constructor(info?: Map<Function, ConstructionInfo>) {
		super(info)
		this.__instances = new Map<any, any>()

	}
	
	hasInstance (key:any): boolean {
		return this.__instances.has(key);
	}

	/*resolveDependencies(fn: Function, targetKey: any = undefined): any[] {
		
		var info = this._getOrCreateConstructionSet(fn, targetKey),
			keys = info.keys,
			args = new Array(keys.length);
    var i, ii, v;

		try {
			for (i = 0, ii = keys.length; i < ii; ++i) {
				v = keys[i];
				if (!this.hasHandler(v)) {
					v = Repository.any(v);
					if (!v) {
						throw new StickDependencyError('');
					}
					this.register(v)
				} 
				args[i] = this.get(keys[i]);
			}
			
		} catch (e) {
			var message = "Error"
			if (i < ii) {
        message += ` The argument at index ${i} (key:${keys[i]}) could not be satisfied.`;
      }
			throw new StickDependencyError(message);
		}

		return args
	}*/

	get(key: any, targetKey?:string) : any {
    var entry;

    if (key === null || key === undefined){
      throw new DIBadKeyError();
    }

    if(key === DIContainer){
      return this;
    }

    if(key instanceof Resolver){
      return key.get(this);
    }

    entry = this.entries.get(key);

    if (entry !== undefined) {
      return entry[0](this);
    }


    if(this.parent && this.parent.hasHandler(key)){
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
				this.__instances.set(key, singleton)

				return singleton
			}
		})
	}
	
	registerInstance(key: any, instance: any, track:boolean = false) {
		
		super.registerInstance(key, instance);
		if (track) {
			this.__instances.set(key, instance);
		}
		
	}
	
	clear () {
		for (let key of this.__instances.keys()) {
				this.destroy(key);	
			}
	}

	destroy(key: any = null, fn: (arg: any) => void = null) {
		if (key == null) {
			for (let key of this.__instances.keys()) {
				this.destroy(key, fn);	
			}
			delete this.constructionInfo
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
	
	register (item:ItemMap) {
		switch (item.type) {
			case DependencyType.Controller:
				this.registerTransient(item.name, item.handler);
				break;
			case DependencyType.Service:
				this.registerSingleton(item.name, item.handler);
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
	
	createChild () : Container {
		let child = new Container();
		child.parent = this;
		return child;
	}
}