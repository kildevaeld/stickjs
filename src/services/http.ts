

/// <reference path="../typings" />
import {service} from '../annotations'
import {request, Request} from 'utilities'

@service('$http')
export class HttpService {
	
	get (url:any): Request {
		return request.get(url)
	}
	
	post (url:any): Request {
		return request.post(url)
	}
	
	put (url:any): Request {
		return request.put(url)
	}
	
	del (url:any): Request {
		return request.del(url)
	}
}