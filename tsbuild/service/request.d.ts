import type { Method, RawAxiosRequestHeaders } from 'axios';
export type Return<T> = Promise<[data: T | undefined, err?: string]>;
interface Options {
    withoutToken?: boolean;
    abortSignal?: AbortSignal;
    headers?: RawAxiosRequestHeaders;
}
export declare function request<T, U>(url: string, method: Method, data?: T, option?: Options): Return<U>;
export declare function requestGet<U = any>(url: string): Return<U>;
export declare function requestGetWithParam<T = any, U = any>(url: string, data: T): Return<U>;
export declare function requestGetWithData<T = any, U = any>(url: string, data: T): Return<U>;
export declare function requestPost<T = any, U = any>(url: string, data: T, option?: Options): Return<U>;
export declare function requestPut<T = any, U = any>(url: string, data: T): Return<U>;
export {};
