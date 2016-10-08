import * as request from 'orange.request';
export declare class HttpService {
    get(url: any): request.HttpRequest;
    post(url: any): request.HttpRequest;
    put(url: any): request.HttpRequest;
    del(url: any): request.HttpRequest;
}
