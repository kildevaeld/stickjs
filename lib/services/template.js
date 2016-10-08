"use strict";

var stick_1 = require('../stick');
var template_view_1 = require('../template/template.view');
var templ = require('templ');
var orange_1 = require('orange');
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