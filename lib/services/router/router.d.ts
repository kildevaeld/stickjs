import { HistoryApi } from './history';
import { EventEmitter } from 'eventsjs';
export interface RouteHandler {
    (...args: any[]): void;
}
export interface RouterOptions {
    execute?: (callback: RouteHandler, args: any[]) => void;
}
export declare class Router extends EventEmitter {
    options: RouterOptions;
    history: HistoryApi;
    constructor(options?: RouterOptions);
    route(route: RegExp | string, name: RouteHandler | string, handler?: RouteHandler): Router;
    execute(callback: RouteHandler, args: any[]): void;
    navigate(fragment: any, options: any): Router;
    private _routeToRegExp(route);
    private _extractParameters(route, fragment);
}