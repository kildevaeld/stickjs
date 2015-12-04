import * as templ from 'templ';
export declare class BaseComponent implements templ.vnode.Component {
    section: templ.vnode.Section;
    vnode: templ.vnode.VNode;
    attributes: templ.vnode.AttributeMap;
    _attributes: any;
    view: templ.vnode.IView;
    document: Document;
    childTemplate: templ.vnode.Template;
    constructor(section: templ.vnode.Section, vvnode: templ.vnode.VNode, attributes: templ.vnode.AttributeMap, view: templ.vnode.IView);
    initialize(): void;
    setAttribute(key: string, value: any): void;
    removeAttribute(key: string): void;
    destroy(): void;
}
