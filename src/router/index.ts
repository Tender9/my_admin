import { createRouter, createWebHistory } from "vue-router";

export const routes = [
   {
      name: "index",
      path: "/",
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

router.beforeEach((to, _from, next) => {
   document.title = (to.meta.title as string) || "未命名标题";
   next();
});

export default router;
