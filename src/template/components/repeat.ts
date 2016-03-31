import * as decorators from '../../decorators';
import {Collection, IModel, NestedModel, ICollection, Model} from 'collection'
import {bind} from 'utilities/lib/index'
import {ComponentDefinition} from '../index'
import {BaseComponent} from './base-component';
import {TemplateView} from '../template.view';

@decorators.component("repeat")
export class Repeat extends BaseComponent {
  private _children: TemplateView[];
  private _collection: any;

  initialize () {
    this._children = []
    
    this._collection = [];
  }

  update() {

    var as = this['as'];
    var each = this['each'];
    var key = this['key'] || "key";

    var n = 0;
    var self = this;
    var parent = this.view;

    if (each === this._collection || !each) {
      return
    }

    if (this._collection && this._collection instanceof Collection) {
      this.__removeEventListeners(this._collection)

    }

    this._collection = each

    this._update()

    if (each instanceof Collection) {
      this.__addEventListeners(each)
    }

  }

  _update() {

    var properties;
    var as = this['as'];
    var parent = this.view
    var n = 0

    var self = this

    var filter = this['filter'] || function(a) { return true }

    this._collection.forEach(function(m: IModel) {

      if (!filter(m)) { return; }

      var child;

      if (as) {
        properties = new NestedModel({ [as]: m, self: this.view.context });
      } else {
        properties = m;
      }
      
      //if (properties instanceof Model)

      // TODO - provide SAME context here for speed and stability
      if (n >= this._children.length) {

        child = this.childTemplate.view(properties, {
          parent: parent
        });


        this._children.push(child);

        this.section.appendChild(child.render(properties));

      } else {
        child = this._children[n];
        child.context = properties;
        child.update();
      }

      n++;

    }, this);

    this._children.splice(n).forEach(function(child) {
      (<any>child).$destroy();
    });


  }

  __addEventListeners<T extends IModel>(collection: Collection<T>) {

    collection.on('add', this._update, this);
    collection.on('remove', this._update, this);
    collection.on('reset', this._update, this);
    collection.on('filter', this._update, this);
  }

  __removeEventListeners<T extends IModel>(collection: Collection<T>) {
    collection.off('remove', this._update);
    collection.off('add', this._update);
    collection.off('reset', this._update);
    collection.off('filter', this._update);
  }

  setAttribute(key: string, value: any) {
    this[key] = value

  }



  onDestroy() {
    if (this._collection && typeof this._collection.destroy === 'function') {
      this._collection.destroy();
    }

    for (let child of this._children) {
      child.$destroy();
    }
  }

}

/*export const Repeat: ComponentDefinition = {

  initialize() {
    this._children = []
    this._collection = [];

  },

  update() {

    var as = this['as'];
    var each = this['each'];
    var key = this['key'] || "key";

    var n = 0;
    var self = this;
    var parent = this.view;

    if (each === this._collection || !each) {
      return
    }

    if (this._collection && this._collection instanceof Collection) {
      this.__removeEventListeners(this._collection)

    }

    this._collection = each

    this._update()

    if (each instanceof Collection) {
      this.__addEventListeners(each)
    }

  },

  _update() {

    var properties;
    var as = this['as'];
    var parent = this.view
    var n = 0

    var self = this

    var filter = this['filter'] || function(a) { return true }

    this._collection.forEach(function(m: IModel) {

      if (!filter(m)) { return; }

      var child;

      if (as) {
        properties = new NestedModel({ [as]: m, self: this.view.context });
      } else {
        properties = m;
      }

      // TODO - provide SAME context here for speed and stability
      if (n >= this._children.length) {

        child = this.childTemplate.view(properties, {
          parent: parent
        });


        this._children.push(child);

        this.section.appendChild(child.render(properties));

      } else {
        child = this._children[n];
        child.context = properties;
        child.update();
      }

      n++;

    }, this);

    this._children.splice(n).forEach(function(child) {
      (<any>child).$destroy();
    });


  },

  __addEventListeners<T extends IModel>(collection: Collection<T>) {

    collection.on('add', this._update, this);
    collection.on('remove', this._update, this);
    collection.on('reset', this._update, this);
    collection.on('filter', this._update, this);
  },

  __removeEventListeners<T extends IModel>(collection: Collection<T>) {
    collection.off('remove', this._update);
    collection.off('add', this._update);
    collection.off('reset', this._update);
    collection.off('filter', this._update);
  },

  setAttribute(key: string, value: any) {
    this[key] = value

  },

  setProperty() {
    console.log(arguments)
  },

  onDestroy() {
    if (this._collection && typeof this._collection.destroy === 'function') {
      this._collection.destroy();
    }

    for (let child of this._children) {
      child.$destroy();
    }
  }
}*/