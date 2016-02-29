export * from './template.view';
import './components/controller';
import './components/repeat';
import './components/view';
export * from './components/base-component';
export interface ComponentDefinition {
    [propety: string]: any;
    initialize: ((...args: any[]) => void);
    update?: () => void;
}
export interface AttributeDefinition {
    initialize?: (...args: any[]) => void;
    update?: () => void;
}
export { Reference, Assignment, Call } from 'templ/lib/view';
