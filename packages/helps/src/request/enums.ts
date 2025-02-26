// * 请求枚举配置
/**
 * @description：请求配置
 */
export enum ResultCode {
	SUCCESS = 200,
	ERROR = 500,
	OVERDUE = 599,
	TIMEOUT = 10000
}

/**
 * @description：请求方法
 */
export enum Method {
	GET = 'GET',
	POST = 'POST',
	PATCH = 'PATCH',
	PUT = 'PUT',
	DELETE = 'DELETE'
}

/**
 * @description：常用的contentTyp类型
 */
export enum ContentType {
	// json
	JSON = 'application/json;charset=UTF-8',
	// text
	TEXT = 'text/plain;charset=UTF-8',
	// form-data 一般配合qs
	FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
	// form-data 上传
	FORM_DATA = 'multipart/form-data;charset=UTF-8'
}

export enum Middleware {
	/**
	 * @description 请求
	 */
	RESULT = 'request',
	/**
	 * @description 相应
	 */
	RESPONSE = 'response'
}
