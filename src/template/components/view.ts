
import {BaseComponent} from './base-component';
import {TemplateView} from '../template.view';
import * as decorators from '../../decorators';

@decorators.component("view")
export class View extends BaseComponent {
  subview: TemplateView;
  resolving: boolean = false;

  async update () {

      if (this.subview) {
          return this.subview.update();
      }

      if (this.resolving) {
          return;
      }

      this.resolving = true;

      let template = this.attributes['template'];

      let context = this.attributes['context'];

      if (!context) {
        context = this.view.context;
      }

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

