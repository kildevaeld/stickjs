import { DIContainer, ConstructionInfo } from 'stick.di';
import { ItemMap } from './repository';
export * from 'stick.di';
export declare function tryCatch(fn: Function, ctx?: any, args?: any[]): [any, Error];
export declare class Container extends DIContainer {
    __instances: Map<any, any>;
    constructor(info?: Map<Function, ConstructionInfo>);
    hasInstance(key: any): boolean;
    hasHandler(name: string, parent?: boolean, repository?: boolean): boolean;
    get(key: any, targetKey?: string): any;
    registerSingleton(key: any, fn: Function, targetKey?: any): void;
    registerService(key: any, fn: Function, targetKey?: any): void;
    registerInstance(key: any, instance: any, track?: boolean): void;
    invoke(fn: Function, deps?: any[], targetKey?: string): any;
    clear(): void;
    destroy(key?: any, fn?: (arg: any) => void): void;
    register(item: ItemMap): void;
    createChild(): Container;
}
