declare var require: any;
import {Container} from './container'
import {getDependencies, setActivator, DependencyType, setDependencyType} from './internal'
import {EventEmitter} from 'eventsjs';
import {Repository} from './repository';
import {StickError} from './errors'
import {FactoryActivator} from 'di'
import * as utils from 'utilities'
import {Template} from 'templ/lib/vnode'
import {TemplateView} from './template/template.view'
import {State} from './state';

import {TemplateCreator, TemplateResolver} from './services/template'
import {ControllerFactory} from './controller.factory'
//import {Observer} from './observer'
const debug = require('debug')('stick:factory:module');

const wrap = (el: Node, name: string) => {
    let div = document.createElement('module');
    div.setAttribute('name', name);

    //if (contextName != this.name) div.setAttribute('as', contextName);

    div.appendChild(el);
    return div;
}

export type ControllerDefinition = FunctionConstructor | Object | any[];

export interface ModuleCreateOptions {
    el?: HTMLElement
    parent?: Container
    template?: string | Template
}

export class ModuleFactory extends EventEmitter {
    name: string;
    module: FunctionConstructor;
    container: Container;
    private _id: string;

    get id() {
        return this._id;
    }

    constructor(name: string, module: FunctionConstructor, container: Container) {
        super();
        if (arguments.length != 3) {
            throw new Error();
        }

        this.name = name
        this.module = module
        this.container = container

        if (typeof module === 'function' && module.name == "") {
            Object.defineProperty(module, 'name', {
                value: name
            });

        }
        this._id = utils.uniqueId("mod");
        debug("%s: Module factory created: '%s', container: %s", this.id, name, this.container.id);

        this.container.registerSingleton(name, module);
        this.container.registerInstance('$container', this.container);
    }

    controller(name: string, definition: ControllerDefinition): ModuleFactory {

        let [def, deps] = getDependencies(definition)

        if (def) {
            let fn
            if (typeof def !== 'function' && utils.isObject(def)) {
                let copy = utils.extend({}, def);
                if (typeof (<any>def).initialize === 'function') {
                    fn = (<any>def).initialize
                    delete (<any>copy).initialize
                } else if (typeof def.constructor === 'function') {
                    fn = def.constructor
                    delete copy.constructor
                }

                if (!deps || deps.length == 0) {
                    getDependencies(fn);
                }

                utils.assign(fn.prototype, copy);

            } else if (typeof def === 'function') {
                fn = def
            }

            if (typeof fn !== 'function') {
                throw new StickError('controller defition should be a function or an object literal')
            }
            setDependencyType(DependencyType.Controller)(fn);

            let factory = new ControllerFactory(name, fn, this.container.createChild());
            this.container.registerInstance(name, factory, true);
            debug("%s: Register controller: '%s', %s", this.id, name, factory.id);

        } else {
            throw new StickError("controller definition should be a function, function constructor or a object literal");
        }

        return this;
    }

    service(name: string | FunctionConstructor, definition: Function): ModuleFactory {
        let [fn] = getDependencies(definition);



        if (fn && typeof fn === 'function') {
            setDependencyType(DependencyType.Service)(fn);
            this.container.registerService(name, fn);
            debug("%s Register service %s", this.id, name);
        } else {
            throw new StickError('service should be a function');
        }

        return this
    }

	/**
	 * Create a factory function
	 * @param {String} name
	 */
    factory(name: string, factory: any | any[]): ModuleFactory {

        let [fn] = getDependencies(factory);

        if (!fn) throw new StickError('factory');
        debug("%s Register factory %s", this.id, name);
        if (typeof fn === 'function') {
            setDependencyType(DependencyType.Factory)(fn);
            setActivator(fn, FactoryActivator.instance);
            this.container.registerSingleton(name, fn)
        } else {
            this.container.registerInstance(name, fn);
        }

        return this;
    }

	/**
	 * Create a new instance of the module
	 * @method create
	 * @params {Object} options
	 * @return {Promise}
	 *
	 * Call onTemplateRender (), onElementAttached
	 * emits before:template:render, template:render, before:element:attached, element:attached
	 *
	*/
    async create(options: ModuleCreateOptions = {}): Promise<any> {
        // There can only be one.
        if (this.container.hasInstance(this.name)) {
            debug("%s: Resolving module %s", this.id, this.name);
            //return utils.Promise.resolve(this.container.get(this.name));
            return this.container.get(this.name);
        }

        this.container.registerSingleton('$state', State);

        let state: State = await this.container.get('$state');

        debug("%s: Creating module %s", this.id, this.name);

        if (options.template || options.el) {

            let template = await this.resolveTemplate(state, options);

            debug("%s: Created template: %s", this.id, template.id);
            this.container.registerInstance('template', template, true);
            debug("%s: Instantiating module '%s'", this.id, this.name);
            let mod = await this.container.get(this.name);
            template.setTarget(mod)

            //$state.set(contextName, controller);

            this.trigger('before:template:render');

            let el = template.render();

            if (el.nodeType === 11 || el.nodeType === 3) {
                if ((<any>el).children.length === 1) {
                    el = el.firstChild.nodeType === 3 ? wrap(el, this.name) : <HTMLElement>el.firstChild;
                } else {
                    el = wrap(el, this.name);
                }
            }

            this.container.registerInstance('$el', el, true)

            if (typeof mod.onTemplateRender === 'function') {
                mod.onTemplateRender.call(mod, el, template);
            }

            this.trigger('template:render');


            if (options.el) {

                this.trigger('before:element:attached', options.el);
                options.el.innerHTML = '';
                options.el.appendChild(el);
                if (typeof mod.onElementAttached === 'function') {
                    mod.onElementAttached.call(mod, el, options.el);
                }
                this.trigger('element:attached', el, options.el)
            }

            return mod;
        }

        return this.container.get(this.name);
    }

    public async configure<T>(name: string): Promise<T> {
        let configName = name;
        if (!/Provider$/.test(name)) {
            configName = name + 'Provider';
        } else {
            name = name.replace('Provider', '');
        }

        let provider;
        // Check if provider is registered
        if (this.container.hasHandler(configName, false, false)) {
            return this.container.get(name);
            // Register module, if exists, at try loading the provider again
        } else if (Repository.has(DependencyType.Service, name)) {
            let serv = Repository.get(DependencyType.Service, name);
            this.container.register(serv);
            if (this.container.hasHandler(configName, false, false)) {
                return this.container.get(configName);
            }
        }

        throw new Error('No provider for ' + name.replace('Provider', ''));
    }

    private async resolveTemplate(state: State, options: ModuleCreateOptions): Promise<TemplateView> {
        let $template: TemplateCreator = await this.container.get('$templateCreator');
        let $resolver: TemplateResolver = await this.container.get('$templateResolver');
        let promise: utils.IPromise<string>

        if (options.el && !options.template) {
            let templateString = options.el.innerHTML;
            promise = utils.Promise.resolve(templateString)

        } else if (options.template) {
            if (options.template instanceof Template) {
                let view = <TemplateView>(<Template>options.template).view(state, {
                    container: this.container,
                });
                return view;
            }

            promise = $resolver(<string>options.template);

        } else {
            return utils.Promise.reject(new StickError("no element or template"));
        }

        let templateString = await promise;

        return $template(templateString, state);
    }


    destroy() {
        //this.container.destroy();
    }
}
