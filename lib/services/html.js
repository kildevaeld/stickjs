"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) {
            return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) {
                resolve(value);
            });
        }
        function onfulfill(value) {
            try {
                step("next", value);
            } catch (e) {
                reject(e);
            }
        }
        function onreject(value) {
            try {
                step("throw", value);
            } catch (e) {
                reject(e);
            }
        }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
var utils = require('utilities');
var stick = require('../stick');

var Html = function () {
    function Html(el) {
        _classCallCheck(this, Html);

        this._elements = el || [];
    }

    _createClass(Html, [{
        key: "get",
        value: function get(n) {
            return n >= this.length ? undefined : this._elements[n];
        }
    }, {
        key: "addClass",
        value: function addClass(str) {
            return this.forEach(function (e) {
                utils.addClass(e, str);
            });
        }
    }, {
        key: "removeClass",
        value: function removeClass(str) {
            return this.forEach(function (e) {
                utils.removeClass(e, str);
            });
        }
    }, {
        key: "attr",
        value: function attr() {
            return this;
        }
    }, {
        key: "parent",
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
        key: "find",
        value: function find(str) {
            var out = [];
            this.forEach(function (e) {
                out = out.concat(utils.slice(e.querySelectorAll(str)));
            });
            return new Html(out);
        }
    }, {
        key: "forEach",
        value: function forEach(fn) {
            this._elements.forEach(fn);
            return this;
        }
    }, {
        key: "length",
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
        var html = undefined;
        var els = undefined;
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