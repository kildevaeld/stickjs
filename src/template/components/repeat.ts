import * as decorators from '../../decorators';
import {Collection, IModel, NestedModel, ICollection, Model} from 'collection'
import {bind} from 'utilities/lib/index'
import {ComponentDefinition} from '../index'
import {BaseComponent} from './base-component';
import {TemplateView} from '../template.view';
import {isCall} from 'templ/lib/action';

function iterate(list, fn: (model:IModel, index: number) => Promise<void>): Promise<void> {
  
  if (list instanceof Collection) {
    list = list.models;
  } else if (list instanceof TemplateView) {
    return Promise.resolve();
  }
  
  return new Promise<any>((resolve, reject) => {
      let promises = [];
      for (let i = 0, ii = list.length; i < ii; i++ ) {
        promises.push(fn(list[i], i));
      }
      Promise.all(promises).then(resolve).catch(reject);
  })
}

@decorators.component("repeat")
export class Repeat extends BaseComponent {
  private _children: TemplateView[];
  private _collection: any;

  initialize (): Promise<void> {
    this._children = []
    
    this._collection = [];

    return this.childTemplate.render(this.view.context, {
      parent: this.view
    }).then( v => {});
  }

  update(): Promise<void> {
    
    var as = this['as'];
    var each = this['each'];
    var key = this['key'] || "key";

    var n = 0;
    var self = this;
    var parent = this.view;
    
    if (each === this._collection || each == null) {
      return Promise.resolve();
    }

    if (isCall(each)) {
        each = each.call();
    }
    
    if (this._collection && this._collection instanceof Collection) {
      this.__removeEventListeners(this._collection)

    }

    this._collection = each

    return this._update()
    .then(() => {
      if (each instanceof Collection) {
        this.__addEventListeners(each)
      }
    });

  }

  _update() {
    var properties;
    var as = this['as'];
    var parent = this.view
    var i = 0

    var filter = this['filter'] || function(a) { return true }

    
    
    return iterate(this._collection, (m: IModel, n) => {

      if (!filter(m)) { return Promise.resolve(); }

      var child;

      if (as) {
        properties = new NestedModel({ [as]: m, self: this.view.context });
      } else {
        properties = m;
      }
      
      //if (properties instanceof Model)

      // TODO - provide SAME context here for speed and stability
      if (n >= this._children.length) {

        /*child = await this.childTemplate.view(properties, {
          parent: parent
        });*/

        return this.childTemplate.view(properties, {
          parent: parent
        }).then( child => {
          this._children.push(<TemplateView>child);

          this.section.appendChild(child.section.render());
          i++
          
          return (<TemplateView>child).render().then( e => {});

        });


        
      } else {
        child = this._children[n];
        child.context = properties;
        child.update();
        i++;
        return Promise.resolve();
      }
      
      

    }).then(() => {
      
      this._children.splice(i).forEach(function(child) {
        (<any>child).$destroy();
      });
    })

    
    
  }

  _update2() {

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