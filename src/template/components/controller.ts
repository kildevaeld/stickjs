//import {components, View, compile, vnode} from 'templ'
//import {DIContainer} from 'stick.di'
import {isPromise, IPromise, Promise, isString} from 'utilities'
import {BaseComponent} from './base-component'
import {TemplateView} from '../template.view'
import {ControllerFactory} from '../../controller.factory'
import {Template} from 'templ/lib/vnode/index'
import {component} from '../../decorators'

@component('controller') 
export class Controller extends BaseComponent {
    name: string;
    as: string;
    factory: ControllerFactory;
    private resolving: boolean;

    async initialize() {
        if (this.attributes['name']) {
            this.name = this.attributes['name']
            this.as = this.attributes['as'] || this.name
        }
    }


    async update() {
        if (this.factory) {
            if (this.factory.container.hasHandler('template')) {
                let view = await this.factory.container.get('template')
                view.update();
            }
            return;
        }
        if (this.resolving) {
            return;
        }

        this.resolving = true;

        this.factory = await this.view.container.get(this.name);

        if (!(this.factory instanceof ControllerFactory)) {
            throw new Error(this.name + ' is not a controller');
        }

        let template: string | Template = this.childTemplate
        if (this.attributes['template']) {
            template = this.attributes['template'];
        }

        let state = {};

        if (this.attributes['state']) {
            let s = this.attributes['state']
            try {
                state = isString(s) ? JSON.parse(s) : Object(s);
            } catch (e) {
                console.warn('Could not parse model tag');
            }
        }

        let controller = await this.factory.create({
            template: template,
            contextName: this.as,
            parentView: this.view,
            state: state
        });

        let el = await this.factory.container.get('$el');
        this.section.appendChild(el);

        this.resolving = false;

    }

    destroy() {
        if (this.factory) {
            this.factory.destroy()
            this.factory = void 0;
        }
        super.destroy();
    }

}

//decorators.component('controller')(Controller)