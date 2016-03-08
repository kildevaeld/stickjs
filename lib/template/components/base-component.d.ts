import { Component, Section, VNode, AttributeMap, Template } from 'templ/lib/vnode';
import { TemplateView } from '../template.view';
import { EventEmitter } from 'eventsjs';
export declare class BaseComponent extends EventEmitter implements Component {
    section: Section;
    vnode: VNode;
    attributes: AttributeMap;
    view: TemplateView;
    document: Document;
    childTemplate: Template;
    constructor(section: Section, vvnode: VNode, attributes: AttributeMap, view: TemplateView);
    initialize(): void;
    setAttribute(key: string, value: any): void;
    removeAttribute(key: string): void;
    getAttribute(key: string): string;
    destroy(): void;
}
