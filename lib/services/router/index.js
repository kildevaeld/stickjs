"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _router = require('./router');

var _utilities = require('utilities');

var utils = _interopRequireWildcard(_utilities);

var _annotations = require('../../annotations');

var _di = require('di');

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
    function RouterService(ctx, container) {
        _classCallCheck(this, RouterService);

        this.router = new _router.Router({
            execute: utils.bind(this.__execute, this)
        });
        this.context = ctx;
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
            this.context.$call(callback, this.context, args);
        }
    }, {
        key: "__handleController",
        value: function __handleController(options) {
            if (!this.container.hasHandler(options.controller)) {
                throw new Error('[router] controller');
            }
            return function () {
                /*let target: HTMLElement;
                if (typeof options.target === 'string') {
                    target = <HTMLElement>document.querySelector(<string>options.target)
                } else {
                    target = <HTMLElement>options.target;
                }
                
                
                let templateResolver = <TemplateResolver>this.container.get('templateResolver');
                
                let controller = this.container.get(options.controller);
                templateResolver.resolve(options.template)
                .then( (str) => {
                    if (!str) {
                        throw new Error('template');
                    }
                    
                    let ctx = controller.ctx;
                
                    let template = templ.compile(str, {
                        viewClass: <any>TemplateView
                    })
                
                    let view = <any>template.view(ctx.model, {
                        container: this.container,
                        delegator: new EventDelegator(controller, ctx, this.container)
                    });
                    
                    controller.template = view
                    
                    target.appendChild(view.render())
                    
                })	*/
            };
        }
    }]);

    return RouterService;
})();
exports.RouterService = RouterService;
exports.RouterService = RouterService = __decorate([(0, _di.inject)('$context', '$container'), (0, _annotations.service)('$router')], RouterService);