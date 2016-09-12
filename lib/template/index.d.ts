export * from './template.view';
import './attributes/index';
export * from './components/base-component';
export * from './attributes/base-attribute';
export interface ComponentDefinition {
    [propety: string]: any;
    initialize: ((...args: any[]) => void);
    update?: () => void;
}
export interface AttributeDefinition {
    initialize?: (...args: any[]) => void;
    update?: () => void;
}
export { Reference, Assignment, Call } from 'templ/lib/action';
