import req from "./config/request";
import type { UserLogin, Headers } from "./user.type";

export const login = (data: UserLogin, headers?: Headers) => req.post("/api/login", data, headers);
