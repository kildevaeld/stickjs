'use strict';

import {ComponentDefinition} from '../index'

export const Show: ComponentDefinition = {
  initialize: function initialize() {

  },
  update: function update() {
    var show = this.attributes.when;

    if (this._show === show) {
      if (this._subview) {
        this._subview.update();
      }
      return;
    }

    this._show = show;

    if (show) {
      if (!this._subview) {
        this._subview = this.childTemplate.view(this.view.context, {
          parent: this.view,
          container: this.view.container,
          target: this.view.target
        });
      }

      this.section.appendChild(this._subview.render());

    } else {
      if (this._subview) {
        this._subview.remove();
      }
    }
  },

  onDestroy: function destroy() {

    if (this._subview)
      this._subview.$destroy();
  }
}

export const Hide: ComponentDefinition = {
  initialize: function initialize() {

  },
  update: function update() {
    var hide = this.attributes.when;

    if (this._hide === hide) {
      if (this._subview) {
        this._subview.update();
      }
      return;
    }

    this._hide = hide;

    if (!hide) {
      if (!this._subview) {
        this._subview = this.childTemplate.view(this.view.context, {
          parent: this.view,
          container: this.view.container,
          target: this.view.target
        });
      }

      this.section.appendChild(this._subview.render());

    } else {

      if (this._subview) {
        this._subview.remove();
      }

    }
  },

  onDestroy: function destroy() {
    if (this._subview)
      this._subview.$destroy();
  }
};


