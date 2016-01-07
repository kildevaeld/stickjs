(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["stick"] = factory();
	else
		root["stick"] = factory();
})(this, function() {
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

	'use strict';

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__webpack_require__(1);
	__webpack_require__(77);
	var u = __webpack_require__(6);
	exports.utils = u;
	__export(__webpack_require__(70));
	var collection_1 = __webpack_require__(63);
	exports.Collection = collection_1.Collection;
	exports.NestedModel = collection_1.NestedModel;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(2));
	__export(__webpack_require__(73));
	__export(__webpack_require__(74));
	__export(__webpack_require__(76));

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var router_1 = __webpack_require__(3);
	var utils = __webpack_require__(6);
	var annotations_1 = __webpack_require__(15);
	var di_1 = __webpack_require__(17);
	var controller_factory_1 = __webpack_require__(28);
	var module_factory_1 = __webpack_require__(59);
	var stick_1 = __webpack_require__(70);
	var internal_1 = __webpack_require__(16);
	stick_1.decorator("route", function () {
	    return function (target) {
	        if (!internal_1.isDependencyType(target, internal_1.DependencyType.Controller)) {
	            throw new Error('[route] target not a controller');
	        }
	    };
	});
	var RouterService = (function () {
	    /**
	     * @param {IContext} ctx
	     * @param {Container} container
	     * @constructor RouterService
	     */

	    function RouterService(ctx, container) {
	        _classCallCheck(this, RouterService);

	        this.router = new router_1.Router({
	            execute: utils.bind(this.__execute, this)
	        });
	        this.context = ctx;
	        this.container = container;
	        this.router.history.start();
	    }

	    _createClass(RouterService, [{
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
	            this.router.history.loadUrl();
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
	            this.context.$call(callback, this.context, args);
	        }
	    }, {
	        key: "__handleController",
	        value: function __handleController(options) {
	            var _this = this;

	            if (!this.container.hasHandler(options.controller, true, true)) {
	                throw new Error('[router] controller');
	            }
	            return function () {
	                var target = undefined;
	                if (typeof options.target === 'string') {
	                    target = document.querySelector(options.target);
	                } else if (options.target && options.target instanceof Element) {
	                    target = options.target;
	                } else {
	                    target = _this.target;
	                }
	                if (target == null) {
	                    throw new Error('[router] target not defined');
	                }
	                var factory = _this.container.get(options.controller);
	                if (factory == null || !(factory instanceof controller_factory_1.ControllerFactory) && !(factory instanceof module_factory_1.ModuleFactory)) {
	                    throw new Error(options.controller + " not a controller");
	                }
	                factory.create({
	                    template: options.template,
	                    parent: _this.container
	                }).then(function (controller) {
	                    if (_this._currentController != null) {
	                        _this._currentController.destroy();
	                    }
	                    _this._currentController = factory;
	                    var template = factory.container.get('template');
	                    _this.swapElements(target, template.render());
	                });
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
	})();
	RouterService = __decorate([di_1.inject('$context', '$container'), annotations_1.service('$router')], RouterService);
	exports.RouterService = RouterService;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var history_1 = __webpack_require__(4);
	var eventsjs_1 = __webpack_require__(5);
	var utilities_1 = __webpack_require__(6);
	// Cached regular expressions for matching named param parts and splatted
	// parts of route strings.
	var optionalParam = /\((.*?)\)/g;
	var namedParam = /(\(\?)?:\w+/g;
	var splatParam = /\*\w+/g;
	var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
	var isRegExp = function isRegExp(value) {
	    return value ? typeof value === 'object' && toString.call(value) === '[object RegExp]' : false;
	};

	var Router = (function (_eventsjs_1$EventEmitter) {
	    _inherits(Router, _eventsjs_1$EventEmitter);

	    function Router() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	        _classCallCheck(this, Router);

	        _get(Object.getPrototypeOf(Router.prototype), 'constructor', this).call(this);
	        this.history = new history_1.HistoryApi();
	        this.options = options;
	    }

	    _createClass(Router, [{
	        key: 'route',
	        value: function route(_route, name) {
	            var _this = this;

	            var handler = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	            if (!isRegExp(_route)) _route = this._routeToRegExp(_route);
	            if (typeof name === 'function') {
	                handler = name;
	                name = '';
	            }
	            if (!handler) {
	                throw new Error('router: no handler');
	            }
	            this.history.route(_route, function (fragment) {
	                var args = _this._extractParameters(_route, fragment);
	                _this.execute(handler, fragment, args);
	                _this.trigger.apply(_this, ['route:' + name].concat(args));
	                _this.trigger('route', name, args);
	                //this.history.trigger('route', this, name, args);
	            });
	            return this;
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
	                    utilities_1.callFunc(callback, this, args);
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
	            _get(Object.getPrototypeOf(Router.prototype), 'destroy', this).call(this);
	            this.history.off();
	        }
	    }]);

	    return Router;
	})(eventsjs_1.EventEmitter);

	exports.Router = Router;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

	var HistoryApi = (function (_eventsjs_1$EventEmitter) {
	    _inherits(HistoryApi, _eventsjs_1$EventEmitter);

	    function HistoryApi() {
	        _classCallCheck(this, HistoryApi);

	        _get(Object.getPrototypeOf(HistoryApi.prototype), 'constructor', this).call(this);
	        this.handlers = [];
	        this._started = false;
	        if (typeof window !== 'undefined') {
	            this.location = window.location;
	            this.history = window.history;
	        }
	        this.checkUrl = utils.bind(this.checkUrl, this);
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
	            var forcePushState = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

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
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

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
	})(eventsjs_1.EventEmitter);

	exports.HistoryApi = HistoryApi;

/***/ },
/* 5 */
/***/ function(module, exports) {

	var idCounter = 0;
	function getID() {
	    return "" + (++idCounter);
	}
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
	    };
	    EventEmitter.prototype.trigger = function (eventName) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        var events = (this._listeners || (this._listeners = {}))[eventName] || (this._listeners[eventName] = [])
	            .concat(this._listeners['all'] || []);
	        if (EventEmitter.debugCallback)
	            EventEmitter.debugCallback(this.constructor.name, this.name, eventName, args);
	        var event, a, len = events.length, index, i;
	        var calls = [];
	        for (i = 0; i < events.length; i++) {
	            event = events[i];
	            a = args;
	            if (event.name == 'all') {
	                a = [eventName].concat(args);
	                callFunc([event], a);
	            }
	            else {
	                calls.push(event);
	            }
	            if (event.once === true) {
	                index = this._listeners[event.name].indexOf(event);
	                this._listeners[event.name].splice(index, 1);
	            }
	        }
	        if (calls.length)
	            this._executeListener(calls, args);
	        return this;
	    };
	    EventEmitter.prototype._executeListener = function (func, args) {
	        var executor = callFunc;
	        if (this.constructor.executeListenerFunction) {
	            executor = this.constructor.executeListenerFunction;
	        }
	        executor(func, args);
	    };
	    EventEmitter.prototype.listenTo = function (obj, event, fn, ctx, once) {
	        if (once === void 0) { once = false; }
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
	        var listeningTo = this._listeningTo || {};
	        var remove = !event && !callback;
	        if (obj)
	            listeningTo[obj.listenId] = obj;
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
	    return EventEmitter;
	})();
	exports.EventEmitter = EventEmitter;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(7));
	__export(__webpack_require__(9));
	__export(__webpack_require__(11));
	__export(__webpack_require__(8));
	__export(__webpack_require__(10));
	__export(__webpack_require__(12));
	__export(__webpack_require__(13));
	__export(__webpack_require__(14));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var utils_1 = __webpack_require__(8);
	function unique(array) {
	    return array.filter(function (e, i) {
	        for (i += 1; i < array.length; i += 1) {
	            if (utils_1.equal(e, array[i])) {
	                return false;
	            }
	        }
	        return true;
	    });
	}
	exports.unique = unique;
	function any(array, predicate) {
	    for (var i = 0, ii = array.length; i < ii; i++) {
	        if (predicate(array[i]))
	            return true;
	    }
	    return false;
	}
	exports.any = any;
	function indexOf(array, item) {
	    for (var i = 0, len = array.length; i < len; i++)
	        if (array[i] === item)
	            return i;
	    return -1;
	}
	exports.indexOf = indexOf;
	function find(array, callback, ctx) {
	    var i, v;
	    for (i = 0; i < array.length; i++) {
	        v = array[i];
	        if (callback.call(ctx, v))
	            return v;
	    }
	    return null;
	}
	exports.find = find;
	function slice(array, begin, end) {
	    return Array.prototype.slice.call(array, begin, end);
	}
	exports.slice = slice;
	function flatten(arr) {
	    return arr.reduce(function (flat, toFlatten) {
	        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
	    }, []);
	}
	exports.flatten = flatten;
	function sortBy(obj, value, context) {
	    var iterator = typeof value === 'function' ? value : function (obj) { return obj[value]; };
	    return obj
	        .map(function (value, index, list) {
	        return {
	            value: value,
	            index: index,
	            criteria: iterator.call(context, value, index, list)
	        };
	    })
	        .sort(function (left, right) {
	        var a = left.criteria;
	        var b = right.criteria;
	        if (a !== b) {
	            if (a > b || a === void 0)
	                return 1;
	            if (a < b || b === void 0)
	                return -1;
	        }
	        return left.index - right.index;
	    })
	        .map(function (item) {
	        return item.value;
	    });
	}
	exports.sortBy = sortBy;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var objects_1 = __webpack_require__(9);
	var arrays_1 = __webpack_require__(7);
	var strings_1 = __webpack_require__(10);
	var idCounter = 0;
	var nativeBind = Function.prototype.bind;
	function ajax() {
	    var e;
	    if (window.hasOwnProperty('XMLHttpRequest')) {
	        return new XMLHttpRequest();
	    }
	    try {
	        return new ActiveXObject('msxml2.xmlhttp.6.0');
	    }
	    catch (_error) {
	        e = _error;
	    }
	    try {
	        return new ActiveXObject('msxml2.xmlhttp.3.0');
	    }
	    catch (_error) {
	        e = _error;
	    }
	    try {
	        return new ActiveXObject('msxml2.xmlhttp');
	    }
	    catch (_error) {
	        e = _error;
	    }
	    return e;
	}
	exports.ajax = ajax;
	;
	function uniqueId(prefix) {
	    if (prefix === void 0) { prefix = ''; }
	    return prefix + (++idCounter);
	}
	exports.uniqueId = uniqueId;
	function proxy(from, to, fns) {
	    if (!Array.isArray(fns))
	        fns = [fns];
	    fns.forEach(function (fn) {
	        if (typeof to[fn] === 'function') {
	            from[fn] = bind(to[fn], to);
	        }
	    });
	}
	exports.proxy = proxy;
	function bind(method, context) {
	    var args = [];
	    for (var _i = 2; _i < arguments.length; _i++) {
	        args[_i - 2] = arguments[_i];
	    }
	    if (typeof method !== 'function')
	        throw new Error('method not at function');
	    if (nativeBind != null)
	        return nativeBind.call.apply(nativeBind, [method, context].concat(args));
	    args = args || [];
	    var fnoop = function () { };
	    var fBound = function () {
	        var ctx = this instanceof fnoop ? this : context;
	        return callFunc(method, ctx, args.concat(arrays_1.slice(arguments)));
	    };
	    fnoop.prototype = this.prototype;
	    fBound.prototype = new fnoop();
	    return fBound;
	}
	exports.bind = bind;
	function callFunc(fn, ctx, args) {
	    if (args === void 0) { args = []; }
	    switch (args.length) {
	        case 0:
	            return fn.call(ctx);
	        case 1:
	            return fn.call(ctx, args[0]);
	        case 2:
	            return fn.call(ctx, args[0], args[1]);
	        case 3:
	            return fn.call(ctx, args[0], args[1], args[2]);
	        case 4:
	            return fn.call(ctx, args[0], args[1], args[2], args[3]);
	        case 5:
	            return fn.call(ctx, args[0], args[1], args[2], args[3], args[4]);
	        default:
	            return fn.apply(ctx, args);
	    }
	}
	exports.callFunc = callFunc;
	function equal(a, b) {
	    return eq(a, b, [], []);
	}
	exports.equal = equal;
	function triggerMethodOn(obj, eventName, args) {
	    var ev = strings_1.camelcase("on-" + eventName.replace(':', '-'));
	    if (obj[ev] && typeof obj[ev] === 'function') {
	        callFunc(obj[ev], obj, args);
	    }
	    if (typeof obj.trigger === 'function') {
	        args = [eventName].concat(args);
	        callFunc(obj.trigger, obj, args);
	    }
	}
	exports.triggerMethodOn = triggerMethodOn;
	function getOption(option, objs) {
	    for (var _i = 0; _i < objs.length; _i++) {
	        var o = objs[_i];
	        if (objects_1.isObject(o) && o[option])
	            return o[option];
	    }
	    return null;
	}
	exports.getOption = getOption;
	function inherits(parent, protoProps, staticProps) {
	    var child;
	    if (protoProps && objects_1.has(protoProps, 'constructor')) {
	        child = protoProps.constructor;
	    }
	    else {
	        child = function () { return parent.apply(this, arguments); };
	    }
	    objects_1.extend(child, parent, staticProps);
	    var Surrogate = function () { this.constructor = child; };
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate;
	    if (protoProps)
	        objects_1.extend(child.prototype, protoProps);
	    child.__super__ = parent.prototype;
	    return child;
	}
	exports.inherits = inherits;
	exports.nextTick = (function () {
	    var canSetImmediate = typeof window !== 'undefined'
	        && window.setImmediate;
	    var canPost = typeof window !== 'undefined'
	        && window.postMessage && window.addEventListener;
	    if (canSetImmediate) {
	        return function (f) { return window.setImmediate(f); };
	    }
	    if (canPost) {
	        var queue = [];
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);
	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }
	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	})();
	function eq(a, b, aStack, bStack) {
	    if (a === b)
	        return a !== 0 || 1 / a == 1 / b;
	    if (a == null || b == null)
	        return a === b;
	    var className = toString.call(a);
	    if (className != toString.call(b))
	        return false;
	    switch (className) {
	        case '[object String]':
	            return a == String(b);
	        case '[object Number]':
	            return a !== +a ? b !== +b : (a === 0 ? 1 / a === 1 / b : a === +b);
	        case '[object Date]':
	        case '[object Boolean]':
	            return +a == +b;
	        case '[object RegExp]':
	            return a.source == b.source &&
	                a.global == b.global &&
	                a.multiline == b.multiline &&
	                a.ignoreCase == b.ignoreCase;
	    }
	    if (typeof a != 'object' || typeof b != 'object')
	        return false;
	    var length = aStack.length;
	    while (length--) {
	        if (aStack[length] == a)
	            return bStack[length] == b;
	    }
	    var aCtor = a.constructor, bCtor = b.constructor;
	    if (aCtor !== bCtor && !(typeof aCtor === 'function' && (aCtor instanceof aCtor) &&
	        typeof bCtor === 'function' && (bCtor instanceof bCtor))) {
	        return false;
	    }
	    aStack.push(a);
	    bStack.push(b);
	    var size = 0, result = true;
	    if (className === '[object Array]') {
	        size = a.length;
	        result = size === b.length;
	        if (result) {
	            while (size--) {
	                if (!(result = eq(a[size], b[size], aStack, bStack)))
	                    break;
	            }
	        }
	    }
	    else {
	        for (var key in a) {
	            if (objects_1.has(a, key)) {
	                size++;
	                if (!(result = objects_1.has(b, key) && eq(a[key], b[key], aStack, bStack)))
	                    break;
	            }
	        }
	        if (result) {
	            for (key in b) {
	                if (objects_1.has(b, key) && !(size--))
	                    break;
	            }
	            result = !size;
	        }
	    }
	    aStack.pop();
	    bStack.pop();
	    return result;
	}
	;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var utils_1 = __webpack_require__(8);
	var arrays_1 = __webpack_require__(7);
	function isObject(obj) {
	    return obj === Object(obj);
	}
	exports.isObject = isObject;
	function isEmpty(obj) {
	    return Object.keys(obj).length === 0;
	}
	exports.isEmpty = isEmpty;
	function extend(obj) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    if (!isObject(obj))
	        return obj;
	    var o, k;
	    for (var _a = 0; _a < args.length; _a++) {
	        o = args[_a];
	        if (!isObject(o))
	            continue;
	        for (k in o) {
	            if (has(o, k))
	                obj[k] = o[k];
	        }
	    }
	    return obj;
	}
	exports.extend = extend;
	function assign(target) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    if (target === undefined || target === null) {
	        throw new TypeError('Cannot convert first argument to object');
	    }
	    var to = Object(target);
	    for (var i = 0, ii = args.length; i < ii; i++) {
	        var nextSource = args[i];
	        if (nextSource === undefined || nextSource === null) {
	            continue;
	        }
	        nextSource = Object(nextSource);
	        var keysArray = Object.keys(Object(nextSource));
	        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
	            var nextKey = keysArray[nextIndex];
	            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
	            if (desc !== undefined && desc.enumerable) {
	                to[nextKey] = nextSource[nextKey];
	            }
	        }
	    }
	    return to;
	}
	exports.assign = assign;
	function has(obj, prop) {
	    return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	exports.has = has;
	function pick(obj, props) {
	    var out = {}, prop;
	    for (var _i = 0; _i < props.length; _i++) {
	        prop = props[_i];
	        if (has(obj, prop))
	            out[prop] = obj[prop];
	    }
	    return out;
	}
	exports.pick = pick;
	function result(obj, prop, ctx, args) {
	    var ret = obj[prop];
	    return (typeof ret === 'function') ? utils_1.callFunc(ret, ctx, args || []) : ret;
	}
	exports.result = result;
	function values(obj) {
	    var output = [];
	    for (var k in obj)
	        if (has(obj, k)) {
	            output.push(obj[k]);
	        }
	    return output;
	}
	exports.values = values;
	function intersectionObjects(a, b, predicate) {
	    var results = [], aElement, existsInB;
	    for (var i = 0, ii = a.length; i < ii; i++) {
	        aElement = a[i];
	        existsInB = arrays_1.any(b, function (bElement) { return predicate(bElement, aElement); });
	        if (existsInB) {
	            results.push(aElement);
	        }
	    }
	    return results;
	}
	function intersection(results) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    var lastArgument = args[args.length - 1];
	    var arrayCount = args.length;
	    var areEqualFunction = utils_1.equal;
	    if (typeof lastArgument === "function") {
	        areEqualFunction = lastArgument;
	        arrayCount--;
	    }
	    for (var i = 0; i < arrayCount; i++) {
	        var array = args[i];
	        results = intersectionObjects(results, array, areEqualFunction);
	        if (results.length === 0)
	            break;
	    }
	    return results;
	}
	exports.intersection = intersection;


