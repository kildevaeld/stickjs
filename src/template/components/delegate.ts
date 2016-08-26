'use strict';
import * as templ from 'templ/lib/view';
import {bind, delegate, undelegate} from 'utilities';
import {ComponentDefinition} from '../index'
import {BaseComponent} from './base-component';
import {TemplateView} from '../template.view';

export class Delegate extends BaseComponent {
    private subview: TemplateView; 
    private el: HTMLElement;
    initialize (): Promise<void> {
        this._onEvent = bind(this._onEvent, this);

        return this.childTemplate.render(this.view.context, {
            parent: this.view
        }).then( view => {
            this.subview = view as TemplateView;
            return this.subview.render();            
        }).then( el => {
            this.el = this.document.createElement('div');
            this.el.appendChild(el);

            this.section.appendChild(this.el);

            let event = this.attributes['event']||'click'

            delegate(this.el, this.attributes['selector'], 'click', this._onEvent);
        });

    }

    update (): Promise<void> {
        return Promise.resolve();
    }

    private _onEvent(e:Event) {
        var self = this;

        var fn: any = this.attributes['click'];
        
        //let fn;
        if (fn instanceof templ.Assignment) {
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
/*
export const Delegate: ComponentDefinition = {
    initialize: function initialize($container) {
        this._onEvent = bind(this._onEvent, this);

        var view = this.childTemplate.view(this.view.context, {
            parent: this.view
        });

        this._subview = view;

        this._container = this.document.createElement('div');
        this._container.appendChild(view.render());

        this.section.appendChild(this._container);


        delegate(this._container, this.attributes.selector, 'click', this._onEvent);
    },
    update: function update() { },
    _onEvent: function _onEvent(e) {
        var self = this;

        var fn = this.attributes.click;
        
        //let fn;
        if (fn instanceof templ.Assignment) {
            fn = fn.assign;
        }

        if (typeof fn !== 'function') {
           
            throw new Error('[event] value is not a function');
        }
        fn(e);
    },
    onDestroy: function destroy() {
        undelegate(this._container, this.attributes.selector, 'click', this._onEvent);
        this._subview.$destroy();
    }
}*/
