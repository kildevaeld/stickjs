import {View, IDelegator} from 'templ/lib/view'
import {Model,NestedModel} from 'collection'
import {DIContainer} from 'di'
import {bind} from 'utilities';

export interface TemplateViewOptions {
	parent?: TemplateView
	container: DIContainer
	delegator?: IDelegator
}

export class TemplateView extends View {
	_context: any
	_container: DIContainer

	get container (): DIContainer {
      return this._container;
	}

	set context(context: any) {

		if (this._context && this._context instanceof Model) {

			this._context.off('change', this._onModelChange, this);

		}
		if (context != null && context instanceof Model) {
    	context.on('change', this._onModelChange, this);
		}
    //console.log('context', this._context, context);
		this._context = context

	}

	get context(): any {
		return this._context
	}

	_onModelChange (model) {
			if (this.context == undefined) {
          console.log('context is undefined', model, this);
			}
      let changed = model.changed
      for (let k in changed) {
          this.set(k, changed[k])
      }
	}

	constructor(section:any, template:any, context:any,options?:TemplateViewOptions) {
			super(section, template, context, options)

      //this._onModelChange = bind(this._onModelChange, this);
			if (options.delegator) {
				this._delegator = options.delegator
			}

			if (options.container) {
				this._container = options.container
			}

      if (!this.container) throw new Error("template view: no container set");

	}

	set(key: string|string[], val: any, silent: boolean = false) {
		if (!silent) {
			if (!(this.context instanceof Model)) {
				return super.set(key, val)
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

		this.update()
	}

	get(key: string|string[]): any {

		if (!Array.isArray(key)) key = (<string>key).split(/[,.]/);

		let value, context = this.context;

		if (key[0].substr(0,1) === "@") {
			key[0] = key[0].substr(1);
			(<string[]>key).unshift('this');
		}

		if (key[0] === 'this') {
			(<any>key).shift();
			if (key.length === 0) {
				value = this.context
			}
		} else if (key[0] === 'root') {
			(<any>key).shift();
			context = this.root.context
		}


		key = (<any>key).join('.')
		if (!value) {
			if (!(this.context instanceof Model)) {
				value = super.get(key)
			} else {
				value = context.get(key)
			}
		}

		return value;
	}

	remove () {
    if (this._context && this._context instanceof Model) {
    	this._context.off('change', this._onModelChange, this);
    }

    super.remove()
	}

	$destroy () {
		this.remove()
    delete this._container
    delete this._delegator
    this._context = null;
	}
}
