
export class StickError extends Error {
	message:string
	constructor (message?:string) {
		super(message);
		this.message = message;
	} 
}


export class StickDependencyError extends StickError { 
    errors: Error[];
    constructor(message?:string, errors?:Error[]) {
        super(message);
        this.errors = errors;
    }
}