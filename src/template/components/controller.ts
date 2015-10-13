/// <reference path="../../typings" />

import {components, View, compile, vnode} from 'templ'
import {DIContainer} from 'di'
import {isPromise, IPromise, Promise} from 'utilities/lib/index'

import {TemplateView} from '../template.view'
import {ControllerFactory} from '../../controller.factory'

export class ControllerComponent extends components.BaseComponent {
	container: DIContainer
	as: string
	name: string
	subview: View 
	initialize () {
		this.container = (<any>this.view)._container
		if (this.attributes['name']) {
			this.name = this.attributes['name']
			this.as = this.attributes['as'] || this.name
		}
		
		//this.__initController(this.name)
		
		let factory: ControllerFactory = (<any>this.view)._container.get(this.name);
		
		if (!(factory instanceof ControllerFactory)) {
			throw new Error(this.name + ' is not a controller');
		}
		
		let template:string|templ.vnode.Template = this.childTemplate
		if (this.attributes['template']) {
			template = this.attributes['template'];
		}
		
		factory.create({
			template: template
		}).then( controller => {
			let template = factory.container.get('template');
			this.section.appendChild(template.render());
		});
		
	}
	
	
	
	
	
	destroy () {
		
		super.destroy();
		if (this.subview) {
			this.subview.remove()
			delete this.subview
		}
		//this.controller.destroy();
	}
	

}