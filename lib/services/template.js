var Stick = require('../stick');
var template_view_1 = require('../template/template.view');
var templ = require('templ');
var utils = require('utilities');
Stick.factory('$templateResolver', () => {
    return function (name) {
        let template = document.getElementById(name);
        if (template == null)
            return utils.Promise.reject(new Error(`template with id: '${name}' not found`));
        return utils.Promise.resolve(template.innerHTML);
    };
});
Stick.factory('$templateCreator', ['$templateResolver', '$container', (resolver, container) => {
        return function (templateString, data) {
            let template = templ.compile(templateString, {
                viewClass: template_view_1.TemplateView
            });
            let view = template.view(data, {
                container: container
            });
            return view;
        };
    }]);
