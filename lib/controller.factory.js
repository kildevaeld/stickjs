'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilities = require('utilities');

var utils = _interopRequireWildcard(_utilities);

var _typings = require('./typings');

var _templ = require('templ');

var templ = _interopRequireWildcard(_templ);

var ControllerFactory = (function () {
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
            var $context = this.container.get('$context');
            this.container.registerInstance('$context', $context.$createChild(), true);
            $context = this.container.get('$context');
            return this.resolveTemplate($context, options).then(function (template) {
                _this.container.registerInstance('template', template, true);
                $context.$observe();
                var controller = _this.container.get(_this.name);
                $context.$unobserve();
                if (options.el) {
                    options.el.innerHTML = '';
                    options.el.appendChild(template.render());
                }
                return controller;
            });
        }
    }, {
        key: 'resolveTemplate',
        value: function resolveTemplate(ctx, options) {
            var $template = this.container.get('$templateCreator');
            var promise = undefined;
            if (options.el) {
                var templateString = options.el.innerHTML;
                promise = utils.Promise.resolve(templateString);
            } else if (options.template) {
                if (options.template instanceof templ.vnode.Template) {
                    var view = options.template.view(ctx.__model, {
                        container: this.container
                    });
                    return utils.Promise.resolve(view);
                }
                promise = this.container.get('$templateResolver')(options.template);
            } else {
                return utils.Promise.reject(new _typings.StickError("no element or template"));
            }
            return promise.then(function (templateString) {
                return $template(templateString, ctx.__model);
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
})();

exports.ControllerFactory = ControllerFactory;