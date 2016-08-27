
import {BaseComponent} from './base-component';
import {TemplateView} from '../template.view';
import * as decorators from '../../decorators';
import {NestedModel} from 'collection';
import {Call} from '../'

@decorators.component("view")
export class View extends BaseComponent {
    subview: TemplateView;
    resolving: boolean = false;

    getContext() {
        let context: any = this.attributes['context'];

        if (!context) {
            context = this.view.context;
        } else {

            if (context instanceof Call) {
                context = context.call();
            }

            if (this.attributes['as']) {
                let as = this.attributes['as']
                context = new NestedModel({ [as]: context })
            }
        }

        return context;
    }



    async update() {

        if (this.subview) {
            if (this.subview.context !== this.view.context) {
                this.subview.context = this.getContext();
            }
            return this.subview.update();
        }

        if (this.resolving) return;


        this.resolving = true;

        let template = this.attributes['template'];

        let context = this.getContext();

        if (!template || template == "") {
            return;
        }

        let creator = await this.view.container.get('$templateCreator');
        let resolver = await this.view.container.get('$templateResolver');

        let tString = await resolver(template)

        let view = await creator(tString, context);
        view.parent = this.view;
        this.subview = view;

        this.section.appendChild(view.render());
        this.resolving = false;

    }

    onDestroy() {
        if (this.subview) {
            this.subview.$destroy();
        }
    }

}

