import req from "../request";
import type { UserLogin, Headers, ApiResponse } from "./type/user.type";

export const login = (data: UserLogin, headers?: Headers): Promise<ApiResponse> => req.post("/api/login", data, headers);

export const getUserInfo = (): Promise<ApiResponse> => req.get("/api/getUserInfo");
