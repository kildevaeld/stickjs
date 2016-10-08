import { service } from '../decorators'
import * as request from 'orange.request'

@service('$http')
export class HttpService {

	get(url: any): request.HttpRequest {
		return request.get(url)
	}

	post(url: any): request.HttpRequest {
		return request.post(url)
	}

	put(url: any): request.HttpRequest {
		return request.put(url)
	}

	del(url: any): request.HttpRequest {
		return request.del(url)
	}
}