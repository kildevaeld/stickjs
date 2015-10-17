export * from './template.view';
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
