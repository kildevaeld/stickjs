var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="../typings" />
var annotations_1 = require('../annotations');
var utilities_1 = require('utilities');
let HttpService = class {
    get(url) {
        return utilities_1.request.get(url);
    }
    post(url) {
        return utilities_1.request.post(url);
    }
    put(url) {
        return utilities_1.request.put(url);
    }
    del(url) {
        return utilities_1.request.del(url);
    }
};
HttpService = __decorate([
    annotations_1.service('$http')
], HttpService);
exports.HttpService = HttpService;
