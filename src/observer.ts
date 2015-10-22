import {EventEmitter} from 'eventsjs'
import * as utils from 'utilities'

export class Observer extends EventEmitter {
	private observer: MutationObserver
	private observers: Map<HTMLElement, any>
	constructor (el:HTMLElement) {
		super()
		this.observer = new MutationObserver(utils.bind(this._observe, this))
		/*this.observer.observe(el, {
			attributes: true, 
			childList: true, 
			characterData: true 
		});*/
		this.observers = new Map()
	}
	
	observe (elm:HTMLElement, fn:any) {
			this.observer.observe(elm, {
				attributes: true,
				childList: true
			});
			this.observers.set(elm, fn)
	}
	
	unobserve () {
		
	}
	
	
	_observe (records:MutationRecord[], observer:MutationObserver) {
		for (let i=0, ii = records.length; i<ii; i++) {
			let record = records[i];
			if (this.observers.has(<any>record.target)) {
				this.observers.get(<any>record.target)()
			}
		}
	} 
	
	
	$destroy () {
		super.destroy()
		this.observer.disconnect()
	}
	
}