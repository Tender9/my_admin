// axios.d.ts
import "axios";

// 定义自定义响应数据结构
declare interface ApiResponse<T = any> {
   code: number;
   message?: string;
   data: T;
}

// 扩展 Axios 模块，覆盖默认响应类型
declare module "axios" {
   interface AxiosInstance {
      get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
      delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
      head<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
      options<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
      post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
      put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
      patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
   }
}
