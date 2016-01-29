import { View, IDelegator } from 'templ/lib/view';
import { DIContainer } from 'di';
export interface TemplateViewOptions {
    parent?: TemplateView;
    container: DIContainer;
    delegator?: IDelegator;
}
export declare class TemplateView extends View {
    _context: any;
    _container: DIContainer;
    container: DIContainer;
    context: any;
    _onModelChange(model: any): void;
    constructor(section: any, template: any, context: any, options?: TemplateViewOptions);
    set(key: string | string[], val: any, silent?: boolean): any;
    get(key: string | string[]): any;
    remove(): void;
    $destroy(): void;
}
