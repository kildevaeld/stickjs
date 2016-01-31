import { Container } from './container';
import * as utils from 'utilities';
import { State } from './context/state';
import { TemplateView } from './template/template.view';
import { Template } from 'templ/lib/vnode';
export interface ControllerCreateOptions {
    el?: HTMLElement;
    template?: string | Template;
    contextName: string;
}
export declare class ControllerFactory {
    controller: FunctionConstructor;
    container: Container;
    name: string;
    constructor(name: string, controller: FunctionConstructor, container: Container);
    create(options: ControllerCreateOptions): utils.IPromise<any>;
    resolveTemplate(state: State, options: ControllerCreateOptions): utils.IPromise<TemplateView>;
    destroy(): void;
}
