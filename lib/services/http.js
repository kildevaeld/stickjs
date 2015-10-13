var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
import { service } from '../annotations';
import { request } from 'utilities';
export let HttpService = class {
    get(url) {
        return request.get(url);
    }
    post(url) {
        return request.post(url);
    }
    put(url) {
        return request.put(url);
    }
    del(url) {
        return request.del(url);
    }
};
HttpService = __decorate([
    service('$http')
], HttpService);
