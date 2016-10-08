
import {DependencyType, setDependencyType,DIServiceConfig, Metakey} from './internal';
import {camelcase, find} from 'orange';
import {Metadata} from 'stick.di';
import {Repository} from './repository';
import * as templ from 'templ';

import * as di from 'stick.di';

export const autoinject: (target?: any) => void | ((target: any) => void) = di.autoinject;
export const inject: (...rest: any[]) => (target: any) => void = di.inject;
export const registration: (value: any, targetKey?: string) => (target: any) => void = di.registration;
export const transient: (key?: any, targetKey?: string) => (target: any) => void = di.transient;
export const singleton: (keyOrRegisterInChild?: any, registerInChild?: boolean, targetKey?: string) => (target: any) => void = di.singleton;
export const instanceActivator: (value: any, targetKey?: string) => (target: any) => void = di.instanceActivator;


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