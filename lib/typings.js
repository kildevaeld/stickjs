export class StickError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}
export class StickDependencyError extends StickError {
}
