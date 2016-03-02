"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var view_1 = require('templ/lib/view');
var collection_1 = require('collection');
var utilities_1 = require('utilities');
var debug = require('debug')('stick:template:view');

var TemplateView = function (_view_1$View) {
    _inherits(TemplateView, _view_1$View);

    function TemplateView(section, template, context, options) {
        _classCallCheck(this, TemplateView);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TemplateView).call(this, section, template, null, options));

        _this._onModelChange = utilities_1.bind(_this._onModelChange, _this);
        _this.context = context;
        if (options.delegator) {
            _this._delegator = options.delegator;
        }
        if (options.container) {
            _this._container = options.container;
        }
        _this._target = options.target;
        _this._id = utilities_1.uniqueId("templ");
        if (!_this.container) throw new Error("template view: no container set");
        debug("%s: Template view created with state %s", _this.id, _this.context.uid);
        return _this;
    }

    _createClass(TemplateView, [{
        key: 'setTarget',
        value: function setTarget(target) {
            this._target = target;
        }
    }, {
        key: '_onModelChange',
        value: function _onModelChange(model) {
            if (this.context == undefined) {
                console.log('context is undefined', model, this);
                return;
            }
            var changed = this.context.changed;
            //for (let k in changed) {
            //    this.set(k, changed[k])
            //}
            this.updateLater();
        }
    }, {
        key: 'set',
        value: function set(key, val) {
            var silent = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

            if (!silent) {
                if (!(this.context instanceof collection_1.Model)) {
                    _get(Object.getPrototypeOf(TemplateView.prototype), 'set', this).call(this, key, val);
                    return this.update();
                }
                if (!Array.isArray(key)) key = key.split(/[,.]/);
                if (key[0] === 'this') {
                    key.shift();
                    if (key.length === 0) {
                        this.root.context = val;
                        this.root.update();
                    } else {
                        this.root.set(key, val);
                        this.root.update();
                    }
                    return;
                } else if (key[0] === 'root') {
                    key.shift();
                    this.root.set(key, val);
                } else {
                    this.context.set(key.join('.'), val);
                }
            }
            this.updateLater();
        }
    }, {
        key: 'render',
        value: function render() {
            debug("%s: Render", this.id);
            return _get(Object.getPrototypeOf(TemplateView.prototype), 'render', this).call(this);
        }
    }, {
        key: 'update',
        value: function update() {
            debug("%s: Update", this.id);
            /*nextTick(() => {
                super.update();
            });*/
            _get(Object.getPrototypeOf(TemplateView.prototype), 'update', this).call(this);
        }
    }, {
        key: 'get',
        value: function get(key) {
            debug("%s: Get value for key: %j", this.id, key);
            if (!Array.isArray(key)) key = key.split(/[,.]/);
            var value = undefined,
                context = this.context;
            if (key[0] === '$root') {
                key.shift();
                context = this.root.context;
            }
            key = key.join('.');
            if (!value) {
                if (!(this.context instanceof collection_1.Model)) {
                    value = _get(Object.getPrototypeOf(TemplateView.prototype), 'get', this).call(this, key);
                } else {
                    value = context.get(key);
                }
                if (value == null && this.target != null) {
                    value = this.target[key];
                    if (typeof value === 'function') {
                        value = utilities_1.bind(value, this.target);
                    }
                }
            }
            debug("%s: Got value for key '%s': ", this.id, value);
            return value;
        }
    }, {
        key: 'remove',
        value: function remove() {
            if (this._context && this._context instanceof collection_1.Model) {
                this._context.off('change', this._onModelChange, this);
            }
            debug("%s: Remove", this.id);
            _get(Object.getPrototypeOf(TemplateView.prototype), 'remove', this).call(this);
        }
    }, {
        key: '$destroy',
        value: function $destroy() {
            debug("%s: Destroy", this.id);
            this.remove();
            //delete this._container;
            //delete this._delegator;
            //this.context = null;
        }
    }, {
        key: 'id',
        get: function get() {
            return this._id;
        }
    }, {
        key: 'parent',
        get: function get() {
            return this._parent;
        },
        set: function set(parent) {
            this._parent = parent;
        }
    }, {
        key: 'container',
        get: function get() {
            if (this._container) return this._container;
            return this.parent ? this.parent.container : undefined;
        }
    }, {
        key: 'context',
        set: function set(context) {
            if (this._context && this._context instanceof collection_1.Model) {
                this._context.off('change', this._onModelChange, this);
            }
            this._context = context;
            if (context != null && context instanceof collection_1.Model) {
                context.on('change', this._onModelChange, this);
            }
        },
        get: function get() {
            return this._context;
        }
    }, {
        key: 'target',
        get: function get() {
            if (!!this._target) return this._target;
            return this.parent ? this.parent.target : undefined;
        }
    }]);

    return TemplateView;
}(view_1.View);

exports.TemplateView = TemplateView;