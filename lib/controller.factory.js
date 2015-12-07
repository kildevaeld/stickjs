var utils = require('utilities');
var typings_1 = require('./typings');
var templ = require('templ');
class ControllerFactory {
    constructor(name, controller, container) {
        this.container = container;
        this.controller = controller;
        this.name = name;
    }
    create(options) {
        if (this.container.hasInstance(this.name)) {
            return utils.Promise.resolve(this.container.get(this.name));
        }
        this.container.registerSingleton(this.name, this.controller);
        let $context = this.container.get('$context');
        this.container.registerInstance('$context', $context.$createChild(), true);
        $context = this.container.get('$context');
        let contextName = options.contextName || this.name;
        return this.resolveTemplate($context, options)
            .then(template => {
            this.container.registerInstance('template', template, true);
            let el = template.render();
            $context.$observe();
            let controller = this.container.get(this.name);
            $context[contextName] = controller;
            $context.$unobserve();
            if (options.el) {
                options.el.innerHTML = '';
                options.el.appendChild(el);
            }
            return controller;
        });
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
        this.container.clear();
        this.container.entries.clear();
    }
}
exports.ControllerFactory = ControllerFactory;
