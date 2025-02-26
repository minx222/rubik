import type {
	AxiosInstance,
	AxiosInterceptorOptions,
	InternalAxiosRequestConfig
} from 'axios';

import type { Middleware, Method } from './enums';

interface Result {
	code: number;
	msg: string;
}

export interface ResultData<T = string> extends Result {
	data: T;
}

export type CreateAxiosOptions = {
	/**
	 * @description 前缀
	 */
	baseURL?: string;
	/**
	 * @description 默认请求方法
	 * @default GET
	 */
	default_method?: Method;
	/**
	 * @description 请求超时时间
	 */
	timeout?: number;
	/**
	 * @description 是否携带cookie
	 */
	withCredentials?: true;
};

export type ResultInterceptor<
	T extends Middleware,
	V extends
		| InternalAxiosRequestConfig
		| AxiosInstance = T extends Middleware.RESULT
		? InternalAxiosRequestConfig
		: AxiosInstance
> = {
	onFulfilled?: (value: V) => V | Promise<V>;
	onRejected?: (error: unknown) => unknown;
	options?: AxiosInterceptorOptions;
};
