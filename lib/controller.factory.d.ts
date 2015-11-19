import { Container } from './container';
import * as utils from 'utilities';
import { IContext } from './context';
import { TemplateView } from './template/template.view';
import * as templ from 'templ';
export interface ControllerCreateOptions {
    el?: HTMLElement;
    template?: string | templ.vnode.Template;
    contextName: string;
}
export declare class ControllerFactory {
    controller: FunctionConstructor;
    container: Container;
    name: string;
    constructor(name: string, controller: FunctionConstructor, container: Container);
    create(options: ControllerCreateOptions): utils.IPromise<any>;
    resolveTemplate(ctx: IContext, options: ControllerCreateOptions): utils.IPromise<TemplateView>;
    destroy(): void;
}
