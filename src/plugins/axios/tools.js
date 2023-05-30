import {_axios, _axiosBlob} from "/src/plugins/axios";
import {StorageKey} from "/src/const.js";

export function load_auth_headers() {
    const token = localStorage.getItem(StorageKey.TOKEN);
    const tokenType = localStorage.getItem(StorageKey.TOKEN_TYPE);
    if (!token || !tokenType) {
        clean_auth_headers()
        return null;
    }
  _axios.defaults.headers.common["Authorization"] = `${tokenType} ${token}`;
  _axiosBlob.defaults.headers.common["Authorization"] = `${tokenType} ${token}`;
    return {
        token,
        tokenType
    };
}

export function set_auth_headers(tokenType, token) {
    localStorage.setItem(StorageKey.TOKEN, token);
    localStorage.setItem(StorageKey.TOKEN_TYPE, tokenType);
    let auth_string = `${tokenType} ${token}`;
    _axios.defaults.headers.common["Authorization"] = auth_string;
    _axiosBlob.defaults.headers.common["Authorization"] = auth_string;
}

export function clean_auth_headers() {
    delete _axios.defaults.headers.common.Authorization;
    delete _axiosBlob.defaults.headers.common.Authorization;
    localStorage.removeItem(StorageKey.TOKEN_EXPIRATION);
    localStorage.removeItem(StorageKey.TOKEN);
    localStorage.removeItem(StorageKey.USER);
    // resetRouter();
}
