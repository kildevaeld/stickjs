export * from 'stick.di/lib/decorators';
export declare function controller(controllerName?: string): ClassDecorator;
export declare function module(moduleName?: string): ClassDecorator;
export declare function service(serviceName?: string, moduleName?: string): ClassDecorator;
export declare function config(config: any): ClassDecorator;
export declare function template(name: string): ClassDecorator;
