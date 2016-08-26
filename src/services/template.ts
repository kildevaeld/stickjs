
import * as Stick from '../stick';
import {TemplateView} from '../template/template.view';
import * as templ from 'templ';
import * as utils from 'utilities';
import {Container} from '../container'

export interface TemplateResolver {
	(name: string): utils.IPromise<string>
}

export interface TemplateCreator {
	(templateString: string, data:any): Promise<TemplateView>
}


Stick.factory('$templateResolver', () => {
	return function (name:string): utils.IPromise<string> {
		let template = document.getElementById(name);
		
		if (template == null) 
			return utils.Promise.reject(new Error(`template with id: '${name}' not found`));
			
		return utils.Promise.resolve(template.innerHTML);
	}
});


Stick.factory('$templateCreator', ['$templateResolver', '$container', (resolver:TemplateResolver, container:Container) => {
	
	return function (templateString:string, data:any): Promise<TemplateView>  {
		
			let template = templ.compile(templateString, {
				viewClass: <any>TemplateView
			})
			return template.render(data, {
				container: container
			});
	}
	
}]);

