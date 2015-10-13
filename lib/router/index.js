"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj["default"] = obj;return newObj;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var _router = require('./router');

var _internal = require('../../internal');

var _utilities = require('utilities');

var utils = _interopRequireWildcard(_utilities);

var _templateIndex = require('../../template/index');

var _templ = require('templ');

var templ = _interopRequireWildcard(_templ);

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2:
            return decorators.reduceRight(function (o, d) {
                return d && d(o) || o;
            }, target);
        case 3:
            return decorators.reduceRight(function (o, d) {
                return (d && d(target, key), void 0);
            }, void 0);
        case 4:
            return decorators.reduceRight(function (o, d) {
                return d && d(target, key, o) || o;
            }, desc);
    }
};
var RouterService = (function () {
    function RouterService(context, container) {
        _classCallCheck(this, RouterService);

        this.router = new _router.Router({
            execute: utils.bind(this.__execute, this)
        });
        this.context = context;
        this.container = container;
        this.router.history.start();
    }

    _createClass(RouterService, [{
        key: "route",
        value: function route(_route, handler) {
            if (typeof handler === 'function') {
                this.router.route(_route, handler);
            } else if (utils.isObject(handler)) {
                this.router.route(_route, this.__handleController(handler));
            }
            return this;
        }
    }, {
        key: "__execute",
        value: function __execute(callback, args) {
            this.context.$run(callback, this.context, args);
        }
    }, {
        key: "__handleController",
        value: function __handleController(options) {
            var _this = this;

            if (!this.container.hasHandler(options.controller)) {
                throw new Error('[router] controller');
            }
            return function () {
                var target = undefined;
                if (typeof options.target === 'string') {
                    target = document.querySelector(options.target);
                } else {
                    target = options.target;
                }
                var templateResolver = _this.container.get('templateResolver');
                var controller = _this.container.get(options.controller);
                templateResolver.resolve(options.template).then(function (str) {
                    if (!str) {
                        throw new Error('template');
                    }
                    var ctx = controller.ctx;
                    var template = templ.compile(str, {
                        viewClass: _templateIndex.TemplateView
                    });
                    var view = template.view(ctx.model, {
                        container: _this.container,
                        delegator: new _templateIndex.EventDelegator(controller, ctx, _this.container)
                    });
                    controller.template = view;
                    target.appendChild(view.render());
                });
            };
        }
    }]);

    return RouterService;
})();
exports.RouterService = RouterService;
exports.RouterService = RouterService = __decorate([(0, _internal.classtype)(_internal.ClassType.Service)], RouterService);