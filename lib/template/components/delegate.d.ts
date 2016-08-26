import { BaseComponent } from './base-component';
export declare class Delegate extends BaseComponent {
    private subview;
    private el;
    initialize(): Promise<void>;
    update(): Promise<void>;
    private _onEvent(e);
    onDestroy(): void;
}
