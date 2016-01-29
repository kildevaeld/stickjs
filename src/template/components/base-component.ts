
import {callFunc, bind} from 'utilities'
import {Component, Section, VNode, AttributeMap, IView, fragment, Template, template} from 'templ/lib/vnode'
import {resolveDependencies} from '../../internal'
import {TemplateView} from '../template.view'


export class BaseComponent implements Component {
		section: Section
		vnode: VNode
		attributes: AttributeMap
		_attributes: any
		view: IView
		document:Document
		childTemplate:Template
		constructor(section:Section, vvnode:VNode, attributes:AttributeMap, view:IView) {

			if ((<any>this).update) {
				(<any>this).update = bind((<any>this).update, this);
			}

			this.section = section
			this.vnode = vvnode
			this.attributes = attributes
            this._attributes = {};
			this.view = view
			this.document = view.template.options.document

			if (vvnode.childNodes) this.childTemplate = template(fragment(vvnode.childNodes), view.template.options);
  		    for (var key in attributes) this.setAttribute(key, attributes[key]);

			let container = (<TemplateView>this.view)._container


			/*resolveDependencies(this.initialize, container)
			.then(deps => {
				callFunc(this.initialize, this, deps);
			}).catch((e) => {
				throw e
			})*/
            this.initialize.call(this, container);

		}

		initialize () {

		}
        

		setAttribute (key:string, value:any) {
			this._attributes[key]  = value
		}

		removeAttribute(key:string) {
			this._attributes[key] = void 0
		}

		destroy () {
			let a = <any>this
			if (typeof a.onDestroy === 'function') {
				a.onDestroy();
			}
		}

}