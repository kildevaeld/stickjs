import { DependencyType } from './internal';
export interface ItemMap {
    name: string;
    handler: any;
    type: DependencyType;
    config?: any;
}
export declare module Repository {
    const items: any[];
    function add(type: DependencyType, name: string, target: any): void;
    function hasAny(name: string): boolean;
    function has(type: DependencyType, name: string): boolean;
    function get(type: DependencyType, name: string): ItemMap;
    function any(name: string): ItemMap;
}
