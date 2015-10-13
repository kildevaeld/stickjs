import { components, View } from 'templ';
import { DIContainer } from 'di';
export declare class ControllerComponent extends components.BaseComponent {
    container: DIContainer;
    as: string;
    name: string;
    subview: View;
    initialize(): void;
    destroy(): void;
}
