import axios from "axios";
import qs from "qs";
import {requestInterceptor, responseInterceptor} from "/src/plugins/axios/axiosInterceptors";
import {isDevelopmentMode} from "/src/const";

const DEFAULT_BACKEND_URL = "http://localhost:8010/api";

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


export const _axiosBlob = axios.create({
  ...config,
  responseType: "blob",
});

responseInterceptor.forEach(function ({response, error}) {
  _axios.interceptors.response.use(response, error);
  _axiosBlob.interceptors.response.use(response, error);
});

requestInterceptor.forEach(function ({request}) {
  _axios.interceptors.request.use(request);
  _axiosBlob.interceptors.request.use(request);
});

export function extName(baseName, ext = "csv") {
  return `${baseName}-${new Date().toLocaleDateString()}.${ext}`;
}

export function blobDomLink(
  _blob,
  fileName,
  ext,
  type = "application/octet-stream"
) {
  const blob = new Blob([_blob], {type});
  const link = document.createElement("a");
  link.download = extName(fileName, ext);
  link.href = window.URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export default function download_file(url, filename) {
  console.log(url, url.includes("http"))
  if (url.includes("http")) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return Promise.resolve()
  } else {

    return _axiosBlob.get(
      url
    ).then(({data}) => {
      7
      blobDomLink(data, filename, "xlsx")
    })
  }
}
