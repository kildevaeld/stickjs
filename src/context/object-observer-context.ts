
import {ProxyEvent} from './index'
import {NestedModel} from 'collection'
import {callFunc, toPromise, nextTick, bind} from 'utilities/lib/index'
import {Context} from './context'

export class ObjectObserveProxy extends Context {
	
	$observe () {
		(<any>Object).observe(this, this.__onchange);
	}
	
	$unobserve () {
		(<any>Object).unobserve(this, this.__onchange);
	}
	
	$createChild (): ObjectObserveProxy {
		let child = new ObjectObserveProxy(this.__mediator);
		child.__parent = this;
		return child;
	}
}


