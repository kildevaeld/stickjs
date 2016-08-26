"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var eventsjs_1 = require('eventsjs');
var utils = require('utilities');

var Observer = function (_eventsjs_1$EventEmit) {
    _inherits(Observer, _eventsjs_1$EventEmit);

    function Observer(el) {
        _classCallCheck(this, Observer);

        var _this = _possibleConstructorReturn(this, (Observer.__proto__ || Object.getPrototypeOf(Observer)).call(this));

        _this.observer = new MutationObserver(utils.bind(_this._observe, _this));
        /*this.observer.observe(el, {
            attributes: true,
            childList: true,
            characterData: true
        });*/
        _this.observers = new Map();
        return _this;
    }

    _createClass(Observer, [{
        key: 'observe',
        value: function observe(elm, fn) {
            this.observer.observe(elm, {
                attributes: true,
                childList: true
            });
            this.observers.set(elm, fn);
        }
    }, {
        key: 'unobserve',
        value: function unobserve() {}
    }, {
        key: '_observe',
        value: function _observe(records, observer) {
            for (var i = 0, ii = records.length; i < ii; i++) {
                var record = records[i];
                if (this.observers.has(record.target)) {
                    this.observers.get(record.target)();
                }
            }
        }
    }, {
        key: '$destroy',
        value: function $destroy() {
            _get(Observer.prototype.__proto__ || Object.getPrototypeOf(Observer.prototype), 'destroy', this).call(this);
            this.observer.disconnect();
        }
    }]);

    return Observer;
}(eventsjs_1.EventEmitter);

exports.Observer = Observer;