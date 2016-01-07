import { Container } from './container';
import * as utils from 'utilities';
import { Template } from 'templ/lib/vnode';
export declare type ControllerDefinition = FunctionConstructor | Object | any[];
export interface ModuleCreateOptions {
    el?: HTMLElement;
    parent?: Container;
    template?: string | Template;
}
export declare class ModuleFactory {
    name: string;
    module: FunctionConstructor;
    container: Container;
    constructor(name: string, module: FunctionConstructor, container: Container);
    controller(name: string, definition: ControllerDefinition): ModuleFactory;
    service(name: string | FunctionConstructor, definition: Function): ModuleFactory;
    /**
     * Create a factory function
     * @param {String} name
     */
    factory(name: string, factory: any | any[]): ModuleFactory;
    /**
     * Create a new instance of the module
     * @method create
     * @params {Object} options
     * @return {Promise}
     */
    create(options?: ModuleCreateOptions): utils.IPromise<any>;
    private resolveTemplate(ctx, options);
    destroy(): void;
}
