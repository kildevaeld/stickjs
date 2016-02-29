declare var require:any;
import {DependencyType, getDependencies, DIServiceConfig} from './internal'
import {find, has} from 'utilities';
import {Metadata} from 'stick.di'

const debug = require('debug')('stick:container:repository');

export interface ItemMap {
	name: string
	handler: any
	type: DependencyType
	config?:any
}


var fnToStr = Function.prototype.toString;
var isNonArrowFnRegex = /^\s*function/;
var isArrowFnWithParensRegex = /^\([^\)]*\) *=>/;
var isArrowFnWithoutParensRegex = /^[^=]*=>/;

export module Repository {
	export const items = [];

	export function add (type:DependencyType, name:string, target:any) {
        debug("Adding dependency: %s, name: %s", DependencyType[type], name)
		let item;
		if ((item = find(items, (i) => i.name == name))) {
			items.splice(items.indexOf(item), 1)
			//throw new Error(`${type} named ${name} already imported as ${item.type}`);
		}

		let config = Metadata.get(DIServiceConfig, target)

        if (typeof target === 'function' && target.name == "")  {
            try {
                Object.defineProperty(target, 'name', {
                    value: name
                });
              } catch (e) {}
        }
        
		items.push({
			name: name,
			handler: target,
			type: type,
			config: config
		});
	}

	export function hasAny(name:string): boolean {
    return !!any(name);
	}

	export function has (type: DependencyType, name: string): boolean {
		return !!get(type,name);
	}

	export function get(type: DependencyType, name: string): ItemMap {
        debug("Get dependency: %s, name: %s", DependencyType[type], name)
		return find(items, (i) => i.name == name && i.type == type)
	}

	export function any(name: string): ItemMap {
		return find(items, (i) => i.name == name);
	}
}