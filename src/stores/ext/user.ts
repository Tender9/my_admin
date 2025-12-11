import { defineStore } from "pinia";
import { login, getUserInfo } from "@/api/user";
import type { UserLogin } from "@/api/type/user.type";

export const useUserStore = defineStore("user", {
   state: () => {
      return {
         token: localStorage.getItem("TOKEN") || "",
         userInfo: {} as Record<string, any>,
         menuList: [] as any[],
      };
   },
   getters: {
      permissions(): [string] {
         return this.userInfo.permissions || [];
      },
   },
   actions: {
      async userLogin(params: UserLogin) {
         const { code, data } = await login(params);
         if (code !== 200) return;
         this.SET_STATE(data);
      },

      SET_STATE(data: { token: string }) {
         this.token = data.token;
         localStorage.setItem("TOKEN", data.token);
         this.SET_MENU();
      },

      async SET_MENU() {
         const { code, data } = await getUserInfo();
         if (code !== 200) return;
         const { menus } = data;

         const getMenuTree = (menuList: any[], parentId = 0) => {
            const parentNode = menuList.filter((menu) => menu?.parentId == parentId);
            // 递归为每个子节点添加 children
            // parentNode.forEach((child) => {
            //    child.children = getMenuTree(menuList, child.level);
            // });
            return parentNode;
         };

         this.menuList = getMenuTree(menus);
         console.log(this.menuList, "list");
         this.userInfo = data;
      },
   },
});
