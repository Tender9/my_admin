import axios from "axios";

import type { AxiosHeaders, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

const config = {
   timeout: 1000,
};

const service = axios.create(config);

const reqConfig = [
   (config: InternalAxiosRequestConfig) => {
      return config;
   },
   (err: AxiosError) => {
      return err;
   },
] as const;

const resConfig = [
   (response: AxiosResponse) => {
      const data = response.data;
      console.log(response,'response');
      if (data.code != 200) Promise.reject(new Error(`业务错误：${data.message || data.code}`));
      return data;
   },
   (err: AxiosError) => {
      return Promise.reject(err);
   },
] as const;

service.interceptors.request.use(...reqConfig);
service.interceptors.response.use(...resConfig);

const req = {
   get<T = unknown>(url: string, params?: any, headers?: AxiosHeaders) {
      return service.get<T>(url, { params, headers });
   },

   post<T = unknown>(url: string, data?: any, headers?: AxiosHeaders) {
      return service.post<T>(url, data, { headers });
   },

   put<T = unknown>(url: string, data?: any, headers?: AxiosHeaders) {
      return service.put<T>(url, data, { headers });
   },

   delete<T = unknown>(url: string, data?: any, headers?: AxiosHeaders) {
      return service.delete<T>(url, { data, headers });
   },
};

export default req;
