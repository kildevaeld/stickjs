export declare class StickError extends Error {
    message: string;
    constructor(message?: string);
}
export declare class StickDependencyError extends StickError {
    errors: Error[];
    constructor(message?: string, errors?: Error[]);
}
