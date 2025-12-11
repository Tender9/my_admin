import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores";

export const routes = [
   {
      path: "/",
      name: "layout",
      meta: {
         title: "首页",
      },
      component: () => import("@/views/index.vue"),
   },
];
const router = createRouter({
   scrollBehavior: () => ({ left: 0, top: 0 }),
   history: createWebHistory(),
   routes,
});

const createRoutes = (menuList: any[]) => {
   // menuList.forEach((route) => {
   //    router.addRoute("layout", route);
   // });
   // // 获取全部路由
   // console.log("router", router.options.routes);
};

router.beforeEach((to, _from, next) => {
   document.title = (to?.meta?.title as string) || "未命名标题";
   // const userStore = useUserStore();
   // createRoutes(userStore.menuList);
   next();
});

export default router;
