import { HistoryApi } from './history';
import { EventEmitter } from 'eventsjs';
export interface RouteHandler {
    (...args: any[]): void;
}
export interface IRouterOptions {
    execute?: (callback: RouteHandler, name: string, args: any[]) => void;
    pushState?: boolean;
}
export declare class Router extends EventEmitter {
    options: IRouterOptions;
    history: HistoryApi;
    constructor(options?: IRouterOptions);
    route(route: RegExp | string, name: RouteHandler | string, handler?: RouteHandler): Router;
    execute(callback: RouteHandler, name: string, args: any[]): void;
    navigate(fragment: any, options: any): this;
    private _routeToRegExp(route);
    private _extractParameters(route, fragment);
    $destroy(): void;
}
