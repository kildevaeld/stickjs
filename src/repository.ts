
import {DependencyType, getDependencies, DIServiceConfig} from './internal'
import {find} from 'utilities';
import {Metadata} from 'di'


export interface ItemMap {
	name: string
	handler: any
	type: DependencyType
	config?:any
} 

export module Repository {
	export const items = [];
	
	export function add (type:DependencyType, name:string, target:any) {
		
		let item;
		if ((item = find(items, (i) => i.name == name))) {
			throw new Error(`${type} named ${name} already imported as ${item.type}`);
		}
		
		let config = Metadata.get(DIServiceConfig, target)
		
		items.push({
			name: name,
			handler: target,
			type: type,
			config: config
		});
		
	}
	
	export function has (type: DependencyType, name: string): boolean {
		return !!get(type,name);
	}
	
	export function get(type: DependencyType, name: string): ItemMap {
		return find(items, (i) => i.name == name && i.type == type)
	}
	
	export function any(name: string): ItemMap {
		return find(items, (i) => i.name == name);
	}
} 