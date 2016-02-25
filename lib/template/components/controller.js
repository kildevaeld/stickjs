"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
//import {components, View, compile, vnode} from 'templ'
//import {DIContainer} from 'stick.di'
var utilities_1 = require('utilities');
var base_component_1 = require('./base-component');
var controller_factory_1 = require('../../controller.factory');
//import {ComponentDefinition} from '../index'

var Controller = function (_base_component_1$Bas) {
    _inherits(Controller, _base_component_1$Bas);

    function Controller() {
        _classCallCheck(this, Controller);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Controller).apply(this, arguments));
    }

    _createClass(Controller, [{
        key: 'initialize',
        value: function initialize() {
            if (this.attributes['name']) {
                this.name = this.attributes['name'];
                this.as = this.attributes['as'] || this.name;
            }
        }
    }, {
        key: 'update',
        value: function update() {
            return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
                var view, template, state, s, controller, el;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!this.factory) {
                                    _context.next = 7;
                                    break;
                                }

                                if (!this.factory.container.hasHandler('template')) {
                                    _context.next = 6;
                                    break;
                                }

                                _context.next = 4;
                                return this.factory.container.get('template');

                            case 4:
                                view = _context.sent;

                                view.update();

                            case 6:
                                return _context.abrupt('return');

                            case 7:
                                if (!this.resolving) {
                                    _context.next = 9;
                                    break;
                                }

                                return _context.abrupt('return');

                            case 9:
                                this.resolving = true;
                                _context.next = 12;
                                return this.view.container.get(this.name);

                            case 12:
                                this.factory = _context.sent;

                                if (this.factory instanceof controller_factory_1.ControllerFactory) {
                                    _context.next = 15;
                                    break;
                                }

                                throw new Error(this.name + ' is not a controller');

                            case 15:
                                template = this.childTemplate;

                                if (this.attributes['template']) {
                                    template = this.attributes['template'];
                                }
                                state = {};

                                if (this.attributes['state']) {
                                    s = this.attributes['state'];

                                    try {
                                        state = utilities_1.isString(s) ? JSON.parse(s) : Object(s);
                                    } catch (e) {
                                        console.warn('Could not parse model tag');
                                    }
                                }
                                _context.next = 21;
                                return this.factory.create({
                                    template: template,
                                    contextName: this.as,
                                    parentView: this.view,
                                    state: state
                                });

                            case 21:
                                controller = _context.sent;
                                _context.next = 24;
                                return this.factory.container.get('$el');

                            case 24:
                                el = _context.sent;

                                this.section.appendChild(el);
                                this.resolving = false;

                            case 27:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            if (this.factory) {
                this.factory.destroy();
                this.factory = void 0;
            }
            _get(Object.getPrototypeOf(Controller.prototype), 'destroy', this).call(this);
        }
    }]);

    return Controller;
}(base_component_1.BaseComponent);

exports.Controller = Controller;