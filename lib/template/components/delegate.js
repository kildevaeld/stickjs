'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var action_1 = require('templ/lib/action');
var utilities_1 = require('utilities');
var base_component_1 = require('./base-component');

var Delegate = function (_base_component_1$Bas) {
    _inherits(Delegate, _base_component_1$Bas);

    function Delegate() {
        _classCallCheck(this, Delegate);

        return _possibleConstructorReturn(this, (Delegate.__proto__ || Object.getPrototypeOf(Delegate)).apply(this, arguments));
    }

    _createClass(Delegate, [{
        key: 'initialize',
        value: function initialize() {
            var _this2 = this;

            this._onEvent = utilities_1.bind(this._onEvent, this);
            return this.childTemplate.render(this.view.context, {
                parent: this.view
            }).then(function (view) {
                _this2.subview = view;
                return _this2.subview.render();
            }).then(function (el) {
                _this2.el = _this2.document.createElement('div');
                _this2.el.appendChild(el);
                _this2.section.appendChild(_this2.el);
                var event = _this2.attributes['event'] || 'click';
                utilities_1.delegate(_this2.el, _this2.attributes['selector'], 'click', _this2._onEvent);
            });
        }
    }, {
        key: 'update',
        value: function update() {
            return Promise.resolve();
        }
    }, {
        key: '_onEvent',
        value: function _onEvent(e) {
            var self = this;
            var fn = this.attributes['click'];
            //let fn;
            if (action_1.isAssignment(fn)) {
                fn = fn.assign;
            }
            if (typeof fn !== 'function') {
                throw new Error('[event] value is not a function');
            }
            fn(e);
        }
    }, {
        key: 'onDestroy',
        value: function onDestroy() {
            utilities_1.undelegate(this.el, this.attributes['selector'], 'click', this._onEvent);
            if (this.subview) this.subview.$destroy();
        }
    }]);

    return Delegate;
}(base_component_1.BaseComponent);

exports.Delegate = Delegate;
/*
export const Delegate: ComponentDefinition = {
    initialize: function initialize($container) {
        this._onEvent = bind(this._onEvent, this);

        var view = this.childTemplate.view(this.view.context, {
            parent: this.view
        });

        this._subview = view;

        this._container = this.document.createElement('div');
        this._container.appendChild(view.render());

        this.section.appendChild(this._container);


        delegate(this._container, this.attributes.selector, 'click', this._onEvent);
    },
    update: function update() { },
    _onEvent: function _onEvent(e) {
        var self = this;

        var fn = this.attributes.click;
        
        //let fn;
        if (fn instanceof templ.Assignment) {
            fn = fn.assign;
        }

        if (typeof fn !== 'function') {
           
            throw new Error('[event] value is not a function');
        }
        fn(e);
    },
    onDestroy: function destroy() {
        undelegate(this._container, this.attributes.selector, 'click', this._onEvent);
        this._subview.$destroy();
    }
}*/