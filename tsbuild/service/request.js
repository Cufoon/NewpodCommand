import axios from 'axios';
import qs from 'qs';
import { getIsShowVerbose } from '../store.js';
export async function request(url, method, data, option) {
    try {
        const options = {
            url,
            method,
            headers: { ...option?.headers }
        };
        if (!option?.withoutToken) {
            options.headers = {
                Authorization: 'something'
            };
        }
        if (option?.abortSignal) {
            options.signal = option.abortSignal;
        }
        if (data) {
            options.data = data;
        }
        const res = await axios(options);
        if (getIsShowVerbose()) {
            console.group('Request to ', url);
            console.log('send_data', data);
            console.log('get_header', res.headers);
            console.log('get_body ', res.data);
            console.groupEnd();
        }
        if (res.status < 200 || res.status >= 300) {
            return [undefined, res.statusText];
        }
        return [res.data];
    }
    catch (e) {
        console.log('请求意外错误', e);
        return [undefined, e.toString()];
    }
}
export async function requestGet(url) {
    return await request(url, 'GET');
}
export async function requestGetWithParam(url, data) {
    const query = qs.stringify(data);
    return await request(`${url}?${query}`, 'GET');
}
export async function requestGetWithData(url, data) {
    return await request(url, 'GET', data);
}
export async function requestPost(url, data, option) {
    return await request(url, 'POST', data, option);
}
export async function requestPut(url, data) {
    return await request(url, 'PUT', data);
}