/***/ },
/* 10 */
/***/ function(module, exports) {

	function camelcase(input) {
	    return input.toLowerCase().replace(/-(.)/g, function (match, group1) {
	        return group1.toUpperCase();
	    });
	}
	exports.camelcase = camelcase;
	;
	function truncate(str, length) {
	    var n = str.substring(0, Math.min(length, str.length));
	    return n + (n.length == str.length ? '' : '...');
	}
	exports.truncate = truncate;
	function humanFileSize(bytes, si) {
	    if (si === void 0) { si = false; }
	    var thresh = si ? 1000 : 1024;
	    if (Math.abs(bytes) < thresh) {
	        return bytes + ' B';
	    }
	    var units = si
	        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
	        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
	    var u = -1;
	    do {
	        bytes /= thresh;
	        ++u;
	    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
	    return bytes.toFixed(1) + ' ' + units[u];
	}
	exports.humanFileSize = humanFileSize;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var objects_1 = __webpack_require__(9);
	var arrays_1 = __webpack_require__(7);
	var utils_1 = __webpack_require__(8);
	exports.Promise = (typeof window === 'undefined') ? global.Promise : window.Promise;
	function isPromise(obj) {
	    return obj && typeof obj.then === 'function';
	}
	exports.isPromise = isPromise;
	function toPromise(obj) {
	    if (!obj) {
	        return obj;
	    }
	    if (isPromise(obj)) {
	        return obj;
	    }
	    if ("function" == typeof obj) {
	        return thunkToPromise.call(this, obj);
	    }
	    if (Array.isArray(obj)) {
	        return arrayToPromise.call(this, obj);
	    }
	    if (objects_1.isObject(obj)) {
	        return objectToPromise.call(this, obj);
	    }
	    return exports.Promise.resolve(obj);
	}
	exports.toPromise = toPromise;
	function thunkToPromise(fn) {
	    var ctx = this;
	    return new exports.Promise(function (resolve, reject) {
	        fn.call(ctx, function (err, res) {
	            if (err)
	                return reject(err);
	            if (arguments.length > 2)
	                res = arrays_1.slice(arguments, 1);
	            resolve(res);
	        });
	    });
	}
	exports.thunkToPromise = thunkToPromise;
	function arrayToPromise(obj) {
	    return exports.Promise.all(obj.map(toPromise, this));
	}
	exports.arrayToPromise = arrayToPromise;
	function objectToPromise(obj) {
	    var results = new obj.constructor();
	    var keys = Object.keys(obj);
	    var promises = [];
	    for (var i = 0; i < keys.length; i++) {
	        var key = keys[i];
	        var promise = toPromise.call(this, obj[key]);
	        if (promise && isPromise(promise))
	            defer(promise, key);
	        else
	            results[key] = obj[key];
	    }
	    return exports.Promise.all(promises).then(function () {
	        return results;
	    });
	    function defer(promise, key) {
	        results[key] = undefined;
	        promises.push(promise.then(function (res) {
	            results[key] = res;
	        }));
	    }
	}
	exports.objectToPromise = objectToPromise;
	function deferred(fn, ctx) {
	    var args = [];
	    for (var _i = 2; _i < arguments.length; _i++) {
	        args[_i - 2] = arguments[_i];
	    }
	    var ret = {};
	    ret.promise = new exports.Promise(function (resolve, reject) {
	        ret.resolve = resolve;
	        ret.reject = reject;
	        ret.done = function (err, result) { if (err)
	            return reject(err);
	        else
	            resolve(result); };
	    });
	    if (typeof fn === 'function') {
	        utils_1.callFunc(fn, ctx, args.concat([ret.done]));
	        return ret.promise;
	    }
	    return ret;
	}
	exports.deferred = deferred;
	;
	function callback(promise, callback, ctx) {
	    promise.then(function (result) {
	        callback.call(ctx, null, result);
	    }).catch(function (err) {
	        callback.call(ctx, err);
	    });
	}
	exports.callback = callback;
	function delay(timeout) {
	    var defer = deferred();
	    timeout == null ? utils_1.nextTick(defer.resolve) : setTimeout(defer.resolve, timeout);
	    return defer.promise;
	}
	exports.delay = delay;
	;
	function eachAsync(array, iterator, context, accumulate) {
	    if (accumulate === void 0) { accumulate = false; }
	    return mapAsync(array, iterator, context, accumulate)
	        .then(function () { return void 0; });
	}
	exports.eachAsync = eachAsync;
	function mapAsync(array, iterator, context, accumulate) {
	    if (accumulate === void 0) { accumulate = false; }
	    return new exports.Promise(function (resolve, reject) {
	        var i = 0, len = array.length, errors = [], results = [];
	        function next(err, result) {
	            if (err && !accumulate)
	                return reject(err);
	            if (err)
	                errors.push(err);
	            if (i === len)
	                return errors.length ? reject(arrays_1.flatten(errors)) : resolve(results);
	            var ret = iterator.call(context, array[i++]);
	            if (isPromise(ret)) {
	                ret.then(function (r) { results.push(r); next(null, r); }, next);
	            }
	            else if (ret instanceof Error) {
	                next(ret);
	            }
	            else {
	                next(null);
	            }
	        }
	        next(null);
	    });
	}
	exports.mapAsync = mapAsync;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var arrays_1 = __webpack_require__(7);
	var ElementProto = (typeof Element !== 'undefined' && Element.prototype) || {};
	var matchesSelector = ElementProto.matches ||
	    ElementProto.webkitMatchesSelector ||
	    ElementProto.mozMatchesSelector ||
	    ElementProto.msMatchesSelector ||
	    ElementProto.oMatchesSelector || function (selector) {
	    var nodeList = (this.parentNode || document).querySelectorAll(selector) || [];
	    return !!~arrays_1.indexOf(nodeList, this);
	};
	var elementAddEventListener = ElementProto.addEventListener || function (eventName, listener) {
	    return this.attachEvent('on' + eventName, listener);
	};
	var elementRemoveEventListener = ElementProto.removeEventListener || function (eventName, listener) {
	    return this.detachEvent('on' + eventName, listener);
	};
	var transitionEndEvent = (function transitionEnd() {
	    var el = document.createElement('bootstrap');
	    var transEndEventNames = {
	        'WebkitTransition': 'webkitTransitionEnd',
	        'MozTransition': 'transitionend',
	        'OTransition': 'oTransitionEnd otransitionend',
	        'transition': 'transitionend'
	    };
	    for (var name in transEndEventNames) {
	        if (el.style[name] !== undefined) {
	            return transEndEventNames[name];
	        }
	    }
	    return null;
	});
	var animationEndEvent = (function animationEnd() {
	    var el = document.createElement('bootstrap');
	    var transEndEventNames = {
	        'WebkitAnimation': 'webkitAnimationEnd',
	        'MozAnimation': 'animationend',
	        'OAnimation': 'oAnimationEnd oanimationend',
	        'animation': 'animationend'
	    };
	    for (var name in transEndEventNames) {
	        if (el.style[name] !== undefined) {
	            return transEndEventNames[name];
	        }
	    }
	    return null;
	});
	function matches(elm, selector) {
	    return matchesSelector.call(elm, selector);
	}
	exports.matches = matches;
	function addEventListener(elm, eventName, listener, useCap) {
	    if (useCap === void 0) { useCap = false; }
	    elementAddEventListener.call(elm, eventName, listener, useCap);
	}
	exports.addEventListener = addEventListener;
	function removeEventListener(elm, eventName, listener) {
	    elementRemoveEventListener.call(elm, eventName, listener);
	}
	exports.removeEventListener = removeEventListener;
	var unbubblebles = 'focus blur change'.split(' ');
	var domEvents = [];
	function delegate(elm, selector, eventName, callback, ctx) {
	    var root = elm;
	    var handler = function (e) {
	        var node = e.target || e.srcElement;
	        if (e.delegateTarget)
	            return;
	        for (; node && node != root; node = node.parentNode) {
	            if (matches(node, selector)) {
	                e.delegateTarget = node;
	                callback(e);
	            }
	        }
	    };
	    var useCap = !!~unbubblebles.indexOf(eventName);
	    addEventListener(elm, eventName, handler, useCap);
	    domEvents.push({ eventName: eventName, handler: handler, listener: callback, selector: selector });
	    return handler;
	}
	exports.delegate = delegate;
	function undelegate(elm, selector, eventName, callback) {
	    /*if (typeof selector === 'function') {
	        listener = <Function>selector;
	        selector = null;
	      }*/
	    var handlers = domEvents.slice();
	    for (var i = 0, len = handlers.length; i < len; i++) {
	        var item = handlers[i];
	        var match = item.eventName === eventName &&
	            (callback ? item.listener === callback : true) &&
	            (selector ? item.selector === selector : true);
	        if (!match)
	            continue;
	        removeEventListener(elm, item.eventName, item.handler);
	        domEvents.splice(arrays_1.indexOf(handlers, item), 1);
	    }
	}
	exports.undelegate = undelegate;
	function addClass(elm, className) {
	    if (elm.classList) {
	        var split = className.split(' ');
	        for (var i = 0, ii = split.length; i < ii; i++) {
	            if (elm.classList.contains(split[i].trim()))
	                continue;
	            elm.classList.add(split[i].trim());
	        }
	    }
	    else {
	        elm.className = arrays_1.unique(elm.className.split(' ').concat(className.split(' '))).join(' ');
	    }
	}
	exports.addClass = addClass;
	function removeClass(elm, className) {
	    if (elm.classList) {
	        var split = className.split(' ');
	        for (var i = 0, ii = split.length; i < ii; i++) {
	            elm.classList.remove(split[i].trim());
	        }
	    }
	    else {
	        var split = elm.className.split(' '), classNames = className.split(' '), tmp = split, index;
	        for (var i = 0, ii = classNames.length; i < ii; i++) {
	            index = split.indexOf(classNames[i]);
	            if (!!~index)
	                split = split.splice(index, 1);
	        }
	    }
	}
	exports.removeClass = removeClass;
	function hasClass(elm, className) {
	    if (elm.classList) {
	        return elm.classList.contains(className);
	    }
	    var reg = new RegExp('\b' + className);
	    return reg.test(elm.className);
	}
	exports.hasClass = hasClass;
	function selectionStart(elm) {
	    if ('selectionStart' in elm) {
	        return elm.selectionStart;
	    }
	    else if (document.selection) {
	        elm.focus();
	        var sel = document.selection.createRange();
	        var selLen = document.selection.createRange().text.length;
	        sel.moveStart('character', -elm.value.length);
	        return sel.text.length - selLen;
	    }
	}
	exports.selectionStart = selectionStart;
	var _events = {
	    animationEnd: null,
	    transitionEnd: null
	};
	function transitionEnd(elm, fn, ctx, duration) {
	    var event = _events.transitionEnd || (_events.transitionEnd = transitionEndEvent());
	    var callback = function (e) {
	        removeEventListener(elm, event, callback);
	        fn.call(ctx, e);
	    };
	    addEventListener(elm, event, callback);
	}
	exports.transitionEnd = transitionEnd;
	function animationEnd(elm, fn, ctx, duration) {
	    var event = _events.animationEnd || (_events.animationEnd = animationEndEvent());
	    var callback = function (e) {
	        removeEventListener(elm, event, callback);
	        fn.call(ctx, e);
	    };
	    addEventListener(elm, event, callback);
	}
	exports.animationEnd = animationEnd;
	exports.domReady = (function () {
	    var fns = [], listener, doc = document, hack = doc.documentElement.doScroll, domContentLoaded = 'DOMContentLoaded', loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);
	    if (!loaded) {
	        doc.addEventListener(domContentLoaded, listener = function () {
	            doc.removeEventListener(domContentLoaded, listener);
	            loaded = true;
	            while (listener = fns.shift())
	                listener();
	        });
	    }
	    return function (fn) {
	        loaded ? setTimeout(fn, 0) : fns.push(fn);
	    };
	});


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var utils_1 = __webpack_require__(8);
	var promises_1 = __webpack_require__(11);
	var xmlRe = /^(?:application|text)\/xml/, jsonRe = /^application\/json/, fileProto = /^file:/;
	function queryParam(obj) {
	    return '?' + Object.keys(obj).reduce(function (a, k) { a.push(k + '=' + encodeURIComponent(obj[k])); return a; }, []).join('&');
	}
	exports.queryParam = queryParam;
	var isValid = function (xhr, url) {
	    return (xhr.status >= 200 && xhr.status < 300) ||
	        (xhr.status === 304) ||
	        (xhr.status === 0 && fileProto.test(url)) ||
	        (xhr.status === 0 && window.location.protocol === 'file:');
	};
	var Request = (function () {
	    function Request(_method, _url) {
	        this._method = _method;
	        this._url = _url;
	        this._xhr = utils_1.ajax();
	    }
	    Request.prototype.send = function (data) {
	        this._data = data;
	        return this;
	    };
	    Request.prototype.withCredentials = function (ret) {
	        this._xhr.withCredentials = ret;
	        return this;
	    };
	    Request.prototype.end = function (data) {
	        var _this = this;
	        this._data = data || this._data;
	        var defer = promises_1.deferred();
	        this._xhr.addEventListener('readystatechange', function () {
	            if (_this._xhr.readyState !== XMLHttpRequest.DONE)
	                return;
	            if (!isValid(_this._xhr, _this._url)) {
	                return defer.reject(new Error('server responded with: ' + _this._xhr.status));
	            }
	            defer.resolve(_this._xhr.responseText);
	        });
	        data = this._data;
	        var url = this._url;
	        if (data && data === Object(data)) {
	            var d = queryParam(data);
	            url += d;
	        }
	        this._xhr.open(this._method, url, true);
	        this._xhr.send(data);
	        return defer.promise;
	    };
	    Request.prototype.json = function (data) {
	        var _this = this;
	        return this.end(data)
	            .then(function (str) {
	            var accepts = _this._xhr.getResponseHeader('content-type');
	            if (jsonRe.test(accepts) && str !== '') {
	                var json = JSON.parse(str);
	                return json;
	            }
	            else {
	                throw new Error('json');
	            }
	        });
	    };
	    Request.prototype.progress = function (fn) {
	        this._xhr.addEventListener('progress', fn);
	        return this;
	    };
	    Request.prototype.header = function (field, value) {
	        this._xhr.setRequestHeader(field, value);
	        return this;
	    };
	    return Request;
	})();
	exports.Request = Request;
	var request;
	(function (request) {
	    function get(url) {
	        return new Request('GET', url);
	    }
	    request.get = get;
	    function post(url) {
	        return new Request('POST', url);
	    }
	    request.post = post;
	    function put(url) {
	        return new Request('PUT', url);
	    }
	    request.put = put;
	    function del(url) {
	        return new Request('DELETE', url);
	    }
	    request.del = del;
	})(request = exports.request || (exports.request = {}));


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var utils_1 = __webpack_require__(8);
	var Debug = (function () {
	    function Debug(namespace) {
	        this.enabled = false;
	        this.namespace = namespace;
	    }
	    Debug.enable = function (enabled, namespace) {
	        for (var k in this.loggers) {
	            if (namespace && k === namespace) {
	                this.loggers[k].enabled = enabled;
	            }
	            else if (!namespace) {
	                this.loggers[k].enabled = enabled;
	            }
	        }
	    };
	    Debug.create = function (namespace) {
	        var logger;
	        if (this.loggers[namespace]) {
	            logger = this.loggers[namespace].debug;
	        }
	        else {
	            logger = new Debug(namespace);
	            this.loggers[namespace] = logger;
	        }
	        return utils_1.bind(logger.debug, logger);
	    };
	    Debug.prototype.debug = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        if (!this.enabled)
	            return;
	        args[0] = this._coerce(args[0]);
	        if ('string' !== typeof args[0]) {
	            args = ['%o'].concat(args);
	        }
	        var index = 0;
	        args[0] = args[0].replace(/%([a-z%])/g, function (match, format) {
	            if (match === '%%')
	                return match;
	            index++;
	            var formatter = Debug.formatters[format];
	            if ('function' === typeof formatter) {
	                var val = args[index];
	                match = formatter.call(self, val);
	                args.splice(index, 1);
	                index--;
	            }
	            return match;
	        });
	        args = this._formatArgs(args);
	        this._log.apply(this, args);
	    };
	    Debug.prototype._log = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        return 'object' === typeof console
	            && console.log
	            && Function.prototype.apply.call(console.log, console, arguments);
	    };
	    Debug.prototype._coerce = function (val) {
	        if (val instanceof Error)
	            return val.stack || val.message;
	        return val;
	    };
	    Debug.prototype._formatArgs = function (args) {
	        var p = this.prefix ? this.prefix + ":" : '';
	        args[0] = "[" + p + ":" + this.namespace + "] " + args[0];
	        return args;
	    };
	    Debug.loggers = {};
	    Debug.formatters = {
	        j: function (args) {
	            return JSON.stringify(args);
	        }
	    };
	    return Debug;
	})();
	exports.Debug = Debug;
	function debug(namespace) {
	    return Debug.create(namespace);
	}
	exports.debug = debug;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var internal_1 = __webpack_require__(16);
	var utilities_1 = __webpack_require__(6);
	var di_1 = __webpack_require__(17);
	var repository_1 = __webpack_require__(27);
	var di_2 = __webpack_require__(17);
	exports.inject = di_2.inject;
	function controller(controllerName) {
	    return function (target) {
	        var name = controllerName || utilities_1.camelcase(target.name);
	        repository_1.Repository.add(internal_1.DependencyType.Controller, name, target);
	    };
	}
	exports.controller = controller;
	function _module(moduleName) {
	    return function (target) {
	        var name = moduleName || utilities_1.camelcase(target.name);
	        repository_1.Repository.add(internal_1.DependencyType.Module, name, target);
	    };
	}
	exports.module = _module;
	function service(serviceName, moduleName) {
	    return function (target) {
	        var name = serviceName || utilities_1.camelcase(target.name);
	        repository_1.Repository.add(internal_1.DependencyType.Service, name, target);
	    };
	}
	exports.service = service;
	function factory(factoryName) {
	    return function (target) {
	        repository_1.Repository.add(internal_1.DependencyType.Factory, factoryName, target);
	    };
	}
	exports.factory = factory;
	function config(config) {
	    return function (target) {
	        di_1.Metadata.define(internal_1.DIServiceConfig, config, target, undefined);
	    };
	}
	exports.config = config;
	function template(name) {
	    return function (target) {
	        di_1.Metadata.define(internal_1.Metakey[internal_1.Metakey.Template], name, target, undefined);
	    };
	}
	exports.template = template;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(6);
	var di_1 = __webpack_require__(17);
	var paramRegEx = /function[^(]*\(([^)]*)\)/i;
	function getFunctionParameters(fn) {
	    var cache = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	    var params = di_1.Metadata.getOwn(di_1.Metadata.paramTypes, fn);
	    if (!params) {
	        var match = fn.toString().match(paramRegEx);
	        if (match) {
	            params = match[1].replace(/,/, ' ').split(' ').map(function (x) {
	                return x.replace(',', '').trim();
	            }).filter(function (m) {
	                return m !== '';
	            });
	            if (cache) di_1.Metadata.define(di_1.Metadata.paramTypes, params, fn, undefined);
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
	    var dependencies = undefined;
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
	            if (_fn.__metadata__ && _fn.__metadata__.undefined['design:paramtypes']) {
	                delete _fn.__metadata__.undefined['design:paramtypes'];
	            }
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
	    var val = undefined,
	        err = undefined;
	    try {
	        val = fn();
	    } catch (e) {
	        err = e;
	    }
	    return [val, err];
	}
	function resolveDependencies(target, container) {
	    var i = undefined,
	        ii = undefined,
	        ret = undefined,
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
	        di_1.Metadata.define(str, type, target, undefined);
	    };
	}
	exports.setDependencyType = setDependencyType;
	function getDependencyType(target) {
	    var key = Metakey[Metakey.DependencyType],
	        type = di_1.Metadata.getOwn(key, target, undefined);
	    return type;
	}
	exports.getDependencyType = getDependencyType;
	function isDependencyType(target, type) {
	    return getDependencyType(target) === type;
	}
	exports.isDependencyType = isDependencyType;
	function setActivator(target, activator) {
	    var instanceActivatorKey = di_1.Metadata.instanceActivator;
	    di_1.Metadata.define(instanceActivatorKey, activator, target, undefined);
	}
	exports.setActivator = setActivator;
	function setDependencyResolver(target, activator) {
	    var dependencyResolverKey = di_1.Metadata.dependencyResolver;
	    di_1.Metadata.define(dependencyResolverKey, activator, target, undefined);
	}
	exports.setDependencyResolver = setDependencyResolver;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = __webpack_require__(18);


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

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
	var Version = '0.0.6';
	exports.Version = Version;

	var _container = __webpack_require__(19);

	_defaults(exports, _interopExportWildcard(_container, _defaults));

	var _metaIndex = __webpack_require__(23);

	_defaults(exports, _interopExportWildcard(_metaIndex, _defaults));

	var _decorators = __webpack_require__(26);

	_defaults(exports, _interopExportWildcard(_decorators, _defaults));

	var _metadata = __webpack_require__(20);

	_defaults(exports, _interopExportWildcard(_metadata, _defaults));

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports.getFunctionParameters = getFunctionParameters;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _metadata = __webpack_require__(20);

	var _metaMetadata = __webpack_require__(21);

	var _errors = __webpack_require__(22);

	var paramRegEx = /function[^(]*\(([^)]*)\)/i;

	function getFunctionParameters(fn) {
	    var cache = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	    var params = _metaMetadata.Metadata.getOwn(_metaMetadata.Metadata.paramTypes, fn);
	    if (!params) {
	        var match = fn.toString().match(paramRegEx);
	        if (match) {
	            params = match[1].replace(/\W+/, ' ').split(' ').map(function (x) {
	                return x.replace(',', '').trim();
	            }).filter(function (m) {
	                return m !== '';
	            });
	            if (cache) _metaMetadata.Metadata.define(_metaMetadata.Metadata.paramTypes, params, fn, undefined);
	        }
	    }
	    return params || [];
	}

	var DIBadKeyError = (function (_DIError) {
	    _inherits(DIBadKeyError, _DIError);

	    function DIBadKeyError(message) {
	        _classCallCheck(this, DIBadKeyError);

	        _DIError.call(this, message);
	        this.name = 'BadKeyError';
	        this.message = "key not registered with container";
	    }

	    return DIBadKeyError;
	})(_errors.DIError);

	exports.DIBadKeyError = DIBadKeyError;
	var emptyParameters = Object.freeze([]);
	exports.emptyParameters = emptyParameters;
	var instanceActivatorKey = "moby:instance-activator";
	var registrationKey = "moby:registration";
	var dependencyResolverKey = "moby:dependency-resolver";
	_metaMetadata.Metadata.instanceActivator = instanceActivatorKey;
	_metaMetadata.Metadata.registration = registrationKey;
	_metaMetadata.Metadata.dependencyResolver = dependencyResolverKey;

	var DIContainer = (function () {
	    function DIContainer(info) {
	        _classCallCheck(this, DIContainer);

	        this.entries = new Map();
	        this.constructionInfo = info || new Map();
	    }

	    DIContainer.prototype.makeGlobal = function makeGlobal() {
	        DIContainer.instance = this;
	        return this;
	    };

	    /**
	    * Registers a type (constructor function) by inspecting its registration annotations. If none are found, then the default singleton registration is used.
	    *
	    * @method autoRegister
	    * @param {Function} fn The constructor function to use when the dependency needs to be instantiated.
	    * @param {Object} [key] The key that identifies the dependency at resolution time; usually a constructor function.
	    */

	    DIContainer.prototype.autoRegister = function autoRegister(fn, key, targetKey) {
	        var registration;
	        if (fn === null || fn === undefined) {
	            throw new DIBadKeyError('no key');
	        }
	        if (typeof fn === 'function') {
	            registration = _metaMetadata.Metadata.get(registrationKey, fn, targetKey);
	            if (registration !== undefined) {
	                registration.register(this, key || fn, fn);
	            } else {
	                this.registerSingleton(key || fn, fn, targetKey);
	            }
	        } else {
	            this.registerInstance(fn, fn);
	        }
	    };

	    /**
	    * Unregisters based on key.
	    *
	    * @method unregister
	    * @param {Object} key The key that identifies the dependency at resolution time; usually a constructor function.
	    */

	    DIContainer.prototype.unregister = function unregister(key) {
	        this.entries['delete'](key);
	    };

	    /**
	    * Inspects the container to determine if a particular key has been registred.
	    *
	    * @method hasHandler
	    * @param {Object} key The key that identifies the dependency at resolution time; usually a constructor function.
	    * @param {Boolean} [checkParent=false] Indicates whether or not to check the parent container hierarchy.
	    * @return {Boolean} Returns true if the key has been registred; false otherwise.
	    */

	    DIContainer.prototype.hasHandler = function hasHandler(key) {
	        var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	        if (key === null || key === undefined) {
	            throw new DIBadKeyError();
	        }
	        return this.entries.has(key) || checkParent && this.parent && this.parent.hasHandler(key, checkParent);
	    };

	    /**
	    * Resolves a single instance based on the provided key.
	    *
	    * @method get
	    * @param {Object} key The key that identifies the object to resolve.
	    * @return {Object} Returns the resolved instance.
	    */

	    DIContainer.prototype.get = function get(key, targetKey) {
	        var entry;
	        if (key === null || key === undefined) {
	            throw new DIBadKeyError();
	        }
	        if (key === DIContainer) {
	            return this;
	        }
	        if (key instanceof _metadata.Resolver) {
	            return key.get(this);
	        }
	        entry = this.entries.get(key);
	        if (entry !== undefined) {
	            return entry[0](this);
	        }
	        if (this.parent && this.parent.hasHandler(key)) {
	            return this.parent.get(key, targetKey);
	        }
	        // No point in registrering a string
	        if (typeof key === 'string') {
	            throw (0, _errors.createError)('DIResolveError', 'no component registered for key: ' + key);
	        }
	        this.autoRegister(key, targetKey);
	        entry = this.entries.get(key);
	        return entry[0](this);
	    };

	    /**
	    * Resolves all instance registered under the provided key.
	    *
	    * @method getAll
	    * @param {Object} key The key that identifies the objects to resolve.
	    * @return {Object[]} Returns an array of the resolved instances.
	    */

	    DIContainer.prototype.getAll = function getAll(key) {
	        var _this = this;

	        var entry;
	        if (key === null || key === undefined) {
	            throw new DIBadKeyError();
	        }
	        entry = this.entries.get(key);
	        if (entry !== undefined) {
	            return entry.map(function (x) {
	                return x(_this);
	            });
	        }
	        if (this.parent) {
	            return this.parent.getAll(key);
	        }
	        return [];
	    };

	    /**
	    * Creates a new dependency injection container whose parent is the current container.
	    *
	    * @method createChild
	    * @return {Container} Returns a new container instance parented to this.
	    */

	    DIContainer.prototype.createChild = function createChild() {
	        var childContainer = new DIContainer(this.constructionInfo);
	        childContainer.parent = this;
	        return childContainer;
	    };

	    DIContainer.prototype.resolveDependencies = function resolveDependencies(fn, targetKey) {
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
	            throw (0, _errors.createError)("DependencyError", message, [e]);
	        }
	        return args;
	    };

	    /**
	    * Invokes a function, recursively resolving its dependencies.
	    *
	    * @method invoke
	    * @param {Function} fn The function to invoke with the auto-resolved dependencies.
	    * @param {any[]} [deps] Additional function dependencies to use during invocation.
	    * @return {Object} Returns the instance resulting from calling the function.
	    */

	    DIContainer.prototype.invoke = function invoke(fn, deps, targetKey) {
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
	            return info.activator.invoke(fn, args, targetKey, keys);
	        } catch (e) {
	            var activatingText = info.activator instanceof _metadata.ClassActivator ? 'instantiating' : 'invoking';
	            var message = 'Error ' + activatingText + ' ' + fn.name + '.';
	            message += ' Check the inner error for details.';
	            throw (0, _errors.createError)("DIInvokeError", message, [e]);
	        }
	    };

	    DIContainer.prototype.registerInstance = function registerInstance(key, instance) {
	        this.registerHandler(key, function (x) {
	            return instance;
	        });
	    };

	    DIContainer.prototype.registerTransient = function registerTransient(key, fn, targetKey) {
	        this.registerHandler(key, function (x) {
	            return x.invoke(fn, null, targetKey);
	        });
	    };

	    DIContainer.prototype.registerSingleton = function registerSingleton(key, fn, targetKey) {
	        var singleton;
	        this.registerHandler(key, function (x) {
	            return singleton || (singleton = x.invoke(fn, null, targetKey));
	        });
	    };

	    DIContainer.prototype.registerHandler = function registerHandler(key, handler) {
	        this._getOrCreateEntry(key).push(handler);
	    };

	    DIContainer.prototype._getOrCreateEntry = function _getOrCreateEntry(key) {
	        var entry;
	        if (key === null || key === undefined) {
	            throw new _errors.DIError('key cannot be null or undefined.  (Are you trying to inject something that doesn\'t exist with DI?)');
	        }
	        entry = this.entries.get(key);
	        if (entry === undefined) {
	            entry = [];
	            this.entries.set(key, entry);
	        }
	        return entry;
	    };

	    DIContainer.prototype._getOrCreateConstructionSet = function _getOrCreateConstructionSet(fn, targetKey) {
	        var info = this.constructionInfo.get(fn);
	        if (info === undefined) {
	            info = this._createConstructionSet(fn, targetKey);
	            this.constructionInfo.set(fn, info);
	        }
	        return info;
	    };

	    DIContainer.prototype._createConstructionSet = function _createConstructionSet(fn, targetKey) {
	        var info = {
	            activator: _metaMetadata.Metadata.getOwn(_metaMetadata.Metadata.instanceActivator, fn, targetKey) || _metadata.ClassActivator.instance,
	            dependencyResolver: _metaMetadata.Metadata.getOwn(dependencyResolverKey, fn, targetKey) || this };
	        if (fn.inject !== undefined) {
	            if (typeof fn.inject === 'function') {
	                info.keys = fn.inject();
	            } else {
	                info.keys = fn.inject;
	            }
	            return info;
	        }
	        info.keys = _metaMetadata.Metadata.getOwn(_metaMetadata.Metadata.paramTypes, fn, targetKey) || getFunctionParameters(fn) || emptyParameters;
	        return info;
	    };

	    _createClass(DIContainer, [{
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
	    }]);

	    return DIContainer;
	})();

	exports.DIContainer = DIContainer;

/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	* Used to allow functions/classes to indicate that they should be registered as transients with the container.
	*
	* @class TransientRegistration
	* @constructor
	* @param {Object} [key] The key to register as.
	*/
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var TransientRegistration = (function () {
	    function TransientRegistration(key) {
	        _classCallCheck(this, TransientRegistration);

	        this.key = key;
	    }

	    /**
	    * Used to allow functions/classes to indicate that they should be registered as singletons with the container.
	    *
	    * @class SingletonRegistration
	    * @constructor
	    * @param {Object} [key] The key to register as.
	    */

	    /**
	    * Called by the container to register the annotated function/class as transient.
	    *
	    * @method register
	    * @param {Container} container The container to register with.
	    * @param {Object} key The key to register as.
	    * @param {Object} fn The function to register (target of the annotation).
	    */

	    TransientRegistration.prototype.register = function register(container, key, fn) {
	        container.registerTransient(this.key || key, fn);
	    };

	    return TransientRegistration;
	})();

	exports.TransientRegistration = TransientRegistration;

	var SingletonRegistration = (function () {
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
	    * An abstract resolver used to allow functions/classes to specify custom dependency resolution logic.
	    *
	    * @class Resolver
	    * @constructor
	    */

	    /**
	    * Called by the container to register the annotated function/class as a singleton.
	    *
	    * @method register
	    * @param {Container} container The container to register with.
	    * @param {Object} key The key to register as.
	    * @param {Object} fn The function to register (target of the annotation).
	    */

	    SingletonRegistration.prototype.register = function register(container, key, fn) {
	        var destination = this.registerInChild ? container : container.root;
	        destination.registerSingleton(this.key || key, fn);
	    };

	    return SingletonRegistration;
	})();

	exports.SingletonRegistration = SingletonRegistration;

	var Resolver = (function () {
	    function Resolver() {
	        _classCallCheck(this, Resolver);
	    }

	    /**
	    * Used to allow functions/classes to specify lazy resolution logic.
	    *
	    * @class Lazy
	    * @constructor
	    * @extends Resolver
	    * @param {Object} key The key to lazily resolve.
	    */

	    /**
	    * Called by the container to allow custom resolution of dependencies for a function/class.
	    *
	    * @method get
	    * @param {Container} container The container to resolve from.
	    * @return {Object} Returns the resolved object.
	    */

	    Resolver.prototype.get = function get(container) {
	        throw new Error('A custom Resolver must implement get(container) and return the resolved instance(s).');
	    };

	    return Resolver;
	})();

	exports.Resolver = Resolver;

	var Lazy = (function (_Resolver) {
	    _inherits(Lazy, _Resolver);

	    function Lazy(key) {
	        _classCallCheck(this, Lazy);

	        _Resolver.call(this);
	        this.key = key;
	    }

	    /**
	    * Used to allow functions/classes to specify resolution of all matches to a key.
	    *
	    * @class All
	    * @constructor
	    * @extends Resolver
	    * @param {Object} key The key to lazily resolve all matches for.
	    */

	    /**
	    * Called by the container to lazily resolve the dependency into a lazy locator function.
	    *
	    * @method get
	    * @param {Container} container The container to resolve from.
	    * @return {Function} Returns a function which can be invoked at a later time to obtain the actual dependency.
	    */

	    Lazy.prototype.get = function get(container) {
	        var _this = this;

	        return function () {
	            return container.get(_this.key);
	        };
	    };

	    /**
	    * Creates a Lazy Resolver for the supplied key.
	    *
	    * @method of
	    * @static
	    * @param {Object} key The key to lazily resolve.
	    * @return {Lazy} Returns an insance of Lazy for the key.
	    */

	    Lazy.of = function of(key) {
	        return new Lazy(key);
	    };

	    return Lazy;
	})(Resolver);

	exports.Lazy = Lazy;

	var All = (function (_Resolver2) {
	    _inherits(All, _Resolver2);

	    function All(key) {
	        _classCallCheck(this, All);

	        _Resolver2.call(this);
	        this.key = key;
	    }

	    /**
	    * Used to allow functions/classes to specify an optional dependency, which will be resolved only if already registred with the container.
	    *
	    * @class Optional
	    * @constructor
	    * @extends Resolver
	    * @param {Object} key The key to optionally resolve for.
	    * @param {Boolean} [checkParent=false] Indicates whether or not the parent container hierarchy should be checked.
	    */

	    /**
	    * Called by the container to resolve all matching dependencies as an array of instances.
	    *
	    * @method get
	    * @param {Container} container The container to resolve from.
	    * @return {Object[]} Returns an array of all matching instances.
	    */

	    All.prototype.get = function get(container) {
	        return container.getAll(this.key);
	    };

	    /**
	    * Creates an All Resolver for the supplied key.
	    *
	    * @method of
	    * @static
	    * @param {Object} key The key to resolve all instances for.
	    * @return {All} Returns an insance of All for the key.
	    */

	    All.of = function of(key) {
	        return new All(key);
	    };

	    return All;
	})(Resolver);

	exports.All = All;

	var Optional = (function (_Resolver3) {
	    _inherits(Optional, _Resolver3);

	    function Optional(key) {
	        var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	        _classCallCheck(this, Optional);

	        _Resolver3.call(this);
	        this.key = key;
	        this.checkParent = checkParent;
	    }

	    /**
	    * Used to inject the dependency from the parent container instead of the current one.
	    *
	    * @class Parent
	    * @constructor
	    * @extends Resolver
	    * @param {Object} key The key to resolve from the parent container.
	    */

	    /**
	    * Called by the container to provide optional resolution of the key.
	    *
	    * @method get
	    * @param {Container} container The container to resolve from.
	    * @return {Object} Returns the instance if found; otherwise null.
	    */

	    Optional.prototype.get = function get(container) {
	        if (container.hasHandler(this.key, this.checkParent)) {
	            return container.get(this.key);
	        }
	        return null;
	    };

	    /**
	    * Creates an Optional Resolver for the supplied key.
	    *
	    * @method of
	    * @static
	    * @param {Object} key The key to optionally resolve for.
	    * @param {Boolean} [checkParent=false] Indicates whether or not the parent container hierarchy should be checked.
	    * @return {Optional} Returns an insance of Optional for the key.
	    */

	    Optional.of = function of(key) {
	        var checkParent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	        return new Optional(key, checkParent);
	    };

	    return Optional;
	})(Resolver);

	exports.Optional = Optional;

	var Parent = (function (_Resolver4) {
	    _inherits(Parent, _Resolver4);

	    function Parent(key) {
	        _classCallCheck(this, Parent);

	        _Resolver4.call(this);
	        this.key = key;
	    }

	    /**
	    * Used to instantiate a class.
	    *
	    * @class ClassActivator
	    * @constructor
	    */

	    /**
	    * Called by the container to load the dependency from the parent container
	    *
	    * @method get
	    * @param {Container} container The container to resolve the parent from.
	    * @return {Function} Returns the matching instance from the parent container
	    */

	    Parent.prototype.get = function get(container) {
	        return container.parent ? container.parent.get(this.key) : null;
	    };

	    /**
	    * Creates a Parent Resolver for the supplied key.
	    *
	    * @method of
	    * @static
	    * @param {Object} key The key to resolve.
	    * @return {Parent} Returns an insance of Parent for the key.
	    */

	    Parent.of = function of(key) {
	        return new Parent(key);
	    };

	    return Parent;
	})(Resolver);

	exports.Parent = Parent;

	var ClassActivator = (function () {
	    function ClassActivator() {
	        _classCallCheck(this, ClassActivator);
	    }

	    ClassActivator.prototype.invoke = function invoke(fn, args) {
	        return Reflect.construct(fn, args);
	    };

	    return ClassActivator;
	})();

	exports.ClassActivator = ClassActivator;

	ClassActivator.instance = new ClassActivator();
	/**
	* Used to invoke a factory method.
	*
	* @class FactoryActivator
	* @constructor
	*/

	var FactoryActivator = (function () {
	    function FactoryActivator() {
	        _classCallCheck(this, FactoryActivator);
	    }

	    FactoryActivator.prototype.invoke = function invoke(fn, args) {
	        return fn.apply(undefined, args);
	    };

	    return FactoryActivator;
	})();

	exports.FactoryActivator = FactoryActivator;

	FactoryActivator.instance = new FactoryActivator();

/***/ },
/* 21 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/* global global:true */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var _bind = Function.prototype.bind;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	var theGlobal = (function () {
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
	})();
	var emptyMetadata = Object.freeze({});
	var metadataContainerKey = '__metadata__';
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
	        return ((target[metadataContainerKey] || emptyMetadata)[targetKey] || emptyMetadata)[metadataKey];
	    };
	}
	if (typeof theGlobal.Reflect.defineMetadata === 'undefined') {
	    Reflect.defineMetadata = function (metadataKey, metadataValue, target, targetKey) {
	        var metadataContainer = target.hasOwnProperty(metadataContainerKey) ? target[metadataContainerKey] : target[metadataContainerKey] = {};
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
	if (typeof theGlobal.Reflect.construct) {
	    Reflect.construct = function (fn, args) {
	        return new (_bind.apply(fn, [null].concat(_toConsumableArray(args))))();
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
	var Metadata = {
	    global: theGlobal,
	    noop: function noop() {},
	    paramTypes: 'design:paramtypes',
	    properties: 'design:properties',
	    get: function get(metadataKey, target, targetKey) {
	        if (!target) {
	            return undefined;
	        }
	        var result = Metadata.getOwn(metadataKey, target, targetKey);
	        return result === undefined ? Metadata.get(metadataKey, Object.getPrototypeOf(target), targetKey) : result;
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
	        var result = Metadata.getOwn(metadataKey, target, targetKey);
	        if (result === undefined) {
	            result = new Type();
	            Reflect.defineMetadata(metadataKey, result, target, targetKey);
	        }
	        return result;
	    }
	};
	exports.Metadata = Metadata;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.createError = createError;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DIError = (function (_Error) {
	    _inherits(DIError, _Error);

	    function DIError(message) {
	        _classCallCheck(this, DIError);

	        _Error.call(this, message);
	        this.message = message;
	    }

	    DIError.prototype.toString = function toString() {
	        return "[" + this.name + ": " + this.message + "]";
	    };

	    return DIError;
	})(Error);

	exports.DIError = DIError;

	var DIAggregateError = (function (_DIError) {
	    _inherits(DIAggregateError, _DIError);

	    function DIAggregateError(message, errors) {
	        _classCallCheck(this, DIAggregateError);

	        _DIError.call(this, message);
	        this.errors = errors;
	    }

	    DIAggregateError.prototype.toString = function toString() {
	        return "[" + this.name + ": " + this.message + "], errors:" + this.errors;
	    };

	    return DIAggregateError;
	})(DIError);

	exports.DIAggregateError = DIAggregateError;

	function createError(name, message, errors) {
	    var e = undefined;
	    if (errors) {
	        e = new DIAggregateError(message, errors);
	    } else {
	        e = new DIError(message);
	    }
	    e.name = name;
	    return e;
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	var _metadata = __webpack_require__(21);

	_defaults(exports, _interopExportWildcard(_metadata, _defaults));

	var _decorators = __webpack_require__(24);

	_defaults(exports, _interopExportWildcard(_decorators, _defaults));

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _decoratorApplicator = __webpack_require__(25);

	var Decorators = {
	    configure: {
	        parameterizedDecorator: function parameterizedDecorator(name, decorator) {
	            Decorators[name] = function () {
	                var applicator = new _decoratorApplicator.DecoratorApplicator();
	                return applicator[name].apply(applicator, arguments);
	            };
	            _decoratorApplicator.DecoratorApplicator.prototype[name] = function () {
	                var result = decorator.apply(null, arguments);
	                return this.decorator(result);
	            };
	        },
	        simpleDecorator: function simpleDecorator(name, decorator) {
	            Decorators[name] = function () {
	                return new _decoratorApplicator.DecoratorApplicator().decorator(decorator);
	            };
	            _decoratorApplicator.DecoratorApplicator.prototype[name] = function () {
	                return this.decorator(decorator);
	            };
	        }
	    }
	};
	exports.Decorators = Decorators;

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DecoratorApplicator = (function () {
	    function DecoratorApplicator() {
	        _classCallCheck(this, DecoratorApplicator);

	        this._first = null;
	        this._second = null;
	        this._third = null;
	        this._rest = null;
	    }

	    DecoratorApplicator.prototype.decorator = function decorator(_decorator) {
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
	    };

	    DecoratorApplicator.prototype._decorate = function _decorate(target) {
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
	    };

	    return DecoratorApplicator;
	})();

	exports.DecoratorApplicator = DecoratorApplicator;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.autoinject = autoinject;
	exports.inject = inject;
	exports.registration = registration;
	exports.transient = transient;
	exports.singleton = singleton;
	exports.instanceActivator = instanceActivator;
	exports.factory = factory;

	var _metaIndex = __webpack_require__(23);

	var _metadata = __webpack_require__(20);

	var _container = __webpack_require__(19);

	function autoinject(target) {
	    var deco = function deco(target) {
	        target.inject = _metaIndex.Metadata.getOwn(_metaIndex.Metadata.paramTypes, target) || _container.emptyParameters;
	    };
	    return target ? deco(target) : deco;
	}

	function inject() {
	    for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
	        rest[_key] = arguments[_key];
	    }

	    return function (target) {
	        target.inject = rest;
	    };
	}

	function registration(value, targetKey) {
	    return function (target) {
	        _metaIndex.Metadata.define(_metaIndex.Metadata.registration, value, target, targetKey);
	    };
	}

	function transient(key, targetKey) {
	    return registration(new _metadata.TransientRegistration(key), targetKey);
	}

	function singleton(keyOrRegisterInChild, registerInChild, targetKey) {
	    if (registerInChild === undefined) registerInChild = false;

	    return registration(new _metadata.SingletonRegistration(keyOrRegisterInChild, registerInChild), targetKey);
	}

	function instanceActivator(value, targetKey) {
	    return function (target) {
	        _metaIndex.Metadata.define(_metaIndex.Metadata.instanceActivator, value, target, targetKey);
	    };
	}

	function factory() {
	    return instanceActivator(_metadata.FactoryActivator.instance);
	}

	_metaIndex.Decorators.configure.simpleDecorator('autoinject', autoinject);
	_metaIndex.Decorators.configure.parameterizedDecorator('inject', inject);
	_metaIndex.Decorators.configure.parameterizedDecorator('registration', registration);
	_metaIndex.Decorators.configure.parameterizedDecorator('transient', transient);
	_metaIndex.Decorators.configure.parameterizedDecorator('singleton', singleton);
	_metaIndex.Decorators.configure.parameterizedDecorator('instanceActivator', instanceActivator);
	_metaIndex.Decorators.configure.parameterizedDecorator('factory', factory);

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var internal_1 = __webpack_require__(16);
	var utilities_1 = __webpack_require__(6);
	var di_1 = __webpack_require__(17);
	var Repository;
	(function (Repository) {
	    Repository.items = [];
	    function add(type, name, target) {
	        var item = undefined;
	        if (item = utilities_1.find(Repository.items, function (i) {
	            return i.name == name;
	        })) {
	            Repository.items.splice(Repository.items.indexOf(item), 1);
	        }
	        var config = di_1.Metadata.get(internal_1.DIServiceConfig, target);
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
	        return utilities_1.find(Repository.items, function (i) {
	            return i.name == name && i.type == type;
	        });
	    }
	    Repository.get = get;
	    function any(name) {
	        return utilities_1.find(Repository.items, function (i) {
	            return i.name == name;
	        });
	    }
	    Repository.any = any;
	})(Repository = exports.Repository || (exports.Repository = {}));

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	})();

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError('Cannot call a class as a function');
	    }
	}

	var utils = __webpack_require__(6);
	var typings_1 = __webpack_require__(29);
	var templ = __webpack_require__(30);

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
	            var contextName = options.contextName || this.name;
	            return this.resolveTemplate($context, options).then(function (template) {
	                _this.container.registerInstance('template', template, true);
	                var el = template.render();
	                $context.$observe();
	                var controller = _this.container.get(_this.name);
	                $context[contextName] = controller;
	                $context.$unobserve();
	                if (options.el) {
	                    options.el.innerHTML = '';
	                    options.el.appendChild(el);
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
	                return utils.Promise.reject(new typings_1.StickError("no element or template"));
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

/***/ },
/* 29 */
/***/ function(module, exports) {

	/// <reference path="../node_modules/templ/templ" />
	"use strict";

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var StickError = (function (_Error) {
	    _inherits(StickError, _Error);

	    function StickError(message) {
	        _classCallCheck(this, StickError);

	        _get(Object.getPrototypeOf(StickError.prototype), "constructor", this).call(this, message);
	        this.message = message;
	    }

	    return StickError;
	})(Error);

	exports.StickError = StickError;

	var StickDependencyError = (function (_StickError) {
	    _inherits(StickDependencyError, _StickError);

	    function StickDependencyError() {
	        _classCallCheck(this, StickDependencyError);

	        _get(Object.getPrototypeOf(StickDependencyError.prototype), "constructor", this).apply(this, arguments);
	    }

	    return StickDependencyError;
	})(StickError);

	exports.StickDependencyError = StickDependencyError;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var repository_1 = __webpack_require__(31);
	var vnode = __webpack_require__(32);
	var components = __webpack_require__(45);
	var attributes = __webpack_require__(48);
	var modifiers = __webpack_require__(55);
	var utils = __webpack_require__(37);
	var view_1 = __webpack_require__(51);
	var compiler = __webpack_require__(56);
	var binding_1 = __webpack_require__(58);
	exports.version = "$$version$$";
	function attribute(name, attr) {
	    if (typeof attr !== 'function') {
	        attr = utils.extendClass(attributes.BaseAttribute, attr);
	    }
	    attributes[name] = attr;
	}
	exports.attribute = attribute;
	function component(name, cmp) {
	    if (typeof cmp !== 'function') {
	        cmp = utils.extendClass(components.BaseComponent, cmp);
	    }
	    components[name] = cmp;
	}
	exports.component = component;
	function modifier(name, func) {
	    modifiers[name] = func;
	}
	exports.modifier = modifier;
	function debugging(enabled) {
	    utils.Debug.enable(enabled);
	}
	exports.debugging = debugging;
	function compile(str, options) {
	    var vn = vnode,
	        fn = compiler.compile(str);
	    var n = fn(vn.fragment, vn.element, vn.text, vn.comment, vn.dynamic, binding_1.binding);
	    return vn.template(n, utils.extend({
	        document: document,
	        viewClass: view_1.View,
	        attributes: new repository_1.Repository(attributes),
	        components: new repository_1.Repository(components),
	        modifiers: modifiers
	    }, options || {}));
	}
	exports.compile = compile;

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Repository = function () {
	    function Repository(values) {
	        _classCallCheck(this, Repository);

	        this.values = values || {};
	    }

	    Repository.prototype.set = function set(key, value) {
	        this.values[key] = value;
	    };

	    Repository.prototype.get = function get(key) {
	        return this.values[key];
	    };

	    Repository.prototype.has = function has(key) {
	        return !!this.get(key);
	    };

	    Repository.prototype.delete = function _delete(key) {
	        delete this.values[key];
	    };

	    return Repository;
	}();

	exports.Repository = Repository;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(33));
	__export(__webpack_require__(34));
	__export(__webpack_require__(36));
	__export(__webpack_require__(40));
	__export(__webpack_require__(41));
	__export(__webpack_require__(42));
	__export(__webpack_require__(44));
	__export(__webpack_require__(43));
	__export(__webpack_require__(35));

/***/ },
/* 33 */
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
	        return options.document.createComment(this.nodeValue);
	    };

	    return Comment;
	}();

	exports.Comment = Comment;
	exports.comment = function (nodeValue) {
	    return new Comment(nodeValue);
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var vnode_1 = __webpack_require__(35);

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
	        var node = this.vnode.render(options, renderers);
	        renderers.push(new DynamicRenderer(node, this.bindingClass, options));
	        return node;
	    };

	    Dynamic.prototype._renderComponent = function _renderComponent(options, renderers) {
	        var _r = [];
	        var element = this.vnode.render(options, _r);
	        renderers.push(new DynamicComponentRenderer(_r[0], this.bindingClass, options));
	        return element;
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
	        this.renderer.generate(root, view);
	        var component = view.bindings[view.bindings.length - 1];
	        view.bindings.splice(view.bindings.indexOf(component), 0, new this.bindingClass(component, view));
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
	    };

	    return DynamicRenderer;
	}();

