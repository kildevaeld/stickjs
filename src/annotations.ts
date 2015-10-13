
import {DependencyType, setDependencyType,DIServiceConfig} from './internal'
import {camelcase, find} from 'utilities'
import {Metadata} from 'di'
import {Repository} from './repository'

/*export function controller (moduleName:string, controllerName?:string): ClassDecorator {
	return function (target:Function) {
		
		let name = controllerName||camelcase(target.name);
		
		
		Repository.add(DependencyType.Controller, )
		
		classtype(ClassType.Controller)(target);
		
		if (!metadata.has(moduleName)) {
			metadata.set(moduleName, []);
		}
		
		let types = metadata.get(moduleName);
		
		let exists = find(types, i => i.name === name);
		
		if (exists) {
			throw new Error('controller already exists in module');
		}
		
		metadata.get(moduleName).push(map);
		
	}	
}*/

export function module (moduleName?:string): ClassDecorator {
	return function (target:Function) {
		
		let name = moduleName||camelcase(target.name);	
		Repository.add(DependencyType.Module, name, target);
			
	}
}

export function service (serviceName?:string, moduleName?:string): ClassDecorator {
	return function (target:Function) {
		
		let name = serviceName||camelcase(target.name);		
		Repository.add(DependencyType.Service, name, target);
			
	}
}

export function factory(factoryName:string): ClassDecorator {
	return function (target:Function) {
		
		Repository.add(DependencyType.Factory, factoryName, target);
		
	}
}

export function config (config:any): ClassDecorator {
	return function (target:Function) {
		Metadata.define(DIServiceConfig, config, target, undefined)
	}
}