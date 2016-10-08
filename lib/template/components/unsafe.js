'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var base_component_1 = require('./base-component');

var Unsafe = function (_base_component_1$Bas) {
  _inherits(Unsafe, _base_component_1$Bas);

  function Unsafe() {
    _classCallCheck(this, Unsafe);

    return _possibleConstructorReturn(this, (Unsafe.__proto__ || Object.getPrototypeOf(Unsafe)).apply(this, arguments));
  }

  _createClass(Unsafe, [{
    key: 'update',
    value: function update() {
      var value = this.attributes['html'];
      // dirty check if is a binding
      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === "object" && value.evaluate) {
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
    }
  }]);

  return Unsafe;
}(base_component_1.BaseComponent);

exports.Unsafe = Unsafe;
/*export const Unsafe: ComponentDefinition = {
    initialize: function initialize() {
    
  },
  update: function update() {
     var value = this.attributes.html;

    // dirty check if is a binding
    if (typeof value === "object" && value.evaluate) {
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
    if (this._subview)
        this._subview.remove();
  }
}
*/