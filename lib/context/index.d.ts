import { IModel } from 'collection';
import { Mediator } from '../services/mediator';
export interface ProxyEvent {
    name: string;
    object: any;
    type: string;
    oldValue?: any;
}
export interface ISubscriber {
    (...args: any[]): void;
}
export interface IContext {
    [x: string]: any;
    $call(fn: Function, ctx?: any, args?: any[]): any;
    $subscribe(event: string, handler: ISubscriber): any;
    $unsubscribe(event: string, handler: ISubscriber): any;
    $publish(event: string, ...args: any[]): any;
    $createChild(data?: IModel): IContext;
    $observe(): any;
    $unobserve(): any;
}
export declare function createContext(model: IModel, mediator: Mediator): IContext;
export declare function getContext(): any;
