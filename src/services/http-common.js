import axios from "axios";
const http = axios.create();

http.interceptors.request.use(
  function (config) {
    config.baseURL = import.meta.env.VITE_APP_BASE_API_URL;
    return config;
  },
  function error(error) {
    return Promise.reject(error.response);
  }
);
export const Http = http;
