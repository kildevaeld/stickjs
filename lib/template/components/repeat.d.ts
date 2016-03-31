import { Collection, IModel } from 'collection';
import { BaseComponent } from './base-component';
export declare class Repeat extends BaseComponent {
    private _children;
    private _collection;
    initialize(): void;
    update(): void;
    _update(): void;
    __addEventListeners<T extends IModel>(collection: Collection<T>): void;
    __removeEventListeners<T extends IModel>(collection: Collection<T>): void;
    setAttribute(key: string, value: any): void;
    onDestroy(): void;
}
