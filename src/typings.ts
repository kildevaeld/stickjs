

export class StickError extends Error {
	message:string
	constructor (message?:string) {
		super(message);
		this.message = message;
	} 
}


export class StickDependencyError extends StickError { }