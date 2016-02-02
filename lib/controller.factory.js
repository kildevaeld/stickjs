'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var utils = require('utilities');
var eventsjs_1 = require('eventsjs');
var typings_1 = require('./typings');
var vnode_1 = require('templ/lib/vnode');

var ControllerFactory = function (_eventsjs_1$EventEmit) {
    _inherits(ControllerFactory, _eventsjs_1$EventEmit);

    function ControllerFactory(name, controller, container) {
        _classCallCheck(this, ControllerFactory);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ControllerFactory).call(this));

        _this.container = container;
        _this.controller = controller;
        _this.name = name;
        return _this;
    }
    /**
     * Create an instance of a controller
     * @param  {ControllerCreateOptions} options
     * @return {utils.IPromise<any>}
     * Call onTemplateRender (), onElementAttached
     * emits before:template:render, template:render, before:element:attached, element:attached
     */

    _createClass(ControllerFactory, [{
        key: 'create',
        value: function create(options) {
            var _this2 = this;

            if (this.container.hasInstance(this.name)) {
                return utils.Promise.resolve(this.container.get(this.name));
            }
            this.container.registerSingleton(this.name, this.controller);
            var $state = this.container.get('$state').createChild(this.container);
            this.container.registerInstance('$state', $state, true);
            var contextName = options.contextName || this.name;
            return this.resolveTemplate($state, options).then(function (template) {
                _this2.container.registerInstance('template', template, true);
                var controller = _this2.container.get(_this2.name);
                template.setTarget(controller);
                $state.set(contextName, controller);
                _this2.trigger('before:template:render');
                var el = template.render();
                if (el instanceof DocumentFragment) {
                    if (el.children.length === 1) {
                        el = el.firstChild;
                    } else {
                        var div = document.createElement('controller');
                        div.appendChild(el);
                        el = div;
                    }
                }
                _this2.container.registerInstance('$el', el, true);
                if (typeof controller.onTemplateRender === 'function') {
                    controller.onTemplateRender.call(controller, el, template);
                }
                _this2.trigger('template:render');
                if (options.el) {
                    _this2.trigger('before:element:attached', options.el);
                    options.el.innerHTML = '';
                    options.el.appendChild(el);
                    if (typeof controller.onElementAttached === 'function') {
                        controller.onElementAttached.call(controller, el, options.el);
                    }
                    _this2.trigger('element:attached', el, options.el);
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
}(eventsjs_1.EventEmitter);

exports.ControllerFactory = ControllerFactory;