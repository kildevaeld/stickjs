import { View, IDelegator } from 'templ/lib/view';
import { DIContainer } from 'di';
export interface TemplateViewOptions {
    parent?: TemplateView;
    container: DIContainer;
    delegator?: IDelegator;
    target?: any;
}
export declare class TemplateView extends View {
    private _context;
    private _container;
    private _target;
    container: DIContainer;
    context: any;
    target: any;
    setTarget(target: any): void;
    _onModelChange(model: any): void;
    constructor(section: any, template: any, context: any, options?: TemplateViewOptions);
    set(key: string | string[], val: any, silent?: boolean): any;
    get(key: string | string[]): any;
    remove(): void;
    $destroy(): void;
}
