import { Container } from './container';
import * as utils from 'utilities';
export declare type ControllerDefinition = FunctionConstructor | Object | any[];
export interface ModuleCreateOptions {
    el?: HTMLElement;
}
export declare class ModuleFactory {
    name: string;
    module: FunctionConstructor;
    container: Container;
    constructor(name: string, module: FunctionConstructor, container: Container);
    controller(name: string, definition: ControllerDefinition): ModuleFactory;
    service(name: string | FunctionConstructor, definition: Function): ModuleFactory;
    factory(name: string, factory: any | any[]): ModuleFactory;
    create(options?: ModuleCreateOptions): utils.IPromise<any>;
    destroy(): void;
}