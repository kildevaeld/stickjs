
import {ProxyEvent} from './index'
import {NestedModel} from 'collection'
import {callFunc, toPromise, nextTick, bind} from 'utilities/lib/index'
import {Context} from './context'

export class ObjectObserveProxy extends Context {
	
	$observe () {
		//if (this.__observing) return
		(<any>Object).observe(this, this.__onchange);
		//super.observe();
	}
	
	$unobserve () {
		//if (!this.__observing) return
		(<any>Object).unobserve(this, this.__onchange);
		//super.unobserve();
		
	}
	
	$createChild (): ObjectObserveProxy {
		let child = new ObjectObserveProxy();
		child.__parent = this;
		return child;
	}
}
