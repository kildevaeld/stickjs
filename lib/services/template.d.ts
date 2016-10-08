import { TemplateView } from '../template/template.view';
import { IPromise } from 'orange';
export interface TemplateResolver {
    (name: string): IPromise<string>;
}
export interface TemplateCreator {
    (templateString: string, data: any): Promise<TemplateView>;
}
export declare function templateResolver(name: string): IPromise<string>;
