import { NestedModel } from 'collection';
import { DIContainer } from 'stick.di';
export declare const get_atributes: (attributes: any) => {
    attr: {};
    deferred: {};
};
export declare class State extends NestedModel {
    private _parent;
    private _container;
    parent: State;
    container: DIContainer;
    constructor(container: DIContainer);
    get(key: string): any;
    set(key: string | Object, val?: any): this;
    createChild(container?: DIContainer): State;
    $destroy(): void;
}
