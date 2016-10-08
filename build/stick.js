(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("orange"), require("templ"), require("collection"), require("orange.request"), require("orange.dom"));
	else if(typeof define === 'function' && define.amd)
		define(["orange", "templ", "collection", "orange.request", "orange.dom"], factory);
	else if(typeof exports === 'object')
		exports["stick"] = factory(require("orange"), require("templ"), require("collection"), require("orange.request"), require("orange.dom"));
	else
		root["stick"] = factory(root["orange"], root["templ"], root["collection"], root["orange"]["request"], root["orange"]["dom"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_23__, __WEBPACK_EXTERNAL_MODULE_40__, __WEBPACK_EXTERNAL_MODULE_49__, __WEBPACK_EXTERNAL_MODULE_59__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__webpack_require__(1);
	__webpack_require__(51);
	var d = __webpack_require__(7);
	exports.decorators = d;
	__export(__webpack_require__(41));
	__export(__webpack_require__(1));
	var templ = __webpack_require__(51);
	exports.template = templ;
	__export(__webpack_require__(51));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(2));
	__export(__webpack_require__(44));
	__export(__webpack_require__(48));
	__export(__webpack_require__(50));

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) {
	            try {
	                step(generator.next(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function rejected(value) {
	            try {
	                step(generator.throw(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(result) {
	            result.done ? resolve(result.value) : new P(function (resolve) {
	                resolve(result.value);
	            }).then(fulfilled, rejected);
	        }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	var router_1 = __webpack_require__(3);
	var utils = __webpack_require__(6);
	var decorators_1 = __webpack_require__(7);
	var controller_factory_1 = __webpack_require__(24);
	var module_factory_1 = __webpack_require__(38);
	var stick_1 = __webpack_require__(41);
	var internal_1 = __webpack_require__(8);
	stick_1.decorator("route", function () {
	    return function (target) {
	        if (!internal_1.isDependencyType(target, internal_1.DependencyType.Controller)) {
	            throw new Error('[route] target not a controller');
	        }
	    };
	});

	var RouterOptions = function RouterOptions() {
	    _classCallCheck(this, RouterOptions);

	    this.execute = null;
	    this.pushState = false;
	};

	exports.RouterOptions = RouterOptions;
	var RouterService = function () {
	    /**
	     * @param {IContext} ctx
	     * @param {Container} container
	     * @constructor RouterService
	     */
	    function RouterService(container) {
	        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	        _classCallCheck(this, RouterService);

	        options.execute = options.execute || utils.bind(this.__execute, this);
	        this.router = new router_1.Router(options);
	        //this.context = ctx;
	        this.container = container;
	        this.router.history.start();
	    }

	    _createClass(RouterService, [{
	        key: "setTarget",
	        value: function setTarget(target) {
	            if (typeof target === 'string') {
	                target = document.querySelector(target);
	            }
	            this.target = target;
	        }
	    }, {
	        key: "swapElements",
	        value: function swapElements(target, element) {
	            if (this.swap) {
	                this.swap(target, element);
	                return;
	            }
	            target.innerHTML = "";
	            target.appendChild(element);
	        }
	        /**
	         * Notfound handler
	         * @param {RouteHandler|RouteOptions} handler
	         */

	    }, {
	        key: "else",
	        value: function _else(handler) {
	            if (typeof handler !== 'function') {
	                handler = this.__handleController(handler);
	            }
	            this.router.history.on('route:unmatched', handler);
	        }
	        /**
	         * @param  {string|RegExp} route
	         * @param  {RouteHandler|RouteOptions} handler
	         * @return {RouterService} RouterService
	         */

	    }, {
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
	        key: "reload",
	        value: function reload() {
	            var _this = this;

	            setTimeout(function () {
	                if (!_this.router.history.loadUrl()) {
	                    _this.router.history.trigger('route:unmatched');
	                }
	            });
	        }
	        /**
	         * Navigate to fragment
	         * @param {string} route   Fragment to navigate to
	         * @param {Object} options options
	         */

	    }, {
	        key: "navigate",
	        value: function navigate(route, options) {
	            this.router.navigate(route, options);
	        }
	    }, {
	        key: "__execute",
	        value: function __execute(callback, name, args) {
	            if (this.container.hasHandler('$route')) {
	                this.container.unregister('$route');
	            }
	            this.container.registerInstance('$route', {
	                fragment: name,
	                parameters: args
	            });
	            utils.callFunc(callback, this, args);
	            //this.context.$call(callback, this.context, args)
	        }
	    }, {
	        key: "__handleController",
	        value: function __handleController(options) {
	            var _this2 = this;

	            if (!this.container.hasHandler(options.controller, true, true)) {
	                throw new Error('[router] controller');
	            }
	            return function () {
	                return __awaiter(_this2, void 0, void 0, regeneratorRuntime.mark(function _callee() {
	                    var target, factory, controller, template;
	                    return regeneratorRuntime.wrap(function _callee$(_context) {
	                        while (1) {
	                            switch (_context.prev = _context.next) {
	                                case 0:
	                                    target = void 0;

	                                    if (typeof options.target === 'string') {
	                                        target = document.querySelector(options.target);
	                                    } else if (options.target && options.target instanceof Element) {
	                                        target = options.target;
	                                    } else {
	                                        if (typeof this.target === 'string') {
	                                            target = document.querySelector(this.target);
	                                        } else {
	                                            target = this.target;
	                                        }
	                                    }

	                                    if (!(target == null)) {
	                                        _context.next = 4;
	                                        break;
	                                    }

	                                    throw new Error('[router] target not defined');

	                                case 4:
	                                    _context.next = 6;
	                                    return this.container.get(options.controller);

	                                case 6:
	                                    factory = _context.sent;

	                                    if (!(factory == null || !(factory instanceof controller_factory_1.ControllerFactory) && !(factory instanceof module_factory_1.ModuleFactory))) {
	                                        _context.next = 9;
	                                        break;
	                                    }

	                                    throw new Error(options.controller + " not a controller");

	                                case 9:
	                                    _context.next = 11;
	                                    return factory.create({
	                                        template: options.template,
	                                        parent: this.container
	                                    });

	                                case 11:
	                                    controller = _context.sent;

	                                    if (this._currentController != null) {
	                                        this._currentController.destroy();
	                                    }
	                                    this._currentController = factory;
	                                    _context.next = 16;
	                                    return factory.container.get('template');

	                                case 16:
	                                    template = _context.sent;

	                                    this.swapElements(target, template.section.render());

	                                case 18:
	                                case "end":
	                                    return _context.stop();
	                            }
	                        }
	                    }, _callee, this);
	                }));
	            };
	        }
	    }, {
	        key: "$destroy",
	        value: function $destroy() {
	            if (this.container.hasHandler('$route')) {
	                this.container.unregister('$route');
	            }
	            if (this._currentController) {
	                this._currentController.destroy();
	                delete this._currentController;
	            }
	        }
	    }, {
	        key: "target",
	        get: function get() {
	            return this._target;
	        },
	        set: function set(target) {
	            this._target = target;
	        }
	    }]);

	    return RouterService;
	}();
	RouterService = __decorate([decorators_1.config(RouterOptions), decorators_1.inject('$container', '$routerProvider'), decorators_1.service('$router')], RouterService);
	exports.RouterService = RouterService;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var history_1 = __webpack_require__(4);
	var eventsjs_1 = __webpack_require__(5);
	var orange_1 = __webpack_require__(6);
	// Cached regular expressions for matching named param parts and splatted
	// parts of route strings.
	var optionalParam = /\((.*?)\)/g;
	var namedParam = /(\(\?)?:\w+/g;
	var splatParam = /\*\w+/g;
	var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
	var isRegExp = function isRegExp(value) {
	    return value ? (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && toString.call(value) === '[object RegExp]' : false;
	};

	var Router = function (_eventsjs_1$EventEmit) {
	    _inherits(Router, _eventsjs_1$EventEmit);

	    function Router() {
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        _classCallCheck(this, Router);

	        var _this = _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).call(this));

	        _this.history = new history_1.HistoryApi(options);
	        _this.options = options;
	        return _this;
	    }

	    _createClass(Router, [{
	        key: 'route',
	        value: function route(_route, name) {
	            var _this2 = this;

	            var handler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	            if (!isRegExp(_route)) _route = this._routeToRegExp(_route);
	            if (typeof name === 'function') {
	                handler = name;
	                name = '';
	            }
	            if (!handler) {
	                throw new Error('router: no handler');
	            }
	            this.history.route(_route, function (fragment) {
	                var args = _this2._extractParameters(_route, fragment);
	                _this2.execute(handler, fragment, args);
	                _this2.trigger.apply(_this2, ['route:' + name].concat(args));
	                _this2.trigger('route', name, args);
	                //this.history.trigger('route', this, name, args);
	            });
	            return this;
	        }
	        // Execute a route handler with the provided parameters.  This is an
	        // excellent place to do pre-route setup or post-route cleanup.

	    }, {
	        key: 'execute',
	        value: function execute(callback, name, args) {
	            if (callback) {
	                if (this.options.execute) {
	                    this.options.execute(callback, name, args);
	                } else {
	                    orange_1.callFunc(callback, this, args);
	                }
	            }
	        }
	        // Simple proxy to `Backbone.history` to save a fragment into the history.

	    }, {
	        key: 'navigate',
	        value: function navigate(fragment, options) {
	            this.history.navigate(fragment, options);
	            return this;
	        }
	        // Convert a route string into a regular expression, suitable for matching
	        // against the current location hash.

	    }, {
	        key: '_routeToRegExp',
	        value: function _routeToRegExp(route) {
	            route = route.replace(escapeRegExp, '\\$&').replace(optionalParam, '(?:$1)?').replace(namedParam, function (match, optional) {
	                return optional ? match : '([^/?]+)';
	            }).replace(splatParam, '([^?]*?)');
	            return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
	        }
	        // Given a route, and a URL fragment that it matches, return the array of
	        // extracted decoded parameters. Empty or unmatched parameters will be
	        // treated as `null` to normalize cross-browser behavior.

	    }, {
	        key: '_extractParameters',
	        value: function _extractParameters(route, fragment) {
	            var params = route.exec(fragment).slice(1);
	            return params.map(function (param, i) {
	                // Don't decode the search params.
	                if (i === params.length - 1) return param || null;
	                return param ? decodeURIComponent(param) : null;
	            });
	        }
	    }, {
	        key: '$destroy',
	        value: function $destroy() {
	            _get(Router.prototype.__proto__ || Object.getPrototypeOf(Router.prototype), 'destroy', this).call(this);
	            this.history.off();
	        }
	    }]);

	    return Router;
	}(eventsjs_1.EventEmitter);

	exports.Router = Router;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var eventsjs_1 = __webpack_require__(5);
	var utils = __webpack_require__(6);
	// Cached regex for stripping a leading hash/slash and trailing space.
	var routeStripper = /^[#\/]|\s+$/g;
	// Cached regex for stripping leading and trailing slashes.
	var rootStripper = /^\/+|\/+$/g;
	// Cached regex for removing a trailing slash.
	var trailingSlash = /\/$/;
	// Cached regex for stripping urls of hash and query.
	var pathStripper = /[#].*$/;

	var Handler = function Handler() {
	    _classCallCheck(this, Handler);
	};

	exports.Handler = Handler;

	var HistoryApi = function (_eventsjs_1$EventEmit) {
	    _inherits(HistoryApi, _eventsjs_1$EventEmit);

	    function HistoryApi(options) {
	        _classCallCheck(this, HistoryApi);

	        var _this = _possibleConstructorReturn(this, (HistoryApi.__proto__ || Object.getPrototypeOf(HistoryApi)).call(this));

	        _this.handlers = [];
	        _this._started = false;
	        if (typeof window !== 'undefined') {
	            _this.location = window.location;
	            _this.history = window.history;
	        }
	        _this.checkUrl = utils.bind(_this.checkUrl, _this);
	        _this.options = options || {};
	        return _this;
	    }

	    _createClass(HistoryApi, [{
	        key: 'atRoot',

	        // Are we at the app root?
	        value: function atRoot() {
	            return this.location.pathname.replace(/[^\/]$/, '$&/') === this.root;
	        }
	        // Gets the true hash value. Cannot use location.hash directly due to bug
	        // in Firefox where location.hash will always be decoded.

	    }, {
	        key: 'getHash',
	        value: function getHash(window) {
	            var match = (window || this).location.href.match(/#(.*)$/);
	            return match ? match[1] : '';
	        }
	        // Get the cross-browser normalized URL fragment, either from the URL,
	        // the hash, or the override.

	    }, {
	        key: 'getFragment',
	        value: function getFragment(fragment) {
	            var forcePushState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	            if (fragment == null) {
	                if (this._wantsPushState || !this._wantsHashChange) {
	                    fragment = decodeURI(this.location.pathname + this.location.search);
	                    var root = this.root.replace(trailingSlash, '');
	                    if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
	                } else {
	                    fragment = this.getHash();
	                }
	            }
	            return fragment.replace(routeStripper, '');
	        }
	        // Start the hash change handling, returning `true` if the current URL matches
	        // an existing route, and `false` otherwise.

	    }, {
	        key: 'start',
	        value: function start() {
	            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	            if (this.started) throw new Error("Router.history has already been started");
	            this._started = true;
	            // Figure out the initial configuration.
	            // Is pushState desired or should we use hashchange only?
	            this.options = utils.extend({ root: '/' }, this.options, options);
	            this.root = this.options.root;
	            this._wantsHashChange = this.options.hashChange !== false;
	            this._wantsPushState = !!this.options.pushState;
	            var fragment = this.getFragment();
	            // Normalize root to always include a leading and trailing slash.
	            this.root = ('/' + this.root + '/').replace(rootStripper, '/');
	            // Depending on whether we're using pushState or hashes, determine how we
	            // check the URL state.
	            if (this._wantsPushState) {
	                window.addEventListener('popstate', this.checkUrl, false);
	            } else if (this._wantsHashChange) {
	                window.addEventListener('hashchange', this.checkUrl, false);
	            }
	            // Determine if we need to change the base url, for a pushState link
	            // opened by a non-pushState browser.
	            this.fragment = fragment;
	            var loc = this.location;
	            // Transition from hashChange to pushState or vice versa if both are
	            // requested.
	            if (this._wantsHashChange && this._wantsPushState) {
	                // If we've started out with a hash-based route, but we're currently
	                // in a browser where it could be `pushState`-based instead...
	                if (this.atRoot() && loc.hash) {
	                    this.fragment = this.getHash().replace(routeStripper, '');
	                    this.history.replaceState({}, document.title, this.root + this.fragment);
	                }
	            }
	            if (!this.options.silent) return this.loadUrl();
	        }
	        // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
	        // but possibly useful for unit testing Routers.

	    }, {
	        key: 'stop',
	        value: function stop() {
	            window.removeEventListener('popstate', this.checkUrl);
	            window.removeEventListener('hashchange', this.checkUrl);
	            this._started = false;
	        }
	        // Add a route to be tested when the fragment changes. Routes added later
	        // may override previous routes.

	    }, {
	        key: 'route',
	        value: function route(_route, callback) {
	            this.handlers.unshift({ route: _route, callback: callback });
	        }
	        // Checks the current URL to see if it has changed, and if it has,
	        // calls `loadUrl`.

	    }, {
	        key: 'checkUrl',
	        value: function checkUrl() {
	            var current = this.getFragment();
	            if (current === this.fragment) return false;
	            if (!this.loadUrl()) {
	                this.trigger('route:unmatched');
	            }
	        }
	        // Attempt to load the current URL fragment. If a route succeeds with a
	        // match, returns `true`. If no defined routes matches the fragment,
	        // returns `false`.

	    }, {
	        key: 'loadUrl',
	        value: function loadUrl(fragment) {
	            fragment = this.fragment = this.getFragment(fragment);
	            return this.handlers.some(function (handler) {
	                if (handler.route.test(fragment)) {
	                    handler.callback(fragment);
	                    return true;
	                }
	                return false;
	            });
	        }
	        // Save a fragment into the hash history, or replace the URL state if the
	        // 'replace' option is passed. You are responsible for properly URL-encoding
	        // the fragment in advance.
	        //
	        // The options object can contain `trigger: true` if you wish to have the
	        // route callback be fired (not usually desirable), or `replace: true`, if
	        // you wish to modify the current URL without adding an entry to the history.

	    }, {
	        key: 'navigate',
	        value: function navigate(fragment, options) {
	            if (!this.started) return false;
	            if (!options || options === true) options = { trigger: !!options };
	            var url = this.root + (fragment = this.getFragment(fragment || ''));
	            // Strip the hash for matching.
	            fragment = fragment.replace(pathStripper, '');
	            if (this.fragment === fragment) return;
	            this.fragment = fragment;
	            // Don't include a trailing slash on the root.
	            if (fragment === '' && url !== '/') url = url.slice(0, -1);
	            // If we're using pushState we use it to set the fragment as a real URL.
	            if (this._wantsPushState) {
	                this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);
	            } else if (this._wantsHashChange) {
	                this._updateHash(this.location, fragment, options.replace);
	            } else {
	                return this.location.assign(url);
	            }
	            if (options.trigger) return this.loadUrl(fragment);
	        }
	        // Update the hash location, either replacing the current entry, or adding
	        // a new one to the browser history.

	    }, {
	        key: '_updateHash',
	        value: function _updateHash(location, fragment, replace) {
	            if (replace) {
	                var href = location.href.replace(/(javascript:|#).*$/, '');
	                location.replace(href + '#' + fragment);
	            } else {
	                // Some browsers require that `hash` contains a leading #.
	                location.hash = '#' + fragment;
	            }
	        }
	    }, {
	        key: 'started',
	        get: function get() {
	            return this._started;
	        }
	    }]);

	    return HistoryApi;
	}(eventsjs_1.EventEmitter);

	exports.HistoryApi = HistoryApi;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var idCounter = 0;
	function getID() {
	    return "" + (++idCounter);
	}
	var EventEmitterError = (function (_super) {
	    __extends(EventEmitterError, _super);
	    function EventEmitterError(message, method, klass, ctx) {
	        _super.call(this, message);
	        this.message = message;
	        this.method = method;
	        this.klass = klass;
	        this.ctx = ctx;
	    }
	    EventEmitterError.prototype.toString = function () {
	        var prefix = "EventEmitterError";
	        if (this.method && this.method != "") {
	            prefix = "EventEmitter#" + this.method;
	        }
	        return prefix + ": " + this.message;
	    };
	    return EventEmitterError;
	}(Error));
	exports.EventEmitterError = EventEmitterError;
	function callFunc(fn, args) {
	    if (args === void 0) { args = []; }
	    var l = fn.length, i = -1, a1 = args[0], a2 = args[1], a3 = args[2], a4 = args[3];
	    switch (args.length) {
	        case 0:
	            while (++i < l)
	                fn[i].handler.call(fn[i].ctx);
	            return;
	        case 1:
	            while (++i < l)
	                fn[i].handler.call(fn[i].ctx, a1);
	            return;
	        case 2:
	            while (++i < l)
	                fn[i].handler.call(fn[i].ctx, a1, a2);
	            return;
	        case 3:
	            while (++i < l)
	                fn[i].handler.call(fn[i].ctx, a1, a2, a3);
	            return;
	        case 4:
	            while (++i < l)
	                fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4);
	            return;
	        default:
	            while (++i < l)
	                fn[i].handler.apply(fn[i].ctx, args);
	            return;
	    }
	}
	exports.callFunc = callFunc;
	function isFunction(a) {
	    return typeof a === 'function';
	}
	exports.isFunction = isFunction;
	function isEventEmitter(a) {
	    return a && (a instanceof EventEmitter || (isFunction(a.on) && isFunction(a.once) && isFunction(a.off) && isFunction(a.trigger)));
	}
	exports.isEventEmitter = isEventEmitter;
	var EventEmitter = (function () {
	    function EventEmitter() {
	    }
	    Object.defineProperty(EventEmitter.prototype, "listeners", {
	        get: function () {
	            return this._listeners;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    EventEmitter.prototype.on = function (event, fn, ctx, once) {
	        if (once === void 0) { once = false; }
	        var events = (this._listeners || (this._listeners = {}))[event] || (this._listeners[event] = []);
	        events.push({
	            name: event,
	            once: once,
	            handler: fn,
	            ctx: ctx || this
	        });
	        return this;
	    };
	    EventEmitter.prototype.once = function (event, fn, ctx) {
	        return this.on(event, fn, ctx, true);
	    };
	    EventEmitter.prototype.off = function (eventName, fn) {
	        this._listeners = this._listeners || {};
	        if (eventName == null) {
	            this._listeners = {};
	        }
	        else if (this._listeners[eventName]) {
	            var events = this._listeners[eventName];
	            if (fn == null) {
	                this._listeners[eventName] = [];
	            }
	            else {
	                for (var i = 0; i < events.length; i++) {
	                    var event_1 = events[i];
	                    if (events[i].handler == fn) {
	                        this._listeners[eventName].splice(i, 1);
	                    }
	                }
	            }
	        }
	        return this;
	    };
	    EventEmitter.prototype.trigger = function (eventName) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        this._listeners = this._listeners || {};
	        var events = (this._listeners[eventName] || []).concat(this._listeners['all'] || []).concat(this._listeners["*"] || []);
	        if (EventEmitter.debugCallback)
	            EventEmitter.debugCallback(this.constructor.name, this.name, eventName, args, events);
	        var event, a, len = events.length, index;
	        var calls = [];
	        var alls = [];
	        for (var i = 0, ii = events.length; i < ii; i++) {
	            event = events[i];
	            a = args;
	            if (events[i].name == 'all' || events[i].name == '*') {
	                alls.push(events[i]);
	            }
	            else {
	                calls.push(events[i]);
	            }
	            if (events[i].once === true) {
	                index = this._listeners[events[i].name].indexOf(events[i]);
	                this._listeners[events[i].name].splice(index, 1);
	            }
	        }
	        if (alls.length) {
	            var a_1 = [eventName].concat(args);
	            this._executeListener(alls, a_1);
	        }
	        if (calls.length)
	            this._executeListener(calls, args);
	        return this;
	    };
	    EventEmitter.prototype._executeListener = function (func, args) {
	        EventEmitter.executeListenerFunction(func, args);
	    };
	    EventEmitter.prototype.listenTo = function (obj, event, fn, ctx, once) {
	        if (once === void 0) { once = false; }
	        if (!isEventEmitter(obj)) {
	            if (EventEmitter.throwOnError)
	                throw new EventEmitterError("obj is not an EventEmitter", once ? "listenToOnce" : "listenTo", this, obj);
	            return this;
	        }
	        var listeningTo, id, meth;
	        listeningTo = this._listeningTo || (this._listeningTo = {});
	        id = obj.listenId || (obj.listenId = getID());
	        listeningTo[id] = obj;
	        meth = once ? 'once' : 'on';
	        obj[meth](event, fn, this);
	        return this;
	    };
	    EventEmitter.prototype.listenToOnce = function (obj, event, fn, ctx) {
	        return this.listenTo(obj, event, fn, ctx, true);
	    };
	    EventEmitter.prototype.stopListening = function (obj, event, callback) {
	        if (obj && !isEventEmitter(obj)) {
	            if (EventEmitter.throwOnError)
	                throw new EventEmitterError("obj is not an EventEmitter", "stopListening", this, obj);
	            return this;
	        }
	        var listeningTo = this._listeningTo;
	        if (!listeningTo)
	            return this;
	        var remove = !event && !callback;
	        if (!callback && typeof event === 'object')
	            callback = this;
	        if (obj)
	            (listeningTo = {})[obj.listenId] = obj;
	        for (var id in listeningTo) {
	            obj = listeningTo[id];
	            obj.off(event, callback, this);
	            if (remove || !Object.keys(obj.listeners).length)
	                delete this._listeningTo[id];
	        }
	        return this;
	    };
	    EventEmitter.prototype.destroy = function () {
	        this.stopListening();
	        this.off();
	    };
	    EventEmitter.throwOnError = true;
	    EventEmitter.executeListenerFunction = function (func, args) {
	        callFunc(func, args);
	    };
	    return EventEmitter;
	}());
	exports.EventEmitter = EventEmitter;


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var internal_1 = __webpack_require__(8);
	var orange_1 = __webpack_require__(6);
	var stick_di_1 = __webpack_require__(9);
	var repository_1 = __webpack_require__(22);
	var templ = __webpack_require__(23);
	var di = __webpack_require__(9);
	exports.autoinject = di.autoinject;
	exports.inject = di.inject;
	exports.registration = di.registration;
	exports.transient = di.transient;
	exports.singleton = di.singleton;
	exports.instanceActivator = di.instanceActivator;
	var debug = __webpack_require__(15)('stick:decorators');
	function controller(controllerName) {
	    return function (target) {
	        var name = controllerName || orange_1.camelcase(target.name);
	        repository_1.Repository.add(internal_1.DependencyType.Controller, name, target);
	    };
	}
	exports.controller = controller;
	function _module(moduleName) {
	    return function (target) {
	        var name = moduleName || orange_1.camelcase(target.name);
	        repository_1.Repository.add(internal_1.DependencyType.Module, name, target);
	    };
	}
	exports.module = _module;
	function service(serviceName, moduleName) {
	    return function (target) {
	        var name = serviceName || orange_1.camelcase(target.name);
	        repository_1.Repository.add(internal_1.DependencyType.Service, name, target);
	    };
	}
	exports.service = service;
	function factory(factoryName) {
	    return function (target) {};
	}
	exports.factory = factory;
	function config(config) {
	    return function (target) {
	        stick_di_1.Metadata.define(internal_1.DIServiceConfig, config, target, undefined);
	    };
	}
	exports.config = config;
	function template(name) {
	    return function (target) {
	        stick_di_1.Metadata.define(internal_1.Metakey[internal_1.Metakey.Template], name, target, undefined);
	    };
	}
	exports.template = template;
	function component(name) {
	    return function (target) {
	        debug('defining component %s, target: %s', name, target.name);
	        templ.component(name, target);
	    };
	}
	exports.component = component;
	function attribute(name) {
	    return function (target) {
	        debug('defining attribute %s, target: %s', name, target.name);
	        templ.attribute(name, target);
	    };
	}
	exports.attribute = attribute;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var utils = __webpack_require__(6);
	var stick_di_1 = __webpack_require__(9);
	var paramRegEx = /function[^(]*\(([^)]*)\)/i;
	function getFunctionParameters(fn) {
	    var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	    var params = stick_di_1.Metadata.getOwn(stick_di_1.Metadata.paramTypes, fn);
	    if (!params) {
	        var match = fn.toString().match(paramRegEx);
	        if (match) {
	            params = match[1].replace(/,/, ' ').split(' ').map(function (x) {
	                return x.replace(',', '').trim();
	            }).filter(function (m) {
	                return m !== '';
	            });
	            if (cache) stick_di_1.Metadata.define(stick_di_1.Metadata.paramTypes, params, fn, undefined);
	        }
	    }
	    return params || [];
	}
	exports.getFunctionParameters = getFunctionParameters;
	(function (DependencyType) {
	    DependencyType[DependencyType["Service"] = 0] = "Service";
	    DependencyType[DependencyType["Module"] = 1] = "Module";
	    DependencyType[DependencyType["Controller"] = 2] = "Controller";
	    DependencyType[DependencyType["Factory"] = 3] = "Factory";
	})(exports.DependencyType || (exports.DependencyType = {}));
	var DependencyType = exports.DependencyType;
	(function (Metakey) {
	    Metakey[Metakey["DependencyType"] = 0] = "DependencyType";
	    Metakey[Metakey["Template"] = 1] = "Template";
	})(exports.Metakey || (exports.Metakey = {}));
	var Metakey = exports.Metakey;
	exports.DIServiceConfig = "mobyjs:service:config";
	function getDependencies(fn) {
	    var dependencies = void 0;
	    // [dep..., Function] style
	    if (fn.constructor === Array) {
	        // TODO: Check for function
	        var tmp = fn.pop();
	        dependencies = fn;
	        fn = tmp;
	        fn.inject = dependencies;
	    } else if (typeof fn === 'function') {
	        dependencies = utils.result(fn, "inject");
	        if (!dependencies || dependencies.length == 0) {
	            var _fn = fn;
	            // FIXME: Find a way not to delete type scripts type descriptions
	            // But as it is now, context will be inferred as an Object
	            /*if (_fn.__metadata__ && _fn.__metadata__.undefined['design:paramtypes']) {
	                delete _fn.__metadata__.undefined['design:paramtypes']
	             }*/
	            dependencies = getFunctionParameters(fn);
	            _fn.inject = dependencies;
	        }
	    } else {
	        return [fn, null];
	    }
	    return [fn, dependencies];
	}
	exports.getDependencies = getDependencies;
	function tryCatch(fn) {
	    var val = void 0,
	        err = void 0;
	    try {
	        val = fn();
	    } catch (e) {
	        err = e;
	    }
	    return [val, err];
	}
	function resolveDependencies(target, container) {
	    var i = void 0,
	        ii = void 0,
	        ret = void 0,
	        inject = target.inject;
	    if (!inject) {
	        return utils.Promise.resolve([]);
	    }
	    for (i = 0, ii = inject.length; i < ii; i++) {
	        ret = tryCatch(function () {
	            return container.get(inject[i]);
	        });
	        if (ret[1] != null) return utils.Promise.reject(ret[1]);
	        inject[i] = ret[0];
	    }
	    return utils.Promise.all(inject);
	}
	exports.resolveDependencies = resolveDependencies;
	function setDependencyType(type) {
	    return function (target) {
	        var str = Metakey[Metakey.DependencyType];
	        stick_di_1.Metadata.define(str, type, target, undefined);
	    };
	}
	exports.setDependencyType = setDependencyType;
	function getDependencyType(target) {
	    var key = Metakey[Metakey.DependencyType],
	        type = stick_di_1.Metadata.getOwn(key, target, undefined);
	    return type;
	}
	exports.getDependencyType = getDependencyType;
	function isDependencyType(target, type) {
	    return getDependencyType(target) === type;
	}
	exports.isDependencyType = isDependencyType;
	function setActivator(target, activator) {
	    var instanceActivatorKey = stick_di_1.Metadata.instanceActivator;
	    stick_di_1.Metadata.define(instanceActivatorKey, activator, target, undefined);
	}
	exports.setActivator = setActivator;
	function setDependencyResolver(target, activator) {
	    var dependencyResolverKey = stick_di_1.Metadata.dependencyResolver;
	    stick_di_1.Metadata.define(dependencyResolverKey, activator, target, undefined);
	}
	exports.setDependencyResolver = setDependencyResolver;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = __webpack_require__(10);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	function test() {}
	if (!test.name) {
	    Object.defineProperty(Function.prototype, 'name', {
	        get: function get() {
	            var name = this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1];
	            // For better performance only parse once, and then cache the
	            // result through a new accessor for repeated access.
	            Object.defineProperty(this, 'name', { value: name });
	            return name;
	        }
	    });
	}
	exports.Version = '0.1.3';
	__export(__webpack_require__(11));
	__export(__webpack_require__(18));
	__export(__webpack_require__(21));
	__export(__webpack_require__(12));

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var metadata_1 = __webpack_require__(12);
	var metadata_2 = __webpack_require__(13);
	var errors_1 = __webpack_require__(14);
	var Debug = __webpack_require__(15);
	var debug = Debug('stick:di');
	var idCounter = 0;
	function gen_id() {
	    return "di" + ++idCounter;
	}
	var paramRegEx = /function[^(]*\(([^)]*)\)/i;
	function getFunctionParameters(fn) {
	    var cache = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	    var params = metadata_2.Metadata.getOwn(metadata_2.Metadata.paramTypes, fn);
	    if (!params) {
	        var match = fn.toString().match(paramRegEx);
	        if (match) {
	            params = match[1].replace(/\W+/, ' ').split(' ').map(function (x) {
	                return x.replace(',', '').trim();
	            }).filter(function (m) {
	                return m !== '';
	            });
	            if (cache) metadata_2.Metadata.define(metadata_2.Metadata.paramTypes, params, fn, undefined);
	        }
	    }
	    return params || [];
	}
	exports.getFunctionParameters = getFunctionParameters;

	var DIBadKeyError = function (_errors_1$DIError) {
	    _inherits(DIBadKeyError, _errors_1$DIError);

	    function DIBadKeyError(message) {
	        _classCallCheck(this, DIBadKeyError);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DIBadKeyError).call(this, message));

	        _this.name = 'BadKeyError';
	        _this.message = "key not registered with container";
	        return _this;
	    }

	    return DIBadKeyError;
	}(errors_1.DIError);

	exports.DIBadKeyError = DIBadKeyError;
	exports.emptyParameters = Object.freeze([]);

	var DIContainer = function () {
	    function DIContainer(info) {
	        _classCallCheck(this, DIContainer);

	        this._id = gen_id();
	        this.entries = new Map();
	        this.constructionInfo = info || new Map();
	        debug("Creating new container: %s", this.id);
	    }

	    _createClass(DIContainer, [{
	        key: 'makeGlobal',
	        value: function makeGlobal() {
	            debug("%s: Make global", this.id);
	            DIContainer.instance = this;
	            return this;
	        }
	        /**
	        * Registers a type (constructor function) by inspecting its registration annotations. If none are found, then the default singleton registration is used.
	        *
	        * @method autoRegister
	        * @param {Function} fn The constructor function to use when the dependency needs to be instantiated.
	        * @param {Object} [key] The key that identifies the dependency at resolution time; usually a constructor function.
	        */

	    }, {
	        key: 'autoRegister',
	        value: function autoRegister(fn, key, targetKey) {
	            var registration;
	            if (fn === null || fn === undefined) {
	                throw new DIBadKeyError('no key');
	            }
	            if (typeof fn === 'function') {
	                registration = metadata_2.Metadata.get(metadata_2.Metadata.registration, fn, targetKey);
	                if (registration !== undefined) {
	                    registration.register(this, key || fn, fn);
	                } else {
	                    this.registerSingleton(key || fn, fn, targetKey);
	                }
	            } else {
	                this.registerInstance(fn, fn);
	            }
	        }
	        /**
	        * Unregisters based on key.
	        *
	        * @method unregister
	        * @param {Object} key The key that identifies the dependency at resolution time; usually a constructor function.
	        */

	    }, {
	        key: 'unregister',
	        value: function unregister(key) {
	            debug('%s: Unregister key: %s', this.id, key);
	            this.entries.delete(key);
	        }
	        /**
	        * Inspects the container to determine if a particular key has been registred.
	        *
	        * @method hasHandler
	        * @param {Object} key The key that identifies the dependency at resolution time; usually a constructor function.
	        * @param {Boolean} [checkParent=false] Indicates whether or not to check the parent container hierarchy.
	        * @return {Boolean} Returns true if the key has been registred; false otherwise.
	        */

	    }, {
	        key: 'hasHandler',
	        value: function hasHandler(key) {
	            var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	            if (key === null || key === undefined) {
	                throw new DIBadKeyError();
	            }
	            return this.entries.has(key) || checkParent && this.parent && this.parent.hasHandler(key, checkParent);
	        }
	        /**
	        * Resolves a single instance based on the provided key.
	        *
	        * @method get
	        * @param {Object} key The key that identifies the object to resolve.
	        * @return {Object} Returns the resolved instance.
	        */

	    }, {
	        key: 'get',
	        value: function get(key, targetKey) {
	            debug("%s: Get %s, target: %s", this.id, String(key), targetKey);
	            var entry;
	            if (key === null || key === undefined) {
	                throw new DIBadKeyError();
	            }
	            if (key === DIContainer) {
	                return this;
	            }
	            if (key instanceof metadata_1.Resolver) {
	                return key.get(this);
	            }
	            entry = this.entries.get(key);
	            if (entry !== undefined) {
	                return entry[0](this);
	            }
	            if (this.parent && this.parent.hasHandler(key)) {
	                debug("%s: found key '%s' on parent", this.id, key);
	                return this.parent.get(key, targetKey);
	            }
	            // No point in registrering a string
	            if (typeof key === 'string') {
	                throw errors_1.createError('DIResolveError', 'no component registered for key: ' + key);
	            }
	            this.autoRegister(key, targetKey);
	            entry = this.entries.get(key);
	            return entry[0](this);
	        }
	        /**
	        * Resolves all instance registered under the provided key.
	        *
	        * @method getAll
	        * @param {Object} key The key that identifies the objects to resolve.
	        * @return {Object[]} Returns an array of the resolved instances.
	        */

	    }, {
	        key: 'getAll',
	        value: function getAll(key) {
	            var _this2 = this;

	            var entry;
	            if (key === null || key === undefined) {
	                throw new DIBadKeyError();
	            }
	            entry = this.entries.get(key);
	            if (entry !== undefined) {
	                return entry.map(function (x) {
	                    return x(_this2);
	                });
	            }
	            if (this.parent) {
	                return this.parent.getAll(key);
	            }
	            return [];
	        }
	        /**
	        * Creates a new dependency injection container whose parent is the current container.
	        *
	        * @method createChild
	        * @return {Container} Returns a new container instance parented to this.
	        */

	    }, {
	        key: 'createChild',
	        value: function createChild() {
	            var childContainer = new DIContainer(this.constructionInfo);
	            childContainer.parent = this;
	            debug("%s: Create child container: %s", this.id, childContainer.id);
	            return childContainer;
	        }
	        /**
	         * Resolve dependencies for the given function
	         * @method resolveDependencies
	         * @param {Function} fn
	         * @return {Array<any>}
	         */

	    }, {
	        key: 'resolveDependencies',
	        value: function resolveDependencies(fn, targetKey) {
	            debug("%s: Resolve dependencies for: %j", this.id, fn.name);
	            var info = this._getOrCreateConstructionSet(fn, targetKey),
	                keys = info.keys,
	                args = new Array(keys.length);
	            var i, ii;
	            try {
	                for (i = 0, ii = keys.length; i < ii; ++i) {
	                    args[i] = this.get(keys[i]);
	                }
	            } catch (e) {
	                var message = "Error";
	                if (i < ii) {
	                    message += ' The argument at index ' + i + ' (key:' + keys[i] + ') could not be satisfied.';
	                }
	                debug('resolve error %s', e);
	                throw errors_1.createError("DependencyError", message, [e]);
	            }
	            return args;
	        }
	        /**
	        * Invokes a function, recursively resolving its dependencies.
	        *
	        * @method invoke
	        * @param {Function} fn The function to invoke with the auto-resolved dependencies.
	        * @param {any[]} [deps] Additional function dependencies to use during invocation.
	        * @return {Object} Returns the instance resulting from calling the function.
	        */

	    }, {
	        key: 'invoke',
	        value: function invoke(fn, deps, targetKey) {
	            var info = this._getOrCreateConstructionSet(fn, targetKey);
	            try {
	                var keys, args;
	                if (info.dependencyResolver) {
	                    args = info.dependencyResolver.resolveDependencies(fn);
	                } else {
	                    args = this.resolveDependencies(fn, targetKey);
	                }
	                if (deps !== undefined && Array.isArray(deps)) {
	                    args = args.concat(deps);
	                }
	                debug("%s: invoking '%s', with dependencies:", this.id, fn.name, info.keys);
	                return info.activator.invoke(fn, args, targetKey, keys);
	            } catch (e) {
	                var activatingText = info.activator instanceof metadata_1.ClassActivator ? 'instantiating' : 'invoking';
	                var message = 'Error ' + activatingText + ' ' + fn.name + '.';
	                debug('invoke error %s', e);
	                message += ' Check the inner error for details.';
	                throw errors_1.createError("DIInvokeError", message, [e]);
	            }
	        }
	    }, {
	        key: 'registerInstance',
	        value: function registerInstance(key, instance) {
	            debug("%s: Register instance %s", this.id, key);
	            this.registerHandler(key, function (x) {
	                return instance;
	            });
	        }
	    }, {
	        key: 'registerTransient',
	        value: function registerTransient(key, fn, targetKey) {
	            debug("%s: Register transient %s", this.id, key);
	            this.registerHandler(key, function (x) {
	                return x.invoke(fn, null, targetKey);
	            });
	        }
	    }, {
	        key: 'registerSingleton',
	        value: function registerSingleton(key, fn, targetKey) {
	            debug("%s: Register singleton %s", this.id, key);
	            var singleton;
	            this.registerHandler(key, function (x) {
	                return singleton || (singleton = x.invoke(fn, null, targetKey));
	            });
	        }
	    }, {
	        key: 'registerHandler',
	        value: function registerHandler(key, handler) {
	            this._getOrCreateEntry(key).push(handler);
	        }
	    }, {
	        key: '_getOrCreateEntry',
	        value: function _getOrCreateEntry(key) {
	            var entry;
	            if (key === null || key === undefined) {
	                throw new errors_1.DIError('key cannot be null or undefined.  (Are you trying to inject something that doesn\'t exist with DI?)');
	            }
	            entry = this.entries.get(key);
	            if (entry === undefined) {
	                entry = [];
	                this.entries.set(key, entry);
	            }
	            return entry;
	        }
	    }, {
	        key: '_getOrCreateConstructionSet',
	        value: function _getOrCreateConstructionSet(fn, targetKey) {
	            var info = this.constructionInfo.get(fn);
	            if (info === undefined) {
	                info = this._createConstructionSet(fn, targetKey);
	                this.constructionInfo.set(fn, info);
	            }
	            return info;
	        }
	    }, {
	        key: '_createConstructionSet',
	        value: function _createConstructionSet(fn, targetKey) {
	            var info = {
	                activator: metadata_2.Metadata.getOwn(metadata_2.Metadata.instanceActivator, fn, targetKey) || metadata_1.ClassActivator.instance,
	                dependencyResolver: metadata_2.Metadata.getOwn(metadata_2.Metadata.dependencyResolver, fn, targetKey) || this
	            };
	            if (fn.inject !== undefined) {
	                if (typeof fn.inject === 'function') {
	                    info.keys = fn.inject();
	                } else {
	                    info.keys = fn.inject;
	                }
	                return info;
	            }
	            info.keys = metadata_2.Metadata.getOwn(metadata_2.Metadata.paramTypes, fn, targetKey) || getFunctionParameters(fn) || exports.emptyParameters;
	            return info;
	        }
	    }, {
	        key: 'root',
	        get: function get() {
	            var root = this,
	                tmp = root;
	            while (tmp) {
	                tmp = root.parent;
	                if (tmp) root = tmp;
	            }
	            return root;
	        }
	    }, {
	        key: 'id',
	        get: function get() {
	            return this._id;
	        }
	    }]);

	    return DIContainer;
	}();

	exports.DIContainer = DIContainer;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	/**
	* Used to allow functions/classes to indicate that they should be registered as transients with the container.
	*
	* @class TransientRegistration
	* @constructor
	* @param {Object} [key] The key to register as.
	*/

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TransientRegistration = function () {
	    function TransientRegistration(key) {
	        _classCallCheck(this, TransientRegistration);

	        this.key = key;
	    }
	    /**
	    * Called by the container to register the annotated function/class as transient.
	    *
	    * @method register
	    * @param {Container} container The container to register with.
	    * @param {Object} key The key to register as.
	    * @param {Object} fn The function to register (target of the annotation).
	    */


	    _createClass(TransientRegistration, [{
	        key: 'register',
	        value: function register(container, key, fn) {
	            container.registerTransient(this.key || key, fn);
	        }
	    }]);

	    return TransientRegistration;
	}();

	exports.TransientRegistration = TransientRegistration;
	/**
	* Used to allow functions/classes to indicate that they should be registered as singletons with the container.
	*
	* @class SingletonRegistration
	* @constructor
	* @param {Object} [key] The key to register as.
	*/

	var SingletonRegistration = function () {
	    function SingletonRegistration(keyOrRegisterInChild) {
	        var registerInChild = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	        _classCallCheck(this, SingletonRegistration);

	        if (typeof keyOrRegisterInChild === 'boolean') {
	            this.registerInChild = keyOrRegisterInChild;
	        } else {
	            this.key = keyOrRegisterInChild;
	            this.registerInChild = registerInChild;
	        }
	    }
	    /**
	    * Called by the container to register the annotated function/class as a singleton.
	    *
	    * @method register
	    * @param {Container} container The container to register with.
	    * @param {Object} key The key to register as.
	    * @param {Object} fn The function to register (target of the annotation).
	    */


	    _createClass(SingletonRegistration, [{
	        key: 'register',
	        value: function register(container, key, fn) {
	            var destination = this.registerInChild ? container : container.root;
	            destination.registerSingleton(this.key || key, fn);
	        }
	    }]);

	    return SingletonRegistration;
	}();

	exports.SingletonRegistration = SingletonRegistration;
	/**
	* An abstract resolver used to allow functions/classes to specify custom dependency resolution logic.
	*
	* @class Resolver
	* @constructor
	*/

	var Resolver = function () {
	    function Resolver() {
	        _classCallCheck(this, Resolver);
	    }

	    _createClass(Resolver, [{
	        key: 'get',

	        /**
	        * Called by the container to allow custom resolution of dependencies for a function/class.
	        *
	        * @method get
	        * @param {Container} container The container to resolve from.
	        * @return {Object} Returns the resolved object.
	        */
	        value: function get(container) {
	            throw new Error('A custom Resolver must implement get(container) and return the resolved instance(s).');
	        }
	    }]);

	    return Resolver;
	}();

	exports.Resolver = Resolver;
	/**
	* Used to allow functions/classes to specify lazy resolution logic.
	*
	* @class Lazy
	* @constructor
	* @extends Resolver
	* @param {Object} key The key to lazily resolve.
	*/

	var Lazy = function (_Resolver) {
	    _inherits(Lazy, _Resolver);

	    function Lazy(key) {
	        _classCallCheck(this, Lazy);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Lazy).call(this));

	        _this.key = key;
	        return _this;
	    }
	    /**
	    * Called by the container to lazily resolve the dependency into a lazy locator function.
	    *
	    * @method get
	    * @param {Container} container The container to resolve from.
	    * @return {Function} Returns a function which can be invoked at a later time to obtain the actual dependency.
	    */


	    _createClass(Lazy, [{
	        key: 'get',
	        value: function get(container) {
	            var _this2 = this;

	            return function () {
	                return container.get(_this2.key);
	            };
	        }
	        /**
	        * Creates a Lazy Resolver for the supplied key.
	        *
	        * @method of
	        * @static
	        * @param {Object} key The key to lazily resolve.
	        * @return {Lazy} Returns an insance of Lazy for the key.
	        */

	    }], [{
	        key: 'of',
	        value: function of(key) {
	            return new Lazy(key);
	        }
	    }]);

	    return Lazy;
	}(Resolver);

	exports.Lazy = Lazy;
	/**
	* Used to allow functions/classes to specify resolution of all matches to a key.
	*
	* @class All
	* @constructor
	* @extends Resolver
	* @param {Object} key The key to lazily resolve all matches for.
	*/

	var All = function (_Resolver2) {
	    _inherits(All, _Resolver2);

	    function All(key) {
	        _classCallCheck(this, All);

	        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(All).call(this));

	        _this3.key = key;
	        return _this3;
	    }
	    /**
	    * Called by the container to resolve all matching dependencies as an array of instances.
	    *
	    * @method get
	    * @param {Container} container The container to resolve from.
	    * @return {Object[]} Returns an array of all matching instances.
	    */


	    _createClass(All, [{
	        key: 'get',
	        value: function get(container) {
	            return container.getAll(this.key);
	        }
	        /**
	        * Creates an All Resolver for the supplied key.
	        *
	        * @method of
	        * @static
	        * @param {Object} key The key to resolve all instances for.
	        * @return {All} Returns an insance of All for the key.
	        */

	    }], [{
	        key: 'of',
	        value: function of(key) {
	            return new All(key);
	        }
	    }]);

	    return All;
	}(Resolver);

	exports.All = All;
	/**
	* Used to allow functions/classes to specify an optional dependency, which will be resolved only if already registred with the container.
	*
	* @class Optional
	* @constructor
	* @extends Resolver
	* @param {Object} key The key to optionally resolve for.
	* @param {Boolean} [checkParent=false] Indicates whether or not the parent container hierarchy should be checked.
	*/

	var Optional = function (_Resolver3) {
	    _inherits(Optional, _Resolver3);

	    function Optional(key) {
	        var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	        _classCallCheck(this, Optional);

	        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(Optional).call(this));

	        _this4.key = key;
	        _this4.checkParent = checkParent;
	        return _this4;
	    }
	    /**
	    * Called by the container to provide optional resolution of the key.
	    *
	    * @method get
	    * @param {Container} container The container to resolve from.
	    * @return {Object} Returns the instance if found; otherwise null.
	    */


	    _createClass(Optional, [{
	        key: 'get',
	        value: function get(container) {
	            if (container.hasHandler(this.key, this.checkParent)) {
	                return container.get(this.key);
	            }
	            return null;
	        }
	        /**
	        * Creates an Optional Resolver for the supplied key.
	        *
	        * @method of
	        * @static
	        * @param {Object} key The key to optionally resolve for.
	        * @param {Boolean} [checkParent=false] Indicates whether or not the parent container hierarchy should be checked.
	        * @return {Optional} Returns an insance of Optional for the key.
	        */

	    }], [{
	        key: 'of',
	        value: function of(key) {
	            var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	            return new Optional(key, checkParent);
	        }
	    }]);

	    return Optional;
	}(Resolver);

	exports.Optional = Optional;
	/**
	* Used to inject the dependency from the parent container instead of the current one.
	*
	* @class Parent
	* @constructor
	* @extends Resolver
	* @param {Object} key The key to resolve from the parent container.
	*/

	var Parent = function (_Resolver4) {
	    _inherits(Parent, _Resolver4);

	    function Parent(key) {
	        _classCallCheck(this, Parent);

	        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(Parent).call(this));

	        _this5.key = key;
	        return _this5;
	    }
	    /**
	    * Called by the container to load the dependency from the parent container
	    *
	    * @method get
	    * @param {Container} container The container to resolve the parent from.
	    * @return {Function} Returns the matching instance from the parent container
	    */


	    _createClass(Parent, [{
	        key: 'get',
	        value: function get(container) {
	            return container.parent ? container.parent.get(this.key) : null;
	        }
	        /**
	        * Creates a Parent Resolver for the supplied key.
	        *
	        * @method of
	        * @static
	        * @param {Object} key The key to resolve.
	        * @return {Parent} Returns an insance of Parent for the key.
	        */

	    }], [{
	        key: 'of',
	        value: function of(key) {
	            return new Parent(key);
	        }
	    }]);

	    return Parent;
	}(Resolver);

	exports.Parent = Parent;
	/**
	* Used to instantiate a class.
	*
	* @class ClassActivator
	* @constructor
	*/

	var ClassActivator = function () {
	    function ClassActivator() {
	        _classCallCheck(this, ClassActivator);
	    }

	    _createClass(ClassActivator, [{
	        key: 'invoke',
	        value: function invoke(fn, args) {
	            return Reflect.construct(fn, args);
	        }
	    }]);

	    return ClassActivator;
	}();

	ClassActivator.instance = new ClassActivator();
	exports.ClassActivator = ClassActivator;
	/**
	* Used to invoke a factory method.
	*
	* @class FactoryActivator
	* @constructor
	*/

	var FactoryActivator = function () {
	    function FactoryActivator() {
	        _classCallCheck(this, FactoryActivator);
	    }

	    _createClass(FactoryActivator, [{
	        key: 'invoke',
	        value: function invoke(fn, args) {
	            return fn.apply(undefined, args);
	        }
	    }]);

	    return FactoryActivator;
	}();

	FactoryActivator.instance = new FactoryActivator();
	exports.FactoryActivator = FactoryActivator;

/***/ },
/* 13 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var theGlobal = function () {
	    // Workers don’t have `window`, only `self`
	    if (typeof self !== 'undefined') {
	        return self;
	    }
	    if (typeof global !== 'undefined') {
	        return global;
	    }
	    // Not all environments allow eval and Function
	    // Use only as a last resort:
	    return new Function('return this')();
	}();
	var emptyMetadata = Object.freeze({});
	exports.metadataContainerKey = '__metadata__';
	if (typeof theGlobal.System === 'undefined') {
	    theGlobal.System = { isFake: true };
	}
	if (typeof theGlobal.System.forEachModule === 'undefined') {
	    theGlobal.System.forEachModule = function () {};
	}
	if (typeof theGlobal.Reflect === 'undefined') {
	    theGlobal.Reflect = {};
	}
	if (typeof theGlobal.Reflect.getOwnMetadata === 'undefined') {
	    Reflect.getOwnMetadata = function (metadataKey, target, targetKey) {
	        return ((target[exports.metadataContainerKey] || emptyMetadata)[targetKey] || emptyMetadata)[metadataKey];
	    };
	}
	if (typeof theGlobal.Reflect.defineMetadata === 'undefined') {
	    Reflect.defineMetadata = function (metadataKey, metadataValue, target, targetKey) {
	        var metadataContainer = target.hasOwnProperty(exports.metadataContainerKey) ? target[exports.metadataContainerKey] : target[exports.metadataContainerKey] = {};
	        var targetContainer = metadataContainer[targetKey] || (metadataContainer[targetKey] = {});
	        targetContainer[metadataKey] = metadataValue;
	    };
	}
	if (typeof theGlobal.Reflect.metadata === 'undefined') {
	    Reflect.metadata = function (metadataKey, metadataValue) {
	        return function (target, targetKey) {
	            Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
	        };
	    };
	}
	if (_typeof(theGlobal.Reflect.construct)) {
	    Reflect.construct = function (fn, args) {
	        return new (Function.prototype.bind.apply(fn, [null].concat(_toConsumableArray(args))))();
	    };
	}
	function ensureDecorators(target) {
	    var applicator;
	    if (typeof target.decorators === 'function') {
	        applicator = target.decorators();
	    } else {
	        applicator = target.decorators;
	    }
	    if (typeof applicator._decorate === 'function') {
	        delete target.decorators;
	        applicator._decorate(target);
	    } else {
	        throw new Error('The return value of your decorator\'s method was not valid.');
	    }
	}
	/**
	* Provides helpers for working with metadata.
	*
	* @class Metadata
	* @static
	*/
	exports.Metadata = {
	    global: theGlobal,
	    noop: function noop() {},
	    paramTypes: 'design:paramtypes',
	    properties: 'design:properties',
	    instanceActivator: 'di:instance-activator',
	    registration: 'di:registration',
	    dependencyResolver: 'di:dependency-resolver',
	    get: function get(metadataKey, target, targetKey) {
	        if (!target) {
	            return undefined;
	        }
	        var result = exports.Metadata.getOwn(metadataKey, target, targetKey);
	        return result === undefined ? exports.Metadata.get(metadataKey, Object.getPrototypeOf(target), targetKey) : result;
	    },
	    getOwn: function getOwn(metadataKey, target, targetKey) {
	        if (!target) {
	            return undefined;
	        }
	        if (target.hasOwnProperty('decorators')) {
	            ensureDecorators(target);
	        }
	        return Reflect.getOwnMetadata(metadataKey, target, targetKey);
	    },
	    define: function define(metadataKey, metadataValue, target, targetKey) {
	        Reflect.defineMetadata(metadataKey, metadataValue, target, targetKey);
	    },
	    getOrCreateOwn: function getOrCreateOwn(metadataKey, Type, target, targetKey) {
	        var result = exports.Metadata.getOwn(metadataKey, target, targetKey);
	        if (result === undefined) {
	            result = new Type();
	            Reflect.defineMetadata(metadataKey, result, target, targetKey);
	        }
	        return result;
	    }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DIError = function (_Error) {
	    _inherits(DIError, _Error);

	    function DIError(message) {
	        _classCallCheck(this, DIError);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DIError).call(this, message));

	        _this.message = message;
	        return _this;
	    }

	    _createClass(DIError, [{
	        key: "toString",
	        value: function toString() {
	            return "[" + this.name + ": " + this.message + "]";
	        }
	    }]);

	    return DIError;
	}(Error);

	exports.DIError = DIError;

	var DIAggregateError = function (_DIError) {
	    _inherits(DIAggregateError, _DIError);

	    function DIAggregateError(message, errors) {
	        _classCallCheck(this, DIAggregateError);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(DIAggregateError).call(this, message));

	        _this2.errors = errors;
	        return _this2;
	    }
	    /*toString (): string {
	        return `[${this.name}: ${this.message}], errors:${this.errors}`
	    }*/


	    _createClass(DIAggregateError, [{
	        key: "toString",
	        value: function toString() {
	            var errors = this.errors;
	            var error = void 0;
	            while (errors.length > 0) {
	                error = errors[errors.length - 1];
	                errors = error.errors || [];
	            }
	            if (error == null) {
	                return "[" + this.name + ": " + this.message + "]";
	            } else {
	                return String.prototype.toString.call(error);
	            }
	        }
	    }]);

	    return DIAggregateError;
	}(DIError);

	exports.DIAggregateError = DIAggregateError;
	function createError(name, message, errors) {
	    var e = void 0;
	    if (errors) {
	        e = new DIAggregateError(message, errors);
	    } else {
	        e = new DIError(message);
	    }
	    e.name = name;
	    return e;
	}
	exports.createError = createError;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(16);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();

	/**
	 * Colors.
	 */

	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};


	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);

	  if (!useColors) return args;

	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
	  return args;
	}

	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */

	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}
	  return r;
	}

	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */

	exports.enable(load());

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(17);

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */

	exports.formatters = {};

	/**
	 * Previously assigned color.
	 */

	var prevColor = 0;

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */

	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function debug(namespace) {

	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;

	  // define the `enabled` version
	  function enabled() {

	    var self = enabled;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();

	    var args = Array.prototype.slice.call(arguments);

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;

	  var fn = exports.enabled(namespace) ? enabled : disabled;

	  fn.namespace = namespace;

	  return fn;
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;

	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(13));
	__export(__webpack_require__(19));

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var decorator_applicator_1 = __webpack_require__(20);
	exports.Decorators = {
	    configure: {
	        parameterizedDecorator: function parameterizedDecorator(name, decorator) {
	            exports.Decorators[name] = function () {
	                var applicator = new decorator_applicator_1.DecoratorApplicator();
	                return applicator[name].apply(applicator, arguments);
	            };
	            decorator_applicator_1.DecoratorApplicator.prototype[name] = function () {
	                var result = decorator.apply(null, arguments);
	                return this.decorator(result);
	            };
	        },
	        simpleDecorator: function simpleDecorator(name, decorator) {
	            exports.Decorators[name] = function () {
	                return new decorator_applicator_1.DecoratorApplicator().decorator(decorator);
	            };
	            decorator_applicator_1.DecoratorApplicator.prototype[name] = function () {
	                return this.decorator(decorator);
	            };
	        }
	    }
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DecoratorApplicator = function () {
	    function DecoratorApplicator() {
	        _classCallCheck(this, DecoratorApplicator);

	        this._first = null;
	        this._second = null;
	        this._third = null;
	        this._rest = null;
	    }

	    _createClass(DecoratorApplicator, [{
	        key: "decorator",
	        value: function decorator(_decorator) {
	            if (this._first === null) {
	                this._first = _decorator;
	                return this;
	            }
	            if (this._second === null) {
	                this._second = _decorator;
	                return this;
	            }
	            if (this._third === null) {
	                this._third = _decorator;
	                return this;
	            }
	            if (this._rest === null) {
	                this._rest = [];
	            }
	            this._rest.push(_decorator);
	            return this;
	        }
	    }, {
	        key: "_decorate",
	        value: function _decorate(target) {
	            var i, ii, rest;
	            if (this._first !== null) {
	                this._first(target);
	            }
	            if (this._second !== null) {
	                this._second(target);
	            }
	            if (this._third !== null) {
	                this._third(target);
	            }
	            rest = this._rest;
	            if (rest !== null) {
	                for (i = 0, ii = rest.length; i < ii; ++i) {
	                    rest[i](target);
	                }
	            }
	        }
	    }]);

	    return DecoratorApplicator;
	}();

	exports.DecoratorApplicator = DecoratorApplicator;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var index_1 = __webpack_require__(18);
	var metadata_1 = __webpack_require__(12);
	var container_1 = __webpack_require__(11);
	function autoinject(target) {
	    var deco = function deco(target) {
	        target.inject = index_1.Metadata.getOwn(index_1.Metadata.paramTypes, target) || container_1.emptyParameters;
	    };
	    return target ? deco(target) : deco;
	}
	exports.autoinject = autoinject;
	function inject() {
	    for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
	        rest[_key] = arguments[_key];
	    }

	    return function (target) {
	        target.inject = rest;
	    };
	}
	exports.inject = inject;
	function registration(value, targetKey) {
	    return function (target) {
	        index_1.Metadata.define(index_1.Metadata.registration, value, target, targetKey);
	    };
	}
	exports.registration = registration;
	function transient(key, targetKey) {
	    return registration(new metadata_1.TransientRegistration(key), targetKey);
	}
	exports.transient = transient;
	function singleton(keyOrRegisterInChild) {
	    var registerInChild = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    var targetKey = arguments[2];

	    return registration(new metadata_1.SingletonRegistration(keyOrRegisterInChild, registerInChild), targetKey);
	}
	exports.singleton = singleton;
	function instanceActivator(value, targetKey) {
	    return function (target) {
	        index_1.Metadata.define(index_1.Metadata.instanceActivator, value, target, targetKey);
	    };
	}
	exports.instanceActivator = instanceActivator;
	function factory() {
	    return instanceActivator(metadata_1.FactoryActivator.instance);
	}
	exports.factory = factory;
	index_1.Decorators.configure.simpleDecorator('autoinject', autoinject);
	index_1.Decorators.configure.parameterizedDecorator('inject', inject);
	index_1.Decorators.configure.parameterizedDecorator('registration', registration);
	index_1.Decorators.configure.parameterizedDecorator('transient', transient);
	index_1.Decorators.configure.parameterizedDecorator('singleton', singleton);
	index_1.Decorators.configure.parameterizedDecorator('instanceActivator', instanceActivator);
	index_1.Decorators.configure.parameterizedDecorator('factory', factory);

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var internal_1 = __webpack_require__(8);
	var orange_1 = __webpack_require__(6);
	var stick_di_1 = __webpack_require__(9);
	var debug = __webpack_require__(15)('stick:container:repository');
	var fnToStr = Function.prototype.toString;
	var isNonArrowFnRegex = /^\s*function/;
	var isArrowFnWithParensRegex = /^\([^\)]*\) *=>/;
	var isArrowFnWithoutParensRegex = /^[^=]*=>/;
	var Repository;
	(function (Repository) {
	    Repository.items = [];
	    function add(type, name, target) {
	        debug("Adding dependency: %s, name: %s", internal_1.DependencyType[type], name);
	        var item = void 0;
	        if (item = orange_1.find(Repository.items, function (i) {
	            return i.name == name;
	        })) {
	            Repository.items.splice(Repository.items.indexOf(item), 1);
	        }
	        var config = void 0;
	        try {
	            config = stick_di_1.Metadata.get(internal_1.DIServiceConfig, target);
	        } catch (e) {}
	        if (typeof target === 'function' && target.name == "") {
	            try {
	                Object.defineProperty(target, 'name', {
	                    value: name
	                });
	            } catch (e) {}
	        }
	        Repository.items.push({
	            name: name,
	            handler: target,
	            type: type,
	            config: config
	        });
	    }
	    Repository.add = add;
	    function hasAny(name) {
	        return !!any(name);
	    }
	    Repository.hasAny = hasAny;
	    function has(type, name) {
	        return !!get(type, name);
	    }
	    Repository.has = has;
	    function get(type, name) {
	        debug("Get dependency: %s, name: %s", internal_1.DependencyType[type], name);
	        return orange_1.find(Repository.items, function (i) {
	            return i.name == name && i.type == type;
	        });
	    }
	    Repository.get = get;
	    function any(name) {
	        return orange_1.find(Repository.items, function (i) {
	            return i.name == name;
	        });
	    }
	    Repository.any = any;
	})(Repository = exports.Repository || (exports.Repository = {}));

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_23__;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) {
	            try {
	                step(generator.next(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function rejected(value) {
	            try {
	                step(generator.throw(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(result) {
	            result.done ? resolve(result.value) : new P(function (resolve) {
	                resolve(result.value);
	            }).then(fulfilled, rejected);
	        }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	var utils = __webpack_require__(6);
	var eventsjs_1 = __webpack_require__(5);
	var errors_1 = __webpack_require__(25);
	var index_1 = __webpack_require__(26);
	var debug = __webpack_require__(15)('stick:factory:controller');
	var wrap = function wrap(el, name, contextName) {
	    var div = document.createElement('controller');
	    div.setAttribute('name', name);
	    if (contextName != name) div.setAttribute('as', contextName);
	    div.appendChild(el);
	    return div;
	};

	var ControllerFactory = function (_eventsjs_1$EventEmit) {
	    _inherits(ControllerFactory, _eventsjs_1$EventEmit);

	    function ControllerFactory(name, controller, container) {
	        _classCallCheck(this, ControllerFactory);

	        var _this = _possibleConstructorReturn(this, (ControllerFactory.__proto__ || Object.getPrototypeOf(ControllerFactory)).call(this));

	        _this.container = container;
	        _this.controller = controller;
	        _this.name = name;
	        _this._id = utils.uniqueId("ctrl");
	        if (typeof controller === 'function' && controller.name == "") {
	            try {
	                Object.defineProperty(controller, 'name', {
	                    value: name
	                });
	            } catch (e) {}
	        }
	        debug("%s: Controller factory created: '%s', container %s", _this.id, name, _this.container.id);
	        return _this;
	    }

	    _createClass(ControllerFactory, [{
	        key: 'create',

	        /**
	         * Create an instance of a controller
	         * @param  {ControllerCreateOptions} options
	         * @return {utils.IPromise<any>}
	         * Call onTemplateRender (), onElementAttached
	         * emits before:template:render, template:render, before:element:attached, element:attached
	         */
	        value: function create(options) {
	            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee() {
	                var contextName, $state, template, controller, el;
	                return regeneratorRuntime.wrap(function _callee$(_context) {
	                    while (1) {
	                        switch (_context.prev = _context.next) {
	                            case 0:
	                                if (!this.container.hasInstance(this.name)) {
	                                    _context.next = 2;
	                                    break;
	                                }

	                                return _context.abrupt('return', utils.Promise.resolve(this.container.get(this.name)));

	                            case 2:
	                                this.container.registerSingleton(this.name, this.controller);
	                                contextName = options.contextName || this.name;
	                                // State

	                                _context.next = 6;
	                                return this.container.get('$state');

	                            case 6:
	                                $state = _context.sent;

	                                $state = $state.createChild(this.container, options.state);
	                                this.container.registerInstance('$state', $state, true);
	                                // Template
	                                _context.next = 11;
	                                return this.resolveTemplate($state, options);

	                            case 11:
	                                template = _context.sent;

	                                debug("%s: Created template: %s", this.id, template.id);
	                                this.container.registerInstance('template', template, true);
	                                debug("%s: Instantiating controller '%s' as '%s'", this.id, this.name, contextName);
	                                _context.next = 17;
	                                return this.container.get(this.name);

	                            case 17:
	                                controller = _context.sent;

	                                $state.set(contextName, controller);
	                                template.setTarget(controller);
	                                this.trigger('before:template:render');
	                                _context.next = 23;
	                                return template.render();

	                            case 23:
	                                el = _context.sent;

	                                // Wrap element if its a DocumentFragment
	                                if (el.nodeType === 11 || el.nodeType === 3) {
	                                    if (el.children.length === 1) {
	                                        el = el.firstChild.nodeType === 3 ? wrap(el, this.name, contextName) : el.firstChild;
	                                    } else {
	                                        el = wrap(el, this.name, contextName);
	                                    }
	                                }
	                                this.container.registerInstance('$el', el, true);
	                                if (typeof controller.onTemplateRender === 'function') {
	                                    controller.onTemplateRender.call(controller, el, template);
	                                }
	                                this.trigger('template:render');
	                                if (options.el) {
	                                    this.trigger('before:element:attached', options.el);
	                                    options.el.innerHTML = '';
	                                    options.el.appendChild(el);
	                                    if (typeof controller.onElementAttached === 'function') {
	                                        controller.onElementAttached.call(controller, el, options.el);
	                                    }
	                                    this.trigger('element:attached', el, options.el);
	                                }
	                                return _context.abrupt('return', controller);

	                            case 30:
	                            case 'end':
	                                return _context.stop();
	                        }
	                    }
	                }, _callee, this);
	            }));
	        }
	    }, {
	        key: 'resolveTemplate',
	        value: function resolveTemplate(state, options) {
	            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee2() {
	                var $template, $resolver, promise, _templateString, view, templateString;

	                return regeneratorRuntime.wrap(function _callee2$(_context2) {
	                    while (1) {
	                        switch (_context2.prev = _context2.next) {
	                            case 0:
	                                _context2.next = 2;
	                                return this.container.get('$templateCreator');

	                            case 2:
	                                $template = _context2.sent;
	                                _context2.next = 5;
	                                return this.container.get('$templateResolver');

	                            case 5:
	                                $resolver = _context2.sent;
	                                promise = void 0;

	                                if (!(options.el && !options.template)) {
	                                    _context2.next = 12;
	                                    break;
	                                }

	                                _templateString = options.el.innerHTML;

	                                promise = utils.Promise.resolve(_templateString);
	                                _context2.next = 22;
	                                break;

	                            case 12:
	                                if (!options.template) {
	                                    _context2.next = 21;
	                                    break;
	                                }

	                                if (!(options.template instanceof index_1.Template)) {
	                                    _context2.next = 18;
	                                    break;
	                                }

	                                _context2.next = 16;
	                                return options.template.render(state, {
	                                    container: this.container,
	                                    parentView: options.parentView
	                                });

	                            case 16:
	                                view = _context2.sent;
	                                return _context2.abrupt('return', view);

	                            case 18:
	                                promise = $resolver(options.template);
	                                _context2.next = 22;
	                                break;

	                            case 21:
	                                return _context2.abrupt('return', utils.Promise.reject(new errors_1.StickError("no element or template")));

	                            case 22:
	                                _context2.next = 24;
	                                return promise;

	                            case 24:
	                                templateString = _context2.sent;
	                                return _context2.abrupt('return', $template(templateString, state));

	                            case 26:
	                            case 'end':
	                                return _context2.stop();
	                        }
	                    }
	                }, _callee2, this);
	            }));
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee3() {
	                var controller;
	                return regeneratorRuntime.wrap(function _callee3$(_context3) {
	                    while (1) {
	                        switch (_context3.prev = _context3.next) {
	                            case 0:
	                                debug("%s: Destroying controller '%s'", this.id, this.name);
	                                _context3.next = 3;
	                                return this.container.get(this.name);

	                            case 3:
	                                controller = _context3.sent;

	                                if (typeof controller.onDestroy === 'function') {
	                                    controller.onDestroy.call(controller);
	                                }
	                                this.container.clear();
	                                this.container.entries.clear();

	                            case 7:
	                            case 'end':
	                                return _context3.stop();
	                        }
	                    }
	                }, _callee3, this);
	            }));
	        }
	    }, {
	        key: 'id',
	        get: function get() {
	            return this._id;
	        }
	    }]);

	    return ControllerFactory;
	}(eventsjs_1.EventEmitter);

	exports.ControllerFactory = ControllerFactory;

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var StickError = function (_Error) {
	    _inherits(StickError, _Error);

	    function StickError(message) {
	        _classCallCheck(this, StickError);

	        var _this = _possibleConstructorReturn(this, (StickError.__proto__ || Object.getPrototypeOf(StickError)).call(this, message));

	        _this.message = message;
	        return _this;
	    }

	    return StickError;
	}(Error);

	exports.StickError = StickError;

	var StickDependencyError = function (_StickError) {
	    _inherits(StickDependencyError, _StickError);

	    function StickDependencyError(message, errors) {
	        _classCallCheck(this, StickDependencyError);

	        var _this2 = _possibleConstructorReturn(this, (StickDependencyError.__proto__ || Object.getPrototypeOf(StickDependencyError)).call(this, message));

	        _this2.errors = errors;
	        return _this2;
	    }

	    return StickDependencyError;
	}(StickError);

	exports.StickDependencyError = StickDependencyError;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(27));
	__export(__webpack_require__(28));
	__export(__webpack_require__(30));
	__export(__webpack_require__(33));
	__export(__webpack_require__(34));
	__export(__webpack_require__(35));
	__export(__webpack_require__(37));
	__export(__webpack_require__(36));
	__export(__webpack_require__(29));

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Comment = function () {
	    function Comment(nodeValue) {
	        _classCallCheck(this, Comment);

	        this.nodeType = 8 /* Comment */;
	        this.nodeValue = nodeValue;
	    }

	    Comment.prototype.render = function render(options) {
	        return Promise.resolve(options.document.createComment(this.nodeValue));
	    };

	    return Comment;
	}();

	exports.Comment = Comment;
	exports.comment = function (nodeValue) {
	    return new Comment(nodeValue);
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var vnode_1 = __webpack_require__(29);

	var Dynamic = function () {
	    function Dynamic(vnode, bindingClass) {
	        _classCallCheck(this, Dynamic);

	        this.nodeType = -200 /* Dynamic */;
	        this.vnode = vnode;
	        this.bindingClass = bindingClass;
	        this.vnode.parentNode = this;
	    }

	    Dynamic.prototype.render = function render(options, renderers) {
	        if (options.components.has(this.vnode['tagName'])) {
	            return this._renderComponent(options, renderers);
	        } else {
	            return this._renderElement(options, renderers);
	        }
	    };

	    Dynamic.prototype._renderElement = function _renderElement(options, renderers) {
	        var _this = this;

	        return this.vnode.render(options, renderers).then(function (node) {
	            renderers.push(new DynamicRenderer(node, _this.bindingClass, options));
	            return node;
	        });
	    };

	    Dynamic.prototype._renderComponent = function _renderComponent(options, renderers) {
	        var _this2 = this;

	        var _r = [];
	        return this.vnode.render(options, _r).then(function (element) {
	            renderers.push(new DynamicComponentRenderer(_r[0], _this2.bindingClass, options));
	            return element;
	        });
	    };

	    return Dynamic;
	}();

	exports.Dynamic = Dynamic;
	exports.dynamic = function (vnode, bindClass) {
	    return new Dynamic(vnode, bindClass);
	};

	var DynamicComponentRenderer = function () {
	    function DynamicComponentRenderer(renderer, bindingClass, options) {
	        _classCallCheck(this, DynamicComponentRenderer);

	        this.renderer = renderer;
	        this.bindingClass = bindingClass;
	        this.options = options;
	    }

	    DynamicComponentRenderer.prototype.generate = function generate(root, view) {
	        var _this3 = this;

	        return this.renderer.generate(root, view).then(function () {
	            var component = view.bindings[view.bindings.length - 1];
	            view.bindings.splice(view.bindings.indexOf(component), 0, new _this3.bindingClass(component, view));
	        });
	    };

	    return DynamicComponentRenderer;
	}();

	var DynamicRenderer = function () {
	    function DynamicRenderer(node, bindingClass, options) {
	        _classCallCheck(this, DynamicRenderer);

	        this.ref = node;
	        this.bindingClass = bindingClass;
	        this.options = options;
	    }

	    DynamicRenderer.prototype.generate = function generate(root, view) {
	        if (!this._refPath) this._refPath = vnode_1.getNodePath(this.ref);
	        view.bindings.push(new this.bindingClass(vnode_1.getNodeByPath(root, this._refPath), view));
	        return Promise.resolve();
	    };

	    return DynamicRenderer;
	}();

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";

	function getNodeByPath(root, path) {
	    var c = root;
	    for (var i = 0, n = path.length; i < n; i++) {
	        c = c.childNodes[path[i]];
	    }
	    return c;
	}
	exports.getNodeByPath = getNodeByPath;
	function getNodePath(node) {
	    var path = [];
	    var p = node.parentNode;
	    var c = node;
	    while (p) {
	        path.unshift(Array.prototype.indexOf.call(p.childNodes, c));
	        c = p;
	        p = p.parentNode;
	        // virtual nodes - must be skipped
	        while (p && p.nodeType > 12) {
	            p = p.parentNode;
	        }
	    }
	    return path;
	}
	exports.getNodePath = getNodePath;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var orange_1 = __webpack_require__(6);
	var fragmentsection_1 = __webpack_require__(31);
	var nodesection_1 = __webpack_require__(32);

	var Element = function () {
	    function Element(tagName, attributes, children) {
	        _classCallCheck(this, Element);

	        this.nodeType = 1 /* Element */;
	        this.tagName = String(tagName).toLocaleLowerCase();
	        this.childNodes = children;
	        this.attributes = attributes || {};
	        for (var i = 0; i < children.length; i++) {
	            children[i].parentNode = this;
	        }
	    }

	    Element.prototype.render = function render(options, renderers) {
	        var components = options.components; // || {}
	        if (components.has(this.tagName)) {
	            return this._renderComponent(components.get(this.tagName), options, renderers);
	        }
	        return this._renderElement(options, renderers);
	    };

	    Element.prototype.setAttributes = function setAttributes(key, value) {
	        if (typeof key === 'string') {
	            this.attributes[key] = value;
	        } else {
	            orange_1.extend(this.attributes, key);
	        }
	    };

	    Element.prototype._renderComponent = function _renderComponent(component, options, renderers) {
	        var section = new fragmentsection_1.FragmentSection(options.document);
	        renderers.push(new ComponentAttributeRenderer(component, section, this, this._splitAttributes(options), options));
	        return Promise.resolve(section.render());
	    };

	    Element.prototype._renderElement = function _renderElement(options, renderers) {
	        var element = options.document.createElement(this.tagName);
	        var _attr = this._splitAttributes(options);
	        // Set static attributes
	        for (var attrKey in _attr.staticAttributes) {
	            element.setAttribute(attrKey, _attr.staticAttributes[attrKey]);
	        }
	        var r = this.childNodes.map(function (m) {
	            return m.render(options, renderers);
	        });
	        return Promise.all(r).then(function (children) {
	            children.forEach(function (child) {
	                element.appendChild(child);
	            });
	            if (Object.keys(_attr.dynamicAttributes).length) {
	                renderers.push(new ElementAttributeRenderer(new nodesection_1.NodeSection(options.document, element), options, _attr.dynamicAttributes));
	            }
	            return element;
	        });
	        /*for (let child of this.childNodes) {
	          element.appendChild(child.render(options, renderers));
	        }
	        
	        // Set dynamic attributes
	        if (Object.keys(_attr.dynamicAttributes).length) {
	               renderers.push(new ElementAttributeRenderer(new NodeSection(options.document, element), options, _attr.dynamicAttributes))
	        }
	             return element;*/
	    };

	    Element.prototype._splitAttributes = function _splitAttributes(options) {
	        var dynamicAttributes = {};
	        var staticAttributes = {};
	        if (options.attributes) {
	            for (var key in this.attributes) {
	                var attrClass = options.attributes.get(key);
	                if (attrClass && (!attrClass.test || attrClass.test(this, key, this.attributes[key]))) {
	                    dynamicAttributes[key] = this.attributes[key];
	                } else {
	                    staticAttributes[key] = this.attributes[key];
	                }
	            }
	        } else {
	            staticAttributes = this.attributes;
	        }
	        return {
	            dynamicAttributes: dynamicAttributes,
	            staticAttributes: staticAttributes
	        };
	    };

	    return Element;
	}();

	exports.Element = Element;
	exports.element = function (tagName, attributes) {
	    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        children[_key - 2] = arguments[_key];
	    }

	    return new Element(tagName, attributes, children);
	};

	var ComponentAttributeRenderer = function () {
	    function ComponentAttributeRenderer(component, section, element, attr, options) {
	        _classCallCheck(this, ComponentAttributeRenderer);

	        this.section = section;
	        this.componentClass = component;
	        this.element = element;
	        this.options = options;
	        this.attributes = attr.staticAttributes;
	        this.dynamicAttributes = attr.dynamicAttributes;
	    }

	    ComponentAttributeRenderer.prototype.generate = function generate(root, view) {
	        if (!this._marker) this._marker = this.section.createMarker();
	        var ref = new this.componentClass(this._marker.createSection(root), this.element, this.attributes, view);
	        if (Object.keys(this.dynamicAttributes).length) {
	            _hydrateDynamicAttributes(ref, this.options, this.dynamicAttributes, view);
	        }
	        if (ref.update) view.bindings.push(ref);
	        return ref.initialize();
	    };

	    return ComponentAttributeRenderer;
	}();

	var ElementAttributeRenderer = function () {
	    function ElementAttributeRenderer(section, options, attributes) {
	        _classCallCheck(this, ElementAttributeRenderer);

	        this.section = section;
	        this.options = options;
	        this.attributes = attributes;
	    }

	    ElementAttributeRenderer.prototype.generate = function generate(root, view) {
	        if (!this._marker) this._marker = this.section.createMarker();
	        _hydrateDynamicAttributes(this._marker.findNode(root), this.options, this.attributes, view);
	        return Promise.resolve();
	    };

	    return ElementAttributeRenderer;
	}();

	function _hydrateDynamicAttributes(ref, options, dynamicAttributes, view) {
	    for (var key in dynamicAttributes) {
	        var clazz = options.attributes.get(key);
	        var attr = new clazz(ref, key, dynamicAttributes[key], view);
	        if (attr.update) view.bindings.push(attr);
	    }
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var vnode_1 = __webpack_require__(29);

	var FragmentSection = function () {
	    function FragmentSection(document, start, end) {
	        _classCallCheck(this, FragmentSection);

	        this.document = document;
	        this.start = start || document.createTextNode('');
	        this.end = end || document.createTextNode('');
	        if (!this.start.parentNode) {
	            var parent = document.createDocumentFragment();
	            parent.appendChild(this.start);
	            parent.appendChild(this.end);
	            // Chrome bug. If the reference to the newly created dparent
	            // Chrome (v8?) will release it, and the parent will become null;
	            this.__parent = parent;
	        }
	    }

	    FragmentSection.prototype.appendChild = function appendChild(node) {
	        this.end.parentNode.insertBefore(node, this.end);
	    };

	    FragmentSection.prototype.render = function render() {
	        return this.start.parentNode;
	    };

	    FragmentSection.prototype.remove = function remove() {
	        var node = this.removeChildNodes();
	        node.insertBefore(this.start, node.childNodes[0]);
	        node.appendChild(this.end);
	        return this;
	    };

	    FragmentSection.prototype.removeChildNodes = function removeChildNodes() {
	        var node = this.document.createDocumentFragment(),
	            start = this.start;
	        var current = start.nextSibling;
	        var end = this.end;
	        while (current !== end) {
	            node.appendChild(current);
	            current = start.nextSibling;
	        }
	        return node;
	    };

	    FragmentSection.prototype.createMarker = function createMarker() {
	        return new FragmentSectionMarker(this.document, vnode_1.getNodePath(this.start), vnode_1.getNodePath(this.end));
	    };

	    FragmentSection.prototype.clone = function clone() {
	        var parentClone;
	        // fragment?
	        if (this.start.parentNode.nodeType === 11) {
	            parentClone = this.start.parentNode.cloneNode(true);
	        } else {
	            parentClone = this.document.createDocumentFragment();
	            var children = this._getChildNodes();
	            var n = children.length;
	            for (var i = 0; i < n; i++) {
	                parentClone.appendChild(children[i].cloneNode(true));
	            }
	        }
	        var first = parentClone.childNodes[0];
	        var last = parentClone.childNodes[parentClone.childNodes.length - 1];
	        return new FragmentSection(this.document, first, last);
	    };

	    FragmentSection.prototype._getChildNodes = function _getChildNodes() {
	        var current = this.start;
	        var end = this.end.nextSibling;
	        var children = [];
	        while (current !== end) {
	            children.push(current);
	            current = current.nextSibling;
	        }
	        return children;
	    };

	    return FragmentSection;
	}();

	exports.FragmentSection = FragmentSection;

	var FragmentSectionMarker = function () {
	    function FragmentSectionMarker(document, startPath, endPath) {
	        _classCallCheck(this, FragmentSectionMarker);

	        this.document = document;
	        this.startPath = startPath;
	        this.endPath = endPath;
	    }

	    FragmentSectionMarker.prototype.createSection = function createSection(root) {
	        return new FragmentSection(this.document, vnode_1.getNodeByPath(root, this.startPath), vnode_1.getNodeByPath(root, this.endPath));
	    };

	    return FragmentSectionMarker;
	}();

	exports.FragmentSectionMarker = FragmentSectionMarker;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var vnode_1 = __webpack_require__(29);

	var NodeSection = function () {
	    function NodeSection(document, node) {
	        _classCallCheck(this, NodeSection);

	        this.document = document;
	        this.node = node;
	    }

	    NodeSection.prototype.createMarker = function createMarker() {
	        return new NodeSectionMarker(this.document, vnode_1.getNodePath(this.node));
	    };

	    NodeSection.prototype.appendChild = function appendChild(node) {
	        this.node.appendChild(node);
	    };

	    NodeSection.prototype.render = function render() {
	        return this.node;
	    };

	    NodeSection.prototype.remove = function remove() {
	        if (this.node.parentNode) this.node.parentNode.removeChild(this.node);
	    };

	    NodeSection.prototype.removeChildren = function removeChildren() {
	        while (this.node.childNodes.length) {
	            this.node.removeChild(this.node.childNodes[0]);
	        }
	    };

	    NodeSection.prototype.clone = function clone() {
	        return new NodeSection(this.document, this.node.cloneNode(true));
	    };

	    return NodeSection;
	}();

	exports.NodeSection = NodeSection;

	var NodeSectionMarker = function () {
	    function NodeSectionMarker(document, path) {
	        _classCallCheck(this, NodeSectionMarker);

	        this.document = document;
	        this.path = path;
	    }

	    NodeSectionMarker.prototype.createSection = function createSection(root) {
	        return new NodeSection(this.document, this.findNode(root));
	    };

	    NodeSectionMarker.prototype.findNode = function findNode(root) {
	        return vnode_1.getNodeByPath(root, this.path);
	    };

	    return NodeSectionMarker;
	}();

	exports.NodeSectionMarker = NodeSectionMarker;

/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) {
	            try {
	                step(generator.next(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function rejected(value) {
	            try {
	                step(generator.throw(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(result) {
	            result.done ? resolve(result.value) : new P(function (resolve) {
	                resolve(result.value);
	            }).then(fulfilled, rejected);
	        }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	/*function iterateSync(list:any[], fn:(child:any) => Promise<any>): Promise<any[]> {
	  return new Promise((resolve, reject) => {
	    var current = 0, length = list.length;
	    var out = [];
	    const next = (err, value) => {
	      if (current == length - 1) {
	        return resolve(out);
	      } else if (err != null) {
	        return reject(err)
	      } else if (err == null && value == null) {

	      }
	    };

	    next(null, null);
	  });
	}*/

	var Fragment = function () {
	    function Fragment(children) {
	        _classCallCheck(this, Fragment);

	        this.nodeType = 11 /* Fragment */;
	        this.childNodes = children;
	        for (var i = 0; i < children.length; i++) {
	            children[i].parentNode = this;
	        }
	    }

	    Fragment.prototype.render = function render(options, renderers) {
	        return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee() {
	            var fragment, i, n, child;
	            return regeneratorRuntime.wrap(function _callee$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            fragment = options.document.createDocumentFragment();
	                            /*let r = this.childNodes.map( c => {
	                              return c.render(options, renderers);
	                            });
	                                   return Promise.all(r)
	                            .then( childs => {
	                              childs.forEach( m => fragment.appendChild(<any>m));
	                              return fragment;
	                            });*/

	                            i = 0, n = this.childNodes.length;

	                        case 2:
	                            if (!(i < n)) {
	                                _context.next = 10;
	                                break;
	                            }

	                            _context.next = 5;
	                            return this.childNodes[i].render(options, renderers);

	                        case 5:
	                            child = _context.sent;

	                            fragment.appendChild(child);

	                        case 7:
	                            i++;
	                            _context.next = 2;
	                            break;

	                        case 10:
	                            return _context.abrupt("return", fragment);

	                        case 11:
	                        case "end":
	                            return _context.stop();
	                    }
	                }
	            }, _callee, this);
	        }));
	    };

	    return Fragment;
	}();

	exports.Fragment = Fragment;
	exports.fragment = function (children) {
	    return new Fragment(children);
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var fragmentsection_1 = __webpack_require__(31);
	var nodesection_1 = __webpack_require__(32);
	function section(document, node) {
	    var section = void 0;
	    if (node.nodeType == 11 /* Fragment */) {
	            var frag = new fragmentsection_1.FragmentSection(document);
	            frag.appendChild(node);
	            section = frag;
	        } else {
	        section = new nodesection_1.NodeSection(document, node);
	    }
	    return section;
	}
	exports.section = section;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) {
	            try {
	                step(generator.next(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function rejected(value) {
	            try {
	                step(generator.throw(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(result) {
	            result.done ? resolve(result.value) : new P(function (resolve) {
	                resolve(result.value);
	            }).then(fulfilled, rejected);
	        }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	var section_1 = __webpack_require__(34);
	var view_1 = __webpack_require__(36);

	var Template = function () {
	    function Template(vnode, options) {
	        _classCallCheck(this, Template);

	        this._renderers = [];
	        this.vnode = vnode;
	        /*let node = vnode.render(<any>options, this._renderers);
	        
	        this.section = section(options.document, node)*/
	        this.options = options;
	    }

	    Template.prototype.render = function render(context, options) {
	        var _this = this;

	        return this.vnode.render(this.options, this._renderers).then(function (node) {
	            _this.section = section_1.section(_this.options.document, node);
	            return _this.view(context, options);
	        });
	    };

	    Template.prototype.view = function view(context) {
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	        return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee() {
	            var sec, DestView, k, view, i, ii;
	            return regeneratorRuntime.wrap(function _callee$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            if (!(this.section == null)) {
	                                _context.next = 2;
	                                break;
	                            }

	                            throw new Error('must call render before view');

	                        case 2:
	                            sec = this.section.clone();
	                            DestView = this.options.viewClass || view_1.View;

	                            for (k in this.options) {
	                                if (!options[k]) options[k] = this.options[k];
	                            }
	                            view = new DestView(sec, this, context, options);
	                            /*let all = this._renderers.map( r => {
	                                return r.generate(sec.node||sec.start.parentNode,view);
	                            });
	                            
	                            return Promise.all(all)
	                            .then( () => {
	                                return view;
	                            });*/

	                            i = 0, ii = this._renderers.length;

	                        case 7:
	                            if (!(i < ii)) {
	                                _context.next = 13;
	                                break;
	                            }

	                            _context.next = 10;
	                            return this._renderers[i].generate(sec.node || sec.start.parentNode, view);

	                        case 10:
	                            i++;
	                            _context.next = 7;
	                            break;

	                        case 13:
	                            return _context.abrupt('return', view);

	                        case 14:
	                        case 'end':
	                            return _context.stop();
	                    }
	                }
	            }, _callee, this);
	        }));
	    };

	    return Template;
	}();

	exports.Template = Template;
	function template(vnode, options) {
	    return new Template(vnode, options);
	}
	exports.template = template;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var eventsjs_1 = __webpack_require__(5);

	var View = function (_eventsjs_1$EventEmit) {
	    _inherits(View, _eventsjs_1$EventEmit);

	    function View(section, template, context, options) {
	        _classCallCheck(this, View);

	        var _this = _possibleConstructorReturn(this, _eventsjs_1$EventEmit.call(this));

	        _this.section = section;
	        _this.template = template;
	        _this.bindings = [];
	        _this._runloop = options.runloop;
	        _this.context = context;
	        return _this;
	    }

	    View.prototype.update = function update() {
	        return Promise.all(this.bindings.map(function (m) {
	            return m.update();
	        })).then(function (v) {
	            return void 0;
	        });
	    };

	    View.prototype.addListener = function addListener(elm, eventName, callback) {
	        var capture = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	        elm.addEventListener(eventName, callback, capture);
	        return callback;
	    };

	    View.prototype.removeListener = function removeListener(elm, eventName, callback) {
	        var capture = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	        elm.removeEventListener(eventName, callback, capture);
	    };

	    View.prototype.render = function render() {
	        return Promise.resolve(this.section.render());
	    };

	    View.prototype.remove = function remove() {
	        for (var _iterator = this.bindings, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;

	            if (_isArray) {
	                if (_i >= _iterator.length) break;
	                _ref = _iterator[_i++];
	            } else {
	                _i = _iterator.next();
	                if (_i.done) break;
	                _ref = _i.value;
	            }

	            var binding = _ref;

	            binding.destroy();
	        }
	        return this.section.remove();
	    };

	    return View;
	}(eventsjs_1.EventEmitter);

	exports.View = View;

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Text = function () {
	    function Text(nodeValue) {
	        _classCallCheck(this, Text);

	        this.nodeType = -201 /* Text */;
	        this.nodeValue = nodeValue;
	    }

	    Text.prototype.render = function render(options) {
	        return Promise.resolve(options.document.createTextNode(this.nodeValue));
	    };

	    return Text;
	}();

	exports.Text = Text;
	exports.text = function text(nodeValue) {
	    return new Text(nodeValue);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) {
	            try {
	                step(generator.next(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function rejected(value) {
	            try {
	                step(generator.throw(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(result) {
	            result.done ? resolve(result.value) : new P(function (resolve) {
	                resolve(result.value);
	            }).then(fulfilled, rejected);
	        }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	var internal_1 = __webpack_require__(8);
	var eventsjs_1 = __webpack_require__(5);
	var repository_1 = __webpack_require__(22);
	var errors_1 = __webpack_require__(25);
	var stick_di_1 = __webpack_require__(9);
	var utils = __webpack_require__(6);
	var index_1 = __webpack_require__(26);
	var state_1 = __webpack_require__(39);
	var controller_factory_1 = __webpack_require__(24);
	//import {Observer} from './observer'
	var debug = __webpack_require__(15)('stick:factory:module');
	var wrap = function wrap(el, name) {
	    var div = document.createElement('module');
	    div.setAttribute('name', name);
	    //if (contextName != this.name) div.setAttribute('as', contextName);
	    div.appendChild(el);
	    return div;
	};

	var ModuleFactory = function (_eventsjs_1$EventEmit) {
	    _inherits(ModuleFactory, _eventsjs_1$EventEmit);

	    function ModuleFactory(name, module, container) {
	        _classCallCheck(this, ModuleFactory);

	        var _this = _possibleConstructorReturn(this, (ModuleFactory.__proto__ || Object.getPrototypeOf(ModuleFactory)).call(this));

	        if (arguments.length != 3) {
	            throw new Error();
	        }
	        _this.name = name;
	        _this.module = module;
	        _this.container = container;
	        if (typeof module === 'function' && module.name == "") {
	            try {
	                Object.defineProperty(module, 'name', {
	                    value: name
	                });
	            } catch (e) {}
	        }
	        _this._id = utils.uniqueId("mod");
	        debug("%s: Module factory created: '%s', container: %s", _this.id, name, _this.container.id);
	        _this.container.registerSingleton(name, module);
	        _this.container.registerInstance('$container', _this.container);
	        return _this;
	    }

	    _createClass(ModuleFactory, [{
	        key: 'controller',
	        value: function controller(name, definition) {
	            var _internal_1$getDepend = internal_1.getDependencies(definition);

	            var _internal_1$getDepend2 = _slicedToArray(_internal_1$getDepend, 2);

	            var def = _internal_1$getDepend2[0];
	            var deps = _internal_1$getDepend2[1];

	            if (def) {
	                var fn = void 0;
	                if (typeof def !== 'function' && utils.isObject(def)) {
	                    var copy = utils.extend({}, def);
	                    if (typeof def.initialize === 'function') {
	                        fn = def.initialize;
	                        delete copy.initialize;
	                    } else if (typeof def.constructor === 'function') {
	                        fn = def.constructor;
	                        delete copy.constructor;
	                    }
	                    if (!deps || deps.length == 0) {
	                        internal_1.getDependencies(fn);
	                    }
	                    utils.assign(fn.prototype, copy);
	                } else if (typeof def === 'function') {
	                    fn = def;
	                }
	                if (typeof fn !== 'function') {
	                    throw new errors_1.StickError('controller defition should be a function or an object literal');
	                }
	                internal_1.setDependencyType(internal_1.DependencyType.Controller)(fn);
	                var factory = new controller_factory_1.ControllerFactory(name, fn, this.container.createChild());
	                this.container.registerInstance(name, factory, true);
	                debug("%s: Register controller: '%s', %s", this.id, name, factory.id);
	            } else {
	                throw new errors_1.StickError("controller definition should be a function, function constructor or a object literal");
	            }
	            return this;
	        }
	    }, {
	        key: 'service',
	        value: function service(name, definition) {
	            var _internal_1$getDepend3 = internal_1.getDependencies(definition);

	            var _internal_1$getDepend4 = _slicedToArray(_internal_1$getDepend3, 1);

	            var fn = _internal_1$getDepend4[0];

	            if (fn && typeof fn === 'function') {
	                internal_1.setDependencyType(internal_1.DependencyType.Service)(fn);
	                this.container.registerService(name, fn);
	                debug("%s Register service %s", this.id, name);
	            } else {
	                throw new errors_1.StickError('service should be a function');
	            }
	            return this;
	        }
	        /**
	         * Create a factory function
	         * @param {String} name
	         */

	    }, {
	        key: 'factory',
	        value: function factory(name, _factory) {
	            var _internal_1$getDepend5 = internal_1.getDependencies(_factory);

	            var _internal_1$getDepend6 = _slicedToArray(_internal_1$getDepend5, 1);

	            var fn = _internal_1$getDepend6[0];

	            if (!fn) throw new errors_1.StickError('factory');
	            debug("%s Register factory %s", this.id, name);
	            if (typeof fn === 'function') {
	                internal_1.setDependencyType(internal_1.DependencyType.Factory)(fn);
	                internal_1.setActivator(fn, stick_di_1.FactoryActivator.instance);
	                this.container.registerSingleton(name, fn);
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

	    }, {
	        key: 'create',
	        value: function create() {
	            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee() {
	                var state, template, mod, el;
	                return regeneratorRuntime.wrap(function _callee$(_context) {
	                    while (1) {
	                        switch (_context.prev = _context.next) {
	                            case 0:
	                                if (!this.container.hasInstance(this.name)) {
	                                    _context.next = 3;
	                                    break;
	                                }

	                                debug("%s: Resolving module %s", this.id, this.name);
	                                //return utils.Promise.resolve(this.container.get(this.name));
	                                return _context.abrupt('return', this.container.get(this.name));

	                            case 3:
	                                this.container.registerSingleton('$state', state_1.State);
	                                _context.next = 6;
	                                return this.container.get('$state');

	                            case 6:
	                                state = _context.sent;

	                                if (options.state) {
	                                    state.set(options.state);
	                                }
	                                debug("%s: Creating module %s", this.id, this.name);

	                                if (!(options.template || options.el)) {
	                                    _context.next = 30;
	                                    break;
	                                }

	                                _context.next = 12;
	                                return this.resolveTemplate(state, options);

	                            case 12:
	                                template = _context.sent;

	                                debug("%s: Created template: %s", this.id, template.id);
	                                this.container.registerInstance('template', template, true);
	                                debug("%s: Instantiating module '%s'", this.id, this.name);
	                                _context.next = 18;
	                                return this.container.get(this.name);

	                            case 18:
	                                mod = _context.sent;

	                                template.setTarget(mod);
	                                //$state.set(contextName, controller);
	                                this.trigger('before:template:render');
	                                _context.next = 23;
	                                return template.render();

	                            case 23:
	                                el = _context.sent;

	                                if (el.nodeType === 11 || el.nodeType === 3) {
	                                    if (el.children.length === 1) {
	                                        el = el.firstChild.nodeType === 3 ? wrap(el, this.name) : el.firstChild;
	                                    } else {
	                                        el = wrap(el, this.name);
	                                    }
	                                }
	                                this.container.registerInstance('$el', el, true);
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
	                                    this.trigger('element:attached', el, options.el);
	                                }
	                                return _context.abrupt('return', mod);

	                            case 30:
	                                return _context.abrupt('return', this.container.get(this.name));

	                            case 31:
	                            case 'end':
	                                return _context.stop();
	                        }
	                    }
	                }, _callee, this);
	            }));
	        }
	    }, {
	        key: 'configure',
	        value: function configure(name) {
	            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee2() {
	                var configName, provider, serv;
	                return regeneratorRuntime.wrap(function _callee2$(_context2) {
	                    while (1) {
	                        switch (_context2.prev = _context2.next) {
	                            case 0:
	                                configName = name;

	                                if (!/Provider$/.test(name)) {
	                                    configName = name + 'Provider';
	                                } else {
	                                    name = name.replace('Provider', '');
	                                }
	                                provider = void 0;
	                                // Check if provider is registered

	                                if (!this.container.hasHandler(configName, false, false)) {
	                                    _context2.next = 7;
	                                    break;
	                                }

	                                return _context2.abrupt('return', this.container.get(name));

	                            case 7:
	                                if (!repository_1.Repository.has(internal_1.DependencyType.Service, name)) {
	                                    _context2.next = 12;
	                                    break;
	                                }

	                                serv = repository_1.Repository.get(internal_1.DependencyType.Service, name);

	                                this.container.register(serv);

	                                if (!this.container.hasHandler(configName, false, false)) {
	                                    _context2.next = 12;
	                                    break;
	                                }

	                                return _context2.abrupt('return', this.container.get(configName));

	                            case 12:
	                                throw new Error('No provider for ' + name.replace('Provider', ''));

	                            case 13:
	                            case 'end':
	                                return _context2.stop();
	                        }
	                    }
	                }, _callee2, this);
	            }));
	        }
	    }, {
	        key: 'resolveTemplate',
	        value: function resolveTemplate(state, options) {
	            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee3() {
	                var $template, $resolver, promise, _templateString, view, templateString;

	                return regeneratorRuntime.wrap(function _callee3$(_context3) {
	                    while (1) {
	                        switch (_context3.prev = _context3.next) {
	                            case 0:
	                                _context3.next = 2;
	                                return this.container.get('$templateCreator');

	                            case 2:
	                                $template = _context3.sent;
	                                _context3.next = 5;
	                                return this.container.get('$templateResolver');

	                            case 5:
	                                $resolver = _context3.sent;
	                                promise = void 0;

	                                if (!(options.el && !options.template)) {
	                                    _context3.next = 12;
	                                    break;
	                                }

	                                _templateString = options.el.innerHTML;

	                                promise = utils.Promise.resolve(_templateString);
	                                _context3.next = 22;
	                                break;

	                            case 12:
	                                if (!options.template) {
	                                    _context3.next = 21;
	                                    break;
	                                }

	                                if (!(options.template instanceof index_1.Template)) {
	                                    _context3.next = 18;
	                                    break;
	                                }

	                                _context3.next = 16;
	                                return options.template.render(state, {
	                                    container: this.container
	                                });

	                            case 16:
	                                view = _context3.sent;
	                                return _context3.abrupt('return', view);

	                            case 18:
	                                promise = $resolver(options.template);
	                                _context3.next = 22;
	                                break;

	                            case 21:
	                                return _context3.abrupt('return', utils.Promise.reject(new errors_1.StickError("no element or template")));

	                            case 22:
	                                _context3.next = 24;
	                                return promise;

	                            case 24:
	                                templateString = _context3.sent;
	                                return _context3.abrupt('return', $template(templateString, state));

	                            case 26:
	                            case 'end':
	                                return _context3.stop();
	                        }
	                    }
	                }, _callee3, this);
	            }));
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            //this.container.destroy();
	        }
	    }, {
	        key: 'id',
	        get: function get() {
	            return this._id;
	        }
	    }]);

	    return ModuleFactory;
	}(eventsjs_1.EventEmitter);

	exports.ModuleFactory = ModuleFactory;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var collection_1 = __webpack_require__(40);
	var utils = __webpack_require__(6);
	var decorators = __webpack_require__(7);
	var debug = __webpack_require__(15)('stick:state');
	function isObject(a) {
	    return a === Object(a);
	}
	exports.get_atributes = function (attributes) {
	    var keys = Object.keys(attributes),
	        deferred = {},
	        attr = {};
	    keys.map(function (key) {
	        return { key: key, value: attributes[key] };
	    }).filter(function (pair) {
	        if (!utils.has(attributes, pair.key)) return false;
	        if (pair.value && utils.isPromise(pair.value)) {
	            deferred[pair.key] = pair.value;
	            delete attributes[pair.key];
	            return false;
	        }
	        return true;
	    }).forEach(function (a) {
	        attr[a.key] = a.value;
	    });
	    return { attr: attr, deferred: deferred };
	};
	var State_1 = void 0;
	var State = State_1 = function (_collection_1$NestedM) {
	    _inherits(State, _collection_1$NestedM);

	    function State(container, values) {
	        _classCallCheck(this, State);

	        var _this = _possibleConstructorReturn(this, (State.__proto__ || Object.getPrototypeOf(State)).call(this, values));

	        _this._container = container;
	        debug('%s: State created', _this.uid);
	        return _this;
	    }

	    _createClass(State, [{
	        key: "get",

	        /*public pick(attr:string|string[], ...attrs:string[]): any {
	            if (arguments.length === 1) {
	                if (!Array.isArray(attr)) {
	                    attrs = [attr];
	                } else {
	                    attrs = <string[]>attr;
	                }
	            } else {
	                attrs = [<string>attr].concat(attrs);
	            }
	            let out = {};
	            for (let i = 0, ii = attrs.length; i < ii; i++ ) {
	                if (this.has(attrs[i])) out[attrs[i]] = this.get(attrs[i]);
	            }
	            
	            return out;
	        }*/
	        value: function get(key) {
	            var data = _get(State.prototype.__proto__ || Object.getPrototypeOf(State.prototype), "get", this).call(this, key);
	            debug("%s: Get attribute: %s", this.uid, key, data);
	            return data;
	        }
	    }, {
	        key: "set",
	        value: function set(key, val) {
	            var _this2 = this;

	            var opts = { array: false },
	                value = {},
	                unset = {};
	            if (typeof key === 'string') {
	                if (val == null) {
	                    unset[key] = val;
	                } else {
	                    value[key] = val;
	                }
	            } else if (isObject(key)) {
	                value = key;
	            }

	            var _exports$get_atribute = exports.get_atributes(value);

	            var attr = _exports$get_atribute.attr;
	            var deferred = _exports$get_atribute.deferred;

	            if (!utils.isEmpty(deferred)) {
	                debug("%s: Resolve deferred values: %j", this.uid, Object.keys(deferred));
	                utils.objectToPromise(deferred).then(function (obj) {
	                    _this2.set(obj);
	                });
	            }
	            if (!utils.isEmpty(attr)) {
	                debug("%s: Set attributes: ", this.uid, attr);
	                _get(State.prototype.__proto__ || Object.getPrototypeOf(State.prototype), "set", this).call(this, attr, opts);
	            }
	            if (!utils.isEmpty(unset)) {
	                // Should unset
	                debug("%s: Unset attributes: %j", this.uid, Object.keys(unset));
	                _get(State.prototype.__proto__ || Object.getPrototypeOf(State.prototype), "set", this).call(this, unset);
	            }
	            return this;
	        }
	    }, {
	        key: "createChild",
	        value: function createChild(container, values) {
	            if (!container) container = this.container.createChild();
	            var state = new State_1(container, values);
	            state._parent = state;
	            debug("%s: Create child %s", this.uid, state.uid);
	            return state;
	        }
	    }, {
	        key: "$destroy",
	        value: function $destroy() {
	            _get(State.prototype.__proto__ || Object.getPrototypeOf(State.prototype), "destroy", this).call(this);
	            debug("%s: State destroyed", this.uid);
	        }
	    }, {
	        key: "parent",
	        get: function get() {
	            return this._parent;
	        }
	    }, {
	        key: "container",
	        get: function get() {
	            return this._container;
	        }
	    }]);

	    return State;
	}(collection_1.NestedModel);
	State = State_1 = __decorate([decorators.inject('$container')], State);
	exports.State = State;

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_40__;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var internal_1 = __webpack_require__(8);
	var errors_1 = __webpack_require__(25);
	var repository_1 = __webpack_require__(22);
	var utils = __webpack_require__(6);
	var module_factory_1 = __webpack_require__(38);
	var container_1 = __webpack_require__(42);
	var base_component_1 = __webpack_require__(43);
	var templ = __webpack_require__(23);
	var annotations = __webpack_require__(7);
	var debug = __webpack_require__(15)('stick');
	var repository_2 = __webpack_require__(22);
	exports.Repository = repository_2.Repository;
	var module_factory_2 = __webpack_require__(38);
	exports.ModuleFactory = module_factory_2.ModuleFactory;
	function service(name, definition) {
	    var _internal_1$getDepend = internal_1.getDependencies(definition);

	    var _internal_1$getDepend2 = _slicedToArray(_internal_1$getDepend, 1);

	    var fn = _internal_1$getDepend2[0];

	    if (fn && typeof fn === 'function') {
	        repository_1.Repository.add(internal_1.DependencyType.Service, name, fn);
	    } else {
	        throw new errors_1.StickError('service should be a function');
	    }
	}
	exports.service = service;
	function factory(name, factory) {
	    var _internal_1$getDepend3 = internal_1.getDependencies(factory);

	    var _internal_1$getDepend4 = _slicedToArray(_internal_1$getDepend3, 1);

	    var fn = _internal_1$getDepend4[0];

	    if (!fn) throw new errors_1.StickError('factory');
	    repository_1.Repository.add(internal_1.DependencyType.Factory, name, fn);
	}
	exports.factory = factory;
	var container = new container_1.Container();
	function _module(name) {
	    var definition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	    if (definition == null) {
	        var _factory = void 0;
	        // Check if module already is defined
	        if (container.hasHandler(name)) {
	            _factory = container.get(name);
	        } else if (repository_1.Repository.has(internal_1.DependencyType.Module, name)) {
	            var result = repository_1.Repository.get(internal_1.DependencyType.Module, name);
	            _factory = new module_factory_1.ModuleFactory(name, result.handler, container.createChild());
	            container.registerInstance(name, _factory);
	        } else {
	            throw new errors_1.StickError('no module named ' + name);
	        }
	        return _factory;
	    }

	    var _internal_1$getDepend5 = internal_1.getDependencies(definition);

	    var _internal_1$getDepend6 = _slicedToArray(_internal_1$getDepend5, 2);

	    var def = _internal_1$getDepend6[0];
	    var deps = _internal_1$getDepend6[1];

	    if (def) {
	        var fn = void 0;
	        if (typeof def !== 'function' && utils.isObject(def)) {
	            var copy = utils.extend({}, def);
	            if (typeof def.initialize === 'function') {
	                fn = def.initialize;
	                delete copy.initialize;
	            } else if (typeof def.constructor === 'function') {
	                fn = def.constructor;
	                delete copy.constructor;
	            }
	            if (!deps || deps.length == 0) {
	                internal_1.getDependencies(fn);
	            } else {
	                fn.inject = deps;
	            }
	            utils.assign(fn.prototype, copy);
	        } else if (typeof def === 'function') {
	            fn = def;
	        }
	        if (typeof fn !== 'function') {
	            throw new errors_1.StickError('controller defition should be a function or an object literal');
	        }
	        var _factory2 = new module_factory_1.ModuleFactory(name, fn, container.createChild());
	        container.registerInstance(name, _factory2, true);
	        return _factory2;
	    } else {
	        throw new errors_1.StickError('controller defition should be a function or an object literal');
	    }
	}
	exports.module = _module;
	function component(name, handler) {
	    //let component: ComponentDefinition
	    var Component = void 0;
	    if (typeof handler === 'function') {
	        /*component = {
	            initialize: <any>handler,
	        }*/
	        Component = handler;
	    } else if (utils.isObject(handler) && typeof handler.initialize === 'function') {
	        Component = utils.inherits(base_component_1.BaseComponent, handler);
	    } else {
	        throw new errors_1.StickError("component should be a function or an object");
	    }
	    //let Component = utils.inherits(<any>BaseComponent, component)
	    debug('defining component: %s', name);
	    templ.component(name, Component);
	}
	exports.component = component;
	function attribute(name, handler) {
	    debug('defining attribute: %s', name);
	    templ.attribute(name, handler);
	}
	exports.attribute = attribute;
	function decorator(name, decorator) {
	    if (utils.has(annotations, name)) {
	        throw new Error('decorator called ' + name + ' already defined!');
	    }
	    annotations[name] = decorator;
	}
	exports.decorator = decorator;
	function modifier(name, modifier) {
	    debug('defining modifier: %s', name);
	    templ.modifier(name, modifier);
	}
	exports.modifier = modifier;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) {
	            try {
	                step(generator.next(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function rejected(value) {
	            try {
	                step(generator.throw(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(result) {
	            result.done ? resolve(result.value) : new P(function (resolve) {
	                resolve(result.value);
	            }).then(fulfilled, rejected);
	        }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	var stick_di_1 = __webpack_require__(9);
	var errors_1 = __webpack_require__(25);
	var repository_1 = __webpack_require__(22);
	var internal_1 = __webpack_require__(8);
	var utils = __webpack_require__(6);
	var controller_factory_1 = __webpack_require__(24);
	__export(__webpack_require__(9));
	function tryCatch(fn, ctx, args) {
	    var result = void 0,
	        error = void 0;
	    try {
	        result = utils.callFunc(fn, ctx, args);
	    } catch (e) {
	        error = e;
	    }
	    return [result, error];
	}
	exports.tryCatch = tryCatch;
	// TODO: Handle instances in unregister

	var Container = function (_stick_di_1$DIContain) {
	    _inherits(Container, _stick_di_1$DIContain);

	    function Container(info) {
	        _classCallCheck(this, Container);

	        var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, info));

	        _this.__instances = new Map();
	        return _this;
	    }

	    _createClass(Container, [{
	        key: 'hasInstance',
	        value: function hasInstance(key) {
	            return this.__instances.has(key);
	        }
	    }, {
	        key: 'hasHandler',
	        value: function hasHandler(name, parent, repository) {
	            var has = _get(Container.prototype.__proto__ || Object.getPrototypeOf(Container.prototype), 'hasHandler', this).call(this, name, parent);
	            return !has && repository ? repository_1.Repository.hasAny(name) : has;
	        }
	    }, {
	        key: 'get',
	        value: function get(key, targetKey) {
	            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee() {
	                var entry;
	                return regeneratorRuntime.wrap(function _callee$(_context) {
	                    while (1) {
	                        switch (_context.prev = _context.next) {
	                            case 0:
	                                if (!(key === null || key === undefined)) {
	                                    _context.next = 2;
	                                    break;
	                                }

	                                throw new stick_di_1.DIBadKeyError();

	                            case 2:
	                                if (!(key === stick_di_1.DIContainer || key == Container)) {
	                                    _context.next = 4;
	                                    break;
	                                }

	                                return _context.abrupt('return', this);

	                            case 4:
	                                if (!(key instanceof stick_di_1.Resolver)) {
	                                    _context.next = 6;
	                                    break;
	                                }

	                                return _context.abrupt('return', key.get(this));

	                            case 6:
	                                entry = this.entries.get(key);

	                                if (!(entry !== undefined)) {
	                                    _context.next = 9;
	                                    break;
	                                }

	                                return _context.abrupt('return', entry[0](this));

	                            case 9:
	                                if (!(this.parent && this.parent.hasHandler(key))) {
	                                    _context.next = 11;
	                                    break;
	                                }

	                                return _context.abrupt('return', this.parent.get(key, targetKey));

	                            case 11:
	                                entry = repository_1.Repository.any(key);

	                                if (!(entry != null)) {
	                                    _context.next = 15;
	                                    break;
	                                }

	                                this.register(entry);
	                                return _context.abrupt('return', this.entries.get(key)[0](this));

	                            case 15:
	                                if (!(typeof key === 'string')) {
	                                    _context.next = 17;
	                                    break;
	                                }

	                                throw new errors_1.StickDependencyError('no component registered for key: ' + key);

	                            case 17:
	                                this.autoRegister(key, targetKey);
	                                entry = this.entries.get(key);
	                                return _context.abrupt('return', entry[0](this));

	                            case 20:
	                            case 'end':
	                                return _context.stop();
	                        }
	                    }
	                }, _callee, this);
	            }));
	        }
	    }, {
	        key: 'registerSingleton',
	        value: function registerSingleton(key, fn) {
	            var _this2 = this;

	            var targetKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

	            return this.registerHandler(key, function (x) {
	                if (_this2.__instances.has(key)) {
	                    return _this2.__instances.get(key);
	                } else {
	                    var singleton = _this2.invoke(fn, null, targetKey);
	                    if (utils.isPromise(singleton)) {
	                        return singleton.then(function (s) {
	                            _this2.__instances.set(key, s);
	                            return s;
	                        });
	                    }
	                    _this2.__instances.set(key, singleton);
	                    return singleton;
	                }
	            });
	        }
	    }, {
	        key: 'registerService',
	        value: function registerService(key, fn) {
	            var _this3 = this;

	            var targetKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

	            var name = void 0;
	            if (typeof key === 'string') {
	                name = key;
	            } else {
	                name = key.name;
	            }
	            var configKey = name + 'Provider';
	            var Config = stick_di_1.Metadata.getOwn(internal_1.DIServiceConfig, fn, targetKey);
	            if (Config != null) {
	                if (this.hasHandler(configKey, false, false)) {
	                    throw new Error('Provider for \'' + name + '\' already defined');
	                }
	                var config = new Config();
	                this.registerInstance(configKey, config);
	            }
	            return this.registerHandler(key, function (x) {
	                if (_this3.__instances.has(key)) {
	                    return _this3.__instances.get(key);
	                } else {
	                    var singleton = _this3.invoke(fn, null, targetKey);
	                    _this3.__instances.set(key, singleton);
	                    _this3.unregister(configKey);
	                    return singleton;
	                }
	            });
	        }
	    }, {
	        key: 'registerInstance',
	        value: function registerInstance(key, instance) {
	            var track = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	            _get(Container.prototype.__proto__ || Object.getPrototypeOf(Container.prototype), 'registerInstance', this).call(this, key, instance);
	            if (track) {
	                this.__instances.set(key, instance);
	            }
	        }
	    }, {
	        key: 'invoke',
	        value: function invoke(fn, deps, targetKey) {
	            var info = this._getOrCreateConstructionSet(fn, targetKey);
	            try {
	                var keys, args;
	                if (info.dependencyResolver) {
	                    args = info.dependencyResolver.resolveDependencies(fn);
	                } else {
	                    args = this.resolveDependencies(fn, targetKey);
	                }
	                if (deps !== undefined && Array.isArray(deps)) {
	                    args = args.concat(deps);
	                }
	                return utils.arrayToPromise(args).then(function (args) {
	                    return info.activator.invoke(fn, args, targetKey, keys);
	                });
	            } catch (e) {
	                var activatingText = info.activator instanceof stick_di_1.ClassActivator ? 'instantiating' : 'invoking';
	                var message = 'Error ' + activatingText + ' ' + fn.name + '.';
	                message += ' Check the inner error for details.';
	                throw new errors_1.StickDependencyError(message, [e]);
	            }
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            var keys = this.__instances.keys();
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var key = _step.value;

	                    this.destroy(key);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	            var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	            if (key == null) {
	                var _iteratorNormalCompletion2 = true;
	                var _didIteratorError2 = false;
	                var _iteratorError2 = undefined;

	                try {
	                    for (var _iterator2 = this.__instances.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                        var _key = _step2.value;

	                        this.destroy(_key, fn);
	                    }
	                } catch (err) {
	                    _didIteratorError2 = true;
	                    _iteratorError2 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                            _iterator2.return();
	                        }
	                    } finally {
	                        if (_didIteratorError2) {
	                            throw _iteratorError2;
	                        }
	                    }
	                }

	                delete this.constructionInfo;
	                this.constructionInfo = new Map();
	                //this.entries
	                return;
	            }
	            var instance = this.__instances.get(key);
	            if (instance) {
	                if (fn) {
	                    fn(instance);
	                } else if (typeof instance.$destroy === 'function') {
	                    instance.$destroy();
	                }
	                this.__instances.delete(key);
	                instance = void 0;
	            } else {
	                console.log('could not find key ', key);
	            }
	        }
	    }, {
	        key: 'register',
	        value: function register(item) {
	            switch (item.type) {
	                case internal_1.DependencyType.Controller:
	                    var factory = new controller_factory_1.ControllerFactory(item.name, item.handler, this.createChild());
	                    this.registerInstance(item.name, factory, true);
	                    break;
	                case internal_1.DependencyType.Service:
	                    this.registerService(item.name, item.handler);
	                    break;
	                case internal_1.DependencyType.Factory:
	                    if (typeof item.handler === 'function') {
	                        internal_1.setActivator(item.handler, stick_di_1.FactoryActivator.instance);
	                        this.registerSingleton(item.name, item.handler);
	                    } else {
	                        this.registerInstance(item.name, item.handler);
	                    }
	                    break;
	            }
	        }
	    }, {
	        key: 'createChild',
	        value: function createChild() {
	            var child = new Container();
	            child.parent = this;
	            return child;
	        }
	    }]);

	    return Container;
	}(stick_di_1.DIContainer);

	exports.Container = Container;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var orange_1 = __webpack_require__(6);
	var index_1 = __webpack_require__(26);
	var eventsjs_1 = __webpack_require__(5);

	var BaseComponent = function (_eventsjs_1$EventEmit) {
	    _inherits(BaseComponent, _eventsjs_1$EventEmit);

	    function BaseComponent(section, vvnode, attributes, view) {
	        _classCallCheck(this, BaseComponent);

	        var _this = _possibleConstructorReturn(this, (BaseComponent.__proto__ || Object.getPrototypeOf(BaseComponent)).call(this));

	        if (_this.update) {
	            _this.update = orange_1.bind(_this.update, _this);
	        }
	        _this.section = section;
	        _this.vnode = vvnode;
	        _this.attributes = attributes;
	        _this.view = view;
	        _this.document = view.template.options.document;
	        if (vvnode.childNodes) _this.childTemplate = index_1.template(index_1.fragment(vvnode.childNodes), view.template.options);
	        for (var key in attributes) {
	            _this.setAttribute(key, attributes[key]);
	        }var container = _this.view.container;
	        return _this;
	    }

	    _createClass(BaseComponent, [{
	        key: 'initialize',
	        value: function initialize() {
	            return Promise.resolve();
	        }
	    }, {
	        key: 'setAttribute',
	        value: function setAttribute(key, value) {
	            this.attributes[key] = value;
	        }
	    }, {
	        key: 'removeAttribute',
	        value: function removeAttribute(key) {
	            this.attributes[key] = void 0;
	        }
	    }, {
	        key: 'getAttribute',
	        value: function getAttribute(key) {
	            return this.attributes[key];
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            var a = this;
	            if (typeof a.onDestroy === 'function') {
	                a.onDestroy();
	            } else if (typeof a.ondestroy === 'function') {
	                a.ondestroy();
	            }
	        }
	    }]);

	    return BaseComponent;
	}(eventsjs_1.EventEmitter);

	exports.BaseComponent = BaseComponent;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var stick_1 = __webpack_require__(41);
	var template_view_1 = __webpack_require__(45);
	var templ = __webpack_require__(23);
	var orange_1 = __webpack_require__(6);
	function templateResolver(name) {
	    var template = document.getElementById(name);
	    if (template == null) return orange_1.Promise.reject(new Error('template with id: \'' + name + '\' not found'));
	    return orange_1.Promise.resolve(template.innerHTML);
	}
	exports.templateResolver = templateResolver;
	stick_1.factory('$templateResolver', function () {
	    return templateResolver;
	});
	stick_1.factory('$templateCreator', ['$templateResolver', '$container', function (resolver, container) {
	    return function (templateString, data) {
	        var template = templ.compile(templateString, {
	            viewClass: template_view_1.TemplateView
	        });
	        return template.render(data, {
	            container: container
	        });
	    };
	}]);

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var view_1 = __webpack_require__(46);
	var collection_1 = __webpack_require__(40);
	var orange_1 = __webpack_require__(6);
	var debug = __webpack_require__(15)('stick:template:view');

	var TemplateView = function (_view_1$View) {
	    _inherits(TemplateView, _view_1$View);

	    function TemplateView(section, template, context, options) {
	        _classCallCheck(this, TemplateView);

	        var _this = _possibleConstructorReturn(this, (TemplateView.__proto__ || Object.getPrototypeOf(TemplateView)).call(this, section, template, null, options));

	        _this._onModelChange = orange_1.bind(_this._onModelChange, _this);
	        _this.context = context;
	        if (options.delegator) {
	            _this._delegator = options.delegator;
	        }
	        if (options.container) {
	            _this._container = options.container;
	        }
	        _this._target = options.target;
	        _this._id = orange_1.uniqueId("templ");
	        if (!_this.container) throw new Error("template view: no container set");
	        debug("%s: Template view created with state %s", _this.id, _this.context.uid);
	        return _this;
	    }

	    _createClass(TemplateView, [{
	        key: 'setTarget',
	        value: function setTarget(target) {
	            this._target = target;
	        }
	    }, {
	        key: '_onModelChange',
	        value: function _onModelChange(model) {
	            if (this.context == undefined) {
	                console.log('context is undefined', model, this);
	                return;
	            }
	            var changed = this.context.changed;
	            //for (let k in changed) {
	            //    this.set(k, changed[k])
	            //}
	            this.updateLater();
	        }
	    }, {
	        key: 'set',
	        value: function set(key, val) {
	            var silent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	            if (!silent) {
	                if (!(this.context instanceof collection_1.Model)) {
	                    debug('set value for %s on object', key);
	                    _get(TemplateView.prototype.__proto__ || Object.getPrototypeOf(TemplateView.prototype), 'set', this).call(this, key, val);
	                    return this.updateLater();
	                }
	                if (!Array.isArray(key)) key = key.split(/[,.]/);
	                if (key[0] === 'this') {
	                    key.shift();
	                    if (key.length === 0) {
	                        this.root.context = val;
	                        this.root.update();
	                    } else {
	                        this.root.set(key, val);
	                        this.root.update();
	                    }
	                    return;
	                } else if (key[0] === 'root') {
	                    key.shift();
	                    this.root.set(key, val);
	                } else {
	                    debug('set value for %s on model', key);
	                    this.context.set(key.join('.'), val);
	                }
	            }
	            this.updateLater();
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            debug("%s: Render", this.id);
	            return _get(TemplateView.prototype.__proto__ || Object.getPrototypeOf(TemplateView.prototype), 'render', this).call(this);
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            debug("%s: Update", this.id);
	            /*nextTick(() => {
	                super.update();
	            });*/
	            return _get(TemplateView.prototype.__proto__ || Object.getPrototypeOf(TemplateView.prototype), 'update', this).call(this);
	        }
	    }, {
	        key: 'get',
	        value: function get(key) {
	            debug("%s: Get value for key: %j", this.id, key, this.context);
	            if (!Array.isArray(key)) key = key.split(/[,.]/);
	            var value = void 0,
	                context = this.context;
	            if (key[0] === '$root') {
	                key.shift();
	                context = this.root.context;
	            }
	            key = key.join('.');
	            if (!value) {
	                if (!(this.context instanceof collection_1.Model)) {
	                    value = _get(TemplateView.prototype.__proto__ || Object.getPrototypeOf(TemplateView.prototype), 'get', this).call(this, key);
	                } else {
	                    value = context.get(key);
	                }
	                if (value == null && this.target != null) {
	                    value = this.target[key];
	                    if (typeof value === 'function') {
	                        value = orange_1.bind(value, this.target);
	                    }
	                }
	            }
	            debug("%s: Got value for key '%s': ", this.id, key, value);
	            return value;
	        }
	    }, {
	        key: 'remove',
	        value: function remove() {
	            if (this._context && this._context instanceof collection_1.Model) {
	                this._context.off('change', this._onModelChange);
	            }
	            debug("%s: Remove", this.id);
	            _get(TemplateView.prototype.__proto__ || Object.getPrototypeOf(TemplateView.prototype), 'remove', this).call(this);
	        }
	    }, {
	        key: '$destroy',
	        value: function $destroy() {
	            debug("%s: Destroy", this.id);
	            this.remove();
	            _get(TemplateView.prototype.__proto__ || Object.getPrototypeOf(TemplateView.prototype), 'destroy', this).call(this);
	            //delete this._container;
	            //delete this._delegator;
	            //this.context = null;
	        }
	    }, {
	        key: 'id',
	        get: function get() {
	            return this._id;
	        }
	    }, {
	        key: 'parent',
	        get: function get() {
	            return this._parent;
	        },
	        set: function set(parent) {
	            this._parent = parent;
	        }
	    }, {
	        key: 'container',
	        get: function get() {
	            if (this._container) return this._container;
	            return this.parent ? this.parent.container : undefined;
	        }
	    }, {
	        key: 'context',
	        set: function set(context) {
	            if (this._context && this._context instanceof collection_1.Model) {
	                this._context.off('change', this._onModelChange);
	            }
	            this._context = context;
	            if (context != null && context instanceof collection_1.Model) {
	                context.on('change', this._onModelChange, this);
	            }
	            this.updateLater();
	        },
	        get: function get() {
	            return this._context;
	        }
	    }, {
	        key: 'target',
	        get: function get() {
	            if (!!this._target) return this._target;
	            return this.parent ? this.parent.target : undefined;
	        }
	    }]);

	    return TemplateView;
	}(view_1.View);

	exports.TemplateView = TemplateView;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var vnode = __webpack_require__(26);
	var action_1 = __webpack_require__(47);
	//import {RunLoop} from './runloop';
	var Debug = __webpack_require__(15);
	var debug = Debug('templ:view');
	function _set(target, keypath, value) {
	    var keys = typeof keypath === "string" ? keypath.split(".") : keypath;
	    var ct = target;
	    var key;
	    for (var i = 0, n = keys.length - 1; i < n; i++) {
	        key = keys[i];
	        if (!ct[key]) {
	            ct[key] = {};
	        }
	        ct = ct[key];
	    }
	    ct[keys[keys.length - 1]] = value;
	    return value;
	}

	var View = function (_vnode$View) {
	    _inherits(View, _vnode$View);

	    function View(section, template, context) {
	        var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	        _classCallCheck(this, View);

	        var _this = _possibleConstructorReturn(this, _vnode$View.call(this, section, template, context, options));

	        _this.context = context;
	        _this._callers = {};
	        _this._getters = {};
	        if (options.parent) {
	            _this.parent = options.parent;
	        }
	        if (options.delegator) {
	            _this._delegator = options.delegator;
	        }
	        //this._runloop = options.runloop;
	        return _this;
	    }

	    View.prototype.getDelegator = function getDelegator() {
	        if (this._delegator) return this._delegator;
	        var parent = this.parent;
	        while (parent != undefined) {
	            if (parent._delegator) return parent._delegator;
	            parent = parent.parent;
	        }
	        return null;
	    };

	    View.prototype.addListener = function addListener(elm, eventName, callback) {
	        var capture = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	        var delegator = this.getDelegator();
	        if (delegator) {
	            return delegator.addListener(elm, eventName, callback, capture);
	        } else if (typeof callback === 'function') {
	            return _vnode$View.prototype.addListener.call(this, elm, eventName, callback, capture);
	        }
	    };

	    View.prototype.removeListener = function removeListener(elm, eventName, callback) {
	        var capture = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	        var delegator = this.getDelegator();
	        if (delegator) {
	            delegator.removeListener(elm, eventName, callback, capture);
	        } else if (typeof callback === 'function') {
	            _vnode$View.prototype.removeListener.call(this, elm, eventName, callback, capture);
	        }
	    };

	    View.prototype.get = function get(keypath) {
	        if (!this.context) return void 0;
	        var pt = typeof keypath !== "string" ? keypath.join(".") : keypath;
	        var v;
	        try {
	            var getter;
	            if (!(getter = this._getters[pt])) {
	                getter = this._getters[pt] = new Function("return this." + pt);
	            }
	            v = getter.call(this.context);
	        } catch (e) {
	            v = void 0;
	        }
	        v = v != void 0 ? v : this.parent ? this.parent.get(keypath) : void 0;
	        debug('get value "%s": %s', keypath, v);
	        return v;
	    };

	    View.prototype.set = function set(path, value) {
	        debug('set value %s on context %j', value, this.context);
	        if (!this.context) return void 0;
	        if (typeof path === "string") path = path.split(".");
	        var ret = _set(this.context, path, value);
	        this.updateLater();
	    };

	    View.prototype.render = function render() {
	        var _this2 = this;

	        //;
	        //var section = super.render()
	        //this.transitions.enter();
	        return _vnode$View.prototype.render.call(this).then(function (section) {
	            return _this2.update();
	        }).then(function () {
	            return _this2.section.render();
	        });
	    };

	    View.prototype.updateLater = function updateLater() {
	        this._runloop.deferOnce(this);
	    };

	    View.prototype.ref = function ref(path, gettable, settable) {
	        debug('reference %s, gettable: %o, settabble: %o', path, gettable, settable);
	        return new action_1.Reference(this, path, gettable, settable);
	    };

	    View.prototype.assign = function assign(path, value) {
	        debug('assignment %s %s', path, value);
	        return new action_1.Assignment(this, path, value);
	    };

	    View.prototype.call = function call(keypath, params) {
	        var caller;
	        var v;
	        debug('call keypath "%s", args: "%o"', keypath, params);
	        if (typeof keypath !== "string") keypath = keypath.join(".");
	        if (!(caller = this._callers[keypath])) {
	            var ctxPath = ["this"].concat(keypath.split("."));
	            ctxPath.pop();
	            caller = this._callers[keypath] = new Function("params", "return this." + keypath + ".apply(" + ctxPath.join(".") + ", params);");
	        }
	        /*try {
	            v = caller.call(this.context, params);
	        } catch (e) {
	            console.error('could not call', e)
	        }
	         return v != void 0 ? v : this.parent ? this.parent.call(keypath, params) : void 0;*/
	        return new action_1.Call(this, keypath, params);
	    };

	    _createClass(View, [{
	        key: 'root',
	        get: function get() {
	            if (this.parent == null) return this;
	            var root = this,
	                tmp = root;
	            while (tmp) {
	                tmp = tmp.parent;
	                if (tmp) root = tmp;
	            }
	            return root;
	        }
	    }]);

	    return View;
	}(vnode.View);

	exports.View = View;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var orange_1 = __webpack_require__(6);

	var Reference = function () {
	    function Reference(view, path, gettable, settable) {
	        _classCallCheck(this, Reference);

	        this.gettable = gettable;
	        this.settable = settable;
	        this.view = view;
	        this.path = path;
	    }

	    Reference.prototype.value = function value(_value) {
	        if (arguments.length === 0) {
	            return this.gettable ? this.view.get(this.path) : void 0;
	        }
	        if (this.settable) this.view.set(this.path, _value);
	    };

	    Reference.prototype.toString = function toString() {
	        return this.view.get(this.path) || '';
	    };

	    _createClass(Reference, [{
	        key: "__classType",
	        get: function get() {
	            return "Reference";
	        }
	    }]);

	    return Reference;
	}();

	exports.Reference = Reference;

	var Assignment = function () {
	    function Assignment(view, path, value) {
	        _classCallCheck(this, Assignment);

	        this.view = view;
	        this.path = path;
	        this.value = value;
	        this.assign = orange_1.bind(this.assign, this);
	        this.toString = orange_1.bind(this.toString, this);
	    }

	    Assignment.prototype.assign = function assign() {
	        this.view.set(this.path, this.value.call(this));
	    };

	    Assignment.prototype.toString = function toString() {
	        var val = this.value.call(this);
	        return val ? String(val) : '';
	    };

	    _createClass(Assignment, [{
	        key: "__classType",
	        get: function get() {
	            return "Assignment";
	        }
	    }]);

	    return Assignment;
	}();

	exports.Assignment = Assignment;

	var Call = function () {
	    function Call(view, keypath, params) {
	        _classCallCheck(this, Call);

	        this.view = view;
	        this.keypath = keypath;
	        this.params = params || [];
	    }

	    Call.prototype.call = function call() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        args = args || [];
	        var fn = this.view.get(this.keypath);
	        if (fn == null || typeof fn !== 'function') {
	            //throw new Error("not exists or not function");
	            return this.view.trigger('error', this, new Error("function does not exists or is not a function"));
	        }
	        return fn.apply(this.view, this.params.concat(args));
	    };

	    Call.prototype.toString = function toString() {
	        var val = this.call();
	        return val ? String(val) : '';
	    };

	    _createClass(Call, [{
	        key: "__classType",
	        get: function get() {
	            return "Call";
	        }
	    }]);

	    return Call;
	}();

	exports.Call = Call;
	function isCall(a) {
	    return a && (a instanceof Call || a.__classType === 'Call');
	}
	exports.isCall = isCall;
	function isReference(a) {
	    return a && (a instanceof Reference || a.__classType === 'Reference');
	}
	exports.isReference = isReference;
	function isAssignment(a) {
	    return a && (a instanceof Assignment || a.__classType === 'Assignment');
	}
	exports.isAssignment = isAssignment;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var decorators_1 = __webpack_require__(7);
	var request = __webpack_require__(49);
	var HttpService = function () {
	    function HttpService() {
	        _classCallCheck(this, HttpService);
	    }

	    _createClass(HttpService, [{
	        key: "get",
	        value: function get(url) {
	            return request.get(url);
	        }
	    }, {
	        key: "post",
	        value: function post(url) {
	            return request.post(url);
	        }
	    }, {
	        key: "put",
	        value: function put(url) {
	            return request.put(url);
	        }
	    }, {
	        key: "del",
	        value: function del(url) {
	            return request.del(url);
	        }
	    }]);

	    return HttpService;
	}();
	HttpService = __decorate([decorators_1.service('$http')], HttpService);
	exports.HttpService = HttpService;

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_49__;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var decorators_1 = __webpack_require__(7);
	var eventsjs_1 = __webpack_require__(5);
	var Mediator = function () {
	    function Mediator() {
	        _classCallCheck(this, Mediator);

	        this.emitter = new eventsjs_1.EventEmitter();
	    }

	    _createClass(Mediator, [{
	        key: "publish",
	        value: function publish(event) {
	            var _emitter;

	            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                args[_key - 1] = arguments[_key];
	            }

	            (_emitter = this.emitter).trigger.apply(_emitter, [event].concat(args));
	        }
	    }, {
	        key: "subscribe",
	        value: function subscribe(event, handler, ctx) {
	            this.emitter.on(event, handler, ctx);
	        }
	    }, {
	        key: "unsubscribe",
	        value: function unsubscribe(event, handler) {
	            this.emitter.off(event, handler);
	        }
	    }]);

	    return Mediator;
	}();
	Mediator = __decorate([decorators_1.service('$mediator')], Mediator);
	exports.Mediator = Mediator;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	var stick_1 = __webpack_require__(41);
	__export(__webpack_require__(45));
	__webpack_require__(52);
	var index_1 = __webpack_require__(56);
	stick_1.component('hide', index_1.Hide);
	stick_1.component('show', index_1.Show);
	stick_1.component('unsafe', index_1.Unsafe);
	stick_1.component('delegate', index_1.Delegate);
	__export(__webpack_require__(43));
	__export(__webpack_require__(54));
	var action_1 = __webpack_require__(47);
	exports.Reference = action_1.Reference;
	exports.Assignment = action_1.Assignment;
	exports.Call = action_1.Call;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(53));

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var base_attribute_1 = __webpack_require__(54);
	var decorators = __webpack_require__(7);
	var action_1 = __webpack_require__(47);
	var utils = __webpack_require__(6);
	var _events = ['change', 'keyup', 'input'];
	var debug = __webpack_require__(15)('stick:template:attribute:value');
	var ValueAttribute = function (_base_attribute_1$Bas) {
	    _inherits(ValueAttribute, _base_attribute_1$Bas);

	    function ValueAttribute() {
	        _classCallCheck(this, ValueAttribute);

	        return _possibleConstructorReturn(this, (ValueAttribute.__proto__ || Object.getPrototypeOf(ValueAttribute)).apply(this, arguments));
	    }

	    _createClass(ValueAttribute, [{
	        key: "initialize",
	        value: function initialize() {
	            this._onInput = utils.bind(this._onInput, this, null);
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = _events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var e = _step.value;

	                    this.ref.addEventListener(e, this._onInput);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }, {
	        key: "update",
	        value: function update() {
	            var model = this.model = this.value;
	            if (!model) return Promise.resolve();
	            if (!model || !(model instanceof action_1.Reference)) {
	                throw Promise.reject(new Error("input value must be a reference. Make sure you have <~> defined"));
	            }
	            if (model.gettable) {
	                this._elementValue(this._parseValue(model.value()));
	            }
	            return Promise.resolve();
	        }
	    }, {
	        key: "_parseValue",
	        value: function _parseValue(value) {
	            if (value == null || value === "") return void 0;
	            return value;
	        }
	    }, {
	        key: "_onInput",
	        value: function _onInput(event) {
	            clearInterval(this._autocompleteCheckInterval);
	            // ignore some keys
	            if (event && (!event.keyCode || !~[27].indexOf(event.keyCode))) {
	                event.stopPropagation();
	            }
	            var value = this._parseValue(this._elementValue());
	            if (!this.model) return;
	            if (utils.equal(this.model.value(), value)) {
	                debug('input: no change');
	                return;
	            }
	            debug('input changed %s', this.model.value(), value);
	            this.model.value(value);
	        }
	    }, {
	        key: "_elementValue",
	        value: function _elementValue(value) {
	            var node = this.ref;
	            var isCheckbox = /checkbox/.test(node.type);
	            var isRadio = /radio/.test(node.type);
	            var isRadioOrCheckbox = isCheckbox || isRadio;
	            var hasValue = Object.prototype.hasOwnProperty.call(node, "value");
	            var isInput = hasValue || /input|textarea|checkbox/.test(node.nodeName.toLowerCase());
	            var isSelect = /select/i.test(node.nodeName);
	            if (!arguments.length) {
	                if (isCheckbox) {
	                    return Boolean(node.checked);
	                } else if (isInput || isSelect) {
	                    return node.value || "";
	                } else {
	                    return node.innerHTML || "";
	                }
	            }
	            if (value == null) {
	                value = "";
	            } else {
	                clearInterval(this._autocompleteCheckInterval);
	            }
	            if (isRadioOrCheckbox) {
	                if (isRadio) {
	                    if (String(value) === String(node.value)) {
	                        node.checked = true;
	                    }
	                } else {
	                    node.checked = value;
	                }
	            } else if (!utils.equal(this._elementValue(), value)) {
	                if (isInput || isSelect) {
	                    node.value = value;
	                } else {
	                    node.innerHTML = value;
	                }
	            }
	        }
	    }]);

	    return ValueAttribute;
	}(base_attribute_1.BaseAttribute);
	ValueAttribute = __decorate([decorators.attribute('value')], ValueAttribute);
	exports.ValueAttribute = ValueAttribute;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var base = __webpack_require__(55);

	var BaseAttribute = function (_base$BaseAttribute) {
	  _inherits(BaseAttribute, _base$BaseAttribute);

	  function BaseAttribute() {
	    _classCallCheck(this, BaseAttribute);

	    return _possibleConstructorReturn(this, (BaseAttribute.__proto__ || Object.getPrototypeOf(BaseAttribute)).apply(this, arguments));
	  }

	  return BaseAttribute;
	}(base.BaseAttribute);

	exports.BaseAttribute = BaseAttribute;

/***/ },
/* 55 */
/***/ function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BaseAttribute = function () {
	    function BaseAttribute(ref, key, value, view) {
	        _classCallCheck(this, BaseAttribute);

	        this.ref = ref;
	        this.key = key;
	        this.value = value;
	        this.view = view;
	        this.initialize();
	    }

	    BaseAttribute.prototype.initialize = function initialize() {};

	    BaseAttribute.prototype.update = function update() {
	        return Promise.resolve();
	    };

	    BaseAttribute.prototype.destroy = function destroy() {};

	    BaseAttribute.test = function test() {};

	    return BaseAttribute;
	}();

	exports.BaseAttribute = BaseAttribute;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(57));
	__export(__webpack_require__(58));
	__export(__webpack_require__(60));
	__export(__webpack_require__(61));
	__export(__webpack_require__(62));
	__export(__webpack_require__(63));

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) {
	            try {
	                step(generator.next(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function rejected(value) {
	            try {
	                step(generator.throw(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(result) {
	            result.done ? resolve(result.value) : new P(function (resolve) {
	                resolve(result.value);
	            }).then(fulfilled, rejected);
	        }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	var orange_1 = __webpack_require__(6);
	var base_component_1 = __webpack_require__(43);
	var controller_factory_1 = __webpack_require__(24);
	var decorators_1 = __webpack_require__(7);
	var Controller = function (_base_component_1$Bas) {
	    _inherits(Controller, _base_component_1$Bas);

	    function Controller() {
	        _classCallCheck(this, Controller);

	        return _possibleConstructorReturn(this, (Controller.__proto__ || Object.getPrototypeOf(Controller)).apply(this, arguments));
	    }

	    _createClass(Controller, [{
	        key: "initialize",
	        value: function initialize() {
	            return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
	                return regeneratorRuntime.wrap(function _callee$(_context) {
	                    while (1) {
	                        switch (_context.prev = _context.next) {
	                            case 0:
	                                if (this.attributes['name']) {
	                                    this.name = this.attributes['name'];
	                                    this.as = this.attributes['as'] || this.name;
	                                }

	                            case 1:
	                            case "end":
	                                return _context.stop();
	                        }
	                    }
	                }, _callee, this);
	            }));
	        }
	    }, {
	        key: "update",
	        value: function update() {
	            return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee2() {
	                var view, template, state, s, controller, el;
	                return regeneratorRuntime.wrap(function _callee2$(_context2) {
	                    while (1) {
	                        switch (_context2.prev = _context2.next) {
	                            case 0:
	                                if (!this.factory) {
	                                    _context2.next = 7;
	                                    break;
	                                }

	                                if (!this.factory.container.hasHandler('template')) {
	                                    _context2.next = 6;
	                                    break;
	                                }

	                                _context2.next = 4;
	                                return this.factory.container.get('template');

	                            case 4:
	                                view = _context2.sent;

	                                view.update();

	                            case 6:
	                                return _context2.abrupt("return");

	                            case 7:
	                                if (!this.resolving) {
	                                    _context2.next = 9;
	                                    break;
	                                }

	                                return _context2.abrupt("return");

	                            case 9:
	                                this.resolving = true;
	                                _context2.next = 12;
	                                return this.view.container.get(this.name);

	                            case 12:
	                                this.factory = _context2.sent;

	                                if (this.factory instanceof controller_factory_1.ControllerFactory) {
	                                    _context2.next = 15;
	                                    break;
	                                }

	                                throw new Error(this.name + ' is not a controller');

	                            case 15:
	                                template = this.childTemplate;

	                                if (this.attributes['template']) {
	                                    template = this.attributes['template'];
	                                }
	                                state = {};

	                                if (this.attributes['state']) {
	                                    s = this.attributes['state'];

	                                    try {
	                                        state = orange_1.isString(s) ? JSON.parse(s) : Object(s);
	                                    } catch (e) {
	                                        console.warn('Could not parse model tag');
	                                    }
	                                }
	                                _context2.next = 21;
	                                return this.factory.create({
	                                    template: template,
	                                    contextName: this.as,
	                                    parentView: this.view,
	                                    state: state
	                                });

	                            case 21:
	                                controller = _context2.sent;
	                                _context2.next = 24;
	                                return this.factory.container.get('$el');

	                            case 24:
	                                el = _context2.sent;

	                                this.section.appendChild(el);
	                                this.resolving = false;

	                            case 27:
	                            case "end":
	                                return _context2.stop();
	                        }
	                    }
	                }, _callee2, this);
	            }));
	        }
	    }, {
	        key: "destroy",
	        value: function destroy() {
	            if (this.factory) {
	                this.factory.destroy();
	                this.factory = void 0;
	            }
	            _get(Controller.prototype.__proto__ || Object.getPrototypeOf(Controller.prototype), "destroy", this).call(this);
	        }
	    }]);

	    return Controller;
	}(base_component_1.BaseComponent);
	Controller = __decorate([decorators_1.component('controller')], Controller);
	exports.Controller = Controller;
	//decorators.component('controller')(Controller)

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var action_1 = __webpack_require__(47);
	var orange_1 = __webpack_require__(6);
	var orange_dom_1 = __webpack_require__(59);
	var base_component_1 = __webpack_require__(43);

	var Delegate = function (_base_component_1$Bas) {
	    _inherits(Delegate, _base_component_1$Bas);

	    function Delegate() {
	        _classCallCheck(this, Delegate);

	        return _possibleConstructorReturn(this, (Delegate.__proto__ || Object.getPrototypeOf(Delegate)).apply(this, arguments));
	    }

	    _createClass(Delegate, [{
	        key: 'initialize',
	        value: function initialize() {
	            var _this2 = this;

	            this._onEvent = orange_1.bind(this._onEvent, this);
	            return this.childTemplate.render(this.view.context, {
	                parent: this.view
	            }).then(function (view) {
	                _this2.subview = view;
	                return _this2.subview.render();
	            }).then(function (el) {
	                _this2.el = _this2.document.createElement('div');
	                _this2.el.appendChild(el);
	                _this2.section.appendChild(_this2.el);
	                var event = _this2.attributes['event'] || 'click';
	                orange_dom_1.delegate(_this2.el, _this2.attributes['selector'], 'click', _this2._onEvent);
	            });
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            return Promise.resolve();
	        }
	    }, {
	        key: '_onEvent',
	        value: function _onEvent(e) {
	            var self = this;
	            var fn = this.attributes['click'];
	            //let fn;
	            if (action_1.isAssignment(fn)) {
	                fn = fn.assign;
	            }
	            if (typeof fn !== 'function') {
	                throw new Error('[event] value is not a function');
	            }
	            fn(e);
	        }
	    }, {
	        key: 'onDestroy',
	        value: function onDestroy() {
	            orange_dom_1.undelegate(this.el, this.attributes['selector'], 'click', this._onEvent);
	            if (this.subview) this.subview.$destroy();
	        }
	    }]);

	    return Delegate;
	}(base_component_1.BaseComponent);

	exports.Delegate = Delegate;

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_59__;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var decorators = __webpack_require__(7);
	var collection_1 = __webpack_require__(40);
	var base_component_1 = __webpack_require__(43);
	var template_view_1 = __webpack_require__(45);
	var action_1 = __webpack_require__(47);
	function iterate(list, fn) {
	    if (list instanceof collection_1.Collection) {
	        list = list.models;
	    } else if (list instanceof template_view_1.TemplateView) {
	        return Promise.resolve();
	    }
	    return new Promise(function (resolve, reject) {
	        var promises = [];
	        for (var i = 0, ii = list.length; i < ii; i++) {
	            promises.push(fn(list[i], i));
	        }
	        Promise.all(promises).then(resolve).catch(reject);
	    });
	}
	var Repeat = function (_base_component_1$Bas) {
	    _inherits(Repeat, _base_component_1$Bas);

	    function Repeat() {
	        _classCallCheck(this, Repeat);

	        return _possibleConstructorReturn(this, (Repeat.__proto__ || Object.getPrototypeOf(Repeat)).apply(this, arguments));
	    }

	    _createClass(Repeat, [{
	        key: "initialize",
	        value: function initialize() {
	            this._children = [];
	            this._collection = [];
	            return this.childTemplate.render(this.view.context, {
	                parent: this.view
	            }).then(function (v) {});
	        }
	    }, {
	        key: "update",
	        value: function update() {
	            var _this2 = this;

	            var as = this['as'];
	            var each = this['each'];
	            var key = this['key'] || "key";
	            var n = 0;
	            var self = this;
	            var parent = this.view;
	            if (each === this._collection || each == null) {
	                return Promise.resolve();
	            }
	            if (action_1.isCall(each)) {
	                each = each.call();
	            }
	            if (this._collection && this._collection instanceof collection_1.Collection) {
	                this.__removeEventListeners(this._collection);
	            }
	            this._collection = each;
	            return this._update().then(function () {
	                if (each instanceof collection_1.Collection) {
	                    _this2.__addEventListeners(each);
	                }
	            });
	        }
	    }, {
	        key: "_update",
	        value: function _update() {
	            var _this3 = this;

	            var properties;
	            var as = this['as'];
	            var parent = this.view;
	            var i = 0;
	            var filter = this['filter'] || function (a) {
	                return true;
	            };
	            return iterate(this._collection, function (m, n) {
	                if (!filter(m)) {
	                    return Promise.resolve();
	                }
	                var child;
	                if (as) {
	                    var _ref;

	                    properties = new collection_1.NestedModel((_ref = {}, _defineProperty(_ref, as, m), _defineProperty(_ref, "self", _this3.view.context), _ref));
	                } else {
	                    properties = m;
	                }
	                //if (properties instanceof Model)
	                // TODO - provide SAME context here for speed and stability
	                if (n >= _this3._children.length) {
	                    /*child = await this.childTemplate.view(properties, {
	                      parent: parent
	                    });*/
	                    return _this3.childTemplate.view(properties, {
	                        parent: parent
	                    }).then(function (child) {
	                        _this3._children.push(child);
	                        _this3.section.appendChild(child.section.render());
	                        i++;
	                        return child.render().then(function (e) {});
	                    });
	                } else {
	                    child = _this3._children[n];
	                    child.context = properties;
	                    child.update();
	                    i++;
	                    return Promise.resolve();
	                }
	            }).then(function () {
	                _this3._children.splice(i).forEach(function (child) {
	                    child.$destroy();
	                });
	            });
	        }
	    }, {
	        key: "_update2",
	        value: function _update2() {
	            var properties;
	            var as = this['as'];
	            var parent = this.view;
	            var n = 0;
	            var self = this;
	            var filter = this['filter'] || function (a) {
	                return true;
	            };
	            this._collection.forEach(function (m) {
	                if (!filter(m)) {
	                    return;
	                }
	                var child;
	                if (as) {
	                    var _ref2;

	                    properties = new collection_1.NestedModel((_ref2 = {}, _defineProperty(_ref2, as, m), _defineProperty(_ref2, "self", this.view.context), _ref2));
	                } else {
	                    properties = m;
	                }
	                //if (properties instanceof Model)
	                // TODO - provide SAME context here for speed and stability
	                if (n >= this._children.length) {
	                    child = this.childTemplate.view(properties, {
	                        parent: parent
	                    });
	                    this._children.push(child);
	                    this.section.appendChild(child.render(properties));
	                } else {
	                    child = this._children[n];
	                    child.context = properties;
	                    child.update();
	                }
	                n++;
	            }, this);
	            this._children.splice(n).forEach(function (child) {
	                child.$destroy();
	            });
	        }
	    }, {
	        key: "__addEventListeners",
	        value: function __addEventListeners(collection) {
	            collection.on('add', this._update, this);
	            collection.on('remove', this._update, this);
	            collection.on('reset', this._update, this);
	            collection.on('filter', this._update, this);
	        }
	    }, {
	        key: "__removeEventListeners",
	        value: function __removeEventListeners(collection) {
	            collection.off('remove', this._update);
	            collection.off('add', this._update);
	            collection.off('reset', this._update);
	            collection.off('filter', this._update);
	        }
	    }, {
	        key: "setAttribute",
	        value: function setAttribute(key, value) {
	            this[key] = value;
	        }
	    }, {
	        key: "onDestroy",
	        value: function onDestroy() {
	            if (this._collection && typeof this._collection.destroy === 'function') {
	                this._collection.destroy();
	            }
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this._children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var child = _step.value;

	                    child.$destroy();
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }]);

	    return Repeat;
	}(base_component_1.BaseComponent);
	Repeat = __decorate([decorators.component("repeat")], Repeat);
	exports.Repeat = Repeat;
	/*export const Repeat: ComponentDefinition = {

	  initialize() {
	    this._children = []
	    this._collection = [];

	  },

	  update() {

	    var as = this['as'];
	    var each = this['each'];
	    var key = this['key'] || "key";

	    var n = 0;
	    var self = this;
	    var parent = this.view;

	    if (each === this._collection || !each) {
	      return
	    }

	    if (this._collection && this._collection instanceof Collection) {
	      this.__removeEventListeners(this._collection)

	    }

	    this._collection = each

	    this._update()

	    if (each instanceof Collection) {
	      this.__addEventListeners(each)
	    }

	  },

	  _update() {

	    var properties;
	    var as = this['as'];
	    var parent = this.view
	    var n = 0

	    var self = this

	    var filter = this['filter'] || function(a) { return true }

	    this._collection.forEach(function(m: IModel) {

	      if (!filter(m)) { return; }

	      var child;

	      if (as) {
	        properties = new NestedModel({ [as]: m, self: this.view.context });
	      } else {
	        properties = m;
	      }

	      // TODO - provide SAME context here for speed and stability
	      if (n >= this._children.length) {

	        child = this.childTemplate.view(properties, {
	          parent: parent
	        });


	        this._children.push(child);

	        this.section.appendChild(child.render(properties));

	      } else {
	        child = this._children[n];
	        child.context = properties;
	        child.update();
	      }

	      n++;

	    }, this);

	    this._children.splice(n).forEach(function(child) {
	      (<any>child).$destroy();
	    });


	  },

	  __addEventListeners<T extends IModel>(collection: Collection<T>) {

	    collection.on('add', this._update, this);
	    collection.on('remove', this._update, this);
	    collection.on('reset', this._update, this);
	    collection.on('filter', this._update, this);
	  },

	  __removeEventListeners<T extends IModel>(collection: Collection<T>) {
	    collection.off('remove', this._update);
	    collection.off('add', this._update);
	    collection.off('reset', this._update);
	    collection.off('filter', this._update);
	  },

	  setAttribute(key: string, value: any) {
	    this[key] = value

	  },

	  setProperty() {
	    console.log(arguments)
	  },

	  onDestroy() {
	    if (this._collection && typeof this._collection.destroy === 'function') {
	      this._collection.destroy();
	    }

	    for (let child of this._children) {
	      child.$destroy();
	    }
	  }
	}*/

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var base_component_1 = __webpack_require__(43);

	var Show = function (_base_component_1$Bas) {
	    _inherits(Show, _base_component_1$Bas);

	    function Show() {
	        _classCallCheck(this, Show);

	        return _possibleConstructorReturn(this, (Show.__proto__ || Object.getPrototypeOf(Show)).apply(this, arguments));
	    }

	    _createClass(Show, [{
	        key: 'update',
	        value: function update() {
	            var _this2 = this;

	            var show = this.attributes['when'];
	            if (this._shown === show) {
	                if (this.subview) {
	                    this.subview.update();
	                }
	                return Promise.resolve();
	            }
	            this._shown = show;
	            if (show) {
	                if (!this.subview) {
	                    return this.childTemplate.render(this.view.context, {
	                        parent: this.view
	                    }).then(function (view) {
	                        _this2.subview = view;
	                        return _this2.subview.render();
	                    }).then(function (elm) {
	                        _this2.section.appendChild(elm);
	                    });
	                }
	            } else {
	                if (this.subview) {
	                    this.subview.$destroy();
	                }
	                this.subview = void 0;
	            }
	        }
	    }, {
	        key: 'onDestroy',
	        value: function onDestroy() {
	            if (this.subview) this.subview.$destroy();
	        }
	    }]);

	    return Show;
	}(base_component_1.BaseComponent);

	exports.Show = Show;

	var Hide = function (_base_component_1$Bas2) {
	    _inherits(Hide, _base_component_1$Bas2);

	    function Hide() {
	        _classCallCheck(this, Hide);

	        return _possibleConstructorReturn(this, (Hide.__proto__ || Object.getPrototypeOf(Hide)).apply(this, arguments));
	    }

	    _createClass(Hide, [{
	        key: 'update',
	        value: function update() {
	            var _this4 = this;

	            var hide = this.attributes['when'];
	            if (this._hide === hide) {
	                if (this.subview) {
	                    this.subview.update();
	                }
	                return Promise.resolve();
	            }
	            this._hide = hide;
	            if (!hide) {
	                if (!this.subview) {
	                    return this.childTemplate.render(this.view.context, {
	                        parent: this.view
	                    }).then(function (view) {
	                        _this4.subview = view;
	                        return _this4.subview.render();
	                    }).then(function (elm) {
	                        _this4.section.appendChild(elm);
	                    });
	                }
	            } else {
	                if (this.subview) {
	                    this.subview.$destroy();
	                }
	                this.subview = void 0;
	            }
	        }
	    }, {
	        key: 'onDestroy',
	        value: function onDestroy() {
	            if (this.subview) this.subview.$destroy();
	        }
	    }]);

	    return Hide;
	}(base_component_1.BaseComponent);

	exports.Hide = Hide;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var base_component_1 = __webpack_require__(43);

	var Unsafe = function (_base_component_1$Bas) {
	  _inherits(Unsafe, _base_component_1$Bas);

	  function Unsafe() {
	    _classCallCheck(this, Unsafe);

	    return _possibleConstructorReturn(this, (Unsafe.__proto__ || Object.getPrototypeOf(Unsafe)).apply(this, arguments));
	  }

	  _createClass(Unsafe, [{
	    key: 'update',
	    value: function update() {
	      var value = this.attributes['html'];
	      // dirty check if is a binding
	      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === "object" && value.evaluate) {
	        value = void 0;
	      }
	      if (this.currentValue && this.currentValue === value) {
	        if (this.currentValue.__isView) {
	          this.currentValue.update(this.currentValue.context);
	        }
	        return;
	      }
	      // has a remove script
	      if (this.currentValue && this.currentValue.remove) {
	        this.currentValue.remove();
	      }
	      this.currentValue = value;
	      if (!value) {
	        return this.section.removeChildNodes();
	      }
	      var node;
	      if (value.render) {
	        value.remove();
	        node = value.render();
	      } else if (value.nodeType != null) {
	        node = value;
	      } else {
	        /*if (this.document !== global.document) {
	          node = this.document.createTextNode(String(value));
	        } else {
	          var div = this.document.createElement("div");
	          div.innerHTML = String(value);
	          node = this.document.createDocumentFragment();
	         
	          var cn = Array.prototype.slice.call(div.childNodes);
	          for (var i = 0, n = cn.length; i < n; i++) {
	            node.appendChild(cn[i]);
	          }
	        }*/
	        var div = this.document.createElement("div");
	        div.innerHTML = String(value);
	        node = this.document.createDocumentFragment();
	        var cn = Array.prototype.slice.call(div.childNodes);
	        for (var i = 0, n = cn.length; i < n; i++) {
	          node.appendChild(cn[i]);
	        }
	      }
	      this.section.removeChildNodes();
	      this.section.appendChild(node);
	    }
	  }]);

	  return Unsafe;
	}(base_component_1.BaseComponent);

	exports.Unsafe = Unsafe;
	/*export const Unsafe: ComponentDefinition = {
	    initialize: function initialize() {
	    
	  },
	  update: function update() {
	     var value = this.attributes.html;

	    // dirty check if is a binding
	    if (typeof value === "object" && value.evaluate) {
	      value = void 0;
	    }

	    if (this.currentValue && this.currentValue === value) {
	      if (this.currentValue.__isView) {
	        this.currentValue.update(this.currentValue.context);
	      }
	      return;
	    }

	    // has a remove script
	    if (this.currentValue && this.currentValue.remove) {
	      this.currentValue.remove();
	    }
	    
	    
	    this.currentValue = value;

	    if (!value) {
	      return this.section.removeChildNodes();
	    }

	    var node;

	    if (value.render) {
	      value.remove();
	      node = value.render();
	    } else if (value.nodeType != null) {
	      node = value;
	    } else {
	     
	      var div = this.document.createElement("div");
	        div.innerHTML = String(value);
	        node = this.document.createDocumentFragment();
	       
	        var cn = Array.prototype.slice.call(div.childNodes);
	        for (var i = 0, n = cn.length; i < n; i++) {
	          node.appendChild(cn[i]);
	        }
	    }

	    this.section.removeChildNodes();
	    this.section.appendChild(node);
	  },
	  
	  onDestroy: function destroy() {
	    if (this._subview)
	        this._subview.remove();
	  }
	}
	*/

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
	        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    }return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) {
	            try {
	                step(generator.next(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function rejected(value) {
	            try {
	                step(generator.throw(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(result) {
	            result.done ? resolve(result.value) : new P(function (resolve) {
	                resolve(result.value);
	            }).then(fulfilled, rejected);
	        }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	var base_component_1 = __webpack_require__(43);
	var decorators = __webpack_require__(7);
	var collection_1 = __webpack_require__(40);
	var action_1 = __webpack_require__(47);
	var View = function (_base_component_1$Bas) {
	    _inherits(View, _base_component_1$Bas);

	    function View() {
	        var _ref;

	        _classCallCheck(this, View);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        var _this = _possibleConstructorReturn(this, (_ref = View.__proto__ || Object.getPrototypeOf(View)).call.apply(_ref, [this].concat(args)));

	        _this.resolving = false;
	        return _this;
	    }

	    _createClass(View, [{
	        key: "getContext",
	        value: function getContext() {
	            var context = this.attributes['context'];
	            if (!context) {
	                context = this.view.context;
	            } else {
	                if (context instanceof action_1.Call) {
	                    context = context.call();
	                }
	                if (this.attributes['as']) {
	                    var as = this.attributes['as'];
	                    context = new collection_1.NestedModel(_defineProperty({}, as, context));
	                }
	            }
	            return context;
	        }
	    }, {
	        key: "update",
	        value: function update() {
	            return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
	                var template, context, creator, resolver, tString, view;
	                return regeneratorRuntime.wrap(function _callee$(_context) {
	                    while (1) {
	                        switch (_context.prev = _context.next) {
	                            case 0:
	                                if (!this.subview) {
	                                    _context.next = 3;
	                                    break;
	                                }

	                                if (this.subview.context !== this.view.context) {
	                                    this.subview.context = this.getContext();
	                                }
	                                return _context.abrupt("return", this.subview.update());

	                            case 3:
	                                if (!this.resolving) {
	                                    _context.next = 5;
	                                    break;
	                                }

	                                return _context.abrupt("return");

	                            case 5:
	                                this.resolving = true;
	                                template = this.attributes['template'];
	                                context = this.getContext();

	                                if (!(!template || template == "")) {
	                                    _context.next = 10;
	                                    break;
	                                }

	                                return _context.abrupt("return");

	                            case 10:
	                                _context.next = 12;
	                                return this.view.container.get('$templateCreator');

	                            case 12:
	                                creator = _context.sent;
	                                _context.next = 15;
	                                return this.view.container.get('$templateResolver');

	                            case 15:
	                                resolver = _context.sent;
	                                _context.next = 18;
	                                return resolver(template);

	                            case 18:
	                                tString = _context.sent;
	                                _context.next = 21;
	                                return creator(tString, context);

	                            case 21:
	                                view = _context.sent;

	                                view.parent = this.view;
	                                this.subview = view;
	                                _context.t0 = this.section;
	                                _context.next = 27;
	                                return view.render();

	                            case 27:
	                                _context.t1 = _context.sent;

	                                _context.t0.appendChild.call(_context.t0, _context.t1);

	                                this.resolving = false;

	                            case 30:
	                            case "end":
	                                return _context.stop();
	                        }
	                    }
	                }, _callee, this);
	            }));
	        }
	    }, {
	        key: "onDestroy",
	        value: function onDestroy() {
	            if (this.subview) {
	                this.subview.$destroy();
	            }
	        }
	    }]);

	    return View;
	}(base_component_1.BaseComponent);
	View = __decorate([decorators.component("view")], View);
	exports.View = View;

/***/ }
/******/ ])
});
;