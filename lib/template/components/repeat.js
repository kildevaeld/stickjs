/// <reference path="../../typings" />
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _collection = require('collection');

var _utilitiesLibIndex = require('utilities/lib/index');

var Repeat = {
    initialize: function initialize() {
        this._children = [];
        this._collection = [];
        this.id = (0, _utilitiesLibIndex.uniqueId)();
    },
    update: function update() {
        this._children = this._children || [];
        var as = this['as'];
        var each = this['each'];
        var key = this['key'] || "key";
        var n = 0;
        var self = this;
        var parent = this.view;
        if ((each === this._collection || !each) && this._collection.length > 0) {
            return;
        }
        if (this._collection && this._collection instanceof _collection.Collection) {
            this.__removeEventListeners(this._collection);
        }
        this._collection = each;
        this._update();
        if (each instanceof _collection.Collection) {
            this.__addEventListeners(each);
        }
    },
    _update: function _update() {
        var properties;
        var as = this['as'];
        var parent = this.view;
        var n = 0;
        var delegateID = (0, _utilitiesLibIndex.uniqueId)('.repeat');
        var self = this;
        this._collection.forEach(function (m) {
            var child;
            if (as) {
                properties = new _collection.NestedModel(_defineProperty({}, as, m));
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
        this._children.splice(n).forEach(function (child) {
            child.remove();
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
        collection.reset('reset', this._update);
    },
    setAttribute: function setAttribute(key, value) {
        this[key] = value;
    },
    setProperty: function setProperty() {
        console.log(arguments);
    },
    onDestroy: function onDestroy() {
        this._collection.destroy();
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this._children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var child = _step.value;

                child.remove();
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator['return']) {
                    _iterator['return']();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
};
exports.Repeat = Repeat;