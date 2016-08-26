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
var decorators = require('../../decorators');
var collection_1 = require('collection');
var base_component_1 = require('./base-component');
var template_view_1 = require('../template.view');
var view_1 = require('templ/lib/view');
function iterate(list, fn) {
    if (list instanceof collection_1.Collection) {
        list = list.models;
    } else if (list instanceof template_view_1.TemplateView) {
        return Promise.resolve();
    }
    return new Promise(function (resolve, reject) {
        var promises = [];
        for (var i = 0, ii = list.length; i < ii; i++) {
            promises.push(fn(list[i], i));
        }
        Promise.all(promises).then(resolve).catch(reject);
    });
}
var Repeat = function (_base_component_1$Bas) {
    _inherits(Repeat, _base_component_1$Bas);

    function Repeat() {
        _classCallCheck(this, Repeat);

        return _possibleConstructorReturn(this, (Repeat.__proto__ || Object.getPrototypeOf(Repeat)).apply(this, arguments));
    }

    _createClass(Repeat, [{
        key: "initialize",
        value: function initialize() {
            return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this._children = [];
                                this._collection = [];
                                _context.next = 4;
                                return this.childTemplate.render(this.view.context, {
                                    parent: this.view
                                });

                            case 4:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: "update",
        value: function update() {
            var _this2 = this;

            var as = this['as'];
            var each = this['each'];
            var key = this['key'] || "key";
            var n = 0;
            var self = this;
            var parent = this.view;
            if (each === this._collection || each == null) {
                return Promise.resolve();
            }
            if (each instanceof view_1.Call) {
                each = each.call();
            }
            if (this._collection && this._collection instanceof collection_1.Collection) {
                this.__removeEventListeners(this._collection);
            }
            this._collection = each;
            return this._update().then(function () {
                if (each instanceof collection_1.Collection) {
                    _this2.__addEventListeners(each);
                }
            });
        }
    }, {
        key: "_update",
        value: function _update() {
            var _this3 = this;

            var properties;
            var as = this['as'];
            var parent = this.view;
            var i = 0;
            var filter = this['filter'] || function (a) {
                return true;
            };
            return iterate(this._collection, function (m, n) {
                return __awaiter(_this3, void 0, void 0, regeneratorRuntime.mark(function _callee2() {
                    var child, _ref;

                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    if (filter(m)) {
                                        _context2.next = 2;
                                        break;
                                    }

                                    return _context2.abrupt("return");

                                case 2:
                                    if (as) {
                                        properties = new collection_1.NestedModel((_ref = {}, _defineProperty(_ref, as, m), _defineProperty(_ref, "self", this.view.context), _ref));
                                    } else {
                                        properties = m;
                                    }
                                    //if (properties instanceof Model)
                                    // TODO - provide SAME context here for speed and stability

                                    if (!(n >= this._children.length)) {
                                        _context2.next = 13;
                                        break;
                                    }

                                    _context2.next = 6;
                                    return this.childTemplate.view(properties, {
                                        parent: parent
                                    });

                                case 6:
                                    child = _context2.sent;

                                    this._children.push(child);
                                    this.section.appendChild(child.section.render());
                                    i++;
                                    return _context2.abrupt("return", child.render(properties));

                                case 13:
                                    child = this._children[n];
                                    child.context = properties;
                                    child.update();

                                case 16:
                                    i++;

                                case 17:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                }));
            }).then(function () {
                _this3._children.splice(i).forEach(function (child) {
                    child.$destroy();
                });
            });
        }
    }, {
        key: "_update2",
        value: function _update2() {
            var properties;
            var as = this['as'];
            var parent = this.view;
            var n = 0;
            var self = this;
            var filter = this['filter'] || function (a) {
                return true;
            };
            this._collection.forEach(function (m) {
                if (!filter(m)) {
                    return;
                }
                var child;
                if (as) {
                    var _ref2;

                    properties = new collection_1.NestedModel((_ref2 = {}, _defineProperty(_ref2, as, m), _defineProperty(_ref2, "self", this.view.context), _ref2));
                } else {
                    properties = m;
                }
                //if (properties instanceof Model)
                // TODO - provide SAME context here for speed and stability
                if (n >= this._children.length) {
                    child = this.childTemplate.view(properties, {
                        parent: parent
                    });
                    this._children.push(child);
                    this.section.appendChild(child.render(properties));
                } else {
                    child = this._children[n];
                    child.context = properties;
                    child.update();
                }
                n++;
            }, this);
            this._children.splice(n).forEach(function (child) {
                child.$destroy();
            });
        }
    }, {
        key: "__addEventListeners",
        value: function __addEventListeners(collection) {
            collection.on('add', this._update, this);
            collection.on('remove', this._update, this);
            collection.on('reset', this._update, this);
            collection.on('filter', this._update, this);
        }
    }, {
        key: "__removeEventListeners",
        value: function __removeEventListeners(collection) {
            collection.off('remove', this._update);
            collection.off('add', this._update);
            collection.off('reset', this._update);
            collection.off('filter', this._update);
        }
    }, {
        key: "setAttribute",
        value: function setAttribute(key, value) {
            this[key] = value;
        }
    }, {
        key: "onDestroy",
        value: function onDestroy() {
            if (this._collection && typeof this._collection.destroy === 'function') {
                this._collection.destroy();
            }
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var child = _step.value;

                    child.$destroy();
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
    }]);

    return Repeat;
}(base_component_1.BaseComponent);
Repeat = __decorate([decorators.component("repeat")], Repeat);
exports.Repeat = Repeat;
/*export const Repeat: ComponentDefinition = {

  initialize() {
    this._children = []
    this._collection = [];

  },

  update() {

    var as = this['as'];
    var each = this['each'];
    var key = this['key'] || "key";

    var n = 0;
    var self = this;
    var parent = this.view;

    if (each === this._collection || !each) {
      return
    }

    if (this._collection && this._collection instanceof Collection) {
      this.__removeEventListeners(this._collection)

    }

    this._collection = each

    this._update()

    if (each instanceof Collection) {
      this.__addEventListeners(each)
    }

  },

  _update() {

    var properties;
    var as = this['as'];
    var parent = this.view
    var n = 0

    var self = this

    var filter = this['filter'] || function(a) { return true }

    this._collection.forEach(function(m: IModel) {

      if (!filter(m)) { return; }

      var child;

      if (as) {
        properties = new NestedModel({ [as]: m, self: this.view.context });
      } else {
        properties = m;
      }

      // TODO - provide SAME context here for speed and stability
      if (n >= this._children.length) {

        child = this.childTemplate.view(properties, {
          parent: parent
        });


        this._children.push(child);

        this.section.appendChild(child.render(properties));

      } else {
        child = this._children[n];
        child.context = properties;
        child.update();
      }

      n++;

    }, this);

    this._children.splice(n).forEach(function(child) {
      (<any>child).$destroy();
    });


  },

  __addEventListeners<T extends IModel>(collection: Collection<T>) {

    collection.on('add', this._update, this);
    collection.on('remove', this._update, this);
    collection.on('reset', this._update, this);
    collection.on('filter', this._update, this);
  },

  __removeEventListeners<T extends IModel>(collection: Collection<T>) {
    collection.off('remove', this._update);
    collection.off('add', this._update);
    collection.off('reset', this._update);
    collection.off('filter', this._update);
  },

  setAttribute(key: string, value: any) {
    this[key] = value

  },

  setProperty() {
    console.log(arguments)
  },

  onDestroy() {
    if (this._collection && typeof this._collection.destroy === 'function') {
      this._collection.destroy();
    }

    for (let child of this._children) {
      child.$destroy();
    }
  }
}*/