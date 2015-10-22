import { Router, RouteHandler } from './router';
import { IContext } from '../../context';
import { Container } from '../../container';
import { ControllerFactory } from '../../controller.factory';
export interface RouteOptions {
    controller: string;
    template?: string;
    target?: string | HTMLElement;
}
export declare class RouterService {
    router: Router;
    context: IContext;
    container: Container;
    _currentController: ControllerFactory;
    /**
     * @param {IContext} ctx
     * @param {Container} container
     * @constructor RouterService
     */
    constructor(ctx: IContext, container: Container);
    else(handler: RouteHandler | RouteOptions): void;
    /**
     * @param  {string|RegExp} route
     * @param  {RouteHandler|RouteOptions} handler
     * @return {RouterService} RouterService
     */
    route(route: string | RegExp, handler: RouteHandler | RouteOptions): RouterService;
    private __execute(callback, args);
    private __handleController(options);
    $destroy(): void;
}
