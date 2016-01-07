import { Component, Section, VNode, AttributeMap, IView, Template } from 'templ/lib/vnode';
export declare class BaseComponent implements Component {
    section: Section;
    vnode: VNode;
    attributes: AttributeMap;
    _attributes: any;
    view: IView;
    document: Document;
    childTemplate: Template;
    constructor(section: Section, vvnode: VNode, attributes: AttributeMap, view: IView);
    initialize(): void;
    setAttribute(key: string, value: any): void;
    removeAttribute(key: string): void;
    destroy(): void;
}
