'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var annotations_1 = require('../annotations');
var eventsjs_1 = require('eventsjs');
var Mediator = (function () {
    function Mediator() {
        _classCallCheck(this, Mediator);

        this.emitter = new eventsjs_1.EventEmitter();
    }

    _createClass(Mediator, [{
        key: "publish",
        value: function publish(event) {
            var _emitter;

            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            (_emitter = this.emitter).trigger.apply(_emitter, [event].concat(args));
        }
    }, {
        key: "subscribe",
        value: function subscribe(event, handler, ctx) {
            this.emitter.on(event, handler, ctx);
        }
    }, {
        key: "unsubscribe",
        value: function unsubscribe(event, handler) {
            this.emitter.off(event, handler);
        }
    }]);

    return Mediator;
})();
Mediator = __decorate([annotations_1.service('$mediator')], Mediator);
exports.Mediator = Mediator;