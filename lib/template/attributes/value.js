"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var base_attribute_1 = require('./base-attribute');
var decorators = require('../../decorators');
var action_1 = require('templ/lib/action');
var utils = require('utilities');
var _events = ['change', 'keyup', 'input'];
var debug = require('debug')('stick:template:attribute:value');
var ValueAttribute = function (_base_attribute_1$Bas) {
    _inherits(ValueAttribute, _base_attribute_1$Bas);

    function ValueAttribute() {
        _classCallCheck(this, ValueAttribute);

        return _possibleConstructorReturn(this, (ValueAttribute.__proto__ || Object.getPrototypeOf(ValueAttribute)).apply(this, arguments));
    }

    _createClass(ValueAttribute, [{
        key: "initialize",
        value: function initialize() {
            this._onInput = utils.bind(this._onInput, this, null);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var e = _step.value;

                    this.ref.addEventListener(e, this._onInput);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: "update",
        value: function update() {
            var model = this.model = this.value;
            if (!model) return Promise.resolve();
            if (!model || !(model instanceof action_1.Reference)) {
                throw Promise.reject(new Error("input value must be a reference. Make sure you have <~> defined"));
            }
            if (model.gettable) {
                this._elementValue(this._parseValue(model.value()));
            }
            return Promise.resolve();
        }
    }, {
        key: "_parseValue",
        value: function _parseValue(value) {
            if (value == null || value === "") return void 0;
            return value;
        }
    }, {
        key: "_onInput",
        value: function _onInput(event) {
            clearInterval(this._autocompleteCheckInterval);
            // ignore some keys
            if (event && (!event.keyCode || !~[27].indexOf(event.keyCode))) {
                event.stopPropagation();
            }
            var value = this._parseValue(this._elementValue());
            if (!this.model) return;
            if (utils.equal(this.model.value(), value)) {
                debug('input: no change');
                return;
            }
            debug('input changed %s', this.model.value(), value);
            this.model.value(value);
        }
    }, {
        key: "_elementValue",
        value: function _elementValue(value) {
            var node = this.ref;
            var isCheckbox = /checkbox/.test(node.type);
            var isRadio = /radio/.test(node.type);
            var isRadioOrCheckbox = isCheckbox || isRadio;
            var hasValue = Object.prototype.hasOwnProperty.call(node, "value");
            var isInput = hasValue || /input|textarea|checkbox/.test(node.nodeName.toLowerCase());
            var isSelect = /select/i.test(node.nodeName);
            if (!arguments.length) {
                if (isCheckbox) {
                    return Boolean(node.checked);
                } else if (isInput || isSelect) {
                    return node.value || "";
                } else {
                    return node.innerHTML || "";
                }
            }
            if (value == null) {
                value = "";
            } else {
                clearInterval(this._autocompleteCheckInterval);
            }
            if (isRadioOrCheckbox) {
                if (isRadio) {
                    if (String(value) === String(node.value)) {
                        node.checked = true;
                    }
                } else {
                    node.checked = value;
                }
            } else if (!utils.equal(this._elementValue(), value)) {
                if (isInput || isSelect) {
                    node.value = value;
                } else {
                    node.innerHTML = value;
                }
            }
        }
    }]);

    return ValueAttribute;
}(base_attribute_1.BaseAttribute);
ValueAttribute = __decorate([decorators.attribute('value')], ValueAttribute);
exports.ValueAttribute = ValueAttribute;