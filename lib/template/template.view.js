/// <reference path="../typings" />
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _templ = require('templ');

var templ = _interopRequireWildcard(_templ);

var _collection = require('collection');

var TemplateView = (function (_templ$View) {
    _inherits(TemplateView, _templ$View);

    function TemplateView(section, template, context, options) {
        _classCallCheck(this, TemplateView);

        _get(Object.getPrototypeOf(TemplateView.prototype), 'constructor', this).call(this, section, template, context, options);
        if (options.delegator) {
            this.delegator = options.delegator;
        }
        if (options.container) {
            this._container = options.container;
        }
    }

    _createClass(TemplateView, [{
        key: '_onModelChange',
        value: function _onModelChange() {}
    }, {
        key: 'set',
        value: function set(key, val) {
            var silent = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

            if (!silent) {
                if (!(this.context instanceof _collection.Model)) {
                    return _get(Object.getPrototypeOf(TemplateView.prototype), 'set', this).call(this, key, val);
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
            this.update();
        }
    }, {
        key: 'get',
        value: function get(key) {
            if (!Array.isArray(key)) key = key.split(/[,.]/);
            var value = undefined,
                context = this.context;
            if (key[0].substr(0, 1) === "@") {
                key[0] = key[0].substr(1);
                key.unshift('this');
            }
            if (key[0] === 'this') {
                key.shift();
                if (key.length === 0) {
                    value = this.context;
                }
            } else if (key[0] === 'root') {
                key.shift();
                context = this.root.context;
            }
            key = key.join('.');
            if (!value) {
                if (!(this.context instanceof _collection.Model)) {
                    value = _get(Object.getPrototypeOf(TemplateView.prototype), 'get', this).call(this, key);
                } else {
                    value = context.get(key);
                }
            }
            return value;
        }
    }, {
        key: 'remove',
        value: function remove() {
            _get(Object.getPrototypeOf(TemplateView.prototype), 'remove', this).call(this);
            delete this._container;
            delete this.delegator;
            delete this._context;
        }
    }, {
        key: '$destroy',
        value: function $destroy() {
            this.remove();
        }
    }, {
        key: 'context',
        set: function set(context) {
            if (this._context && this._context instanceof _collection.Model) {}
            if (context != null && context instanceof _collection.Model) {
                context.on('change', function () {
                    var changed = context.changed;
                    for (var k in changed) {
                        this.set(k, changed[k]);
                    }
                }, this);
            }
            this._context = context;
        },
        get: function get() {
            return this._context;
        }
    }]);

    return TemplateView;
})(templ.View);

exports.TemplateView = TemplateView;