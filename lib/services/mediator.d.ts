import { EventEmitter } from 'eventsjs';
export declare class Mediator {
    emitter: EventEmitter;
    constructor();
    publish(event: string, ...args: any[]): void;
    subscribe(event: string, handler: any, ctx: any): void;
    unsubscribe(event: string, handler: any): void;
}
