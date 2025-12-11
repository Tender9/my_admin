import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { viteMockServe } from "vite-plugin-mock";

import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
   base: process.env.NODE_ENV == "production" ? "/my_admin/" : "/",
   plugins: [
      vue(),
      viteMockServe({
         mockPath: "./mock",
         supportTs: false,
         localEnabled: true, //是否启用本地模拟数据
         prodEnabled: true, //是否启用生产环境模拟数据
         watchFiles: true,
         // 生产环境下必须配置
         injectCode: ` import { setupProdMockServer } from '../mock/mockProdServer'; setupProdMockServer(); `,
      }),
      Components({
         resolvers: [
            AntDesignVueResolver({
               importStyle: false, // css in js
            }),
         ],
      }),
      visualizer({ open: true }),
   ],
   resolve: {
      alias: {
         "@": resolve(__dirname, "./src"),
      },
   },
});
