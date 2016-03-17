"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = require('utilities');
var stick = require('../stick');

var Html = function () {
    function Html(el) {
        _classCallCheck(this, Html);

        this._elements = el || [];
    }

    _createClass(Html, [{
        key: 'get',
        value: function get(n) {
            n = n === undefined ? 0 : n;
            return n >= this.length ? undefined : this._elements[n];
        }
    }, {
        key: 'addClass',
        value: function addClass(str) {
            return this.forEach(function (e) {
                utils.addClass(e, str);
            });
        }
    }, {
        key: 'removeClass',
        value: function removeClass(str) {
            return this.forEach(function (e) {
                utils.removeClass(e, str);
            });
        }
    }, {
        key: 'hasClass',
        value: function hasClass(str) {
            return this._elements.reduce(function (p, c) {
                return utils.hasClass(c, str);
            }, false);
        }
    }, {
        key: 'attr',
        value: function attr(key, value) {
            var attr = void 0;
            if (typeof key === 'string' && value) {
                attr = _defineProperty({}, key, value);
            } else if (typeof key == 'string') {
                if (this.length) return this.get(0).getAttribute(key);
            } else if (utils.isObject(key)) {
                attr = key;
            }
            return this.forEach(function (e) {
                for (var k in attr) {
                    e.setAttribute(k, attr[k]);
                }
            });
        }
    }, {
        key: 'parent',
        value: function parent() {
            var out = [];
            this.forEach(function (e) {
                if (e.parentElement) {
                    out.push(e.parentElement);
                }
            });
            return new Html(out);
        }
    }, {
        key: 'find',
        value: function find(str) {
            var out = [];
            this.forEach(function (e) {
                out = out.concat(utils.slice(e.querySelectorAll(str)));
            });
            return new Html(out);
        }
    }, {
        key: 'forEach',
        value: function forEach(fn) {
            this._elements.forEach(fn);
            return this;
        }
    }, {
        key: 'length',
        get: function get() {
            return this._elements.length;
        }
    }]);

    return Html;
}();

exports.Html = Html;
stick.factory("$html", function () {
    return function (query, context) {
        if (typeof context === 'string') {
            context = document.querySelectorAll(context);
        }
        var html = void 0;
        var els = void 0;
        if (typeof query === 'string') {
            if (context) {
                if (context instanceof HTMLElement) {
                    els = utils.slice(context.querySelectorAll(query));
                } else {
                    html = new Html(utils.slice(context));
                    return html.find(query);
                }
            } else {
                els = utils.slice(document.querySelectorAll(query));
            }
        } else if (query && query instanceof Element) {
            els = [query];
        } else if (query && query instanceof NodeList) {
            els = utils.slice(query);
        }
        return new Html(els);
    };
});