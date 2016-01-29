'use strict';

exports.Show = {
    initialize: function initialize($context) {},
    update: function update() {
        var show = this._attributes.when;
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
                    container: this.view._container
                });
            }
            this.section.appendChild(this._subview.render());
        } else {
            if (this._subview) {
                this._subview.remove();
            }
        }
    },
    onDestroy: function destroy() {
        console.log('on destroy');
        if (this._subview) this._subview.$destroy();
    }
};
exports.Hide = {
    initialize: function initialize($context) {},
    update: function update() {
        var hide = this._attributes.when;
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
                    container: this.view._container
                });
            }
            this.section.appendChild(this._subview.render());
        } else {
            if (this._subview) {
                this._subview.remove();
            }
        }
    },
    onDestroy: function destroy() {
        if (this._subview) this._subview.$destroy();
    }
};