'use strict';

import {ComponentDefinition} from '../index'
import {BaseComponent} from './base-component';
import {TemplateView} from '../template.view';

export class Show extends BaseComponent {
  _shown: any;
  subview: TemplateView;
  update(): Promise<void> {
    let show = this.attributes['when'];

    if (this._shown === show) {
      if (this.subview) {
        this.subview.update();
      }
      return Promise.resolve();
    }

    this._shown = show;

    if (show) {
      if (!this.subview) {
        return this.childTemplate.render(this.view.context, {
          parent: this.view
        }).then((view) => {
          this.subview = view as TemplateView;
          return this.subview.render()
        }).then( elm => {
          this.section.appendChild(elm);
        }) 
      }

    } else {
      if (this.subview) {
        this.subview.$destroy();
      }
      this.subview = void 0;
    }
  }

  onDestroy() {
    if (this.subview) this.subview.$destroy();
  }
}

export class Hide extends BaseComponent {
  _hide: any
  subview: TemplateView;
  update(): Promise<void> {
    var hide = this.attributes['when'];

    if (this._hide === hide) {
      if (this.subview) {
        this.subview.update();
      }
      return Promise.resolve();
    }

    this._hide = hide;

    if (!hide) {
      if (!this.subview) {
        return this.childTemplate.render(this.view.context, {
          parent: this.view
        }).then((view) => {
          this.subview = view as TemplateView;
          return this.subview.render()
        }).then( elm => {
          this.section.appendChild(elm);
        });
      }

      

    } else {

      if (this.subview) {
        this.subview.$destroy();
      }
      this.subview = void 0;
    }
  

  }

  onDestroy() {
    if (this.subview) this.subview.$destroy();
  }
}
