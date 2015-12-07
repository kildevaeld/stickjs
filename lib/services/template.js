'use strict';

var Stick = require('../stick');
var template_view_1 = require('../template/template.view');
var templ = require('templ');
var utils = require('utilities');
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