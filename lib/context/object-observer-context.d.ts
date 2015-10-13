import { Context } from './context';
export declare class ObjectObserveProxy extends Context {
    $observe(): void;
    $unobserve(): void;
    $createChild(): ObjectObserveProxy;
}
