import { TemplateView } from '../template/template.view';
import * as utils from 'utilities';
export interface TemplateResolver {
    (name: string): utils.IPromise<string>;
}
export interface TemplateCreator {
    (templateString: string, data: any): TemplateView;
}
