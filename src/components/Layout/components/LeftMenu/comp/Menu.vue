<template>
   <div class="menu-page" :class="{ collapsed: menuStore.collapsed }">
      <a-menu
         v-model:selectedKeys="state.selectedKeys"
         mode="inline"
         :open-keys="state.openKeys"
         :inline-collapsed="menuStore.collapsed"
         :items="items"
         theme="light"
         @openChange="onOpenChange"></a-menu>
   </div>
</template>
<script setup>
   import { useMenuStore,useUserStore } from "@/stores";
   import { h, reactive } from "vue";
   import {
      MailOutlined,
      AppstoreOutlined,
      SettingOutlined,
      UserOutlined,
      FileOutlined,
      FolderOutlined,
      PieChartOutlined,
      DesktopOutlined,
      TeamOutlined,
      MessageOutlined,
      BellOutlined,
      SearchOutlined,
      HomeOutlined,
      LayoutOutlined,
      EyeOutlined,
      EditOutlined,
      DeleteOutlined,
      PlusOutlined,
   } from "@ant-design/icons-vue";

   const menuStore = useMenuStore();
   const userStore = useUserStore();


   // 图标列表
   const icons = [
      () => h(MailOutlined),
      () => h(AppstoreOutlined),
      () => h(SettingOutlined),
      () => h(UserOutlined),
      () => h(FileOutlined),
      () => h(FolderOutlined),
      () => h(PieChartOutlined),
      () => h(DesktopOutlined),
      () => h(TeamOutlined),
      () => h(MessageOutlined),
      // () => h(BellOutlined),
      () => h(SearchOutlined),
      () => h(HomeOutlined),
      () => h(LayoutOutlined),
      () => h(EyeOutlined),
      () => h(EditOutlined),
      () => h(DeleteOutlined),
      () => h(PlusOutlined),
   ];

   // 生成随机图标
   const getRandomIcon = () => {
      return icons[Math.floor(Math.random() * icons.length)];
   };

   // 菜单项生成函数
   function getItem(label, key, icon, children, type) {
      return {
         key,
         icon,
         children,
         label,
         type,
      };
   }

   // 生成40个菜单
   const generateMenus = () => {
      const items = [];
      let keyCounter = 1;

      // 生成一级菜单（10个）
      for (let i = 1; i <= 30; i++) {
         const hasChildren = Math.random() > 0.3; // 70%概率有子菜单
         let children = null;

         if (hasChildren) {
            children = [];
            // 每个一级菜单有2-5个子菜单
            const childCount = Math.floor(Math.random() * 4) + 2;

            for (let j = 0; j < childCount; j++) {
               const hasGrandChildren = Math.random() > 0.6; // 40%概率有二级子菜单
               let grandChildren = null;

               if (hasGrandChildren) {
                  grandChildren = [];
                  // 每个二级菜单有2-3个三级子菜单
                  const grandChildCount = Math.floor(Math.random() * 2) + 2;

                  for (let k = 0; k < grandChildCount; k++) {
                     grandChildren.push(
                        getItem(
                           `Option ${keyCounter}`,
                           `key${keyCounter}`,
                           null // 三级菜单不显示图标
                        )
                     );
                     keyCounter++;
                     if (keyCounter > 40) break;
                  }
               }

               children.push(getItem(`Submenu ${keyCounter}`, `key${keyCounter}`, getRandomIcon(), grandChildren));
               keyCounter++;
               if (keyCounter > 40) break;
            }
         }

         items.push(getItem(`Navigation ${i}`, `nav${i}`, getRandomIcon(), children));

         if (keyCounter > 40) break;
      }

      return items;
   };

   // 创建响应式菜单数组
   const items = reactive([...generateMenus(),...generateMenus()]);


   const state = reactive({
      rootSubmenuKeys: ["sub1", "sub2", "sub4"],
      openKeys: ["sub1"],
      selectedKeys: [],
      collapsed: false,
   });
   const onOpenChange = (openKeys) => {
      const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1);
      if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
         state.openKeys = openKeys;
      } else {
         state.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
   };
</script>

<style lang="scss" scoped>
   $transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); // 更流畅的缓动曲线
   $expanded-width: 200px;
   $collapsed-width: 50px;

   :deep(.ant-menu) {
      width: 100%;
      height: 100%;
      overflow: auto;
   }

   .menu-page {
      width: $expanded-width;
      transition: $transition; // 添加过渡动画
      height: 100%;
      overflow: hidden;
      &.collapsed {
         width: $collapsed-width; // 折叠状态的宽度
      }
   }
</style>
