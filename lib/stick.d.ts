import { ComponentDefinition } from './template/index';
import * as templ from 'templ';
import * as annotations from './annotations';
export declare const decorators: typeof annotations;
export declare function service(name: string, definition: Function): void;
export declare function factory(name: string, factory: any | any[]): void;
export declare function module(name: string, definition: Function | Object | any[]): any;
export declare function component(name: string, handler: ComponentDefinition | any[]): void;
export declare function attribute(name: string, handler: templ.vnode.AttributeConstructor): void;
export declare function decorator(name: string, decorator: any): void;
export declare function modifier(name: string, modifier: (value: any) => any): void;
