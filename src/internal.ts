
import * as utils from 'utilities'
import {Metadata, DIContainer} from 'di'

const paramRegEx = /function[^(]*\(([^)]*)\)/i


export function getFunctionParameters(fn: Function, cache: boolean = true): string[] {
  let params = <string[]>Metadata.getOwn(Metadata.paramTypes, fn)
  if (!params) {
    let match = fn.toString().match(paramRegEx)
    if (match) {
      
      params = match[1].replace(/,/, ' ').split(' ').map(x => x.replace(',', '').trim())
        .filter( m => m !== '')
      if (cache)
        Metadata.define(Metadata.paramTypes, params, fn, undefined);
    }
  }

  return params || [];
}

export enum DependencyType {
  Service, Module, Controller, Factory
}

export enum Metakey {
  DependencyType,
  Template
}

export const DIServiceConfig = "mobyjs:service:config"

export function getDependencies (fn:Function|Object|any[]): [Function, any[]] {
  let dependencies: any[];
 
  if (fn.constructor === Array) {
    // TODO: Check for function
    let tmp = (<any[]>fn).pop()
    dependencies = <any>fn;
    fn = tmp;
    (<any>fn).inject = dependencies
    
  } else if (typeof fn === 'function') {
    dependencies = utils.result(fn, "inject");
    if (!dependencies || dependencies.length == 0) {
      
      let _fn = <any>fn
      // FIXME: Find a way not to delete type scripts type descriptions
      // But as it is now, context will be inferred as an Object
      if (_fn.__metadata__ && _fn.__metadata__.undefined['design:paramtypes']) {
          delete _fn.__metadata__.undefined['design:paramtypes']
       }
      
      dependencies = getFunctionParameters(<Function>fn);
      _fn.inject = dependencies;
    }    
    
  } else {
    return [<any>fn,null]
  }
  
  return [<Function>fn, dependencies];
}

function tryCatch (fn:() => any): [any, Error] {
  let val, err
  try {
   val = fn();
  } catch (e) {
    err = e;
  }
  return [val, err];
}

export function resolveDependencies(target:Function, container:DIContainer): utils.IPromise<any[]> {
  
  let i, ii, ret, inject = (<any>target).inject
  
  if (!inject) {
    return utils.Promise.resolve([]);
  }
  
  
  for (i=0,ii=inject.length;i<ii;i++) {
    
    ret = tryCatch(() => {
      return container.get(inject[i]);
    })
    
    if (ret[1] != null) return utils.Promise.reject(ret[1]);
    inject[i] = ret[0];
  }
  
  return utils.Promise.all(inject)
  
}

export function setDependencyType(type: DependencyType): ClassDecorator {

    return function(target: Function) {
      let str = Metakey[Metakey.DependencyType]

      Metadata.define(str, type, target, undefined);
    }
}

export function getDependencyType(target:Function): DependencyType {
  let key = Metakey[Metakey.DependencyType],
    type = <DependencyType>Metadata.getOwn(key, target, undefined);
  return type
}

export function isDependencyType (target:Function, type:DependencyType) {
  return getDependencyType(target) === type;
}

export function setActivator (target:Function, activator:Object) {
  let instanceActivatorKey: string = (<any>Metadata).instanceActivator
  Metadata.define(instanceActivatorKey, activator, target, undefined);
}

export function setDependencyResolver(target:Function, activator:any) {
  let dependencyResolverKey: string = (<any>Metadata).dependencyResolver
  Metadata.define(dependencyResolverKey, activator, target, undefined);
}