declare var require:any;
import {Container} from './container';
import * as utils from 'utilities';
import {EventEmitter} from 'eventsjs';
import {State} from './state';
import {setActivator} from './internal'
import {FactoryActivator} from 'stick.di'
import {TemplateCreator, TemplateResolver} from './services/template'
import {StickError} from './errors'
import {TemplateView} from './template/template.view'
import {Template} from 'templ/lib/vnode'

const debug = require('debug')('stick:factory:controller');

export interface ControllerCreateOptions {
    el?: HTMLElement
    template?: string | Template
    contextName: string
}

export class ControllerFactory extends EventEmitter {
    controller: FunctionConstructor;
    container: Container;
    name: string;
    private _id: string;
    
    get id (): string {
        return this._id;
    }
    
    constructor(name: string, controller: FunctionConstructor, container: Container) {
        super();
        this.container = container
        this.controller = controller
        this.name = name;
        this._id = utils.uniqueId("ctrl");
        if (typeof controller === 'function' && controller.name == "") {
            Object.defineProperty(controller, 'name', {
                value: name
            });
        }
        debug("%s: Controller factory created: '%s', container %s", this.id, name, this.container.id);
    }

	/**
	 * Create an instance of a controller
	 * @param  {ControllerCreateOptions} options
	 * @return {utils.IPromise<any>}
	 * Call onTemplateRender (), onElementAttached
	 * emits before:template:render, template:render, before:element:attached, element:attached
	 */
    create(options: ControllerCreateOptions): utils.IPromise<any> {

        if (this.container.hasInstance(this.name)) {
            return utils.Promise.resolve(this.container.get(this.name));
        }

        this.container.registerSingleton(this.name, this.controller);

        let $state: State = this.container.get('$state').createChild(this.container);
        this.container.registerInstance('$state', $state, true);


        let contextName = options.contextName || this.name
        
	    debug("%s: Creating controller '%s' as '%s'", this.id, this.name, contextName);
        let controller = this.container.get(this.name); 
        return this.resolveTemplate($state, options)
            .then(template => {
	            debug("%s: Created template: %s", this.id, template.id); 
                this.container.registerInstance('template', template, true);


                //let controller = this.container.get(this.name);
                template.setTarget(controller)

                $state.set(contextName, controller);

                this.trigger('before:template:render');

                let el = template.render();

                if (el instanceof DocumentFragment) {

                    if ((<any>el).children.length === 1) {
                        el = (<any>el).firstChild;
                    } else {
                        let div = document.createElement('controller');
                        div.appendChild(el);
                        el = div;
                    }
                }

                this.container.registerInstance('$el', el, true)

                if (typeof controller.onTemplateRender === 'function') {
                    controller.onTemplateRender.call(controller, el, template);
                }

                this.trigger('template:render');


                if (options.el) {

                    this.trigger('before:element:attached', options.el);
                    options.el.innerHTML = '';
                    options.el.appendChild(el);
                    if (typeof controller.onElementAttached === 'function') {
                        controller.onElementAttached.call(controller, el, options.el);
                    }
                    this.trigger('element:attached', el, options.el)
                }

                return controller;
            });


    }

    resolveTemplate(state: State, options: ControllerCreateOptions): utils.IPromise<TemplateView> {
        let $template: TemplateCreator = this.container.get('$templateCreator');
        let promise: utils.IPromise<string>
        if (options.el && !options.template) {
            let templateString = options.el.innerHTML;
            promise = utils.Promise.resolve(templateString)
        } else if (options.template) {
            if (options.template instanceof Template) {
                let view = (<Template>options.template).view(state, {
                    container: this.container,
                });
                return utils.Promise.resolve(view);
            }

            promise = this.container.get('$templateResolver')(options.template)

        } else {
            return utils.Promise.reject(new StickError("no element or template"));
        }

        return promise.then((templateString) => {
            return $template(templateString, state)
        })
    }

    destroy() {
        debug("%s: Destroying controller '%s'", this.id, this.name); 
        this.container.clear();
        this.container.entries.clear()
    }
}
