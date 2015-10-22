import { EventEmitter } from 'eventsjs';
export declare class Observer extends EventEmitter {
    private observer;
    private observers;
    constructor(el: HTMLElement);
    observe(elm: HTMLElement, fn: any): void;
    unobserve(): void;
    _observe(records: MutationRecord[], observer: MutationObserver): void;
    $destroy(): void;
}
