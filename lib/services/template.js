"use strict";

var stick_1 = require('../stick');
var template_view_1 = require('../template/template.view');
var templ = require('templ');
var utilities_1 = require('utilities');
function templateResolver(name) {
    var template = document.getElementById(name);
    if (template == null) return utilities_1.Promise.reject(new Error('template with id: \'' + name + '\' not found'));
    return utilities_1.Promise.resolve(template.innerHTML);
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
        var view = template.view(data, {
            container: container
        });
        return view;
    };
}]);