'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = require('utilities');
var typings_1 = require('./typings');
var vnode_1 = require('templ/lib/vnode');

var ControllerFactory = function () {
    function ControllerFactory(name, controller, container) {
        _classCallCheck(this, ControllerFactory);

        this.container = container;
        this.controller = controller;
        this.name = name;
    }

    _createClass(ControllerFactory, [{
        key: 'create',
        value: function create(options) {
            var _this = this;

            if (this.container.hasInstance(this.name)) {
                return utils.Promise.resolve(this.container.get(this.name));
            }
            this.container.registerSingleton(this.name, this.controller);
            var $state = this.container.get('$state').createChild(this.container);
            this.container.registerInstance('$state', $state, true);
            var contextName = options.contextName || this.name;
            return this.resolveTemplate($state, options).then(function (template) {
                _this.container.registerInstance('template', template, true);
                var controller = _this.container.get(_this.name);
                template._target = controller;
                var el = template.render();
                $state.set(contextName, controller);
                if (options.el) {
                    options.el.innerHTML = '';
                    options.el.appendChild(el);
                }
                return controller;
            });
        }
    }, {
        key: 'resolveTemplate',
        value: function resolveTemplate(state, options) {
            var $template = this.container.get('$templateCreator');
            var promise = undefined;
            if (options.el) {
                var templateString = options.el.innerHTML;
                promise = utils.Promise.resolve(templateString);
            } else if (options.template) {
                if (options.template instanceof vnode_1.Template) {
                    var view = options.template.view(state, {
                        container: this.container
                    });
                    return utils.Promise.resolve(view);
                }
                promise = this.container.get('$templateResolver')(options.template);
            } else {
                return utils.Promise.reject(new typings_1.StickError("no element or template"));
            }
            return promise.then(function (templateString) {
                return $template(templateString, state);
            });
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.container.clear();
            this.container.entries.clear();
        }
    }]);

    return ControllerFactory;
}();

exports.ControllerFactory = ControllerFactory;