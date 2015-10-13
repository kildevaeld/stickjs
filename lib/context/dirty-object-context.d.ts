import { Context } from './context';
import { IContext } from './index';
import { IModel } from 'collection';
export declare class DirtyObjectObserver extends Context {
    private __timer;
    $observe(): void;
    $unobserve(): void;
    _check(model: IModel): void;
    $createChild(): IContext;
}
