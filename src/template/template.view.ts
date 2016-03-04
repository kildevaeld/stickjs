declare var require:any;
import {View, IDelegator} from 'templ/lib/view'
import {Model, NestedModel} from 'collection'
import {DIContainer} from 'stick.di'
import {bind, uniqueId, nextTick} from 'utilities';

const debug = require('debug')('stick:template:view');

export interface TemplateViewOptions {
    parent?: TemplateView;
    container: DIContainer;
    delegator?: IDelegator;
    target?:any
}

export class TemplateView extends View {
    private _context: any;
    private _container: DIContainer;
    private _target: any;
    private _id: string;
    private _parent: TemplateView

    get id () {
        return this._id
    }

    get parent(): TemplateView {
        return this._parent;
    }

    set parent(parent:TemplateView) {
        this._parent = parent;
    }

    get container(): DIContainer {
        if (this._container) return this._container;
        return this.parent ? this.parent.container : undefined;
    }

    set context(context: any) {

        if (this._context && this._context instanceof Model) {
            this._context.off('change', this._onModelChange, this);

        }

        this._context = context;

        if (context != null && context instanceof Model) {
            context.on('change', this._onModelChange, this);
        }

        this.updateLater();

    }

    get context(): any {
        return this._context
    }

    get target(): any {
        if (!!this._target) return this._target;
        return this.parent ? this.parent.target : undefined;

    }

    setTarget(target:any) {
      this._target = target;
    }

    _onModelChange(model) {
        if (this.context == undefined) {
            console.log('context is undefined', model, this);
            return
        }
        let changed = this.context.changed

        //for (let k in changed) {
        //    this.set(k, changed[k])
        //}

        this.updateLater();

    }

    constructor(section: any, template: any, context: any, options?: TemplateViewOptions) {
        super(section, template, null, options)
        this._onModelChange = bind(this._onModelChange, this);
        this.context = context;
        if (options.delegator) {
            this._delegator = options.delegator
        }

        if (options.container) {
            this._container = options.container
        }
        this._target = options.target;
	    this._id = uniqueId("templ");
        if (!this.container) throw new Error("template view: no container set");
        debug("%s: Template view created with state %s", this.id, this.context.uid);
    }

    set(key: string | string[], val: any, silent: boolean = false) {

        if (!silent) {

            if (!(this.context instanceof Model)) {
                super.set(key, val)
                return this.update();
            }

            if (!Array.isArray(key)) key = (<string>key).split(/[,.]/);

            if (key[0] === 'this') {
                (<string[]>key).shift();


                if (key.length === 0) {
                    this.root.context = val
                    this.root.update()
                } else {
                    this.root.set(key, val)
                    this.root.update();
                }
                return
            } else if (key[0] === 'root') {
                (<string[]>key).shift()
                this.root.set(key, val);
            } else {

                this.context.set((<string[]>key).join('.'), val)

            }

        }

        this.updateLater()
    }

    render (): HTMLElement {
        debug("%s: Render", this.id);
        return <HTMLElement>super.render();
    }

    update() {
        debug("%s: Update", this.id);
        /*nextTick(() => {
            super.update();
        });*/
        super.update();

    }

    get(key: string | string[]): any {
	    debug("%s: Get value for key: %j", this.id, key);
        if (!Array.isArray(key)) key = (<string>key).split(/[,.]/);

        let value, context = this.context;

        if (key[0] === '$root') {
            (<any>key).shift();
            context = this.root.context
        }

        key = (<any>key).join('.');


        if (!value) {
            if (!(this.context instanceof Model)) {
                value = super.get(key)
            } else {
                value = context.get(key)
            }

            if (value == null && this.target != null) {

                value = this.target[<string>key];

                if (typeof value === 'function') {
                    value = bind(value, this.target);
                }

            }
        }
        debug("%s: Got value for key '%s': ", this.id, key, value);
        return value;

    }

    remove() {
        if (this._context && this._context instanceof Model) {
            this._context.off('change', this._onModelChange, this);
        }
        debug("%s: Remove", this.id);
        super.remove();
    }

    $destroy() {
        debug("%s: Destroy", this.id);
        this.remove();
        //delete this._container;
        //delete this._delegator;
        //this.context = null;
    }
}
