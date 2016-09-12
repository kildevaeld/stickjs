declare var require: any;
import {Container} from './container';
import * as utils from 'utilities';
import {EventEmitter} from 'eventsjs';
import {State} from './state';
import {setActivator} from './internal'
import {FactoryActivator} from 'stick.di'
import {TemplateCreator, TemplateResolver} from './services/template'
import {StickError} from './errors'
import {TemplateView} from './template/template.view'
import {Template} from 'templ/lib/vnode/index'

const debug = require('debug')('stick:factory:controller');

export interface ControllerCreateOptions {
    el?: HTMLElement;
    template?: string | Template;
    contextName: string;
    parentView?: TemplateView;
    state: any;
}

const wrap = (el: Node, name:string, contextName: string) => {
    let div = document.createElement('controller');
    div.setAttribute('name', name);

    if (contextName != name) div.setAttribute('as', contextName);

    div.appendChild(el);
    return div;
}


export class ControllerFactory extends EventEmitter {
    public controller: FunctionConstructor;
    public container: Container;
    public name: string;
    private _id: string;

    get id(): string {
        return this._id;
    }

    constructor(name: string, controller: FunctionConstructor, container: Container) {
        super();
        this.container = container
        this.controller = controller
        this.name = name;
        this._id = utils.uniqueId("ctrl");
        if (typeof controller === 'function' && controller.name == "") {
            try {
                Object.defineProperty(controller, 'name', {
                    value: name
                });
            } catch (e) {}
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
    async create(options: ControllerCreateOptions): Promise<any> {

        if (this.container.hasInstance(this.name)) {
            return utils.Promise.resolve(this.container.get(this.name));
        }


        this.container.registerSingleton(this.name, this.controller);
        let contextName = options.contextName || this.name

        // State
        let $state: State = await this.container.get('$state');
        $state = $state.createChild(this.container, options.state);
        this.container.registerInstance('$state', $state, true);

        // Template
        let template = await this.resolveTemplate($state, options);
        debug("%s: Created template: %s", this.id, template.id);
        this.container.registerInstance('template', template, true);

        debug("%s: Instantiating controller '%s' as '%s'", this.id, this.name, contextName);
        let controller = await this.container.get(this.name);

        $state.set(contextName, controller);
        template.setTarget(controller)

        this.trigger('before:template:render');


        let el = await template.render();
        // Wrap element if its a DocumentFragment
        if (el.nodeType === 11 || el.nodeType === 3) {
            if ((<any>el).children.length === 1) {
                el = el.firstChild.nodeType === 3 ? wrap(el, this.name, contextName) : <HTMLElement>el.firstChild;
            } else {
                el = wrap(el, this.name, contextName);
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

    }

    async resolveTemplate(state: State, options: ControllerCreateOptions): Promise<TemplateView> {
        let $template: TemplateCreator = await this.container.get('$templateCreator');
        let $resolver: TemplateResolver = await this.container.get('$templateResolver');
        let promise: utils.IPromise<string>

        if (options.el && !options.template) {
            let templateString = options.el.innerHTML;
            promise = utils.Promise.resolve(templateString)

        } else if (options.template) {
            if (options.template instanceof Template) {
                
                let view = await (<Template>options.template).render(state, {
                    container: this.container,
                    parentView: options.parentView
                })

                return view as TemplateView;
            }

            promise = $resolver(<string>options.template);

        } else {
            return utils.Promise.reject(new StickError("no element or template"));
        }

        let templateString = await promise;

        return $template(templateString, state);

    }

    async destroy() {
        debug("%s: Destroying controller '%s'", this.id, this.name);

        let controller = await this.container.get(this.name);

        if (typeof controller.onDestroy === 'function') {
            controller.onDestroy.call(controller);
        }

        this.container.clear();
        this.container.entries.clear()
    }
}
