import {component} from '../stick'

export * from './template.view'

import {ControllerComponent,Controller} from './components/controller'
import * as templ from 'templ'


component('controller', ['$container', Controller])

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