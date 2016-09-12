import {component} from '../stick'

export * from './template.view'

import './attributes/index';
import {Show, Hide, Unsafe, Delegate} from './components/index';

import * as templ from 'templ'

component('hide', Hide);
component('show', Show);
component('unsafe', Unsafe);
component('delegate', Delegate);


export * from './components/base-component';
export * from './attributes/base-attribute';


export interface ComponentDefinition {
	[propety:string]: any
	initialize: ((...args:any[]) => void)
	update?: () => void
}

export interface AttributeDefinition {
	initialize?: (...args:any[]) => void
	update?: () => void
}


export {Reference, Assignment, Call} from 'templ/lib/action';