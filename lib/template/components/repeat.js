'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var collection_1 = require('collection');
exports.Repeat = {
    initialize: function initialize() {
        this._children = [];
        this._collection = [];
    },
    update: function update() {
        var as = this['as'];
        var each = this['each'];
        var key = this['key'] || "key";
        var n = 0;
        var self = this;
        var parent = this.view;
        if (each === this._collection || !each) {
            return;
        }
        if (this._collection && this._collection instanceof collection_1.Collection) {
            this.__removeEventListeners(this._collection);
        }
        this._collection = each;
        this._update();
        if (each instanceof collection_1.Collection) {
            this.__addEventListeners(each);
        }
    },
    _update: function _update() {
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
                var _ref;

                properties = new collection_1.NestedModel((_ref = {}, _defineProperty(_ref, as, m), _defineProperty(_ref, 'self', this.view.context), _ref));
            } else {
                properties = m;
            }
            // TODO - provide SAME context here for speed and stability
            if (n >= this._children.length) {
                child = this.childTemplate.view(properties, {
                    parent: parent,
                    container: parent.container,
                    target: parent.target
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
    },
    __addEventListeners: function __addEventListeners(collection) {
        collection.on('add', this._update, this);
        collection.on('remove', this._update, this);
        collection.on('reset', this._update, this);
    },
    __removeEventListeners: function __removeEventListeners(collection) {
        collection.off('remove', this._update);
        collection.off('add', this._update);
        collection.off('reset', this._update);
    },
    setAttribute: function setAttribute(key, value) {
        this[key] = value;
    },
    setProperty: function setProperty() {
        console.log(arguments);
    },
    onDestroy: function onDestroy() {
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
};