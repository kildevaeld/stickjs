/// <reference path="../../typings" />
import { ControllerFactory } from '../../controller.factory';
export const Controller = {
    initialize: function ($container) {
        if (this.attributes['name']) {
            this.name = this.attributes['name'];
            this.as = this.attributes['as'] || this.name;
        }
        this.factory = $container.get(this.name);
        if (!(this.factory instanceof ControllerFactory)) {
            throw new Error(this.name + ' is not a controller');
        }
        let template = this.childTemplate;
        if (this.attributes['template']) {
            template = this.attributes['template'];
        }
        this.factory.create({
            template: template
        }).then(controller => {
            let template = this.factory.container.get('template');
            this.section.appendChild(template.render());
        });
    },
    onDestroy() {
        if (this.factory) {
            this.factory.destroy();
        }
    }
};
/*export class ControllerComponent extends BaseComponent {
    container: DIContainer
    as: string
    name: string
    factory: ControllerFactory
    constructor(section:templ.vnode.Section, vvnode:templ.vnode.VNode, attributes:templ.vnode.AttributeMap, view:templ.vnode.IView) {
        super(section, vvnode, attributes, view)
        
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
    

}*/ 