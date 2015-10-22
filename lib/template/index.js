import { component } from '../stick';
export * from './template.view';
import { Controller } from './components/controller';
component('controller', ['$container', Controller]);
export * from './components/base-component';
