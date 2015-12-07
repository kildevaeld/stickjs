'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var eventsjs_1 = require('eventsjs');
var utils = require('utilities');
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