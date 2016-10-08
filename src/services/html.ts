
import {Html} from 'orange.dom';
import {slice} from 'orange'
import * as stick from '../stick';



stick.factory("$html", function() {
    return (query: string | HTMLElement | NodeList, context?: string | HTMLElement | NodeList) => {
        if (typeof context === 'string') {
            context = document.querySelectorAll(<string>context);
        }
        let html: Html;
        let els: HTMLElement[];
        if (typeof query === 'string') {
            if (context) {
                if (context instanceof HTMLElement) {
                    els = slice(context.querySelectorAll(query));
                } else {
                    html = new Html(slice(context));
                    return html.find(query);
                }
            } else {
                els = slice(document.querySelectorAll(query));
            }
        } else if (query && query instanceof Element) {
            els = [query];
        } else if (query && query instanceof NodeList) {
            els = slice(query);
        }
        
        return new Html(els);
    };
});