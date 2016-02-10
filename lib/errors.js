"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StickError = function (_Error) {
    _inherits(StickError, _Error);

    function StickError(message) {
        _classCallCheck(this, StickError);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StickError).call(this, message));

        _this.message = message;
        return _this;
    }

    return StickError;
}(Error);

exports.StickError = StickError;

var StickDependencyError = function (_StickError) {
    _inherits(StickDependencyError, _StickError);

    function StickDependencyError(message, errors) {
        _classCallCheck(this, StickDependencyError);

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(StickDependencyError).call(this, message));

        _this2.errors = errors;
        return _this2;
    }

    return StickDependencyError;
}(StickError);

exports.StickDependencyError = StickDependencyError;