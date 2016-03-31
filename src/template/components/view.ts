
import {BaseComponent} from './base-component';
import {TemplateView} from '../template.view';
import * as decorators from '../../decorators';
import {NestedModel} from 'collection';
import {Call} from '../'

@decorators.component("view")
export class View extends BaseComponent {
  subview: TemplateView;
  resolving: boolean = false;

  getContext () {
    let context: any = this.attributes['context'];

        if (!context) {
          context = this.view.context;
        } else {

          if (context instanceof Call) {
            context = context.call();
          }

        if (this.attributes['as']) {
          let as = this.attributes['as']
          context = new NestedModel({[as]: context})
        }
      }

      return context;
  }



  async update () {

      if (this.subview) {
        /*let context: any = this.attributes['context'];

        if (!context) {
          context = this.view.context;
        } else {

        if (context instanceof Call) {
          context = concext.call();
        }

        if (this.attributes['as']) {
          let as = this.attributes['as']
          context = new NestedModel({[as]: context})
        }*/

      //}

        //let context = this.getContext();
        //if (this.subview.context == context) return this.subview.update();
        //this.subview.context = context;
        //console.log('Conext', context)
        //return;
        return this.subview.update();
      }

      if (this.resolving) return;


      this.resolving = true;

      let template = this.attributes['template'];

      /*let context: any = this.attributes['context'];
      console.log('HAS CONTEXT', context);
      if (!context) {
        context = this.view.context;
      } else {
        if (this.attributes['as']) {
          let as = this.attributes['as']
          context = new NestedModel({[as]: context})
        }
      }*/
      let context = this.getContext();

      if (!template || template == "") {
          return;
      }

      let creator = await this.view.container.get('$templateCreator');
      let resolver = await this.view.container.get('$templateResolver');

      let tString = await resolver(template)

      let view = creator(tString, context);
      view.parent = this.view;
      this.subview = view;

      this.section.appendChild(view.render());
      this.resolving = false;

  }

}

