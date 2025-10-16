// 生产（线上）环境使用必须配置，否则404

import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import users from "./user.js";

export function setupProdMockServer() {
   createProdMockServer([...users]);
}
