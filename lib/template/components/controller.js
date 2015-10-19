/// <reference path="../../typings" />
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _controllerFactory = require('../../controller.factory');

var Controller = {
    initialize: function initialize($container) {
        var _this = this;

        if (this.attributes['name']) {
            this.name = this.attributes['name'];
            this.as = this.attributes['as'] || this.name;
        }
        this.factory = $container.get(this.name);
        if (!(this.factory instanceof _controllerFactory.ControllerFactory)) {
            throw new Error(this.name + ' is not a controller');
        }
        var template = this.childTemplate;
        if (this.attributes['template']) {
            template = this.attributes['template'];
        }
        this.factory.create({
            template: template
        }).then(function (controller) {
            var template = _this.factory.container.get('template');
            _this.section.appendChild(template.render());
        });
    },
    onDestroy: function onDestroy() {
        if (this.factory) {
            this.factory.destroy();
        }
    }
};
exports.Controller = Controller;
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