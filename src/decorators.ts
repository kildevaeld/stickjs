
import {DependencyType, setDependencyType,DIServiceConfig, Metakey} from './internal';
import {camelcase, find} from 'utilities';
import {Metadata} from 'stick.di';
import {Repository} from './repository';
import * as templ from 'templ';

import * as di from 'stick.di';

export const inject = di.inject;
export const autoinject = di.autoinject;
export const registration = di.registration;
export const transient = di.transient;
export const singleton = di.singleton;
export const instanceActivator = di.instanceActivator;
//export const factory = di.factory;

declare var require:any;
const debug = require('debug')('stick:decorators');


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
        debug('defining component %s, target: %s', name, target.name);
        templ.component(name, target);
    }
}

export function attribute(name:string): ClassDecorator {
    return function(target:any) {
        debug('defining attribute %s, target: %s', name, target.name);
        templ.attribute(name, target);
    }
}