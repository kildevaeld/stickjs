/// <reference path="../../typings" />
import {callFunc} from 'utilities'
import * as templ from 'templ'
import {resolveDependencies} from '../../internal'
import {TemplateView} from '../template.view'
const vnode = templ.vnode

export class BaseComponent implements templ.vnode.Component {
		section: templ.vnode.Section
		vnode: templ.vnode.VNode
		attributes: templ.vnode.AttributeMap
		view: templ.vnode.IView
		document:Document
		childTemplate:templ.vnode.Template
		constructor(section:templ.vnode.Section, vvnode:templ.vnode.VNode, attributes:templ.vnode.AttributeMap, view:templ.vnode.IView) {

			this.section = section
			this.vnode = vvnode
			this.attributes = attributes
			this.view = view
			this.document = view.template.options.document

			if (vvnode.childNodes) this.childTemplate = vnode.template(vnode.fragment(vvnode.childNodes), view.template.options);
  		for (var key in attributes) this.setAttribute(key, attributes[key]);

			let container = (<TemplateView>this.view)._container
			console.log(container)
			resolveDependencies(this.initialize, container)
			.then(deps => {
				callFunc(this.initialize, this, deps);
			}).catch((e) => {
				throw e
			})

			
		}

		initialize () {
			
		}
		

		setAttribute (key:string, value:any) {
			this.attributes[key]  = value
		}

		removeAttribute(key:string) {
			this.attributes[key] = void 0
		}

		destroy () {
			let a = <any>this
			if (typeof a.onDestroy === 'funciton') {
				a.onDestroy();
			}
		}
		
}