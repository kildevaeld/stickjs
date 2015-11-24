import {IContext, ISubscriber, ProxyEvent} from './index'
import {IModel, Collection, NestedModel} from 'collection'
import * as utils from 'utilities'
import {callFunc} from 'eventsjs'

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


const reserved_words = ["__queue", "__parent", "__model", "__subscriber"]


export abstract class Context implements IContext {
	private __queue: number
	protected __parent: IContext
	protected __model: IModel
	protected __subscribers: {[key:string]: ISubscriber[]}
	constructor () {
		this.__queue = 0;

		this.__model = new NestedModel();
		this.__onchange = utils.bind(this.__onchange, this);
		this.__subscribers = {}
	}

	get $root (): IContext {

		let parent: Context = <Context>this.__parent;

		while (parent != null) {
			if (!parent.__parent) return parent;
			parent = <Context>parent.__parent;
		}

		return this;
	}

	get $parent (): IContext {
    return this.__parent;
	}

	$call(fn:Function, ctx?:any, args?:any[]) {
		this.$observe();


		let results = utils.callFunc(fn, ctx, args);

		if (results) {
			this.__queue++
			return utils.toPromise(results)
			.then(() => {
				if (--this.__queue === 0)
					this.$unobserve();
				return results
			});
		} else {
			let defer = <utils.Deferred<any>>utils.deferred()
			utils.nextTick(() => {
				if (this.__queue == 0)
					this.$unobserve()
				defer.resolve(null)
			});
			return defer.promise
		}
	}

	$subscribe(event:string, handler:ISubscriber): IContext {
		if (this.$root !== this) {
			return this.$root.$subscribe(event, handler)
		}
		let subscribers = this.__subscribers[event]||(this.__subscribers[event] = []);
		subscribers.push(handler);
		return this
	}

	$unsubscribe(event:string, handler:ISubscriber): IContext {
		if (this.$root !== this) {
			return this.$root.$unsubscribe(event, handler)
		}
		let subscribers = this.__subscribers[event]||(this.__subscribers[event] = []);
		let i = subscribers.indexOf(handler);
		if (i > -1) {
			subscribers.splice(i,1);
		}
		return this;

	}

	$publish(event:string, ...args:any[]) {

		let subscribers = this.__subscribers[event];

		if (subscribers) {
			this.$call(() => {
				callFunc(subscribers, this, args)
			})
		}

		if (this.__parent) {
			this.__parent.$publish(event, ...args)
		}
	}

	abstract $createChild(data?:IModel): IContext

	abstract $observe ()

	abstract $unobserve()

	protected __onchange (events:ProxyEvent[]) {

		let props = {}

		for (let i=0,ii=events.length;i<ii;i++) {
			let e = events[i]
			let names = e.name.split('.');

			if (!!~reserved_words.indexOf(names[0])) {
        //console.warn('cannot set a reserved word:', reserved_words);
        continue;
			}

			if (e.type === 'delete') {
				this.__model.set(e.name, {unset:true});
			} else {
				props[e.name] = this[e.name]
			}
		}

		let {attr, deferred} = get_atributes(props);

		if (Object.keys(attr).length) {
			let props = this.__normalizeAttr(attr);

			this.$unobserve();

			this.__model.set(props);
			utils.extend(this, props);

			this.$observe();
		}


		if (Object.keys(deferred).length) {
			this.__queue++
			utils.toPromise(deferred)
			.then((props) => {

				if (--this.__queue === 0) {
					this.$unobserve();
				}

				props = this.__normalizeAttr(props)
				utils.extend(this, props)

				this.__model.set(props);

			}).catch( (e) => {
				this.__model.trigger('error', e);
				this.$unobserve();
			})

		}
	}

	private __normalizeAttr (attr): any {
		for (let key in attr) {
			let val = attr[key];

			if (Array.isArray(val) && val.length > 0 && utils.isObject(val[0])) {
				val = new Collection(val);

				attr[key] = val;
    	}
  	}
		return attr
	}

}