import { BaseComponent } from './base-component';
import { TemplateView } from '../template.view';
export declare class View extends BaseComponent {
    subview: TemplateView;
    resolving: boolean;
    update(): Promise<void>;
}