'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _stick = require('../stick');

var Stick = _interopRequireWildcard(_stick);

var _templateTemplateView = require('../template/template.view');

var _templ = require('templ');

var templ = _interopRequireWildcard(_templ);

var _utilities = require('utilities');

var utils = _interopRequireWildcard(_utilities);

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
            viewClass: _templateTemplateView.TemplateView
        });
        var view = template.view(data, {
            container: container
        });
        return view;
    };
}]);