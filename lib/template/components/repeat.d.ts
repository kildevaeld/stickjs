import { Collection, IModel } from 'collection';
import { BaseComponent } from './base-component';
export declare class Repeat extends BaseComponent {
    private _children;
    private _collection;
    initialize(): Promise<void>;
    update(): Promise<void>;
    _update(): Promise<void>;
    _update2(): void;
    __addEventListeners<T extends IModel>(collection: Collection<T>): void;
    __removeEventListeners<T extends IModel>(collection: Collection<T>): void;
    setAttribute(key: string, value: any): void;
    onDestroy(): void;
}
