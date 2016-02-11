
import * as utils from 'utilities';
import * as stick from '../stick';

export class Html {
    private _elements: HTMLElement[];

    get length(): number {
        return this._elements.length;
    }

    constructor(el: HTMLElement[]) {
        this._elements = el || [];
    }
    
    get (n:number): HTMLElement {
        return n >= this.length ? undefined : this._elements[n];
    }

    addClass(str: string): Html {
        return this.forEach((e) => {
            utils.addClass(e, str);
        });
    }

    removeClass(str: string): Html {
        return this.forEach((e) => {
            utils.removeClass(e, str);
        });
    }

    attr(): Html {
        
        return this;
    }

    parent(): Html {
	    var out = [];
        this.forEach( e => {
            if (e.parentElement) {
                out.push(e.parentElement);
            }
        }) 
        return new Html(out);
    }

    find(str:string): Html {
        var out = [];
        this.forEach( e => {
           out = out.concat(utils.slice(e.querySelectorAll(str)));  
        });
        return new Html(out);
    }

    forEach(fn: (elm: HTMLElement, index: number) => void): Html {
        this._elements.forEach(fn);
        return this;
    }
}

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
                    els = utils.slice(context.querySelectorAll(query));
                } else {
                    html = new Html(utils.slice(context));
                    return html.find(query);
                }
            } else {
                els = utils.slice(document.querySelectorAll(query));
            }
        } else if (query && query instanceof Element) {
            els = [query];
        } else if (query && query instanceof NodeList) {
            els = utils.slice(query);
        }
        
        return new Html(els);
    };
});