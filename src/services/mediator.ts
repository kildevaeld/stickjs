'use strict';
import {service,inject} from '../decorators'
import {EventEmitter} from 'eventsjs'

@service('$mediator')
export class Mediator {
	emitter: EventEmitter
	constructor() {
		this.emitter = new EventEmitter();
	}
	
	publish (event: string, ...args:any[]) {
		this.emitter.trigger(event, ...args)
	}
	
	subscribe(event:string, handler:any, ctx:any) {
		this.emitter.on(event, handler, ctx)
	}
	
	unsubscribe(event:string, handler:any) {
		this.emitter.off(event, handler)
	}
}