/// <reference path="../typings" />
var templ = require('templ');
var collection_1 = require('collection');
class TemplateView extends templ.View {
    constructor(section, template, context, options) {
        super(section, template, context, options);
        if (options.delegator) {
            this.delegator = options.delegator;
        }
        if (options.container) {
            this._container = options.container;
        }
    }
    set context(context) {
        if (this._context && this._context instanceof collection_1.Model) {
        }
        if (context != null && context instanceof collection_1.Model) {
            context.on('change', function () {
                let changed = context.changed;
                for (let k in changed) {
                    this.set(k, changed[k]);
                }
            }, this);
        }
        this._context = context;
    }
    get context() {
        return this._context;
    }
    _onModelChange() {
    }
    set(key, val, silent = false) {
        if (!silent) {
            if (!(this.context instanceof collection_1.Model)) {
                return super.set(key, val);
            }
            if (!Array.isArray(key))
                key = key.split(/[,.]/);
            if (key[0] === 'this') {
                key.shift();
                if (key.length === 0) {
                    this.root.context = val;
                    this.root.update();
                }
                else {
                    this.root.set(key, val);
                    this.root.update();
                }
                return;
            }
            else if (key[0] === 'root') {
                key.shift();
                this.root.set(key, val);
            }
            else {
                this.context.set(key.join('.'), val);
            }
        }
        this.update();
    }
    get(key) {
        if (!Array.isArray(key))
            key = key.split(/[,.]/);
        let value, context = this.context;
        if (key[0].substr(0, 1) === "@") {
            key[0] = key[0].substr(1);
            key.unshift('this');
        }
        if (key[0] === 'this') {
            key.shift();
            if (key.length === 0) {
                value = this.context;
            }
        }
        else if (key[0] === 'root') {
            key.shift();
            context = this.root.context;
        }
        key = key.join('.');
        if (!value) {
            if (!(this.context instanceof collection_1.Model)) {
                value = super.get(key);
            }
            else {
                value = context.get(key);
            }
        }
        return value;
    }
    remove() {
        super.remove();
        delete this._container;
        delete this.delegator;
        delete this._context;
    }
    $destroy() {
        this.remove();
    }
}
exports.TemplateView = TemplateView;
