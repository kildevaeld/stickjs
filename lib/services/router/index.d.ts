import { Router, RouteHandler } from './router';
import { IContext } from '../../context';
import { Container } from '../../container';
import { ControllerFactory } from '../../controller.factory';
export interface RouteOptions {
    controller: string;
    template?: string;
    target?: string | HTMLElement;
}
export interface Route {
    fragment: string;
    parameters: string[];
}
export declare class RouterService {
    router: Router;
    context: IContext;
    container: Container;
    _currentController: ControllerFactory;
    swap: any;
    private _target;
    target: HTMLElement;
    /**
     * @param {IContext} ctx
     * @param {Container} container
     * @constructor RouterService
     */
    constructor(ctx: IContext, container: Container);
    private swapElements(target, element);
    /**
     * Notfound handler
     * @param {RouteHandler|RouteOptions} handler
     */
    else(handler: RouteHandler | RouteOptions): void;
    /**
     * @param  {string|RegExp} route
     * @param  {RouteHandler|RouteOptions} handler
     * @return {RouterService} RouterService
     */
    route(route: string | RegExp, handler: RouteHandler | RouteOptions): RouterService;
    reload(): void;
    /**
     * Navigate to fragment
     * @param {string} route   Fragment to navigate to
     * @param {Object} options options
     */
    navigate(route: string, options: any): void;
    private __execute(callback, name, args);
    private __handleController(options);
    $destroy(): void;
}
