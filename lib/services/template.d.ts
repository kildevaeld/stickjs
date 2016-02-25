import { TemplateView } from '../template/template.view';
import { IPromise } from 'utilities';
export interface TemplateResolver {
    (name: string): IPromise<string>;
}
export interface TemplateCreator {
    (templateString: string, data: any): TemplateView;
}
export declare function templateResolver(name: string): IPromise<string>;
