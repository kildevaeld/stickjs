"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var base_component_1 = require('./base-component');

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
        key: "update",
        value: function update() {
            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function _callee() {
                var template, creator, resolver, tString, view;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!this.subview) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt("return", this.subview.update());

                            case 2:
                                if (!this.resolving) {
                                    _context.next = 4;
                                    break;
                                }

                                return _context.abrupt("return");

                            case 4:
                                this.resolving = true;
                                template = this.attributes['template'];

                                if (!(!template || template == "")) {
                                    _context.next = 8;
                                    break;
                                }

                                return _context.abrupt("return");

                            case 8:
                                _context.next = 10;
                                return this.view.container.get('$templateCreator');

                            case 10:
                                creator = _context.sent;
                                _context.next = 13;
                                return this.view.container.get('$templateResolver');

                            case 13:
                                resolver = _context.sent;
                                _context.next = 16;
                                return resolver(template);

                            case 16:
                                tString = _context.sent;
                                view = creator(tString, this.view.context);

                                view.parent = this.view;
                                this.subview = view;
                                this.section.appendChild(view.render());
                                this.resolving = false;

                            case 22:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }]);

    return View;
}(base_component_1.BaseComponent);

exports.View = View;