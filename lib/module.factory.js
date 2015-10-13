import { getDependencies, setActivator, DependencyType, setDependencyType } from './internal';
import { StickError } from './typings';
import { FactoryActivator } from 'di';
import * as utils from 'utilities';
import { getContext } from './context';
import { ControllerFactory } from './controller.factory';
export class ModuleFactory {
    constructor(name, module, container) {
        if (arguments.length != 3) {
            throw new Error();
        }
        this.name = name;
        this.module = module;
        this.container = container;
        this.container.registerSingleton(name, module);
        this.container.registerInstance('$container', this.container);
    }
    controller(name, definition) {
        let [def, deps] = getDependencies(definition);
        if (def) {
            let fn;
            if (typeof def !== 'function' && utils.isObject(def)) {
                let copy = utils.extend({}, def);
                if (typeof def.initialize === 'function') {
                    fn = def.initialize;
                    delete copy.initialize;
                }
                else if (typeof def.constructor === 'function') {
                    fn = def.constructor;
                    delete copy.constructor;
                }
                if (!deps || deps.length == 0) {
                    getDependencies(fn);
                }
                utils.assign(fn.prototype, copy);
            }
            else if (typeof def === 'function') {
                fn = def;
            }
            if (typeof fn !== 'function') {
                throw new StickError('controller defition should be a function or an object literal');
            }
            setDependencyType(DependencyType.Controller)(fn);
            let factory = new ControllerFactory(name, fn, this.container.createChild());
            this.container.registerInstance(name, factory);
        }
        else {
            throw new StickError("controller definition should be a function, function constructor or a object literal");
        }
        return this;
    }
    service(name, definition) {
        let [fn] = getDependencies(definition);
        if (fn && typeof fn === 'function') {
            setDependencyType(DependencyType.Service)(fn);
            this.container.registerSingleton(name, fn);
        }
        else {
            throw new StickError('service should be a function');
        }
        return this;
    }
    factory(name, factory) {
        let [fn] = getDependencies(factory);
        if (!fn)
            throw new StickError('factory');
        if (typeof fn === 'function') {
            setDependencyType(DependencyType.Factory)(fn);
            setActivator(fn, FactoryActivator.instance);
            this.container.registerSingleton(name, fn);
        }
        else {
            this.container.registerInstance(name, fn);
        }
        return this;
    }
    create(options = {}) {
        if (this.container.hasInstance(this.name)) {
            return utils.Promise.resolve(this.container.get(this.name));
        }
        this.container.registerSingleton('$context', getContext());
        let ctx = this.container.get('$context');
        if (options.el) {
            let $template = this.container.get('$templateCreator');
            let templateString = options.el.innerHTML;
            this.factory('template', ['$context', (ctx) => {
                    return $template(templateString, ctx.__model);
                }]);
        }
        ctx.$observe();
        let mod = this.container.get(this.name);
        ctx.$unobserve();
        //let mod
        if (options.el) {
            let el = this.container.get('template').render();
            options.el.innerHTML = '';
            options.el.appendChild(el);
        }
        return utils.Promise.resolve(mod);
    }
    destroy() {
        this.container.destroy();
    }
}
