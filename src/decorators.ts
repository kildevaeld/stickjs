
import {DependencyType, setDependencyType,DIServiceConfig, Metakey} from './internal';
import {camelcase, find} from 'utilities';
import {Metadata, inject} from 'stick.di';
import {Repository} from './repository';
import * as templ from 'templ';

export * from 'stick.di/lib/decorators';

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

export function factory(factoryName?:string): ClassDecorator {
    return function (target:Function) {
        
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

export function component(name:string): ClassDecorator {
    return function(target:any) {
        templ.component(name, target);
    }
}

export function attribute(name:string): ClassDecorator {
    return function(target:any) {
        templ.attribute(name, target);
    }
}