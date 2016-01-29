import {component} from '../stick'

export * from './template.view'

import {Controller} from './components/controller';
import {Repeat} from './components/repeat';
import {Show, Hide} from './components/show';
import {Unsafe} from './components/unsafe';
import {Delegate} from './components/delegate';

import * as templ from 'templ'

component('controller', Controller);
component('repeat', Repeat);
component('hide', Hide);
component('show', Show);
component('unsafe', Unsafe);
component('delegate', Delegate);

export * from './components/base-component'

export interface ComponentDefinition {
	[propety:string]: any
	initialize: ((...args:any[]) => void)
	update?: () => void
}

export interface AttributeDefinition {
	initialize?: (...args:any[]) => void
	update?: () => void
}