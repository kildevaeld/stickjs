import {factory} from '../stick';
import {TemplateView} from '../template/template.view';
import * as templ from 'templ';
import {IPromise, Promise} from 'orange';
import {Container} from '../container'

export interface TemplateResolver {
	(name: string): IPromise<string>
}

export interface TemplateCreator {
	(templateString: string, data:any): Promise<TemplateView>
}

export function templateResolver (name:string): IPromise<string> {
	let template = document.getElementById(name);

		if (template == null)
			return Promise.reject(new Error(`template with id: '${name}' not found`));
		
		return Promise.resolve(template.innerHTML);
}


factory('$templateResolver', () => {
	return templateResolver;
});


factory('$templateCreator', ['$templateResolver', '$container', (resolver:TemplateResolver, container:Container) => {

	return function (templateString:string, data:any): Promise<TemplateView>  {

			let template = templ.compile(templateString, {
				viewClass: <any>TemplateView
			})
			
			return template.render(data, {
				container: container
			});
			
	}

}]);

