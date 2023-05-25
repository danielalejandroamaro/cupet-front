import axios from "axios";
import qs from "qs";
import {requestInterceptor, responseInterceptor} from "/src/plugins/axios/axiosInterceptors";
import {isDevelopmentMode} from "/src/const";

const DEFAULT_BACKEND_URL = "http://localhost:8010";

// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || DEFAULT_BACKEND_URL;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const baseUri = isDevelopmentMode ? DEFAULT_BACKEND_URL : "/api";

let config = {
    baseURL: baseUri,
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control,
    paramsSerializer: (params) => qs.stringify(params, {arrayFormat: "repeat"}),
};

export function get_websocketUrl(path) {
    const l = window.location;
    return isDevelopmentMode ? `ws://${l.hostname}:8000/ws${path}` : `wss://${l.hostname}/api/ws${path}`;
}

export const _axios = axios.create(config);

responseInterceptor.forEach(function ({response, error}) {
    _axios.interceptors.response.use(response, error);
});

requestInterceptor.forEach(function ({request}) {
    _axios.interceptors.request.use(request);
});
