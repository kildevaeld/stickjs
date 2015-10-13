import { DIContainer, ConstructionInfo } from 'di';
import { ItemMap } from './repository';
export declare function tryCatch(fn: Function, ctx?: any, args?: any[]): [any, Error];
export declare class Container extends DIContainer {
    __instances: Map<any, any>;
    constructor(info?: Map<Function, ConstructionInfo>);
    hasInstance(key: any): boolean;
    get(key: any, targetKey?: string): any;
    registerSingleton(key: any, fn: Function, targetKey?: any): void;
    registerInstance(key: any, instance: any, track?: boolean): void;
    clear(): void;
    destroy(key?: any, fn?: (arg: any) => void): void;
    register(item: ItemMap): void;
    createChild(): Container;
}
