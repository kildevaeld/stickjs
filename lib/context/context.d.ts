import { IContext, ISubscriber, ProxyEvent } from './index';
import { IModel, NestedModel } from 'collection';
import { Mediator } from '../services/mediator';
export declare const get_atributes: (attributes: any) => {
    attr: {};
    deferred: {};
};
export declare abstract class Context implements IContext {
    private __queue;
    protected __parent: IContext;
    protected __model: NestedModel;
    private __subscribers;
    protected __mediator: Mediator;
    constructor(mediator: Mediator);
    $root: IContext;
    $parent: IContext;
    $call(fn: Function, ctx?: any, args?: any[]): any;
    $subscribe(event: string, handler: ISubscriber, ctx?: any): string;
    __onModelChange(): void;
    $unsubscribe(event: string, handler: ISubscriber | string): IContext;
    $publish(event: string, ...args: any[]): void;
    abstract $createChild(data?: IModel): IContext;
    abstract $observe(): any;
    abstract $unobserve(): any;
    protected __onchange(events: ProxyEvent[]): void;
    private __normalizeAttr(attr);
    $destroy(): void;
}
