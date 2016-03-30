import { Container } from './container';
import { EventEmitter } from 'eventsjs';
import { Template } from 'templ/lib/vnode';
export declare type ControllerDefinition = FunctionConstructor | Object | any[];
export interface ModuleCreateOptions {
    el?: HTMLElement;
    parent?: Container;
    template?: string | Template;
    state?: any;
}
export declare class ModuleFactory extends EventEmitter {
    name: string;
    module: FunctionConstructor;
    container: Container;
    private _id;
    id: string;
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
     *
     * Call onTemplateRender (), onElementAttached
     * emits before:template:render, template:render, before:element:attached, element:attached
     *
    */
    create(options?: ModuleCreateOptions): Promise<any>;
    configure<T>(name: string): Promise<T>;
    private resolveTemplate(state, options);
    destroy(): void;
}
