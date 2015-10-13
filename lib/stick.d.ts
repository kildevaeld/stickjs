import * as templ from 'templ';
export interface IStick {
}
export declare function service(name: string, definition: Function): IStick;
export declare function factory(name: string, factory: any | any[]): IStick;
export declare function module(name: string, definition: Function | Object | any[]): any;
export interface ComponentDefinition {
    initialize?: () => void;
    update?: () => void;
}
export interface AttributeDefinition {
    initialize?: () => void;
    update?: () => void;
}
export declare function component(name: string, handler: templ.vnode.ComponentConstructor | ComponentDefinition): void;
export declare function attribute(name: string, handler: templ.vnode.AttributeConstructor): void;
