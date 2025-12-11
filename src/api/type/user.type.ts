import { AxiosHeaders } from "axios";

// 让 Headers 接口继承 AxiosHeaders
export interface Headers extends AxiosHeaders {}

// 定义自定义响应数据结构
export interface ApiResponse<T = any> {
   code: number;
   message?: string;
   data: T;
}

export interface UserLogin {
   username: string;
   password: string;
}
