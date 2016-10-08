'use strict';
import { isAssignment } from 'templ/lib/action';
import { bind } from 'orange';
import { delegate, undelegate } from 'orange.dom'
import { ComponentDefinition } from '../index'
import { BaseComponent } from './base-component';
import { TemplateView } from '../template.view';

export class Delegate extends BaseComponent {
    private subview: TemplateView;
    private el: HTMLElement;
    initialize(): Promise<void> {
        this._onEvent = bind(this._onEvent, this);

        return this.childTemplate.render(this.view.context, {
            parent: this.view
        }).then(view => {
            this.subview = view as TemplateView;
            return this.subview.render();
        }).then(el => {
            this.el = this.document.createElement('div');
            this.el.appendChild(el);

            this.section.appendChild(this.el);

            let event = this.attributes['event'] || 'click'

            delegate(this.el, this.attributes['selector'], 'click', this._onEvent);
        });

    }

    update(): Promise<void> {
        return Promise.resolve();
    }

    private _onEvent(e: Event) {
        var self = this;

        var fn: any = this.attributes['click'];

        //let fn;
        if (isAssignment(fn)) {
            fn = fn.assign;
        }

        if (typeof fn !== 'function') {
            throw new Error('[event] value is not a function');
        }
        fn(e);
    }

    onDestroy() {
        undelegate(this.el, this.attributes['selector'], 'click', this._onEvent);
        if (this.subview) this.subview.$destroy();
    }
}