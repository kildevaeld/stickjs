import { components } from 'templ';
import { DIContainer } from 'di';
import { ControllerFactory } from '../../controller.factory';
export declare class ControllerComponent extends components.BaseComponent {
    container: DIContainer;
    as: string;
    name: string;
    factory: ControllerFactory;
    initialize(): void;
    destroy(): void;
}
