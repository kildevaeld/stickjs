var history_1 = require('./history');
var eventsjs_1 = require('eventsjs');
var utilities_1 = require('utilities');
// Cached regular expressions for matching named param parts and splatted
// parts of route strings.
const optionalParam = /\((.*?)\)/g;
const namedParam = /(\(\?)?:\w+/g;
const splatParam = /\*\w+/g;
const escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
var isRegExp = function (value) {
    return value ? (typeof value === 'object' && toString.call(value) === '[object RegExp]') : false;
};
class Router extends eventsjs_1.EventEmitter {
    constructor(options = {}) {
        super();
        this.history = new history_1.HistoryApi();
        this.options = options;
    }
    route(route, name, handler = null) {
        if (!isRegExp(route))
            route = this._routeToRegExp(route);
        if (typeof name === 'function') {
            handler = name;
            name = '';
        }
        if (!handler) {
            throw new Error('router: no handler');
        }
        this.history.route(route, (fragment) => {
            var args = this._extractParameters(route, fragment);
            this.execute(handler, fragment, args);
            this.trigger.apply(this, ['route:' + name].concat(args));
            this.trigger('route', name, args);
            //this.history.trigger('route', this, name, args);
        });
        return this;
        return this;
    }
    // Execute a route handler with the provided parameters.  This is an
    // excellent place to do pre-route setup or post-route cleanup.
    execute(callback, name, args) {
        if (callback) {
            if (this.options.execute) {
                this.options.execute(callback, name, args);
            }
            else {
                utilities_1.callFunc(callback, this, args);
            }
        }
    }
    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate(fragment, options) {
        this.history.navigate(fragment, options);
        return this;
    }
    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp(route) {
        route = route.replace(escapeRegExp, '\\$&')
            .replace(optionalParam, '(?:$1)?')
            .replace(namedParam, function (match, optional) {
            return optional ? match : '([^/?]+)';
        })
            .replace(splatParam, '([^?]*?)');
        return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    }
    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters(route, fragment) {
        var params = route.exec(fragment).slice(1);
        return params.map(function (param, i) {
            // Don't decode the search params.
            if (i === params.length - 1)
                return param || null;
            return param ? decodeURIComponent(param) : null;
        });
    }
    $destroy() {
        super.destroy();
        this.history.off();
    }
}
exports.Router = Router;
