import { BaseAttribute } from './base-attribute';
import { Reference } from '../';
export declare class ValueAttribute extends BaseAttribute {
    model: Reference;
    _autocompleteCheckInterval: number;
    initialize(): void;
    update(): void;
    _parseValue(value: any): any;
    _onInput(event: KeyboardEvent): void;
    _elementValue(value?: any): any;
}
