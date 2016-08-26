import { BaseComponent } from './base-component';
import { TemplateView } from '../template.view';
export declare class Show extends BaseComponent {
    _shown: any;
    subview: TemplateView;
    update(): Promise<void>;
    onDestroy(): void;
}
export declare class Hide extends BaseComponent {
    _hide: any;
    subview: TemplateView;
    update(): Promise<void>;
    onDestroy(): void;
}
