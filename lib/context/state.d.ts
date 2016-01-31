import { NestedModel } from 'collection';
import { DIContainer } from 'di';
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
    set(key: string | Object, val?: any): this;
    createChild(container?: DIContainer): State;
}
