
import {callFunc, bind} from 'utilities'
import {Component, Section, VNode, AttributeMap, IView, fragment, Template, template} from 'templ/lib/vnode'
import {resolveDependencies} from '../../internal'
import {TemplateView} from '../template.view'
import {EventEmitter} from 'eventsjs';
import {Container} from '../../container'

export class BaseComponent extends EventEmitter implements Component {
		section: Section
		vnode: VNode
		attributes: AttributeMap
		view: TemplateView
		document:Document
		childTemplate:Template
		constructor(section:Section, vvnode:VNode, attributes:AttributeMap, view:TemplateView) {

			super();

			if ((<any>this).update) {
				(<any>this).update = bind((<any>this).update, this);
			}

			this.section = section
			this.vnode = vvnode
			this.attributes = attributes

			this.view = view
			this.document = view.template.options.document

			if (vvnode.childNodes) this.childTemplate = template(fragment(vvnode.childNodes), view.template.options);
  		    for (var key in attributes) this.setAttribute(key, attributes[key]);

			let container = this.view.container;

		}

		initialize (): Promise<void> {
			return Promise.resolve();
		}


		setAttribute (key:string, value:any) {
			this.attributes[key]  = value
		}

		removeAttribute(key:string) {
			this.attributes[key] = void 0
		}

        getAttribute(key:string) {
            return this.attributes[key];
        }

		destroy () {
			let a = <any>this
			if (typeof a.onDestroy === 'function') {
				a.onDestroy();
			} else if (typeof a.ondestroy === 'function') {
                a.ondestroy();
            }
		}
}