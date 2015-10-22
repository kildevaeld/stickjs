import {component} from '../stick'

export * from './template.view'

import {Controller} from './components/controller'
import {Repeat} from './components/repeat'

import * as templ from 'templ'


component('controller', ['$container', Controller])
component('repeat', <any>Repeat);

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