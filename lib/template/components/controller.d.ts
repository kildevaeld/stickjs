import { BaseComponent } from './base-component';
import { ControllerFactory } from '../../controller.factory';
export declare class Controller extends BaseComponent {
    name: string;
    as: string;
    factory: ControllerFactory;
    private resolving;
    initialize(): void;
    update(): Promise<void>;
    destroy(): void;
}
