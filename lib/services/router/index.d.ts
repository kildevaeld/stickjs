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
    constructor(ctx: IContext, container: Container);
    route(route: string | RegExp, handler: RouteHandler | RouteOptions): RouterService;
    private __execute(callback, args);
    private __handleController(options);
    $destroy(): void;
}
