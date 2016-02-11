"use strict";

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
var Stick = require('../stick');
var template_view_1 = require('../template/template.view');
var templ = require('templ');
var utils = require('utilities');
Stick.factory('$templateResolver', function () {
    return function (name) {
        var template = document.getElementById(name);
        if (template == null) return utils.Promise.reject(new Error("template with id: '" + name + "' not found"));
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