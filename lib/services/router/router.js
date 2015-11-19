'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _history = require('./history');

var _eventsjs = require('eventsjs');

var _utilities = require('utilities');

// Cached regular expressions for matching named param parts and splatted
// parts of route strings.
var optionalParam = /\((.*?)\)/g;
var namedParam = /(\(\?)?:\w+/g;
var splatParam = /\*\w+/g;
var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
var isRegExp = function isRegExp(value) {
    return value ? typeof value === 'object' && toString.call(value) === '[object RegExp]' : false;
};

var Router = (function (_EventEmitter) {
    _inherits(Router, _EventEmitter);

    function Router() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Router);

        _get(Object.getPrototypeOf(Router.prototype), 'constructor', this).call(this);
        this.history = new _history.HistoryApi();
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
                    (0, _utilities.callFunc)(callback, this, args);
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
})(_eventsjs.EventEmitter);

exports.Router = Router;