/***/ },
/* 35 */
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var utils = __webpack_require__(37);
	var fragmentsection_1 = __webpack_require__(38);
	var nodesection_1 = __webpack_require__(39);

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
	            utils.extend(this.attributes, key);
	        }
	    };

	    Element.prototype._renderComponent = function _renderComponent(component, options, renderers) {
	        var section = new fragmentsection_1.FragmentSection(options.document);
	        renderers.push(new ComponentAttributeRenderer(component, section, this, this._splitAttributes(options), options));
	        return section.render();
	    };

	    Element.prototype._renderElement = function _renderElement(options, renderers) {
	        var element = options.document.createElement(this.tagName);
	        var _attr = this._splitAttributes(options);
	        // Set static attributes
	        for (var attrKey in _attr.staticAttributes) {
	            element.setAttribute(attrKey, _attr.staticAttributes[attrKey]);
	        }
	        for (var _iterator = this.childNodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;

	            if (_isArray) {
	                if (_i >= _iterator.length) break;
	                _ref = _iterator[_i++];
	            } else {
	                _i = _iterator.next();
	                if (_i.done) break;
	                _ref = _i.value;
	            }

	            var child = _ref;

	            element.appendChild(child.render(options, renderers));
	        }
	        // Set dynamic attributes
	        if (Object.keys(_attr.dynamicAttributes).length) {
	            renderers.push(new ElementAttributeRenderer(new nodesection_1.NodeSection(options.document, element), options, _attr.dynamicAttributes));
	        }
	        return element;
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
/* 37 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function extend(obj) {
	    var a = undefined,
	        k = undefined;

	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	    }

	    for (var _iterator = args, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	        if (_isArray) {
	            if (_i >= _iterator.length) break;
	            a = _iterator[_i++];
	        } else {
	            _i = _iterator.next();
	            if (_i.done) break;
	            a = _i.value;
	        }

	        if (a !== Object(a)) continue;
	        for (k in a) {
	            obj[k] = a[k];
	        }
	    }
	    return obj;
	}
	exports.extend = extend;
	function slice(obj) {
	    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	    }

	    return Array.prototype.slice.apply(obj, args);
	}
	exports.slice = slice;
	function extendClass(parent, protoProps, staticProps) {
	    var child;
	    // The constructor function for the new subclass is either defined by you
	    // (the "constructor" property in your `extend` definition), or defaulted
	    // by us to simply call the parent constructor.
	    if (protoProps && Object.prototype.hasOwnProperty.call(protoProps, 'constructor')) {
	        child = protoProps.constructor;
	    } else {
	        child = function child() {
	            return parent.apply(this, arguments);
	        };
	    }
	    // Add static properties to the constructor function, if supplied.
	    extend(child, parent, staticProps);
	    // Set the prototype chain to inherit from `parent`, without calling
	    // `parent` constructor function.
	    var Surrogate = function Surrogate() {
	        this.constructor = child;
	    };
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate();
	    // Add prototype properties (instance properties) to the subclass,
	    // if supplied.
	    if (protoProps) extend(child.prototype, protoProps);
	    // Set a convenience property in case the parent's prototype is needed
	    // later.
	    child.__super__ = parent.prototype;
	    return child;
	}
	exports.extendClass = extendClass;
	;
	var nativeBind = Function.prototype.bind;
	function bind(method, context) {
	    for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
	        args[_key3 - 2] = arguments[_key3];
	    }

	    if (typeof method !== 'function') throw new Error('method not at function');
	    if (nativeBind != null) return nativeBind.call.apply(nativeBind, [method, context].concat(args));
	    args = args || [];
	    var fnoop = function fnoop() {};
	    var fBound = function fBound() {
	        var ctx = this instanceof fnoop ? this : context;
	        return method.apply(ctx, args.concat(slice(arguments)));
	    };
	    fnoop.prototype = this.prototype;
	    fBound.prototype = new fnoop();
	    return fBound;
	}
	exports.bind = bind;

	var Debug = function () {
	    function Debug(namespace) {
	        _classCallCheck(this, Debug);

	        this.enabled = false;
	        this.namespace = namespace;
	    }

	    Debug.enable = function enable(enabled, namespace) {
	        for (var k in this.loggers) {
	            if (namespace && k === namespace) {
	                this.loggers[k].enabled = enabled;
	            } else if (!namespace) {
	                this.loggers[k].enabled = enabled;
	            }
	        }
	    };

	    Debug.create = function create(namespace) {
	        var logger = undefined;
	        if (this.loggers[namespace]) {
	            logger = this.loggers[namespace].debug;
	        } else {
	            logger = new Debug(namespace);
	            this.loggers[namespace] = logger;
	        }
	        return bind(logger.debug, logger);
	    };

	    Debug.prototype.debug = function debug() {
	        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	            args[_key4] = arguments[_key4];
	        }

	        if (!this.enabled) return;
	        args[0] = this._coerce(args[0]);
	        if ('string' !== typeof args[0]) {
	            // anything else let's inspect with %o
	            args = ['%o'].concat(args);
	        }
	        // apply any `formatters` transformations
	        var index = 0;
	        args[0] = args[0].replace(/%([a-z%])/g, function (match, format) {
	            // if we encounter an escaped % then don't increase the array index
	            if (match === '%%') return match;
	            index++;
	            var formatter = Debug.formatters[format];
	            if ('function' === typeof formatter) {
	                var val = args[index];
	                match = formatter.call(self, val);
	                // now we need to remove `args[index]` since it's inlined in the `format`
	                args.splice(index, 1);
	                index--;
	            }
	            return match;
	        });
	        args = this._formatArgs(args);
	        this._log.apply(this, args);
	    };

	    Debug.prototype._log = function _log() {
	        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	            args[_key5] = arguments[_key5];
	        }

	        return 'object' === (typeof console === 'undefined' ? 'undefined' : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
	    };

	    Debug.prototype._coerce = function _coerce(val) {
	        if (val instanceof Error) return val.stack || val.message;
	        return val;
	    };

	    Debug.prototype._formatArgs = function _formatArgs(args) {
	        args[0] = '[templ:' + this.namespace + '] ' + args[0];
	        return args;
	    };

	    return Debug;
	}();

	Debug.loggers = {};
	Debug.formatters = {
	    j: function j(args) {
	        return JSON.stringify(args);
	    }
	};
	exports.Debug = Debug;
	function debug(namespace) {
	    return Debug.create(namespace);
	}
	exports.debug = debug;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var vnode_1 = __webpack_require__(35);

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
	        }
	    }

	    FragmentSection.prototype.appendChild = function appendChild(node) {
	        //console.log(document.body.appendChild(node))
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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var vnode_1 = __webpack_require__(35);

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
/* 40 */
/***/ function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
	        var fragment = options.document.createDocumentFragment();
	        for (var i = 0, n = this.childNodes.length; i < n; i++) {
	            fragment.appendChild(this.childNodes[i].render(options, renderers));
	        }
	        return fragment;
	    };

	    return Fragment;
	}();

	exports.Fragment = Fragment;
	exports.fragment = function (children) {
	    return new Fragment(children);
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var fragmentsection_1 = __webpack_require__(38);
	var nodesection_1 = __webpack_require__(39);
	function section(document, node) {
	    var section = undefined;
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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var section_1 = __webpack_require__(41);
	var view_1 = __webpack_require__(43);

	var Template = function () {
	    function Template(vnode, options) {
	        _classCallCheck(this, Template);

	        this._renderers = [];
	        this.vnode = vnode;
	        var node = vnode.render(options, this._renderers);
	        this.section = section_1.section(options.document, node);
	        this.options = options;
	    }

	    Template.prototype.view = function view(context, options) {
	        var sec = this.section.clone();
	        var DestView = this.options.viewClass || view_1.View;
	        var view = new DestView(sec, this, context, options);
	        for (var _iterator = this._renderers, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;

	            if (_isArray) {
	                if (_i >= _iterator.length) break;
	                _ref = _iterator[_i++];
	            } else {
	                _i = _iterator.next();
	                if (_i.done) break;
	                _ref = _i.value;
	            }

	            var renderer = _ref;

	            renderer.generate(sec.node || sec.start.parentNode, view);
	        }
	        return view;
	    };

	    return Template;
	}();

	exports.Template = Template;
	function template(vnode, options) {
	    return new Template(vnode, options);
	}
	exports.template = template;

/***/ },
/* 43 */
/***/ function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var View = function () {
	    function View(section, template, context, options) {
	        _classCallCheck(this, View);

	        this.section = section;
	        this.template = template;
	        this.context = context;
	        this.bindings = [];
	    }

	    View.prototype.update = function update() {
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

	            binding.update();
	        }
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
	        return this.section.render();
	    };

	    View.prototype.remove = function remove() {
	        for (var _iterator2 = this.bindings, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	            var _ref2;

	            if (_isArray2) {
	                if (_i2 >= _iterator2.length) break;
	                _ref2 = _iterator2[_i2++];
	            } else {
	                _i2 = _iterator2.next();
	                if (_i2.done) break;
	                _ref2 = _i2.value;
	            }

	            var binding = _ref2;

	            binding.destroy();
	        }
	        return this.section.remove();
	    };

	    return View;
	}();

	exports.View = View;

/***/ },
/* 44 */
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
	        return options.document.createTextNode(this.nodeValue);
	    };

	    return Text;
	}();

	exports.Text = Text;
	exports.text = function text(nodeValue) {
	    return new Text(nodeValue);
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(46));
	__export(__webpack_require__(47));

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var template_1 = __webpack_require__(42);
	var fragment_1 = __webpack_require__(40);

	var BaseComponent = function () {
	    function BaseComponent(section, vvnode, attributes, view) {
	        _classCallCheck(this, BaseComponent);

	        this.section = section;
	        this.vnode = vvnode;
	        this.attributes = attributes;
	        this.view = view;
	        this.document = view.template.options.document;
	        if (vvnode.childNodes) this.childTemplate = template_1.template(fragment_1.fragment(vvnode.childNodes), view.template.options);
	        for (var key in attributes) {
	            this.setAttribute(key, attributes[key]);
	        }this.initialize();
	    }

	    BaseComponent.prototype.initialize = function initialize() {};

	    BaseComponent.prototype.setAttribute = function setAttribute(key, value) {
	        this.attributes[key] = value;
	    };

	    BaseComponent.prototype.removeAttribute = function removeAttribute(key) {
	        this.attributes[key] = void 0;
	    };

	    BaseComponent.prototype.destroy = function destroy() {};

	    return BaseComponent;
	}();

	exports.BaseComponent = BaseComponent;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var component_1 = __webpack_require__(46);
	function _each(target, iterate) {
	    if (!target) return;
	    if (target.forEach) {
	        // use API here since target could be an object
	        target.forEach(iterate);
	    } else {
	        for (var key in target) {
	            if (target.hasOwnProperty(key)) iterate(target[key], key);
	        }
	    }
	}

	var Repeat = function (_component_1$BaseComp) {
	    _inherits(Repeat, _component_1$BaseComp);

	    function Repeat() {
	        _classCallCheck(this, Repeat);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        var _this = _possibleConstructorReturn(this, _component_1$BaseComp.call.apply(_component_1$BaseComp, [this].concat(args)));

	        _this._children = [];
	        return _this;
	    }

	    Repeat.prototype.update = function update() {
	        var as = this['as'];
	        var each = this['each'];
	        var key = this['key'] || "key";
	        var n = 0;
	        var self = this;
	        var parent = this.view;
	        var properties;
	        _each(each, function (model, k) {
	            var child;
	            if (as) {
	                properties = {};
	                properties[key] = k;
	                properties[as] = model;
	            } else {
	                properties = model;
	            }
	            // TODO - provide SAME context here for speed and stability
	            if (n >= self._children.length) {
	                child = self.childTemplate.view(properties, {
	                    parent: parent
	                });
	                self._children.push(child);
	                self.section.appendChild(child.render(properties));
	            } else {
	                child = self._children[n];
	                child.context = properties;
	                child.update();
	            }
	            n++;
	        });
	        this._children.splice(n).forEach(function (child) {
	            child.remove();
	        });
	    };

	    Repeat.prototype.setAttribute = function setAttribute(key, value) {
	        this[key] = value;
	    };

	    return Repeat;
	}(component_1.BaseComponent);

	exports.Repeat = Repeat;
	exports.repeat = Repeat;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	var value_1 = __webpack_require__(49);
	var event_1 = __webpack_require__(52);
	var style_1 = __webpack_require__(53);
	var focus_1 = __webpack_require__(54);
	__export(__webpack_require__(50));
	exports.value = value_1.ValueAttribute;
	exports.onclick = event_1.ClickAttribute;
	exports.onenter = event_1.OnEnterAttribute;
	exports.onescape = event_1.OnEscapeAttribute;
	exports.checked = value_1.ValueAttribute;
	exports.style = style_1.StyleAttribute;
	exports.focus = focus_1.FocusAttribute;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var base_1 = __webpack_require__(50);
	var view_1 = __webpack_require__(51);
	var utils = __webpack_require__(37);
	var _events = ['change', 'keyup', 'input'];

	var ValueAttribute = function (_base_1$BaseAttribute) {
	    _inherits(ValueAttribute, _base_1$BaseAttribute);

	    function ValueAttribute() {
	        _classCallCheck(this, ValueAttribute);

	        return _possibleConstructorReturn(this, _base_1$BaseAttribute.apply(this, arguments));
	    }

	    ValueAttribute.prototype.initialize = function initialize() {
	        this._onInput = utils.bind(this._onInput, this, null);
	        for (var _iterator = _events, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;

	            if (_isArray) {
	                if (_i >= _iterator.length) break;
	                _ref = _iterator[_i++];
	            } else {
	                _i = _iterator.next();
	                if (_i.done) break;
	                _ref = _i.value;
	            }

	            var e = _ref;

	            this.ref.addEventListener(e, this._onInput);
	        }
	    };

	    ValueAttribute.prototype.update = function update() {
	        var model = this.model = this.value;
	        if (!model) return;
	        if (!model || !(model instanceof view_1.Reference)) {
	            throw new Error("input value must be a reference. Make sure you have <~> defined");
	        }
	        if (model.gettable) {
	            this._elementValue(this._parseValue(model.value()));
	        }
	    };

	    ValueAttribute.prototype._parseValue = function _parseValue(value) {
	        if (value == null || value === "") return void 0;
	        return value;
	    };

	    ValueAttribute.prototype._onInput = function _onInput(event) {
	        clearInterval(this._autocompleteCheckInterval);
	        // ignore some keys
	        if (event && (!event.keyCode || ! ~[27].indexOf(event.keyCode))) {
	            event.stopPropagation();
	        }
	        var value = this._parseValue(this._elementValue());
	        if (!this.model) return;
	        if (String(this.model.value()) == String(value)) return;
	        this.model.value(value);
	    };

	    ValueAttribute.prototype._elementValue = function _elementValue(value) {
	        var node = this.ref;
	        var isCheckbox = /checkbox/.test(node.type);
	        var isRadio = /radio/.test(node.type);
	        var isRadioOrCheckbox = isCheckbox || isRadio;
	        var hasValue = Object.prototype.hasOwnProperty.call(node, "value");
	        var isInput = hasValue || /input|textarea|checkbox/.test(node.nodeName.toLowerCase());
	        if (!arguments.length) {
	            if (isCheckbox) {
	                return Boolean(node.checked);
	            } else if (isInput) {
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
	        } else if (String(value) !== this._elementValue()) {
	            if (isInput) {
	                node.value = value;
	            } else {
	                node.innerHTML = value;
	            }
	        }
	    };

	    return ValueAttribute;
	}(base_1.BaseAttribute);

	exports.ValueAttribute = ValueAttribute;

/***/ },
/* 50 */
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

	    BaseAttribute.prototype.update = function update() {};

	    BaseAttribute.prototype.destroy = function destroy() {};

	    BaseAttribute.test = function test() {};

	    return BaseAttribute;
	}();

	exports.BaseAttribute = BaseAttribute;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var utils = __webpack_require__(37);
	var vnode = __webpack_require__(32);
	var debug = utils.debug('view');
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

	    return Reference;
	}();

	exports.Reference = Reference;

	var Assignment = function () {
	    function Assignment(view, path, value) {
	        _classCallCheck(this, Assignment);

	        this.view = view;
	        this.path = path;
	        this.value = value;
	        this.assign = utils.bind(this.assign, this);
	        this.toString = utils.bind(this.toString, this);
	    }

	    Assignment.prototype.assign = function assign(value) {
	        this.view.set(this.path, this.value.call(this));
	    };

	    Assignment.prototype.toString = function toString() {
	        var val = this.value.call(this);
	        return val ? String(val) : '';
	    };

	    return Assignment;
	}();

	exports.Assignment = Assignment;

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
	        this.update();
	    };

	    View.prototype.render = function render() {
	        this.update();
	        var section = _vnode$View.prototype.render.call(this);
	        //this.transitions.enter();
	        return section;
	    };

	    View.prototype.ref = function ref(path, gettable, settable) {
	        debug('reference %s, gettable: %o, settabble: %o', path, gettable, settable);
	        return new Reference(this, path, gettable, settable);
	    };

	    View.prototype.assign = function assign(path, value) {
	        debug('assignment %s %s', path, value);
	        return new Assignment(this, path, value);
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
	        try {
	            v = caller.call(this.context, params);
	        } catch (e) {
	            console.error('could not call', e);
	        }
	        return v != void 0 ? v : this.parent ? this.parent.call(keypath, params) : void 0;
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var base_1 = __webpack_require__(50);
	var view_1 = __webpack_require__(51);
	var utils = __webpack_require__(37);
	var debug = utils.debug('attributes:event');

	var EventAttribute = function (_base_1$BaseAttribute) {
	    _inherits(EventAttribute, _base_1$BaseAttribute);

	    function EventAttribute() {
	        _classCallCheck(this, EventAttribute);

	        return _possibleConstructorReturn(this, _base_1$BaseAttribute.apply(this, arguments));
	    }

	    EventAttribute.prototype.initialize = function initialize() {
	        this._onEvent = utils.bind(this._onEvent, this);
	        //if (!this.event) this.event = this.key.match(/on(.+)/)[1].toLowerCase();
	        //debug('added event listener %s: %o', this.event, this.value)
	        //this.view.addListener(<Element>this.ref, this.event, this._onEvent)
	    };

	    EventAttribute.prototype._onEvent = function _onEvent(e) {
	        var self = this;
	        var fn = undefined;
	        if (this.value instanceof view_1.Assignment) {
	            fn = this.value.assign;
	        } else {
	            fn = this.value;
	        }
	        if (typeof fn !== 'function') {
	            throw new Error('[event] value is not a function');
	        }
	        debug('fired event: %s', this._event);
	        fn(e);
	    };

	    EventAttribute.prototype.destroy = function destroy() {
	        debug('removed event listener %s: %o', this._event, this.value);
	        this.view.removeListener(this.ref, this._event, this._onEvent);
	    };

	    _createClass(EventAttribute, [{
	        key: 'event',
	        set: function set(event) {
	            if (this._event) {
	                debug('added event listener %s: %o', this._event, this.value);
	                this.view.removeListener(this.ref, this._event, this._onEvent);
	            }
	            this._event = event;
	            debug('added event listener %s: %o', this._event, this.value);
	            this.view.addListener(this.ref, this._event, this._onEvent);
	        },
	        get: function get() {
	            return this._event;
	        }
	    }]);

	    return EventAttribute;
	}(base_1.BaseAttribute);

	exports.EventAttribute = EventAttribute;

	var KeyCodeAttribute = function (_EventAttribute) {
	    _inherits(KeyCodeAttribute, _EventAttribute);

	    function KeyCodeAttribute(ref, key, value, view) {
	        _classCallCheck(this, KeyCodeAttribute);

	        var _this2 = _possibleConstructorReturn(this, _EventAttribute.call(this, ref, key, value, view));
	        //this.event = "keydown"
	        //this.keyCodes = []

	        _this2.keyCodes = [];
	        _this2.event = "keydown";
	        return _this2;
	    }

	    KeyCodeAttribute.prototype._onEvent = function _onEvent(event) {
	        if (! ~this.keyCodes.indexOf(event.keyCode)) {
	            return;
	        }
	        _EventAttribute.prototype._onEvent.call(this, event);
	    };

	    return KeyCodeAttribute;
	}(EventAttribute);

	exports.KeyCodeAttribute = KeyCodeAttribute;

	var ClickAttribute = function (_EventAttribute2) {
	    _inherits(ClickAttribute, _EventAttribute2);

	    function ClickAttribute() {
	        _classCallCheck(this, ClickAttribute);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        var _this3 = _possibleConstructorReturn(this, _EventAttribute2.call.apply(_EventAttribute2, [this].concat(args)));

	        _this3.event = "click";
	        return _this3;
	    }

	    return ClickAttribute;
	}(EventAttribute);

	exports.ClickAttribute = ClickAttribute;

	var OnEnterAttribute = function (_KeyCodeAttribute) {
	    _inherits(OnEnterAttribute, _KeyCodeAttribute);

	    function OnEnterAttribute() {
	        _classCallCheck(this, OnEnterAttribute);

	        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	            args[_key2] = arguments[_key2];
	        }

	        var _this4 = _possibleConstructorReturn(this, _KeyCodeAttribute.call.apply(_KeyCodeAttribute, [this].concat(args)));

	        _this4.keyCodes = [13];
	        return _this4;
	    }

	    return OnEnterAttribute;
	}(KeyCodeAttribute);

	exports.OnEnterAttribute = OnEnterAttribute;

	var OnEscapeAttribute = function (_KeyCodeAttribute2) {
	    _inherits(OnEscapeAttribute, _KeyCodeAttribute2);

	    function OnEscapeAttribute() {
	        _classCallCheck(this, OnEscapeAttribute);

	        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	            args[_key3] = arguments[_key3];
	        }

	        var _this5 = _possibleConstructorReturn(this, _KeyCodeAttribute2.call.apply(_KeyCodeAttribute2, [this].concat(args)));

	        _this5.KeyCodes = [27];
	        return _this5;
	    }

	    return OnEscapeAttribute;
	}(KeyCodeAttribute);

	exports.OnEscapeAttribute = OnEscapeAttribute;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var base_1 = __webpack_require__(50);

	var StyleAttribute = function (_base_1$BaseAttribute) {
	    _inherits(StyleAttribute, _base_1$BaseAttribute);

	    function StyleAttribute() {
	        _classCallCheck(this, StyleAttribute);

	        return _possibleConstructorReturn(this, _base_1$BaseAttribute.apply(this, arguments));
	    }

	    StyleAttribute.prototype.initialize = function initialize() {
	        this._currentStyles = {};
	    };

	    StyleAttribute.prototype.update = function update() {
	        var styles = this.value;
	        if (typeof styles === "string") {
	            this.ref.setAttribute("style", styles);
	            return;
	        }
	        var newStyles = {};
	        for (var name in styles) {
	            var style = styles[name];
	            if (style !== this._currentStyles[name]) {
	                newStyles[name] = this._currentStyles[name] = style || "";
	            }
	        }
	        for (var key in newStyles) {
	            this.ref.style[key] = newStyles[key];
	        }
	    };

	    return StyleAttribute;
	}(base_1.BaseAttribute);

	exports.StyleAttribute = StyleAttribute;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var base_1 = __webpack_require__(50);

	var FocusAttribute = function (_base_1$BaseAttribute) {
	    _inherits(FocusAttribute, _base_1$BaseAttribute);

	    function FocusAttribute() {
	        _classCallCheck(this, FocusAttribute);

	        return _possibleConstructorReturn(this, _base_1$BaseAttribute.apply(this, arguments));
	    }

	    FocusAttribute.prototype.initialize = function initialize() {};

	    FocusAttribute.prototype.update = function update() {
	        if (!this.value) return;
	        if (this.ref.focus) {
	            var self = this;
	            //if (!process.browser) return this.node.focus();
	            // focus after being on screen. Need to break out
	            // of animation, so setTimeout is the best option
	            setTimeout(function () {
	                self.ref.focus();
	            }, 1);
	        }
	    };

	    return FocusAttribute;
	}(base_1.BaseAttribute);

	exports.FocusAttribute = FocusAttribute;

