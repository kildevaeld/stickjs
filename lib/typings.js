/// <reference path="../node_modules/templ/templ" />
class StickError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.StickError = StickError;
class StickDependencyError extends StickError {
}
exports.StickDependencyError = StickDependencyError;
