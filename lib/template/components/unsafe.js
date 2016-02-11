'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
exports.Unsafe = {
    initialize: function initialize() {},
    update: function update() {
        var value = this.attributes.html;
        // dirty check if is a binding
        if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && value.evaluate) {
            value = void 0;
        }
        if (this.currentValue && this.currentValue === value) {
            if (this.currentValue.__isView) {
                this.currentValue.update(this.currentValue.context);
            }
            return;
        }
        // has a remove script
        if (this.currentValue && this.currentValue.remove) {
            this.currentValue.remove();
        }
        this.currentValue = value;
        if (!value) {
            return this.section.removeChildNodes();
        }
        var node;
        if (value.render) {
            value.remove();
            node = value.render();
        } else if (value.nodeType != null) {
            node = value;
        } else {
            /*if (this.document !== global.document) {
              node = this.document.createTextNode(String(value));
            } else {
              var div = this.document.createElement("div");
              div.innerHTML = String(value);
              node = this.document.createDocumentFragment();
             
              var cn = Array.prototype.slice.call(div.childNodes);
              for (var i = 0, n = cn.length; i < n; i++) {
                node.appendChild(cn[i]);
              }
            }*/
            var div = this.document.createElement("div");
            div.innerHTML = String(value);
            node = this.document.createDocumentFragment();
            var cn = Array.prototype.slice.call(div.childNodes);
            for (var i = 0, n = cn.length; i < n; i++) {
                node.appendChild(cn[i]);
            }
        }
        this.section.removeChildNodes();
        this.section.appendChild(node);
    },
    onDestroy: function destroy() {
        if (this._subview) this._subview.remove();
    }
};