import * as Stick from '../stick';
import { TemplateView } from '../template/template.view';
import * as templ from 'templ';
import * as utils from 'utilities';
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
                viewClass: TemplateView
            });
            let view = template.view(data, {
                container: container
            });
            return view;
        };
    }]);
