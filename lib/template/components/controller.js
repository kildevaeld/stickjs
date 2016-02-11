"use strict";

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) {
            return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) {
                resolve(value);
            });
        }
        function onfulfill(value) {
            try {
                step("next", value);
            } catch (e) {
                reject(e);
            }
        }
        function onreject(value) {
            try {
                step("throw", value);
            } catch (e) {
                reject(e);
            }
        }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
var controller_factory_1 = require('../../controller.factory');
exports.Controller = {
    initialize: function initialize($container) {
        if (this.attributes['name']) {
            this.name = this.attributes['name'];
            this.as = this.attributes['as'] || this.name;
        }
        // this.factory = $container.get(this.name);
        // if (!(this.factory instanceof ControllerFactory)) {
        // 	throw new Error(this.name + ' is not a controller');
        // }
        // let template:string|Template = this.childTemplate
        // if (this.attributes['template']) {
        // 	template = this.attributes['template'];
        // }
        // this.factory.create({
        // 	template: template,
        // 	contextName: this.as
        // }).then( controller => {
        // 	let el = this.factory.container.get('$el');
        // 	this.section.appendChild(el);
        // });
    },
    update: function update() {
        return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee() {
            var template, controller, el;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            if (!this.factory) {
                                _context.next = 3;
                                break;
                            }

                            if (this.factory.container.hasHandler('template')) {}
                            return _context.abrupt("return");

                        case 3:
                            _context.next = 5;
                            return this.view.container.get(this.name);

                        case 5:
                            this.factory = _context.sent;

                            if (this.factory instanceof controller_factory_1.ControllerFactory) {
                                _context.next = 8;
                                break;
                            }

                            throw new Error(this.name + ' is not a controller');

                        case 8:
                            template = this.childTemplate;

                            if (this.attributes['template']) {
                                template = this.attributes['template'];
                            }
                            _context.next = 12;
                            return this.factory.create({
                                template: template,
                                contextName: this.as,
                                parentView: this.view
                            });

                        case 12:
                            controller = _context.sent;
                            _context.next = 15;
                            return this.factory.container.get('$el');

                        case 15:
                            el = _context.sent;

                            this.section.appendChild(el);
                            /*this.factory.create({
                                template: template,
                                contextName: this.as
                            }).then( controller => {
                                let el = this.factory.container.get('$el');
                                     this.section.appendChild(el);
                            });*/

                        case 17:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));
    },
    onDestroy: function onDestroy() {
        if (this.factory) {
            this.factory.destroy();
            this.factory = void 0;
        }
    }
};
/*export class ControllerComponent extends BaseComponent {
    container: DIContainer
    as: string
    name: string
    factory: ControllerFactory
    constructor(section:templ.vnode.Section, vvnode:templ.vnode.VNode, attributes:templ.vnode.AttributeMap, view:templ.vnode.IView) {
        super(section, vvnode, attributes, view)

        this.container = (<any>this.view)._container
        if (this.attributes['name']) {
            this.name = this.attributes['name']
            this.as = this.attributes['as'] || this.name
        }


        this.factory = (<any>this.view)._container.get(this.name);

        if (!(this.factory instanceof ControllerFactory)) {
            throw new Error(this.name + ' is not a controller');
        }

        let template:string|templ.vnode.Template = this.childTemplate
        if (this.attributes['template']) {
            template = this.attributes['template'];
        }

        this.factory.create({
            template: template
        }).then( controller => {
            let template = this.factory.container.get('template');
            this.section.appendChild(template.render());
        });

    }

    destroy () {

        super.destroy();
        this.factory.destroy();
        this.factory = void 0
    }


}*/