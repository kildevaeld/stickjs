import { BaseAttribute } from './base-attribute';
import { Reference } from 'templ/lib/action';
export declare class ValueAttribute extends BaseAttribute {
    model: Reference;
    _autocompleteCheckInterval: number;
    initialize(): void;
    update(): Promise<void>;
    _parseValue(value: any): any;
    _onInput(event: KeyboardEvent): void;
    _elementValue(value?: any): any;
}
