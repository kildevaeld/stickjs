declare var require:any;
import {NestedModel, ModelSetOptions} from 'collection';
import {DIContainer} from 'stick.di';
import * as utils from 'utilities';
import * as decorators from './decorators';

const debug = require('debug')('stick:state');

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

@decorators.inject('$container')
export class State extends NestedModel {
    private _parent: State;
    private _container: DIContainer;

    get parent(): State {
        return this._parent;
    }

    get container(): DIContainer {
        return this._container;
    }

    constructor(container:DIContainer, values?:any) {
        super(values);
        this._container = container;
        debug('%s: State created', this.uid);
    }


    public get(key: string): any {
        debug("%s: Get attribute: %s", this.uid, key);
        return super.get(key);
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
            debug("%s: Resolve deferred values: %j",this.uid, Object.keys(deferred));
            utils.objectToPromise(deferred)
            .then( obj => {
               this.set(obj)
            });
        }

        if (!utils.isEmpty(attr)) {
            debug("%s: Set attributes: %j", this.uid, Object.keys(attr));
            super.set(attr, opts);
        }


        if (!utils.isEmpty(unset)) {
            // Should unset
            debug("%s: Unset attributes: %j", this.uid, Object.keys(unset));
            super.set(unset)
        }


        return this;
    }

    public createChild(container?:DIContainer, values?:any): State {
        if (!container) container = this.container.createChild();
        let state = new State(container, values);
        state._parent = state;
        debug("%s: Create child %s", this.uid, state.uid);
        return state;
    }

    $destroy () {
        super.destroy();
        debug("%s: State destroyed", this.uid);
    }

}