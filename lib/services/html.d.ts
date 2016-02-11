export declare class Html {
    private _elements;
    length: number;
    constructor(el: HTMLElement[]);
    get(n: number): HTMLElement;
    addClass(str: string): Html;
    removeClass(str: string): Html;
    hasClass(str: string): boolean;
    attr(key: string | Object, value?: any): Html | string;
    parent(): Html;
    find(str: string): Html;
    forEach(fn: (elm: HTMLElement, index: number) => void): Html;
}
