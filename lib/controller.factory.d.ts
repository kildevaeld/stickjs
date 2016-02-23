import { Container } from './container';
import { EventEmitter } from 'eventsjs';
import { State } from './state';
import { TemplateView } from './template/template.view';
import { Template } from 'templ/lib/vnode';
export interface ControllerCreateOptions {
    el?: HTMLElement;
    template?: string | Template;
    contextName: string;
    parentView?: TemplateView;
    state: any;
}
export declare class ControllerFactory extends EventEmitter {
    controller: FunctionConstructor;
    container: Container;
    name: string;
    private _id;
    id: string;
    constructor(name: string, controller: FunctionConstructor, container: Container);
    /**
     * Create an instance of a controller
     * @param  {ControllerCreateOptions} options
     * @return {utils.IPromise<any>}
     * Call onTemplateRender (), onElementAttached
     * emits before:template:render, template:render, before:element:attached, element:attached
     */
    create(options: ControllerCreateOptions): Promise<any>;
    resolveTemplate(state: State, options: ControllerCreateOptions): Promise<TemplateView>;
    destroy(): Promise<void>;
}
