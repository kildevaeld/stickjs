import { IContext, ISubscriber, ProxyEvent } from './index';
import { IModel } from 'collection';
import { EventEmitter } from 'eventsjs';
export declare const get_atributes: (attributes: any) => {
    attr: {};
    deferred: {};
};
export declare abstract class Context implements IContext {
    static emitter: EventEmitter;
    private __queue;
    protected __parent: IContext;
    protected __model: IModel;
    constructor();
    $root: IContext;
    $call(fn: Function, ctx?: any, args?: any[]): any;
    $subscribe(event: string, handler: ISubscriber): void;
    $unsubsribe(event: string, handler: ISubscriber): void;
    $publish(event: string, ...args: any[]): void;
    abstract $createChild(data?: IModel): IContext;
    abstract $observe(): any;
    abstract $unobserve(): any;
    protected __onchange(events: ProxyEvent[]): void;
    private __normalizeAttr(attr);
}
