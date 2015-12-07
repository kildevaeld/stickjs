var internal_1 = require('./internal');
var typings_1 = require('./typings');
var di_1 = require('di');
var utils = require('utilities');
var templ = require('templ');
var context_1 = require('./context');
var controller_factory_1 = require('./controller.factory');
class ModuleFactory {
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
        let [def, deps] = internal_1.getDependencies(definition);
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
                    internal_1.getDependencies(fn);
                }
                utils.assign(fn.prototype, copy);
            }
            else if (typeof def === 'function') {
                fn = def;
            }
            if (typeof fn !== 'function') {
                throw new typings_1.StickError('controller defition should be a function or an object literal');
            }
            internal_1.setDependencyType(internal_1.DependencyType.Controller)(fn);
            let factory = new controller_factory_1.ControllerFactory(name, fn, this.container.createChild());
            this.container.registerInstance(name, factory, true);
        }
        else {
            throw new typings_1.StickError("controller definition should be a function, function constructor or a object literal");
        }
        return this;
    }
    service(name, definition) {
        let [fn] = internal_1.getDependencies(definition);
        if (fn && typeof fn === 'function') {
            internal_1.setDependencyType(internal_1.DependencyType.Service)(fn);
            this.container.registerSingleton(name, fn);
        }
        else {
            throw new typings_1.StickError('service should be a function');
        }
        return this;
    }
    factory(name, factory) {
        let [fn] = internal_1.getDependencies(factory);
        if (!fn)
            throw new typings_1.StickError('factory');
        if (typeof fn === 'function') {
            internal_1.setDependencyType(internal_1.DependencyType.Factory)(fn);
            internal_1.setActivator(fn, di_1.FactoryActivator.instance);
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
        this.container.registerSingleton('$context', context_1.getContext());
        let ctx = this.container.get('$context');
        if (options.parent) {
            this.container.parent = options.parent;
            if (options.parent.hasHandler('$context')) {
                ctx.__parent = options.parent.get('$context');
            }
        }
        if (options.template || options.el) {
            return this.resolveTemplate(ctx, options)
                .then((template) => {
                this.container.registerInstance("template", template, true);
                if (options.el) {
                    let el = this.container.get('template').render();
                    options.el.innerHTML = '';
                    options.el.appendChild(el);
                    this.container.registerInstance('$elm', options.el, true);
                }
                ctx.$observe();
                let mod = this.container.get(this.name);
                ctx.$unobserve();
            });
        } /*else if (options.el) {

            // Add mutation observer
            let observer = new Observer()
            this.container.registerInstance('$observer', observer, true);


            // Instatiate template
            let $template: TemplateCreator = this.container.get('$templateCreator');

            let templateString = options.el.innerHTML;
            this.factory('template', ['$context', (ctx) => {
                return $template(templateString, (<any>ctx).__model)
            }]);
        }

        if (options.el) {
            let el = this.container.get('template').render()
            options.el.innerHTML = '';
            options.el.appendChild(el);
            this.container.registerInstance('$elm', options.el, true)
        }
        */
        ctx.$observe();
        let mod = this.container.get(this.name);
        ctx.$unobserve();
        return utils.Promise.resolve(mod);
    }
    resolveTemplate(ctx, options) {
        let $template = this.container.get('$templateCreator');
        let promise;
        if (options.el) {
            let templateString = options.el.innerHTML;
            promise = utils.Promise.resolve(templateString);
        }
        else if (options.template) {
            if (options.template instanceof templ.vnode.Template) {
                let view = options.template.view(ctx.__model, {
                    container: this.container
                });
                return utils.Promise.resolve(view);
            }
            promise = this.container.get('$templateResolver')(options.template);
        }
        else {
            return utils.Promise.reject(new typings_1.StickError("no element or template"));
        }
        return promise.then((templateString) => {
            return $template(templateString, ctx.__model);
        });
    }
    destroy() {
        //this.container.destroy();
    }
}
exports.ModuleFactory = ModuleFactory;