/***/ },
/* 55 */
/***/ function(module, exports) {

	"use strict";

	function uppercase(value) {
	    return String(value).toUpperCase();
	}
	exports.uppercase = uppercase;
	function lowercase(value) {
	    return String(value).toLowerCase();
	}
	exports.lowercase = lowercase;
	function titlecase(value) {
	    var str;
	    str = String(value);
	    return str.substr(0, 1).toUpperCase() + str.substr(1);
	}
	exports.titlecase = titlecase;
	function json(value, count, delimiter) {
	    return JSON.stringify.apply(JSON, arguments);
	}
	exports.json = json;
	function isNaN(value) {
	    return isNaN(value);
	}
	exports.isNaN = isNaN;
	exports.round = Math.round;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var parser_1 = __webpack_require__(57);
	function compile(src, options) {
	    var str = transpile(src);
	    return new Function("return " + str)();
	}
	exports.compile = compile;
	function transpile(source) {
	    var transpiler = new Transpiler();
	    return transpiler.transpile(source);
	}
	exports.transpile = transpile;
	/**
	 * Transpile AST to Function
	 */

	var Transpiler = function () {
	    function Transpiler() {
	        _classCallCheck(this, Transpiler);

	        for (var k in this) {
	            if (k.charAt(0) === "_") {
	                this[k] = this[k].bind(this);
	            }
	        }
	        this.transpile = this.transpile.bind(this);
	    }
	    /**
	     */

	    Transpiler.prototype.transpile = function transpile(source) {
	        return this._root(parser_1.parser.parse(source));
	    };
	    /**
	     */

	    Transpiler.prototype._root = function _root(elements) {
	        var buffer = "(function(fragment, element, text, comment, dynamic, createBindingClass) {";
	        var fragment = "fragment([" + this._children(elements) + "])";
	        buffer += "'use strict';return " + fragment;
	        buffer += "})";
	        return buffer;
	    };
	    /**
	     */

	    Transpiler.prototype._expression = function _expression(expression) {
	        return this["_" + expression[0]](expression);
	    };
	    /**
	     * check for stuff like <li repeat.each={{items}}></li>
	     */

	    Transpiler.prototype._element = function _element(expression) {
	        var exprs = {};
	        var prev = expression;
	        var attrs = [];
	        expression[2].forEach(function (attr, i) {
	            var key = attr[1];
	            var value = attr[2];
	            var keyParts = key.split(".");
	            // check for things like <li repeat.each={{items}}></li>
	            if (keyParts.length > 1) {
	                if (!exprs[keyParts[0]]) {
	                    expression = exprs[keyParts[0]] = ["element", keyParts[0], [], [["element", expression[1], attrs, expression[3]]]];
	                }
	                exprs[keyParts[0]][2].push([attr[0], keyParts[1], value]);
	            } else {
	                attrs.push(attr);
	            }
	        });
	        return this._element2(expression);
	    };
	    /**
	     */

	    Transpiler.prototype._doctype = function _doctype(expression) {
	        return "text('<!DOCTYPE " + expression[1] + ">')";
	    };
	    /**
	     */

	    Transpiler.prototype._children = function _children(children) {
	        var items = [];
	        children = children.concat();
	        while (children.length) {
	            var child = children[children.length - 1];
	            if (child[0] !== "text") break;
	            child[1] = child[1].replace(/[\s\r\n\t]+$/, "");
	            if (/^[\s\r\n\t]*$/.test(child[1])) {
	                children.pop();
	            } else {
	                break;
	            }
	        }
	        return children.map(this._expression).join(", ");
	    };
	    /**
	     */

	    Transpiler.prototype._element2 = function _element2(expression) {
	        var buffer = "element('" + expression[1] + "'";
	        var dynamicAttributes = [];
	        buffer += ", {";
	        var attrs = [];
	        buffer += expression[2].map(function (attr) {
	            var key = attr[1];
	            var value = attr[2];
	            if (!value.length || value.length === 1 && value[0][0] === "string") {
	                return "'" + key + "':" + (value.length ? this._expression(value[0]) : "true");
	            } else {
	                dynamicAttributes.push(attr);
	            }
	        }.bind(this)).filter(function (str) {
	            return !!str;
	        }).join(",");
	        buffer += "}";
	        var childBuffer = this._children(expression[3]);
	        if (childBuffer.length) {
	            buffer += ", " + childBuffer;
	        }
	        buffer += ")";
	        if (dynamicAttributes.length) {
	            var dynamicAttrBuffer = "";
	            var staticAttrBuffer = "";
	            dynamicAttributes.forEach(function (expression) {
	                var type = expression[0];
	                // var key  = _dashToCamelCase(expression[1]);
	                dynamicAttrBuffer += "this";
	                if (type === "block") {
	                    dynamicAttrBuffer += ".ref.nodeValue = " + this._expression(expression[1]);
	                } else if (type === "attribute") {
	                    var value = expression[2].map(function (expr) {
	                        return "(" + this._expression(expr) + ")";
	                    }.bind(this)).join("+");
	                    dynamicAttrBuffer += ".setAttribute('" + expression[1] + "', " + value + ");";
	                } else if (type === "property") {
	                    // dynamicAttrBuffer += ".ref." + expression[1] + "=" + this._expression(expression[2]);
	                    dynamicAttrBuffer += ".setProperty('" + expression[1] + "', " + this._expression(expression[2]) + ");";
	                }
	            }.bind(this));
	            if (dynamicAttrBuffer.length) {
	                dynamicAttrBuffer = "function(context) {" + dynamicAttrBuffer + "}";
	            }
	            if (staticAttrBuffer.length) {
	                staticAttrBuffer = "function() { var self = this; " + staticAttrBuffer + "}";
	            }
	            if (dynamicAttrBuffer.length || staticAttrBuffer.length) {
	                buffer = "dynamic(" + buffer + ",";
	                buffer += "createBindingClass(" + (staticAttrBuffer.length ? staticAttrBuffer : "void 0") + ", " + (dynamicAttrBuffer ? dynamicAttrBuffer : "void 0") + ")";
	                buffer += ")";
	            }
	        }
	        return buffer;
	    };
	    /**
	     */

	    Transpiler.prototype.__addReference = function __addReference(expression) {
	        var name = "_" + ++this._refCounter;
	        this._refs[name] = expression;
	        return name;
	    };
	    /**
	     */

	    Transpiler.prototype._block = function _block(expression) {
	        // TODO - check for unbound expressions here
	        var buffer = "dynamic(text(), createBindingClass(void 0, function(context) {";
	        buffer += "this.ref.nodeValue = " + this._expression(expression[1]) + ";";
	        return buffer + "}))";
	    };
	    /**
	     */

	    Transpiler.prototype._text = function _text(expression) {
	        return "text('" + expression[1] + "')";
	    };
	    /**
	     */

	    Transpiler.prototype._comment = function _comment(expression) {
	        return "comment('" + expression[1] + "')";
	    };
	    /**
	     */

	    Transpiler.prototype._hash = function _hash(expression) {
	        var items = expression[1];
	        var buffer = [];
	        for (var key in items) {
	            buffer.push("'" + key + "':" + this._expression(items[key]));
	        }
	        return "{" + buffer.join(",") + "}";
	    };
	    /**
	     */

	    Transpiler.prototype._script = function _script(expression) {
	        return this._expression(expression[1]);
	    };
	    /**
	     */

	    Transpiler.prototype._referenceKeyPath = function _referenceKeyPath(expression) {
	        var keypath = [];
	        var isDynamic = false;
	        expression.forEach(function (part) {
	            if (typeof part !== "string") {
	                isDynamic = true;
	                // console.log(expression);
	                keypath.push(this._expression(part));
	            } else {
	                keypath.push(part);
	            }
	        }.bind(this));
	        keypath = isDynamic ? "[" + keypath.map(function (part, i) {
	            return typeof expression[i] === "string" ? "'" + part + "'" : part;
	        }).join(",") + "]" : "'" + keypath.join(".") + "'";
	        return keypath;
	    };
	    /**
	     */

	    Transpiler.prototype._reference = function _reference(expression) {
	        var keypath = this._referenceKeyPath(expression[1]);
	        if (expression[2]) {
	            var gettable = !! ~expression[2].indexOf("<~");
	            var settable = !! ~expression[2].indexOf("~>");
	            return "this.view.ref(" + keypath + ", " + gettable + ", " + settable + ")";
	        }
	        return "this.view.get(" + keypath + ")";
	    };
	    /**
	     */

	    Transpiler.prototype._string = function _string(expression) {
	        return "'" + expression[1] + "'";
	    };
	    /**
	     */

	    Transpiler.prototype._operator = function _operator(expression) {
	        return this._expression(expression[2]) + expression[1] + this._expression(expression[3]);
	    };
	    /**
	     */

	    Transpiler.prototype._condition = function _condition(expression) {
	        return this._expression(expression[1]) + "?" + this._expression(expression[2]) + ":" + this._expression(expression[3]);
	    };
	    /**
	     */

	    Transpiler.prototype._literal = function _literal(expression) {
	        return expression[1];
	    };
	    /**
	     */

	    Transpiler.prototype._not = function _not(expression) {
	        return "!" + this._expression(expression[1]);
	    };
	    /**
	     */

	    Transpiler.prototype._negative = function _negative(expression) {
	        return "-" + this._expression(expression[1]);
	    };
	    /**
	     */

	    Transpiler.prototype._call = function _call(expression) {
	        var buffer = "this.view.call(" + this._referenceKeyPath(expression[1][1]) + ", [";
	        buffer += expression[2].map(this._expression).join(",");
	        return buffer + "])";
	    };
	    /**
	     */

	    Transpiler.prototype._modifier = function _modifier(expression) {
	        return "this.options.modifiers." + expression[1] + "(" + expression[2].map(this._expression).join(",") + ")";
	    };

	    Transpiler.prototype._assign = function _assign(expression) {
	        return 'this.view.assign("' + expression[1][1] + '", ' + 'function () { return ' + this._expression(expression[2]) + ';})';
	    };
	    /**
	     */

	    Transpiler.prototype._group = function _group(expression) {
	        return "(" + this._expression(expression[1]) + ")";
	    };
	    /**
	     */

	    Transpiler.prototype.__findExpressions = function __findExpressions(type, expr) {
	        var exprs = [];
	        this.__traverse(expr, function (expr) {
	            if (expr[0] === type) exprs.push(expr);
	        });
	        return exprs;
	    };
	    /**
	     */

	    Transpiler.prototype.__traverse = function __traverse(expr, iterator) {
	        iterator(expr);
	        expr.forEach(function (v) {
	            if (v && (typeof v === "undefined" ? "undefined" : _typeof(v)) === "object") {
	                this.__traverse(v, iterator);
	            }
	        }.bind(this));
	    };

	    return Transpiler;
	}();
	/**
	 */

	function _dashToCamelCase(string) {
	    return string.split("-").map(function (part, i) {
	        var p = part.toLowerCase();
	        return i > 0 ? p.charAt(0).toUpperCase() + p.substr(1) : p;
	    }).join("");
	}
	/**
	 */

/***/ },
/* 57 */
/***/ function(module, exports) {

	"use strict";

	exports.parser = function () {
	    "use strict";
	    /*
	     * Generated by PEG.js 0.9.0.
	     *
	     * http://pegjs.org/
	     */

	    function peg$subclass(child, parent) {
	        function ctor() {
	            this.constructor = child;
	        }
	        ctor.prototype = parent.prototype;
	        child.prototype = new ctor();
	    }
	    function peg$SyntaxError(message, expected, found, location) {
	        this.message = message;
	        this.expected = expected;
	        this.found = found;
	        this.location = location;
	        this.name = "SyntaxError";
	        if (typeof Error.captureStackTrace === "function") {
	            Error.captureStackTrace(this, peg$SyntaxError);
	        }
	    }
	    peg$subclass(peg$SyntaxError, Error);
	    function peg$parse(input) {
	        var options = arguments.length > 1 ? arguments[1] : {},
	            parser = this,
	            peg$FAILED = {},
	            peg$startRuleFunctions = { Start: peg$parseStart },
	            peg$startRuleFunction = peg$parseStart,
	            peg$c0 = function peg$c0(children) {
	            return children;
	        },
	            peg$c1 = "<!DOCTYPE",
	            peg$c2 = { type: "literal", value: "<!DOCTYPE", description: "\"<!DOCTYPE\"" },
	            peg$c3 = /^[^>]/,
	            peg$c4 = { type: "class", value: "[^>]", description: "[^>]" },
	            peg$c5 = ">",
	            peg$c6 = { type: "literal", value: ">", description: "\">\"" },
	            peg$c7 = function peg$c7(info) {
	            return ["doctype", info.join("")];
	        },
	            peg$c8 = function peg$c8(children) {
	            return trimTextExpressions(children);
	        },
	            peg$c9 = "<!--",
	            peg$c10 = { type: "literal", value: "<!--", description: "\"<!--\"" },
	            peg$c11 = "-->",
	            peg$c12 = { type: "literal", value: "-->", description: "\"-->\"" },
	            peg$c13 = function peg$c13(v) {
	            return v;
	        },
	            peg$c14 = function peg$c14(value) {
	            return ["comment", escapeString(trimEnds(value.join("")))];
	        },
	            peg$c15 = "<script",
	            peg$c16 = { type: "literal", value: "<script", description: "\"<script\"" },
	            peg$c17 = "</script>",
	            peg$c18 = { type: "literal", value: "</script>", description: "\"</script>\"" },
	            peg$c19 = function peg$c19(attributes, content) {
	            return ["element", "script", attributes, [["text", escapeString(content.join(""))]]];
	        },
	            peg$c20 = function peg$c20() {
	            return text();
	        },
	            peg$c21 = "<",
	            peg$c22 = { type: "literal", value: "<", description: "\"<\"" },
	            peg$c23 = "area",
	            peg$c24 = { type: "literal", value: "area", description: "\"area\"" },
	            peg$c25 = "base",
	            peg$c26 = { type: "literal", value: "base", description: "\"base\"" },
	            peg$c27 = "br",
	            peg$c28 = { type: "literal", value: "br", description: "\"br\"" },
	            peg$c29 = "col",
	            peg$c30 = { type: "literal", value: "col", description: "\"col\"" },
	            peg$c31 = "command",
	            peg$c32 = { type: "literal", value: "command", description: "\"command\"" },
	            peg$c33 = "embed",
	            peg$c34 = { type: "literal", value: "embed", description: "\"embed\"" },
	            peg$c35 = "hr",
	            peg$c36 = { type: "literal", value: "hr", description: "\"hr\"" },
	            peg$c37 = "img",
	            peg$c38 = { type: "literal", value: "img", description: "\"img\"" },
	            peg$c39 = "input",
	            peg$c40 = { type: "literal", value: "input", description: "\"input\"" },
	            peg$c41 = "keygen",
	            peg$c42 = { type: "literal", value: "keygen", description: "\"keygen\"" },
	            peg$c43 = "link",
	            peg$c44 = { type: "literal", value: "link", description: "\"link\"" },
	            peg$c45 = "meta",
	            peg$c46 = { type: "literal", value: "meta", description: "\"meta\"" },
	            peg$c47 = "param",
	            peg$c48 = { type: "literal", value: "param", description: "\"param\"" },
	            peg$c49 = "source",
	            peg$c50 = { type: "literal", value: "source", description: "\"source\"" },
	            peg$c51 = "track",
	            peg$c52 = { type: "literal", value: "track", description: "\"track\"" },
	            peg$c53 = "wbr",
	            peg$c54 = { type: "literal", value: "wbr", description: "\"wbr\"" },
	            peg$c55 = "/>",
	            peg$c56 = { type: "literal", value: "/>", description: "\"/>\"" },
	            peg$c57 = function peg$c57(nodeName, attributes, endTag) {
	            if (endTag && nodeName != endTag.name) {
	                expected("</" + nodeName + ">");
	            }
	            return ["element", nodeName, attributes, []];
	        },
	            peg$c58 = "</",
	            peg$c59 = { type: "literal", value: "</", description: "\"</\"" },
	            peg$c60 = function peg$c60(name) {
	            return {
	                name: name
	            };
	        },
	            peg$c61 = function peg$c61(startTag, children, endTag) {
	            if (startTag.name != endTag.name) {
	                expected("</" + startTag.name + ">");
	            }
	            return ["element", startTag.name, startTag.attributes, children];
	        },
	            peg$c62 = function peg$c62(value) {
	            return ["text", escapeString(trimNewLineChars(value.join("")))];
	        },
	            peg$c63 = "{{",
	            peg$c64 = { type: "literal", value: "{{", description: "\"{{\"" },
	            peg$c65 = function peg$c65(info) {
	            return info;
	        },
	            peg$c66 = function peg$c66(info) {
	            return ["element", info.name, info.attributes, []];
	        },
	            peg$c67 = function peg$c67(name, attrs) {
	            return {
	                name: name,
	                attributes: attrs
	            };
	        },
	            peg$c68 = function peg$c68(attributes) {
	            return attributes;
	        },
	            peg$c69 = /^[a-zA-Z0-9:_.\-]/,
	            peg$c70 = { type: "class", value: "[a-zA-Z0-9:_\\.\\-]", description: "[a-zA-Z0-9:_\\.\\-]" },
	            peg$c71 = function peg$c71(word) {
	            return word.join("");
	        },
	            peg$c72 = "=",
	            peg$c73 = { type: "literal", value: "=", description: "\"=\"" },
	            peg$c74 = function peg$c74(name, values) {
	            return ["attribute", name, values];
	        },
	            peg$c75 = function peg$c75(name, property) {
	            return ["property", name, property];
	        },
	            peg$c76 = function peg$c76(name) {
	            return ['attribute', name, []];
	        },
	            peg$c77 = "\"",
	            peg$c78 = { type: "literal", value: "\"", description: "\"\\\"\"" },
	            peg$c79 = /^[^"]/,
	            peg$c80 = { type: "class", value: "[^\"]", description: "[^\"]" },
	            peg$c81 = function peg$c81() {
	            return ["string", text()];
	        },
	            peg$c82 = function peg$c82(values) {
	            return attrValues(values);
	        },
	            peg$c83 = "'",
	            peg$c84 = { type: "literal", value: "'", description: "\"'\"" },
	            peg$c85 = /^[^']/,
	            peg$c86 = { type: "class", value: "[^']", description: "[^']" },
	            peg$c87 = "}}",
	            peg$c88 = { type: "literal", value: "}}", description: "\"}}\"" },
	            peg$c89 = function peg$c89(value) {
	            return ["script", value];
	        },
	            peg$c90 = function peg$c90(script) {
	            return ["block", script[1]];
	        },
	            peg$c91 = "?",
	            peg$c92 = { type: "literal", value: "?", description: "\"?\"" },
	            peg$c93 = ":",
	            peg$c94 = { type: "literal", value: ":", description: "\":\"" },
	            peg$c95 = function peg$c95(condition, left, right) {
	            return ["condition", condition, left, right];
	        },
	            peg$c96 = "(",
	            peg$c97 = { type: "literal", value: "(", description: "\"(\"" },
	            peg$c98 = ")",
	            peg$c99 = { type: "literal", value: ")", description: "\")\"" },
	            peg$c100 = function peg$c100(params) {
	            return params;
	        },
	            peg$c101 = "()",
	            peg$c102 = { type: "literal", value: "()", description: "\"()\"" },
	            peg$c103 = function peg$c103() {
	            return [];
	        },
	            peg$c104 = ",",
	            peg$c105 = { type: "literal", value: ",", description: "\",\"" },
	            peg$c106 = function peg$c106(param1, rest) {
	            return [param1].concat(rest.map(function (v) {
	                return v[1];
	            }));
	        },
	            peg$c107 = function peg$c107(left, right) {
	            return ["assign", left, right];
	        },
	            peg$c108 = "&&",
	            peg$c109 = { type: "literal", value: "&&", description: "\"&&\"" },
	            peg$c110 = "||",
	            peg$c111 = { type: "literal", value: "||", description: "\"||\"" },
	            peg$c112 = "===",
	            peg$c113 = { type: "literal", value: "===", description: "\"===\"" },
	            peg$c114 = "==",
	            peg$c115 = { type: "literal", value: "==", description: "\"==\"" },
	            peg$c116 = "!==",
	            peg$c117 = { type: "literal", value: "!==", description: "\"!==\"" },
	            peg$c118 = "!=",
	            peg$c119 = { type: "literal", value: "!=", description: "\"!=\"" },
	            peg$c120 = ">==",
	            peg$c121 = { type: "literal", value: ">==", description: "\">==\"" },
	            peg$c122 = ">=",
	            peg$c123 = { type: "literal", value: ">=", description: "\">=\"" },
	            peg$c124 = "<==",
	            peg$c125 = { type: "literal", value: "<==", description: "\"<==\"" },
	            peg$c126 = "<=",
	            peg$c127 = { type: "literal", value: "<=", description: "\"<=\"" },
	            peg$c128 = "+",
	            peg$c129 = { type: "literal", value: "+", description: "\"+\"" },
	            peg$c130 = "-",
	            peg$c131 = { type: "literal", value: "-", description: "\"-\"" },
	            peg$c132 = "%",
	            peg$c133 = { type: "literal", value: "%", description: "\"%\"" },
	            peg$c134 = "*",
	            peg$c135 = { type: "literal", value: "*", description: "\"*\"" },
	            peg$c136 = "/",
	            peg$c137 = { type: "literal", value: "/", description: "\"/\"" },
	            peg$c138 = function peg$c138(left, operator, right) {
	            return ["operator", operator, left, right];
	        },
	            peg$c139 = function peg$c139(value) {
	            return value;
	        },
	            peg$c140 = function peg$c140(expression, modifiers) {
	            for (var i = 0, n = modifiers.length; i < n; i++) {
	                expression = ["modifier", modifiers[i].name, [expression].concat(modifiers[i].parameters)];
	            }
	            return expression;
	        },
	            peg$c141 = "|",
	            peg$c142 = { type: "literal", value: "|", description: "\"|\"" },
	            peg$c143 = function peg$c143(name, parameters) {
	            return {
	                name: name,
	                parameters: parameters || []
	            };
	        },
	            peg$c144 = function peg$c144(context) {
	            return context;
	        },
	            peg$c145 = "!",
	            peg$c146 = { type: "literal", value: "!", description: "\"!\"" },
	            peg$c147 = function peg$c147(not, value) {
	            return ["not", value];
	        },
	            peg$c148 = function peg$c148(not, value) {
	            return ["negative", value];
	        },
	            peg$c149 = /^[0-9]/,
	            peg$c150 = { type: "class", value: "[0-9]", description: "[0-9]" },
	            peg$c151 = function peg$c151(value) {
	            return ["literal", parseFloat(text())];
	        },
	            peg$c152 = ".",
	            peg$c153 = { type: "literal", value: ".", description: "\".\"" },
	            peg$c154 = function peg$c154(group) {
	            return ["group", group];
	        },
	            peg$c155 = function peg$c155(expression) {
	            return expression;
	        },
	            peg$c156 = "true",
	            peg$c157 = { type: "literal", value: "true", description: "\"true\"" },
	            peg$c158 = "false",
	            peg$c159 = { type: "literal", value: "false", description: "\"false\"" },
	            peg$c160 = function peg$c160(value) {
	            return ["literal", value === "true"];
	        },
	            peg$c161 = "undefined",
	            peg$c162 = { type: "literal", value: "undefined", description: "\"undefined\"" },
	            peg$c163 = function peg$c163() {
	            return ["literal", void 0];
	        },
	            peg$c164 = "NaN",
	            peg$c165 = { type: "literal", value: "NaN", description: "\"NaN\"" },
	            peg$c166 = function peg$c166() {
	            return ["literal", NaN];
	        },
	            peg$c167 = "Infinity",
	            peg$c168 = { type: "literal", value: "Infinity", description: "\"Infinity\"" },
	            peg$c169 = function peg$c169() {
	            return ["literal", Infinity];
	        },
	            peg$c170 = "null",
	            peg$c171 = { type: "literal", value: "null", description: "\"null\"" },
	            peg$c172 = "NULL",
	            peg$c173 = { type: "literal", value: "NULL", description: "\"NULL\"" },
	            peg$c174 = function peg$c174() {
	            return ["literal", null];
	        },
	            peg$c175 = function peg$c175(reference, parameters) {
	            return ["call", reference, parameters];
	        },
	            peg$c176 = "^",
	            peg$c177 = { type: "literal", value: "^", description: "\"^\"" },
	            peg$c178 = "~>",
	            peg$c179 = { type: "literal", value: "~>", description: "\"~>\"" },
	            peg$c180 = "<~>",
	            peg$c181 = { type: "literal", value: "<~>", description: "\"<~>\"" },
	            peg$c182 = "~",
	            peg$c183 = { type: "literal", value: "~", description: "\"~\"" },
	            peg$c184 = "<~",
	            peg$c185 = { type: "literal", value: "<~", description: "\"<~\"" },
	            peg$c186 = function peg$c186(bindingType, reference, path) {
	            return ["reference", [reference].concat(path), bindingType];
	        },
	            peg$c187 = function peg$c187(name) {
	            return name;
	        },
	            peg$c188 = "[",
	            peg$c189 = { type: "literal", value: "[", description: "\"[\"" },
	            peg$c190 = "]",
	            peg$c191 = { type: "literal", value: "]", description: "\"]\"" },
	            peg$c192 = function peg$c192(key) {
	            return key;
	        },
	            peg$c193 = /^[a-zA-Z_$0-9]/,
	            peg$c194 = { type: "class", value: "[a-zA-Z_$0-9]", description: "[a-zA-Z_$0-9]" },
	            peg$c195 = function peg$c195(name) {
	            return text();
	        },
	            peg$c196 = "{",
	            peg$c197 = { type: "literal", value: "{", description: "\"{\"" },
	            peg$c198 = "}",
	            peg$c199 = { type: "literal", value: "}", description: "\"}\"" },
	            peg$c200 = function peg$c200(values) {
	            return ["hash", values];
	        },
	            peg$c201 = function peg$c201(values) {
	            var s = {};
	            for (var i = 0, n = values.length; i < n; i++) {
	                s[values[i].key] = values[i].value;
	            }
	            return s;
	        },
	            peg$c202 = function peg$c202(firstValue, additionalValues) {
	            return [firstValue].concat(additionalValues.length ? additionalValues[0][1] : []);
	        },
	            peg$c203 = function peg$c203(key, value) {
	            return {
	                key: key,
	                value: value
	            };
	        },
	            peg$c204 = function peg$c204(key) {
	            return key[1];
	        },
	            peg$c205 = function peg$c205(key) {
	            return key;
	        },
	            peg$c206 = { type: "other", description: "string" },
	            peg$c207 = function peg$c207(chars) {
	            return ["string", chars.join("")];
	        },
	            peg$c208 = "\\",
	            peg$c209 = { type: "literal", value: "\\", description: "\"\\\\\"" },
	            peg$c210 = function peg$c210() {
	            return text();
	        },
	            peg$c211 = "\\\"",
	            peg$c212 = { type: "literal", value: "\\\"", description: "\"\\\\\\\"\"" },
	            peg$c213 = "\\'",
	            peg$c214 = { type: "literal", value: "\\'", description: "\"\\\\'\"" },
	            peg$c215 = { type: "any", description: "any character" },
	            peg$c216 = /^[a-zA-Z]/,
	            peg$c217 = { type: "class", value: "[a-zA-Z]", description: "[a-zA-Z]" },
	            peg$c218 = function peg$c218(chars) {
	            return chars.join("");
	        },
	            peg$c219 = /^[ \n\r\t]/,
	            peg$c220 = { type: "class", value: "[ \\n\\r\\t]", description: "[ \\n\\r\\t]" },
	            peg$currPos = 0,
	            peg$savedPos = 0,
	            peg$posDetailsCache = [{ line: 1, column: 1, seenCR: false }],
	            peg$maxFailPos = 0,
	            peg$maxFailExpected = [],
	            peg$silentFails = 0,
	            peg$result;
	        if ("startRule" in options) {
	            if (!(options.startRule in peg$startRuleFunctions)) {
	                throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
	            }
	            peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
	        }
	        function text() {
	            return input.substring(peg$savedPos, peg$currPos);
	        }
	        function location() {
	            return peg$computeLocation(peg$savedPos, peg$currPos);
	        }
	        function expected(description) {
	            throw peg$buildException(null, [{ type: "other", description: description }], input.substring(peg$savedPos, peg$currPos), peg$computeLocation(peg$savedPos, peg$currPos));
	        }
	        function error(message) {
	            throw peg$buildException(message, null, input.substring(peg$savedPos, peg$currPos), peg$computeLocation(peg$savedPos, peg$currPos));
	        }
	        function peg$computePosDetails(pos) {
	            var details = peg$posDetailsCache[pos],
	                p,
	                ch;
	            if (details) {
	                return details;
	            } else {
	                p = pos - 1;
	                while (!peg$posDetailsCache[p]) {
	                    p--;
	                }
	                details = peg$posDetailsCache[p];
	                details = {
	                    line: details.line,
	                    column: details.column,
	                    seenCR: details.seenCR
	                };
	                while (p < pos) {
	                    ch = input.charAt(p);
	                    if (ch === "\n") {
	                        if (!details.seenCR) {
	                            details.line++;
	                        }
	                        details.column = 1;
	                        details.seenCR = false;
	                    } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
	                        details.line++;
	                        details.column = 1;
	                        details.seenCR = true;
	                    } else {
	                        details.column++;
	                        details.seenCR = false;
	                    }
	                    p++;
	                }
	                peg$posDetailsCache[pos] = details;
	                return details;
	            }
	        }
	        function peg$computeLocation(startPos, endPos) {
	            var startPosDetails = peg$computePosDetails(startPos),
	                endPosDetails = peg$computePosDetails(endPos);
	            return {
	                start: {
	                    offset: startPos,
	                    line: startPosDetails.line,
	                    column: startPosDetails.column
	                },
	                end: {
	                    offset: endPos,
	                    line: endPosDetails.line,
	                    column: endPosDetails.column
	                }
	            };
	        }
	        function peg$fail(expected) {
	            if (peg$currPos < peg$maxFailPos) {
	                return;
	            }
	            if (peg$currPos > peg$maxFailPos) {
	                peg$maxFailPos = peg$currPos;
	                peg$maxFailExpected = [];
	            }
	            peg$maxFailExpected.push(expected);
	        }
	        function peg$buildException(message, expected, found, location) {
	            function cleanupExpected(expected) {
	                var i = 1;
	                expected.sort(function (a, b) {
	                    if (a.description < b.description) {
	                        return -1;
	                    } else if (a.description > b.description) {
	                        return 1;
	                    } else {
	                        return 0;
	                    }
	                });
	                while (i < expected.length) {
	                    if (expected[i - 1] === expected[i]) {
	                        expected.splice(i, 1);
	                    } else {
	                        i++;
	                    }
	                }
	            }
	            function buildMessage(expected, found) {
	                function stringEscape(s) {
	                    function hex(ch) {
	                        return ch.charCodeAt(0).toString(16).toUpperCase();
	                    }
	                    return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\x08/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
	                        return '\\x0' + hex(ch);
	                    }).replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
	                        return '\\x' + hex(ch);
	                    }).replace(/[\u0100-\u0FFF]/g, function (ch) {
	                        return "\\u0" + hex(ch);
	                    }).replace(/[\u1000-\uFFFF]/g, function (ch) {
	                        return "\\u" + hex(ch);
	                    });
	                }
	                var expectedDescs = new Array(expected.length),
	                    expectedDesc,
	                    foundDesc,
	                    i;
	                for (i = 0; i < expected.length; i++) {
	                    expectedDescs[i] = expected[i].description;
	                }
	                expectedDesc = expected.length > 1 ? expectedDescs.slice(0, -1).join(", ") + " or " + expectedDescs[expected.length - 1] : expectedDescs[0];
	                foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";
	                return "Expected " + expectedDesc + " but " + foundDesc + " found.";
	            }
	            if (expected !== null) {
	                cleanupExpected(expected);
	            }
	            return new peg$SyntaxError(message !== null ? message : buildMessage(expected, found), expected, found, location);
	        }
	        function peg$parseStart() {
	            var s0;
	            s0 = peg$parseTemplate();
	            return s0;
	        }
	        function peg$parseTemplate() {
	            var s0, s1;
	            s0 = peg$currPos;
	            s1 = peg$parseChildNodes();
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c0(s1);
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseDocType() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 9) === peg$c1) {
	                s1 = peg$c1;
	                peg$currPos += 9;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c2);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parse_();
	                if (s2 !== peg$FAILED) {
	                    s3 = [];
	                    if (peg$c3.test(input.charAt(peg$currPos))) {
	                        s4 = input.charAt(peg$currPos);
	                        peg$currPos++;
	                    } else {
	                        s4 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c4);
	                        }
	                    }
	                    if (s4 !== peg$FAILED) {
	                        while (s4 !== peg$FAILED) {
	                            s3.push(s4);
	                            if (peg$c3.test(input.charAt(peg$currPos))) {
	                                s4 = input.charAt(peg$currPos);
	                                peg$currPos++;
	                            } else {
	                                s4 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c4);
	                                }
	                            }
	                        }
	                    } else {
	                        s3 = peg$FAILED;
	                    }
	                    if (s3 !== peg$FAILED) {
	                        s4 = peg$parse_();
	                        if (s4 !== peg$FAILED) {
	                            if (input.charCodeAt(peg$currPos) === 62) {
	                                s5 = peg$c5;
	                                peg$currPos++;
	                            } else {
	                                s5 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c6);
	                                }
	                            }
	                            if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c7(s3);
	                                s0 = s1;
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseChildNodes() {
	            var s0, s1, s2;
	            s0 = peg$currPos;
	            s1 = [];
	            s2 = peg$parseVoidElement();
	            if (s2 === peg$FAILED) {
	                s2 = peg$parseScriptStart();
	                if (s2 === peg$FAILED) {
	                    s2 = peg$parseElementNode();
	                    if (s2 === peg$FAILED) {
	                        s2 = peg$parseCommentNode();
	                        if (s2 === peg$FAILED) {
	                            s2 = peg$parseTextNode();
	                            if (s2 === peg$FAILED) {
	                                s2 = peg$parseBlockBinding();
	                            }
	                        }
	                    }
	                }
	            }
	            while (s2 !== peg$FAILED) {
	                s1.push(s2);
	                s2 = peg$parseVoidElement();
	                if (s2 === peg$FAILED) {
	                    s2 = peg$parseScriptStart();
	                    if (s2 === peg$FAILED) {
	                        s2 = peg$parseElementNode();
	                        if (s2 === peg$FAILED) {
	                            s2 = peg$parseCommentNode();
	                            if (s2 === peg$FAILED) {
	                                s2 = peg$parseTextNode();
	                                if (s2 === peg$FAILED) {
	                                    s2 = peg$parseBlockBinding();
	                                }
	                            }
	                        }
	                    }
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c8(s1);
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseCommentNode() {
	            var s0, s1, s2, s3, s4, s5, s6;
	            s0 = peg$currPos;
	            s1 = peg$parse_();
	            if (s1 !== peg$FAILED) {
	                if (input.substr(peg$currPos, 4) === peg$c9) {
	                    s2 = peg$c9;
	                    peg$currPos += 4;
	                } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c10);
	                    }
	                }
	                if (s2 !== peg$FAILED) {
	                    s3 = [];
	                    s4 = peg$currPos;
	                    s5 = peg$currPos;
	                    peg$silentFails++;
	                    if (input.substr(peg$currPos, 3) === peg$c11) {
	                        s6 = peg$c11;
	                        peg$currPos += 3;
	                    } else {
	                        s6 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c12);
	                        }
	                    }
	                    peg$silentFails--;
	                    if (s6 === peg$FAILED) {
	                        s5 = void 0;
	                    } else {
	                        peg$currPos = s5;
	                        s5 = peg$FAILED;
	                    }
	                    if (s5 !== peg$FAILED) {
	                        s6 = peg$parseSourceCharacter();
	                        if (s6 !== peg$FAILED) {
	                            peg$savedPos = s4;
	                            s5 = peg$c13(s6);
	                            s4 = s5;
	                        } else {
	                            peg$currPos = s4;
	                            s4 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s4;
	                        s4 = peg$FAILED;
	                    }
	                    if (s4 !== peg$FAILED) {
	                        while (s4 !== peg$FAILED) {
	                            s3.push(s4);
	                            s4 = peg$currPos;
	                            s5 = peg$currPos;
	                            peg$silentFails++;
	                            if (input.substr(peg$currPos, 3) === peg$c11) {
	                                s6 = peg$c11;
	                                peg$currPos += 3;
	                            } else {
	                                s6 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c12);
	                                }
	                            }
	                            peg$silentFails--;
	                            if (s6 === peg$FAILED) {
	                                s5 = void 0;
	                            } else {
	                                peg$currPos = s5;
	                                s5 = peg$FAILED;
	                            }
	                            if (s5 !== peg$FAILED) {
	                                s6 = peg$parseSourceCharacter();
	                                if (s6 !== peg$FAILED) {
	                                    peg$savedPos = s4;
	                                    s5 = peg$c13(s6);
	                                    s4 = s5;
	                                } else {
	                                    peg$currPos = s4;
	                                    s4 = peg$FAILED;
	                                }
	                            } else {
	                                peg$currPos = s4;
	                                s4 = peg$FAILED;
	                            }
	                        }
	                    } else {
	                        s3 = peg$FAILED;
	                    }
	                    if (s3 !== peg$FAILED) {
	                        if (input.substr(peg$currPos, 3) === peg$c11) {
	                            s4 = peg$c11;
	                            peg$currPos += 3;
	                        } else {
	                            s4 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c12);
	                            }
	                        }
	                        if (s4 !== peg$FAILED) {
	                            s5 = peg$parse_();
	                            if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c14(s3);
	                                s0 = s1;
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                s0 = peg$parseDocType();
	            }
	            return s0;
	        }
	        function peg$parseScriptStart() {
	            var s0, s1, s2, s3, s4, s5, s6, s7;
	            s0 = peg$currPos;
	            s1 = peg$parse_();
	            if (s1 !== peg$FAILED) {
	                if (input.substr(peg$currPos, 7) === peg$c15) {
	                    s2 = peg$c15;
	                    peg$currPos += 7;
	                } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c16);
	                    }
	                }
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parseTagAttributes();
	                    if (s3 !== peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 62) {
	                            s4 = peg$c5;
	                            peg$currPos++;
	                        } else {
	                            s4 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c6);
	                            }
	                        }
	                        if (s4 !== peg$FAILED) {
	                            s5 = [];
	                            s6 = peg$parseScriptEnd();
	                            if (s6 !== peg$FAILED) {
	                                while (s6 !== peg$FAILED) {
	                                    s5.push(s6);
	                                    s6 = peg$parseScriptEnd();
	                                }
	                            } else {
	                                s5 = peg$FAILED;
	                            }
	                            if (s5 !== peg$FAILED) {
	                                if (input.substr(peg$currPos, 9) === peg$c17) {
	                                    s6 = peg$c17;
	                                    peg$currPos += 9;
	                                } else {
	                                    s6 = peg$FAILED;
	                                    if (peg$silentFails === 0) {
	                                        peg$fail(peg$c18);
	                                    }
	                                }
	                                if (s6 !== peg$FAILED) {
	                                    s7 = peg$parse_();
	                                    if (s7 !== peg$FAILED) {
	                                        peg$savedPos = s0;
	                                        s1 = peg$c19(s3, s5);
	                                        s0 = s1;
	                                    } else {
	                                        peg$currPos = s0;
	                                        s0 = peg$FAILED;
	                                    }
	                                } else {
	                                    peg$currPos = s0;
	                                    s0 = peg$FAILED;
	                                }
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseScriptEnd() {
	            var s0, s1, s2;
	            s0 = peg$currPos;
	            s1 = peg$currPos;
	            peg$silentFails++;
	            if (input.substr(peg$currPos, 9) === peg$c17) {
	                s2 = peg$c17;
	                peg$currPos += 9;
	            } else {
	                s2 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c18);
	                }
	            }
	            peg$silentFails--;
	            if (s2 === peg$FAILED) {
	                s1 = void 0;
	            } else {
	                peg$currPos = s1;
	                s1 = peg$FAILED;
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseSourceCharacter();
	                if (s2 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c20();
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseVoidElement() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 60) {
	                s1 = peg$c21;
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c22);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                if (input.substr(peg$currPos, 4) === peg$c23) {
	                    s2 = peg$c23;
	                    peg$currPos += 4;
	                } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c24);
	                    }
	                }
	                if (s2 === peg$FAILED) {
	                    if (input.substr(peg$currPos, 4) === peg$c25) {
	                        s2 = peg$c25;
	                        peg$currPos += 4;
	                    } else {
	                        s2 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c26);
	                        }
	                    }
	                    if (s2 === peg$FAILED) {
	                        if (input.substr(peg$currPos, 2) === peg$c27) {
	                            s2 = peg$c27;
	                            peg$currPos += 2;
	                        } else {
	                            s2 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c28);
	                            }
	                        }
	                        if (s2 === peg$FAILED) {
	                            if (input.substr(peg$currPos, 3) === peg$c29) {
	                                s2 = peg$c29;
	                                peg$currPos += 3;
	                            } else {
	                                s2 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c30);
	                                }
	                            }
	                            if (s2 === peg$FAILED) {
	                                if (input.substr(peg$currPos, 7) === peg$c31) {
	                                    s2 = peg$c31;
	                                    peg$currPos += 7;
	                                } else {
	                                    s2 = peg$FAILED;
	                                    if (peg$silentFails === 0) {
	                                        peg$fail(peg$c32);
	                                    }
	                                }
	                                if (s2 === peg$FAILED) {
	                                    if (input.substr(peg$currPos, 5) === peg$c33) {
	                                        s2 = peg$c33;
	                                        peg$currPos += 5;
	                                    } else {
	                                        s2 = peg$FAILED;
	                                        if (peg$silentFails === 0) {
	                                            peg$fail(peg$c34);
	                                        }
	                                    }
	                                    if (s2 === peg$FAILED) {
	                                        if (input.substr(peg$currPos, 2) === peg$c35) {
	                                            s2 = peg$c35;
	                                            peg$currPos += 2;
	                                        } else {
	                                            s2 = peg$FAILED;
	                                            if (peg$silentFails === 0) {
	                                                peg$fail(peg$c36);
	                                            }
	                                        }
	                                        if (s2 === peg$FAILED) {
	                                            if (input.substr(peg$currPos, 3) === peg$c37) {
	                                                s2 = peg$c37;
	                                                peg$currPos += 3;
	                                            } else {
	                                                s2 = peg$FAILED;
	                                                if (peg$silentFails === 0) {
	                                                    peg$fail(peg$c38);
	                                                }
	                                            }
	                                            if (s2 === peg$FAILED) {
	                                                if (input.substr(peg$currPos, 5) === peg$c39) {
	                                                    s2 = peg$c39;
	                                                    peg$currPos += 5;
	                                                } else {
	                                                    s2 = peg$FAILED;
	                                                    if (peg$silentFails === 0) {
	                                                        peg$fail(peg$c40);
	                                                    }
	                                                }
	                                                if (s2 === peg$FAILED) {
	                                                    if (input.substr(peg$currPos, 6) === peg$c41) {
	                                                        s2 = peg$c41;
	                                                        peg$currPos += 6;
	                                                    } else {
	                                                        s2 = peg$FAILED;
	                                                        if (peg$silentFails === 0) {
	                                                            peg$fail(peg$c42);
	                                                        }
	                                                    }
	                                                    if (s2 === peg$FAILED) {
	                                                        if (input.substr(peg$currPos, 4) === peg$c43) {
	                                                            s2 = peg$c43;
	                                                            peg$currPos += 4;
	                                                        } else {
	                                                            s2 = peg$FAILED;
	                                                            if (peg$silentFails === 0) {
	                                                                peg$fail(peg$c44);
	                                                            }
	                                                        }
	                                                        if (s2 === peg$FAILED) {
	                                                            if (input.substr(peg$currPos, 4) === peg$c45) {
	                                                                s2 = peg$c45;
	                                                                peg$currPos += 4;
	                                                            } else {
	                                                                s2 = peg$FAILED;
	                                                                if (peg$silentFails === 0) {
	                                                                    peg$fail(peg$c46);
	                                                                }
	                                                            }
	                                                            if (s2 === peg$FAILED) {
	                                                                if (input.substr(peg$currPos, 5) === peg$c47) {
	                                                                    s2 = peg$c47;
	                                                                    peg$currPos += 5;
	                                                                } else {
	                                                                    s2 = peg$FAILED;
	                                                                    if (peg$silentFails === 0) {
	                                                                        peg$fail(peg$c48);
	                                                                    }
	                                                                }
	                                                                if (s2 === peg$FAILED) {
	                                                                    if (input.substr(peg$currPos, 6) === peg$c49) {
	                                                                        s2 = peg$c49;
	                                                                        peg$currPos += 6;
	                                                                    } else {
	                                                                        s2 = peg$FAILED;
	                                                                        if (peg$silentFails === 0) {
	                                                                            peg$fail(peg$c50);
	                                                                        }
	                                                                    }
	                                                                    if (s2 === peg$FAILED) {
	                                                                        if (input.substr(peg$currPos, 5) === peg$c51) {
	                                                                            s2 = peg$c51;
	                                                                            peg$currPos += 5;
	                                                                        } else {
	                                                                            s2 = peg$FAILED;
	                                                                            if (peg$silentFails === 0) {
	                                                                                peg$fail(peg$c52);
	                                                                            }
	                                                                        }
	                                                                        if (s2 === peg$FAILED) {
	                                                                            if (input.substr(peg$currPos, 3) === peg$c53) {
	                                                                                s2 = peg$c53;
	                                                                                peg$currPos += 3;
	                                                                            } else {
	                                                                                s2 = peg$FAILED;
	                                                                                if (peg$silentFails === 0) {
	                                                                                    peg$fail(peg$c54);
	                                                                                }
	                                                                            }
	                                                                        }
	                                                                    }
	                                                                }
	                                                            }
	                                                        }
	                                                    }
	                                                }
	                                            }
	                                        }
	                                    }
	                                }
	                            }
	                        }
	                    }
	                }
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parseTagAttributes();
	                    if (s3 !== peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 62) {
	                            s4 = peg$c5;
	                            peg$currPos++;
	                        } else {
	                            s4 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c6);
	                            }
	                        }
	                        if (s4 === peg$FAILED) {
	                            if (input.substr(peg$currPos, 2) === peg$c55) {
	                                s4 = peg$c55;
	                                peg$currPos += 2;
	                            } else {
	                                s4 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c56);
	                                }
	                            }
	                        }
	                        if (s4 === peg$FAILED) {
	                            s4 = null;
	                        }
	                        if (s4 !== peg$FAILED) {
	                            s5 = peg$parseEndVoidTag();
	                            if (s5 === peg$FAILED) {
	                                s5 = null;
	                            }
	                            if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c57(s2, s3, s5);
	                                s0 = s1;
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseEndVoidTag() {
	            var s0, s1, s2, s3, s4;
	            s0 = peg$currPos;
	            s1 = peg$parse_();
	            if (s1 !== peg$FAILED) {
	                if (input.substr(peg$currPos, 2) === peg$c58) {
	                    s2 = peg$c58;
	                    peg$currPos += 2;
	                } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c59);
	                    }
	                }
	                if (s2 !== peg$FAILED) {
	                    if (input.substr(peg$currPos, 4) === peg$c23) {
	                        s3 = peg$c23;
	                        peg$currPos += 4;
	                    } else {
	                        s3 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c24);
	                        }
	                    }
	                    if (s3 === peg$FAILED) {
	                        if (input.substr(peg$currPos, 4) === peg$c25) {
	                            s3 = peg$c25;
	                            peg$currPos += 4;
	                        } else {
	                            s3 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c26);
	                            }
	                        }
	                        if (s3 === peg$FAILED) {
	                            if (input.substr(peg$currPos, 2) === peg$c27) {
	                                s3 = peg$c27;
	                                peg$currPos += 2;
	                            } else {
	                                s3 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c28);
	                                }
	                            }
	                            if (s3 === peg$FAILED) {
	                                if (input.substr(peg$currPos, 3) === peg$c29) {
	                                    s3 = peg$c29;
	                                    peg$currPos += 3;
	                                } else {
	                                    s3 = peg$FAILED;
	                                    if (peg$silentFails === 0) {
	                                        peg$fail(peg$c30);
	                                    }
	                                }
	                                if (s3 === peg$FAILED) {
	                                    if (input.substr(peg$currPos, 7) === peg$c31) {
	                                        s3 = peg$c31;
	                                        peg$currPos += 7;
	                                    } else {
	                                        s3 = peg$FAILED;
	                                        if (peg$silentFails === 0) {
	                                            peg$fail(peg$c32);
	                                        }
	                                    }
	                                    if (s3 === peg$FAILED) {
	                                        if (input.substr(peg$currPos, 5) === peg$c33) {
	                                            s3 = peg$c33;
	                                            peg$currPos += 5;
	                                        } else {
	                                            s3 = peg$FAILED;
	                                            if (peg$silentFails === 0) {
	                                                peg$fail(peg$c34);
	                                            }
	                                        }
	                                        if (s3 === peg$FAILED) {
	                                            if (input.substr(peg$currPos, 2) === peg$c35) {
	                                                s3 = peg$c35;
	                                                peg$currPos += 2;
	                                            } else {
	                                                s3 = peg$FAILED;
	                                                if (peg$silentFails === 0) {
	                                                    peg$fail(peg$c36);
	                                                }
	                                            }
	                                            if (s3 === peg$FAILED) {
	                                                if (input.substr(peg$currPos, 3) === peg$c37) {
	                                                    s3 = peg$c37;
	                                                    peg$currPos += 3;
	                                                } else {
	                                                    s3 = peg$FAILED;
	                                                    if (peg$silentFails === 0) {
	                                                        peg$fail(peg$c38);
	                                                    }
	                                                }
	                                                if (s3 === peg$FAILED) {
	                                                    if (input.substr(peg$currPos, 5) === peg$c39) {
	                                                        s3 = peg$c39;
	                                                        peg$currPos += 5;
	                                                    } else {
	                                                        s3 = peg$FAILED;
	                                                        if (peg$silentFails === 0) {
	                                                            peg$fail(peg$c40);
	                                                        }
	                                                    }
	                                                    if (s3 === peg$FAILED) {
	                                                        if (input.substr(peg$currPos, 6) === peg$c41) {
	                                                            s3 = peg$c41;
	                                                            peg$currPos += 6;
	                                                        } else {
	                                                            s3 = peg$FAILED;
	                                                            if (peg$silentFails === 0) {
	                                                                peg$fail(peg$c42);
	                                                            }
	                                                        }
	                                                        if (s3 === peg$FAILED) {
	                                                            if (input.substr(peg$currPos, 4) === peg$c43) {
	                                                                s3 = peg$c43;
	                                                                peg$currPos += 4;
	                                                            } else {
	                                                                s3 = peg$FAILED;
	                                                                if (peg$silentFails === 0) {
	                                                                    peg$fail(peg$c44);
	                                                                }
	                                                            }
	                                                            if (s3 === peg$FAILED) {
	                                                                if (input.substr(peg$currPos, 4) === peg$c45) {
	                                                                    s3 = peg$c45;
	                                                                    peg$currPos += 4;
	                                                                } else {
	                                                                    s3 = peg$FAILED;
	                                                                    if (peg$silentFails === 0) {
	                                                                        peg$fail(peg$c46);
	                                                                    }
	                                                                }
	                                                                if (s3 === peg$FAILED) {
	                                                                    if (input.substr(peg$currPos, 5) === peg$c47) {
	                                                                        s3 = peg$c47;
	                                                                        peg$currPos += 5;
	                                                                    } else {
	                                                                        s3 = peg$FAILED;
	                                                                        if (peg$silentFails === 0) {
	                                                                            peg$fail(peg$c48);
	                                                                        }
	                                                                    }
	                                                                    if (s3 === peg$FAILED) {
	                                                                        if (input.substr(peg$currPos, 6) === peg$c49) {
	                                                                            s3 = peg$c49;
	                                                                            peg$currPos += 6;
	                                                                        } else {
	                                                                            s3 = peg$FAILED;
	                                                                            if (peg$silentFails === 0) {
	                                                                                peg$fail(peg$c50);
	                                                                            }
	                                                                        }
	                                                                        if (s3 === peg$FAILED) {
	                                                                            if (input.substr(peg$currPos, 5) === peg$c51) {
	                                                                                s3 = peg$c51;
	                                                                                peg$currPos += 5;
	                                                                            } else {
	                                                                                s3 = peg$FAILED;
	                                                                                if (peg$silentFails === 0) {
	                                                                                    peg$fail(peg$c52);
	                                                                                }
	                                                                            }
	                                                                            if (s3 === peg$FAILED) {
	                                                                                if (input.substr(peg$currPos, 3) === peg$c53) {
	                                                                                    s3 = peg$c53;
	                                                                                    peg$currPos += 3;
	                                                                                } else {
	                                                                                    s3 = peg$FAILED;
	                                                                                    if (peg$silentFails === 0) {
	                                                                                        peg$fail(peg$c54);
	                                                                                    }
	                                                                                }
	                                                                            }
	                                                                        }
	                                                                    }
	                                                                }
	                                                            }
	                                                        }
	                                                    }
	                                                }
	                                            }
	                                        }
	                                    }
	                                }
	                            }
	                        }
	                    }
	                    if (s3 !== peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 62) {
	                            s4 = peg$c5;
	                            peg$currPos++;
	                        } else {
	                            s4 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c6);
	                            }
	                        }
	                        if (s4 !== peg$FAILED) {
	                            peg$savedPos = s0;
	                            s1 = peg$c60(s3);
	                            s0 = s1;
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseElementNode() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            s1 = peg$parseStartTag();
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseChildNodes();
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parseEndTag();
	                    if (s3 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c61(s1, s2, s3);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                s0 = peg$parseStartEndTag();
	            }
	            return s0;
	        }
	        function peg$parseTextNode() {
	            var s0, s1, s2;
	            s0 = peg$currPos;
	            s1 = [];
	            s2 = peg$parseTextCharacter();
	            if (s2 !== peg$FAILED) {
	                while (s2 !== peg$FAILED) {
	                    s1.push(s2);
	                    s2 = peg$parseTextCharacter();
	                }
	            } else {
	                s1 = peg$FAILED;
	            }
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c62(s1);
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseTextCharacter() {
	            var s0, s1, s2;
	            s0 = peg$currPos;
	            s1 = peg$currPos;
	            peg$silentFails++;
	            if (input.charCodeAt(peg$currPos) === 60) {
	                s2 = peg$c21;
	                peg$currPos++;
	            } else {
	                s2 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c22);
	                }
	            }
	            if (s2 === peg$FAILED) {
	                if (input.substr(peg$currPos, 2) === peg$c63) {
	                    s2 = peg$c63;
	                    peg$currPos += 2;
	                } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c64);
	                    }
	                }
	            }
	            peg$silentFails--;
	            if (s2 === peg$FAILED) {
	                s1 = void 0;
	            } else {
	                peg$currPos = s1;
	                s1 = peg$FAILED;
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseSourceCharacter();
	                if (s2 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c20();
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseStartTag() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            s1 = peg$parse_();
	            if (s1 !== peg$FAILED) {
	                if (input.charCodeAt(peg$currPos) === 60) {
	                    s2 = peg$c21;
	                    peg$currPos++;
	                } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c22);
	                    }
	                }
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parseTagInfo();
	                    if (s3 !== peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 62) {
	                            s4 = peg$c5;
	                            peg$currPos++;
	                        } else {
	                            s4 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c6);
	                            }
	                        }
	                        if (s4 !== peg$FAILED) {
	                            s5 = peg$parse_();
	                            if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c65(s3);
	                                s0 = s1;
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseStartEndTag() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            s1 = peg$parse_();
	            if (s1 !== peg$FAILED) {
	                if (input.charCodeAt(peg$currPos) === 60) {
	                    s2 = peg$c21;
	                    peg$currPos++;
	                } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c22);
	                    }
	                }
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parseTagInfo();
	                    if (s3 !== peg$FAILED) {
	                        if (input.substr(peg$currPos, 2) === peg$c55) {
	                            s4 = peg$c55;
	                            peg$currPos += 2;
	                        } else {
	                            s4 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c56);
	                            }
	                        }
	                        if (s4 !== peg$FAILED) {
	                            s5 = peg$parse_();
	                            if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c66(s3);
	                                s0 = s1;
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseTagInfo() {
	            var s0, s1, s2;
	            s0 = peg$currPos;
	            s1 = peg$parseTagName();
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseTagAttributes();
	                if (s2 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c67(s1, s2);
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseTagAttributes() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            s1 = peg$parse_();
	            if (s1 !== peg$FAILED) {
	                s2 = [];
	                s3 = peg$parseAttribute();
	                while (s3 !== peg$FAILED) {
	                    s2.push(s3);
	                    s3 = peg$parseAttribute();
	                }
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parse_();
	                    if (s3 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c68(s2);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseEndTag() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 2) === peg$c58) {
	                s1 = peg$c58;
	                peg$currPos += 2;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c59);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseTagName();
	                if (s2 !== peg$FAILED) {
	                    if (input.charCodeAt(peg$currPos) === 62) {
	                        s3 = peg$c5;
	                        peg$currPos++;
	                    } else {
	                        s3 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c6);
	                        }
	                    }
	                    if (s3 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c60(s2);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseTagName() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            s1 = peg$parse_();
	            if (s1 !== peg$FAILED) {
	                s2 = [];
	                if (peg$c69.test(input.charAt(peg$currPos))) {
	                    s3 = input.charAt(peg$currPos);
	                    peg$currPos++;
	                } else {
	                    s3 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c70);
	                    }
	                }
	                if (s3 !== peg$FAILED) {
	                    while (s3 !== peg$FAILED) {
	                        s2.push(s3);
	                        if (peg$c69.test(input.charAt(peg$currPos))) {
	                            s3 = input.charAt(peg$currPos);
	                            peg$currPos++;
	                        } else {
	                            s3 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c70);
	                            }
	                        }
	                    }
	                } else {
	                    s2 = peg$FAILED;
	                }
	                if (s2 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c71(s2);
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseAttribute() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            s1 = peg$parseTagName();
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parse_();
	                if (s2 !== peg$FAILED) {
	                    if (input.charCodeAt(peg$currPos) === 61) {
	                        s3 = peg$c72;
	                        peg$currPos++;
	                    } else {
	                        s3 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c73);
	                        }
	                    }
	                    if (s3 !== peg$FAILED) {
	                        s4 = peg$parse_();
	                        if (s4 !== peg$FAILED) {
	                            s5 = peg$parseAttributeValues();
	                            if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c74(s1, s5);
	                                s0 = s1;
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                s0 = peg$currPos;
	                s1 = peg$parseTagName();
	                if (s1 !== peg$FAILED) {
	                    s2 = peg$parse_();
	                    if (s2 !== peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 61) {
	                            s3 = peg$c72;
	                            peg$currPos++;
	                        } else {
	                            s3 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c73);
	                            }
	                        }
	                        if (s3 !== peg$FAILED) {
	                            s4 = peg$parse_();
	                            if (s4 !== peg$FAILED) {
	                                s5 = peg$parseTextBinding();
	                                if (s5 !== peg$FAILED) {
	                                    peg$savedPos = s0;
	                                    s1 = peg$c75(s1, s5);
	                                    s0 = s1;
	                                } else {
	                                    peg$currPos = s0;
	                                    s0 = peg$FAILED;
	                                }
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	                if (s0 === peg$FAILED) {
	                    s0 = peg$currPos;
	                    s1 = peg$parseTagName();
	                    if (s1 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c76(s1);
	                    }
	                    s0 = s1;
	                }
	            }
	            return s0;
	        }
	        function peg$parseAttributeValues() {
	            var s0, s1, s2, s3, s4, s5, s6, s7;
	            s0 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 34) {
	                s1 = peg$c77;
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c78);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = [];
	                s3 = peg$parseTextBinding();
	                if (s3 === peg$FAILED) {
	                    s3 = peg$currPos;
	                    s4 = [];
	                    s5 = peg$currPos;
	                    s6 = peg$currPos;
	                    peg$silentFails++;
	                    if (input.substr(peg$currPos, 2) === peg$c63) {
	                        s7 = peg$c63;
	                        peg$currPos += 2;
	                    } else {
	                        s7 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c64);
	                        }
	                    }
	                    peg$silentFails--;
	                    if (s7 === peg$FAILED) {
	                        s6 = void 0;
	                    } else {
	                        peg$currPos = s6;
	                        s6 = peg$FAILED;
	                    }
	                    if (s6 !== peg$FAILED) {
	                        if (peg$c79.test(input.charAt(peg$currPos))) {
	                            s7 = input.charAt(peg$currPos);
	                            peg$currPos++;
	                        } else {
	                            s7 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c80);
	                            }
	                        }
	                        if (s7 !== peg$FAILED) {
	                            s6 = [s6, s7];
	                            s5 = s6;
	                        } else {
	                            peg$currPos = s5;
	                            s5 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s5;
	                        s5 = peg$FAILED;
	                    }
	                    if (s5 !== peg$FAILED) {
	                        while (s5 !== peg$FAILED) {
	                            s4.push(s5);
	                            s5 = peg$currPos;
	                            s6 = peg$currPos;
	                            peg$silentFails++;
	                            if (input.substr(peg$currPos, 2) === peg$c63) {
	                                s7 = peg$c63;
	                                peg$currPos += 2;
	                            } else {
	                                s7 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c64);
	                                }
	                            }
	                            peg$silentFails--;
	                            if (s7 === peg$FAILED) {
	                                s6 = void 0;
	                            } else {
	                                peg$currPos = s6;
	                                s6 = peg$FAILED;
	                            }
	                            if (s6 !== peg$FAILED) {
	                                if (peg$c79.test(input.charAt(peg$currPos))) {
	                                    s7 = input.charAt(peg$currPos);
	                                    peg$currPos++;
	                                } else {
	                                    s7 = peg$FAILED;
	                                    if (peg$silentFails === 0) {
	                                        peg$fail(peg$c80);
	                                    }
	                                }
	                                if (s7 !== peg$FAILED) {
	                                    s6 = [s6, s7];
	                                    s5 = s6;
	                                } else {
	                                    peg$currPos = s5;
	                                    s5 = peg$FAILED;
	                                }
	                            } else {
	                                peg$currPos = s5;
	                                s5 = peg$FAILED;
	                            }
	                        }
	                    } else {
	                        s4 = peg$FAILED;
	                    }
	                    if (s4 !== peg$FAILED) {
	                        peg$savedPos = s3;
	                        s4 = peg$c81();
	                    }
	                    s3 = s4;
	                }
	                while (s3 !== peg$FAILED) {
	                    s2.push(s3);
	                    s3 = peg$parseTextBinding();
	                    if (s3 === peg$FAILED) {
	                        s3 = peg$currPos;
	                        s4 = [];
	                        s5 = peg$currPos;
	                        s6 = peg$currPos;
	                        peg$silentFails++;
	                        if (input.substr(peg$currPos, 2) === peg$c63) {
	                            s7 = peg$c63;
	                            peg$currPos += 2;
	                        } else {
	                            s7 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c64);
	                            }
	                        }
	                        peg$silentFails--;
	                        if (s7 === peg$FAILED) {
	                            s6 = void 0;
	                        } else {
	                            peg$currPos = s6;
	                            s6 = peg$FAILED;
	                        }
	                        if (s6 !== peg$FAILED) {
	                            if (peg$c79.test(input.charAt(peg$currPos))) {
	                                s7 = input.charAt(peg$currPos);
	                                peg$currPos++;
	                            } else {
	                                s7 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c80);
	                                }
	                            }
	                            if (s7 !== peg$FAILED) {
	                                s6 = [s6, s7];
	                                s5 = s6;
	                            } else {
	                                peg$currPos = s5;
	                                s5 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s5;
	                            s5 = peg$FAILED;
	                        }
	                        if (s5 !== peg$FAILED) {
	                            while (s5 !== peg$FAILED) {
	                                s4.push(s5);
	                                s5 = peg$currPos;
	                                s6 = peg$currPos;
	                                peg$silentFails++;
	                                if (input.substr(peg$currPos, 2) === peg$c63) {
	                                    s7 = peg$c63;
	                                    peg$currPos += 2;
	                                } else {
	                                    s7 = peg$FAILED;
	                                    if (peg$silentFails === 0) {
	                                        peg$fail(peg$c64);
	                                    }
	                                }
	                                peg$silentFails--;
	                                if (s7 === peg$FAILED) {
	                                    s6 = void 0;
	                                } else {
	                                    peg$currPos = s6;
	                                    s6 = peg$FAILED;
	                                }
	                                if (s6 !== peg$FAILED) {
	                                    if (peg$c79.test(input.charAt(peg$currPos))) {
	                                        s7 = input.charAt(peg$currPos);
	                                        peg$currPos++;
	                                    } else {
	                                        s7 = peg$FAILED;
	                                        if (peg$silentFails === 0) {
	                                            peg$fail(peg$c80);
	                                        }
	                                    }
	                                    if (s7 !== peg$FAILED) {
	                                        s6 = [s6, s7];
	                                        s5 = s6;
	                                    } else {
	                                        peg$currPos = s5;
	                                        s5 = peg$FAILED;
	                                    }
	                                } else {
	                                    peg$currPos = s5;
	                                    s5 = peg$FAILED;
	                                }
	                            }
	                        } else {
	                            s4 = peg$FAILED;
	                        }
	                        if (s4 !== peg$FAILED) {
	                            peg$savedPos = s3;
	                            s4 = peg$c81();
	                        }
	                        s3 = s4;
	                    }
	                }
	                if (s2 !== peg$FAILED) {
	                    if (input.charCodeAt(peg$currPos) === 34) {
	                        s3 = peg$c77;
	                        peg$currPos++;
	                    } else {
	                        s3 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c78);
	                        }
	                    }
	                    if (s3 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c82(s2);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                s0 = peg$currPos;
	                if (input.charCodeAt(peg$currPos) === 39) {
	                    s1 = peg$c83;
	                    peg$currPos++;
	                } else {
	                    s1 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c84);
	                    }
	                }
	                if (s1 !== peg$FAILED) {
	                    s2 = [];
	                    s3 = peg$parseTextBinding();
	                    if (s3 === peg$FAILED) {
	                        s3 = peg$currPos;
	                        s4 = [];
	                        s5 = peg$currPos;
	                        s6 = peg$currPos;
	                        peg$silentFails++;
	                        if (input.substr(peg$currPos, 2) === peg$c63) {
	                            s7 = peg$c63;
	                            peg$currPos += 2;
	                        } else {
	                            s7 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c64);
	                            }
	                        }
	                        peg$silentFails--;
	                        if (s7 === peg$FAILED) {
	                            s6 = void 0;
	                        } else {
	                            peg$currPos = s6;
	                            s6 = peg$FAILED;
	                        }
	                        if (s6 !== peg$FAILED) {
	                            if (peg$c85.test(input.charAt(peg$currPos))) {
	                                s7 = input.charAt(peg$currPos);
	                                peg$currPos++;
	                            } else {
	                                s7 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c86);
	                                }
	                            }
	                            if (s7 !== peg$FAILED) {
	                                s6 = [s6, s7];
	                                s5 = s6;
	                            } else {
	                                peg$currPos = s5;
	                                s5 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s5;
	                            s5 = peg$FAILED;
	                        }
	                        if (s5 !== peg$FAILED) {
	                            while (s5 !== peg$FAILED) {
	                                s4.push(s5);
	                                s5 = peg$currPos;
	                                s6 = peg$currPos;
	                                peg$silentFails++;
	                                if (input.substr(peg$currPos, 2) === peg$c63) {
	                                    s7 = peg$c63;
	                                    peg$currPos += 2;
	                                } else {
	                                    s7 = peg$FAILED;
	                                    if (peg$silentFails === 0) {
	                                        peg$fail(peg$c64);
	                                    }
	                                }
	                                peg$silentFails--;
	                                if (s7 === peg$FAILED) {
	                                    s6 = void 0;
	                                } else {
	                                    peg$currPos = s6;
	                                    s6 = peg$FAILED;
	                                }
	                                if (s6 !== peg$FAILED) {
	                                    if (peg$c85.test(input.charAt(peg$currPos))) {
	                                        s7 = input.charAt(peg$currPos);
	                                        peg$currPos++;
	                                    } else {
	                                        s7 = peg$FAILED;
	                                        if (peg$silentFails === 0) {
	                                            peg$fail(peg$c86);
	                                        }
	                                    }
	                                    if (s7 !== peg$FAILED) {
	                                        s6 = [s6, s7];
	                                        s5 = s6;
	                                    } else {
	                                        peg$currPos = s5;
	                                        s5 = peg$FAILED;
	                                    }
	                                } else {
	                                    peg$currPos = s5;
	                                    s5 = peg$FAILED;
	                                }
	                            }
	                        } else {
	                            s4 = peg$FAILED;
	                        }
	                        if (s4 !== peg$FAILED) {
	                            peg$savedPos = s3;
	                            s4 = peg$c81();
	                        }
	                        s3 = s4;
	                    }
	                    while (s3 !== peg$FAILED) {
	                        s2.push(s3);
	                        s3 = peg$parseTextBinding();
	                        if (s3 === peg$FAILED) {
	                            s3 = peg$currPos;
	                            s4 = [];
	                            s5 = peg$currPos;
	                            s6 = peg$currPos;
	                            peg$silentFails++;
	                            if (input.substr(peg$currPos, 2) === peg$c63) {
	                                s7 = peg$c63;
	                                peg$currPos += 2;
	                            } else {
	                                s7 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c64);
	                                }
	                            }
	                            peg$silentFails--;
	                            if (s7 === peg$FAILED) {
	                                s6 = void 0;
	                            } else {
	                                peg$currPos = s6;
	                                s6 = peg$FAILED;
	                            }
	                            if (s6 !== peg$FAILED) {
	                                if (peg$c85.test(input.charAt(peg$currPos))) {
	                                    s7 = input.charAt(peg$currPos);
	                                    peg$currPos++;
	                                } else {
	                                    s7 = peg$FAILED;
	                                    if (peg$silentFails === 0) {
	                                        peg$fail(peg$c86);
	                                    }
	                                }
	                                if (s7 !== peg$FAILED) {
	                                    s6 = [s6, s7];
	                                    s5 = s6;
	                                } else {
	                                    peg$currPos = s5;
	                                    s5 = peg$FAILED;
	                                }
	                            } else {
	                                peg$currPos = s5;
	                                s5 = peg$FAILED;
	                            }
	                            if (s5 !== peg$FAILED) {
	                                while (s5 !== peg$FAILED) {
	                                    s4.push(s5);
	                                    s5 = peg$currPos;
	                                    s6 = peg$currPos;
	                                    peg$silentFails++;
	                                    if (input.substr(peg$currPos, 2) === peg$c63) {
	                                        s7 = peg$c63;
	                                        peg$currPos += 2;
	                                    } else {
	                                        s7 = peg$FAILED;
	                                        if (peg$silentFails === 0) {
	                                            peg$fail(peg$c64);
	                                        }
	                                    }
	                                    peg$silentFails--;
	                                    if (s7 === peg$FAILED) {
	                                        s6 = void 0;
	                                    } else {
	                                        peg$currPos = s6;
	                                        s6 = peg$FAILED;
	                                    }
	                                    if (s6 !== peg$FAILED) {
	                                        if (peg$c85.test(input.charAt(peg$currPos))) {
	                                            s7 = input.charAt(peg$currPos);
	                                            peg$currPos++;
	                                        } else {
	                                            s7 = peg$FAILED;
	                                            if (peg$silentFails === 0) {
	                                                peg$fail(peg$c86);
	                                            }
	                                        }
	                                        if (s7 !== peg$FAILED) {
	                                            s6 = [s6, s7];
	                                            s5 = s6;
	                                        } else {
	                                            peg$currPos = s5;
	                                            s5 = peg$FAILED;
	                                        }
	                                    } else {
	                                        peg$currPos = s5;
	                                        s5 = peg$FAILED;
	                                    }
	                                }
	                            } else {
	                                s4 = peg$FAILED;
	                            }
	                            if (s4 !== peg$FAILED) {
	                                peg$savedPos = s3;
	                                s4 = peg$c81();
	                            }
	                            s3 = s4;
	                        }
	                    }
	                    if (s2 !== peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 39) {
	                            s3 = peg$c83;
	                            peg$currPos++;
	                        } else {
	                            s3 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c84);
	                            }
	                        }
	                        if (s3 !== peg$FAILED) {
	                            peg$savedPos = s0;
	                            s1 = peg$c82(s2);
	                            s0 = s1;
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            }
	            return s0;
	        }
	        function peg$parseTextBinding() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 2) === peg$c63) {
	                s1 = peg$c63;
	                peg$currPos += 2;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c64);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parse_();
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parseTernaryConditional();
	                    if (s3 !== peg$FAILED) {
	                        s4 = peg$parse_();
	                        if (s4 !== peg$FAILED) {
	                            if (input.substr(peg$currPos, 2) === peg$c87) {
	                                s5 = peg$c87;
	                                peg$currPos += 2;
	                            } else {
	                                s5 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c88);
	                                }
	                            }
	                            if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c89(s3);
	                                s0 = s1;
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseBlockBinding() {
	            var s0, s1;
	            s0 = peg$currPos;
	            s1 = peg$parseTextBinding();
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c90(s1);
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseTernaryConditional() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            s1 = peg$parseAssignment();
	            if (s1 !== peg$FAILED) {
	                if (input.charCodeAt(peg$currPos) === 63) {
	                    s2 = peg$c91;
	                    peg$currPos++;
	                } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c92);
	                    }
	                }
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parseTernaryConditional();
	                    if (s3 !== peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 58) {
	                            s4 = peg$c93;
	                            peg$currPos++;
	                        } else {
	                            s4 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c94);
	                            }
	                        }
	                        if (s4 !== peg$FAILED) {
	                            s5 = peg$parseTernaryConditional();
	                            if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c95(s1, s3, s5);
	                                s0 = s1;
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                s0 = peg$parseAssignment();
	            }
	            return s0;
	        }
	        function peg$parseParameters() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 40) {
	                s1 = peg$c96;
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c97);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseInnerParameters();
	                if (s2 !== peg$FAILED) {
	                    if (input.charCodeAt(peg$currPos) === 41) {
	                        s3 = peg$c98;
	                        peg$currPos++;
	                    } else {
	                        s3 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c99);
	                        }
	                    }
	                    if (s3 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c100(s2);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                s0 = peg$currPos;
	                if (input.substr(peg$currPos, 2) === peg$c101) {
	                    s1 = peg$c101;
	                    peg$currPos += 2;
	                } else {
	                    s1 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c102);
	                    }
	                }
	                if (s1 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c103();
	                }
	                s0 = s1;
	            }
	            return s0;
	        }
	        function peg$parseInnerParameters() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            s1 = peg$parseTernaryConditional();
	            if (s1 !== peg$FAILED) {
	                s2 = [];
	                s3 = peg$currPos;
	                if (input.charCodeAt(peg$currPos) === 44) {
	                    s4 = peg$c104;
	                    peg$currPos++;
	                } else {
	                    s4 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c105);
	                    }
	                }
	                if (s4 !== peg$FAILED) {
	                    s5 = peg$parseTernaryConditional();
	                    if (s5 !== peg$FAILED) {
	                        s4 = [s4, s5];
	                        s3 = s4;
	                    } else {
	                        peg$currPos = s3;
	                        s3 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s3;
	                    s3 = peg$FAILED;
	                }
	                while (s3 !== peg$FAILED) {
	                    s2.push(s3);
	                    s3 = peg$currPos;
	                    if (input.charCodeAt(peg$currPos) === 44) {
	                        s4 = peg$c104;
	                        peg$currPos++;
	                    } else {
	                        s4 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c105);
	                        }
	                    }
	                    if (s4 !== peg$FAILED) {
	                        s5 = peg$parseTernaryConditional();
	                        if (s5 !== peg$FAILED) {
	                            s4 = [s4, s5];
	                            s3 = s4;
	                        } else {
	                            peg$currPos = s3;
	                            s3 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s3;
	                        s3 = peg$FAILED;
	                    }
	                }
	                if (s2 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c106(s1, s2);
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseAssignment() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            s1 = peg$parseObjectReference();
	            if (s1 !== peg$FAILED) {
	                if (input.charCodeAt(peg$currPos) === 61) {
	                    s2 = peg$c72;
	                    peg$currPos++;
	                } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c73);
	                    }
	                }
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parseAssignment();
	                    if (s3 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c107(s1, s3);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                s0 = peg$parseOperation();
	            }
	            return s0;
	        }
	        function peg$parseOperation() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            s1 = peg$parseOperatable();
	            if (s1 !== peg$FAILED) {
	                if (input.substr(peg$currPos, 2) === peg$c108) {
	                    s2 = peg$c108;
	                    peg$currPos += 2;
	                } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c109);
	                    }
	                }
	                if (s2 === peg$FAILED) {
	                    if (input.substr(peg$currPos, 2) === peg$c110) {
	                        s2 = peg$c110;
	                        peg$currPos += 2;
	                    } else {
	                        s2 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c111);
	                        }
	                    }
	                    if (s2 === peg$FAILED) {
	                        if (input.substr(peg$currPos, 3) === peg$c112) {
	                            s2 = peg$c112;
	                            peg$currPos += 3;
	                        } else {
	                            s2 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c113);
	                            }
	                        }
	                        if (s2 === peg$FAILED) {
	                            if (input.substr(peg$currPos, 2) === peg$c114) {
	                                s2 = peg$c114;
	                                peg$currPos += 2;
	                            } else {
	                                s2 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c115);
	                                }
	                            }
	                            if (s2 === peg$FAILED) {
	                                if (input.substr(peg$currPos, 3) === peg$c116) {
	                                    s2 = peg$c116;
	                                    peg$currPos += 3;
	                                } else {
	                                    s2 = peg$FAILED;
	                                    if (peg$silentFails === 0) {
	                                        peg$fail(peg$c117);
	                                    }
	                                }
	                                if (s2 === peg$FAILED) {
	                                    if (input.substr(peg$currPos, 2) === peg$c118) {
	                                        s2 = peg$c118;
	                                        peg$currPos += 2;
	                                    } else {
	                                        s2 = peg$FAILED;
	                                        if (peg$silentFails === 0) {
	                                            peg$fail(peg$c119);
	                                        }
	                                    }
	                                    if (s2 === peg$FAILED) {
	                                        if (input.substr(peg$currPos, 3) === peg$c120) {
	                                            s2 = peg$c120;
	                                            peg$currPos += 3;
	                                        } else {
	                                            s2 = peg$FAILED;
	                                            if (peg$silentFails === 0) {
	                                                peg$fail(peg$c121);
	                                            }
	                                        }
	                                        if (s2 === peg$FAILED) {
	                                            if (input.substr(peg$currPos, 2) === peg$c122) {
	                                                s2 = peg$c122;
	                                                peg$currPos += 2;
	                                            } else {
	                                                s2 = peg$FAILED;
	                                                if (peg$silentFails === 0) {
	                                                    peg$fail(peg$c123);
	                                                }
	                                            }
	                                            if (s2 === peg$FAILED) {
	                                                if (input.charCodeAt(peg$currPos) === 62) {
	                                                    s2 = peg$c5;
	                                                    peg$currPos++;
	                                                } else {
	                                                    s2 = peg$FAILED;
	                                                    if (peg$silentFails === 0) {
	                                                        peg$fail(peg$c6);
	                                                    }
	                                                }
	                                                if (s2 === peg$FAILED) {
	                                                    if (input.substr(peg$currPos, 3) === peg$c124) {
	                                                        s2 = peg$c124;
	                                                        peg$currPos += 3;
	                                                    } else {
	                                                        s2 = peg$FAILED;
	                                                        if (peg$silentFails === 0) {
	                                                            peg$fail(peg$c125);
	                                                        }
	                                                    }
	                                                    if (s2 === peg$FAILED) {
	                                                        if (input.substr(peg$currPos, 2) === peg$c126) {
	                                                            s2 = peg$c126;
	                                                            peg$currPos += 2;
	                                                        } else {
	                                                            s2 = peg$FAILED;
	                                                            if (peg$silentFails === 0) {
	                                                                peg$fail(peg$c127);
	                                                            }
	                                                        }
	                                                        if (s2 === peg$FAILED) {
	                                                            if (input.charCodeAt(peg$currPos) === 60) {
	                                                                s2 = peg$c21;
	                                                                peg$currPos++;
	                                                            } else {
	                                                                s2 = peg$FAILED;
	                                                                if (peg$silentFails === 0) {
	                                                                    peg$fail(peg$c22);
	                                                                }
	                                                            }
	                                                            if (s2 === peg$FAILED) {
	                                                                if (input.charCodeAt(peg$currPos) === 43) {
	                                                                    s2 = peg$c128;
	                                                                    peg$currPos++;
	                                                                } else {
	                                                                    s2 = peg$FAILED;
	                                                                    if (peg$silentFails === 0) {
	                                                                        peg$fail(peg$c129);
	                                                                    }
	                                                                }
	                                                                if (s2 === peg$FAILED) {
	                                                                    if (input.charCodeAt(peg$currPos) === 45) {
	                                                                        s2 = peg$c130;
	                                                                        peg$currPos++;
	                                                                    } else {
	                                                                        s2 = peg$FAILED;
	                                                                        if (peg$silentFails === 0) {
	                                                                            peg$fail(peg$c131);
	                                                                        }
	                                                                    }
	                                                                    if (s2 === peg$FAILED) {
	                                                                        if (input.charCodeAt(peg$currPos) === 37) {
	                                                                            s2 = peg$c132;
	                                                                            peg$currPos++;
	                                                                        } else {
	                                                                            s2 = peg$FAILED;
	                                                                            if (peg$silentFails === 0) {
	                                                                                peg$fail(peg$c133);
	                                                                            }
	                                                                        }
	                                                                        if (s2 === peg$FAILED) {
	                                                                            if (input.charCodeAt(peg$currPos) === 42) {
	                                                                                s2 = peg$c134;
	                                                                                peg$currPos++;
	                                                                            } else {
	                                                                                s2 = peg$FAILED;
	                                                                                if (peg$silentFails === 0) {
	                                                                                    peg$fail(peg$c135);
	                                                                                }
	                                                                            }
	                                                                            if (s2 === peg$FAILED) {
	                                                                                if (input.charCodeAt(peg$currPos) === 47) {
	                                                                                    s2 = peg$c136;
	                                                                                    peg$currPos++;
	                                                                                } else {
	                                                                                    s2 = peg$FAILED;
	                                                                                    if (peg$silentFails === 0) {
	                                                                                        peg$fail(peg$c137);
	                                                                                    }
	                                                                                }
	                                                                            }
	                                                                        }
	                                                                    }
	                                                                }
	                                                            }
	                                                        }
	                                                    }
	                                                }
	                                            }
	                                        }
	                                    }
	                                }
	                            }
	                        }
	                    }
	                }
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parseOperation();
	                    if (s3 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c138(s1, s2, s3);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                s0 = peg$parseOperatable();
	            }
	            return s0;
	        }
	        function peg$parseOperatable() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            s1 = peg$parse_();
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseModifiers();
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parse_();
	                    if (s3 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c139(s2);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseModifiers() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            s1 = peg$parseNot();
	            if (s1 !== peg$FAILED) {
	                s2 = [];
	                s3 = peg$parseModifier();
	                while (s3 !== peg$FAILED) {
	                    s2.push(s3);
	                    s3 = peg$parseModifier();
	                }
	                if (s2 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c140(s1, s2);
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                s0 = peg$parseFunctionCall();
	                if (s0 === peg$FAILED) {
	                    s0 = peg$parseObjectReference();
	                }
	            }
	            return s0;
	        }
	        function peg$parseModifier() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 124) {
	                s1 = peg$c141;
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c142);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parse_();
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parseReferenceName();
	                    if (s3 !== peg$FAILED) {
	                        s4 = peg$parseParameters();
	                        if (s4 === peg$FAILED) {
	                            s4 = null;
	                        }
	                        if (s4 !== peg$FAILED) {
	                            s5 = peg$parse_();
	                            if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c143(s3, s4);
	                                s0 = s1;
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseObjectReference() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            s1 = peg$parse_();
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseObject();
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parse_();
	                    if (s3 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c144(s2);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseNot() {
	            var s0, s1, s2;
	            s0 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 33) {
	                s1 = peg$c145;
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c146);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseNot();
	                if (s2 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c147(s1, s2);
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                s0 = peg$currPos;
	                if (input.charCodeAt(peg$currPos) === 33) {
	                    s1 = peg$c145;
	                    peg$currPos++;
	                } else {
	                    s1 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c146);
	                    }
	                }
	                if (s1 === peg$FAILED) {
	                    if (input.charCodeAt(peg$currPos) === 45) {
	                        s1 = peg$c130;
	                        peg$currPos++;
	                    } else {
	                        s1 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c131);
	                        }
	                    }
	                }
	                if (s1 !== peg$FAILED) {
	                    s2 = peg$parseNot();
	                    if (s2 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c148(s1, s2);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	                if (s0 === peg$FAILED) {
	                    s0 = peg$parseReserved();
	                    if (s0 === peg$FAILED) {
	                        s0 = peg$parseFunctionCall();
	                        if (s0 === peg$FAILED) {
	                            s0 = peg$parseObjectReference();
	                        }
	                    }
	                }
	            }
	            return s0;
	        }
	        function peg$parseObject() {
	            var s0;
	            s0 = peg$parseGroup();
	            if (s0 === peg$FAILED) {
	                s0 = peg$parseHash();
	                if (s0 === peg$FAILED) {
	                    s0 = peg$parseNumber();
	                    if (s0 === peg$FAILED) {
	                        s0 = peg$parseStringLiteral();
	                        if (s0 === peg$FAILED) {
	                            s0 = peg$parseReference();
	                        }
	                    }
	                }
	            }
	            return s0;
	        }
	        function peg$parseNumber() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            s1 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 45) {
	                s2 = peg$c130;
	                peg$currPos++;
	            } else {
	                s2 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c131);
	                }
	            }
	            if (s2 === peg$FAILED) {
	                s2 = null;
	            }
	            if (s2 !== peg$FAILED) {
	                s3 = peg$currPos;
	                s4 = [];
	                if (peg$c149.test(input.charAt(peg$currPos))) {
	                    s5 = input.charAt(peg$currPos);
	                    peg$currPos++;
	                } else {
	                    s5 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c150);
	                    }
	                }
	                if (s5 !== peg$FAILED) {
	                    while (s5 !== peg$FAILED) {
	                        s4.push(s5);
	                        if (peg$c149.test(input.charAt(peg$currPos))) {
	                            s5 = input.charAt(peg$currPos);
	                            peg$currPos++;
	                        } else {
	                            s5 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c150);
	                            }
	                        }
	                    }
	                } else {
	                    s4 = peg$FAILED;
	                }
	                if (s4 !== peg$FAILED) {
	                    s5 = peg$parseDecimalNumber();
	                    if (s5 === peg$FAILED) {
	                        s5 = null;
	                    }
	                    if (s5 !== peg$FAILED) {
	                        s4 = [s4, s5];
	                        s3 = s4;
	                    } else {
	                        peg$currPos = s3;
	                        s3 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s3;
	                    s3 = peg$FAILED;
	                }
	                if (s3 === peg$FAILED) {
	                    s3 = peg$parseDecimalNumber();
	                }
	                if (s3 !== peg$FAILED) {
	                    s2 = [s2, s3];
	                    s1 = s2;
	                } else {
	                    peg$currPos = s1;
	                    s1 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s1;
	                s1 = peg$FAILED;
	            }
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c151(s1);
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseDecimalNumber() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 46) {
	                s1 = peg$c152;
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c153);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = [];
	                if (peg$c149.test(input.charAt(peg$currPos))) {
	                    s3 = input.charAt(peg$currPos);
	                    peg$currPos++;
	                } else {
	                    s3 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c150);
	                    }
	                }
	                if (s3 !== peg$FAILED) {
	                    while (s3 !== peg$FAILED) {
	                        s2.push(s3);
	                        if (peg$c149.test(input.charAt(peg$currPos))) {
	                            s3 = input.charAt(peg$currPos);
	                            peg$currPos++;
	                        } else {
	                            s3 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c150);
	                            }
	                        }
	                    }
	                } else {
	                    s2 = peg$FAILED;
	                }
	                if (s2 !== peg$FAILED) {
	                    s1 = [s1, s2];
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseGroup() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 40) {
	                s1 = peg$c96;
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c97);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseTernaryConditional();
	                if (s2 !== peg$FAILED) {
	                    if (input.charCodeAt(peg$currPos) === 41) {
	                        s3 = peg$c98;
	                        peg$currPos++;
	                    } else {
	                        s3 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c99);
	                        }
	                    }
	                    if (s3 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c154(s2);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseReserved() {
	            var s0, s1;
	            s0 = peg$currPos;
	            s1 = peg$parseBoolean();
	            if (s1 === peg$FAILED) {
	                s1 = peg$parseUndefined();
	                if (s1 === peg$FAILED) {
	                    s1 = peg$parseNull();
	                    if (s1 === peg$FAILED) {
	                        s1 = peg$parseNaN();
	                        if (s1 === peg$FAILED) {
	                            s1 = peg$parseInfinity();
	                        }
	                    }
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c155(s1);
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseBoolean() {
	            var s0, s1;
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 4) === peg$c156) {
	                s1 = peg$c156;
	                peg$currPos += 4;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c157);
	                }
	            }
	            if (s1 === peg$FAILED) {
	                if (input.substr(peg$currPos, 5) === peg$c158) {
	                    s1 = peg$c158;
	                    peg$currPos += 5;
	                } else {
	                    s1 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c159);
	                    }
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c160(s1);
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseUndefined() {
	            var s0, s1;
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 9) === peg$c161) {
	                s1 = peg$c161;
	                peg$currPos += 9;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c162);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c163();
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseNaN() {
	            var s0, s1;
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 3) === peg$c164) {
	                s1 = peg$c164;
	                peg$currPos += 3;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c165);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c166();
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseInfinity() {
	            var s0, s1;
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 8) === peg$c167) {
	                s1 = peg$c167;
	                peg$currPos += 8;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c168);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c169();
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseNull() {
	            var s0, s1;
	            s0 = peg$currPos;
	            if (input.substr(peg$currPos, 4) === peg$c170) {
	                s1 = peg$c170;
	                peg$currPos += 4;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c171);
	                }
	            }
	            if (s1 === peg$FAILED) {
	                if (input.substr(peg$currPos, 4) === peg$c172) {
	                    s1 = peg$c172;
	                    peg$currPos += 4;
	                } else {
	                    s1 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c173);
	                    }
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c174();
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseFunctionCall() {
	            var s0, s1, s2;
	            s0 = peg$currPos;
	            s1 = peg$parseObjectReference();
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseParameters();
	                if (s2 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c175(s1, s2);
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseReference() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 94) {
	                s1 = peg$c176;
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c177);
	                }
	            }
	            if (s1 === peg$FAILED) {
	                if (input.substr(peg$currPos, 2) === peg$c178) {
	                    s1 = peg$c178;
	                    peg$currPos += 2;
	                } else {
	                    s1 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c179);
	                    }
	                }
	                if (s1 === peg$FAILED) {
	                    if (input.substr(peg$currPos, 3) === peg$c180) {
	                        s1 = peg$c180;
	                        peg$currPos += 3;
	                    } else {
	                        s1 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c181);
	                        }
	                    }
	                    if (s1 === peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 126) {
	                            s1 = peg$c182;
	                            peg$currPos++;
	                        } else {
	                            s1 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c183);
	                            }
	                        }
	                        if (s1 === peg$FAILED) {
	                            if (input.substr(peg$currPos, 2) === peg$c184) {
	                                s1 = peg$c184;
	                                peg$currPos += 2;
	                            } else {
	                                s1 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c185);
	                                }
	                            }
	                        }
	                    }
	                }
	            }
	            if (s1 === peg$FAILED) {
	                s1 = null;
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parse_();
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parseReferenceName();
	                    if (s3 !== peg$FAILED) {
	                        s4 = [];
	                        s5 = peg$parseReferencePart();
	                        while (s5 !== peg$FAILED) {
	                            s4.push(s5);
	                            s5 = peg$parseReferencePart();
	                        }
	                        if (s4 !== peg$FAILED) {
	                            s5 = peg$parse_();
	                            if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c186(s1, s3, s4);
	                                s0 = s1;
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseReferencePart() {
	            var s0;
	            s0 = peg$parseReferenceKeyPath();
	            if (s0 === peg$FAILED) {
	                s0 = peg$parseReferenceBrackPath();
	            }
	            return s0;
	        }
	        function peg$parseReferenceKeyPath() {
	            var s0, s1, s2;
	            s0 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 46) {
	                s1 = peg$c152;
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c153);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseReferenceName();
	                if (s2 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c187(s2);
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseReferenceBrackPath() {
	            var s0, s1, s2, s3;
	            s0 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 91) {
	                s1 = peg$c188;
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c189);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseTernaryConditional();
	                if (s2 !== peg$FAILED) {
	                    if (input.charCodeAt(peg$currPos) === 93) {
	                        s3 = peg$c190;
	                        peg$currPos++;
	                    } else {
	                        s3 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c191);
	                        }
	                    }
	                    if (s3 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c192(s2);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseReferenceName() {
	            var s0, s1, s2;
	            s0 = peg$currPos;
	            s1 = [];
	            if (peg$c193.test(input.charAt(peg$currPos))) {
	                s2 = input.charAt(peg$currPos);
	                peg$currPos++;
	            } else {
	                s2 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c194);
	                }
	            }
	            if (s2 !== peg$FAILED) {
	                while (s2 !== peg$FAILED) {
	                    s1.push(s2);
	                    if (peg$c193.test(input.charAt(peg$currPos))) {
	                        s2 = input.charAt(peg$currPos);
	                        peg$currPos++;
	                    } else {
	                        s2 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c194);
	                        }
	                    }
	                }
	            } else {
	                s1 = peg$FAILED;
	            }
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c195(s1);
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseHash() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 123) {
	                s1 = peg$c196;
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c197);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parse_();
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parseHashValues();
	                    if (s3 === peg$FAILED) {
	                        s3 = null;
	                    }
	                    if (s3 !== peg$FAILED) {
	                        s4 = peg$parse_();
	                        if (s4 !== peg$FAILED) {
	                            if (input.charCodeAt(peg$currPos) === 125) {
	                                s5 = peg$c198;
	                                peg$currPos++;
	                            } else {
	                                s5 = peg$FAILED;
	                                if (peg$silentFails === 0) {
	                                    peg$fail(peg$c199);
	                                }
	                            }
	                            if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c200(s3);
	                                s0 = s1;
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseHashValues() {
	            var s0, s1;
	            s0 = peg$currPos;
	            s1 = peg$parseHashValuesArray();
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c201(s1);
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parseHashValuesArray() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            s1 = peg$parseHashValue();
	            if (s1 !== peg$FAILED) {
	                s2 = [];
	                s3 = peg$currPos;
	                if (input.charCodeAt(peg$currPos) === 44) {
	                    s4 = peg$c104;
	                    peg$currPos++;
	                } else {
	                    s4 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c105);
	                    }
	                }
	                if (s4 !== peg$FAILED) {
	                    s5 = peg$parseHashValuesArray();
	                    if (s5 !== peg$FAILED) {
	                        s4 = [s4, s5];
	                        s3 = s4;
	                    } else {
	                        peg$currPos = s3;
	                        s3 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s3;
	                    s3 = peg$FAILED;
	                }
	                while (s3 !== peg$FAILED) {
	                    s2.push(s3);
	                    s3 = peg$currPos;
	                    if (input.charCodeAt(peg$currPos) === 44) {
	                        s4 = peg$c104;
	                        peg$currPos++;
	                    } else {
	                        s4 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c105);
	                        }
	                    }
	                    if (s4 !== peg$FAILED) {
	                        s5 = peg$parseHashValuesArray();
	                        if (s5 !== peg$FAILED) {
	                            s4 = [s4, s5];
	                            s3 = s4;
	                        } else {
	                            peg$currPos = s3;
	                            s3 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s3;
	                        s3 = peg$FAILED;
	                    }
	                }
	                if (s2 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c202(s1, s2);
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseHashValue() {
	            var s0, s1, s2, s3, s4, s5;
	            s0 = peg$currPos;
	            s1 = peg$parse_();
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseHashKey();
	                if (s2 !== peg$FAILED) {
	                    s3 = peg$parse_();
	                    if (s3 !== peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 58) {
	                            s4 = peg$c93;
	                            peg$currPos++;
	                        } else {
	                            s4 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c94);
	                            }
	                        }
	                        if (s4 !== peg$FAILED) {
	                            s5 = peg$parseTernaryConditional();
	                            if (s5 === peg$FAILED) {
	                                s5 = null;
	                            }
	                            if (s5 !== peg$FAILED) {
	                                peg$savedPos = s0;
	                                s1 = peg$c203(s2, s5);
	                                s0 = s1;
	                            } else {
	                                peg$currPos = s0;
	                                s0 = peg$FAILED;
	                            }
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            return s0;
	        }
	        function peg$parseHashKey() {
	            var s0, s1;
	            s0 = peg$currPos;
	            s1 = peg$parseStringLiteral();
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c204(s1);
	            }
	            s0 = s1;
	            if (s0 === peg$FAILED) {
	                s0 = peg$currPos;
	                s1 = peg$parseReferenceName();
	                if (s1 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c205(s1);
	                }
	                s0 = s1;
	            }
	            return s0;
	        }
	        function peg$parseStringLiteral() {
	            var s0, s1, s2, s3;
	            peg$silentFails++;
	            s0 = peg$currPos;
	            if (input.charCodeAt(peg$currPos) === 34) {
	                s1 = peg$c77;
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c78);
	                }
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = [];
	                s3 = peg$parseDoubleStringCharacter();
	                while (s3 !== peg$FAILED) {
	                    s2.push(s3);
	                    s3 = peg$parseDoubleStringCharacter();
	                }
	                if (s2 !== peg$FAILED) {
	                    if (input.charCodeAt(peg$currPos) === 34) {
	                        s3 = peg$c77;
	                        peg$currPos++;
	                    } else {
	                        s3 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c78);
	                        }
	                    }
	                    if (s3 !== peg$FAILED) {
	                        peg$savedPos = s0;
	                        s1 = peg$c207(s2);
	                        s0 = s1;
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                s0 = peg$currPos;
	                if (input.charCodeAt(peg$currPos) === 39) {
	                    s1 = peg$c83;
	                    peg$currPos++;
	                } else {
	                    s1 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c84);
	                    }
	                }
	                if (s1 !== peg$FAILED) {
	                    s2 = [];
	                    s3 = peg$parseSingleStringCharacter();
	                    while (s3 !== peg$FAILED) {
	                        s2.push(s3);
	                        s3 = peg$parseSingleStringCharacter();
	                    }
	                    if (s2 !== peg$FAILED) {
	                        if (input.charCodeAt(peg$currPos) === 39) {
	                            s3 = peg$c83;
	                            peg$currPos++;
	                        } else {
	                            s3 = peg$FAILED;
	                            if (peg$silentFails === 0) {
	                                peg$fail(peg$c84);
	                            }
	                        }
	                        if (s3 !== peg$FAILED) {
	                            peg$savedPos = s0;
	                            s1 = peg$c207(s2);
	                            s0 = s1;
	                        } else {
	                            peg$currPos = s0;
	                            s0 = peg$FAILED;
	                        }
	                    } else {
	                        peg$currPos = s0;
	                        s0 = peg$FAILED;
	                    }
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            }
	            peg$silentFails--;
	            if (s0 === peg$FAILED) {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c206);
	                }
	            }
	            return s0;
	        }
	        function peg$parseDoubleStringCharacter() {
	            var s0, s1, s2;
	            s0 = peg$currPos;
	            s1 = peg$currPos;
	            peg$silentFails++;
	            if (input.charCodeAt(peg$currPos) === 34) {
	                s2 = peg$c77;
	                peg$currPos++;
	            } else {
	                s2 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c78);
	                }
	            }
	            if (s2 === peg$FAILED) {
	                if (input.charCodeAt(peg$currPos) === 92) {
	                    s2 = peg$c208;
	                    peg$currPos++;
	                } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c209);
	                    }
	                }
	            }
	            peg$silentFails--;
	            if (s2 === peg$FAILED) {
	                s1 = void 0;
	            } else {
	                peg$currPos = s1;
	                s1 = peg$FAILED;
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseSourceCharacter();
	                if (s2 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c210();
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                if (input.substr(peg$currPos, 2) === peg$c211) {
	                    s0 = peg$c211;
	                    peg$currPos += 2;
	                } else {
	                    s0 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c212);
	                    }
	                }
	            }
	            return s0;
	        }
	        function peg$parseSingleStringCharacter() {
	            var s0, s1, s2;
	            s0 = peg$currPos;
	            s1 = peg$currPos;
	            peg$silentFails++;
	            if (input.charCodeAt(peg$currPos) === 39) {
	                s2 = peg$c83;
	                peg$currPos++;
	            } else {
	                s2 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c84);
	                }
	            }
	            if (s2 === peg$FAILED) {
	                if (input.charCodeAt(peg$currPos) === 92) {
	                    s2 = peg$c208;
	                    peg$currPos++;
	                } else {
	                    s2 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c209);
	                    }
	                }
	            }
	            peg$silentFails--;
	            if (s2 === peg$FAILED) {
	                s1 = void 0;
	            } else {
	                peg$currPos = s1;
	                s1 = peg$FAILED;
	            }
	            if (s1 !== peg$FAILED) {
	                s2 = peg$parseSourceCharacter();
	                if (s2 !== peg$FAILED) {
	                    peg$savedPos = s0;
	                    s1 = peg$c210();
	                    s0 = s1;
	                } else {
	                    peg$currPos = s0;
	                    s0 = peg$FAILED;
	                }
	            } else {
	                peg$currPos = s0;
	                s0 = peg$FAILED;
	            }
	            if (s0 === peg$FAILED) {
	                if (input.substr(peg$currPos, 2) === peg$c213) {
	                    s0 = peg$c213;
	                    peg$currPos += 2;
	                } else {
	                    s0 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c214);
	                    }
	                }
	            }
	            return s0;
	        }
	        function peg$parseSourceCharacter() {
	            var s0;
	            if (input.length > peg$currPos) {
	                s0 = input.charAt(peg$currPos);
	                peg$currPos++;
	            } else {
	                s0 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c215);
	                }
	            }
	            return s0;
	        }
	        function peg$parseWord() {
	            var s0, s1, s2;
	            s0 = peg$currPos;
	            s1 = [];
	            if (peg$c216.test(input.charAt(peg$currPos))) {
	                s2 = input.charAt(peg$currPos);
	                peg$currPos++;
	            } else {
	                s2 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c217);
	                }
	            }
	            if (s2 !== peg$FAILED) {
	                while (s2 !== peg$FAILED) {
	                    s1.push(s2);
	                    if (peg$c216.test(input.charAt(peg$currPos))) {
	                        s2 = input.charAt(peg$currPos);
	                        peg$currPos++;
	                    } else {
	                        s2 = peg$FAILED;
	                        if (peg$silentFails === 0) {
	                            peg$fail(peg$c217);
	                        }
	                    }
	                }
	            } else {
	                s1 = peg$FAILED;
	            }
	            if (s1 !== peg$FAILED) {
	                peg$savedPos = s0;
	                s1 = peg$c218(s1);
	            }
	            s0 = s1;
	            return s0;
	        }
	        function peg$parse_() {
	            var s0, s1;
	            s0 = [];
	            if (peg$c219.test(input.charAt(peg$currPos))) {
	                s1 = input.charAt(peg$currPos);
	                peg$currPos++;
	            } else {
	                s1 = peg$FAILED;
	                if (peg$silentFails === 0) {
	                    peg$fail(peg$c220);
	                }
	            }
	            while (s1 !== peg$FAILED) {
	                s0.push(s1);
	                if (peg$c219.test(input.charAt(peg$currPos))) {
	                    s1 = input.charAt(peg$currPos);
	                    peg$currPos++;
	                } else {
	                    s1 = peg$FAILED;
	                    if (peg$silentFails === 0) {
	                        peg$fail(peg$c220);
	                    }
	                }
	            }
	            return s0;
	        }
	        /*jshint laxcomma:false */
	        function trimWhitespace(ws) {
	            return trimNewLineChars(ws).replace(/(^[\r\n]+)|([\r\n]+$)/, " ");
	        }
	        function trimEnds(ws) {
	            return ws.replace(/(^\s+)|(\s+$)/, "").replace(/[\r\n]/g, "\\n");
	        }
	        function trimNewLineChars(ws) {
	            return ws.replace(/[ \r\n\t]+/g, " ");
	        }
	        function trimmedText() {
	            return trimWhitespace(text());
	        }
	        function attrValues(values) {
	            values = values.filter(function (v) {
	                return !/^[\n\t\r]+$/.test(v.value);
	            });
	            if (values.length === 1 && values[0].type === "string") {
	                return values[0];
	            } else {
	                return values;
	            }
	        }
	        function trimTextExpressions(expressions) {
	            function _trim(exprs) {
	                var expr;
	                for (var i = exprs.length; i--;) {
	                    expr = exprs[i];
	                    if (expr.type == "textNode" && !/\S/.test(expr.value) && !expr.decoded) {
	                        exprs.splice(i, 1);
	                    } else {
	                        break;
	                    }
	                }
	                return exprs;
	            }
	            return _trim(_trim(expressions.reverse()).reverse());
	        }
	        function expression(name) {
	            return Array.prototype.slice.call(arguments);
	        }
	        function escapeString(string) {
	            return string.replace(/[\n\r]+/g, "\\n").replace(/'/g, "\\'");
	        }
	        peg$result = peg$startRuleFunction();
	        if (peg$result !== peg$FAILED && peg$currPos === input.length) {
	            return peg$result;
	        } else {
	            if (peg$result !== peg$FAILED && peg$currPos < input.length) {
	                peg$fail({ type: "end", description: "end of input" });
	            }
	            throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
	        }
	    }
	    return {
	        SyntaxError: peg$SyntaxError,
	        parse: peg$parse
	    };
	}();

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var utils = __webpack_require__(37);

	var Binding = function () {
	    function Binding(ref, view) {
	        _classCallCheck(this, Binding);

	        this._attrBindings = {};
	        this.ref = ref;
	        this.view = view;
	        this.options = view.template.options;
	        this._attributeClasses = this.options.attributes;
	    }

	    Binding.prototype.setAttribute = function setAttribute(key, value) {
	        if (!this.setAsRegisteredAttribute(key, value)) {
	            if (value != void 0) {
	                this.ref.setAttribute(key, value);
	            } else {}
	        }
	    };

	    Binding.prototype.setProperty = function setProperty(key, value) {
	        if (!this.setAsRegisteredAttribute(key, value)) {
	            // no node type? It's a registered component.
	            if (!this.ref.nodeType) {
	                this.ref.setAttribute(key, value);
	            } else {
	                this.ref[key] = value;
	            }
	        }
	    };

	    Binding.prototype.setAsRegisteredAttribute = function setAsRegisteredAttribute(key, value) {
	        if (this._attrBindings[key]) {
	            this._attrBindings[key].value = value;
	        } else {
	            var attrClass = this._attributeClasses.get(key);
	            if (attrClass) {
	                this._attrBindings[key] = new attrClass(this.ref, key, value, this.view);
	            } else {
	                return false;
	            }
	        }
	        return true;
	    };

	    Binding.prototype.update = function update(context) {
	        this._update();
	        for (var key in this._attrBindings) {
	            this._attrBindings[key].update();
	        }
	    };

	    Binding.prototype.destroy = function destroy() {
	        for (var key in this._attrBindings) {
	            this._attrBindings[key].destroy();
	        }
	    };

	    return Binding;
	}();

	exports.Binding = Binding;
	function binding(initialize, update) {
	    return utils.extendClass(Binding, {
	        initialize: initialize || function () {},
	        _update: update || function () {}
	    });
	}
	exports.binding = binding;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var internal_1 = __webpack_require__(16);
	var typings_1 = __webpack_require__(29);
	var di_1 = __webpack_require__(17);
	var utils = __webpack_require__(6);
	var templ = __webpack_require__(30);
	var context_1 = __webpack_require__(60);
	var controller_factory_1 = __webpack_require__(28);

	var ModuleFactory = (function () {
	    function ModuleFactory(name, module, container) {
	        _classCallCheck(this, ModuleFactory);

	        if (arguments.length != 3) {
	            throw new Error();
	        }
	        this.name = name;
	        this.module = module;
	        this.container = container;
	        this.container.registerSingleton(name, module);
	        this.container.registerInstance('$container', this.container);
	    }

	    _createClass(ModuleFactory, [{
	        key: 'controller',
	        value: function controller(name, definition) {
	            var _internal_1$getDependencies = internal_1.getDependencies(definition);

	            var _internal_1$getDependencies2 = _slicedToArray(_internal_1$getDependencies, 2);

	            var def = _internal_1$getDependencies2[0];
	            var deps = _internal_1$getDependencies2[1];

	            if (def) {
	                var fn = undefined;
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
	                    throw new typings_1.StickError('controller defition should be a function or an object literal');
	                }
	                internal_1.setDependencyType(internal_1.DependencyType.Controller)(fn);
	                var factory = new controller_factory_1.ControllerFactory(name, fn, this.container.createChild());
	                this.container.registerInstance(name, factory, true);
	            } else {
	                throw new typings_1.StickError("controller definition should be a function, function constructor or a object literal");
	            }
	            return this;
	        }
	    }, {
	        key: 'service',
	        value: function service(name, definition) {
	            var _internal_1$getDependencies3 = internal_1.getDependencies(definition);

	            var _internal_1$getDependencies32 = _slicedToArray(_internal_1$getDependencies3, 1);

	            var fn = _internal_1$getDependencies32[0];

	            if (fn && typeof fn === 'function') {
	                internal_1.setDependencyType(internal_1.DependencyType.Service)(fn);
	                this.container.registerSingleton(name, fn);
	            } else {
	                throw new typings_1.StickError('service should be a function');
	            }
	            return this;
	        }
	    }, {
	        key: 'factory',
	        value: function factory(name, _factory) {
	            var _internal_1$getDependencies4 = internal_1.getDependencies(_factory);

	            var _internal_1$getDependencies42 = _slicedToArray(_internal_1$getDependencies4, 1);

	            var fn = _internal_1$getDependencies42[0];

	            if (!fn) throw new typings_1.StickError('factory');
	            if (typeof fn === 'function') {
	                internal_1.setDependencyType(internal_1.DependencyType.Factory)(fn);
	                internal_1.setActivator(fn, di_1.FactoryActivator.instance);
	                this.container.registerSingleton(name, fn);
	            } else {
	                this.container.registerInstance(name, fn);
	            }
	            return this;
	        }
	    }, {
	        key: 'create',
	        value: function create() {
	            var _this = this;

	            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            if (this.container.hasInstance(this.name)) {
	                return utils.Promise.resolve(this.container.get(this.name));
	            }
	            this.container.registerSingleton('$context', context_1.getContext());
	            var ctx = this.container.get('$context');
	            if (options.parent) {
	                this.container.parent = options.parent;
	                if (options.parent.hasHandler('$context')) {
	                    ctx.__parent = options.parent.get('$context');
	                }
	            }
	            if (options.template || options.el) {
	                return this.resolveTemplate(ctx, options).then(function (template) {
	                    _this.container.registerInstance("template", template, true);
	                    if (options.el) {
	                        var el = _this.container.get('template').render();
	                        options.el.innerHTML = '';
	                        options.el.appendChild(el);
	                        _this.container.registerInstance('$elm', options.el, true);
	                    }
	                    ctx.$observe();
	                    var mod = _this.container.get(_this.name);
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
	            var mod = this.container.get(this.name);
	            ctx.$unobserve();
	            return utils.Promise.resolve(mod);
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
	                return utils.Promise.reject(new typings_1.StickError("no element or template"));
	            }
	            return promise.then(function (templateString) {
	                return $template(templateString, ctx.__model);
	            });
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            //this.container.destroy();
	        }
	    }]);

	    return ModuleFactory;
	})();

	exports.ModuleFactory = ModuleFactory;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object_observer_context_1 = __webpack_require__(61);
	var dirty_object_context_1 = __webpack_require__(69);
	function createContext(model, mediator) {
	    if (typeof Object.observe === 'function') {
	        return new object_observer_context_1.ObjectObserveProxy(mediator);
	    } /*else if (typeof (global||window).Proxy  === 'function') {
	        
	      }*/
	    else {
	            return new dirty_object_context_1.DirtyObjectObserver(mediator);
	        }
	}
	exports.createContext = createContext;
	function getContext() {
	    if (typeof Object.observe === 'function') {
	        return object_observer_context_1.ObjectObserveProxy;
	    } /*else if (typeof (global||window).Proxy  === 'function') {
	        
	      }*/
	    else {
	            return dirty_object_context_1.DirtyObjectObserver;
	        }
	}
	exports.getContext = getContext;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var context_1 = __webpack_require__(62);

	var ObjectObserveProxy = (function (_context_1$Context) {
	    _inherits(ObjectObserveProxy, _context_1$Context);

	    function ObjectObserveProxy() {
	        _classCallCheck(this, ObjectObserveProxy);

	        _get(Object.getPrototypeOf(ObjectObserveProxy.prototype), 'constructor', this).apply(this, arguments);
	    }

	    _createClass(ObjectObserveProxy, [{
	        key: '$observe',
	        value: function $observe() {
	            Object.observe(this, this.__onchange);
	        }
	    }, {
	        key: '$unobserve',
	        value: function $unobserve() {
	            Object.unobserve(this, this.__onchange);
	        }
	    }, {
	        key: '$createChild',
	        value: function $createChild() {
	            var child = new ObjectObserveProxy(this.__mediator);
	            child.__parent = this;
	            return child;
	        }
	    }]);

	    return ObjectObserveProxy;
	})(context_1.Context);

	exports.ObjectObserveProxy = ObjectObserveProxy;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var collection_1 = __webpack_require__(63);
	var utils = __webpack_require__(6);
	var annotations_1 = __webpack_require__(15);
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
	var reserved_words = ["__queue", "__parent", "__model", "__subscriber", '__mediator'];
	var Context = (function () {
	    function Context(mediator) {
	        _classCallCheck(this, Context);

	        this.__queue = 0;
	        this.__mediator = mediator;
	        this.__model = new collection_1.NestedModel();
	        this.__onchange = utils.bind(this.__onchange, this);
	        this.__subscribers = new Map();
	    }

	    _createClass(Context, [{
	        key: "$call",
	        value: function $call(fn, ctx, args) {
	            var _this = this;

	            this.$observe();
	            var results = utils.callFunc(fn, ctx, args);
	            if (results) {
	                this.__queue++;
	                return utils.toPromise(results).then(function () {
	                    if (--_this.__queue === 0) _this.$unobserve();
	                    return results;
	                });
	            } else {
	                var _ret = (function () {
	                    var defer = utils.deferred();
	                    utils.nextTick(function () {
	                        if (_this.__queue == 0) _this.$unobserve();
	                        defer.resolve(null);
	                    });
	                    return {
	                        v: defer.promise
	                    };
	                })();

	                if (typeof _ret === "object") return _ret.v;
	            }
	        }
	    }, {
	        key: "$subscribe",
	        value: function $subscribe(event, _handler) {
	            var _this2 = this;

	            var ctx = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

	            var ev = {
	                event: event,
	                handler: function handler() {
	                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                        args[_key] = arguments[_key];
	                    }

	                    _this2.$call(_handler, ctx, args);
	                },
	                id: utils.uniqueId("ctx")
	            };
	            this.__subscribers.set(_handler, ev);
	            this.__mediator.subscribe(event, ev.handler, this);
	            return ev.id;
	        }
	    }, {
	        key: "$unsubscribe",
	        value: function $unsubscribe(event, handler) {
	            var ev = null,
	                key = null;
	            if (typeof handler === 'string') {
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;

	                try {
	                    for (var _iterator = this.__subscribers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var _step$value = _slicedToArray(_step.value, 2);

	                        var k = _step$value[0];
	                        var v = _step$value[1];

	                        if (v.id === handler) {
	                            ev = this.__subscribers.get(k);
	                            key = k;
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator["return"]) {
	                            _iterator["return"]();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }
	            } else if (this.__subscribers.has(handler)) {
	                ev = this.__subscribers.get(handler);
	                key = handler;
	            }
	            if (ev !== null) {
	                console.log('EVET', ev, this.__mediator);
	                this.__mediator.unsubscribe(event, ev.handler);
	                this.__subscribers["delete"](key);
	            }
	            return this;
	        }
	    }, {
	        key: "$publish",
	        value: function $publish(event) {
	            var _mediator;

	            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	                args[_key2 - 1] = arguments[_key2];
	            }

	            (_mediator = this.__mediator).publish.apply(_mediator, [event].concat(args));
	        }
	    }, {
	        key: "__onchange",
	        value: function __onchange(events) {
	            var _this3 = this;

	            var props = {};
	            for (var i = 0, ii = events.length; i < ii; i++) {
	                var e = events[i];
	                var names = e.name.split('.');
	                if (!! ~reserved_words.indexOf(names[0])) {
	                    //console.warn('cannot set a reserved word:', reserved_words);
	                    continue;
	                }
	                if (e.type === 'delete') {
	                    this.__model.set(e.name, { unset: true });
	                } else {
	                    props[e.name] = this[e.name];
	                }
	            }

	            var _exports$get_atributes = exports.get_atributes(props);

	            var attr = _exports$get_atributes.attr;
	            var deferred = _exports$get_atributes.deferred;

	            if (Object.keys(attr).length) {
	                var _props = this.__normalizeAttr(attr);
	                this.$unobserve();
	                this.__model.set(_props);
	                utils.extend(this, _props);
	                this.$observe();
	            }
	            if (Object.keys(deferred).length) {
	                this.__queue++;
	                utils.toPromise(deferred).then(function (props) {
	                    if (--_this3.__queue === 0) {
	                        _this3.$unobserve();
	                    }
	                    props = _this3.__normalizeAttr(props);
	                    utils.extend(_this3, props);
	                    _this3.__model.set(props);
	                })["catch"](function (e) {
	                    _this3.__model.trigger('error', e);
	                    _this3.$unobserve();
	                });
	            }
	        }
	    }, {
	        key: "__normalizeAttr",
	        value: function __normalizeAttr(attr) {
	            for (var key in attr) {
	                var val = attr[key];
	                if (Array.isArray(val) && val.length > 0 && utils.isObject(val[0])) {
	                    val = new collection_1.Collection(val);
	                    attr[key] = val;
	                }
	            }
	            return attr;
	        }
	    }, {
	        key: "$destroy",
	        value: function $destroy() {
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = this.__subscribers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var _step2$value = _slicedToArray(_step2.value, 2);

	                    var k = _step2$value[0];
	                    var v = _step2$value[1];

	                    this.__mediator.unsubscribe(v.event, k);
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
	                        _iterator2["return"]();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }

	            this.__subscribers.clear();
	        }
	    }, {
	        key: "$root",
	        get: function get() {
	            var parent = this.__parent;
	            while (parent != null) {
	                if (!parent.__parent) return parent;
	                parent = parent.__parent;
	            }
	            return this;
	        }
	    }, {
	        key: "$parent",
	        get: function get() {
	            return this.__parent;
	        }
	    }]);

	    return Context;
	})();
	Context = __decorate([annotations_1.inject('$mediator')], Context);
	exports.Context = Context;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(64));
	__export(__webpack_require__(66));
	__export(__webpack_require__(67));
	__export(__webpack_require__(68));


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var object_1 = __webpack_require__(65);
	var model_1 = __webpack_require__(66);
	var objects_1 = __webpack_require__(9);
	var arrays_1 = __webpack_require__(7);
	var utils_1 = __webpack_require__(8);
	var setOptions = { add: true, remove: true, merge: true };
	var addOptions = { add: true, remove: false };
	var Collection = (function (_super) {
	    __extends(Collection, _super);
	    function Collection(models, options) {
	        if (options === void 0) { options = {}; }
	        this.options = options;
	        if (this.options.model) {
	            this.Model = this.options.model;
	        }
	        if (models) {
	            this.add(models);
	        }
	        _super.call(this);
	    }
	    Object.defineProperty(Collection.prototype, "length", {
	        get: function () {
	            return this.models.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Collection.prototype, "Model", {
	        get: function () {
	            if (!this._model) {
	                this._model = model_1.Model;
	            }
	            return this._model;
	        },
	        set: function (con) {
	            this._model = con;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Collection.prototype, "models", {
	        get: function () {
	            return this._models || (this._models = []);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Collection.prototype.add = function (models, options) {
	        var _this = this;
	        if (options === void 0) { options = {}; }
	        if (!Array.isArray(models)) {
	            if (!(models instanceof this.Model)) {
	                models = this.create(models, { add: false });
	            }
	        }
	        else {
	            models = models.map(function (item) {
	                return (item instanceof _this.Model) ? item : _this.create(item, { add: false });
	            });
	        }
	        this.set(models, objects_1.extend({ merge: false }, options, addOptions));
	    };
	    Collection.prototype.set = function (items, options) {
	        if (options === void 0) { options = {}; }
	        options = objects_1.extend({}, setOptions, options);
	        if (options.parse)
	            items = this.parse(items, options);
	        var singular = !Array.isArray(items);
	        var models = (singular ? (items ? [items] : []) : items.slice());
	        var i, l, id, model, attrs, existing, sort;
	        var at = options.at;
	        var sortable = this.comparator && (at == null) && options.sort !== false;
	        var sortAttr = typeof this.comparator === 'string' ? this.comparator : null;
	        var toAdd = [], toRemove = [], modelMap = {};
	        var add = options.add, merge = options.merge, remove = options.remove;
	        var order = !sortable && add && remove ? [] : null;
	        for (i = 0, l = models.length; i < l; i++) {
	            model = models[i];
	            id = model.get(model.idAttribute) || model.uid;
	            if (existing = this.get(id)) {
	                if (remove)
	                    modelMap[existing.uid] = true;
	                if (merge) {
	                    attrs = model.toJSON();
	                    existing.set(attrs, options);
	                    if (sortable && !sort && existing.hasChanged(sortAttr))
	                        sort = true;
	                }
	                models[i] = existing;
	            }
	            else if (add) {
	                models[i] = model;
	                if (!model)
	                    continue;
	                toAdd.push(model);
	                this._addReference(model, options);
	            }
	            model = existing || model;
	            if (order && !modelMap[model.id])
	                order.push(model);
	            modelMap[model.uid] = true;
	        }
	        if (remove) {
	            for (i = 0, l = this.length; i < l; ++i) {
	                if (!modelMap[(model = this.models[i]).uid])
	                    toRemove.push(model);
	            }
	            if (toRemove.length)
	                this.remove(toRemove, options);
	        }
	        if (toAdd.length || (order && order.length)) {
	            if (sortable)
	                sort = true;
	            if (at != null) {
	                for (i = 0, l = toAdd.length; i < l; i++) {
	                    this.models.splice(at + i, 0, toAdd[i]);
	                }
	            }
	            else {
	                if (order)
	                    this.models.length = 0;
	                var orderedModels = order || toAdd;
	                for (i = 0, l = orderedModels.length; i < l; i++) {
	                    this.models.push(orderedModels[i]);
	                }
	            }
	        }
	        if (sort)
	            this.sort({ silent: true });
	        if (!options.silent) {
	            for (i = 0, l = toAdd.length; i < l; i++) {
	                (model = toAdd[i]).trigger('add', model, this, options);
	            }
	            if (sort || (order && order.length))
	                this.trigger('sort', this, options);
	            if (toAdd.length || toRemove.length)
	                this.trigger('update', this, options);
	        }
	        return singular ? models[0] : models;
	    };
	    Collection.prototype.remove = function (models, options) {
	        if (options === void 0) { options = {}; }
	        var singular = !Array.isArray(models);
	        models = (singular ? [models] : models.slice());
	        var i, l, index, model;
	        for (i = 0, l = models.length; i < l; i++) {
	            model = models[i] = this.get(models[i]);
	            if (!model)
	                continue;
	            index = this.indexOf(model);
	            this.models.splice(index, 1);
	            if (!options.silent) {
	                options.index = index;
	                model.trigger('remove', model, this, options);
	            }
	            this._removeReference(model, options);
	        }
	        return singular ? models[0] : models;
	    };
	    Collection.prototype.get = function (id) {
	        return this.find(id);
	    };
	    Collection.prototype.at = function (index) {
	        return this.models[index];
	    };
	    Collection.prototype.clone = function (options) {
	        options = options || this.options;
	        return new this.constructor(this.models, options);
	    };
	    Collection.prototype.sort = function (options) {
	        if (options === void 0) { options = {}; }
	        if (!this.comparator)
	            throw new Error('Cannot sort a set without a comparator');
	        if (typeof this.comparator === 'string' || this.comparator.length === 1) {
	            this._models = this.sortBy(this.comparator, this);
	        }
	        else {
	            this.models.sort(this.comparator.bind(this));
	        }
	        if (!options.silent)
	            this.trigger('sort', this, options);
	        return this;
	    };
	    Collection.prototype.sortBy = function (key, context) {
	        return arrays_1.sortBy(this._models, key, context);
	    };
	    Collection.prototype.push = function (model, options) {
	        if (options === void 0) { options = {}; }
	        return this.add(model, objects_1.extend({ at: this.length }, options));
	    };
	    Collection.prototype.reset = function (models, options) {
	        var _this = this;
	        if (options === void 0) { options = {}; }
	        this.forEach(function (model) {
	            _this._removeReference(model, options);
	        });
	        options.previousModels = this.models;
	        this._reset();
	        models = this.add(models, options);
	        if (!options.silent)
	            this.trigger('reset', this, options);
	        return models;
	    };
	    Collection.prototype.create = function (values, options) {
	        if (options === void 0) { options = { add: true }; }
	        var model = new this.Model(values, options);
	        if (options.add)
	            this.add(model);
	        return model;
	    };
	    Collection.prototype.parse = function (models, options) {
	        if (options === void 0) { options = {}; }
	        return models;
	    };
	    Collection.prototype.find = function (nidOrFn) {
	        var model;
	        if (typeof nidOrFn === 'function') {
	            model = arrays_1.find(this.models, nidOrFn);
	        }
	        else {
	            model = arrays_1.find(this.models, function (model) {
	                return model.id == nidOrFn || model.uid == nidOrFn || nidOrFn === model;
	            });
	        }
	        return model;
	    };
	    Collection.prototype.forEach = function (iterator, ctx) {
	        for (var i = 0, l = this.models.length; i < l; i++) {
	            iterator.call(ctx || this, this.models[i], i);
	        }
	        return this;
	    };
	    Collection.prototype.indexOf = function (model) {
	        return this.models.indexOf(model);
	    };
	    Collection.prototype.toJSON = function () {
	        return this.models.map(function (m) { return m.toJSON(); });
	    };
	    Collection.prototype._removeReference = function (model, options) {
	        if (this === model.collection)
	            delete model.collection;
	        this.stopListening(model);
	    };
	    Collection.prototype._addReference = function (model, options) {
	        if (!model.collection)
	            model.collection = this;
	        this.listenTo(model, 'all', this._onModelEvent);
	    };
	    Collection.prototype._reset = function () {
	        this._models = [];
	    };
	    Collection.prototype._onModelEvent = function (event, model, collection, options) {
	        if ((event === 'add' || event === 'remove') && collection !== this)
	            return;
	        if (event === 'destroy')
	            this.remove(model, options);
	        utils_1.callFunc(this.trigger, this, arrays_1.slice(arguments));
	    };
	    Collection.prototype.destroy = function () {
	        var _this = this;
	        this.models.forEach(function (m) {
	            if (typeof m.destroy === 'function' &&
	                m.collection == _this)
	                m.destroy();
	        });
	        _super.prototype.destroy.call(this);
	    };
	    return Collection;
	})(object_1.BaseObject);
	exports.Collection = Collection;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var eventsjs_1 = __webpack_require__(5);
	var utils_1 = __webpack_require__(8);
	var BaseObject = (function (_super) {
	    __extends(BaseObject, _super);
	    function BaseObject() {
	        _super.apply(this, arguments);
	    }
	    BaseObject.extend = function (proto, stat) {
	        return utils_1.inherits(this, proto, stat);
	    };
	    return BaseObject;
	})(eventsjs_1.EventEmitter);
	exports.BaseObject = BaseObject;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var object_1 = __webpack_require__(65);
	var utils_1 = __webpack_require__(8);
	var objects_1 = __webpack_require__(9);
	var Model = (function (_super) {
	    __extends(Model, _super);
	    function Model(attributes, options) {
	        if (attributes === void 0) { attributes = {}; }
	        options = options || {};
	        this._attributes = attributes;
	        this.uid = utils_1.uniqueId('uid');
	        this._changed = {};
	        this.collection = options.collection;
	        _super.call(this);
	    }
	    Object.defineProperty(Model.prototype, "id", {
	        get: function () {
	            if (this.idAttribute in this._attributes)
	                return this._attributes[this.idAttribute];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Model.prototype.set = function (key, val, options) {
	        if (options === void 0) { options = {}; }
	        var attr, attrs = {}, unset, changes, silent, changing, prev, current;
	        if (key == null)
	            return this;
	        if (typeof key === 'object') {
	            attrs = key;
	            options = val;
	        }
	        else {
	            attrs[key] = val;
	        }
	        options || (options = {});
	        unset = options.unset;
	        silent = options.silent;
	        changes = [];
	        changing = this._changing;
	        this._changing = true;
	        if (!changing) {
	            this._previousAttributes = objects_1.extend(Object.create(null), this._attributes);
	            this._changed = {};
	        }
	        current = this._attributes, prev = this._previousAttributes;
	        for (attr in attrs) {
	            val = attrs[attr];
	            if (!utils_1.equal(current[attr], val))
	                changes.push(attr);
	            if (!utils_1.equal(prev[attr], val)) {
	                this._changed[attr] = val;
	            }
	            else {
	                delete this._changed[attr];
	            }
	            unset ? delete current[attr] : current[attr] = val;
	        }
	        if (!silent) {
	            if (changes.length)
	                this._pending = !!options;
	            for (var i = 0, l = changes.length; i < l; i++) {
	                this.trigger('change:' + changes[i], this, current[changes[i]], options);
	            }
	        }
	        if (changing)
	            return this;
	        if (!silent) {
	            while (this._pending) {
	                options = this._pending;
	                this._pending = false;
	                this.trigger('change', this, options);
	            }
	        }
	        this._pending = false;
	        this._changing = false;
	        return this;
	    };
	    Model.prototype.get = function (key) {
	        return this._attributes[key];
	    };
	    Model.prototype.unset = function (key, options) {
	        this.set(key, void 0, objects_1.extend({}, options, { unset: true }));
	    };
	    Model.prototype.has = function (attr) {
	        return this.get(attr) != null;
	    };
	    Model.prototype.hasChanged = function (attr) {
	        if (attr == null)
	            return !!Object.keys(this.changed).length;
	        return objects_1.has(this.changed, attr);
	    };
	    Model.prototype.clear = function (options) {
	        var attrs = {};
	        for (var key in this._attributes)
	            attrs[key] = void 0;
	        return this.set(attrs, objects_1.extend({}, options, { unset: true }));
	    };
	    Object.defineProperty(Model.prototype, "changed", {
	        get: function () {
	            return objects_1.extend({}, this._changed);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Model.prototype.changedAttributes = function (diff) {
	        if (!diff)
	            return this.hasChanged() ? objects_1.extend(Object.create(null), this.changed) : false;
	        var val, changed = {};
	        var old = this._changing ? this._previousAttributes : this._attributes;
	        for (var attr in diff) {
	            if (utils_1.equal(old[attr], (val = diff[attr])))
	                continue;
	            (changed || (changed = {}))[attr] = val;
	        }
	        return changed;
	    };
	    Model.prototype.previous = function (attr) {
	        if (attr == null || !this._previousAttributes)
	            return null;
	        return this._previousAttributes[attr];
	    };
	    Model.prototype.previousAttributes = function () {
	        return objects_1.extend(Object.create(null), this._previousAttributes);
	    };
	    Model.prototype.toJSON = function () {
	        return JSON.parse(JSON.stringify(this._attributes));
	    };
	    Model.prototype.clone = function () {
	        return new (this.constructor)(this._attributes);
	    };
	    return Model;
	})(object_1.BaseObject);
	exports.Model = Model;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var utils_1 = __webpack_require__(8);
	var objects_1 = __webpack_require__(9);
	var model_1 = __webpack_require__(66);
	function objToPaths(obj, separator) {
	    if (separator === void 0) { separator = "."; }
	    var ret = {};
	    for (var key in obj) {
	        var val = obj[key];
	        if (val && (val.constructor === Object || val.constructor === Array) && !objects_1.isEmpty(val)) {
	            var obj2 = objToPaths(val);
	            for (var key2 in obj2) {
	                var val2 = obj2[key2];
	                ret[key + separator + key2] = val2;
	            }
	        }
	        else {
	            ret[key] = val;
	        }
	    }
	    return ret;
	}
	function getNested(obj, path, return_exists, separator) {
	    if (separator === void 0) { separator = "."; }
	    var fields = path ? path.split(separator) : [];
	    var result = obj;
	    return_exists || (return_exists === false);
	    for (var i = 0, n = fields.length; i < n; i++) {
	        if (return_exists && !objects_1.has(result, fields[i])) {
	            return false;
	        }
	        result = result instanceof model_1.Model ? result.get(fields[i]) : result[fields[i]];
	        if (result == null && i < n - 1) {
	            result = {};
	        }
	        if (typeof result === 'undefined') {
	            if (return_exists) {
	                return true;
	            }
	            return result;
	        }
	    }
	    if (return_exists) {
	        return true;
	    }
	    return result;
	}
	function setNested(obj, path, val, options) {
	    options = options || {};
	    var separator = options.separator || ".";
	    var fields = path ? path.split(separator) : [];
	    var result = obj;
	    for (var i = 0, n = fields.length; i < n && result !== undefined; i++) {
	        var field = fields[i];
	        if (i === n - 1) {
	            options.unset ? delete result[field] : result[field] = val;
	        }
	        else {
	            if (typeof result[field] === 'undefined' || !objects_1.isObject(result[field])) {
	                if (options.unset) {
	                    delete result[field];
	                    return;
	                }
	                var nextField = fields[i + 1];
	                result[field] = /^\d+$/.test(nextField) ? [] : {};
	            }
	            result = result[field];
	        }
	    }
	}
	function deleteNested(obj, path) {
	    setNested(obj, path, null, {
	        unset: true
	    });
	}
	var NestedModel = (function (_super) {
	    __extends(NestedModel, _super);
	    function NestedModel() {
	        _super.apply(this, arguments);
	    }
	    NestedModel.prototype.get = function (attr) {
	        return getNested(this._attributes, attr);
	    };
	    NestedModel.prototype.set = function (key, val, options) {
	        var attr, attrs, unset, changes, silent, changing, prev, current;
	        if (key == null)
	            return this;
	        if (typeof key === 'object') {
	            attrs = key;
	            options = val || {};
	        }
	        else {
	            (attrs = {})[key] = val;
	        }
	        options || (options = {});
	        unset = options.unset;
	        silent = options.silent;
	        changes = [];
	        changing = this._changing;
	        this._changing = true;
	        if (!changing) {
	            this._previousAttributes = objects_1.extend({}, this._attributes);
	            this._changed = {};
	        }
	        current = this._attributes, prev = this._previousAttributes;
	        if (this.idAttribute in attrs)
	            this.id = attrs[this.idAttribute];
	        attrs = objToPaths(attrs);
	        for (attr in attrs) {
	            val = attrs[attr];
	            if (!utils_1.equal(getNested(current, attr), val)) {
	                changes.push(attr);
	                this._changed[attr] = val;
	            }
	            if (!utils_1.equal(getNested(prev, attr), val)) {
	                setNested(this.changed, attr, val);
	            }
	            else {
	                deleteNested(this.changed, attr);
	            }
	            unset ? deleteNested(current, attr) : setNested(current, attr, val);
	        }
	        if (!silent) {
	            if (changes.length)
	                this._pending = true;
	            var separator = NestedModel.keyPathSeparator;
	            var alreadyTriggered = {};
	            for (var i = 0, l = changes.length; i < l; i++) {
	                var key_1 = changes[i];
	                if (!alreadyTriggered.hasOwnProperty(key_1) || !alreadyTriggered[key_1]) {
	                    alreadyTriggered[key_1] = true;
	                    this.trigger('change:' + key_1, this, getNested(current, key_1), options);
	                }
	                var fields = key_1.split(separator);
	                for (var n = fields.length - 1; n > 0; n--) {
	                    var parentKey = fields.slice(0, n).join(separator), wildcardKey = parentKey + separator + '*';
	                    if (!alreadyTriggered.hasOwnProperty(wildcardKey) || !alreadyTriggered[wildcardKey]) {
	                        alreadyTriggered[wildcardKey] = true;
	                        this.trigger('change:' + wildcardKey, this, getNested(current, parentKey), options);
	                    }
	                    if (!alreadyTriggered.hasOwnProperty(parentKey) || !alreadyTriggered[parentKey]) {
	                        alreadyTriggered[parentKey] = true;
	                        this.trigger('change:' + parentKey, this, getNested(current, parentKey), options);
	                    }
	                }
	            }
	        }
	        if (changing)
	            return this;
	        if (!silent) {
	            while (this._pending) {
	                this._pending = false;
	                this.trigger('change', this, options);
	            }
	        }
	        this._pending = false;
	        this._changing = false;
	        return this;
	    };
	    NestedModel.prototype.clear = function (options) {
	        var attrs = {};
	        var shallowAttributes = objToPaths(this._attributes);
	        for (var key in shallowAttributes)
	            attrs[key] = void 0;
	        return this.set(attrs, objects_1.extend({}, options, {
	            unset: true
	        }));
	    };
	    NestedModel.prototype.hasChanged = function (attr) {
	        if (attr == null) {
	            return !Object.keys(this.changed).length;
	        }
	        return getNested(this.changed, attr) !== undefined;
	    };
	    NestedModel.prototype.changedAttributes = function (diff) {
	        if (!diff)
	            return this.hasChanged() ? objToPaths(this.changed) : false;
	        var old = this._changing ? this._previousAttributes : this._attributes;
	        diff = objToPaths(diff);
	        old = objToPaths(old);
	        var val, changed = false;
	        for (var attr in diff) {
	            if (utils_1.equal(old[attr], (val = diff[attr])))
	                continue;
	            (changed || (changed = {}))[attr] = val;
	        }
	        return changed;
	    };
	    NestedModel.prototype.previous = function (attr) {
	        if (attr == null || !this._previousAttributes) {
	            return null;
	        }
	        return getNested(this._previousAttributes, attr);
	    };
	    NestedModel.prototype.previousAttributes = function () {
	        return objects_1.extend({}, this._previousAttributes);
	    };
	    NestedModel.keyPathSeparator = '.';
	    return NestedModel;
	})(model_1.Model);
	exports.NestedModel = NestedModel;


/***/ },
/* 68 */
/***/ function(module, exports) {

	


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var context_1 = __webpack_require__(62);
	var index_1 = __webpack_require__(6);
	var reserved = ['model', 'parent', '__queue', '_onchange', '__timer', '_listeners', '__subscribers'];

	var DirtyObjectObserver = (function (_context_1$Context) {
	    _inherits(DirtyObjectObserver, _context_1$Context);

	    function DirtyObjectObserver() {
	        _classCallCheck(this, DirtyObjectObserver);

	        _get(Object.getPrototypeOf(DirtyObjectObserver.prototype), 'constructor', this).apply(this, arguments);
	    }

	    _createClass(DirtyObjectObserver, [{
	        key: '$observe',
	        value: function $observe() {
	            var _this = this;

	            this.$unobserve();
	            index_1.nextTick(function () {
	                _this._check(_this.__model);
	            });
	            this.__timer = setInterval(function () {
	                _this._check(_this.__model);
	            }, 300);
	            //super.observe();
	        }
	    }, {
	        key: '$unobserve',
	        value: function $unobserve() {
	            if (this.__timer) {
	                clearTimeout(this.__timer);
	                this.__timer = null;
	            }
	            //super.unobserve();
	        }
	    }, {
	        key: '_check',
	        value: function _check(model) {
	            var attributes = this.__model.toJSON();
	            var events = [],
	                v = undefined,
	                ev = undefined;
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = Object.keys(this)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var k = _step.value;

	                    v = this[k];
	                    if (~reserved.indexOf(k)) continue;
	                    ev = {
	                        name: k,
	                        object: this,
	                        type: v == null ? "delete" : ""
	                    };
	                    if (v && !attributes[k]) {
	                        ev.type = "add";
	                    } else if (v && !index_1.equal(v, attributes[k])) {
	                        ev.type = "update";
	                    }
	                    ev.oldValue = attributes[k];
	                    events.push(ev);
	                    delete attributes[k];
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator['return']) {
	                        _iterator['return']();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            for (var k in attributes) {
	                events.push({
	                    name: k,
	                    object: this,
	                    type: 'delete',
	                    oldValue: attributes[k]
	                });
	            }
	            if (events.length) this.__onchange(events);
	        }
	    }, {
	        key: '$createChild',
	        value: function $createChild() {
	            var child = new DirtyObjectObserver(this.__mediator);
	            child.__parent = this;
	            return child;
	        }
	    }]);

	    return DirtyObjectObserver;
	})(context_1.Context);

	exports.DirtyObjectObserver = DirtyObjectObserver;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var internal_1 = __webpack_require__(16);
	var typings_1 = __webpack_require__(29);
	var repository_1 = __webpack_require__(27);
	var utils = __webpack_require__(6);
	var module_factory_1 = __webpack_require__(59);
	var container_1 = __webpack_require__(71);
	var base_component_1 = __webpack_require__(72);
	var templ = __webpack_require__(30);
	var annotations = __webpack_require__(15);
	exports.decorators = annotations;
	function service(name, definition) {
	    var _internal_1$getDependencies = internal_1.getDependencies(definition);

	    var _internal_1$getDependencies2 = _slicedToArray(_internal_1$getDependencies, 1);

	    var fn = _internal_1$getDependencies2[0];

	    if (fn && typeof fn === 'function') {
	        repository_1.Repository.add(internal_1.DependencyType.Service, name, fn);
	    } else {
	        throw new typings_1.StickError('service should be a function');
	    }
	}
	exports.service = service;
	function factory(name, factory) {
	    var _internal_1$getDependencies3 = internal_1.getDependencies(factory);

	    var _internal_1$getDependencies32 = _slicedToArray(_internal_1$getDependencies3, 1);

	    var fn = _internal_1$getDependencies32[0];

	    if (!fn) throw new typings_1.StickError('factory');
	    repository_1.Repository.add(internal_1.DependencyType.Factory, name, fn);
	}
	exports.factory = factory;
	var container = new container_1.Container();
	function _module(name, definition) {
	    if (definition == null) {
	        var _factory = undefined;
	        // Check if module already is defined
	        if (container.hasHandler(name)) {
	            _factory = container.get(name);
	        } else if (repository_1.Repository.has(internal_1.DependencyType.Module, name)) {
	            var result = repository_1.Repository.get(internal_1.DependencyType.Module, name);
	            _factory = new module_factory_1.ModuleFactory(name, result.handler, container.createChild());
	            container.registerInstance(name, _factory);
	        } else {
	            throw new typings_1.StickError('no module named ' + name);
	        }
	        return _factory;
	    }

	    var _internal_1$getDependencies4 = internal_1.getDependencies(definition);

	    var _internal_1$getDependencies42 = _slicedToArray(_internal_1$getDependencies4, 2);

	    var def = _internal_1$getDependencies42[0];
	    var deps = _internal_1$getDependencies42[1];

	    if (def) {
	        var fn = undefined;
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
	            throw new typings_1.StickError('controller defition should be a function or an object literal');
	        }
	        var _factory2 = new module_factory_1.ModuleFactory(name, fn, container.createChild());
	        container.registerInstance(name, _factory2, true);
	        return _factory2;
	    } else {
	        throw new typings_1.StickError('controller defition should be a function or an object literal');
	    }
	}
	exports.module = _module;
	function component(name, handler) {
	    var component = undefined;

	    var _internal_1$getDependencies5 = internal_1.getDependencies(handler);

	    var _internal_1$getDependencies52 = _slicedToArray(_internal_1$getDependencies5, 2);

	    var c = _internal_1$getDependencies52[0];
	    var deps = _internal_1$getDependencies52[1];

	    if (typeof c === 'function') {
	        component = {
	            initialize: c
	        };
	    } else if (utils.isObject(c) && typeof c.initialize === 'function') {
	        if (deps && deps.length) {
	            c.initialize.inject = deps;
	        } else {
	            internal_1.getDependencies(c.initialize);
	        }
	        component = c;
	    } else {
	        throw new typings_1.StickError("component should be a function or an object");
	    }
	    var Component = utils.inherits(base_component_1.BaseComponent, component);
	    templ.component(name, Component);
	}
	exports.component = component;
	function attribute(name, handler) {
	    templ.attribute(name, handler);
	}
	exports.attribute = attribute;
	function decorator(name, decorator) {
	    if (utils.has(exports.decorators, name)) {
	        throw new Error('decorator called ' + name + ' already defined!');
	    }
	    exports.decorators[name] = decorator;
	}
	exports.decorator = decorator;
	function modifier(name, modifier) {
	    templ.modifier(name, modifier);
	}
	exports.modifier = modifier;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	})();

	var _get = function get(_x5, _x6, _x7) {
	    var _again = true;_function: while (_again) {
	        var object = _x5,
	            property = _x6,
	            receiver = _x7;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	            var parent = Object.getPrototypeOf(object);if (parent === null) {
	                return undefined;
	            } else {
	                _x5 = parent;_x6 = property;_x7 = receiver;_again = true;desc = parent = undefined;continue _function;
	            }
	        } else if ('value' in desc) {
	            return desc.value;
	        } else {
	            var getter = desc.get;if (getter === undefined) {
	                return undefined;
	            }return getter.call(receiver);
	        }
	    }
	};

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError('Cannot call a class as a function');
	    }
	}

	function _inherits(subClass, superClass) {
	    if (typeof superClass !== 'function' && superClass !== null) {
	        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
	    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var di_1 = __webpack_require__(17);
	var typings_1 = __webpack_require__(29);
	var repository_1 = __webpack_require__(27);
	var internal_1 = __webpack_require__(16);
	var utils = __webpack_require__(6);
	var controller_factory_1 = __webpack_require__(28);
	__export(__webpack_require__(17));
	function tryCatch(fn, ctx, args) {
	    var result = undefined,
	        error = undefined;
	    try {
	        result = utils.callFunc(fn, ctx, args);
	    } catch (e) {
	        error = e;
	    }
	    return [result, error];
	}
	exports.tryCatch = tryCatch;

	var Container = (function (_di_1$DIContainer) {
	    _inherits(Container, _di_1$DIContainer);

	    function Container(info) {
	        _classCallCheck(this, Container);

	        _get(Object.getPrototypeOf(Container.prototype), 'constructor', this).call(this, info);
	        this.__instances = new Map();
	    }

	    _createClass(Container, [{
	        key: 'hasInstance',
	        value: function hasInstance(key) {
	            return this.__instances.has(key);
	        }
	    }, {
	        key: 'hasHandler',
	        value: function hasHandler(name, parent, repository) {
	            var has = _get(Object.getPrototypeOf(Container.prototype), 'hasHandler', this).call(this, name, parent);
	            return !has && repository ? repository_1.Repository.hasAny(name) : has;
	        }
	    }, {
	        key: 'get',
	        value: function get(key, targetKey) {
	            var entry;
	            if (key === null || key === undefined) {
	                throw new di_1.DIBadKeyError();
	            }
	            if (key === di_1.DIContainer) {
	                return this;
	            }
	            if (key instanceof di_1.Resolver) {
	                return key.get(this);
	            }
	            entry = this.entries.get(key);
	            if (entry !== undefined) {
	                return entry[0](this);
	            }
	            if (this.parent && this.parent.hasHandler(key)) {
	                return this.parent.get(key, targetKey);
	            }
	            entry = repository_1.Repository.any(key);
	            if (entry != null) {
	                this.register(entry);
	                return this.entries.get(key)[0](this);
	            }
	            // No point in registrering a string
	            if (typeof key === 'string') {
	                throw new typings_1.StickDependencyError('no component registered for key: ' + key);
	            }
	            this.autoRegister(key, targetKey);
	            entry = this.entries.get(key);
	            return entry[0](this);
	        }
	    }, {
	        key: 'registerSingleton',
	        value: function registerSingleton(key, fn) {
	            var _this = this;

	            var targetKey = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

	            return this.registerHandler(key, function (x) {
	                if (_this.__instances.has(key)) {
	                    return _this.__instances.get(key);
	                } else {
	                    var singleton = _this.invoke(fn, null, targetKey);
	                    _this.__instances.set(key, singleton);
	                    return singleton;
	                }
	            });
	        }
	    }, {
	        key: 'registerInstance',
	        value: function registerInstance(key, instance) {
	            var track = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	            _get(Object.getPrototypeOf(Container.prototype), 'registerInstance', this).call(this, key, instance);
	            if (track) {
	                this.__instances.set(key, instance);
	            }
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.__instances.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var key = _step.value;

	                    this.destroy(key);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator['return']) {
	                        _iterator['return']();
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
	            var key = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	            var fn = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

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
	                        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
	                            _iterator2['return']();
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
	                this.__instances['delete'](key);
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
	                    this.registerSingleton(item.name, item.handler);
	                    break;
	                case internal_1.DependencyType.Factory:
	                    if (typeof item.handler === 'function') {
	                        internal_1.setActivator(item.handler, di_1.FactoryActivator.instance);
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
	})(di_1.DIContainer);

	exports.Container = Container;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../typings" />
	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var utilities_1 = __webpack_require__(6);
	var templ = __webpack_require__(30);
	var internal_1 = __webpack_require__(16);
	var vnode = templ.vnode;

	var BaseComponent = (function () {
	    function BaseComponent(section, vvnode, attributes, view) {
	        var _this = this;

	        _classCallCheck(this, BaseComponent);

	        if (this.update) {
	            this.update = utilities_1.bind(this.update, this);
	        }
	        this.section = section;
	        this.vnode = vvnode;
	        this.attributes = attributes;
	        this._attributes = {};
	        this.view = view;
	        this.document = view.template.options.document;
	        if (vvnode.childNodes) this.childTemplate = vnode.template(vnode.fragment(vvnode.childNodes), view.template.options);
	        for (var key in attributes) this.setAttribute(key, attributes[key]);
	        var container = this.view._container;
	        internal_1.resolveDependencies(this.initialize, container).then(function (deps) {
	            utilities_1.callFunc(_this.initialize, _this, deps);
	        })['catch'](function (e) {
	            throw e;
	        });
	    }

	    _createClass(BaseComponent, [{
	        key: 'initialize',
	        value: function initialize() {}
	    }, {
	        key: 'setAttribute',
	        value: function setAttribute(key, value) {
	            this._attributes[key] = value;
	        }
	    }, {
	        key: 'removeAttribute',
	        value: function removeAttribute(key) {
	            this._attributes[key] = void 0;
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            var a = this;
	            if (typeof a.onDestroy === 'function') {
	                a.onDestroy();
	            }
	        }
	    }]);

	    return BaseComponent;
	})();

	exports.BaseComponent = BaseComponent;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	/// <reference path="../typings" />
	var annotations_1 = __webpack_require__(15);
	var utilities_1 = __webpack_require__(6);
	var HttpService = (function () {
	    function HttpService() {
	        _classCallCheck(this, HttpService);
	    }

	    _createClass(HttpService, [{
	        key: "get",
	        value: function get(url) {
	            return utilities_1.request.get(url);
	        }
	    }, {
	        key: "post",
	        value: function post(url) {
	            return utilities_1.request.post(url);
	        }
	    }, {
	        key: "put",
	        value: function put(url) {
	            return utilities_1.request.put(url);
	        }
	    }, {
	        key: "del",
	        value: function del(url) {
	            return utilities_1.request.del(url);
	        }
	    }]);

	    return HttpService;
	})();
	HttpService = __decorate([annotations_1.service('$http')], HttpService);
	exports.HttpService = HttpService;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Stick = __webpack_require__(70);
	var template_view_1 = __webpack_require__(75);
	var templ = __webpack_require__(30);
	var utils = __webpack_require__(6);
	Stick.factory('$templateResolver', function () {
	    return function (name) {
	        var template = document.getElementById(name);
	        if (template == null) return utils.Promise.reject(new Error('template with id: \'' + name + '\' not found'));
	        return utils.Promise.resolve(template.innerHTML);
	    };
	});
	Stick.factory('$templateCreator', ['$templateResolver', '$container', function (resolver, container) {
	    return function (templateString, data) {
	        var template = templ.compile(templateString, {
	            viewClass: template_view_1.TemplateView
	        });
	        var view = template.view(data, {
	            container: container
	        });
	        return view;
	    };
	}]);

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings" />
	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var templ = __webpack_require__(30);
	var collection_1 = __webpack_require__(63);

	var TemplateView = (function (_templ$View) {
	    _inherits(TemplateView, _templ$View);

	    function TemplateView(section, template, context, options) {
	        _classCallCheck(this, TemplateView);

	        _get(Object.getPrototypeOf(TemplateView.prototype), 'constructor', this).call(this, section, template, context, options);
	        if (options.delegator) {
	            this.delegator = options.delegator;
	        }
	        if (options.container) {
	            this._container = options.container;
	        }
	    }

	    _createClass(TemplateView, [{
	        key: '_onModelChange',
	        value: function _onModelChange() {}
	    }, {
	        key: 'set',
	        value: function set(key, val) {
	            var silent = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	            if (!silent) {
	                if (!(this.context instanceof collection_1.Model)) {
	                    return _get(Object.getPrototypeOf(TemplateView.prototype), 'set', this).call(this, key, val);
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
	                    this.context.set(key.join('.'), val);
	                }
	            }
	            this.update();
	        }
	    }, {
	        key: 'get',
	        value: function get(key) {
	            if (!Array.isArray(key)) key = key.split(/[,.]/);
	            var value = undefined,
	                context = this.context;
	            if (key[0].substr(0, 1) === "@") {
	                key[0] = key[0].substr(1);
	                key.unshift('this');
	            }
	            if (key[0] === 'this') {
	                key.shift();
	                if (key.length === 0) {
	                    value = this.context;
	                }
	            } else if (key[0] === 'root') {
	                key.shift();
	                context = this.root.context;
	            }
	            key = key.join('.');
	            if (!value) {
	                if (!(this.context instanceof collection_1.Model)) {
	                    value = _get(Object.getPrototypeOf(TemplateView.prototype), 'get', this).call(this, key);
	                } else {
	                    value = context.get(key);
	                }
	            }
	            return value;
	        }
	    }, {
	        key: 'remove',
	        value: function remove() {
	            _get(Object.getPrototypeOf(TemplateView.prototype), 'remove', this).call(this);
	            delete this._container;
	            delete this.delegator;
	            delete this._context;
	        }
	    }, {
	        key: '$destroy',
	        value: function $destroy() {
	            this.remove();
	        }
	    }, {
	        key: 'context',
	        set: function set(context) {
	            if (this._context && this._context instanceof collection_1.Model) {}
	            if (context != null && context instanceof collection_1.Model) {
	                context.on('change', function () {
	                    var changed = context.changed;
	                    for (var k in changed) {
	                        this.set(k, changed[k]);
	                    }
	                }, this);
	            }
	            this._context = context;
	        },
	        get: function get() {
	            return this._context;
	        }
	    }]);

	    return TemplateView;
	})(templ.View);

	exports.TemplateView = TemplateView;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
	    var c = arguments.length,
	        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	        d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var annotations_1 = __webpack_require__(15);
	var eventsjs_1 = __webpack_require__(5);
	var Mediator = (function () {
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
	})();
	Mediator = __decorate([annotations_1.service('$mediator')], Mediator);
	exports.Mediator = Mediator;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var stick_1 = __webpack_require__(70);
	__export(__webpack_require__(75));
	var controller_1 = __webpack_require__(78);
	var repeat_1 = __webpack_require__(79);
	stick_1.component('controller', ['$container', controller_1.Controller]);
	stick_1.component('repeat', repeat_1.Repeat);
	__export(__webpack_require__(72));

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../typings" />
	'use strict';

	var controller_factory_1 = __webpack_require__(28);
	exports.Controller = {
	    initialize: function initialize($container) {
	        var _this = this;

	        if (this.attributes['name']) {
	            this.name = this._attributes['name'];
	            this.as = this._attributes['as'] || this.name;
	        }
	        this.factory = $container.get(this.name);
	        if (!(this.factory instanceof controller_factory_1.ControllerFactory)) {
	            throw new Error(this.name + ' is not a controller');
	        }
	        var template = this.childTemplate;
	        if (this.attributes['template']) {
	            template = this.attributes['template'];
	        }
	        this.factory.create({
	            template: template,
	            contextName: this.as
	        }).then(function (controller) {
	            var template = _this.factory.container.get('template');
	            _this.section.appendChild(template.render());
	        });
	    },
	    onDestroy: function onDestroy() {
	        if (this.factory) {
	            this.factory.destroy();
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

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../../typings" />
	//import {TemplateResolver} from '../../services/template.resolver'
	//import {TemplateView} from '../template-view'
	'use strict';

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var collection_1 = __webpack_require__(63);
	var index_1 = __webpack_require__(6);
	exports.Repeat = {
	    initialize: function initialize() {
	        this._children = [];
	        this._collection = [];
	        this.id = index_1.uniqueId();
	    },
	    update: function update() {
	        this._children = this._children || [];
	        this._collection = this._collection || [];
	        var as = this['as'];
	        var each = this['each'];
	        var key = this['key'] || "key";
	        var n = 0;
	        var self = this;
	        var parent = this.view;
	        if (each === this._collection || !each) {
	            return;
	        }
	        if (this._collection && this._collection instanceof collection_1.Collection) {
	            this.__removeEventListeners(this._collection);
	        }
	        this._collection = each;
	        this._update();
	        if (each instanceof collection_1.Collection) {
	            this.__addEventListeners(each);
	        }
	    },
	    _update: function _update() {
	        var properties;
	        var as = this['as'];
	        var parent = this.view;
	        var n = 0;
	        var delegateID = index_1.uniqueId('.repeat');
	        var self = this;
	        this._collection.forEach(function (m) {
	            var child;
	            if (as) {
	                properties = new collection_1.NestedModel(_defineProperty({}, as, m));
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
	        this._children.splice(n).forEach(function (child) {
	            child.remove();
	        });
	    },
	    __addEventListeners: function __addEventListeners(collection) {
	        collection.on('add', this._update, this);
	        collection.on('remove', this._update, this);
	        collection.on('reset', this._update, this);
	    },
	    __removeEventListeners: function __removeEventListeners(collection) {
	        collection.off('remove', this._update);
	        collection.off('add', this._update);
	        collection.reset('reset', this._update);
	    },
	    setAttribute: function setAttribute(key, value) {
	        this[key] = value;
	    },
	    setProperty: function setProperty() {
	        console.log(arguments);
	    },
	    onDestroy: function onDestroy() {
	        if (this._collection && typeof this._collection.destroy === 'function') {
	            this._collection.destroy();
	        }
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	            for (var _iterator = this._children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var child = _step.value;

	                child.remove();
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator['return']) {
	                    _iterator['return']();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }
	    }
	};

/***/ }
/******/ ])
});
;