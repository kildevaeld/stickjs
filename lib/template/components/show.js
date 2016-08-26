'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var base_component_1 = require('./base-component');

var Show = function (_base_component_1$Bas) {
    _inherits(Show, _base_component_1$Bas);

    function Show() {
        _classCallCheck(this, Show);

        return _possibleConstructorReturn(this, (Show.__proto__ || Object.getPrototypeOf(Show)).apply(this, arguments));
    }

    _createClass(Show, [{
        key: 'update',
        value: function update() {
            var _this2 = this;

            var show = this.attributes['when'];
            if (this._shown === show) {
                if (this.subview) {
                    this.subview.update();
                }
                return Promise.resolve();
            }
            this._shown = show;
            if (show) {
                if (!this.subview) {
                    return this.childTemplate.render(this.view.context, {
                        parent: this.view /*,
                                          container: this.view.container,
                                          target: this.view.target*/
                    }).then(function (view) {
                        _this2.subview = view;
                        return _this2.subview.render();
                    }).then(function (elm) {
                        _this2.section.appendChild(elm);
                    });
                }
            } else {
                if (this.subview) {
                    this.subview.$destroy();
                }
                this.subview = void 0;
            }
        }
    }, {
        key: 'onDestroy',
        value: function onDestroy() {
            if (this.subview) this.subview.$destroy();
        }
    }]);

    return Show;
}(base_component_1.BaseComponent);

exports.Show = Show;

var Hide = function (_base_component_1$Bas2) {
    _inherits(Hide, _base_component_1$Bas2);

    function Hide() {
        _classCallCheck(this, Hide);

        return _possibleConstructorReturn(this, (Hide.__proto__ || Object.getPrototypeOf(Hide)).apply(this, arguments));
    }

    _createClass(Hide, [{
        key: 'update',
        value: function update() {
            var _this4 = this;

            var hide = this.attributes['when'];
            if (this._hide === hide) {
                if (this.subview) {
                    this.subview.update();
                }
                return Promise.resolve();
            }
            this._hide = hide;
            if (!hide) {
                if (!this.subview) {
                    return this.childTemplate.render(this.view.context, {
                        parent: this.view /*,
                                          container: this.view.container,
                                          target: this.view.target*/
                    }).then(function (view) {
                        _this4.subview = view;
                        return _this4.subview.render();
                    }).then(function (elm) {
                        _this4.section.appendChild(elm);
                    });
                }
            } else {
                if (this.subview) {
                    this.subview.$destroy();
                }
                this.subview = void 0;
            }
        }
    }, {
        key: 'onDestroy',
        value: function onDestroy() {
            if (this.subview) this.subview.$destroy();
        }
    }]);

    return Hide;
}(base_component_1.BaseComponent);

exports.Hide = Hide;
/*
export const Shower: ComponentDefinition = {
  initialize: function initialize() {

  },
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
          parent: this.view
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

    if (this._subview)
      this._subview.$destroy();
  }
}

export const Hide2: ComponentDefinition = {
  initialize: function initialize() {

  },
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
          parent: this.view
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
    if (this._subview)
      this._subview.$destroy();
  }
};

*/