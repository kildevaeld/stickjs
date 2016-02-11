'use strict';

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) {
            return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) {
                resolve(value);
            });
        }
        function onfulfill(value) {
            try {
                step("next", value);
            } catch (e) {
                reject(e);
            }
        }
        function onreject(value) {
            try {
                step("throw", value);
            } catch (e) {
                reject(e);
            }
        }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
exports.Show = {
    initialize: function initialize() {},
    update: function update() {
        var show = this.attributes.when;
        if (this._show === show) {
            if (this._subview) {
                this._subview.update();
            }
            return;
        }
        this._show = show;
        if (show) {
            if (!this._subview) {
                this._subview = this.childTemplate.view(this.view.context, {
                    parent: this.view,
                    container: this.view.container,
                    target: this.view.target
                });
                this.section.appendChild(this._subview.render());
            }
        } else {
            if (this._subview) {
                this._subview.$destroy();
            }
            this._subview = void 0;
        }
    },
    onDestroy: function destroy() {
        if (this._subview) this._subview.$destroy();
    }
};
exports.Hide = {
    initialize: function initialize() {},
    update: function update() {
        var hide = this.attributes.when;
        if (this._hide === hide) {
            if (this._subview) {
                this._subview.update();
            }
            return;
        }
        this._hide = hide;
        if (!hide) {
            if (!this._subview) {
                this._subview = this.childTemplate.view(this.view.context, {
                    parent: this.view,
                    container: this.view.container,
                    target: this.view.target
                });
                this.section.appendChild(this._subview.render());
            }
        } else {
            if (this._subview) {
                this._subview.$destroy();
            }
            this._subview = void 0;
        }
    },
    onDestroy: function destroy() {
        if (this._subview) this._subview.$destroy();
    }
};