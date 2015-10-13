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
	factory: ControllerFactory
	initialize () {
		this.container = (<any>this.view)._container
		if (this.attributes['name']) {
			this.name = this.attributes['name']
			this.as = this.attributes['as'] || this.name
		}
		
		
		this.factory = (<any>this.view)._container.get(this.name);
		
		if (!(this.factory instanceof ControllerFactory)) {
			throw new Error(this.name + ' is not a controller');
		}
		
		let template:string|templ.vnode.Template = this.childTemplate
		if (this.attributes['template']) {
			template = this.attributes['template'];
		}
		
		this.factory.create({
			template: template
		}).then( controller => {
			let template = this.factory.container.get('template');
			this.section.appendChild(template.render());
		});
		
	}
	
	destroy () {
		
		super.destroy();
		this.factory.destroy();
		this.factory = void 0
	}
	

}