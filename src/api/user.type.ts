import { AxiosHeaders } from "axios";

// 让 Headers 接口继承 AxiosHeaders
export interface Headers extends AxiosHeaders {}

export interface UserLogin {
   username: string;
   password: string;
}
