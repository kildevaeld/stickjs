"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var base_component_1 = require('./base-component');
var decorators = require('../../decorators');
var collection_1 = require('collection');
var _1 = require('../');
var View = function (_base_component_1$Bas) {
    _inherits(View, _base_component_1$Bas);

    function View() {
        var _Object$getPrototypeO;

        _classCallCheck(this, View);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(View)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.resolving = false;
        return _this;
    }

    _createClass(View, [{
        key: "getContext",
        value: function getContext() {
            var context = this.attributes['context'];
            if (!context) {
                context = this.view.context;
            } else {
                if (context instanceof _1.Call) {
                    context = context.call();
                }
                if (this.attributes['as']) {
                    var as = this.attributes['as'];
                    context = new collection_1.NestedModel(_defineProperty({}, as, context));
                }
            }
            return context;
        }
    }, {
        key: "update",
        value: function update() {
            return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
                var template, context, creator, resolver, tString, view;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!this.subview) {
                                    _context.next = 3;
                                    break;
                                }

                                if (this.subview.context !== this.view.context) {
                                    this.subview.context = this.getContext();
                                }
                                return _context.abrupt("return", this.subview.update());

                            case 3:
                                if (!this.resolving) {
                                    _context.next = 5;
                                    break;
                                }

                                return _context.abrupt("return");

                            case 5:
                                this.resolving = true;
                                template = this.attributes['template'];
                                context = this.getContext();

                                if (!(!template || template == "")) {
                                    _context.next = 10;
                                    break;
                                }

                                return _context.abrupt("return");

                            case 10:
                                _context.next = 12;
                                return this.view.container.get('$templateCreator');

                            case 12:
                                creator = _context.sent;
                                _context.next = 15;
                                return this.view.container.get('$templateResolver');

                            case 15:
                                resolver = _context.sent;
                                _context.next = 18;
                                return resolver(template);

                            case 18:
                                tString = _context.sent;
                                view = creator(tString, context);

                                view.parent = this.view;
                                this.subview = view;
                                this.section.appendChild(view.render());
                                this.resolving = false;

                            case 24:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "onDestroy",
        value: function onDestroy() {
            if (this.subview) {
                this.subview.$destroy();
            }
        }
    }]);

    return View;
}(base_component_1.BaseComponent);
View = __decorate([decorators.component("view")], View);
exports.View = View;