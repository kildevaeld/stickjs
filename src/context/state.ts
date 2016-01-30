
import {NestedModel, ModelSetOptions} from 'collection';
import {DIContainer} from 'di';
import * as utils from 'utilities';

function isObject(a:any): a is Object {
    return a === Object(a);
}

export const get_atributes = function(attributes:any) {

  let keys = Object.keys(attributes),
    deferred = {},
    attr = {};

  keys.map(key => {
    return { key: key, value: attributes[key] };
  }).filter(pair => {
    if (!utils.has(attributes, pair.key)) return false
    if (pair.value && utils.isPromise(pair.value)) {
      deferred[pair.key] = pair.value;
      delete attributes[pair.key];
      return false;
    }

		return true;

	}).forEach((a) => {
    attr[a.key] = a.value;
  });

  return { attr, deferred };
};

export class State extends NestedModel {
    private _parent: Context;
    private _container: DIContainer;
    
    get parent(): Context {
        return this._parent;
    }
    
    get container(): DIContainer {
        return this._container;
    }
    
    constructor(container:DIContainer, parent?:Context) {
        super();
        this._parent = parent;
        this._container = container;
    }
    
    
    public set(key: string | Object, val?: any): this {
        let opts: ModelSetOptions = {},
            value = {},
            unset = {};
        if (typeof key === 'string') {
            if (val == null) {
                unset[key] = val;
            } else {
                value[key] = val;
            }
        } else if (isObject(key)) {
            value = key;
        }
        
        let {attr, deferred} = get_atributes(value);
        
        if (!utils.isEmpty(deferred)) {
            utils.objectToPromise(deferred)
            .then( obj => {
               super.set(obj) 
            });
        }
        
        if (!utils.isEmpty(attr)) {
            super.set(attr, opts);
        }
        
        if (!utils.isEmpty(unset)) {
            for (let key in unset) {
                this.unset(key, null);
            }
        }
        
       
        return this;
    }
    
    /*public get(key:any): any {
        
    }*/
    
    
    public createChild(): Context {
        return new Context(this.container, this);
    }
}