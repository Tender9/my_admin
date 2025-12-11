import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", {
   state: () => ({
      collapsed: false,
   }),
   getters: {},
   actions: {
      toggleCollapse() {
         this.collapsed = !this.collapsed;
      },
   },
});
