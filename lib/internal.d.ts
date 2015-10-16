export declare function getFunctionParameters(fn: Function, cache?: boolean): string[];
export declare enum DependencyType {
    Service = 0,
    Module = 1,
    Controller = 2,
    Factory = 3,
}
export declare enum Metakey {
    DependencyType = 0,
    Template = 1,
}
export declare const DIServiceConfig: string;
export declare function getDependencies(fn: Function | Object | any[]): [Function, any[]];
export declare function setDependencyType(type: DependencyType): ClassDecorator;
export declare function getDependencyType(target: Function): DependencyType;
export declare function isDependencyType(target: Function, type: DependencyType): boolean;
export declare function setActivator(target: Function, activator: Object): void;
export declare function setDependencyResolver(target: Function, activator: any): void;
