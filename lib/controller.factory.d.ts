import { Container } from './container';
import * as utils from 'utilities';
import { EventEmitter } from 'eventsjs';
import { State } from './context/state';
import { TemplateView } from './template/template.view';
import { Template } from 'templ/lib/vnode';
export interface ControllerCreateOptions {
    el?: HTMLElement;
    template?: string | Template;
    contextName: string;
}
export declare class ControllerFactory extends EventEmitter {
    controller: FunctionConstructor;
    container: Container;
    name: string;
    constructor(name: string, controller: FunctionConstructor, container: Container);
    /**
     * Create an instance of a controller
     * @param  {ControllerCreateOptions} options
     * @return {utils.IPromise<any>}
     * Call onTemplateRender (), onElementAttached
     * emits before:template:render, template:render, before:element:attached, element:attached
     */
    create(options: ControllerCreateOptions): utils.IPromise<any>;
    resolveTemplate(state: State, options: ControllerCreateOptions): utils.IPromise<TemplateView>;
    destroy(): void;
}
