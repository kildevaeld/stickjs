import { component } from '../stick';
export * from './template.view';
import { Controller } from './components/controller';
import { Repeat } from './components/repeat';
component('controller', ['$container', Controller]);
component('repeat', Repeat);
export * from './components/base-component';
