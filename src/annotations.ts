
import {DependencyType, setDependencyType,DIServiceConfig, Metakey} from './internal'
import {camelcase, find} from 'utilities'
import {Metadata} from 'di'
import {Repository} from './repository'
export {inject} from 'di'

export function controller (controllerName?:string): ClassDecorator {
	return function (target:Function) {
		
		let name = controllerName||camelcase(target.name);
		Repository.add(DependencyType.Controller, name, target);
		
	}	
}

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

export function template (name:string): ClassDecorator {
	return function (target:Function) {
		Metadata.define(Metakey[Metakey.Template], name, target, undefined)	
	}
}