"use strict";

var orange_dom_1 = require('orange.dom');
var orange_1 = require('orange');
var stick = require('../stick');
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
                    els = orange_1.slice(context.querySelectorAll(query));
                } else {
                    html = new orange_dom_1.Html(orange_1.slice(context));
                    return html.find(query);
                }
            } else {
                els = orange_1.slice(document.querySelectorAll(query));
            }
        } else if (query && query instanceof Element) {
            els = [query];
        } else if (query && query instanceof NodeList) {
            els = orange_1.slice(query);
        }
        return new orange_dom_1.Html(els);
    };
});