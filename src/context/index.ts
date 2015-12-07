import {IModel} from 'collection'
import {ObjectObserveProxy} from './object-observer-context'
import {DirtyObjectObserver} from './dirty-object-context'
import {Mediator} from '../services/mediator' 
export interface ProxyEvent {
	name: string
	object:any
	type:string
	oldValue?:any
}


export interface ISubscriber {
	(...args:any[]): void
}

export interface IContext {
	[x: string]: any 
	$call(fn:Function, ctx?:any, args?:any[])
	$subscribe(event:string, handler:ISubscriber)
	$unsubscribe(event:string, handler:ISubscriber)
	$publish(event:string, ...args:any[])
	$createChild(data?:IModel): IContext
	$observe()
	$unobserve()
}




export function createContext(model:IModel, mediator:Mediator): IContext {
	if (typeof (<any>Object).observe === 'function') {
		return new ObjectObserveProxy(mediator);
	} /*else if (typeof (global||window).Proxy  === 'function') {
		
	}*/ else {
		return new DirtyObjectObserver(mediator);
	}
}

export function getContext (): any {
	if (typeof (<any>Object).observe === 'function') {
		return ObjectObserveProxy;
	} /*else if (typeof (global||window).Proxy  === 'function') {
		
	}*/ else {
		return DirtyObjectObserver;
	}
}